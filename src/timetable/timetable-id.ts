import { parseIntNull } from "schel-d-utils";
import { BadIDError } from "../utils/error";

/**
 * Represents a unique integer identifier for a timetable. This value needs to
 * be encodable to a 2-digit base-36 integer, so must be 36-1295 inclusive.
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
 * The maximum allowed timetable ID is 1, since it is the first positive
 * integer. In practice the minimum should be 36, since the convention is to
 * have the first base-36 digit match the line ID if it were to be encoded to
 * base-36, and minimum line ID is 1.
 */
export const MinTimetableID = 1;

/**
 * Returns true for any integer between 36 and 1295 inclusive.
 * @param id The number/string to check.
 */
export function isTimetableID(id: number | string): id is TimetableID {
  const num = typeof (id) == "number" ? id : parseIntNull(id);
  return num != null
    && Number.isInteger(num)
    && num >= MinTimetableID
    && num <= MaxTimetableID;
}

/**
 * Converts a number/string to a {@link TimetableID}. Throws {@link BadIDError}
 * if invalid.
 * @param val The number/string.
 */
export function toTimetableID(val: number | string): TimetableID {
  const num = typeof (val) == "number" ? val : parseIntNull(val);
  if (num != null && isTimetableID(num)) { return num; }
  throw BadIDError.badTimetableID(val);
}

/**
 * Converts a base-36 string to a {@link TimetableID}. Throws {@link BadIDError}
 * if invalid.
 * @param val The base-36 string.
 */
export function base36ToTimetableID(val: string): TimetableID {
  return toTimetableID(parseInt(val, 36));
}

/**
 * Converts a {@link TimetableID} to a base-36 string.
 * @param id The timetable id.
 */
export function timetableIDToBase36(id: TimetableID): string {
  return id.toString(36).padStart(2, "0");
}
