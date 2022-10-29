import { TtblFileSection } from "../../../ts/_export";

/**
 * Test general parsing, whitespace trimming, and brackets outside a section
 * header.
 */
const text01 = `
[section1]
text

[second section]
 some
pretty
    bad whitespacing
issues

[some-symbols :)]
another other cuz why not [this is fine]
`;

/**
 * Test general parsing, whitespace trimming, and brackets outside a section
 * header.
 */
const obj01 = [
  new TtblFileSection("section1", [
    "text"
  ]),
  new TtblFileSection("second section", [
    "some",
    "pretty",
    "bad whitespacing",
    "issues"
  ]),
  new TtblFileSection("some-symbols :)", [
    "another other cuz why not [this is fine]"
  ])
];

/** Test single field. */
const text02 = `
[section]
text
`;

/** Test single field. */
const obj02 = [
  new TtblFileSection("section", [
    "text"
  ])
];

/** Test empty text. */
const text03 = `


`;

/** Test empty text. */
const obj03: TtblFileSection[] = [];

/** Test empty section. */
const badText01 = `
[empty section]
`;

/** Test extra brackets in title. */
const badText02 = `
[[bad title]
content
`;

/** Test extra brackets in title. */
const badText03 = `
[bad] [title]
content
`;

/** Test extra brackets in title. */
const badText04 = `
[[bad title]]
content
`;

export const passing = [
  { text: text01, obj: obj01 },
  { text: text02, obj: obj02 },
  { text: text03, obj: obj03 },
];

export const failing = [
  { text: badText01 },
  { text: badText02 },
  { text: badText03 },
  { text: badText04 },
];
