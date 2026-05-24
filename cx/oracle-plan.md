# cx Oracle Plan

## Decision

`cx` is no longer the generic Wave 0 template recipe.

The first shippable `cx` release is a safe cmux-aware Pi harness for read-only cmux context inspection and next-action drafting.

It installs:

- `pi-cx` for interactive mode.
- `p-cx` for one-shot mode.

## Rationale

The project-wide Oracle pass originally used `cx` as the Wave 0 minimal Pi harness to prove launcher rendering, prompt loading, session layout, install/uninstall, and doctor behavior.

That proof is complete enough to stop treating `cx` as only a template. The goal also requires migrating `cx`, `kx`, and `zx` from existing zsh wrapper patterns. The existing `cx/cxi` wrapper is not a generic bare harness; it is a cmux-specialized Codex wrapper.

The first release should therefore migrate the useful legacy behavior while removing unsafe behavior.

## Legacy Behavior Kept

- low ambient context
- cmux-specific assistance
- local cmux CLI reference through `cmux --help`
- interactive and one-shot entrypoints

## Legacy Behavior Removed

- runtime remote fetch of cmux skill text
- direct Codex invocation
- dangerous Codex bypass flags
- broad shell access
- silent cmux topology mutation
- bare `cx` / `cxi` aliases

## First-Release Scope

Allowed command surface:

```sh
pwd
command -v cmux
cmux --help
cmux -h
cmux identify --json
cmux list-windows
cmux list-workspaces
cmux list-panes
cmux list-pane-surfaces --pane pane:<number>
pi --help
pi -h
pi --version
pi -v
```

Denied command surface:

- `codex ...`
- `cx ...`
- `cxi ...`
- `pi-cx ...`
- `p-cx ...`
- `curl ...`
- `wget ...`
- cmux topology mutation
- cmux send/input/exec/focus/open commands
- filesystem read/write commands
- credential/environment inspection
- package managers and installers
- git mutation
- broad shell and app-control commands

## Naming Policy

Do not split this slice into `cmux/`. `cx/` owns the migrated legacy workflow.

A future `cmux/` recipe may exist only if broader cmux automation or topology mutation is explicitly designed with its own Oracle pass, prompt contract, allowed command surface, confirmation policy, and tests.

## Verification

Required checks:

```sh
bin/pisolates validate all
cx/tests/smoke.sh
bin/pisolates policy-test cx 'cmux identify --json'
! bin/pisolates policy-test cx 'cmux new-workspace scratch'
! bin/pisolates policy-test cx 'codex exec hello'
```
