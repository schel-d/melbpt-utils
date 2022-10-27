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
 * @param id The number to check.
 */
export function isStopID(id: number): id is StopID {
  return Number.isInteger(id) && id >= MinStopID && id <= MaxStopID;
}

/**
 * Converts a number to a {@link StopID}. Throws {@link BadIDError} if invalid.
 * @param val The number.
 */
export function toStopID(val: number): StopID {
  if (isStopID(val)) { return val; }
  throw BadIDError.badStopID(val);
}
