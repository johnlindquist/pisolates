# pisolates

`pisolates` is a cookbook and installer for narrow Pi harnesses. Each top-level recipe combines `pi` with one tool or workflow, then installs stable commands:

- `pi-<tool>` for interactive Pi sessions.
- `p-<tool>` for one-shot `pi --print` sessions.

Pi is the agent substrate. Pisolates is the policy, launcher, prompt, installer, and documentation layer around it.

## Install

From a checkout:

```sh
./install.sh --pisolate cx --no-shell --yes
```

Hosted install target:

```sh
curl -fsSL https://raw.githubusercontent.com/johnlindquist/pisolates/main/install.sh | sh
```

The default install root is `~/.pisolates`:

```text
~/.pisolates/
  bin/
  installer/
  pisolates/
  shell/
  state.json
```

Shell integration is explicit. If you skip it, add this yourself:

```sh
export PATH="$HOME/.pisolates/bin:$PATH"
```

## Commands

```sh
bin/pisolates list
bin/pisolates validate all
bin/pisolates install cx --no-shell --yes
bin/pisolates doctor cx
bin/pisolates uninstall cx
```

Installed launchers support diagnostics without invoking the model:

```sh
~/.pisolates/bin/pi-cx --pisolates-plan
~/.pisolates/bin/p-cx --pisolates-policy
```

## Security Boundary

Pi is not an OS sandbox. A pisolate narrows and documents the working directory, prompt, Pi tool list, session directory, and command policy, but it does not create a kernel-level jail.

The first-wave launcher uses:

- An isolated `PI_CODING_AGENT_DIR` under `~/.pisolates/pi-agent`.
- Per-recipe session directories.
- A generated policy summary in the prompt.
- A shared Pi guard extension loaded with `-e installer/pi-guard.ts`.
- A no-dependency command policy tester for local verification.

Credential reuse is explicit. `pisolates doctor` reports auth presence, but install does not copy, symlink, or print tokens.

## Authoring A Recipe

Each recipe lives at the repo root:

```text
bm/
  pisolate.json
  README.md
  prompt.md
  oracle-plan.md
  tests/
```

Every substantial recipe needs an Oracle planning pass before implementation. The project-wide pass is recorded in recipe `oracle-plan.md` placeholders and the Oracle session `pisolates-pi-architectu`.

Recipe manifests use `schemaVersion: 1`, explicit modes, required executables, command policy, smoke checks, and install conflict rules. Current recipes intentionally default to full CLI access unless a future recipe narrows itself.

## Current Recipes

- `cx`: full-access cmux-oriented Pi harness.
- `bm`: full-access Basic Memory Pi harness.
- `bird`: full-access Bird X/Twitter CLI Pi harness.
- `kx`: full-access Karabiner config Pi harness.
- `zx`: full-access zsh config Pi harness.

## No Root Package Workspace

This repo intentionally has no root `package.json`, no root npm/pnpm/bun workspace, and no nested `pisolates/` recipe directory. Shared framework files live in `installer/`, `bin/`, `scripts/`, and `schema/`.
