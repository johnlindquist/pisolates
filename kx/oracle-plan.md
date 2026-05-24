# Oracle Plan

Oracle session: `pisolates-kx-recipe`

`kx` deserves a Pi recipe because it is already a known current agent wrapper with a narrow domain, a stable working root of `~/.config`, and a clear primary target: `kar-migration/config.ts`.

First shippable slice:

- Scoped Karabiner `kar` TypeScript config editor.
- Edits only `kar-migration/config.ts`.
- Runs dry-run verification only: `kar -c kar-migration/config.ts --dry-run`.
- Does not apply live Karabiner output.

Allowed:

- Work from `~/.config`.
- Read scoped Karabiner migration files.
- Edit only `kar-migration/config.ts`.
- Run targeted `rg`, `git status`, and `git diff` checks.
- Report dry-run success.

Deferred:

- `kar -c ...` without `--dry-run`
- `kar watch`
- `kar init`
- Goku mode
- `karabiner.edn` edits
- Direct `karabiner/karabiner.json` edits
- Generated migration file edits
- Broad `~/.config` access
- Package manager or git mutation
