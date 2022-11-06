import {
  LocalTime, MaxTimetableEntryIndex, TimetableEntryStop,
  TimetableEntryWithinSection, TimetableSection, toDirectionID, toStopID,
  toTimetableEntryIndex, WeekdayRange
} from "../../../src/_export";

/** Test regular constructor. */
const constructor01 = () => new TimetableSection(
  toDirectionID("up"),
  WeekdayRange.parse("MTWT___"),
  toTimetableEntryIndex(0),
  [
    new TimetableEntryWithinSection([
      new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
      new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
    ])
  ]
);

/** Can reach timetable entry index (as long as it doesn't overflow). */
const constructor02 = () => new TimetableSection(
  toDirectionID("up"),
  WeekdayRange.parse("_T_____"),
  toTimetableEntryIndex(MaxTimetableEntryIndex),
  [
    new TimetableEntryWithinSection([
      new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
      new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
    ])
  ]
);

/** Must have at least one entry. */
const badConstructor01 = () => new TimetableSection(
  toDirectionID("up"),
  WeekdayRange.parse("MTWT___"),
  toTimetableEntryIndex(0),
  [
  ]
);

/** Can't overflow the maximum allowed timetable entry index. */
const badConstructor02 = () => new TimetableSection(
  toDirectionID("up"),
  WeekdayRange.parse("_T_____"),
  toTimetableEntryIndex(MaxTimetableEntryIndex),
  [
    new TimetableEntryWithinSection([
      new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
      new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
    ]),
    new TimetableEntryWithinSection([
      new TimetableEntryStop(toStopID(1), LocalTime.fromTime(2, 20)),
      new TimetableEntryStop(toStopID(2), LocalTime.fromTime(2, 23))
    ])
  ]
);

/** Can't overflow maximum timetable entry index by weekday range duplication. */
const badConstructor03 = () => new TimetableSection(
  toDirectionID("up"),
  WeekdayRange.parse("_TW____"),
  toTimetableEntryIndex(MaxTimetableEntryIndex),
  [
    new TimetableEntryWithinSection([
      new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
      new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
    ])
  ]
);

export const passingConstructors = [
  constructor01,
  constructor02
];

export const failingConstructors = [
  badConstructor01,
  badConstructor02,
  badConstructor03
];
