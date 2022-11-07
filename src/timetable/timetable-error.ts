import { DirectionID } from "../network/direction-id";
import { LineID } from "../network/line-id";
import { TimetableType } from "./timetable-type";

/**
 * The error object used when an attempt is made to create an invalid
 * {@link Timetable}, {@link Service}, or {@link TimetableEntry}.
 */
export class TimetableError extends Error {
  /**
   * Creates a {@link TimetableError}.
   * @param message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "TransitDataError";
  }

  /**
   * Timetable section cannot be empty (have no entries).
   */
  static emptySection(): TimetableError {
    return new TimetableError(
      `Timetable section cannot be empty (have no entries)`
    );
  }

  /**
   * Timetable sections have overlap or gaps between section indices, or are not
   * sorted in smallest to largest order.`
   */
  static badSectionIDPartitioning(): TimetableError {
    return new TimetableError(
      `Timetable sections have overlap or gaps between section indices, or ` +
      `are not sorted in smallest to largest order`
    );
  }

  /**
   * Timetable cannot be empty (have no sections).
   */
  static emptyTimetable(): TimetableError {
    return new TimetableError(
      `Timetable cannot be empty (have no sections)`
    );
  }

  /**
   * Timetable exceeds maximum number of services for a timetable.
   */
  static tooManyServices(): TimetableError {
    return new TimetableError(
      `Timetable exceeds maximum number of services for a timetable`
    );
  }

  /**
   * Timetable section has entries that make less than 2 stops.
   */
  static entriesNotEnoughStops(): TimetableError {
    return new TimetableError(
      `Timetable section has entries that make less than 2 stops`
    );
  }

  /**
   * Timetable section has entries that require time travel.
   */
  static entriesTimeTravel(): TimetableError {
    return new TimetableError(
      `Timetable section has entries that require time travel`
    );
  }

  /**
   * Cannot create timetable because line "`id`" doesn't exist.
   */
  static lineDoesntExist(id: LineID): TimetableError {
    return new TimetableError(
      `Cannot create timetable because line "${id}" doesn't exist`
    );
  }

  /**
   * Cannot create timetable because direction "`id`" doesn't exist on line
   * "`line`".
   */
  static directionDoesntExist(id: DirectionID, line: LineID): TimetableError {
    return new TimetableError(
      `Cannot create timetable because direction "${id}" doesn't exist on ` +
      `line "${line}"`
    );
  }

  /**
   * Some stops in direction "`id`" on line "`line`" are out of order on the
   * timetable.
   */
  static directionIncorrectStops(id: DirectionID, line: LineID): TimetableError {
    return new TimetableError(
      `Cannot create timetable because direction "${id}" doesn't exist on ` +
      `line "${line}"`
    );
  }

  /**
   * Begins date occurs after ends date.
   */
  static metadataBeginsAfterEnds(): TimetableError {
    return new TimetableError(
      `Begins date occurs after ends date`
    );
  }

  /**
   * Not all timetable IDs are unique.
   */
  static duplicateTimetables(): TimetableError {
    return new TimetableError(
      `Not all timetable IDs are unique`
    );
  }

  /**
   * Multiple overlapping timetables for line "`line`" and type "`type`".
   */
  static overlappingTimetables(line: LineID, type: TimetableType): TimetableError {
    return new TimetableError(
      `Multiple overlapping timetables for line "${line}" and type "${type}"`
    );
  }
}
