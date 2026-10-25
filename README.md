# Preview Color

Select a color and PopClip shows a swatch of it. Hover the swatch for a row of buttons; click one to copy that value, or Option-click to replace the color in place.

It recognizes:

- CSS colors: names, `#hex`, `rgb()`, `hsl()`, `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()` and `color()`, with an optional trailing `;`
- Platform code: Flutter / Compose `Color(0xFF1F9ADD)` and `Color.fromARGB(…)`, Android `Color.rgb(…)`, SwiftUI `Color(red:green:blue:)`, UIKit / AppKit `UIColor(red:green:blue:alpha:)` and `#colorLiteral(…)`
- Tailwind: `sky-500`, utility classes like `hover:bg-sky-500/50` or `bg-[#1f9add]`, and `var(--color-sky-500)`
- Colors inside longer text, like `rgb(31 154 221)` in a sentence: 2 swatches by default, up to 6
- Hex without `#` (6 or 8 digits, like `1f9add`)
- Optionally: CSS declarations (`color: #00ff00;`) and bare `0, 128, 255`

Buttons can show the closest name, the nearest Tailwind color, hex, RGB, HSL, OKLCH, Flutter / Compose, Android XML, SwiftUI, UIKit, WCAG contrast against white and black, and ten shades of the same hue. Pick them in PopClip's settings for the extension.

## Install

Double-click `PreviewColor.popclipext`, or a built `PreviewColor.popclipextz`. The extension is unsigned, so PopClip asks for confirmation.

## Test

```sh
cd PreviewColor.popclipext
/Applications/PopClip.app/Contents/MacOS/PopClip run test.js
```

## Build for sharing

```sh
./build.sh
```

This writes `PreviewColor.popclipextz` next to the extension, without the tests.

## Credits

- Color names: [color-name-list](https://github.com/meodai/color-names) 14.80.0 "best of" list, MIT, Copyright (c) 2017 David Aerne
- Tailwind palette: [tailwindcss](https://github.com/tailwindlabs/tailwindcss) 4.3.3 `theme.css`, MIT, Copyright (c) Tailwind Labs, Inc.
- Color conversion and gamut mapping follow the [CSS Color 4](https://www.w3.org/TR/css-color-4/) sample code
