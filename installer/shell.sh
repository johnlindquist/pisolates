#!/bin/sh
set -eu
home=${PISOLATES_HOME:-$HOME/.pisolates}
mkdir -p "$home/shell"
printf 'export PATH="$HOME/.pisolates/bin:$PATH"\n' > "$home/shell/env.sh"
printf 'export PATH="$HOME/.pisolates/bin:$PATH"\n' > "$home/shell/env.zsh"
echo "$home/shell/env.zsh"
