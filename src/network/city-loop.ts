import { BadEnumError } from "../utils/error";
import { StopID, toStopID } from "./stop-id";

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

/** The name of Flinders Street station. */
export const flindersStreetName = "Flinders Street";

/** The stop id of Flinders Street station. */
const flindersStreet: StopID = toStopID(104);

/** The stop id of Southern Cross station. */
const southernCross: StopID = toStopID(253);

/** The stop id of Flagstaff station. */
const flagstaff: StopID = toStopID(101);

/** The stop id of Melbourne Central station. */
const melbourneCentral: StopID = toStopID(171);

/** The stop id of Parliament station. */
const parliament: StopID = toStopID(216);

/**
 * Returns the stops from the given city loop portal to Flinders Street Station,
 * directly (without going via the city loop). The list returned will NOT
 * include the portal station itself.
 * @param portal The city loop portal.
 */
export function stopsToFlindersDirect(portal: CityLoopPortal): StopID[] {
  return {
    "richmond": [flindersStreet],
    "jolimont": [flindersStreet],
    "north-melbourne": [southernCross, flindersStreet]
  }[portal];
}

/**
 * Returns the stops from the given city loop portal to Flinders Street Station,
 * going via the city loop. The list returned will NOT include the portal
 * station itself.
 * @param portal The city loop portal.
 */
export function stopsToFlindersViaLoop(portal: CityLoopPortal): StopID[] {
  return {
    "richmond": [
      parliament, melbourneCentral, flagstaff, southernCross, flindersStreet
    ],
    "jolimont": [
      parliament, melbourneCentral, flagstaff, southernCross, flindersStreet
    ],
    "north-melbourne": [flagstaff, melbourneCentral, parliament, flindersStreet]
  }[portal];
}

/**
 * Returns the stops from the given city loop portal around the loop via
 * Flinders Street Station, and back to the same city loop portal. The list
 * returned will NOT include the portal station itself.
 * @param portal The city loop portal.
 */
export function stopsToPortal(portal: CityLoopPortal, clockwise: boolean): StopID[] {
  const stops = {
    "richmond": [
      flindersStreet, southernCross, flagstaff, melbourneCentral, parliament
    ],
    "jolimont": [
      flindersStreet, southernCross, flagstaff, melbourneCentral, parliament
    ],
    "north-melbourne": [
      flagstaff, melbourneCentral, parliament, flindersStreet, southernCross
    ]
  }[portal];

  return clockwise ? stops : stops.reverse();
}
