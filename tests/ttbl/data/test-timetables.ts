import {
  LocalDate, LocalTime, Timetable, TimetableEntryStop,
  TimetableEntryWithinSection, TimetableSection, toDirectionID, toLineID,
  toStopID, toTimetableEntryIndex, toTimetableID, WeekdayRange
} from "../../../src/_export";

/** Test general parsing. */
const text01 = `
[timetable]
version: 2
created: 2022-08-22
id: 108
line: 3
type: main
begins: 2022-09-01
ends: *

[albury-up, MTWT___]
0244 seymour        09:02  -      19:44
0268 tallarook      -      15:08  -
0040 broadmeadows   09:53  15:59  21:10
0096 essendon       -      -      -
0253 southern-cross 10:27  16:33  21:45

[albury-down, ____F__]
0253 southern-cross 07:07  -      18:02
0096 essendon       -      12:04  -
0040 broadmeadows   -      -      -
0268 tallarook      07:35  12:32  18:30
0244 seymour        -      -      -
`;

const obj01 = new Timetable(
  toTimetableID(108),
  toLineID(3),
  new LocalDate(2022, 8, 22),
  "main",
  new LocalDate(2022, 9, 1),
  null,
  [
    new TimetableSection(
      toDirectionID("albury-up"),
      WeekdayRange.parse("MTWT___"),
      toTimetableEntryIndex(0),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(244), LocalTime.fromTime(9, 2)),
          new TimetableEntryStop(toStopID(40), LocalTime.fromTime(9, 53)),
          new TimetableEntryStop(toStopID(253), LocalTime.fromTime(10, 27)),
        ]),
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(268), LocalTime.fromTime(15, 8)),
          new TimetableEntryStop(toStopID(40), LocalTime.fromTime(15, 59)),
          new TimetableEntryStop(toStopID(253), LocalTime.fromTime(16, 33)),
        ]),
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(244), LocalTime.fromTime(19, 44)),
          new TimetableEntryStop(toStopID(40), LocalTime.fromTime(21, 10)),
          new TimetableEntryStop(toStopID(253), LocalTime.fromTime(21, 45)),
        ])
      ]
    ),
    new TimetableSection(
      toDirectionID("albury-down"),
      WeekdayRange.parse("____F__"),
      toTimetableEntryIndex(12),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(253), LocalTime.fromTime(7, 7)),
          new TimetableEntryStop(toStopID(268), LocalTime.fromTime(7, 35)),
        ]),
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(96), LocalTime.fromTime(12, 4)),
          new TimetableEntryStop(toStopID(268), LocalTime.fromTime(12, 32)),
        ]),
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(253), LocalTime.fromTime(18, 2)),
          new TimetableEntryStop(toStopID(268), LocalTime.fromTime(18, 30)),
        ])
      ]
    )
  ]
);

const out01 = `[timetable]\n` +
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
  `0253 southern-cross 07:07  -      18:02 \n` +
  `0096 essendon       -      12:04  -     \n` +
  `0040 broadmeadows   -      -      -     \n` +
  `0268 tallarook      07:35  12:32  18:30 \n` +
  `0244 seymour        -      -      -     \n`;

export const passing = [
  { text: text01, obj: obj01 },
];

export const writing = [
  { obj: obj01, out: out01 },
];
