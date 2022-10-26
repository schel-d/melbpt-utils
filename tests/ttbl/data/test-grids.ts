import { toDirectionID } from "../../../ts/network/direction-id";
import { toStopID } from "../../../ts/network/stop-id";
import { GridRow, TtblFileGridSection } from "../../../ts/ttbl/ttbl-file-grid-section";
import { LocalTime } from "../../../ts/utils/local-time";
import { WeekdayRange } from "../../../ts/utils/week-day-range";

/** Test general parsing, comments are ignored, and blank times permitted. */
const text01 = `
[up, MTWTFSS]
0001 place 03:04 04:04
0002 place 03:06 -
0003 place 03:08 04:08
`;

/** Test general parsing, comments are ignored, and blank times permitted. */
const obj01 = new TtblFileGridSection(
  toDirectionID("up"),
  WeekdayRange.parse("MTWTFSS"),
  [
    new GridRow(toStopID(1), "place", [
      LocalTime.fromTime(3, 4),
      LocalTime.fromTime(4, 4)
    ]),
    new GridRow(toStopID(2), "place", [
      LocalTime.fromTime(3, 6),
      null
    ]),
    new GridRow(toStopID(3), "place", [
      LocalTime.fromTime(3, 8),
      LocalTime.fromTime(4, 8)
    ]),
  ]
);

/** Test dashes in comments and next day times. */
const text02 = `
[up, MTWT___]
0001 place-ville 03:04 12:47 >01:59
0002 somewhere 03:06 13:04 >03:58
`;

/** Test dashes in comments and next day times. */
const obj02 = new TtblFileGridSection(
  toDirectionID("up"),
  WeekdayRange.parse("MTWT___"),
  [
    new GridRow(toStopID(1), "place-ville", [
      LocalTime.fromTime(3, 4),
      LocalTime.fromTime(12, 47),
      LocalTime.fromTime(1, 59, true)
    ]),
    new GridRow(toStopID(2), "somewhere", [
      LocalTime.fromTime(3, 6),
      LocalTime.fromTime(13, 4),
      LocalTime.fromTime(3, 58, true)
    ]),
  ]
);

/** Test duplicate comment handling. */
const badText01 = `
[up, MTWTFSS]
0001 place place 03:04 >1:02
0002 place 03:04 >1:02
`;

/** Test duplicate comment handling without jagged grid. */
const badText02 = `
[up, MTWTFSS]
0001 place place 03:04 >1:02
0002 place disgrace 03:04 >1:02
`;

/** Test no times. */
const badText03 = `
[up, MTWTFSS]
0001 place
0002 disgrace
`;

/** Test jagged grid. */
const badText04 = `
[up, MTWTFSS]
0001 place 03:04
0002 other 03:06 04:06
`;

/** Test duplicate stop ID. */
const badText05 = `
[up, MTWTFSS]
0001 place 03:04
0001 other 03:06
`;

/** Test time travel. */
const badText06 = `
[up, MTWTFSS]
0001 place 04:04
0002 other 03:06
`;

/** Test day-spanning time travel. */
const badText07 = `
[up, MTWTFSS]
0001 place >02:04
0002 other 03:06
`;

/** Test jagged grid. */
const badConstructor01 = () => new TtblFileGridSection(
  toDirectionID("up"),
  WeekdayRange.parse("MTWTFSS"),
  [
    new GridRow(toStopID(1), "place", [
      LocalTime.fromTime(3, 4)
    ]),
    new GridRow(toStopID(2), "place", [
      LocalTime.fromTime(3, 6),
      LocalTime.fromTime(3, 8)
    ]),
  ]
);

/** Test jagged grid. */
const badConstructor02 = () => new TtblFileGridSection(
  toDirectionID("up"),
  WeekdayRange.parse("MTWTFSS"),
  [
    new GridRow(toStopID(1), "place", [
      LocalTime.fromTime(3, 4),
      LocalTime.fromTime(4, 4)
    ]),
    new GridRow(toStopID(2), "place", [
      LocalTime.fromTime(3, 8)
    ]),
  ]
);

/** Test time travel. */
const badConstructor03 = () => new TtblFileGridSection(
  toDirectionID("up"),
  WeekdayRange.parse("MTWTFSS"),
  [
    new GridRow(toStopID(1), "place", [
      LocalTime.fromTime(3, 4),
      LocalTime.fromTime(4, 4)
    ]),
    new GridRow(toStopID(2), "place", [
      LocalTime.fromTime(3, 8),
      LocalTime.fromTime(4, 2)
    ]),
  ]
);

/** Test day-spanning time travel. */
const badConstructor04 = () => new TtblFileGridSection(
  toDirectionID("up"),
  WeekdayRange.parse("MTWTFSS"),
  [
    new GridRow(toStopID(1), "place", [
      LocalTime.fromTime(3, 4),
      LocalTime.fromTime(4, 4, true)
    ]),
    new GridRow(toStopID(2), "place", [
      LocalTime.fromTime(3, 8),
      LocalTime.fromTime(4, 6)
    ]),
  ]
);

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
];

export const failingConstructors = [
  badConstructor01,
  badConstructor02,
  badConstructor03,
  badConstructor04
];
