---
title: "A workflow can run green every day and still do nothing"
description: "Most automation does not fail loudly. It reports success while writing nothing useful. This is what to ask a provider before you hire one."
publishedAt: 2026-08-08
author: "Joey Tan"
tags: ["operations", "automation", "buying guide"]
---

A workflow runs every morning at seven. The run history is green. No failed
steps, no alerts, nothing in the error log. It has looked like that for weeks.

The records it created are empty. A field name changed in the tool at the other
end, the mapping stopped matching and the workflow did exactly what it was told.
It ran. It wrote. It reported success.

None of that is an error, so nothing reported one.

## Why is this the normal failure and not the rare one?

Because automation is built to complete, not to be correct. A step fails when it
cannot finish: the API is down, the credential expired, the file is missing.
Those are loud, and every provider handles them. Retries, logging, an alert in
Slack.

The expensive failures finish. Something upstream changes shape, the workflow
keeps running against the new shape, and the output is wrong in a way the system
has no opinion about. Green run, empty result.

Loud failures get fixed the same week. Quiet ones run until someone downstream
happens to look.

## What should I ask an automation provider?

Most buying guides tell you to ask how a provider handles errors. Every provider
has an answer, and it is usually the name of a feature. That covers the case
where something throws.

Ask this instead:

> How would this system tell me it had stopped doing its job, in a week where
> nothing errored?

A provider who has run their own builds in production for a while will
recognise the question immediately. One who has mostly demoed things will answer
with monitoring features again.

## What does a good answer sound like?

Three things, roughly.

**A check the workflow cannot satisfy by itself.** If the workflow both does the
work and confirms the work, it is grading its own homework. The confirmation has
to come from a system it does not control: the count in the source, not the count
it wrote. This is the [same shape as an invoice that adds up perfectly and is
still wrong](/blog/an-invoice-can-be-perfect-and-still-be-wrong/).

**An alert on absence, not just on failure.** Most alerting fires when something
goes wrong. The more useful one fires when something that should have happened
did not: no orders processed today, when there are always orders. Silence is the
symptom you are trying to catch, so silence has to be something the system can
notice.

**A named number somebody actually looks at.** Weekly, on a person's calendar.

Then one more question, which tells you more than the rest combined: what broke
on your last build, and how did you find out? If the answer is that nothing has
broken, either they have not shipped much or they are not looking.

## Do I need a provider at all?

If the job is one connection between two tools that both publish a native
integration for each other, buy the integration. Fifty euros a month and an
afternoon beats a project, and any provider telling you otherwise is selling you
a project.

Bringing someone in earns its cost when the work crosses several systems and
somebody has to decide what counts as correct in the first place. That decision
is the actual work. The connecting is the easy part, and it is getting easier
every year.

## The two questions

How would this system tell me it had stopped doing its job, in a week where
nothing errored? And what broke on your last build, and how did you find out?

If you want a second opinion on something you are about to commission, that is
what an Ops Call is for. Twenty minutes, no pitch.
