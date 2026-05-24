# kx

`kx` is a scoped Pi harness for Karabiner `kar` config work. It installs:

- `pi-kx` for interactive Karabiner config editing.
- `p-kx` for one-shot Karabiner config editing.

## First-Release Scope

`kx` edits only:

- `~/.config/kar-migration/config.ts`

It may inspect selected Karabiner migration context files and run:

```sh
kar -c kar-migration/config.ts --dry-run
```

It does not apply live Karabiner changes.

## Allowed

- Focused reads under `kar-migration/`
- Targeted `rg` against selected migration/generated/report files
- `git status --short -- ...`
- `git diff -- kar-migration/config.ts`
- `git diff --check -- kar-migration/config.ts`
- `kar --help`
- `kar -c kar-migration/config.ts --dry-run`
- Scoped edit of `kar-migration/config.ts`

## Blocked

- `kar -c ...` without `--dry-run`
- `kar watch`
- `kar init`
- `goku`
- `goku --dry-run`
- Edits to `karabiner.edn`
- Edits to `karabiner/karabiner.json`
- Edits to `kar-migration/generated/*`
- Broad reads/searches of `~/.config`
- Package managers, installers, arbitrary code execution
- Git mutation

## Generated Files

`karabiner/karabiner.json` is generated live Karabiner output. `kx` does not hand-edit it.

`kar-migration/generated/*` is generated migration source. `kx` may inspect it with targeted searches but does not edit it.

## Verification

A successful first-release `kx` run should report:

- Changed file: `kar-migration/config.ts`
- Focused diff
- `kar -c kar-migration/config.ts --dry-run` result
- Any targeted search verification
- Confirmation that live Karabiner was not applied
