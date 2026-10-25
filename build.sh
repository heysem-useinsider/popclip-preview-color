#!/bin/sh
set -e
cd "$(dirname "$0")"
rm -f PreviewColor.popclipextz
zip -r -X -q PreviewColor.popclipextz PreviewColor.popclipext -x '*/_*' '*/.*'
echo "Built PreviewColor.popclipextz"
