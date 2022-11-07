import { DirectionID } from "../network/direction-id";
import { LineID } from "../network/line-id";
import { PlatformID } from "../network/platform-id";
import { StopID } from "../network/stop-id";
import { TimetableEntryIndex } from "../timetable/timetable-entry-index";
import { TimetableID } from "../timetable/timetable-id";

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
  static badLineID(val: number | string): BadIDError {
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
  static badStopID(val: number | string): BadIDError {
    return new BadIDError(
      `Bad stop ID "${val}"`
    );
  }

  /**
   * Bad timetable ID "`val`".
   */
  static badTimetableID(val: number | string): BadIDError {
    return new BadIDError(
      `Bad timetable ID "${val}"`
    );
  }

  /**
   * Bad service index "`val`".
   */
  static badServiceIndex(val: number): BadIDError {
    return new BadIDError(
      `Bad service index "${val}"`
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

  /**
   * Bad timetable type "`val`".
   */
  static badTimetableType(val: string): BadEnumError {
    return new BadEnumError(
      `Bad timetable type "${val}"`
    );
  }
}

/**
 * The error object used when a {@link Stop}, {@link Line}, {@link Direction},
 * or {@link Platform}, is looked up in the {@link TransitNetwork}, or a
 * {@link TimetableEntry} is looked up in a {@link Timetable}, but is not
 * found.
 */
export class LookupError extends Error {
  /**
   * Creates a {@link LookupError}.
   * @param message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "LookupError";
  }

  /**
   * Line with ID "`id`" doesn't exist.
   */
  static lineNotFound(id: LineID): LookupError {
    return new LookupError(
      `Line with ID "${id}" doesn't exist`
    );
  }

  /**
   * Stop with ID "`id`" doesn't exist.
   */
  static stopNotFound(id: StopID): LookupError {
    return new LookupError(
      `Stop with ID "${id}" doesn't exist`
    );
  }

  /**
   * Direction with ID "`id`" doesn't exist.
   */
  static directionNotFound(id: DirectionID): LookupError {
    return new LookupError(
      `Direction with ID "${id}" doesn't exist`
    );
  }

  /**
   * Platform with ID "`id`" doesn't exist.
   */
  static platformNotFound(id: PlatformID): LookupError {
    return new LookupError(
      `Platform with ID "${id}" doesn't exist`
    );
  }

  /**
   * Timetable entry with index "`index`" doesn't exist.
   */
  static timetableEntryNotFound(index: TimetableEntryIndex): LookupError {
    return new LookupError(
      `Timetable entry with index "${index}" doesn't exist`
    );
  }

  /**
   * Timetable entry in timetable "`timetableID`" with index "`index`" doesn't
   * exist.
   */
  static timetableEntryNotFoundInSuite(timetableID: TimetableID,
    index: TimetableEntryIndex): LookupError {
    return new LookupError(
      `Timetable entry in timetable "${timetableID}" with index "${index}" ` +
      `doesn't exist`
    );
  }
}
