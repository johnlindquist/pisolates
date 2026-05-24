# Pisolates: Shareable Pi Isolation Harness Collection

## Objective

Create a repo in `~/dev/pisolates` for collecting easy-to-install, single-purpose Pi agent harnesses.

The final goal is not just to migrate `cx`, `kx`, and `zx`. The repo should eventually contain Pi isolation recipes for all current bespoke local agent/tool wrappers, plus high-value command-line tools discovered from shell config and Atuin history. Each recipe should combine Pi with one target CLI or workflow in a completely isolated, auditable way.

The repo should include a simple installer that lets users pick which pisolates they want, installs them into a user-owned location, and exposes stable `pi-*` and `p-*` commands on the user's `PATH`.

## Name

Use `pisolates` as the project/repo name.

Working meaning:

- `pi` plus `isolates`
- a collection of isolated Pi harnesses
- each harness is intentionally narrow, tool-specific, and installable

## Background

One recurring challenge with Codex workflows is building bespoke, isolated, single-purpose agent harnesses. Existing local zsh functions such as `cx`, `kx`, `zx`, `bx`, `linear`, and related `x*` wrappers solve this by launching an agent with a narrow prompt, a constrained working directory, and specific CLI affordances.

`pi.dev` may be a better substrate for this pattern because it can use an existing Codex subscription while making harness customization easier than hand-maintained shell functions.

This repo should become the shareable cookbook for those harnesses.

## Core Principle

Every recipe should answer one question:

> How do we combine Pi with this one tool or workflow so the agent can do useful work while staying completely isolated from unrelated context, tools, credentials, and repo state?

Each pisolate should have:

- a narrow purpose
- explicit allowed commands
- explicit working-directory behavior
- explicit prompt/context files
- explicit install/uninstall behavior
- a verification recipe
- documented risks and guardrails

## Oracle Research Requirement

`oracle-packx` must be the researcher/planner for the project as a whole and for each substantial recipe.

### First Oracle Pass

Before implementing the framework, use `oracle-packx` to deeply understand Pi:

- Pi's current harness model
- supported languages and runtimes
- auth model for using an existing Codex subscription
- how Pi handles prompts, tools, local commands, environment, and isolation
- how Pi recipes should be packaged and shared
- whether TypeScript, JavaScript, Python, Rust, shell, or config-only harnesses are the best fit
- how to create one-shot versus interactive harnesses
- what security boundaries Pi actually provides versus what the launcher must enforce

Oracle deliverable:

- recommended repo architecture
- manifest schema
- installer strategy
- one first shippable recipe
- verification plan
- risks and unknowns

### Per-Tool Oracle Pass

For each tool or workflow recipe, use `oracle-packx` before implementation.

Each per-tool Oracle prompt should include:

- the target CLI help output
- representative Atuin commands
- relevant existing zsh wrapper source
- desired command names
- expected working root
- credential/config locations that must not leak
- user-visible tasks the harness should handle
- isolation requirements
- install/update/uninstall expectations

Oracle should produce:

- whether the tool deserves a Pi recipe
- recommended recipe shape
- prompt contract
- allowed command surface
- denied command surface
- environment variables and config handling
- tests and smoke checks
- one first shippable slice

Do not implement a substantial recipe without this Oracle planning pass unless the recipe is a tiny mechanical copy of an already-proven pattern.

## Desired User Experience

A user should be able to:

1. Clone or reference the `pisolates` repo.
2. Run a single installer command from the hosted repo.
3. See a list of available pisolates grouped by category.
4. Pick one or more pisolates to install.
5. Get stable commands on their `PATH`, such as `pi-kx`, `p-kx`, `pi-bird`, `p-bird`, `pi-gh`, `p-gh`, `pi-cmux`, or `p-cmux`.
6. Run those commands from any directory with predictable isolation.
7. Inspect exactly what a pisolate can access.
8. Update or uninstall installed pisolates without hand-editing shell config.

The installer should make installed state obvious and reversible.

## Repository Shape

The repo root should be the actual collection of pisolate directories. This should not be a package-managed monorepo with a root `package.json`, and recipes should not be hidden under a second `pisolates/` nesting layer.

Proposed shape:

```text
pisolates/
  .goals/
    recipes.md
  README.md
  install.sh
  cx/
    pisolate.json
    README.md
    prompt.md
    harness
    oracle-plan.md
    fixtures/
    tests/
  kx/
    pisolate.json
    README.md
    prompt.md
    harness
    oracle-plan.md
  bm/
    pisolate.json
    README.md
    prompt.md
    harness
    oracle-plan.md
  bird/
    pisolate.json
    README.md
    prompt.md
    harness
    oracle-plan.md
  installer/
    install
    shell
  bin/
    pisolates
  scripts/
    discover-atuin-tools
    inspect-zsh-wrappers
```

Each top-level directory such as `cx/`, `kx/`, `bm/`, and `bird/` is a standalone pisolate. Shared installer and discovery utilities can live in `installer/`, `bin/`, and `scripts/`, but they should not turn the repository into a root package workspace.

The exact runtime should be decided after the first Oracle pass. Do not assume a root Node project. If a particular pisolate benefits from TypeScript, Rust, Python, or shell, keep that runtime local to that pisolate or compile it into a self-contained launcher. Rust remains a candidate for a later standalone installer or hardened launcher if Pi's integration model benefits from it.

## Naming Convention

Directories are named after the underlying tool or workflow without a command prefix.

Examples:

- `cmux/` installs `pi-cmux` for interactive mode and `p-cmux` for one-shot mode.
- `gh/` installs `pi-gh` for interactive mode and `p-gh` for one-shot mode.
- `bm/` installs `pi-bm` for interactive mode and `p-bm` for one-shot mode.
- `bird/` installs `pi-bird` for interactive mode and `p-bird` for one-shot mode.
- `kx/` installs `pi-kx` for interactive mode and `p-kx` for one-shot mode.
- `zx/` installs `pi-zx` for interactive mode and `p-zx` for one-shot mode.

The prefix exists for terminal ergonomics and autocomplete:

- `pi-` means interactive Pi harness. Typing `pi-<Tab>` should reveal all interactive agent entrypoints.
- `p-` means non-interactive, one-shot Pi harness. Typing `p-<Tab>` should reveal the fast fire-and-forget command entrypoints.

This keeps the user's global command namespace predictable, avoids collisions with real tools like `gh`, `cmux`, `bm`, and `bird`, and makes mode selection obvious before the command is run.

Do not install bare legacy names such as `kx`, `kxi`, `birdx`, or `linex` by default. Legacy aliases can be documented as optional compatibility shims, but the canonical installed commands are always `pi-<tool>` and `p-<tool>`.

## Pisolate Manifest

Each recipe should include a manifest with enough metadata for the installer, docs generator, and safety audit.

Example:

```json
{
  "name": "bird",
  "description": "Isolated Pi harness for reading and drafting with the bird X/Twitter CLI",
  "interactiveCommands": ["pi-bird"],
  "oneShotCommands": ["p-bird"],
  "entry": "harness.ts",
  "prompt": "prompt.md",
  "category": "social",
  "requires": ["pi", "node", "bird"],
  "targetCli": "/Users/johnlindquist/.npm-global/bin/bird",
  "defaultRoot": "~",
  "allowedCommands": ["bird --help", "bird read", "bird search", "bird thread", "bird replies", "bird mentions", "bird bookmarks", "bird whoami"],
  "writeCommands": ["bird tweet", "bird reply", "bird follow", "bird unfollow", "bird unbookmark"],
  "writePolicy": "require-explicit-user-confirmation",
  "sensitivePaths": ["~/.config/bird/config.json5", "browser cookie stores"],
  "oraclePlan": "oracle-plan.md"
}
```

The schema should support:

- interactive variants
- one-shot variants
- read-only versus write-capable modes
- working-directory defaults
- required executables
- credential/config warnings
- allowed command patterns
- denied command patterns
- smoke-test commands
- install conflict policy

## Initial Tool Inventory

This inventory comes from current zsh wrappers, direct CLI paths, and Atuin command history. It should be refined by scripts before implementation.

### Tier 0: Project Foundation

- `pi-core`: shared harness contract after researching Pi
- `installer`: install, update, uninstall, list
- `discover`: scan zsh config and Atuin history for candidate tools
- `schema`: validate `pisolate.json`

### Tier 1: Known Current Agent Wrappers

- `cx`: safe cmux-aware Pi harness, installed as `pi-cx` and `p-cx`
- `kx`: Karabiner config expert rooted in `~/.config`, installed as `pi-kx` and `p-kx`
- `zx`: zsh wrapper factory and shell-config expert rooted in `~/.config`, installed as `pi-zx` and `p-zx`
- `bird`: Bird CLI expert, installed as `pi-bird` and `p-bird`
- `linear`: Linear CLI expert, installed as `pi-linear` and `p-linear`

### Tier 2: Required External CLIs

- `bm`: Basic Memory CLI at `/Users/johnlindquist/.local/bin/bm`
- `bird`: X/Twitter CLI at `/Users/johnlindquist/.npm-global/bin/bird`
- `gh`: GitHub CLI
- `linear`: Linear CLI
- `packx`: context bundle CLI
- `oracle`: Oracle CLI/session helper
- `cmux`: cmux workspace/tab CLI
- `lat`: local lattice/project-doc CLI where relevant

### Tier 3: Current AI Workflow Wrappers

- `aicm`, `aicommit`, `aiprdesc`: commit and PR description workflows
- `aicr`, `aipr`: AI code review and PR review workflows
- `aidbg`, `aifix`: debug/fix workflows around failed commands and logs
- `airf`, `airfa`: refactor workflows
- `aixplain`, `aicodewalk`: explain/code walkthrough workflows
- `aitest`, `aitestrun`: test generation/running workflows
- `research`, `quartz_research`: research/report workflows
- `xteach`: teaching/content workflow
- `xdiff`: diff-oriented workflow
- `ximp`, `xloop`, `xpolish`, `xconv`: implementation/polish/conversation loops
- `xz`, `agent_chain`, `xac`, `cascade`, `v0pub`: AI pipeline and chain wrappers
- `xsk`, `xsw`, `xpsw`, `xor`, `xpor`, `xpor3`, `xreview`, `xfan`, `xfani`: swarm/oracle/review/fanout wrappers

### Tier 4: Atuin-Derived High-Frequency Tools

Atuin history should guide future recipes. Early high-frequency candidates include:

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

Not every frequent command deserves a Pi harness. A command becomes a recipe candidate when an agent can safely add value by combining task intent, command help, local context, and guardrails.

## Required First Recipes

### `bm`

Basic Memory harness.

Source command:

```sh
/Users/johnlindquist/.local/bin/bm --help
```

Known command groups:

- `status`
- `reset`
- `reindex`
- `doctor`
- `mcp`
- `format`
- `update`
- `import`
- `cloud`
- `tool`
- `project`
- `schema`

Initial mode should be conservative:

- read/status/project inspection by default
- write-note/edit-note/import/reset operations require explicit confirmation
- destructive commands such as `reset` must require a separate confirmation gate

Oracle must design the isolated Basic Memory command surface before implementation.

### `bird`

Bird X/Twitter CLI harness.

Source command:

```sh
/Users/johnlindquist/.npm-global/bin/bird --help
```

Known command groups:

- read/search: `read`, `replies`, `thread`, `search`, `mentions`, `bookmarks`, `lists`, `list-timeline`, `home`, `following`, `followers`, `likes`, `about`, `user-tweets`, `news`
- identity/check: `whoami`, `check`, `query-ids`
- write: `tweet`, `reply`, `follow`, `unfollow`, `unbookmark`

Initial mode should split read-only and write-capable behavior:

- `pi-bird`: interactive read/search/analyze/draft mode
- `p-bird`: non-interactive read/search/analyze/draft mode
- `pi-bird-post` or `p-bird-post`: explicit write mode for tweet/reply/follow actions, always requiring user confirmation

Oracle must design cookie/config isolation and write safety before implementation.

### `kx`

Karabiner config expert.

Existing behavior:

- default root: `~/.config`
- primary target: `kar-migration/config.ts`
- specialized prompt from existing zsh wrapper

Initial mode:

- inspect and edit Karabiner config
- run formatting/build checks if available
- avoid unrelated dotfile edits

### `zx`

Zsh wrapper factory and shell-config expert.

Existing behavior:

- default root: `~/.config`
- focus on zsh functions and shell startup behavior
- useful for migrating wrappers into pisolates

Initial mode:

- inspect existing zsh wrapper source
- propose/migrate one wrapper at a time
- preserve shell startup safety

### `cx`

Safe cmux-aware harness migrated from the legacy `cx/cxi` wrapper.

Initial mode:

- minimal ambient context
- local cmux help and read-only cmux state inspection
- no runtime remote skill fetch
- no Codex subprocess
- no cmux topology mutation
- useful as the first migrated AI workflow wrapper, not as the generic template

## Installer Requirements

The installer should be runnable from a hosted repo URL:

```sh
curl -fsSL https://raw.githubusercontent.com/johnlindquist/pisolates/main/install.sh | sh
```

The installer should:

- detect required runtimes
- offer an interactive picker for available pisolates
- support non-interactive flags such as `--pisolate bm --pisolate bird`
- install commands into `~/.pisolates/bin` by default
- keep installed source/config under `~/.pisolates/pisolates`
- add shell integration only with explicit user consent
- support zsh first, with room for bash and fish
- avoid overwriting existing commands without confirmation
- record installed recipes and versions
- provide `pisolates list`, `pisolates install`, `pisolates update`, `pisolates uninstall`, `pisolates doctor`

## Installation Strategy

Prefer installing small launcher scripts on the user's `PATH` rather than mutating large shell config blocks.

Possible installed layout:

```text
~/.pisolates/
  pisolates/
    bm/
    bird/
    kx/
    zx/
  bin/
    p-bm
    pi-bm
    p-bird
    pi-bird
    p-kx
    pi-kx
    p-zx
    pi-zx
    p-gh
    pi-gh
    p-cmux
    pi-cmux
  state.json
  shell/
    env.zsh
```

Shell config should only need:

```sh
export PATH="$HOME/.pisolates/bin:$PATH"
```

If aliases are needed, generate and source one managed file:

```text
~/.pisolates/shell/aliases.zsh
```

## Isolation Requirements

Each pisolate must document and enforce, as much as Pi and the launcher allow:

- working directory
- allowed command patterns
- write/destructive command confirmation
- environment variables passed through
- credential/config paths used
- network expectations
- log/output locations
- prompt/context files included
- what local files are intentionally out of scope

Isolation should be visible in `pisolates doctor <name>`.

## Discovery Requirements

Add discovery scripts that can regenerate candidate lists:

```sh
pisolates discover zsh
pisolates discover atuin
pisolates discover cli-help bm
pisolates discover cli-help bird
```

Discovery should produce reviewable markdown or JSON, not directly create recipes without user approval.

For Atuin:

- read command history from Atuin safely
- summarize command frequency
- cluster commands by tool
- extract representative invocations
- avoid storing private command arguments in committed files unless sanitized

For zsh:

- list public functions
- identify wrappers around agent/CLI tools
- extract help/usage blocks
- preserve source file and line references

## Implementation Plan

1. Move active work to `~/dev/pisolates`; do not build on the old `~/dev/recipes` repo.
2. Initialize a clean GitHub repo named `johnlindquist/pisolates`.
3. Run first `oracle-packx` pass to deeply understand Pi and recommend the architecture.
4. Write the initial framework from Oracle's plan: manifest schema, installer scaffold, docs, and test harness.
5. Build discovery scripts for zsh wrappers and Atuin history.
6. Generate a sanitized candidate inventory.
7. Run per-tool Oracle planning for `bm`.
8. Implement `bm` as the first nontrivial CLI pisolate.
9. Run per-tool Oracle planning for `bird`.
10. Implement `bird` read-only mode, then add explicit confirmed write mode later.
11. Migrate `kx`, `zx`, and `cx` from the existing zsh wrapper pattern as interactive `pi-kx`, `pi-zx`, `pi-cx` and one-shot `p-kx`, `p-zx`, `p-cx`.
12. Add `linear` after the core pattern is stable, installed as `pi-linear` and `p-linear`.
13. Add AI workflow wrappers in batches, grouped by risk and shared behavior.
14. Document how to author, install, verify, and uninstall a pisolate.

## Verification

The first complete pass should prove:

- `pisolates list` discovers local manifests.
- `pisolates install bm` creates runnable `pi-bm` and `p-bm` commands.
- Installed `bm` harness can run read/status Basic Memory tasks.
- Destructive `bm reset` is denied or confirmation-gated.
- `pisolates install bird` creates read-only `pi-bird` and `p-bird` commands.
- `pi-bird` and `p-bird` can inspect help and read/search tasks without enabling posting by default.
- Existing commands are not overwritten silently.
- `pisolates uninstall <name>` removes generated launchers and state.
- `pisolates doctor <name>` reports required CLI presence, prompt path, command policy, and installation status.
- The installer works from a clean checkout.
- The README lets a new user install one pisolate and author another.

## Open Questions

- What is Pi's recommended harness/package format?
- How does Pi authenticate against the user's Codex subscription?
- What isolation does Pi enforce natively?
- What isolation must the launcher enforce?
- Can Pi support both one-shot and interactive modes for the same recipe?
- Should write-capable tools always split into separate commands?
- Are `pi-<tool>` and `p-<tool>` sufficient for every workflow, or do some legacy wrapper names need documented aliases?
- How should private local paths be represented in shareable recipes?
- How much Atuin-derived evidence can be safely committed after sanitization?

## Non-Goals

- Do not build a general-purpose agent framework unrelated to Pi.
- Do not require users to adopt the author's zsh config.
- Do not commit raw private Atuin history.
- Do not hard-code private local paths except as documented defaults that users can override.
- Do not migrate every zsh function before the first recipe contract is proven.
- Do not give write-capable social, issue-tracker, git, or memory commands silent autonomy.

## Success Criteria

This goal is complete when `~/dev/pisolates` contains a shareable repo with:

- Oracle-backed architecture for Pi harnesses.
- A documented pisolate directory convention.
- A validated manifest schema.
- A working installer entrypoint.
- Discovery scripts for zsh wrappers and Atuin command history.
- A sanitized candidate inventory.
- Working `bm` and `bird` pisolates.
- Migrated `cx`, `kx`, and `zx` pisolates.
- Clear safety boundaries for read-only, write-capable, and destructive operations.
- Clear instructions for installing selected pisolates.
- Clear instructions for adding a new pisolate with an Oracle planning pass.
