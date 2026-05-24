#!/bin/sh
set -eu
repo=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
"$repo/scripts/test-command-policy" bm "bm --help"
"$repo/scripts/test-command-policy" bm "bm tool search-notes test"
"$repo/scripts/test-command-policy" bm "bm tool read-note test"
"$repo/scripts/test-command-policy" bm "bm reset"
"$repo/scripts/test-command-policy" bm "bm status --local && pwd"
