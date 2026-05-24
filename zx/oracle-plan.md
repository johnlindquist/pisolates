# Oracle Plan

Oracle session: `pisolates-zx-recipe`

`zx` deserves a Pi recipe because it directly maps a current bespoke wrapper into an installable, auditable `pi-zx` / `p-zx` harness.

First shippable slice:

- Scoped zsh wrapper maintainer rooted at `~/.config`.
- Edits only `zsh/conf.d/49-codex-bare-dsl.zsh` and `zsh/tests/49-codex-bare-dsl-zx.zsh`.
- Reads only focused wrapper/test context.
- Runs focused syntax/test checks without launching real long-running agents.

Required guardrails:

- Preserve unrelated dirty zsh changes.
- No broad shell startup rewrites.
- No `.zshrc`, `local.zsh`, `00-secrets.zsh`, `codex-env.zsh`, history, cache, or session edits.
- No package managers, installers, arbitrary interpreters, real agent execution, or git mutation.
- No legacy bare `zx` / `zxi` aliases from installer.
