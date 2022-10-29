import {
  LocalDate, LocalTime, Timetable, TimetableEntryStop,
  TimetableEntryWithinSection, TimetableSection, toDirectionID, toLineID,
  toStopID, toTimetableEntryIndex, toTimetableID, WeekdayRange
} from "../../../ts/_export";

/** Legal timetable. */
const obj01 = new Timetable(
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
        ])
      ]
    )
  ]
);

/** Stops out of order. */
const badObj01 = new Timetable(
  toTimetableID(1),
  toLineID(1),
  new LocalDate(2022, 10, 28),
  "main",
  null,
  null,
  [
    new TimetableSection(
      toDirectionID("down"),
      WeekdayRange.parse("MTWT___"),
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

/** Stops out of order. */
const badObj02 = new Timetable(
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
          new TimetableEntryStop(toStopID(3), LocalTime.fromTime(1, 23)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 26))
        ])
      ]
    )
  ]
);

/** Bad direction ID */
const badObj03 = new Timetable(
  toTimetableID(1),
  toLineID(1),
  new LocalDate(2022, 10, 28),
  "main",
  null,
  null,
  [
    new TimetableSection(
      toDirectionID("sideways"),
      WeekdayRange.parse("MTWT___"),
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

/** Bad stop ID */
const badObj04 = new Timetable(
  toTimetableID(1),
  toLineID(2),
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
        ])
      ]
    )
  ]
);

/** Bad line ID */
const badObj05 = new Timetable(
  toTimetableID(1),
  toLineID(3),
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
        ])
      ]
    )
  ]
);

export const passing = [
  obj01
];

export const failing = [
  badObj01,
  badObj02,
  badObj03,
  badObj04,
  badObj05
];
