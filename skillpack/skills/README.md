# Skill sources (managed via git submodules)

This folder uses **git submodules** to vendor skill sources while preserving their original formats.

Submodules:
- ECC: `skillpack/skills/ecc` (repo: affaan-m/ECC)
- anthropics/skills: `skillpack/skills/anthropics` (repo: anthropics/skills)

After cloning/pulling, run:

```bash
git submodule update --init --recursive
```

ECC skills will be available under:
- `skillpack/skills/ecc/skills/**`

anthropics skills will be available under:
- `skillpack/skills/anthropics/**`

Note: Submodules are pinned to specific commits in the parent repo. Update them intentionally when desired.
