import { toDirectionID } from "../../../ts/network/direction-id";
import { toLineID } from "../../../ts/network/line-id";
import { toStopID } from "../../../ts/network/stop-id";
import { toTimetableID } from "../../../ts/network/timetable-id";
import { TtblFile } from "../../../ts/ttbl/ttbl-file";
import { GridRow, TtblFileGridSection } from "../../../ts/ttbl/ttbl-file-grid-section";
import { LocalDate } from "../../../ts/utils/local-date";
import { LocalTime } from "../../../ts/utils/local-time";
import { WeekdayRange } from "../../../ts/utils/week-day-range";

/**
 * Test general parsing.
 */
const text01a = `
[timetable]
version: 2
created: 2022-08-22
id: 108
line: 3
type: main
begins: 2022-09-01
ends: *

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

/**
 * Test metadata different order.
 */
const text01b = `
[timetable]
version: 2
type: main
ends: *
id: 108
begins: 2022-09-01
created: 2022-08-22
line: 3

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

/**
 * Test general parsing.
 */
const obj01 = new TtblFile(
  new LocalDate(2022, 8, 22),
  toTimetableID(108),
  toLineID(3),
  "main",
  new LocalDate(2022, 9, 1),
  null,
  [
    new TtblFileGridSection(
      toDirectionID("albury-up"),
      WeekdayRange.parse("MTWT___"),
      [
        new GridRow(toStopID(244), "seymour", [
          LocalTime.fromTime(9, 2),
          null,
          LocalTime.fromTime(19, 44),
        ]),
        new GridRow(toStopID(268), "tallarook", [
          null,
          LocalTime.fromTime(15, 8),
          null,
        ]),
        new GridRow(toStopID(40), "broadmeadows", [
          LocalTime.fromTime(9, 53),
          LocalTime.fromTime(15, 59),
          LocalTime.fromTime(21, 10),
        ]),
        new GridRow(toStopID(96), "essendon", [
          null,
          null,
          null,
        ]),
        new GridRow(toStopID(253), "southern-cross", [
          LocalTime.fromTime(10, 27),
          LocalTime.fromTime(16, 33),
          LocalTime.fromTime(21, 45),
        ]),
      ]
    ),
    new TtblFileGridSection(
      toDirectionID("albury-down"),
      WeekdayRange.parse("____F__"),
      [
        new GridRow(toStopID(253), "southern-cross", [
          LocalTime.fromTime(7, 7),
          null,
          LocalTime.fromTime(18, 2),
        ]),
        new GridRow(toStopID(204), "north-melbourne", [
          null,
          LocalTime.fromTime(12, 4),
          null,
        ]),
        new GridRow(toStopID(96), "essendon", [
          null,
          null,
          null,
        ]),
        new GridRow(toStopID(40), "broadmeadows", [
          LocalTime.fromTime(7, 35),
          LocalTime.fromTime(12, 32),
          LocalTime.fromTime(18, 30),
        ]),
        new GridRow(toStopID(68), "craigieburn", [
          null,
          null,
          null,
        ]),
      ]
    ),
  ]
);

/**
 * Test writing.
 */
const out01 =
  `[timetable]\n` +
  `version: 2\n` +
  `created: 2022-08-22\n` +
  `id: 108\n` +
  `line: 3\n` +
  `type: main\n` +
  `begins: 2022-09-01\n` +
  `ends: *\n` +
  `\n` +
  `[albury-up, MTWT___]\n` +
  `0244 seymour        09:02  -      19:44 \n` +
  `0268 tallarook      -      15:08  -     \n` +
  `0040 broadmeadows   09:53  15:59  21:10 \n` +
  `0096 essendon       -      -      -     \n` +
  `0253 southern-cross 10:27  16:33  21:45 \n` +
  `\n` +
  `[albury-down, ____F__]\n` +
  `0253 southern-cross  07:07  -      18:02 \n` +
  `0204 north-melbourne -      12:04  -     \n` +
  `0096 essendon        -      -      -     \n` +
  `0040 broadmeadows    07:35  12:32  18:30 \n` +
  `0068 craigieburn     -      -      -     \n`;

/** Test compliant string but wrong version number. */
const badVersionText01 = `
[timetable]
version: 1
created: 2022-08-22
id: 108
line: 3
type: main
begins: 2022-09-01
ends: *

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

/** Test miscellanious text. */
const badVersionText02 = `
garbage
`;

/** Test metadata only. */
const badText01 = `
[timetable]
version: 2
created: 2022-08-22
id: 108
line: 3
type: main
begins: 2022-09-01
ends: *
`;

/** Test optional created field. */
const badText02 = `
[timetable]
version: 2
created: *
id: 108
line: 3
type: main
begins: 2022-09-01
ends: *

[albury-up, MTWT___]
0244 seymour            09:02  -      19:44
0268 tallarook          -      15:08  -
0040 broadmeadows       09:53  15:59  21:10
0096 essendon           -      -      -
0253 southern-cross     10:27  16:33  21:45
`;

/** Test unknown type. */
const badText03 = `
[timetable]
version: 2
created: 2022-08-22
id: 108
line: 3
type: catdog
begins: 2022-09-01
ends: *

[albury-up, MTWT___]
0244 seymour            09:02  -      19:44
0268 tallarook          -      15:08  -
0040 broadmeadows       09:53  15:59  21:10
0096 essendon           -      -      -
0253 southern-cross     10:27  16:33  21:45
`;

/** Test illegal id. */
const badText04 = `
[timetable]
version: 2
created: 2022-08-22
id: 2408
line: 3
type: main
begins: 2022-09-01
ends: *

[albury-up, MTWT___]
0244 seymour            09:02  -      19:44
0268 tallarook          -      15:08  -
0040 broadmeadows       09:53  15:59  21:10
0096 essendon           -      -      -
0253 southern-cross     10:27  16:33  21:45
`;

/** Test missing line field. */
const badText05 = `
[timetable]
version: 2
created: 2022-08-22
id: 108
type: main
begins: 2022-09-01
ends: *

[albury-up, MTWT___]
0244 seymour            09:02  -      19:44
0268 tallarook          -      15:08  -
0040 broadmeadows       09:53  15:59  21:10
0096 essendon           -      -      -
0253 southern-cross     10:27  16:33  21:45
`;

export const passing = [
  { text: text01a, obj: obj01 },
  { text: text01b, obj: obj01 },
];

export const writing = [
  { obj: obj01, out: out01 },
];

export const failingVersion = [
  { text: badVersionText01 },
  { text: badVersionText02 },
];

export const failing = [
  { text: badText01 },
  { text: badText02 },
  { text: badText03 },
  { text: badText04 },
  { text: badText05 },
];
