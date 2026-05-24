#!/bin/sh
set -eu
home=${PISOLATES_HOME:-$HOME/.pisolates}
mkdir -p "$home/shell"
printf 'export PATH="%s/bin:$PATH"\n' "$home" > "$home/shell/env.sh"
printf 'export PATH="%s/bin:$PATH"\n' "$home" > "$home/shell/env.zsh"
echo "$home/shell/env.zsh"
