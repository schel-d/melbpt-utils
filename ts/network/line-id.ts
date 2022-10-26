import { BadIDError } from "./error";

/**
 * Represents a unique integer identifier for a line. Can be any number that
 * hasn't already been used (has no ties to the PTV API).
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
 * @param id The number to check.
 */
export function isLineID(id: number): id is LineID {
  return Number.isInteger(id) && id >= MinLineID && id <= MaxLineID;
}

/**
 * Converts a number to a {@link LineID}.
 * @param val The number.
 */
export function toLineID(val: number): LineID {
  if (isLineID(val)) { return val; }
  throw BadIDError.badLineID(val);
}
