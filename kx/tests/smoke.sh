#!/bin/sh
set -eu
repo=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
allow() { "$repo/scripts/test-command-policy" kx "$1"; }
deny() { ! "$repo/scripts/test-command-policy" kx "$1"; }
allow_path() { "$repo/scripts/test-path-policy" kx "$1" "$2"; }
deny_path() { ! "$repo/scripts/test-path-policy" kx "$1" "$2"; }

allow "pwd"
allow "command -v kar"
allow "kar --help"
allow "ls -la kar-migration"
allow "find kar-migration -maxdepth 2 -type f"
allow "rg -n COMMAND_MODE_RULE_DESCRIPTION kar-migration/config.ts"
allow "git diff -- kar-migration/config.ts"
allow "git diff --check -- kar-migration/config.ts"
allow "kar -c kar-migration/config.ts --dry-run"

deny "kar -c kar-migration/config.ts"
deny "kar build -c kar-migration/config.ts"
deny "kar watch"
deny "kar init"
deny "kar -c kar-migration/config.ts --dry-run > /tmp/kx-karabiner.json"
deny "kar -c kar-migration/config.ts --dry-run | rg shell_command"
deny "goku --dry-run"
deny "goku"
deny "sed -i '' s/foo/bar/ kar-migration/config.ts"
deny "python3 -c 'print(1)'"
deny "node -e 'console.log(1)'"
deny "rm kar-migration/config.ts"
deny "git restore -- kar-migration/config.ts"
deny "find . -type f"
deny "rg -n token ."
deny "cat karabiner.edn"

allow_path edit "kar-migration/config.ts"
allow_path read "kar-migration/config.ts"
deny_path edit "karabiner/karabiner.json"
deny_path edit "karabiner.edn"
deny_path edit "kar-migration/generated/raw-rules.generated.ts"
deny_path edit "../.ssh/config"
