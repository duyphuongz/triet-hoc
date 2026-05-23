# RULE: Claude Adapter

## Purpose
This file defines how **Claude** should consume the skillpack.

## Entry point contract
The repository root `CLAUDE.md` (if present) MUST instruct:
1) Read `skillpack/skills-active/manifest.md`
2) Then open and read every file linked from:
   - `skillpack/skills-active/core/index.md`
   - plus any enabled module indexes
3) Follow the CORE execution gates (in order):
   plan-orchestrate -> search-first -> product-lens -> ADR -> coding-standards -> code-quality -> verification-loop -> tdd/testing -> security-review -> github-ops

## Hard gates
- Never claim completion until `verification-loop` has been executed.
- Never propose shipping/merging changes that affect production/security posture without a `security-review` pass.

## Output style
- Provide a short, reviewer-friendly summary at each gate.
- Ask for approval at the end of each gate before proceeding to the next.
