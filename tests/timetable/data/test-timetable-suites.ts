const timetableHeader = `
[timetable]
version: 2
`;
const timetableContent = `
created: 2022-08-22

[albury-up, MTWT___]
0244 seymour            09:02  -      19:44
0268 tallarook          -      15:08  -
0040 broadmeadows       09:53  15:59  21:10
0096 essendon           -      -      -
0253 southern-cross     10:27  16:33  21:45

[albury-down, ____F__]
0253 southern-cross     07:07  -      18:02
0204 north-melbourne    -      12:04  -
0096 essendon           -      -      -
0040 broadmeadows       07:35  12:32  18:30
0068 craigieburn        -      -      -
`;

/** Distinct ids and date ranges. */
const text01 = [`
${timetableHeader}
id: 108
line: 3
type: main
begins: 2022-09-01
ends: *
${timetableContent}
`, `
${timetableHeader}
id: 109
line: 3
type: main
begins: *
ends: 2022-08-31
${timetableContent}
`];

/** Overlapping dates but different types (so it's ok). */
const text02 = [`
${timetableHeader}
id: 108
line: 3
type: main
begins: *
ends: *
${timetableContent}
`, `
${timetableHeader}
id: 109
line: 3
type: temporary
begins: 2022-08-10
ends: 2022-08-31
${timetableContent}
`];

/** Overlapping dates (with wildcards). */
const badText01 = [`
${timetableHeader}
id: 108
line: 3
type: main
begins: *
ends: *
${timetableContent}
`, `
${timetableHeader}
id: 109
line: 3
type: main
begins: 2022-08-10
ends: 2022-08-31
${timetableContent}
`];

/** Duplicate IDs. */
const badText02 = [`
${timetableHeader}
id: 108
line: 3
type: main
begins: *
ends: *
${timetableContent}
`, `
${timetableHeader}
id: 108
line: 4
type: main
begins: *
ends: *
${timetableContent}
`];

/** Overlapping dates (enclave). */
const badText03 = [`
${timetableHeader}
id: 108
line: 3
type: main
begins: 2022-07-26
ends: 2022-11-07
${timetableContent}
`, `
${timetableHeader}
id: 109
line: 3
type: main
begins: 2022-08-10
ends: 2022-08-31
${timetableContent}
`];

/** Overlapping dates (staggered). */
const badText04 = [`
${timetableHeader}
id: 108
line: 3
type: main
begins: 2022-07-26
ends: 2022-08-31
${timetableContent}
`, `
${timetableHeader}
id: 109
line: 3
type: main
begins: 2022-08-10
ends: 2022-11-07
${timetableContent}
`];

export const passingTexts = [
  text01,
  text02
];

export const failingTexts = [
  badText01,
  badText02,
  badText03,
  badText04
];
