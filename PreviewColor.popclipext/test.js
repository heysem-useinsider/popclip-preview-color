// run with `/Applications/PopClip.app/Contents/MacOS/PopClip run test.js`
const { test } = require("./color");

const describe = (color, options) => test.details(color, options).map((button) => button.title).join("  ·  ");

const describeCases = new Map([
	["red", "#ff0000  ·  rgb(255 0 0)  ·  hsl(0 100% 50%)  ·  oklch(62.8% 0.258 29.2)"],
	["blue", "#0000ff  ·  rgb(0 0 255)  ·  hsl(240 100% 50%)  ·  oklch(45.2% 0.313 264.1)"],
	["green", "#008000  ·  rgb(0 128 0)  ·  hsl(120 100% 25%)  ·  oklch(52% 0.177 142.5)"],
	["white", "#ffffff  ·  rgb(255 255 255)  ·  hsl(0 0% 100%)  ·  oklch(100% 0 0)"],
	["black", "#000000  ·  rgb(0 0 0)  ·  hsl(0 0% 0%)  ·  oklch(0% 0 0)"],
	["transparent", "#00000000  ·  rgb(0 0 0 / 0%)  ·  hsl(0 0% 0% / 0%)  ·  oklch(0% 0 0 / 0%)"],
	["#FF0000", "#ff0000  ·  rgb(255 0 0)  ·  hsl(0 100% 50%)  ·  oklch(62.8% 0.258 29.2)"],
	["#00FF00", "#00ff00  ·  rgb(0 255 0)  ·  hsl(120 100% 50%)  ·  oklch(86.6% 0.295 142.5)"],
	["#0000FF", "#0000ff  ·  rgb(0 0 255)  ·  hsl(240 100% 50%)  ·  oklch(45.2% 0.313 264.1)"],
	["#FFFFFF", "#ffffff  ·  rgb(255 255 255)  ·  hsl(0 0% 100%)  ·  oklch(100% 0 0)"],
	["#000000", "#000000  ·  rgb(0 0 0)  ·  hsl(0 0% 0%)  ·  oklch(0% 0 0)"],
	["#808080", "#808080  ·  rgb(128 128 128)  ·  hsl(0 0% 50%)  ·  oklch(60% 0 0)"],
	["rgb(255, 0, 0)", "#ff0000  ·  rgb(255 0 0)  ·  hsl(0 100% 50%)  ·  oklch(62.8% 0.258 29.2)"],
	["rgb(0, 128, 255)", "#0080ff  ·  rgb(0 128 255)  ·  hsl(210 100% 50%)  ·  oklch(61.5% 0.211 256.1)"],
	["rgb(255 0 0 / 50%)", "#ff000080  ·  rgb(255 0 0 / 50%)  ·  hsl(0 100% 50% / 50%)  ·  oklch(62.8% 0.258 29.2 / 50%)"],
	["hsl(0, 100%, 50%)", "#ff0000  ·  rgb(255 0 0)  ·  hsl(0 100% 50%)  ·  oklch(62.8% 0.258 29.2)"],
	["hsl(120, 100%, 50%)", "#00ff00  ·  rgb(0 255 0)  ·  hsl(120 100% 50%)  ·  oklch(86.6% 0.295 142.5)"],
	["hsl(240, 100%, 50%)", "#0000ff  ·  rgb(0 0 255)  ·  hsl(240 100% 50%)  ·  oklch(45.2% 0.313 264.1)"],
	["hsl(0 100% 50% / 50%)", "#ff000080  ·  rgb(255 0 0 / 50%)  ·  hsl(0 100% 50% / 50%)  ·  oklch(62.8% 0.258 29.2 / 50%)"],
	["oklch(60% 0.2 250)", "#0081f1  ·  rgb(0 129 241)  ·  hsl(208 100% 47%)  ·  oklch(60% 0.2 250)  ·  outside sRGB"],
	["lab(50% 40 30)", "#bb5846  ·  rgb(187 88 70)  ·  hsl(9 46% 50%)  ·  oklch(57.9% 0.132 31.5)"],
	["lch(60% 50 180)", "#00a68f  ·  rgb(0 166 143)  ·  hsl(172 100% 33%)  ·  oklch(64% 0.141 179.6)  ·  outside sRGB"],
	["color(display-p3 1 0.5 0)", "#ff7d00  ·  rgb(255 125 0)  ·  hsl(29 100% 50%)  ·  oklch(74.3% 0.22 51.2)  ·  outside sRGB"],
	["#1f9add", "#1f9add  ·  rgb(31 154 221)  ·  hsl(201 75% 49%)  ·  oklch(65.5% 0.141 239.8)"],
	["  #000000  ", "#000000  ·  rgb(0 0 0)  ·  hsl(0 0% 0%)  ·  oklch(0% 0 0)"],
	["#ff000080", "#ff000080  ·  rgb(255 0 0 / 50%)  ·  hsl(0 100% 50% / 50%)  ·  oklch(62.8% 0.258 29.2 / 50%)"],
	["#0f08", "#00ff0088  ·  rgb(0 255 0 / 53%)  ·  hsl(120 100% 50% / 53%)  ·  oklch(86.6% 0.295 142.5 / 53%)"],
]);

const hexCases = new Map([
	["oklch(62.796% 0.25768 29.2339)", "#ff0000"],
	["oklab(0.62796 0.22486 0.12585)", "#ff0000"],
	["lab(54.29% 80.8 69.89)", "#ff0000"],
	["lch(54.29% 106.84 40.85)", "#ff0000"],
	["color(srgb 1 0 0)", "#ff0000"],
	["color(srgb-linear 1 0 0)", "#ff0000"],
	["color(display-p3 0.9175 0.2003 0.1386)", "#ff0000"],
	["color(a98-rgb 0.8585 0 0)", "#ff0000"],
	["color(prophoto-rgb 0.7023 0.2757 0.1036)", "#ff0000"],
	["color(rec2020 0.792 0.231 0.0738)", "#ff0000"],
	["color(xyz-d65 0.4124 0.2126 0.0193)", "#ff0000"],
	["color(xyz-d50 0.4360 0.2225 0.0139)", "#ff0000"],
	["color(display-p3 100% 50% 0%)", "#ff7d00"],
	["rgba(255,0,0,0.5)", "#ff000080"],
	["rgb( 255 , 0 , 0 )", "#ff0000"],
	["rgb(100% 50% 0%)", "#ff8000"],
	["rgb(300 -5 0)", "#ff0000"],
	["rgb(none 0 0)", "#000000"],
	["RGB(255 0 0)", "#ff0000"],
	["Red", "#ff0000"],
	["  red  ", "#ff0000"],
	["rebeccapurple", "#663399"],
	["hsla(120deg 100% 50% / .5)", "#00ff0080"],
	["hsl(0.5turn 100% 50%)", "#00ffff"],
	["hsl(200grad 100% 50%)", "#00ffff"],
	["hwb(120 0% 0%)", "#00ff00"],
	["hwb(0 60% 60%)", "#808080"],
	["oklch(0.6 0.2 250deg)", "#0081f1"],
	["lab(100 0 0)", "#ffffff"],
	["color(display-p3 1 1 1)", "#ffffff"],
	["color(a98-rgb 1 1 1)", "#ffffff"],
	["color(prophoto-rgb 1 1 1)", "#ffffff"],
	["color(rec2020 1 1 1)", "#ffffff"],
	["hsl(240, 100%, 50%);", "#0000ff"],
	["#00FF00;", "#00ff00"],
	["red ;", "#ff0000"],
	["  oklch(60% 0.2 250);  ", "#0081f1"],
]);

const rejectCases = [
	"1f9add", "#1f9ad", "#ggg", "add", "#1f9add and more", "", "redd", "the red car", "currentcolor",
	"rgb()", "rgb(255 0)", "rgb(255, 0, 0 / 50%)", "rgb(255 0 0 /)", "rgb(255 0 0 / 50% / 1)",
	"rgb(1px 0 0)", "hsl(0 100% 50% 50%)", "hsl(0% 100% 50%)", "lab(50%, 40, 30)", "oklch(60% 0.2)",
	"color(foo 1 0 0)", "color(display-p3 1 0.5)", "red;;", ";", "#00ff00;x", ";red",
];

let fail = false;
const check = (label, pass, detail) => {
	if (!pass) {
		fail = true;
	}
	print(`${label} -> ${detail} ${pass ? "OK" : "FAIL"}`);
};

const allFormats = { hex: true, rgb: true, hsl: true, oklch: true, gamut: true };
const everyFormat = (text) => {
	const color = test.parse(text);
	return color && { ...color, format: null };
};

describeCases.forEach((expect, text) => {
	const color = everyFormat(text);
	const result = color ? describe(color, allFormats) : null;
	check(JSON.stringify(text), result === expect, result);
});

const optionCases = [
	["#1f9add", { hex: true, rgb: true, hsl: false, oklch: false, gamut: true }, "rgb(31 154 221)"],
	["#1f9add", { hex: false, rgb: false, hsl: false, oklch: true, gamut: true }, "oklch(65.5% 0.141 239.8)"],
	["#1f9add", { hex: false, rgb: false, hsl: false, oklch: false, gamut: false }, "#1f9add"],
	["oklch(60% 0.2 250)", { hex: true, rgb: false, hsl: false, oklch: false, gamut: true }, "#0081f1  ·  outside sRGB"],
	["oklch(60% 0.2 250)", { hex: true, rgb: false, hsl: false, oklch: false, gamut: false }, "#0081f1"],
	["oklch(60% 0.2 250)", { hex: false, rgb: false, hsl: false, oklch: false, gamut: true }, "#0081f1  ·  outside sRGB"],
];

const nameOnly = { name: true };
const nameCases = new Map([
	["red", "Red"],
	["#0000ff", "Blue"],
	["green", "Hulk"],
	["white", "White"],
	["black", "Black"],
	["grey", "Grey"],
	["#c93f38", "100 Mph"],
	["#c93f39", "~ 100 Mph"],
	["#ff000080", "Red"],
	["transparent", "Transparent"],
	["rebeccapurple", "~ Purple Heart"],
	["#1f9add", "~ Homeworld"],
	["oklch(60% 0.2 250)", "~ Azure"],
]);

nameCases.forEach((expect, text) => {
	const result = describe(everyFormat(text), nameOnly);
	check(`name ${JSON.stringify(text)}`, result === expect, result);
});

optionCases.push(
	["#1f9add", { name: true, hex: true, rgb: true, gamut: true }, "~ Homeworld  ·  rgb(31 154 221)"],
	["oklch(60% 0.2 250)", { name: true, gamut: true }, "~ Azure  ·  outside sRGB"],
);

const defaults = { name: true, hex: true, rgb: true, hsl: false, oklch: false, gamut: true };
const everything = { ...allFormats, name: true };
optionCases.push(
	["#ff0000", defaults, "Red  ·  rgb(255 0 0)"],
	["#FF0000;", defaults, "Red  ·  rgb(255 0 0)"],
	["#f00", defaults, "Red  ·  rgb(255 0 0)"],
	["#ff000080", defaults, "Red  ·  rgb(255 0 0 / 50%)"],
	["red", defaults, "#ff0000  ·  rgb(255 0 0)"],
	["Grey", defaults, "#808080  ·  rgb(128 128 128)"],
	["transparent", defaults, "#00000000  ·  rgb(0 0 0 / 0%)"],
	["green", defaults, "Hulk  ·  #008000  ·  rgb(0 128 0)"],
	["rebeccapurple", defaults, "~ Purple Heart  ·  #663399  ·  rgb(102 51 153)"],
	["rgb(255, 0, 0)", defaults, "Red  ·  #ff0000"],
	["rgba(255,0,0,0.5)", defaults, "Red  ·  #ff000080"],
	["hsl(0, 100%, 50%)", everything, "Red  ·  #ff0000  ·  rgb(255 0 0)  ·  oklch(62.8% 0.258 29.2)"],
	["hsla(0 100% 50% / 50%)", everything, "Red  ·  #ff000080  ·  rgb(255 0 0 / 50%)  ·  oklch(62.8% 0.258 29.2 / 50%)"],
	["oklch(60% 0.2 250)", everything, "~ Azure  ·  #0081f1  ·  rgb(0 129 241)  ·  hsl(208 100% 47%)  ·  outside sRGB"],
	["lab(50% 40 30)", { hex: true, rgb: true }, "#bb5846  ·  rgb(187 88 70)"],
	["#ff0000", { hex: true }, "#ff0000"],
);

[
	["1f9add", { ...defaults, bareHex: true }, "~ Homeworld  ·  rgb(31 154 221)"],
	["0, 128, 255", { ...defaults, bareRgb: true }, "~ Azure  ·  #0080ff"],
].forEach(([text, options, expect]) => {
	const result = describe(test.parse(text, options), options);
	check(`${JSON.stringify(text)} ${JSON.stringify(options)}`, result === expect, result);
});

const cssDefaults = { ...defaults, cssNames: true };
const cssNameOnly = { name: true, cssNames: true };
const cssNameCases = new Map([
	["#f0ffff", "azure"],
	["#008000", "green"],
	["#663399", "rebeccapurple"],
	["#808080", "gray / grey"],
	["#00ffff", "aqua / cyan"],
	["#ff00ff", "fuchsia / magenta"],
	["#ff000080", "red"],
	["transparent", "transparent"],
	["#007fff", "Azure"],
	["#1f9add", "~ Homeworld"],
	["#f0fffe", "~ Vapour"],
]);

cssNameCases.forEach((expect, text) => {
	const result = describe(everyFormat(text), cssNameOnly);
	check(`css name ${JSON.stringify(text)}`, result === expect, result);
});

optionCases.push(
	["#f0ffff", cssDefaults, "azure  ·  rgb(240 255 255)"],
	["azure", cssDefaults, "#f0ffff  ·  rgb(240 255 255)"],
	["green", cssDefaults, "#008000  ·  rgb(0 128 0)"],
	["grey", cssDefaults, "#808080  ·  rgb(128 128 128)"],
	["aqua", cssDefaults, "#00ffff  ·  rgb(0 255 255)"],
	["rebeccapurple", cssDefaults, "#663399  ·  rgb(102 51 153)"],
	["rgb(240, 255, 255)", cssDefaults, "azure  ·  #f0ffff"],
	["#1f9add", cssDefaults, "~ Homeworld  ·  rgb(31 154 221)"],
	["azure", { ...cssDefaults, cssNames: false }, "Vapour  ·  #f0ffff  ·  rgb(240 255 255)"],
	["#ff0000", { ...defaults, showSelected: true }, "Red  ·  #ff0000  ·  rgb(255 0 0)"],
	["#ff0000", { ...defaults, showSelected: false }, "Red  ·  rgb(255 0 0)"],
	["red", { ...defaults, showSelected: true }, "Red  ·  #ff0000  ·  rgb(255 0 0)"],
	["azure", { ...cssDefaults, showSelected: true }, "azure  ·  #f0ffff  ·  rgb(240 255 255)"],
	["hsl(240, 100%, 50%)", { ...defaults, hsl: true, showSelected: true }, "Blue  ·  #0000ff  ·  rgb(0 0 255)  ·  hsl(240 100% 50%)"],
);

check("css title", test.actions({ text: "#f0ffff" }, { cssNames: true })[0].title === "azure", test.actions({ text: "#f0ffff" }, { cssNames: true })[0].title);
check("library title", test.actions({ text: "#f0ffff" }, { cssNames: false })[0].title === "Vapour", test.actions({ text: "#f0ffff" }, { cssNames: false })[0].title);

optionCases.forEach(([text, options, expect]) => {
	const result = describe(test.parse(text), options);
	check(`${JSON.stringify(text)} ${JSON.stringify(options)}`, result === expect, result);
});

hexCases.forEach((expect, text) => {
	const color = test.parse(text);
	const result = color ? color.hex : null;
	check(JSON.stringify(text), result === expect, result);
});

rejectCases.forEach((text) => {
	const result = test.actions({ text }, {});
	check(JSON.stringify(text), result.length === 0, `${result.length} actions`);
});

const bareHexCases = [
	["1f9add", false, 0],
	["1f9add", true, 1],
	["1F9ADD80", true, 1],
	["1f9add;", true, 1],
	["#1f9add", true, 1],
	["#1f9add", false, 1],
	["add", true, 0],
	["cafe", true, 0],
	["fff", true, 0],
	["1f9ad", true, 0],
	["1f9add8", true, 0],
	["red", true, 1],
];

bareHexCases.forEach(([text, bareHex, expect]) => {
	const result = test.actions({ text }, { bareHex });
	check(`bareHex=${bareHex} ${JSON.stringify(text)}`, result.length === expect, `${result.length} actions`);
});
check("bare hex value", test.parse("1f9add", { bareHex: true }).hex === "#1f9add", test.parse("1f9add", { bareHex: true }).hex);

const bareRgbCases = [
	["0, 128, 255", false, null],
	["0, 128, 255", true, "#0080ff"],
	["0,128,255", true, "#0080ff"],
	["  255 , 0 , 0 ;", true, "#ff0000"],
	["127.5, 0, 0", true, "#800000"],
	["rgb(0, 128, 255)", false, "#0080ff"],
	["0, 128, 256", true, null],
	["0, 128", true, null],
	["0, 128, 255, 0.5", true, null],
	["0 128 255", true, null],
	["-1, 0, 0", true, null],
	["1,000, 2", true, null],
	["007, 0, 0", true, null],
	["0, 0, 0", true, "#000000"],
];

bareRgbCases.forEach(([text, bareRgb, expect]) => {
	const color = test.parse(text, { bareRgb });
	const result = color ? color.hex : null;
	check(`bareRgb=${bareRgb} ${JSON.stringify(text)}`, result === expect, result);
});
check("bare rgb action", test.actions({ text: "0, 128, 255" }, { bareRgb: true }).length === 1, "1 action expected");

const namedCount = Object.keys(test.NAMED_COLORS).length;
check("named colors", namedCount === 148, namedCount);

const [action] = test.actions({ text: "#1f9add" }, {});
check("icon", action.icon.startsWith("preserve-color svg:<svg") && action.icon.includes('fill="#1f9add"'), action.icon);
check("title", action.title === "~ Homeworld", action.title);
check("exact title", test.actions({ text: "red" }, {})[0].title === "Red", test.actions({ text: "red" }, {})[0].title);

const declarationCases = [
	["color: #00FF00;", true, "#00ff00"],
	["background-color: rgb(0, 128, 255);", true, "#0080ff"],
	["background-color:rgb(0, 128, 255)", true, "#0080ff"],
	["  border-color : red ;  ", true, "#ff0000"],
	["--brand: oklch(60% 0.2 250);", true, "#0081f1"],
	["-webkit-tap-highlight-color: transparent;", true, "#00000000"],
	["color: red !important;", true, "#ff0000"],
	["color: #00FF00;", false, null],
	["color: 1f9add;", true, null],
	["color: #00ff00 #ff0000;", true, null],
	["margin: 0;", true, null],
	["color:", true, null],
	[": red", true, null],
	["a: b: red", true, null],
	["#00ff00", true, "#00ff00"],
];

declarationCases.forEach(([text, cssDeclarations, expect]) => {
	const color = test.parse(text, { cssDeclarations });
	const result = color ? color.hex : null;
	check(`declaration=${cssDeclarations} ${JSON.stringify(text)}`, result === expect, result);
});

check("declaration with bare hex", test.parse("color: 1f9add;", { cssDeclarations: true, bareHex: true }).hex === "#1f9add", "#1f9add expected");
check(
	"declaration hides selected format",
	describe(test.parse("color: #FF0000;", { cssDeclarations: true }), defaults) === "Red  ·  rgb(255 0 0)",
	describe(test.parse("color: #FF0000;", { cssDeclarations: true }), defaults),
);
check(
	"declaration action",
	test.actions({ text: "background-color: rgb(0, 128, 255);" }, { cssDeclarations: true, hex: true }).length === 1,
	"1 action expected",
);

const commaCases = [
	["#ff0000", "rgb(255, 0, 0)  ·  hsl(0, 100%, 50%)"],
	["#ff000080", "rgba(255, 0, 0, 0.5)  ·  hsla(0, 100%, 50%, 0.5)"],
	["#1f9add", "rgb(31, 154, 221)  ·  hsl(201, 75%, 49%)"],
	["transparent", "rgba(0, 0, 0, 0)  ·  hsla(0, 0%, 0%, 0)"],
	["#0f08", "rgba(0, 255, 0, 0.53)  ·  hsla(120, 100%, 50%, 0.53)"],
];

commaCases.forEach(([text, expect]) => {
	const result = describe(everyFormat(text), { rgb: true, hsl: true, commaSyntax: true });
	check(`comma ${JSON.stringify(text)}`, result === expect, result);
});
check("comma parses back", test.parse("rgba(255, 0, 0, 0.5)").hex === "#ff000080", test.parse("rgba(255, 0, 0, 0.5)").hex);

const platformOutput = { flutter: true, androidXml: true, swiftUI: true, uiKit: true };
const platformOutputCases = [
	["#1f9add", "Color(0xFF1F9ADD)  ·  #1F9ADD  ·  Color(red: 0.122, green: 0.604, blue: 0.867)  ·  UIColor(red: 0.122, green: 0.604, blue: 0.867, alpha: 1)"],
	["#ff000080", "Color(0x80FF0000)  ·  #80FF0000  ·  Color(red: 1, green: 0, blue: 0, opacity: 0.502)  ·  UIColor(red: 1, green: 0, blue: 0, alpha: 0.502)"],
	["white", "Color(0xFFFFFFFF)  ·  #FFFFFF  ·  Color(red: 1, green: 1, blue: 1)  ·  UIColor(red: 1, green: 1, blue: 1, alpha: 1)"],
	["transparent", "Color(0x00000000)  ·  #00000000  ·  Color(red: 0, green: 0, blue: 0, opacity: 0)  ·  UIColor(red: 0, green: 0, blue: 0, alpha: 0)"],
	["color(display-p3 1 0.5 0)", "Color(0xFFFF7D00)  ·  #FF7D00  ·  Color(.displayP3, red: 1, green: 0.5, blue: 0)  ·  UIColor(displayP3Red: 1, green: 0.5, blue: 0, alpha: 1)"],
	["color(rec2020 0 1 0)", "Color(0xFF00F272)  ·  #00F272  ·  Color(red: 0, green: 0.949, blue: 0.447)  ·  UIColor(red: 0, green: 0.949, blue: 0.447, alpha: 1)"],
];

platformOutputCases.forEach(([text, expect]) => {
	const result = describe(everyFormat(text), platformOutput);
	check(`platform out ${JSON.stringify(text)}`, result === expect, result);
});

const platformInputCases = [
	["Color(0xFF1F9ADD)", "#1f9add", "flutter"],
	["const Color(0xFF1F9ADD),", null, null],
	["const Color(0xFF1F9ADD);", "#1f9add", "flutter"],
	["Color(0x801F9ADD)", "#1f9add80", "flutter"],
	["0xFF1F9ADD", "#1f9add", "flutter"],
	["Color.fromARGB(255, 31, 154, 221)", "#1f9add", "flutter"],
	["Color.fromRGBO(31, 154, 221, 0.5)", "#1f9add80", "flutter"],
	["Color.rgb(31, 154, 221)", "#1f9add", "android"],
	["Color.argb(128, 31, 154, 221)", "#1f9add80", "android"],
	["Color(red: 0.122, green: 0.604, blue: 0.867)", "#1f9add", "swiftUI"],
	["Color(red: 31/255, green: 154/255, blue: 221/255, opacity: 0.5)", "#1f9add80", "swiftUI"],
	["Color(.sRGB, red: 1, green: 0, blue: 0, opacity: 1)", "#ff0000", "swiftUI"],
	["Color(.displayP3, red: 1, green: 0.5, blue: 0)", "#ff7d00", "swiftUI"],
	["Color(white: 0.5)", "#808080", "swiftUI"],
	["UIColor(red: 31.0/255.0, green: 154.0/255.0, blue: 221.0/255.0, alpha: 1.0)", "#1f9add", "uiKit"],
	["NSColor(srgbRed: 1, green: 0, blue: 0, alpha: 1)", "#ff0000", "uiKit"],
	["UIColor(displayP3Red: 1, green: 0.5, blue: 0, alpha: 1)", "#ff7d00", "uiKit"],
	["UIColor(white: 0, alpha: 0.5)", "#00000080", "uiKit"],
	["#colorLiteral(red: 1, green: 0, blue: 0, alpha: 1)", "#ff0000", "uiKit"],
	["Color(0xFF1F9AD)", null, null],
	["Color(red: 1, green: 0)", null, null],
	["UIColor(red: 1, green: 0, blue: 0)", null, null],
	["Color(red: x, green: 0, blue: 0)", null, null],
	["color(display-p3 1 0.5 0)", "#ff7d00", "color"],
];

platformInputCases.forEach(([text, hex, format]) => {
	const color = test.parse(text, { platformCode: true });
	const result = color ? `${color.hex} ${color.format}` : null;
	check(`platform in ${JSON.stringify(text)}`, result === (hex && `${hex} ${format}`), result);
});
check("platform code off", test.parse("Color(0xFF1F9ADD)", { platformCode: false }) === null, "null expected");
check(
	"platform input hides its button",
	describe(test.parse("Color(0xFF1F9ADD)", { platformCode: true }), { hex: true, flutter: true, swiftUI: true }) ===
		"#1f9add  ·  Color(red: 0.122, green: 0.604, blue: 0.867)",
	describe(test.parse("Color(0xFF1F9ADD)", { platformCode: true }), { hex: true, flutter: true, swiftUI: true }),
);

const contrastCases = [
	["white", "white 1 ✗, black 21 AAA"],
	["black", "white 21 AAA, black 1 ✗"],
	["#767676", "white 4.5 AA, black 4.6 AA"],
	["#777777", "white 4.4 AA large, black 4.6 AA"],
	["#1f9add", "white 3.1 AA large, black 6.7 AA"],
	["#ff0000", "white 3.9 AA large, black 5.2 AA"],
	["transparent", "white 1 ✗, black 1 ✗"],
	["#00000080", "white 4 AA large, black 1 ✗"],
];

contrastCases.forEach(([text, expect]) => {
	const result = describe(everyFormat(text), { contrast: true });
	check(`contrast ${JSON.stringify(text)}`, result === expect, result);
});

const blueShades = test.details(everyFormat("#1f9add"), { shades: true });
check("shades button", blueShades.length === 1 && blueShades[0].title === "Shades", JSON.stringify(blueShades.map((b) => b.title)));
const shadeHexes = blueShades[0].submenu.map((shade) => shade.copy);
check("shade count", shadeHexes.length === 10, shadeHexes.length);
check("shades are hex", shadeHexes.every((hex) => /^#[0-9a-f]{6}$/.test(hex)), JSON.stringify(shadeHexes));
const shadeLightness = shadeHexes.map((hex) => test.parse(hex).oklch[0]);
check("shades go light to dark", shadeLightness.every((l, i) => i === 0 || l < shadeLightness[i - 1]), JSON.stringify(shadeLightness.map((l) => l.toFixed(2))));
const shadeHues = shadeHexes.slice(2, -1).map((hex) => test.parse(hex).oklch[2]);
check("shades keep the hue", shadeHues.every((h) => Math.abs(h - 239.8) < 2), JSON.stringify(shadeHues.map((h) => h.toFixed(1))));
check("shade icons", blueShades[0].submenu.every((shade) => shade.icon.includes(`fill="${shade.copy}"`)), "icons match");
check("gray shades stay gray", test.details(everyFormat("#808080"), { shades: true })[0].submenu.every((shade) => test.parse(shade.copy).oklch[1] < 0.001), "chroma 0");
check("alpha shades", test.details(everyFormat("#1f9add80"), { shades: true })[0].submenu.every((shade) => shade.copy.endsWith("80")), "alpha kept");

const fullMenu = test.actions({ text: "#1f9add" }, { rgb: true, contrast: true, shades: true })[0].submenu;
check("menu order", JSON.stringify(fullMenu.map((b) => b.title)) === JSON.stringify(["rgb(31 154 221)", "white 3.1 AA large, black 6.7 AA", "Shades"]), JSON.stringify(fullMenu.map((b) => b.title)));
check("nested shades submenu", fullMenu[2].code === undefined && fullMenu[2].submenu.length === 10 && typeof fullMenu[2].submenu[0].code === "function", "nested");

const tailwindCases = [
	["oklch(68.5% 0.169 237.323)", "sky-500"],
	["oklch(63.7% 0.237 25.331)", "red-500"],
	["black", "black"],
	["#fff", "white"],
	["#1f9add", "~ sky-500"],
	["#ff0000", "~ red-500"],
	["#808080", "~ olive-500"],
];

tailwindCases.forEach(([text, expect]) => {
	const result = describe(everyFormat(text), { tailwind: true });
	check(`tailwind ${JSON.stringify(text)}`, result === expect, result);
});
check("tailwind copy", test.details(everyFormat("#1f9add"), { tailwind: true })[0].copy === "sky-500", test.details(everyFormat("#1f9add"), { tailwind: true })[0].copy);
check("tailwind count", require("./tailwind").length === 288, require("./tailwind").length);

const copyCases = [
	["#1f9add", { name: true, hex: true, rgb: true }, ["Homeworld", "rgb(31 154 221)"]],
	["#808080", { name: true, cssNames: true, rgb: true }, ["gray", "rgb(128 128 128)"]],
	["red", { name: true, hex: true }, ["#ff0000"]],
	["#ff0000", { hex: true }, ["#ff0000"]],
	["oklch(60% 0.2 250)", { hex: true, gamut: true }, ["#0081f1", undefined]],
];

copyCases.forEach(([text, options, expect]) => {
	const result = test.details(test.parse(text), options).map((button) => button.copy);
	check(`copy ${JSON.stringify(text)}`, JSON.stringify(result) === JSON.stringify(expect), JSON.stringify(result));
});

const [swatchAction] = test.actions({ text: "#1f9add" }, { name: true, hex: true, rgb: true, gamut: true });
check("no own click behavior", swatchAction.code === undefined, typeof swatchAction.code);
check(
	"submenu titles",
	JSON.stringify(swatchAction.submenu.map((button) => button.title)) === JSON.stringify(["~ Homeworld", "rgb(31 154 221)"]),
	JSON.stringify(swatchAction.submenu.map((button) => button.title)),
);

const calls = [];
const realPopclip = globalThis.popclip;
globalThis.popclip = {
	modifiers: { option: false },
	copyText: (text) => calls.push(["copy", text]),
	pasteText: (text) => calls.push(["paste", text]),
	showText: (text) => calls.push(["show", text]),
};
swatchAction.submenu.forEach((button) => button.code());
test.actions({ text: "oklch(60% 0.2 250)" }, { hex: true, gamut: true })[0].submenu[1].code();
globalThis.popclip = realPopclip;
check(
	"button clicks",
	JSON.stringify(calls) ===
		JSON.stringify([
			["copy", "Homeworld"],
			["copy", "rgb(31 154 221)"],
			["show", "This color is outside sRGB, so the swatch and values show the closest sRGB color."],
		]),
	JSON.stringify(calls),
);

const pasted = [];
globalThis.popclip = {
	modifiers: { option: true },
	copyText: (text) => pasted.push(["copy", text]),
	pasteText: (text) => pasted.push(["paste", text]),
	showText: (text) => pasted.push(["show", text]),
};
test.actions({ text: "#1f9add" }, { rgb: true })[0].submenu[0].code();
test.actions({ text: "  color: #1F9ADD !important;" }, { rgb: true, cssDeclarations: true })[0].submenu[0].code();
test.actions({ text: "#1f9add" }, { shades: true })[0].submenu[0].submenu[0].code();
test.actions({ text: "a { color: #f00; background: rgb(0, 128, 255); }" }, { hex: true, multiple: true })[1].submenu[0].code();
test.actions({ text: "#1f9add" }, { contrast: true })[0].submenu[0].code();
globalThis.popclip = realPopclip;
check(
	"option-click pastes in place",
	JSON.stringify(pasted) ===
		JSON.stringify([
			["paste", "rgb(31 154 221)"],
			["paste", "  color: rgb(31 154 221) !important;"],
			["paste", "#ecf7ff"],
			["paste", "a { color: #f00; background: #0080ff; }"],
			["show", "WCAG 2 contrast with white and black. AA needs 4.5 for normal text and 3 for large text; AAA needs 7."],
		]),
	JSON.stringify(pasted),
);

const multiOptions = { multiple: true, platformCode: true };
const multiCases = [
	["a { color: #f00; background: rgb(0, 128, 255); border-color: red; }", ["#ff0000", "#0080ff"]],
	["--brand: oklch(60% 0.2 250); --accent: hsl(0 100% 50% / 50%);", ["#0081f1", "#ff000080"]],
	["Text(color: Color(0xFF1F9ADD)), Container(color: Colors.red, child: x)", ["#1f9add"]],
	["let a = UIColor(red: 1, green: 0, blue: 0, alpha: 1); let b = Color(white: 0.5)", ["#ff0000", "#808080"]],
	["primary: #1f9add, secondary: #ff0000, third: #00ff00, 4: #0000ff, 5: #ffff00, 6: #00ffff, 7: #ff00ff", ["#1f9add", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff"]],
	["a red car and a blue house", []],
	["see issue #123 and #4567", ["#112233", "#44556677"]],
	["color: tomato; background: notacolor;", ["#ff6347"]],
	["#zzz and rgb(1 2) and color(foo 1 2 3)", []],
	["fill: #fff; stroke: #FFFFFF;", ["#ffffff"]],
	["c = color(display-p3 1 0.5 0)", ["#ff7d00"]],
];

multiCases.forEach(([text, expect]) => {
	const hexes = test.findColors(text, multiOptions).map((color) => color.hex);
	check(`multi ${JSON.stringify(text)}`, JSON.stringify(hexes) === JSON.stringify(expect), JSON.stringify(hexes));
});
check("multi off", test.actions({ text: "a { color: #f00; background: #00f; }" }, { multiple: false }).length === 0, "0 actions");
check("multi actions", test.actions({ text: "a { color: #f00; background: #00f; }" }, { multiple: true, name: true }).map((a) => a.title).join(",") === "Red,Blue", test.actions({ text: "a { color: #f00; background: #00f; }" }, { multiple: true, name: true }).map((a) => a.title).join(","));
check("single wins over multi", test.actions({ text: "#f00" }, { multiple: true }).length === 1, "1 action");
const platformOff = test.findColors("x = Color(0xFF1F9ADD) y = #f00", { multiple: true }).map((color) => `${color.hex} ${color.span}`);
check("multi platform off", JSON.stringify(platformOff) === JSON.stringify(["#ff0000 26,30"]), JSON.stringify(platformOff));
check("multi hides each input format", describe(test.findColors("a: #f00; b: rgb(0 0 255)", multiOptions)[1], { hex: true, rgb: true }) === "#0000ff", describe(test.findColors("a: #f00; b: rgb(0 0 255)", multiOptions)[1], { hex: true, rgb: true }));

const openCases = [
	["rgb(0, 128, 255", {}, "#0080ff"],
	["rgb(0 128 255 / 50%", {}, "#0080ff80"],
	["  hsl(240, 100%, 50%  ", {}, "#0000ff"],
	["oklch(60% 0.2 250", {}, "#0081f1"],
	["color(display-p3 1 0.5 0", {}, "#ff7d00"],
	["color: rgb(0, 128, 255", { cssDeclarations: true }, "#0080ff"],
	["Color(0xFF1F9ADD", { platformCode: true }, "#1f9add"],
	["UIColor(red: 1, green: 0, blue: 0, alpha: 1", { platformCode: true }, "#ff0000"],
	["rgb(0, 128, 255)", {}, "#0080ff"],
	["rgb(0, 128, 255))", {}, null],
	["rgb((0, 128, 255", {}, null],
	["rgb(0, 128", {}, null],
	["rgb(", {}, null],
];

openCases.forEach(([text, options, expect]) => {
	const color = test.parse(text, options);
	const result = color ? color.hex : null;
	check(`open paren ${JSON.stringify(text)}`, result === expect, result);
});
check("auto-closed flag", test.parse("rgb(0, 128, 255").autoClosed === true && test.parse("rgb(0, 128, 255)").autoClosed === false, "flag set only when closed for you");
check("auto-closed hides its format", describe(test.parse("rgb(0, 128, 255"), { hex: true, rgb: true }) === "#0080ff", describe(test.parse("rgb(0, 128, 255"), { hex: true, rgb: true }));

const openMulti = test.findColors("a { color: #f00; background: rgb(0, 128, 255", { multiple: true }).map((color) => `${color.hex} ${color.autoClosed}`);
check("multi auto-closes the last color", JSON.stringify(openMulti) === JSON.stringify(["#ff0000 false", "#0080ff true"]), JSON.stringify(openMulti));

const openClicks = [];
globalThis.popclip = {
	modifiers: { option: true },
	copyText: (text) => openClicks.push(["copy", text]),
	pasteText: (text) => openClicks.push(["paste", text]),
	showText: (text) => openClicks.push(["show", text]),
};
test.actions({ text: "rgb(0, 128, 255" }, { hex: true })[0].submenu[0].code();
test.actions({ text: "rgb(0, 128, 255)" }, { hex: true })[0].submenu[0].code();
globalThis.popclip = realPopclip;
check(
	"option-click copies when the paren was missing",
	JSON.stringify(openClicks) === JSON.stringify([["copy", "#0080ff"], ["paste", "#0080ff"]]),
	JSON.stringify(openClicks),
);

const tailwindOn = { tailwindClasses: true };
const tailwindInputCases = [
	["sky-500", "#00a6f4", "tailwind"],
	["bg-sky-500", "#00a6f4", "tailwind"],
	["text-red-600", "#e7000b", "tailwind"],
	["Bg-Sky-500", "#00a6f4", "tailwind"],
	["bg-sky-500;", "#00a6f4", "tailwind"],
	["--color-sky-500", "#00a6f4", "tailwind"],
	["var(--color-sky-500)", "#00a6f4", "tailwind"],
	["var(--color-sky-500", "#00a6f4", "tailwind"],
	["bg-sky-500/50", "#00a6f480", "tailwind"],
	["bg-sky-500/[35%]", "#00a6f459", "tailwind"],
	["bg-sky-500/[0.35]", "#00a6f459", "tailwind"],
	["hover:bg-sky-500", "#00a6f4", "tailwind"],
	["md:dark:hover:!text-sky-500", "#00a6f4", "tailwind"],
	["bg-sky-500!", "#00a6f4", "tailwind"],
	["ring-offset-red-500", "#fb2c36", "tailwind"],
	["border-x-red-500", "#fb2c36", "tailwind"],
	["from-emerald-400", "#00d492", "tailwind"],
	["bg-transparent", "#00000000", "tailwind"],
	["text-white", "#ffffff", "tailwind"],
	["bg-[#1f9add]", "#1f9add", "hex"],
	["bg-[rgb(0_128_255)]", "#0080ff", "rgb"],
	["text-[oklch(60%_0.2_250)]", "#0081f1", "oklch"],
	["bg-sky-501", null, null],
	["bg-[url(x)]", null, null],
	["[#fff]", null, null],
	["sky", null, null],
	["bg-sky-500/abc", null, null],
	["text-lg", null, null],
	["bg-sky-500 text-red-600", null, null],
	["--color-sky", null, null],
];

tailwindInputCases.forEach(([text, hex, format]) => {
	const color = test.parse(text, tailwindOn);
	const result = color ? `${color.hex} ${color.format}` : null;
	check(`tailwind in ${JSON.stringify(text)}`, result === (hex && `${hex} ${format}`), result);
});
check("tailwind classes off", test.parse("bg-sky-500", { tailwindClasses: false }) === null, "null expected");
check("plain CSS names still win", test.parse("white", tailwindOn).format === "name", test.parse("white", tailwindOn).format);
check(
	"tailwind input hides its button",
	describe(test.parse("bg-sky-500", tailwindOn), { tailwind: true, hex: true }) === "#00a6f4",
	describe(test.parse("bg-sky-500", tailwindOn), { tailwind: true, hex: true }),
);
check(
	"tailwind input with opacity",
	describe(test.parse("bg-sky-500/50", tailwindOn), { tailwind: true, rgb: true }) === "rgb(0 166 244 / 50%)",
	describe(test.parse("bg-sky-500/50", tailwindOn), { tailwind: true, rgb: true }),
);

const tailwindMulti = { multiple: true, tailwindClasses: true };
const tailwindMultiCases = [
	['<div class="bg-sky-500 text-white hover:bg-sky-600/80 p-4">', ["#00a6f4", "#ffffff", "#0084d1cc"]],
	['className="flex border-x-red-500 ring-[#1f9add] text-lg"', ["#fb2c36", "#1f9add"]],
	["--color-brand: var(--color-sky-500);", ["#00a6f4"]],
	["@theme { --color-primary-500: oklch(68.5% 0.169 237.323); }", ["#00a6f4"]],
	["the background was text-ish", []],
];
tailwindMultiCases.forEach(([text, expect]) => {
	const hexes = test.findColors(text, tailwindMulti).map((color) => color.hex);
	check(`tailwind multi ${JSON.stringify(text)}`, JSON.stringify(hexes) === JSON.stringify(expect), JSON.stringify(hexes));
});
check(
	"tailwind multi off",
	JSON.stringify(test.findColors('<div class="bg-sky-500 text-white">', { multiple: true }).map((color) => color.hex)) === "[]",
	JSON.stringify(test.findColors('<div class="bg-sky-500 text-white">', { multiple: true }).map((color) => color.hex)),
);

print(`${fail ? "FAILED" : "PASSED"}`);
