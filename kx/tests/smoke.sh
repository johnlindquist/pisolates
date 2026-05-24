#!/bin/sh
set -eu
repo=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
"$repo/scripts/test-command-policy" kx "kar -c kar-migration/config.ts --dry-run"
"$repo/scripts/test-command-policy" kx "kar -c kar-migration/config.ts"
"$repo/scripts/test-command-policy" kx "goku"
"$repo/scripts/test-command-policy" kx "python -c 'print(1)'"
"$repo/scripts/test-path-policy" kx edit kar-migration/config.ts
"$repo/scripts/test-path-policy" kx edit unrestricted-test.txt
