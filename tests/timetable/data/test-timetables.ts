import {
  LocalDate, LocalTime, Timetable, TimetableEntryStop,
  TimetableEntryWithinSection, TimetableSection, toDirectionID, toLineID,
  toStopID, toTimetableEntryIndex, toTimetableID, WeekdayRange
} from "../../../ts/_export";

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
      WeekdayRange.parse("MTWT___"),
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

export const passingConstructors = [
  constructor01,
  constructor02
];

export const failingConstructors = [
  badConstructor01,
  badConstructor02,
  badConstructor03,
  badConstructor04,
  badConstructor05
];
