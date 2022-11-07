import {
  DayOfWeek,
  LocalDate, LocalTime, Timetable, TimetableEntry, TimetableEntryStop,
  TimetableEntryWithinSection, TimetableSection, toDirectionID, toLineID,
  toStopID, toTimetableEntryIndex, toTimetableID, WeekdayRange
} from "../../../src/_export";

/** Test regular constructor. */
const constructor01 = () => new Timetable(
  toTimetableID(1),
  toLineID(1),
  new LocalDate(2022, 10, 28),
  "main",
  null,
  null,
  [
    new TimetableSection(
      toDirectionID("up"),
      WeekdayRange.parse("M______"),
      toTimetableEntryIndex(0),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ])
      ]
    )
  ]
);

/** Test good section indexing constructor. */
const constructor02 = () => new Timetable(
  toTimetableID(1),
  toLineID(1),
  new LocalDate(2022, 10, 28),
  "main",
  null,
  null,
  [
    new TimetableSection(
      toDirectionID("up"),
      WeekdayRange.parse("M______"),
      toTimetableEntryIndex(0),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ]),
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 25)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 28))
        ])
      ]
    ),
    new TimetableSection(
      toDirectionID("up"),
      WeekdayRange.parse("M______"),
      toTimetableEntryIndex(2),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ])
      ]
    )
  ]
);

/** Test good section indexing constructor with repeats due to weekday range. */
const constructor03 = () => new Timetable(
  toTimetableID(1),
  toLineID(1),
  new LocalDate(2022, 10, 28),
  "main",
  null,
  null,
  [
    new TimetableSection(
      toDirectionID("up"),
      WeekdayRange.parse("MTWT___"),
      toTimetableEntryIndex(0),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ]),
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 25)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 28))
        ])
      ]
    ),
    new TimetableSection(
      toDirectionID("up"),
      WeekdayRange.parse("____FSS"),
      toTimetableEntryIndex(8),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ])
      ]
    )
  ]
);

/** Test timetable lasting one day only. */
const constructor04 = () => new Timetable(
  toTimetableID(1),
  toLineID(1),
  new LocalDate(2022, 10, 28),
  "main",
  new LocalDate(2022, 7, 11),
  new LocalDate(2022, 7, 11),
  [
    new TimetableSection(
      toDirectionID("up"),
      WeekdayRange.parse("M______"),
      toTimetableEntryIndex(0),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ])
      ]
    )
  ]
);

/** Must have at least one section. */
const badConstructor01 = () => new Timetable(
  toTimetableID(1),
  toLineID(1),
  new LocalDate(2022, 10, 28),
  "main",
  null,
  null,
  []
);

/** Cannot have overlapping section indices. */
const badConstructor02 = () => new Timetable(
  toTimetableID(1),
  toLineID(1),
  new LocalDate(2022, 10, 28),
  "main",
  null,
  null,
  [
    new TimetableSection(
      toDirectionID("up"),
      WeekdayRange.parse("M______"),
      toTimetableEntryIndex(0),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ]),
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 25)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 28))
        ])
      ]
    ),
    new TimetableSection(
      toDirectionID("down"),
      WeekdayRange.parse("M______"),
      toTimetableEntryIndex(1),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ])
      ]
    )
  ]
);

/** Cannot have gaps between section indices. */
const badConstructor03 = () => new Timetable(
  toTimetableID(1),
  toLineID(1),
  new LocalDate(2022, 10, 28),
  "main",
  null,
  null,
  [
    new TimetableSection(
      toDirectionID("up"),
      WeekdayRange.parse("M______"),
      toTimetableEntryIndex(0),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ]),
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 25)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 28))
        ])
      ]
    ),
    new TimetableSection(
      toDirectionID("down"),
      WeekdayRange.parse("M______"),
      toTimetableEntryIndex(3),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ])
      ]
    )
  ]
);

/** Cannot have unsorted section indices. */
const badConstructor04 = () => new Timetable(
  toTimetableID(1),
  toLineID(1),
  new LocalDate(2022, 10, 28),
  "main",
  null,
  null,
  [
    new TimetableSection(
      toDirectionID("up"),
      WeekdayRange.parse("M______"),
      toTimetableEntryIndex(1),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ]),
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 25)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 28))
        ])
      ]
    ),
    new TimetableSection(
      toDirectionID("down"),
      WeekdayRange.parse("M______"),
      toTimetableEntryIndex(0),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ])
      ]
    )
  ]
);

/** Cannot have overlapping section indices from repeats due to weekday range. */
const badConstructor05 = () => new Timetable(
  toTimetableID(1),
  toLineID(1),
  new LocalDate(2022, 10, 28),
  "main",
  null,
  null,
  [
    new TimetableSection(
      toDirectionID("up"),
      WeekdayRange.parse("MTWT___"),
      toTimetableEntryIndex(0),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ]),
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 25)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 28))
        ])
      ]
    ),
    new TimetableSection(
      toDirectionID("down"),
      WeekdayRange.parse("M______"),
      toTimetableEntryIndex(2),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ])
      ]
    )
  ]
);

/** Cannot have begin time after end time. */
const badConstructor06 = () => new Timetable(
  toTimetableID(1),
  toLineID(1),
  new LocalDate(2022, 10, 28),
  "main",
  new LocalDate(2022, 11, 7),
  new LocalDate(2022, 10, 20),
  [
    new TimetableSection(
      toDirectionID("up"),
      WeekdayRange.parse("M______"),
      toTimetableEntryIndex(0),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ])
      ]
    )
  ]
);

const entry01 = new TimetableEntry(
  toTimetableID(1),
  toLineID(1),
  toTimetableEntryIndex(1),
  toDirectionID("up"),
  DayOfWeek.mon,
  [
    new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 25)),
    new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 28))
  ]
);

const entry02 = new TimetableEntry(
  toTimetableID(1),
  toLineID(1),
  toTimetableEntryIndex(3),
  toDirectionID("up"),
  DayOfWeek.tue,
  [
    new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 25)),
    new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 28))
  ]
);

const entry03 = new TimetableEntry(
  toTimetableID(1),
  toLineID(1),
  toTimetableEntryIndex(8),
  toDirectionID("up"),
  DayOfWeek.fri,
  [
    new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
    new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
  ]
);

const entry04 = new TimetableEntry(
  toTimetableID(1),
  toLineID(1),
  toTimetableEntryIndex(10),
  toDirectionID("up"),
  DayOfWeek.sun,
  [
    new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
    new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
  ]
);

export const passingConstructors = [
  constructor01,
  constructor02,
  constructor03,
  constructor04
];

export const failingConstructors = [
  badConstructor01,
  badConstructor02,
  badConstructor03,
  badConstructor04,
  badConstructor05,
  badConstructor06
];

export const entries = [
  { entry: entry01, timetable: constructor03() },
  { entry: entry02, timetable: constructor03() },
  { entry: entry03, timetable: constructor03() },
  { entry: entry04, timetable: constructor03() }
];

export const entryBounds = [
  { timetable: constructor01(), numOfEntries: 1 },
  { timetable: constructor02(), numOfEntries: 3 },
  { timetable: constructor03(), numOfEntries: 11 }
];
