import { DirectionID } from "./direction-id";
import { LineID } from "./line-id";
import { StopID } from "./stop-id";

/**
 * The error object used when an attempt is made to use a bad string/number as
 * a {@link DirectionID}, {@link LineID}, {@link PlatformID}, {@link StopID}, or
 * {@link TimetableID}.
 */
export class BadIDError extends Error {
  /**
   * Creates a {@link BadIDError}.
   * @param message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "BadIDError";
  }

  /**
   * Bad direction ID "`val`".
   */
  static badDirectionID(val: string): BadIDError {
    return new BadIDError(
      `Bad direction ID "${val}"`
    );
  }

  /**
   * Bad line ID "`val`".
   */
  static badLineID(val: number): BadIDError {
    return new BadIDError(
      `Bad line ID "${val}"`
    );
  }

  /**
   * Bad platform ID "`val`".
   */
  static badPlatformID(val: string): BadIDError {
    return new BadIDError(
      `Bad platform ID "${val}"`
    );
  }

  /**
   * Bad stop ID "`val`".
   */
  static badStopID(val: number): BadIDError {
    return new BadIDError(
      `Bad stop ID "${val}"`
    );
  }

  /**
   * Bad timetable ID "`val`".
   */
  static badTimetableID(val: number): BadIDError {
    return new BadIDError(
      `Bad timetable ID "${val}"`
    );
  }
}

/**
 * The error object used when an attempt is made to use an invalid string as
 * a {@link LineRouteType}, {@link LineColor}, {@link LineService}, or
 * {@link CityLoopPortal}.
 */
export class BadEnumError extends Error {
  /**
   * Creates a {@link BadEnumError}.
   * @param message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "BadEnumError";
  }

  /**
   * Bad line route type "`val`".
   */
  static badLineRouteType(val: string): BadEnumError {
    return new BadEnumError(
      `Bad line route type "${val}"`
    );
  }

  /**
   * Bad line color "`val`".
   */
  static badLineColor(val: string): BadEnumError {
    return new BadEnumError(
      `Bad line color "${val}"`
    );
  }

  /**
   * Bad line service "`val`".
   */
  static badLineService(val: string): BadEnumError {
    return new BadEnumError(
      `Bad line service "${val}"`
    );
  }

  /**
   * Bad city loop portal "`val`".
   */
  static badCityLoopPortal(val: string): BadEnumError {
    return new BadEnumError(
      `Bad city loop portal "${val}"`
    );
  }
}

/**
 * The error object used when an attempt is made to create an invalid
 * {@link Network}, {@link Line}, {@link Stop}, {@link Direction}, or
 * {@link Platform} object.
 */
export class TransitDataError extends Error {
  /**
   * Creates a {@link TransitDataError}.
   * @param message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "TransitDataError";
  }

  /**
   * Direction with ID "`id`" has less than 2 stops.
   */
  static notEnoughStops(id: DirectionID): TransitDataError {
    return new TransitDataError(
      `Direction with ID "${id}" has less than 2 stops`
    );
  }

  /**
   * Stop with ID "`id`" has no platforms.
   */
  static noPlatforms(id: StopID): TransitDataError {
    return new TransitDataError(
      `Stop with ID "${id}" has no platforms`
    );
  }

  /**
   * Line with ID "`id`" has no directions.
   */
  static noDirections(id: LineID): TransitDataError {
    return new TransitDataError(
      `Line with ID "${id}" has no directions`
    );
  }

  /**
   * Duplicate platform IDs in use for stop with ID "`id`".
   */
  static duplicatePlatforms(id: StopID): TransitDataError {
    return new TransitDataError(
      `Duplicate platform IDs in use for stop with ID "${id}"`
    );
  }

  /**
   * Duplicate direction IDs in use for line with ID "`id`".
   */
  static duplicateDirections(id: LineID): TransitDataError {
    return new TransitDataError(
      `Duplicate direction IDs in use for line with ID "${id}"`
    );
  }

  /**
   * Duplicate stop IDs in use.
   */
  static duplicateStops(): TransitDataError {
    return new TransitDataError(
      `Duplicate stop IDs in use`
    );
  }

  /**
   * Duplicate line IDs in use.
   */
  static duplicateLines(): TransitDataError {
    return new TransitDataError(
      `Duplicate line IDs in use`
    );
  }

  /**
   * Some lines refer to stops which don't exist.
   */
  static linesHaveGhostStops(): TransitDataError {
    return new TransitDataError(
      `Some lines refer to stops which don't exist`
    );
  }

  /**
   * Line with ID "`id`" is a city loop line, but does not specify a city loop
   * portal.
   */
  static cityLoopLineMissingPortal(id: LineID): TransitDataError {
    return new TransitDataError(
      `Line with ID "${id}" is a city loop line, but does not specify a city ` +
      `loop portal.`
    );
  }
}
