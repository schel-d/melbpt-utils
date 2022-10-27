import { BadIDError } from "../utils/error";
import { kebabCaseRegex } from "./direction-id";

/**
 * Represents a unique integet identifier for a platform. Only needs to be
 * unique for this stop. Usually matches the station signage naming, e.g. "1" or
 * "15a".
 */
export type PlatformID = string & { [PlatformIDBrand]: true }

/** Prevents regular string being implicitly cast as Direction IDs. */
declare const PlatformIDBrand: unique symbol;

/**
 * Returns true for kebab-case ASCII stringa.
 * @param id The string to check.
 */
export function isPlatformID(id: string): id is PlatformID {
  return kebabCaseRegex.test(id);
}

/**
 * Converts a string to a {@link PlatformID}. Throws {@link BadIDError} if
 * invalid.
 * @param val The string.
 */
export function toPlatformID(val: string): PlatformID {
  if (isPlatformID(val)) { return val; }
  throw BadIDError.badPlatformID(val);
}
