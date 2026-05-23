# RULE: Skillpack Router (Rules-only)

## Non-negotiables
- Do NOT copy/paste any skill contents into `skills-active/**`.
- Skills live under `skillpack/skills/**` **unchanged** (ECC/anthropics format is preserved).
- This router produces ONLY:
  - `skillpack/skills-active/manifest.md`
  - `skillpack/skills-active/*/index.md` (link lists)
  - Optional agent entrypoints (`CLAUDE.md`, `.codex/*`, `.cursor/rules/*`) that point to `skillpack/rules/adapters/<agent>.md`.
- CORE is always enabled (Core-10 + Core+). Modules are added by project type.
- After creating indexes, the agent MUST open and read every linked skill file before doing any work.

---

## Step 0 — Ask & wait (do not proceed until answered)
Ask the user and WAIT for answers:
1) Which agent environment(s) will be used? (any): Claude / Codex / Cursor / Mixed
2) Project types (multi-select): Backend API / Frontend Web / Mobile / DevOps/Infra
3) Primary languages: (e.g. TypeScript, Python, Go, Kotlin, Swift, Rust, Java)
4) Frameworks/stacks: (e.g. Next.js, NestJS, Django, FastAPI, Spring Boot, Terraform, Kubernetes)
5) Testing level required: unit only / integration / e2e
6) Security/compliance constraints (if any)

---

## Step 1 — Activate CORE (always)
Create/refresh `skillpack/skills-active/core/index.md` linking to these skills (prefer ECC source; fallback to anthropics if you have a better match):

### Core-10 (mandatory)
1. plan-orchestrate
2. search-first
3. product-lens
4. architecture-decision-records
5. coding-standards
6. plankton-code-quality
7. verification-loop
8. tdd-workflow
9. security-review
10. github-ops

### Core+ (recommended)
11. codebase-onboarding
12. agent-architecture-audit
13. error-handling
14. git-workflow

**Important**: `core/index.md` must include a header that explicitly instructs the agent to open and read every linked skill.

---

## Step 2 — Select modules & create indexes
Based on the answers, create/refresh these indexes as needed (and leave others empty but present, or include a short "Not enabled" note):
- `skillpack/skills-active/backend/index.md`
- `skillpack/skills-active/frontend/index.md`
- `skillpack/skills-active/mobile/index.md`
- `skillpack/skills-active/devops/index.md`
- `skillpack/skills-active/testing/index.md`
- `skillpack/skills-active/security/index.md`

Each index is:
- A short header
- A hard instruction to read all links
- A bullet list of relative links pointing into `skillpack/skills/**`

Module suggestions (ECC skill names):

### Backend
- api-design
- backend-patterns
- database-migrations
- (stack-specific) django-patterns / fastapi-patterns / nestjs-patterns / springboot-patterns / quarkus-patterns

### Frontend Web
- frontend-patterns
- accessibility
- browser-qa (if UI QA)
- e2e-testing (if required)

### Mobile
- android-clean-architecture (Android)
- dart-flutter-patterns (Flutter)
- swiftui-patterns (iOS/Swift)

### DevOps/Platform
- deployment-patterns
- automation-audit-ops
- terminal-ops (optional)
- security-scan (optional hard gate)

### Testing (by language)
- python-testing / golang-testing / rust-testing / kotlin-testing / cpp-testing / csharp-testing / …

### Security
- security-review (already in core)
- security-scan (if you want an automated scanning gate)

---

## Step 3 — Write manifest for human review
Create/refresh `skillpack/skills-active/manifest.md` containing:
- Date/time
- Selected agent(s)
- Selected project types
- Enabled CORE list
- Enabled module skills list
- Skill source per item (ECC vs anthropics) and the file link
- A hard instruction: "Before doing any work, read all linked skills (core + modules)."
- Execution gates: the CORE order must be followed.

---

## Step 4 — Hand off to the correct adapter
If user selected:
- Claude -> follow `skillpack/rules/adapters/claude.md`
- Codex -> follow `skillpack/rules/adapters/codex.md`
- Cursor -> follow `skillpack/rules/adapters/cursor.md`
- Mixed -> follow all adapters; keep manifest + indexes consistent
