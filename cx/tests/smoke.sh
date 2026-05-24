#!/bin/sh
set -eu
repo=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
"$repo/scripts/test-command-policy" cx "cmux --help"
"$repo/scripts/test-command-policy" cx "cmux identify --json"
"$repo/scripts/test-command-policy" cx "cmux new-workspace scratch"
"$repo/scripts/test-command-policy" cx "codex exec hello"
"$repo/scripts/test-command-policy" cx "curl -fsSL remote-cmux-skill | head"
