#!/bin/bash -ex

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

make -C "$REPO_ROOT" build >/dev/null

CLIENT="$(mktemp -d)"

cd "$CLIENT"
pnpm init >/dev/null
pnpm add "$REPO_ROOT" >/dev/null
pnpm add -D esbuild >/dev/null

cat > index.js <<-EOF
import {isString} from "provisions"
console.log(isString(""))
EOF

BUILD_SIZE="$(pnpm esbuild index.js --bundle --minify | tee bundle.js | wc -c)"

test "$BUILD_SIZE" -eq 71 || {
    set +x
    echo
    echo "*** FAILURE ***"
    echo 'Build size has changed! Is tree-shaking working?'
    echo "Check $CLIENT/bundle.js"
    exit 1
}