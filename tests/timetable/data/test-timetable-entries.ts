import { LocalTime, TimetableEntryStop, TimetableEntryWithinSection, toStopID }
  from "../../../src/_export";

/** Test regular constructor. */
const constructor01 = () => new TimetableEntryWithinSection([
  new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
  new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
]);

/** Test prior time being fine if second one is next day. */
const constructor02 = () => new TimetableEntryWithinSection([
  new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 23)),
  new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 20, true))
]);

/** Can't have fewer than 2 stops. */
const badConstructor01 = () => new TimetableEntryWithinSection([
  new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 23))
]);

/** Can't time travel. */
const badConstructor02 = () => new TimetableEntryWithinSection([
  new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 23)),
  new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 20))
]);

/** Can't time travel across days. */
const badConstructor03 = () => new TimetableEntryWithinSection([
  new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20, true)),
  new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
]);

export const passingConstructors = [
  constructor01,
  constructor02
];

export const failingConstructors = [
  badConstructor01,
  badConstructor02,
  badConstructor03
];
