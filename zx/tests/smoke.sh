#!/bin/sh
set -eu
repo=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
allow() { "$repo/scripts/test-command-policy" zx "$1"; }
deny() { ! "$repo/scripts/test-command-policy" zx "$1"; }
allow_path() { "$repo/scripts/test-path-policy" zx "$1" "$2"; }
deny_path() { ! "$repo/scripts/test-path-policy" zx "$1" "$2"; }

allow "pwd"
allow "command -v zsh"
allow "zsh --version"
allow "git status --short -- AGENTS.md CLAUDE.md zsh"
allow "/bin/cat zsh/conf.d/49-codex-bare-dsl.zsh"
allow "/bin/cat zsh/tests/49-codex-bare-dsl-zx.zsh"
allow "zsh -n zsh/conf.d/49-codex-bare-dsl.zsh"
allow "zsh -n zsh/tests/49-codex-bare-dsl-zx.zsh"
allow "zsh -f zsh/tests/49-codex-bare-dsl-zx.zsh"

deny "codex exec hello"
deny "claude hello"
deny "npm install"
deny "git checkout -- zsh/conf.d/49-codex-bare-dsl.zsh"
deny "/bin/cat zsh/conf.d/00-secrets.zsh"
deny "zsh zsh/tests/startup-regression.zsh"

allow_path read "zsh/conf.d/49-codex-bare-dsl.zsh"
allow_path edit "zsh/conf.d/49-codex-bare-dsl.zsh"
allow_path read "zsh/tests/49-codex-bare-dsl-zx.zsh"
allow_path edit "zsh/tests/49-codex-bare-dsl-zx.zsh"

deny_path edit "zsh/.zshrc"
deny_path edit "zsh/local.zsh"
deny_path edit "zsh/tests/startup-regression.zsh"
deny_path edit "zsh/conf.d/10-aliases.zsh"
deny_path edit "zsh/conf.d/00-secrets.zsh"
deny_path edit "../.ssh/config"

echo "ok: zx policy"
