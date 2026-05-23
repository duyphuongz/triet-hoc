# RULE: Cursor Adapter

## Purpose
This file defines how **Cursor** should consume the skillpack.

## Contract
Cursor must:
1) Read `skillpack/skills-active/manifest.md`
2) Read all linked CORE skills
3) Read all linked module skills

## Behavior requirements
- Prefer small, reviewable diffs.
- Request explicit approval at key gates (plan, ADR decision, security).

## Execution gates
Follow the CORE gate order listed in `skillpack/skills-active/manifest.md`.
