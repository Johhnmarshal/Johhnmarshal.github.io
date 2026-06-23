---
title: "Five Cloud Costs That Hide in Plain Sight"
date: 2026-05-23
description: "The biggest cloud savings rarely come from the line items everyone watches. Here are five sources of waste that slip past most monthly reviews — and how to surface them."
---

Most cloud cost reviews focus on the obvious: the biggest compute line, the database that doubled, the egress spike everyone already saw on the bill. Those matter. But after a few years of building FinOps practices across AWS, Azure and GCP, I've found that the savings that actually move the number tend to hide in the places nobody is looking. They don't show up as a dramatic spike — they show up as a steady, quiet drip that everyone has learned to ignore.

Here are five of the most common, and how to bring them into view.

## 1. Idle non-production environments

Development, staging, and test environments rarely need to run 24/7, yet they almost always do. A fleet of dev instances left running overnight and through the weekend is paying for roughly 128 hours a week that nobody uses. Automated shutdown schedules — spinning environments down outside working hours — routinely cut non-prod compute by a third or more, with zero impact on engineers.

The reason this hides is that no single environment is expensive enough to flag. It's death by a thousand small instances.

## 2. Orphaned storage and unattached disks

When a virtual machine is deleted, its attached disks, snapshots, and load balancer IPs don't always go with it. Over months, these orphaned resources accumulate into a meaningful storage bill that maps to nothing currently running. Because they aren't tied to an active workload, they never appear in a service owner's mental model of "their" costs.

A simple recurring query for unattached volumes and snapshots older than a retention threshold turns this from invisible to a one-click cleanup.

## 3. Over-provisioned instances

Rightsizing is the least glamorous lever in FinOps and one of the most reliable. Teams pick an instance size at launch — usually generously — and never revisit it. Utilization data tells a different story: CPU sitting at 8%, memory barely touched. The workload would run identically on something half the size and half the price.

The trick is making the recommendation *actionable*. A dashboard that says "this instance is oversized" is ignored. One that says "switch this to a smaller size and save £140/month, here's the change" gets done.

## 4. Unused commitment coverage

Reserved Instances, Savings Plans, and Committed Use Discounts are powerful — until coverage drifts away from actual usage. A commitment bought for a workload that has since been re-architected keeps charging while the discount applies to nothing. Conversely, steady on-demand usage with no commitment at all is leaving 30–50% on the table.

Tracking commitment *coverage* and *utilization* as first-class KPIs — not just total spend — is what keeps this honest.

## 5. AI and data workloads with no cost owner

This is the newest entry and the fastest-growing. Generative AI and large data-processing jobs can run up enormous bills in a way that's genuinely hard to attribute. Token consumption, model endpoints, and ad-hoc training runs often land in a shared subscription with no tagging and no owner. By the time it shows up in the monthly bill, it's already spent.

The fix isn't technical — it's organizational. Tag AI workloads by team from day one, and put a daily cost view in front of the product owners actually scaling them.

---

None of these require a platform migration or a big project. They require *visibility* — the unglamorous work of getting the right numbers in front of the right people, often enough that they can act before the spend is locked in. That's really what FinOps is: not cutting costs once, but building the habit of seeing them clearly.

*Want to compare notes on building a FinOps practice? [Get in touch](/#contact).*
