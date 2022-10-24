/**
 * Represents a unique integer identifier for a timetable. This value needs to
 * be encodable to a 2-digit base-36 integer, so must be 0-1295 inclusive.
 * The convention is to have the first base-36 digit match the line ID if it
 * were to be encoded to base-36.
 */
export type TimetableID = number & { [TimetableIDBrand]: true };

/** Prevents regular numbers being implicitly cast as Timetable IDs. */
declare const TimetableIDBrand: unique symbol;

/**
 * The maximum allowed timetable ID is 1295 since it needs to fit in two base-36
 * digits for service ID usage.
 */
export const MaxTimetableID = 36 * 36 - 1;

/**
 * Returns true for any integer between 0 and 1295 inclusive.
 * @param id The number to check.
 */
export function isTimetableID(id: number): id is TimetableID {
  return Number.isInteger(id) && id >= 0 && id <= MaxTimetableID;
}
