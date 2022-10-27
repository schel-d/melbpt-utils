import { BadIDError } from "../utils/error";

/**
 * Regex to detect correctly formatted kebab-case string.
 */
export const kebabCaseRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Represents a specific order of stops when used for a specific line. Each line
 * may run in multiple directions, e.g. towards the city, from the city, via the
 * city loop, on a particular branch, etc.
 */
export type DirectionID = string & { [DirectionIDBrand]: true }

/** Prevents regular string being implicitly cast as Direction IDs. */
declare const DirectionIDBrand: unique symbol;

/**
 * Returns true for kebab-case ASCII strings.
 * @param id The string to check.
 */
export function isDirectionID(id: string): id is DirectionID {
  return kebabCaseRegex.test(id);
}

/**
 * Converts a string to a {@link DirectionID}.
 * @param val The string.
 */
export function toDirectionID(val: string): DirectionID {
  if (isDirectionID(val)) { return val; }
  throw BadIDError.badDirectionID(val);
}
