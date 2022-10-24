/**
 * Represents a unique integer identifier for a stop. Doesn't necessarily
 * match the PTV API, so it cannot be expected to be used for that purpose.
 */
export type StopID = number

/**
 * Represents a unique integet identifier for a platform. Only needs to be
 * unique for this stop. Usually matches the station signage naming, e.g. "1" or
 * "15a".
 */
export type PlatformID = string

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
 * Returns true for any integer between 0 and 35 inclusive.
 * @param id The number to check.
 */
export function isLineID(id: number): id is LineID {
  return Number.isInteger(id) && id >= 0 && id <= MaxLineID;
}

/**
 * Represents a specific order of stops when used for a specific line. Each line
 * may run in multiple directions, e.g. towards the city, from the city, via the
 * city loop, on a particular branch, etc.
 */
export type DirectionID = string
