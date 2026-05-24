# zx

`zx` is a scoped Pi harness for focused zsh wrapper/config work under `~/.config`. It installs:

- `pi-zx` for interactive zsh wrapper/config work.
- `p-zx` for one-shot zsh wrapper/config work.

## First-Release Scope

`zx` may edit only:

- `zsh/conf.d/49-codex-bare-dsl.zsh`
- `zsh/tests/49-codex-bare-dsl-zx.zsh`

It may inspect focused wrapper/test context and run focused syntax/test checks.

## Allowed

- Focused `git status`
- Focused `git diff` / `git diff --check`
- Exact reads of focused context files
- Focused `zsh -n`
- `zsh -f zsh/tests/49-codex-bare-dsl-zx.zsh`
- Scoped edit of the two target files

## Blocked

- Edits to `.zshrc`, `local.zsh`, `00-secrets.zsh`, `codex-env.zsh`
- Edits to unrelated dirty zsh files
- Edits to startup regression tests
- Package managers and installers
- Real agent execution from tests
- Git mutation
- Broad startup rewrites
- Shell history/auth/token reads

## Verification

A successful run reports:

- Changed files, limited to the two editable paths
- Focused `zsh -n` results
- Focused zx zsh test result
- `git diff --check` result
- Focused diff
- Confirmation that unrelated dirty zsh files were not touched
