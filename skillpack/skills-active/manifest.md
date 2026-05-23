# Active Skillpack Manifest

> IMPORTANT: Before doing any work, you MUST open and read:
> - `skillpack/skills-active/core/index.md`
> - and every enabled module index under `skillpack/skills-active/**/index.md`
> - and then open every linked skill file.

## Status
- Last updated: 2026-05-23
- Owner/repo: local triet-hoc workspace

## Selected agent environment(s)
- Codex

## Project type(s)
- Backend API
- Frontend Web
- DevOps/Infra

## Stack summary
- Languages: Python 3.12+, TypeScript
- Frameworks: FastAPI, SQLAlchemy 2.0, Alembic, React, Vite, Tailwind CSS, React Router, Zustand, Recharts
- CI/testing level: backend unit tests + basic API tests
- Security/compliance constraints: admin JWT, no quiz-taker PII, public result links only

---

## Enabled CORE (mandatory)
Core-10 + Core+ are always enabled. See:
- `core/index.md`

## Enabled modules (selected)
- Backend: `backend/index.md`
- Frontend: `frontend/index.md`
- DevOps: `devops/index.md`
- Testing: `testing/index.md`
- Security: `security/index.md`

## Skill source availability
- The router and Codex adapter are present and have been read.
- The portable `skillpack/skills/**` content is not present in this workspace beyond its README, so linked ECC skill files cannot be opened here.
- Execution will still follow the listed gates conceptually, with the repo instructions, Codex engineering rules, and available built-in skills/plugins as the fallback.

---

## Execution gates (must follow this order)
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

## Approvals
- After each gate, summarize what you did and ask for approval before continuing.
