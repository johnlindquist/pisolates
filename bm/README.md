# bm

`bm` is a local-only, read-only Basic Memory pisolate for inspecting installation, help, sync status, and local consistency diagnostics. It installs:

- `pi-bm` for interactive read/status inspection.
- `p-bm` for one-shot read/status inspection.

Allowed first-release commands:

- `bm --help`, `bm --version`
- `bm status --help`, `bm status --local`, `bm status --local --json`
- `bm doctor --help`, `bm doctor --local`
- `bm project --help`
- `bm tool --help`
- `command -v bm`, `pwd`

Blocked:

- Note reads/searches through `bm tool`
- Note writes/edits/imports
- Reset/reindex/format/update
- MCP server startup
- Cloud access or cloud routing
- Project list/ls/info and all project mutation
- Direct filesystem reads of Basic Memory data/config

This recipe does not install Basic Memory and does not copy, symlink, or print Basic Memory config, projects, cloud credentials, or Pi auth.
