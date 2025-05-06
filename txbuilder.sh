#!/bin/bash

# Wrapper script for txbuilder
# Calls Node.js with the --experimental-global-webcrypto flag

NODE_EXEC=$(which node)
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")

$NODE_EXEC --experimental-global-webcrypto "$SCRIPT_DIR/index.js" "$@" 