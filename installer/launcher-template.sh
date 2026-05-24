#!/bin/sh
# pisolates-managed: name=__NAME__ mode=__MODE__ command=__COMMAND__
PISOLATES_HOME="${PISOLATES_HOME:-$HOME/.pisolates}"
exec "$PISOLATES_HOME/installer/run-pisolate" "__NAME__" "__MODE__" "$@"
