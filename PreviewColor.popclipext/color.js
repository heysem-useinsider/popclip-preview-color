// Conversion matrices, transfer functions and gamut mapping follow the CSS Color 4 sample code.

const COLOR_NAMES = require("./names");
const TAILWIND_COLORS = require("./tailwind");

const NAMED_COLORS = {
	aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "00ffff", aquamarine: "7fffd4", azure: "f0ffff",
	beige: "f5f5dc", bisque: "ffe4c4", black: "000000", blanchedalmond: "ffebcd", blue: "0000ff",
	blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", cadetblue: "5f9ea0", chartreuse: "7fff00",
	chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed", cornsilk: "fff8dc", crimson: "dc143c",
	cyan: "00ffff", darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b", darkgray: "a9a9a9",
	darkgreen: "006400", darkgrey: "a9a9a9", darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f",
	darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a", darkseagreen: "8fbc8f",
	darkslateblue: "483d8b", darkslategray: "2f4f4f", darkslategrey: "2f4f4f", darkturquoise: "00ced1", darkviolet: "9400d3",
	deeppink: "ff1493", deepskyblue: "00bfff", dimgray: "696969", dimgrey: "696969", dodgerblue: "1e90ff",
	firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22", fuchsia: "ff00ff", gainsboro: "dcdcdc",
	ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520", gray: "808080", green: "008000",
	greenyellow: "adff2f", grey: "808080", honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c",
	indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa", lavenderblush: "fff0f5",
	lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080", lightcyan: "e0ffff",
	lightgoldenrodyellow: "fafad2", lightgray: "d3d3d3", lightgreen: "90ee90", lightgrey: "d3d3d3", lightpink: "ffb6c1",
	lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslategray: "778899", lightslategrey: "778899",
	lightsteelblue: "b0c4de", lightyellow: "ffffe0", lime: "00ff00", limegreen: "32cd32", linen: "faf0e6",
	magenta: "ff00ff", maroon: "800000", mediumaquamarine: "66cdaa", mediumblue: "0000cd", mediumorchid: "ba55d3",
	mediumpurple: "9370db", mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc",
	mediumvioletred: "c71585", midnightblue: "191970", mintcream: "f5fffa", mistyrose: "ffe4e1", moccasin: "ffe4b5",
	navajowhite: "ffdead", navy: "000080", oldlace: "fdf5e6", olive: "808000", olivedrab: "6b8e23",
	orange: "ffa500", orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa", palegreen: "98fb98",
	paleturquoise: "afeeee", palevioletred: "db7093", papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f",
	pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", purple: "800080", rebeccapurple: "663399",
	red: "ff0000", rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072",
	sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d", silver: "c0c0c0",
	skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", slategrey: "708090", snow: "fffafa",
	springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", teal: "008080", thistle: "d8bfd8",
	tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", wheat: "f5deb3", white: "ffffff",
	whitesmoke: "f5f5f5", yellow: "ffff00", yellowgreen: "9acd32",
};

const HEX_COLOR = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/;
const BARE_HEX_COLOR = /^([0-9a-f]{6}|[0-9a-f]{8})$/;
const BARE_RGB_VALUE = "((?:0|[1-9]\\d{0,2})(?:\\.\\d+)?)";
const BARE_RGB_COLOR = new RegExp(`^${BARE_RGB_VALUE}\\s*,\\s*${BARE_RGB_VALUE}\\s*,\\s*${BARE_RGB_VALUE}$`);
const FUNCTION_COLOR = /^([a-z0-9-]+)\(\s*(.*?)\s*\)$/;
const NUMBER_TOKEN = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(%|deg|grad|rad|turn)?$/;
const HUE_UNITS = { "": 1, deg: 1, grad: 0.9, rad: 180 / Math.PI, turn: 360 };
const LEGACY_FUNCTIONS = ["rgb", "rgba", "hsl", "hsla"];

const multiply = (m, v) => m.map((row) => row[0] * v[0] + row[1] * v[1] + row[2] * v[2]);
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const linSrgb = (c) => {
	const abs = Math.abs(c);
	return abs <= 0.04045 ? c / 12.92 : Math.sign(c) * ((abs + 0.055) / 1.055) ** 2.4;
};
const gamSrgb = (c) => {
	const abs = Math.abs(c);
	return abs > 0.0031308 ? Math.sign(c) * (1.055 * abs ** (1 / 2.4) - 0.055) : 12.92 * c;
};
const linA98 = (c) => Math.sign(c) * Math.abs(c) ** (563 / 256);
const linProPhoto = (c) => (Math.abs(c) <= 16 / 512 ? c / 16 : Math.sign(c) * Math.abs(c) ** 1.8);
const linRec2020 = (c) => {
	const alpha = 1.09929682680944;
	const beta = 0.018053968510807;
	const abs = Math.abs(c);
	return abs < beta * 4.5 ? c / 4.5 : Math.sign(c) * ((abs + alpha - 1) / alpha) ** (1 / 0.45);
};

const LIN_SRGB_TO_XYZ = [
	[0.41239079926595934, 0.357584339383878, 0.1804807884018343],
	[0.21263900587151027, 0.715168678767756, 0.07219231536073371],
	[0.01933081871559182, 0.11919477979462598, 0.9505321522496607],
];
const XYZ_TO_LIN_SRGB = [
	[3.2409699419045226, -1.537383177570094, -0.4986107602930034],
	[-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
	[0.05563007969699366, -0.20397695888897652, 1.0569715142428786],
];
const LIN_P3_TO_XYZ = [
	[0.4865709486482162, 0.26566769316909306, 0.1982172852343625],
	[0.2289745640697488, 0.6917385218365064, 0.079286914093745],
	[0, 0.04511338185890264, 1.043944368900976],
];
const XYZ_TO_LIN_P3 = [
	[2.4934969119414254, -0.9313836179191239, -0.40271078445071684],
	[-0.8294889695615747, 1.7626640603183463, 0.023624685841943577],
	[0.03584583024378447, -0.07617238926804182, 0.9568845240076872],
];
const LIN_A98_TO_XYZ = [
	[0.5766690429101305, 0.1855582379065463, 0.1882286462349947],
	[0.29734497525053605, 0.6273635662554661, 0.0752914584939978],
	[0.02703136138641234, 0.07068885253582723, 0.9913375368376388],
];
const LIN_PROPHOTO_TO_XYZ_D50 = [
	[0.7977666449006423, 0.13518129740053308, 0.0313477341283922],
	[0.2880748288194013, 0.711835234241873, 0.00008993693872564],
	[0, 0, 0.8251046025104602],
];
const LIN_REC2020_TO_XYZ = [
	[0.6369580483012914, 0.14461690358620832, 0.1688809751641721],
	[0.2627002120112671, 0.6779980715188708, 0.05930171646986196],
	[0, 0.028072693049087428, 1.060985057710791],
];
const D50_TO_D65 = [
	[0.955473421488075, -0.02309845494876471, 0.06325924320057072],
	[-0.0283697093338637, 1.0099953980813041, 0.021041441191917323],
	[0.012314014864481998, -0.020507649298898964, 1.330365926242124],
];
const XYZ_TO_LMS = [
	[0.819022437996703, 0.3619062600528904, -0.1288737815209879],
	[0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
	[0.0481771893596242, 0.2642395317527308, 0.6335478284694309],
];
const LMS_TO_OKLAB = [
	[0.210454268309314, 0.7936177747023054, -0.0040720430116193],
	[1.9779985324311684, -2.42859224204858, 0.450593709617411],
	[0.0259040424655478, 0.7827717124575296, -0.8086757549230774],
];
const OKLAB_TO_LMS = [
	[1, 0.3963377773761749, 0.2158037573099136],
	[1, -0.1055613458156586, -0.0638541728258133],
	[1, -0.0894841775298119, -1.2914855480194092],
];
const LMS_TO_XYZ = [
	[1.2268798758459243, -0.5578149944602171, 0.2813910456659647],
	[-0.0405757452148008, 1.112286803280317, -0.0717110580655164],
	[-0.0763729366746601, -0.4214933324022432, 1.5869240198367816],
];
const D50_WHITE = [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585];

const srgbToXyz = (rgb) => multiply(LIN_SRGB_TO_XYZ, rgb.map(linSrgb));
const xyzToSrgb = (xyz) => multiply(XYZ_TO_LIN_SRGB, xyz).map(gamSrgb);
const xyzToP3 = (xyz) => multiply(XYZ_TO_LIN_P3, xyz).map(gamSrgb);
const labToXyz = ([l, a, b]) => {
	const kappa = 24389 / 27;
	const epsilon = 216 / 24389;
	const f1 = (l + 16) / 116;
	const f0 = a / 500 + f1;
	const f2 = f1 - b / 200;
	const xyzD50 = [
		f0 ** 3 > epsilon ? f0 ** 3 : (116 * f0 - 16) / kappa,
		l > kappa * epsilon ? f1 ** 3 : l / kappa,
		f2 ** 3 > epsilon ? f2 ** 3 : (116 * f2 - 16) / kappa,
	].map((v, i) => v * D50_WHITE[i]);
	return multiply(D50_TO_D65, xyzD50);
};
const oklabToXyz = (lab) => multiply(LMS_TO_XYZ, multiply(OKLAB_TO_LMS, lab).map((v) => v ** 3));
const xyzToOklab = (xyz) => multiply(LMS_TO_OKLAB, multiply(XYZ_TO_LMS, xyz).map(Math.cbrt));
const polarToLab = ([l, c, h]) => [l, c * Math.cos((h * Math.PI) / 180), c * Math.sin((h * Math.PI) / 180)];
const oklabToOklch = ([l, a, b]) => {
	const h = (Math.atan2(b, a) * 180) / Math.PI;
	return [l, Math.hypot(a, b), h < 0 ? h + 360 : h];
};

const hslToSrgb = (h, s, l) => {
	const hue = ((h % 360) + 360) % 360;
	const f = (n) => {
		const k = (n + hue / 30) % 12;
		return l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
	};
	return [f(0), f(8), f(4)];
};
const hwbToSrgb = (h, w, b) => {
	if (w + b >= 1) {
		const gray = w / (w + b);
		return [gray, gray, gray];
	}
	return hslToSrgb(h, 1, 0.5).map((c) => c * (1 - w - b) + w);
};

const COLOR_SPACES = {
	srgb: srgbToXyz,
	"srgb-linear": (rgb) => multiply(LIN_SRGB_TO_XYZ, rgb),
	"display-p3": (rgb) => multiply(LIN_P3_TO_XYZ, rgb.map(linSrgb)),
	"a98-rgb": (rgb) => multiply(LIN_A98_TO_XYZ, rgb.map(linA98)),
	"prophoto-rgb": (rgb) => multiply(D50_TO_D65, multiply(LIN_PROPHOTO_TO_XYZ_D50, rgb.map(linProPhoto))),
	rec2020: (rgb) => multiply(LIN_REC2020_TO_XYZ, rgb.map(linRec2020)),
	xyz: (xyz) => xyz,
	"xyz-d65": (xyz) => xyz,
	"xyz-d50": (xyz) => multiply(D50_TO_D65, xyz),
};

const token = (text) => {
	if (text === "none") {
		return { value: 0, unit: "none" };
	}
	const match = NUMBER_TOKEN.exec(text);
	return match ? { value: parseFloat(match[1]), unit: match[2] || "" } : null;
};
const number = (t, percentScale) => {
	if (t.unit === "none") {
		return 0;
	}
	if (t.unit === "%") {
		return (t.value / 100) * percentScale;
	}
	return t.unit === "" ? t.value : NaN;
};
const hue = (t) => {
	if (t.unit === "none") {
		return 0;
	}
	return t.unit in HUE_UNITS ? t.value * HUE_UNITS[t.unit] : NaN;
};

const functionToXyz = (name, args) => {
	const [r, g, b] = args;
	switch (name) {
		case "rgb":
		case "rgba":
			return srgbToXyz(args.map((t) => clamp(number(t, 255), 0, 255) / 255));
		case "hsl":
		case "hsla":
			return srgbToXyz(hslToSrgb(hue(r), Math.max(0, number(g, 100)) / 100, clamp(number(b, 100), 0, 100) / 100));
		case "hwb":
			return srgbToXyz(hwbToSrgb(hue(r), clamp(number(g, 100), 0, 100) / 100, clamp(number(b, 100), 0, 100) / 100));
		case "lab":
			return labToXyz([clamp(number(r, 100), 0, 100), number(g, 125), number(b, 125)]);
		case "lch":
			return labToXyz(polarToLab([clamp(number(r, 100), 0, 100), Math.max(0, number(g, 150)), hue(b)]));
		case "oklab":
			return oklabToXyz([clamp(number(r, 1), 0, 1), number(g, 0.4), number(b, 0.4)]);
		case "oklch":
			return oklabToXyz(polarToLab([clamp(number(r, 1), 0, 1), Math.max(0, number(g, 0.4)), hue(b)]));
		default:
			return null;
	}
};

const parseFunction = (name, body) => {
	const [main, alphaText, extra] = body.split("/");
	if (extra !== undefined) {
		return null;
	}
	let parts;
	let alphaPart = alphaText;
	if (main.includes(",")) {
		if (!LEGACY_FUNCTIONS.includes(name) || alphaText !== undefined) {
			return null;
		}
		parts = main.split(",").map((s) => s.trim());
		if (parts.length === 4) {
			alphaPart = parts.pop();
		}
	} else {
		parts = main.trim().split(/\s+/);
	}

	let toXyz = (args) => functionToXyz(name, args);
	if (name === "color") {
		const space = COLOR_SPACES[parts.shift()];
		if (!space) {
			return null;
		}
		toXyz = (args) => space(args.map((t) => number(t, 1)));
	}

	const args = parts.map(token);
	const alpha = alphaPart === undefined ? { value: 1, unit: "" } : token(alphaPart.trim());
	if (args.length !== 3 || args.includes(null) || alpha === null) {
		return null;
	}
	const xyz = toXyz(args);
	const a = clamp(number(alpha, 1), 0, 1);
	if (!xyz || !xyz.every(Number.isFinite) || !Number.isFinite(a)) {
		return null;
	}
	return { xyz, a };
};

const parseHex = (digits) => {
	const hex = digits.length <= 4 ? [...digits].map((c) => c + c).join("") : digits;
	const channel = (i) => parseInt(hex.slice(i, i + 2), 16);
	return {
		xyz: srgbToXyz([channel(0), channel(2), channel(4)].map((v) => v / 255)),
		a: hex.length === 8 ? channel(6) / 255 : 1,
	};
};

const PLATFORM_NUMBER = "([+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:/(?:\\d+\\.?\\d*|\\.\\d+))?)";
const platformPattern = (body) => new RegExp(`^${body.replace(/N/g, PLATFORM_NUMBER)}$`);
const APPLE_SPACES = { srgb: "srgb", displayp3: "display-p3", srgblinear: "srgb-linear" };

const fromBytes = (r, g, b, a = 255) => ({
	xyz: srgbToXyz([r, g, b].map((v) => clamp(v, 0, 255) / 255)),
	a: clamp(a, 0, 255) / 255,
});
const fromUnits = (space, r, g, b, a = 1) => ({ xyz: COLOR_SPACES[space]([r, g, b]), a: clamp(a, 0, 1) });
const fromArgbHex = (hex) => {
	const [a, r, g, b] = [0, 2, 4, 6].map((i) => parseInt(hex.slice(i, i + 2), 16));
	return fromBytes(r, g, b, a);
};

const platformValue = (text) => {
	if (text === undefined) {
		return undefined;
	}
	if (!/^[+-]?(?:\d|\.\d)/.test(text)) {
		return text;
	}
	return text.split("/").map(parseFloat).reduce((a, b) => a / b);
};

const numeric = (build) => (...values) => build(...values.map(platformValue));

const PLATFORM_COLORS = [
	["flutter", platformPattern("color\\(0x([0-9a-f]{8})\\)"), fromArgbHex],
	["flutter", platformPattern("0x([0-9a-f]{8})"), fromArgbHex],
	["flutter", platformPattern("color\\.fromargb\\(N,N,N,N\\)"), numeric((a, r, g, b) => fromBytes(r, g, b, a))],
	["flutter", platformPattern("color\\.fromrgbo\\(N,N,N,N\\)"), numeric((r, g, b, o) => fromBytes(r, g, b, o * 255))],
	["android", platformPattern("color\\.rgb\\(N,N,N\\)"), numeric((r, g, b) => fromBytes(r, g, b))],
	["android", platformPattern("color\\.argb\\(N,N,N,N\\)"), numeric((a, r, g, b) => fromBytes(r, g, b, a))],
	[
		"swiftUI",
		platformPattern("color\\((?:\\.(srgb|displayp3|srgblinear),)?red:N,green:N,blue:N(?:,opacity:N)?\\)"),
		numeric((space, r, g, b, o) => fromUnits(APPLE_SPACES[space || "srgb"], r, g, b, o)),
	],
	[
		"swiftUI",
		platformPattern("color\\((?:\\.(srgb|displayp3|srgblinear),)?white:N(?:,opacity:N)?\\)"),
		numeric((space, w, o) => fromUnits(APPLE_SPACES[space || "srgb"], w, w, w, o)),
	],
	[
		"uiKit",
		platformPattern("(?:ui|ns)color\\((red|srgbred|displayp3red):N,green:N,blue:N,alpha:N\\)"),
		numeric((label, r, g, b, a) => fromUnits(label === "displayp3red" ? "display-p3" : "srgb", r, g, b, a)),
	],
	["uiKit", platformPattern("(?:ui|ns)color\\(white:N,alpha:N\\)"), numeric((w, a) => fromUnits("srgb", w, w, w, a))],
	["uiKit", platformPattern("#colorliteral\\(red:N,green:N,blue:N,alpha:N\\)"), numeric((r, g, b, a) => fromUnits("srgb", r, g, b, a))],
];

const parsePlatform = (text) => {
	const compact = text.replace(/^(?:const|new)\s+/, "").replace(/\s+/g, "");
	for (const [format, pattern, build] of PLATFORM_COLORS) {
		const match = pattern.exec(compact);
		if (match) {
			const source = build(...match.slice(1));
			return source.xyz.every(Number.isFinite) && Number.isFinite(source.a) ? { ...source, format } : null;
		}
	}
	return null;
};

const TAILWIND_BY_NAME = new Map(TAILWIND_COLORS);
const TAILWIND_UTILITIES =
	"bg|text|border(?:-[xytrblse])?|outline|ring(?:-offset)?|inset-ring|divide|fill|stroke|from|via|to|" +
	"shadow|inset-shadow|drop-shadow|text-shadow|accent|caret|decoration|placeholder";
const TAILWIND_CLASS = new RegExp(
	`^(?:[a-z0-9-]+:)*!?(?:(${TAILWIND_UTILITIES})-)?([a-z]+(?:-\\d+)?|\\[[^\\]]+\\])(?:/(\\d+|\\[[^\\]]+\\]))?!?$`,
);
const TAILWIND_VARIABLE = /^(?:var\(\s*)?--color-([a-z]+(?:-\d+)?)\s*\)?$/;

const tailwindOpacity = (text) => {
	if (text === undefined) {
		return 1;
	}
	const value = text.startsWith("[") ? text.slice(1, -1) : `${text}%`;
	return value.endsWith("%") ? parseFloat(value) / 100 : parseFloat(value);
};

const tailwindColor = (name) => {
	if (name === "transparent") {
		return { xyz: [0, 0, 0], a: 0 };
	}
	const value = TAILWIND_BY_NAME.get(name);
	return value ? toSource(value) : null;
};

const parseTailwind = (text) => {
	const variable = TAILWIND_VARIABLE.exec(text);
	if (variable) {
		const color = tailwindColor(variable[1]);
		return color && { ...color, format: "tailwind" };
	}
	const match = TAILWIND_CLASS.exec(text);
	if (!match) {
		return null;
	}
	const [, utility, value, opacity] = match;
	const arbitrary = value.startsWith("[");
	if (arbitrary && !utility) {
		return null;
	}
	const inner = arbitrary ? value.slice(1, -1).replace(/_/g, " ") : null;
	const color = arbitrary ? toSource(inner) : tailwindColor(value);
	const alpha = tailwindOpacity(opacity);
	if (!color || !Number.isFinite(alpha)) {
		return null;
	}
	return { ...color, a: color.a * clamp(alpha, 0, 1), format: arbitrary ? inputFormat(inner) : "tailwind" };
};

const toSource = (text, { bareHex = false, bareRgb = false, platformCode = false, tailwindClasses = false } = {}) => {
	if (text === "transparent") {
		return { xyz: [0, 0, 0], a: 0 };
	}
	if (text in NAMED_COLORS) {
		return parseHex(NAMED_COLORS[text]);
	}
	const hex = HEX_COLOR.exec(text) || (bareHex ? BARE_HEX_COLOR.exec(text) : null);
	if (hex) {
		return parseHex(hex[1]);
	}
	const rgb = bareRgb ? BARE_RGB_COLOR.exec(text) : null;
	if (rgb) {
		return rgb.slice(1).every((v) => parseFloat(v) <= 255) ? parseFunction("rgb", text) : null;
	}
	const platform = platformCode ? parsePlatform(text) : null;
	if (platform) {
		return platform;
	}
	const tailwind = tailwindClasses ? parseTailwind(text) : null;
	if (tailwind) {
		return tailwind;
	}
	const fn = FUNCTION_COLOR.exec(text);
	return fn ? parseFunction(fn[1], fn[2]) : null;
};

const GAMUT_EPSILON = 0.000075;
const inGamut = (rgb) => rgb.every((c) => c >= -GAMUT_EPSILON && c <= 1 + GAMUT_EPSILON);
const clip = (rgb) => rgb.map((c) => clamp(c, 0, 1));
const deltaEOK = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const oklchToSrgb = (lch) => xyzToSrgb(oklabToXyz(polarToLab(lch)));

const gamutMap = (oklch) => {
	const [l, c, h] = oklch;
	if (l >= 1) {
		return [1, 1, 1];
	}
	if (l <= 0) {
		return [0, 0, 0];
	}
	const jnd = 0.02;
	const epsilon = 0.0001;
	const distance = (rgb, lch) => deltaEOK(xyzToOklab(srgbToXyz(rgb)), polarToLab(lch));
	let clipped = clip(oklchToSrgb(oklch));
	if (distance(clipped, oklch) < jnd) {
		return clipped;
	}
	let min = 0;
	let max = c;
	let minInGamut = true;
	while (max - min > epsilon) {
		const chroma = (min + max) / 2;
		const current = [l, chroma, h];
		const rgb = oklchToSrgb(current);
		if (minInGamut && inGamut(rgb)) {
			min = chroma;
			continue;
		}
		clipped = clip(rgb);
		const e = distance(clipped, current);
		if (e < jnd) {
			if (jnd - e < epsilon) {
				return clipped;
			}
			minInGamut = false;
			min = chroma;
		} else {
			max = chroma;
		}
	}
	return clipped;
};

// toFixed absorbs the XYZ round-trip error so that an exact .5 still rounds up, as browsers do.
const toByte = (v) => Math.round(Number((clamp(v, 0, 1) * 255).toFixed(6)));
const toHexPair = (v) => v.toString(16).padStart(2, "0");

const inputFormat = (text) => {
	if (text === "transparent" || text in NAMED_COLORS) {
		return "name";
	}
	if (/^#?[0-9a-f]+$/.test(text)) {
		return "hex";
	}
	const fn = FUNCTION_COLOR.exec(text);
	if (!fn) {
		return "rgb";
	}
	return { rgba: "rgb", hsla: "hsl" }[fn[1]] || fn[1];
};

const CSS_DECLARATION = /^-?-?[a-z_][a-z0-9_-]*\s*:\s*(.*?)(?:\s*!important)?$/;

const parse = (text, options = {}) => {
	let start = text.length - text.trimStart().length;
	let value = text.trim().replace(/\s*;$/, "");
	const declaration = options.cssDeclarations ? CSS_DECLARATION.exec(value.toLowerCase()) : null;
	if (declaration) {
		const afterColon = value.slice(value.indexOf(":") + 1);
		const valueStart = value.length - afterColon.trimStart().length;
		start += valueStart;
		value = value.slice(valueStart, valueStart + declaration[1].length);
	}
	const count = (pattern) => (value.match(pattern) || []).length;
	const autoClosed = count(/\(/g) === count(/\)/g) + 1 && !value.endsWith(")");
	const input = (autoClosed ? `${value})` : value).toLowerCase();
	const source = toSource(input, options);
	if (!source) {
		return null;
	}
	const { xyz, a } = source;
	const oklch = oklabToOklch(xyzToOklab(xyz));
	const srgb = xyzToSrgb(xyz);
	const outOfGamut = !inGamut(srgb);
	const [r, g, b] = (outOfGamut ? gamutMap(oklch) : srgb).map(toByte);
	const alphaByte = toByte(a);
	return {
		hex: `#${[r, g, b].map(toHexPair).join("")}${alphaByte < 255 ? toHexPair(alphaByte) : ""}`,
		r,
		g,
		b,
		a,
		oklch,
		xyz,
		outOfGamut,
		input,
		format: source.format || inputFormat(input),
		text,
		span: [start, start + value.length],
		autoClosed,
	};
};

const toHsl = ({ r, g, b }) => {
	const [rn, gn, bn] = [r, g, b].map((v) => v / 255);
	const max = Math.max(rn, gn, bn);
	const min = Math.min(rn, gn, bn);
	const l = (max + min) / 2;
	const d = max - min;
	if (d === 0) {
		return [0, 0, Math.round(l * 100)];
	}
	const s = d / (1 - Math.abs(2 * l - 1));
	let h;
	if (max === rn) {
		h = ((gn - bn) / d) % 6;
	} else if (max === gn) {
		h = (bn - rn) / d + 2;
	} else {
		h = (rn - gn) / d + 4;
	}
	h = Math.round(h * 60);
	return [h < 0 ? h + 360 : h, Math.round(s * 100), Math.round(l * 100)];
};

const round = (v, digits) => String(Number(v.toFixed(digits)));

const swatch = ({ hex, a }) =>
	"preserve-color svg:" +
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
	`<rect x="2" y="2" width="20" height="20" rx="5" fill="${hex.slice(0, 7)}" fill-opacity="${a}" ` +
	'stroke="gray" stroke-opacity="0.5" stroke-width="1"/>' +
	"</svg>";

const alphaSuffix = ({ a }) => (a < 1 ? ` / ${Math.round(a * 100)}%` : "");
const legacyAlpha = ({ a }) => round(a, 2);

const upperHex = (color) => color.hex.slice(1, 7).toUpperCase();
const alphaHex = (color) => toHexPair(toByte(color.a)).toUpperCase();
const appleComponents = (color) => {
	const p3 = color.outOfGamut ? xyzToP3(color.xyz) : null;
	if (p3 && inGamut(p3)) {
		return { p3: true, values: clip(p3).map((v) => round(v, 3)) };
	}
	return { p3: false, values: [color.r, color.g, color.b].map((v) => round(v / 255, 3)) };
};

const CSS_NAMES_BY_HEX = {};
for (const [name, hex] of Object.entries(NAMED_COLORS)) {
	(CSS_NAMES_BY_HEX[hex] = CSS_NAMES_BY_HEX[hex] || []).push(name);
}

let namedOklab = null;
const closestName = (color, preferCss = false) => {
	if (color.a === 0) {
		return preferCss ? "transparent" : "Transparent";
	}
	const cssNames = preferCss && CSS_NAMES_BY_HEX[color.hex.slice(1, 7)];
	if (cssNames) {
		return cssNames.join(" / ");
	}
	if (!namedOklab) {
		namedOklab = COLOR_NAMES.map(([name, hex]) => [name, hex, xyzToOklab(parseHex(hex).xyz)]);
	}
	const hex = color.hex.slice(1, 7);
	const target = xyzToOklab(parseHex(hex).xyz);
	let closest = null;
	let closestDistance = Infinity;
	for (const entry of namedOklab) {
		const distance = deltaEOK(entry[2], target);
		if (distance < closestDistance) {
			closest = entry;
			closestDistance = distance;
		}
	}
	return closest[1] === hex ? closest[0] : `~ ${closest[0]}`;
};

let tailwindOklab = null;
const closestTailwind = (color) => {
	if (!tailwindOklab) {
		tailwindOklab = TAILWIND_COLORS.map(([name, value]) => [name, xyzToOklab(toSource(value).xyz)]);
	}
	const target = xyzToOklab(color.xyz);
	let closest = null;
	let closestDistance = Infinity;
	for (const [name, lab] of tailwindOklab) {
		const distance = deltaEOK(lab, target);
		if (distance < closestDistance) {
			closest = name;
			closestDistance = distance;
		}
	}
	return closestDistance < 1e-6 ? closest : `~ ${closest}`;
};

const FORMATS = {
	name: (color, options) => closestName(color, options.names === "css"),
	tailwind: closestTailwind,
	hex: (color) => color.hex,
	rgb: (color, options) => {
		const { r, g, b } = color;
		if (options.syntax === "comma") {
			return color.a < 1 ? `rgba(${r}, ${g}, ${b}, ${legacyAlpha(color)})` : `rgb(${r}, ${g}, ${b})`;
		}
		return `rgb(${r} ${g} ${b}${alphaSuffix(color)})`;
	},
	hsl: (color, options) => {
		const [h, s, l] = toHsl(color);
		if (options.syntax === "comma") {
			return color.a < 1 ? `hsla(${h}, ${s}%, ${l}%, ${legacyAlpha(color)})` : `hsl(${h}, ${s}%, ${l}%)`;
		}
		return `hsl(${h} ${s}% ${l}%${alphaSuffix(color)})`;
	},
	oklch: (color) => {
		const [l, c, h] = color.oklch;
		const chroma = round(c, 3);
		return `oklch(${round(l * 100, 1)}% ${chroma} ${chroma === "0" ? "0" : round(h, 1)}${alphaSuffix(color)})`;
	},
	flutter: (color) => `Color(0x${alphaHex(color)}${upperHex(color)})`,
	androidXml: (color) => `#${color.a < 1 ? alphaHex(color) : ""}${upperHex(color)}`,
	swiftUI: (color) => {
		const { p3, values } = appleComponents(color);
		const [r, g, b] = values;
		const opacity = color.a < 1 ? `, opacity: ${round(color.a, 3)}` : "";
		return `Color(${p3 ? ".displayP3, " : ""}red: ${r}, green: ${g}, blue: ${b}${opacity})`;
	},
	uiKit: (color) => {
		const { p3, values } = appleComponents(color);
		const [r, g, b] = values;
		return `UIColor(${p3 ? "displayP3Red" : "red"}: ${r}, green: ${g}, blue: ${b}, alpha: ${round(color.a, 3)})`;
	},
};

const relativeLuminance = (rgb) => {
	const [r, g, b] = rgb.map(linSrgb);
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrastOn = (color, background) => {
	const blended = [color.r, color.g, color.b].map((v, i) => (color.a * v + (1 - color.a) * background[i]) / 255);
	const l1 = relativeLuminance(blended);
	const l2 = relativeLuminance(background.map((v) => v / 255));
	return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
const contrastGrade = (ratio) => {
	if (ratio >= 7) {
		return "AAA";
	}
	if (ratio >= 4.5) {
		return "AA";
	}
	return ratio >= 3 ? "AA large" : "✗";
};
// WCAG ratios are truncated, never rounded up, so 4.47 can't display as a passing 4.5.
const ratioText = (ratio) => String(Math.floor(ratio * 10) / 10);
const contrast = (color) => {
	const white = contrastOn(color, [255, 255, 255]);
	const black = contrastOn(color, [0, 0, 0]);
	return `white ${ratioText(white)} ${contrastGrade(white)}, black ${ratioText(black)} ${contrastGrade(black)}`;
};
const CONTRAST_INFO = "WCAG 2 contrast with white and black. AA needs 4.5 for normal text and 3 for large text; AAA needs 7.";

const reduceChroma = ([l, c, h]) => {
	let min = 0;
	let max = c;
	if (inGamut(oklchToSrgb([l, c, h]))) {
		min = c;
	}
	while (max - min > 0.0001) {
		const chroma = (min + max) / 2;
		if (inGamut(oklchToSrgb([l, chroma, h]))) {
			min = chroma;
		} else {
			max = chroma;
		}
	}
	return clip(oklchToSrgb([l, min, h]));
};

const SHADE_LIGHTNESS = [0.97, 0.93, 0.87, 0.78, 0.69, 0.6, 0.5, 0.41, 0.32, 0.24];
const shades = (color) =>
	SHADE_LIGHTNESS.map((l) => {
		const bytes = reduceChroma([l, color.oklch[1], color.oklch[2]]).map(toByte);
		const alphaByte = toByte(color.a);
		const hex = `#${bytes.map(toHexPair).join("")}${alphaByte < 255 ? toHexPair(alphaByte) : ""}`;
		return { title: hex, icon: swatch({ hex, a: color.a }), copy: hex };
	});

const repeatsInput = (format, color, options) =>
	format === color.format &&
	(format !== "name" || closestName(color, options.names === "css").toLowerCase().split(" / ").includes(color.input));

const copyValue = (format, text) => {
	if (format === "name" || format === "tailwind") {
		return text.replace(/^~ /, "").split(" / ")[0];
	}
	return text;
};

const details = (color, options) => {
	const button = (format) => {
		const title = FORMATS[format](color, options);
		return { title, copy: copyValue(format, title) };
	};
	const buttons = Object.keys(FORMATS)
		.filter((format) => options[format] && (options.showSelected || !repeatsInput(format, color, options)))
		.map(button);
	if (options.contrast) {
		buttons.push({ title: contrast(color), info: CONTRAST_INFO });
	}
	if (options.shades) {
		buttons.push({ title: "Shades", submenu: shades(color) });
	}
	if (buttons.length === 0) {
		buttons.push(button("hex"));
	}
	if (color.outOfGamut && options.gamut) {
		buttons.push({
			title: "outside sRGB",
			info: "This color is outside sRGB, so the swatch and values show the closest sRGB color.",
		});
	}
	return buttons;
};

const MAX_COLORS = 6;
const SCAN_LIMIT = 5000;
const CSS_CANDIDATES = [/#[0-9a-f]{3,8}\b/gi, /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\([^()]*(?:\)|$)/gi];
const PLATFORM_CANDIDATES = [
	/\b(?:ui|ns)?color(?:\.from(?:argb|rgbo)|\.a?rgb)?\([^()]*(?:\)|$)/gi,
	/#colorliteral\([^()]*(?:\)|$)/gi,
	/\b0x[0-9a-f]{8}\b/gi,
];
const TAILWIND_CANDIDATES = [
	new RegExp(
		`(?<![\\w-])(?:[a-z0-9-]+:)*!?(?:${TAILWIND_UTILITIES})-(?:[a-z]+-\\d+|black|white|transparent|\\[[^\\]\\s]+\\])` +
			"(?:/(?:\\d+|\\[[^\\]\\s]+\\]))?!?(?![\\w-])",
		"gi",
	),
	/(?:var\(\s*)?--color-[a-z]+(?:-\d+)?(?:\s*\))?/gi,
];
const DECLARED_NAME = /(?:^|[;{\s])-?-?[a-z_][a-z0-9_-]*\s*:\s*([a-z]+)\s*(?:!important\s*)?(?=;|}|$)/gim;

const findColors = (text, options) => {
	const scanned = text.slice(0, SCAN_LIMIT);
	const candidates = [];
	const patterns = [
		...CSS_CANDIDATES,
		...(options.platformCode ? PLATFORM_CANDIDATES : []),
		...(options.tailwindClasses ? TAILWIND_CANDIDATES : []),
	];
	for (const pattern of patterns) {
		for (const match of scanned.matchAll(pattern)) {
			candidates.push([match.index, match[0]]);
		}
	}
	for (const match of scanned.matchAll(DECLARED_NAME)) {
		candidates.push([match.index + match[0].lastIndexOf(match[1]), match[1]]);
	}
	candidates.sort((a, b) => a[0] - b[0] || b[1].length - a[1].length);

	const singleOptions = { ...options, bareHex: false, bareRgb: false, cssDeclarations: false };
	const colors = [];
	const seen = new Set();
	let end = 0;
	for (const [index, candidate] of candidates) {
		if (index < end || colors.length === MAX_COLORS) {
			continue;
		}
		const color = parse(candidate, singleOptions);
		if (color) {
			end = index + candidate.length;
			if (!seen.has(color.hex)) {
				seen.add(color.hex);
				colors.push({ ...color, text, span: [index, end] });
			}
		}
	}
	return colors;
};

const replaceSpan = (color, value) => color.text.slice(0, color.span[0]) + value + color.text.slice(color.span[1]);

const toAction = (button, color) => {
	const { title, icon, copy, info, submenu } = button;
	const action = { title };
	if (icon) {
		action.icon = icon;
	}
	if (submenu) {
		action.submenu = submenu.map((child) => toAction(child, color));
	} else if (copy === undefined) {
		action.code = () => popclip.showText(info);
	} else {
		action.code = () =>
			popclip.modifiers.option && !color.autoClosed ? popclip.pasteText(replaceSpan(color, copy)) : popclip.copyText(copy);
	}
	return action;
};

const actions = (input, options) => {
	const single = parse(input.text, options);
	const colors = single ? [single] : options.multiple ? findColors(input.text, options) : [];
	return colors.map((color) => ({
		title: closestName(color, options.names === "css"),
		icon: swatch(color),
		submenu: details(color, options).map((button) => toAction(button, color)),
	}));
};

module.exports = {
	actions,
	test: { parse, toHsl, swatch, details, actions, findColors, NAMED_COLORS, oklchToSrgb, xyzToOklab, srgbToXyz },
};
