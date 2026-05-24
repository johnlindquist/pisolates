#!/bin/sh
set -eu

if [ "$(id -u)" = "0" ]; then
  echo "pisolates: refusing to install as root" >&2
  exit 1
fi

repo_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

if [ -x "$repo_dir/bin/pisolates" ]; then
  exec "$repo_dir/bin/pisolates" install "$@"
fi

tmp_dir=$(mktemp -d)
cleanup() {
  rm -rf "$tmp_dir"
}
trap cleanup EXIT INT TERM

archive_url=${PISOLATES_ARCHIVE_URL:-https://github.com/johnlindquist/pisolates/archive/refs/heads/main.tar.gz}
curl -fsSL "$archive_url" | tar -xz -C "$tmp_dir" --strip-components 1

"$tmp_dir/bin/pisolates" install "$@"
