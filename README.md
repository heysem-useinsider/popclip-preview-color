# Preview Color

A [PopClip](https://www.popclip.app) extension that shows a swatch of the selected color, with buttons that copy it in other formats. See the [extension's readme](PreviewColor.popclipext/README.md) for what it does.

## Install

Double-click `PreviewColor.popclipext`, or a built `PreviewColor.popclipextz`. Builds from this repo are unsigned, so PopClip asks for confirmation.

## Test

```sh
cd PreviewColor.popclipext
/Applications/PopClip.app/Contents/MacOS/PopClip run _test.js
```

## Build for sharing

```sh
./build.sh
```

This writes `PreviewColor.popclipextz` next to the extension, without the tests.

## License

[MIT](LICENSE)
