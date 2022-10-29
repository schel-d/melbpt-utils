import { LocalDate, TtblFileMetadataSection } from "../../../ts/_export";

/** Test general parsing. */
const text01 = `
[metadata]
cat: dog
frog:2022-01-01
bacon : phrase with a space
`;

/** Test general parsing. */
const obj01 = new TtblFileMetadataSection(
  "metadata",
  {
    "cat": "dog",
    "frog": "2022-01-01",
    "bacon": "phrase with a space"
  }
);

/** Test a single field. */
const text02 = `
[metadata]
single: field
`;

/** Test a single field. */
const obj02 = new TtblFileMetadataSection(
  "metadata",
  {
    "single": "field"
  }
);

/** Test double colon. */
const badText01 = `
[metadata]
cat:: dog
`;

/** Test colon after value. */
const badText02 = `
[metadata]
cat: dog:
`;

/** Test duplicate key with same value. */
const badText03 = `
[metadata]
cat: dog
cat: dog
`;

/** Test duplicate key with different value. */
const badText04 = `
[metadata]
cat: dog
cat: frog
`;

/** Test no key. */
const badText05 = `
[metadata]
:dog
`;

/** Test colon before key. */
const badText06 = `
[metadata]
:cat :dog
`;

/** Test missing value. */
const badText07 = `
[metadata]
cat:
`;

/** Test plain text. */
const badText08 = `
[metadata]
cat
`;

export const passing = [
  { text: text01, obj: obj01 },
  { text: text02, obj: obj02 },
];

export const failing = [
  { text: badText01 },
  { text: badText02 },
  { text: badText03 },
  { text: badText04 },
  { text: badText05 },
  { text: badText06 },
  { text: badText07 },
  { text: badText08 },
];

/** Used in get tests. */
export const objProperties = new TtblFileMetadataSection(
  "metadata",
  {
    "string": "some string",
    "int": "24",
    "int2": "-31",
    "date": "2022-02-04",
    "dateWildcard": "*",
    "enum": "dog"
  }
);

/** Used in get tests. */
const dummyEnum = ["dog", "cat", "frog"];

type TFMS = TtblFileMetadataSection;
export const passingProperties = [
  { func: (x: TFMS) => x.get("string"), value: "some string" },
  { func: (x: TFMS) => x.getInt("int"), value: 24 },
  { func: (x: TFMS) => x.getInt("int2"), value: -31 },
  { func: (x: TFMS) => x.getDate("date", false), value: new LocalDate(2022, 2, 4) },
  { func: (x: TFMS) => x.getDate("dateWildcard", true), value: null },
  { func: (x: TFMS) => x.getEnum("enum", dummyEnum), value: "dog" },
];
export const failingProperties = [
  /** Tests key that doesn't exist. */
  { func: (x: TFMS) => x.get("missing") },

  /** Tests wrong type. */
  { func: (x: TFMS) => x.getInt("string") },

  /** Tests date where wildcard is not allowed. */
  { func: (x: TFMS) => x.getDate("dateWildcard", false) },

  /** Tests enum doesn't allow any old string. */
  { func: (x: TFMS) => x.getEnum("string", dummyEnum) },
];
