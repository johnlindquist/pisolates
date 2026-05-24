# Sanitized Candidate Inventory

This inventory is reviewable source material for future pisolates. It is not generated from raw committed Atuin history and does not include private command arguments.

## Implemented Or Scaffolded

| Name | Status | Canonical Commands | Notes |
| --- | --- | --- | --- |
| `cx` | framework template | `pi-cx`, `p-cx` | Minimal Pi harness proving install, plan, policy, doctor, and uninstall. |
| `bm` | first nontrivial recipe | `pi-bm`, `p-bm` | Local-only Basic Memory inspection. Raw note reads/writes, cloud, MCP, project mutation, and reset are blocked. |
| `bird` | first social recipe | `pi-bird`, `p-bird` | Read/search/analyze/draft only. Posting, credential flags, private account surfaces, and unbounded pagination are blocked. |
| `kx` | scaffold | `pi-kx`, `p-kx` | Requires per-tool Oracle pass before write-capable Karabiner migration. |
| `zx` | scaffold | `pi-zx`, `p-zx` | Requires per-tool Oracle pass before shell-config migration. |

## Current Wrapper Source Hits

These were found in local zsh config during Oracle evidence gathering:

| Wrapper | Source |
| --- | --- |
| `cx` | `~/.config/zsh/conf.d/49-codex-bare-dsl.zsh` |
| `kx` | `~/.config/zsh/conf.d/49-codex-bare-dsl.zsh` |
| `zx` | `~/.config/zsh/conf.d/49-codex-bare-dsl.zsh` |
| `linear`, `linex` | `~/.config/zsh/conf.d/49-codex-bare-dsl.zsh` |
| `aidbg`, `aifix` | `~/.config/zsh/conf.d/47-ai-debug.zsh` |
| `aicm`, `aicommit`, `aiprdesc` | `~/.config/zsh/conf.d/43-ai-commit.zsh` |
| `xpor`, `xreview`, `xfan` | `~/.config/zsh/conf.d/46-ai-swarm-oracle-dsl.zsh` |
| `xloop` | `~/.config/zsh/conf.d/45-ai-diagram-loop-dsl.zsh` |

## Required External CLI Candidates

| Tool | Why It May Deserve A Pisolate | First Safety Question |
| --- | --- | --- |
| `gh` | GitHub triage, PR review, issue workflows | Which write commands require confirmation or separate mode? |
| `linear` | Issue/project inspection and updates | How should API-backed writes be confirmed and logged? |
| `packx` | Context bundling for Oracle and code review | How to avoid bundling secrets or oversized private logs? |
| `oracle` | Research/planning workflows | How to preserve Oracle-vs-local-agent boundaries? |
| `cmux` | Workspace/tab orchestration | Which commands mutate running sessions or user terminals? |
| `lat` | Local project-doc/lattice workflow where present | Which repos still use it and which commands are retired? |

## High-Frequency Tool Families To Review

These came from the goal inventory and should be regenerated with `scripts/discover-atuin-tools` before implementation:

- `git`
- `gh`
- `pnpm`
- `bun`
- `npm`
- `npx`
- `codex`
- `claude`
- `gemini`
- `packx`
- `bm`
- `cargo`
- `goku`
- `vercel`
- `rg`
- `sqlite3`
- `op`

## Rules For Future Inventory Updates

- Keep raw Atuin history out of committed files.
- Sanitize private paths, arguments, tokens, URLs, and account identifiers.
- Add one candidate at a time unless the group shares a proven command policy.
- Run a per-tool Oracle pass before implementing any substantial recipe.
