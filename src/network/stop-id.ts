import { parseIntNull } from "schel-d-utils";
import { BadIDError } from "../utils/error";

/**
 * Represents a unique integer identifier for a stop. Must be 1-9999 inclusive.
 * Has no ties to the PTV API in any way.
 */
export type StopID = number & { [StopIDBrand]: true }

/** Prevents regular numbers being implicitly cast as Line IDs. */
declare const StopIDBrand: unique symbol;

/**
 * The maximum allowed line ID is 9999 since it needs to fit in a 4 digit
 * decimal string in .ttbl files.
 */
export const MaxStopID = 9999;

/**
 * The minimum allowed stop ID is 1, since it is the first positive integer.
 */
export const MinStopID = 1;

/**
 * Returns true for any integer between 1 and 9999 inclusive.
 * @param id The number/string to check.
 */
export function isStopID(id: number | string): id is StopID {
  const num = typeof (id) == "number" ? id : parseIntNull(id);
  return num != null
    && Number.isInteger(num)
    && num >= MinStopID
    && num <= MaxStopID;
}

/**
 * Converts a number/string to a {@link StopID}. Throws {@link BadIDError} if
 * invalid.
 * @param val The number/string.
 */
export function toStopID(val: number | string): StopID {
  const num = typeof (val) == "number" ? val : parseIntNull(val);
  if (num != null && isStopID(num)) { return num; }
  throw BadIDError.badStopID(val);
}
