# Skillpack (portable)

This folder provides a **rules-first, portable** way to use AI agents “like an employee with a process” across projects.

Principles:
- **Rules are rules; skills are skills**: rules only orchestrate; skills live under `skillpack/skills/**` unchanged.
- `skillpack/skills-active/**` contains **only manifests and link indexes** (no skill content copied).
- CORE is always enabled; modules are added based on project type.

Start here:
- `skillpack/rules/router.md`

If you're using an agent:
- Claude: `skillpack/rules/adapters/claude.md`
- Codex: `skillpack/rules/adapters/codex.md`
- Cursor: `skillpack/rules/adapters/cursor.md`

Active view (generated manually by following router rules):
- `skillpack/skills-active/manifest.md`
