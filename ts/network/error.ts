import { DirectionID } from "./direction-id";
import { CityLoopPortal, LineRouteType } from "./line-enums";
import { LineID } from "./line-id";
import { StopID } from "./stop-id";

/**
 * The error object used when an attempt is made to create an invalid
 * {@link Network}, {@link Line}, {@link Stop}, {@link Direction}, or
 * {@link Platform} object.
 */
export class TransitNetworkError extends Error {
  /**
   * Creates a {@link TransitNetworkError}.
   * @param message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "TransitDataError";
  }

  /**
   * Direction with ID "`id`" has less than 2 stops.
   */
  static notEnoughStops(id: DirectionID): TransitNetworkError {
    return new TransitNetworkError(
      `Direction with ID "${id}" has less than 2 stops`
    );
  }

  /**
   * Stop with ID "`id`" has no platforms.
   */
  static noPlatforms(id: StopID): TransitNetworkError {
    return new TransitNetworkError(
      `Stop with ID "${id}" has no platforms`
    );
  }

  /**
   * Line with ID "`id`" has no directions.
   */
  static noDirections(id: LineID): TransitNetworkError {
    return new TransitNetworkError(
      `Line with ID "${id}" has no directions`
    );
  }

  /**
   * Duplicate platform IDs in use for stop with ID "`id`".
   */
  static duplicatePlatforms(id: StopID): TransitNetworkError {
    return new TransitNetworkError(
      `Duplicate platform IDs in use for stop with ID "${id}"`
    );
  }

  /**
   * Duplicate direction IDs in use for line with ID "`id`".
   */
  static duplicateDirections(id: LineID): TransitNetworkError {
    return new TransitNetworkError(
      `Duplicate direction IDs in use for line with ID "${id}"`
    );
  }

  /**
   * Duplicate stop IDs in use.
   */
  static duplicateStops(): TransitNetworkError {
    return new TransitNetworkError(
      `Duplicate stop IDs in use`
    );
  }

  /**
   * Duplicate line IDs in use.
   */
  static duplicateLines(): TransitNetworkError {
    return new TransitNetworkError(
      `Duplicate line IDs in use`
    );
  }

  /**
   * Some lines refer to stops which don't exist.
   */
  static linesHaveGhostStops(): TransitNetworkError {
    return new TransitNetworkError(
      `Some lines refer to stops which don't exist`
    );
  }

  /**
   * Line with route type "`type`" should not have city loop portal value of
   * "`portal`".
   */
  static lineLoopPortalInvalid(type: LineRouteType,
    portal: CityLoopPortal | null): TransitNetworkError {

    return new TransitNetworkError(
      `Line with route type "${type}" should not have city loop portal ` +
      `value of "${(portal ?? "null")}".`
    );
  }

  /**
   * Direction "`id`" has the same stops multiple times.
   */
  static duplicateStopsInDirection(id: DirectionID): TransitNetworkError {
    return new TransitNetworkError(
      `Direction "${id}" has the same stops multiple times.`
    );
  }
}
