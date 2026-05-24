#!/bin/sh
set -eu
repo=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
"$repo/scripts/test-command-policy" zx "pwd"
"$repo/scripts/test-command-policy" zx "codex exec hello"
"$repo/scripts/test-command-policy" zx "rm -rf tmp"
"$repo/scripts/test-command-policy" zx "zsh -n zsh/conf.d/49-codex-bare-dsl.zsh && pwd"
"$repo/scripts/test-path-policy" zx edit zsh/conf.d/49-codex-bare-dsl.zsh
"$repo/scripts/test-path-policy" zx edit unrestricted-test.zsh
printf 'ok: zx policy\n'
