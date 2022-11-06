import { parseIntNull } from "schel-d-utils";
import { BadIDError } from "../utils/error";

/**
 * Represents a unique integer identifier for a line. Must be 1-35 inclusive.
 * Has no ties to the PTV API in any way.
 */
export type LineID = number & { [LineIDBrand]: true }

/** Prevents regular numbers being implicitly cast as Line IDs. */
declare const LineIDBrand: unique symbol;

/**
 * The maximum allowed line ID is 35 since it needs to fit in one base-36 digit
 * for service ID usage.
 */
export const MaxLineID = 36 - 1;

/**
 * The minimum allowed line ID is 1, since it is the first positive integer.
 */
export const MinLineID = 1;

/**
 * Returns true for any integer between 1 and 35 inclusive.
 * @param id The number/string to check.
 */
export function isLineID(id: number | string): id is LineID {
  const num = typeof (id) == "number" ? id : parseIntNull(id);
  return num != null
    && Number.isInteger(num)
    && num >= MinLineID
    && num <= MaxLineID;
}

/**
 * Converts a number/string to a {@link LineID}. Throws {@link BadIDError} if
 * invalid.
 * @param val The number/string.
 */
export function toLineID(val: number | string): LineID {
  const num = typeof (val) == "number" ? val : parseIntNull(val);
  if (num != null && isLineID(num)) { return num; }
  throw BadIDError.badLineID(val);
}

/**
 * Converts a base-36 string to a {@link LineID}. Throws {@link BadIDError}
 * if invalid.
 * @param val The base-36 string.
 */
export function base36ToLineID(val: string): LineID {
  return toLineID(parseInt(val, 36));
}

/**
 * Converts a {@link LineID} to a base-36 string.
 * @param id The timetable id.
 */
export function lineIDToBase36(id: LineID): string {
  return id.toString(36);
}
