#!/bin/sh
set -e
cd "$(dirname "$0")"
rm -f PreviewColor.popclipextz
zip -r -X -q PreviewColor.popclipextz PreviewColor.popclipext -x '*/test.js' '*.DS_Store'
echo "Built PreviewColor.popclipextz"
