# Preview Color

Select a color and PopClip shows a swatch of it, with the closest color name as its tooltip. Hover the swatch for a row of buttons: click one to copy that value, or Option-click to replace the color in place.

## What it recognizes

- CSS colors: names, `#hex`, `rgb()`, `hsl()`, `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()` and `color()`, with an optional trailing `;` or missing `)`
- Platform code: Flutter / Compose `Color(0xFF1F9ADD)` and `Color.fromARGB(…)`, Android `Color.rgb(…)`, SwiftUI `Color(red:green:blue:)`, UIKit / AppKit `UIColor(red:green:blue:alpha:)` and `#colorLiteral(…)`
- Tailwind: `sky-500`, utility classes like `hover:bg-sky-500/50` or `bg-[#1f9add]`, and `var(--color-sky-500)`
- Hex without `#`, like `1f9add`
- Colors inside longer text, like `rgb(31 154 221)` in a sentence (Find in text: 2 colors by default, up to 6)
- Optionally: CSS declarations like `color: #00ff00;`, and bare `0, 128, 255`

## Buttons

Choose them in the extension's settings:

- **Web formats:** closest name, nearest Tailwind color, hex, RGB, HSL and OKLCH
- **App formats:** Flutter / Compose, Android XML, SwiftUI and UIKit (using Display P3 when a color needs it)
- **Extras:** WCAG contrast against white and black, and ten shades of the same hue

The format you selected is left out, since you already have it. Colors outside sRGB show the closest sRGB color and can be marked "outside sRGB".

## Privacy

Preview Color works entirely on your Mac. It has no network access and sends no data anywhere.

## Credits

- Color names: [color-name-list](https://github.com/meodai/color-names) 14.80.0 "best of" list, MIT, Copyright (c) 2017 David Aerne
- Tailwind palette: [tailwindcss](https://github.com/tailwindlabs/tailwindcss) 4.3.3 `theme.css`, MIT, Copyright (c) Tailwind Labs, Inc.
- Color conversion and gamut mapping follow the [CSS Color 4](https://www.w3.org/TR/css-color-4/) sample code

## Changelog

### 1.0

First release.
