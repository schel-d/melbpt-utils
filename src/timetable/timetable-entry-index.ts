import { BadIDError } from "../utils/error";

/**
 * Represents a unique integer identifier for an entry on a particular day of
 * the week in a timetable. Only needs to be unique for this timetable. It also
 * needs to be encodable to a 3-digit base-36 integer, so must be 0-46,655
 * inclusive.
 */
export type TimetableEntryIndex = number & { [TimetableEntryIndexBrand]: true };

/** Prevents regular numbers being implicitly cast as timetable entry indices. */
declare const TimetableEntryIndexBrand: unique symbol;

/**
 * The maximum allowed timetable entry index is 46,655 since it needs to fit in
 * three base-36 digits for service ID usage.
 */
export const MaxTimetableEntryIndex = 36 * 36 * 36 - 1;

/**
 * The maximum allowed timetable entry index is 0, since it represents an index
 * within an array.
 */
export const MinTimetableEntryIndex = 0;

/**
 * Returns true for any integer between 0 and 46,655 inclusive.
 * @param id The number to check.
 */
export function isTimetableEntryIndex(id: number): id is TimetableEntryIndex {
  return Number.isInteger(id)
    && id >= MinTimetableEntryIndex
    && id <= MaxTimetableEntryIndex;
}

/**
 * Converts a number to a {@link TimetableEntryIndex}. Throws {@link BadIDError} if
 * invalid.
 * @param val The number.
 */
export function toTimetableEntryIndex(val: number): TimetableEntryIndex {
  if (isTimetableEntryIndex(val)) { return val; }
  throw BadIDError.badServiceIndex(val);
}
