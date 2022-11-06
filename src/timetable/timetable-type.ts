import { BadEnumError } from "../utils/error";

/**
 * Represents the which timetables this timetable could override, e.g. a
 * temporary timetable will override the main timetable during its begin and end
 * dates.
 */
export type TimetableType = typeof TimetableTypes[number];

/**
 * An array of all the possible types a timetable can be.
 */
export const TimetableTypes = ["main", "temporary", "public-holiday"] as const;

/**
 * Returns true for any valid {@link TimetableType}.
 * @param val The string to check.
 */
export function isTimetableType(val: string): val is TimetableType {
  return (TimetableTypes as readonly string[]).includes(val);
}

/**
 * Returns the string as a {@link TimetableType}, or throws a
 * {@link BadEnumError} is it is invalid.
 * @param val The string to check.
 */
export function toTimetableType(val: string): TimetableType {
  if (isTimetableType(val)) { return val; }
  throw BadEnumError.badTimetableType(val);
}
