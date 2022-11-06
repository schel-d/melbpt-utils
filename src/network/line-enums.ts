import { BadEnumError } from "../utils/error";

/**
 * Represents the behaviour of this line, mostly around the directions that it
 * can travel in.
 */
export type LineRouteType = typeof LineRouteTypes[number];

/**
 * An array of all the possible route types a line can be.
 */
export const LineRouteTypes = ["linear", "city-loop", "branch"] as const;

/**
 * Returns true for any valid {@link LineRouteType}.
 * @param val The string to check.
 */
export function isLineRouteType(val: string): val is LineRouteType {
  return (LineRouteTypes as readonly string[]).includes(val);
}

/**
 * Returns the string as a {@link LineRouteType}, or throws a
 * {@link BadEnumError} is it is invalid.
 * @param val The string to check.
 */
export function toLineRouteType(val: string): LineRouteType {
  if (isLineRouteType(val)) { return val; }
  throw BadEnumError.badLineRouteType(val);
}

/**
 * Represents a color that a line can use.
 */
export type LineColor = typeof LineColors[number];

/**
 * An array of all the possible colors that a line can be.
 */
export const LineColors = [
  "red", "yellow", "green", "cyan", "blue", "purple", "pink", "grey"
] as const;

/**
 * Returns true for any valid {@link LineColor}.
 * @param val The string to check.
 */
export function isLineColor(val: string): val is LineColor {
  return (LineColors as readonly string[]).includes(val);
}

/**
 * Returns the string as a {@link LineColor}, or throws a {@link BadEnumError}
 * is it is invalid.
 * @param val The string to check.
 */
export function toLineColor(val: string): LineColor {
  if (isLineColor(val)) { return val; }
  throw BadEnumError.badLineColor(val);
}

/**
 * Represents the type of service that runs on this line.
 */
export type LineService = typeof LineServices[number];

/**
 * An array of all the possible types of service a line can be.
 */
export const LineServices = ["suburban", "regional"] as const;

/**
 * Returns true for any valid {@link LineService}.
 * @param val The string to check.
 */
export function isLineService(val: string): val is LineService {
  return (LineServices as readonly string[]).includes(val);
}

/**
 * Returns the string as a {@link LineService}, or throws a {@link BadEnumError}
 * is it is invalid.
 * @param val The string to check.
 */
export function toLineService(val: string): LineService {
  if (isLineService(val)) { return val; }
  throw BadEnumError.badLineService(val);
}

/**
 * Represents the type of service that runs on this line.
 */
export type CityLoopPortal = typeof CityLoopPortals[number];

/**
 * An array of all the possible types of service a line can be.
 */
export const CityLoopPortals = ["richmond", "north-melbourne", "jolimont"] as const;

/**
 * Returns true for any valid {@link CityLoopPortal}.
 * @param val The string to check.
 */
export function isCityLoopPortal(val: string): val is CityLoopPortal {
  return (CityLoopPortals as readonly string[]).includes(val);
}

/**
 * Returns the string as a {@link CityLoopPortal}, or throws a
 * {@link BadEnumError} is it is invalid.
 * @param val The string to check.
 */
export function toCityLoopPortal(val: string): CityLoopPortal {
  if (isCityLoopPortal(val)) { return val; }
  throw BadEnumError.badCityLoopPortal(val);
}
