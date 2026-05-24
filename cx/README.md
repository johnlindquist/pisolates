# cx

`cx` is a safe cmux-context Pi harness. It installs:

- `pi-cx` for interactive cmux context inspection.
- `p-cx` for one-shot cmux context inspection.

This recipe migrates the useful part of the legacy `cx/cxi` wrapper: a low-ambient assistant that understands cmux. It does not preserve the unsafe parts of that wrapper.

## First-Release Contract

`cx` can:

- inspect whether `cmux` is available
- inspect local `cmux --help`
- identify the current cmux context
- list cmux windows, workspaces, panes, and pane surfaces
- explain the observed cmux layout
- draft next cmux actions for the user to run manually

`cx` cannot:

- run Codex
- recursively launch `cx`, `cxi`, `pi-cx`, or `p-cx`
- fetch cmux skill text or remote docs at runtime
- mutate cmux topology
- send input to panes
- execute commands through cmux
- read or write local files
- inspect secrets, shell config, environment variables, browser stores, Pi auth, Codex auth, or Oracle sessions
- install packages
- mutate git state

## Allowed Commands

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

## Blocked cmux Commands

The first release blocks cmux topology and interaction commands, including:

```sh
cmux new-workspace ...
cmux new-split ...
cmux move-surface ...
cmux split-off ...
cmux reorder-surface ...
cmux trigger-flash ...
cmux send ...
cmux type ...
cmux paste ...
cmux run ...
cmux exec ...
cmux open ...
cmux attach ...
cmux focus ...
cmux select ...
cmux activate ...
```

## Naming

This recipe installs only:

```sh
pi-cx
p-cx
```

It does not install bare `cx` or `cxi` aliases. It does not install `pi-cmux` or `p-cmux`. A future `cmux/` recipe should own broader cmux automation or topology mutation if that ever becomes necessary.

## Security Boundary

Pi is not an OS sandbox. `cx` narrows the prompt, working root, Pi tool list, and command policy. It does not create a kernel-level jail.

The first release is intentionally read-only. One-shot mode blocks confirmation-required commands by default, and this recipe defines no write-capable commands.
