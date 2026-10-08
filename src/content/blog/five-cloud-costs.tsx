export function FiveCloudCosts() {
  return (
    <>
      <p>
        I've spent six years doing FinOps work across AWS, Azure, and GCP. In that time I've seen organisations
        obsess over Reserved Instance coverage rates and Savings Plans utilisation while quietly burning money on
        things that never appear in a cost-optimisation checklist. Here are the five categories of cloud spend that
        hide in plain sight — and how to find them.
      </p>

      <h2>1. Idle non-production environments</h2>

      <p>
        Development, staging, and QA environments are the single largest source of unrecognised cloud waste I
        encounter. The pattern is consistent: a team spins up a staging environment for a release, the release ships,
        and the environment keeps running — because nobody owns the off switch.
      </p>
      <p>
        What makes this category hard to find is that the resources are not underutilised in the conventional sense.
        A staging database running at 3% CPU is not flagged by AWS Compute Optimizer or Azure Advisor. It looks
        healthy. It is just unnecessary.
      </p>
      <p>
        The signal I use is uptime combined with tag enforcement. Any non-production environment running continuously
        for more than 30 days without a tagged owner and an active project code is a candidate for review. In
        practice, 40–60% of those reviews result in a decommission.
      </p>
      <p>
        The fix is not a one-time sweep — it is a policy. Automated shutdown scripts on a schedule, enforced owner
        tags on all non-production resources, and a process that makes "keep this running" an active choice rather
        than the default.
      </p>

      <h2>2. Orphaned storage and unattached disks</h2>

      <p>
        When a virtual machine is deleted, its managed disk often is not. The same is true for snapshots created
        during a migration that was completed two years ago, S3 buckets from a project that was decommissioned, and
        Azure Storage accounts that were the backend for an application nobody runs anymore.
      </p>
      <p>
        Storage waste is particularly insidious because it compounds quietly. A 1 TB Premium SSD in Azure costs
        around £130/month. One orphaned disk is a rounding error. Fifty of them across a large enterprise is a
        meaningful line item — and they are almost never in any optimisation report because they are fully utilised
        from the cloud provider's perspective.
      </p>
      <p>
        The detection query is straightforward: find all managed disks where the disk state is{" "}
        <code>Unattached</code>, all S3 buckets with zero access events in the last 90 days, all GCP persistent
        disks not attached to a running instance. Cross-reference against your tagging taxonomy to identify the team
        responsible. In most organisations this produces an immediate list of confirmed waste with no ambiguity.
      </p>

      <h2>3. Over-provisioned instances</h2>

      <p>
        This one appears on every optimisation checklist, but the standard approach of looking at 14-day average CPU
        misses a significant portion of the opportunity — and creates a new risk.
      </p>
      <p>
        The problem with averages is that they smooth out the spikes that define production load profiles. A web
        application that runs at 15% average CPU but spikes to 85% every morning at 08:30 looks like a downsize
        candidate. It is not. Downsizing it triggers an incident the following Monday morning.
      </p>
      <p>
        The signal I trust is P95 and P99 over 30 days, combined with a memory signal where agents are installed.
        A VM is a safe downsize candidate only when both P95 CPU and P95 memory are below conservative thresholds.
        Anything where P99 CPU exceeds 80% is a keep, regardless of what the average looks like.
      </p>
      <p>
        The secondary signal is the advisor diff: cross-reference your peak-aware verdicts against what AWS Compute
        Optimizer or Azure Advisor recommends. In my experience, 15–35% of advisor recommendations would have caused
        an incident if applied. That number is the business case for investing in better rightsizing tooling.
      </p>

      <h2>4. Unused commitment coverage</h2>

      <p>
        Reserved Instances, Savings Plans, Committed Use Discounts — commitment-based pricing is how cloud providers
        reward predictable spend. The problem is that commitments bought against one workload profile become waste
        when the workload changes, and most organisations do not have a process for tracking commitment drift.
      </p>
      <p>
        The signal is coverage rate combined with coefficient of variation. A commitment covering an instance that
        has been resized twice in the past year has low effective coverage. A Savings Plan purchased at peak spend
        during a major migration is now over-committed against a normalised estate. These do not surface as waste in
        any native tool — the commitment is "used", the coverage rate looks fine — but the economics are wrong.
      </p>
      <p>
        The remediation depends on the cloud. Azure RIs can be returned within a refund window (up to $50k/year).
        AWS Savings Plans cannot — the remediation there is to wait out the term and buy more carefully next time,
        using a stability score to qualify candidates before committing. GCP CUDs have no cancellation mechanism at
        all, which means the guardrail has to be in the purchasing decision.
      </p>

      <h2>5. AI and data workloads with no cost owner</h2>

      <p>
        Generative AI spend is the fastest-growing category of unattributed cloud cost I am seeing right now. The
        pattern is predictable: a team experiments with Azure OpenAI or Bedrock, the experiment succeeds, usage
        grows, and nobody has established a cost owner, a budget, or a token-per-request benchmark.
      </p>
      <p>
        Token economics are not intuitive. A GPT-4o call that processes a 50-page document in context might cost
        30–50× more than the same query against a smaller context. A team running daily summarisation jobs without
        context window discipline can easily spend £15–20k/month without realising it — and because the spend is
        tagged to a shared API key rather than a team, it is invisible until the invoice arrives.
      </p>
      <p>
        The fix has three parts: enforce per-team API key assignment so spend is attributable at the team level;
        instrument token usage per request so you can see which prompts are expensive; and set token budgets with
        alerting so surprises happen before month-end rather than at it.
      </p>

      <hr />

      <p>
        None of these categories require exotic tooling to detect. They require the same thing every FinOps
        programme requires: clear ownership, enforced tagging, and someone whose job it is to look.
      </p>
      <p>
        Want to compare notes on building a FinOps practice?{" "}
        <a href="/#contact">Get in touch</a>.
      </p>
    </>
  );
}
