export function BeyondAdvisorGreen() {
  return (
    <>
      <p>
        After six years of FinOps work across AWS, Azure, and GCP, the pattern repeats itself at every
        organisation: the cloud dashboards are green, the Trusted Advisor score is high, the team is confident the
        estate is clean. Then someone asks me to take a closer look, and we find £200k a year of waste that no
        native tool surfaced.
      </p>
      <p>
        I started calling this <em>shadow cost</em> — spend that is genuinely invisible to Azure Advisor, AWS
        Trusted Advisor, and GCP Recommender, not because those tools are bad, but because they are solving a
        different problem. They are built to detect underutilised compute. They are largely silent on the deeper
        FinOps surface: tagging gaps, commitment drift, data-plane waste, and the class of rightsizing
        recommendation that would trigger a peak-hour incident if applied.
      </p>
      <p>
        This article walks through{" "}
        <a href="https://github.com/Johhnmarshal/finops-shadow-cost" target="_blank" rel="noopener noreferrer">
          Shadow Cost
        </a>
        , an open-source FastAPI + vanilla JS webapp I built to surface that gap across all three major clouds.
        I'll cover the architecture, each detection category, the P95/P99 rightsizing engine, commitment
        economics, and per-owner queue routing — with the actual code patterns behind each.
      </p>

      <hr />

      <h2>What native advisors actually miss</h2>

      <p>
        Before getting into the tooling, it is worth being precise about the gap. In my experience the recoverable
        spend that advisors miss falls into five buckets.
      </p>
      <p>
        <strong>Allocation gap.</strong> Resources without required tags or labels. The critical insight here is
        that a tagging gap is not just a governance problem — it is a <em>cost problem</em>, because you cannot
        allocate what you cannot attribute. Shadow Cost computes a Visibility Gap percentage against actual spend,
        not inventory count. A resource missing tags that costs £50/month contributes 10× more to the gap than a
        cheap test VM that also lacks labels.
      </p>
      <p>
        <strong>Commitment drift.</strong> Reservations and savings plans you purchased when the workload looked
        different. The instance is still running, the commitment is still active, but the SKU has changed twice
        since you bought it. Shadow Cost runs a coefficient-of-variation scoring pass to identify workloads stable
        enough to commit on and computes how much new commitment fits inside your cancellation-exposure budget —
        per cloud, because the exposure model is different on each.
      </p>
      <p>
        <strong>Data-plane waste.</strong> Storage on geo-redundant tiers where locally-redundant would do. Log
        Analytics retention set to 730 days by template default. Cosmos DB in multi-region for a development
        namespace. These never surface in advisor tools because they are not about utilisation — the resource is
        being used exactly as configured.
      </p>
      <p>
        <strong>Peak-aware rightsizing risk.</strong> This is the one that keeps me up at night. Native advisors
        use 14-day averages. A VM that runs at 12% average CPU but spikes to 87% every morning at 08:30 looks
        like a downsize candidate. It is not. Shadow Cost uses P95 and P99 over 30 days and diffs the verdict
        against what the native advisor recommends. The headline metric is{" "}
        <em>advisor recommendations that would have triggered a peak-hour incident if applied</em>.
      </p>
      <p>
        <strong>PaaS sprawl.</strong> Empty App Service Plans keeping a Premium tier SKU warm. Idle load balancers
        accruing hourly charges. API Management instances from a project that was decommissioned. These are cheap
        individually and ruinously expensive collectively.
      </p>

      <hr />

      <h2>Architecture</h2>

      <p>
        Shadow Cost is a single FastAPI application with a vanilla JS SPA served from the same process. The
        backend has three layers: provider adapters, a shared engine, and the API surface.
      </p>

      <pre>
        <code>{`FastAPI + Vanilla JS SPA
         │
         ▼
providers/registry.py   (reads CLOUD_PROVIDERS env)
         │
    ┌────┴────┬──────────┐
    ▼         ▼          ▼
 Azure       AWS        GCP
 Provider   Provider   Provider
    │         │          │
    └─────────┴──────────┘
              │
     Shared engine (cloud-neutral):
     ┌─────────────────────────────────┐
     │ peak_rightsizing.decide()       │  P95/P99 decision tree
     │ ri_coverage.cv() + packer       │  CV stability + greedy commit packer
     │ thresholds.current()            │  operator-tunable knobs (Redis-backed)
     │ enricher.build_queue()          │  tag → owner resolution
     │ currency.convert()              │  FX normalisation
     └─────────────────────────────────┘`}</code>
      </pre>

      <p>
        Each provider implements a <code>CloudProvider</code> protocol defined in <code>providers/base.py</code>:
      </p>

      <pre>
        <code>{`class CloudProvider(Protocol):
    def findings(self) -> list[Finding]: ...
    def rightsizing_details(self) -> list[dict]: ...
    def commitment_coverage(self) -> dict: ...
    def build_script(self, finding_id: str) -> str: ...
    def capabilities(self) -> dict[str, bool]: ...`}</code>
      </pre>

      <p>
        The shared engine is pure functions over metrics and spend data. Provider adapters supply the telemetry —
        the engine decides. This means a bugfix to the P95/P99 decision tree or the commitment packer applies to
        all three clouds simultaneously.
      </p>
      <p>Enable providers via environment variable:</p>

      <pre>
        <code>{`export CLOUD_PROVIDERS=azure,aws,gcp   # or any subset`}</code>
      </pre>

      <p>
        Azure and AWS are GA with full deployment automation. GCP runs at the app level (deployment IaC is coming
        in v2).
      </p>

      <hr />

      <h2>The visibility gap</h2>

      <p>
        The first thing the dashboard shows is a Visibility Gap percentage — the fraction of your recoverable
        monthly spend tied to resources missing required tags or labels. This is different from what most tagging
        dashboards show.
      </p>
      <p>
        Most tagging dashboards count <em>resources</em> without tags. Shadow Cost counts <em>spend</em> without
        tags. These produce very different numbers. A 5,000-resource estate might have 94% tag coverage by count
        but only 60% by spend if the small number of untagged resources happen to be your largest VMs.
      </p>
      <p>
        The detector queries the native inventory APIs (Azure Resource Graph, AWS Resource Groups Tagging API, GCP
        Cloud Asset Inventory) and joins against actual cost data:
      </p>

      <pre>
        <code>{`# Azure — KQL via Resource Graph
query = """
Resources
| where isempty(tags['Owner']) or isempty(tags['CostCenter'])
| project id, name, type, resourceGroup,
          subscriptionId, tags,
          estimatedMonthlyCost = todouble(properties.extendedProperties.estimatedMonthlyCost)
| summarize
    taggedSpend   = sumif(estimatedMonthlyCost, isnotempty(tags['Owner'])),
    untaggedSpend = sumif(estimatedMonthlyCost, isempty(tags['Owner']))
"""`}</code>
      </pre>

      <p>The target bands are:</p>
      <ul>
        <li>
          <strong>Crawl</strong> — below 25%. You can see most of your spend.
        </li>
        <li>
          <strong>Walk</strong> — below 10%. Attribution is reliable enough for chargeback.
        </li>
        <li>
          <strong>Run</strong> — below 2%. Visibility is best-in-class.
        </li>
      </ul>
      <p>
        In practice, most organisations I have worked with land between 40% and 70% when they first run this. The
        number is almost always a surprise.
      </p>

      <hr />

      <h2>Peak-aware rightsizing</h2>

      <p>
        This is the most technically involved detector and the one that produces the most valuable findings.
      </p>
      <p>
        The problem with average-based rightsizing is straightforward: averages smooth out spikes. A web
        application that handles batch job submissions at 08:00 UTC every weekday will have a 14-day average CPU
        of perhaps 18%. Azure Advisor and AWS Compute Optimizer see that number and recommend a downsize. At 08:00
        UTC on Monday, the downsized VM would have OOM-killed the batch job.
      </p>
      <p>Shadow Cost pulls P95 and P99 over 30 days instead:</p>

      <pre>
        <code>{`# From backend/peak_rightsizing.py
@dataclass
class Decision:
    verdict: Literal["DOWNSIZE_CANDIDATE", "KEEP", "UPSIZE_WARNING"]
    confidence: Literal["HIGH", "MEDIUM", "LOW"]
    reason: str

def decide(m: VMMetric, t: Thresholds) -> Decision:
    if m.cpu_p95 is None:
        return Decision("KEEP", "LOW", "Insufficient telemetry")

    if m.cpu_p99 >= t.upsize_cpu_p99:
        return Decision("UPSIZE_WARNING", "HIGH",
                        f"CPU P99 {m.cpu_p99:.1f}% exceeds upsize threshold")

    if m.cpu_p95 <= t.downsize_cpu_p95:
        if m.mem_p95_used is None:
            return Decision("DOWNSIZE_CANDIDATE", "MEDIUM",
                            "CPU P95 safe but no memory signal (install agent for HIGH confidence)")
        if m.mem_p95_used <= t.downsize_mem_p95:
            return Decision("DOWNSIZE_CANDIDATE", "HIGH",
                            f"CPU P95 {m.cpu_p95:.1f}%, mem P95 {m.mem_p95_used:.1f}% — both safe")
        return Decision("KEEP", "HIGH",
                        f"CPU safe but mem P95 {m.mem_p95_used:.1f}% above threshold")

    return Decision("KEEP", "HIGH", f"CPU P95 {m.cpu_p95:.1f}% within range")`}</code>
      </pre>

      <p>
        The thresholds default to a conservative profile (CPU P95 ≤ 40% for downsize, CPU P99 ≥ 90% for upsize)
        and are tunable per-operator via the SPA's gear icon or <code>SHC_T_*</code> env vars.
      </p>

      <h3>The advisor diff</h3>

      <p>Shadow Cost then fetches native advisor recommendations and compares verdicts:</p>

      <pre>
        <code>{`# For each VM the native advisor recommends downsizing:
# if our verdict is KEEP or UPSIZE_WARNING → "advisor would have been unsafe"
recommender_unsafe = (
    instance_id in advisor_targets
    and decision.verdict in ("KEEP", "UPSIZE_WARNING")
)`}</code>
      </pre>

      <p>
        The count of <code>recommender_unsafe</code> instances across your estate is the headline number. In my
        experience this catches 15–35% of advisor recommendations, and the average annualised savings at risk per
        unsafe recommendation is higher than the savings from the safe ones.
      </p>

      <h3>Graceful degradation without agents</h3>

      <p>
        AWS CloudWatch Agent and GCP Ops Agent are optional. When they are absent there is no memory signal, which
        means a CPU-only downsize could still be memory-unsafe. Shadow Cost handles this explicitly:
      </p>

      <pre>
        <code>{`def cap_confidence_without_memory(confidence: str, *, has_memory: bool) -> str:
    if not has_memory and confidence == "HIGH":
        return "MEDIUM"
    return confidence`}</code>
      </pre>

      <p>
        MEDIUM confidence findings still appear in the dashboard — they are valid candidates — but the confidence
        level communicates to engineers that installing the agent is prerequisite to acting on them.
      </p>

      <hr />

      <h2>Commitment economics per cloud</h2>

      <p>
        One of the non-obvious design decisions in Shadow Cost is that the commitment guardrail is different per
        cloud. This is not an oversight — the cancellation mechanics are genuinely different, and treating them
        the same produces wrong recommendations.
      </p>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Azure RIs</th>
              <th>AWS Savings Plans</th>
              <th>GCP CUDs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cancellable?</td>
              <td>Yes — up to $50k/yr refund window</td>
              <td>No</td>
              <td>No — no refund mechanism</td>
            </tr>
            <tr>
              <td>Risk model</td>
              <td>Refund-buffer packing</td>
              <td>Max annual commit appetite</td>
              <td>Full loss exposure</td>
            </tr>
            <tr>
              <td>Config</td>
              <td>
                <code>SHC_REFUND_BUFFER</code>
              </td>
              <td>
                <code>SHC_AWS_MAX_ANNUAL_COMMIT</code>
              </td>
              <td>
                <code>SHC_GCP_MAX_ANNUAL_COMMIT</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        For Azure, the packer algorithm fills commitments up to the refund buffer you set. For AWS and GCP, there
        is no undo — the algorithm is more conservative, computing CV (coefficient of variation) stability over 90
        days and only recommending commitments on workloads with a CV below 0.25:
      </p>

      <pre>
        <code>{`# From backend/ri_coverage.py
def cv(samples: list[float]) -> float:
    """Coefficient of variation — lower = more stable."""
    if not samples or (mean := sum(samples) / len(samples)) == 0:
        return float("inf")
    variance = sum((x - mean) ** 2 for x in samples) / len(samples)
    return (variance ** 0.5) / mean

def greedy_pack(
    candidates: list[CommitmentCandidate],
    budget_usd: float,
) -> list[CommitmentCandidate]:
    """Fill commitment budget greediest-first by annual savings, respecting budget cap."""
    candidates = sorted(candidates, key=lambda c: c.annual_savings_usd, reverse=True)
    packed, spent = [], 0.0
    for c in candidates:
        if spent + c.annual_cost_usd <= budget_usd:
            packed.append(c)
            spent += c.annual_cost_usd
    return packed`}</code>
      </pre>

      <p>
        The shared CV scoring and greedy packer are reused verbatim across all three clouds. The exposure model
        and product catalogue are per-provider.
      </p>

      <hr />

      <h2>Per-owner queues</h2>

      <p>
        Finding waste is only half the problem. The other half is routing the finding to the engineer who can
        actually fix it. Shadow Cost resolves an owner for every finding via a three-tier precedence chain:
      </p>
      <ol>
        <li>
          <strong>Cloud tag/label</strong> — <code>Owner</code>, <code>team</code>, or equivalent per cloud
        </li>
        <li>
          <strong>YAML override</strong> (<code>SHC_OWNERS_YAML</code>) — a file that maps resource patterns to
          owners
        </li>
        <li>
          <strong>CODEOWNERS</strong> (<code>SHC_CODEOWNERS</code>) — the repo file, as a fallback for resources
          tied to identifiable code paths
        </li>
      </ol>

      <pre>
        <code>{`# owners.yaml — example
overrides:
  - match: "rg-payments-*"
    owner: "payments-platform"
  - match: "*/aks-prod-*"
    owner: "infrastructure"
  - match: "sa-logs-*"
    owner: "observability"

defaults:
  unmatched: "needs-attribution"`}</code>
      </pre>

      <p>
        Resources that match nothing land in <code>needs-attribution</code>. That owner queue is the FinOps
        team's dashboard — it shows where tagging enforcement needs attention upstream.
      </p>
      <p>
        The <code>/api/queues/{"{owner}"}.md</code> endpoint returns a Markdown file for each owner. The nightly
        automation (<code>v1/automation/shc-nightly.yml</code>) runs as a GitHub Actions workflow and creates or
        updates a GitHub issue per owner — so findings land in engineers' issue queues without any portal access
        required.
      </p>

      <hr />

      <h2>Running it yourself</h2>

      <p>Shadow Cost runs entirely on mock data — no cloud credentials needed:</p>

      <pre>
        <code>{`git clone https://github.com/Johhnmarshal/finops-shadow-cost.git
cd finops-shadow-cost/v1/webapp
pip install -r requirements.txt
USE_MOCK_DATA=true uvicorn backend.app:app --reload --port 8000
# open http://localhost:8000`}</code>
      </pre>

      <p>
        The mock data is shaped identically to live results, so the full SPA renders: dashboard, findings table,
        peak rightsizing detail, RI/SP/CUD coverage, owner queues, policy downloads.
      </p>
      <p>To run the full test suite (217 tests, ~2 seconds):</p>

      <pre>
        <code>{`USE_MOCK_DATA=true python -m pytest -q tests`}</code>
      </pre>

      <hr />

      <h2>What this makes possible</h2>

      <p>
        The payoff is not just finding the waste — it is the workflow. Every finding in Shadow Cost carries the
        full FinOps ROI contract: resource, £/month, engineering hours, risk level, tier (Crawl / Walk / Run),
        business value narrative, and a dry-run-default bash script using the native cloud CLI. Engineers get the
        context they need to evaluate, approve, and apply the fix in one queue entry.
      </p>
      <p>
        The per-owner routing closes the accountability gap. When a team has a queue with their name on it and
        concrete numbers, cost conversations stop being abstract. "Your queue has £1,840 of monthly savings with 6
        hours of effort" is a different conversation from "we need to cut cloud costs."
      </p>
      <p>
        The advisor diff gives FinOps practitioners something they have rarely had: evidence. When the native
        advisor would have recommended 12 downsizes that would have caused incidents at P95, and Shadow Cost
        caught all 12, that is a concrete case for why your tooling investment pays off — in avoided incidents as
        much as in savings.
      </p>
      <p>
        The app is open source and I am actively developing it. If you are a FinOps practitioner who has run into
        the same gap — environments that look clean in native tooling but are not — I would be glad to hear how
        it performs against your estate.
      </p>

      <hr />

      <div className="border border-line p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">Open source</p>
        <p className="mt-2 font-serif text-xl text-ink">Shadow Cost</p>
        <p className="mt-2 text-sm text-muted">
          FastAPI, vanilla JS, Python 3.11+. 217 tests, all runnable with{" "}
          <code>USE_MOCK_DATA=true</code> — no cloud credentials needed to explore or contribute.
        </p>
        <a
          href="https://github.com/Johhnmarshal/finops-shadow-cost"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
        >
          github.com/Johhnmarshal/finops-shadow-cost →
        </a>
      </div>
    </>
  );
}
