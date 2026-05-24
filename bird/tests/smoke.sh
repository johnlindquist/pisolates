#!/bin/sh
set -eu
repo=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
"$repo/scripts/test-command-policy" bird "bird --help"
"$repo/scripts/test-command-policy" bird "bird tweet hello"
"$repo/scripts/test-command-policy" bird "bird bookmarks -n 1"
"$repo/scripts/test-command-policy" bird "bird read --auth-token fake 1234567890123456789"
"$repo/scripts/test-command-policy" bird "bird search -n 10 from:example && pwd"
