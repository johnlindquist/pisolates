#!/bin/sh

die() {
  echo "pisolates: $*" >&2
  exit 1
}

info() {
  echo "pisolates: $*"
}

warn() {
  echo "pisolates warning: $*" >&2
}

confirm() {
  prompt=$1
  [ -t 0 ] || return 1
  printf '%s [y/N] ' "$prompt" >&2
  read answer
  [ "$answer" = "y" ] || [ "$answer" = "Y" ] || [ "$answer" = "yes" ] || [ "$answer" = "YES" ]
}

is_tty() {
  [ -t 0 ] && [ -t 1 ]
}

expand_tilde() {
  case $1 in
    "~") printf '%s\n' "$HOME" ;;
    "~/"*) printf '%s/%s\n' "$HOME" "${1#~/}" ;;
    *) printf '%s\n' "$1" ;;
  esac
}

realpath_fallback() {
  if command -v realpath >/dev/null 2>&1; then
    realpath "$1"
  else
    (cd "$(dirname "$1")" && printf '%s/%s\n' "$(pwd)" "$(basename "$1")")
  fi
}

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

pisolates_home() {
  printf '%s\n' "${PISOLATES_HOME:-$HOME/.pisolates}"
}

managed_marker_check() {
  file=$1
  name=$2
  grep -q "pisolates-managed: name=$name " "$file" 2>/dev/null
}
