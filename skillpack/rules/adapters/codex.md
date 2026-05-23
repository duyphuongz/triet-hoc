# RULE: Codex Adapter

## Purpose
This file defines how **Codex** should consume the skillpack.

## Contract
Before doing any work, Codex must:
1) Read `skillpack/skills-active/manifest.md`
2) Open every link in `skillpack/skills-active/core/index.md`
3) Open every link in the enabled module indexes

## Execution gates (must be followed)
1) plan-orchestrate
2) search-first
3) product-lens
4) architecture-decision-records
5) coding-standards
6) plankton-code-quality
7) verification-loop
8) tdd-workflow / testing module
9) security-review
10) github-ops

## Completion gate
Do not say "done" unless verification-loop is satisfied and you have summarized what was verified.
