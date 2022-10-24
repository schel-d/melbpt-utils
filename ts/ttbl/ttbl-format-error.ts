import { MaxLineID, StopID } from "../network/id";
import { MaxTimetableID } from "../timetable/id";

/**
 * The error object used when errors occur reading/creating a timetable file.
 */
export class TtblFormatError extends Error {
  /**
   * Creates a {@link TtblFormatError}.
   * @param message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "TtblFormatError";
  }

  /**
   * Section cannot have title "`sectionTitle`" (do not include brackets).
   */
  static badTitle(sectionTitle: string): TtblFormatError {
    return new TtblFormatError(
      `Section cannot have title "${sectionTitle}" (do not include brackets)`
    );
  }

  /**
   * Section [`sectionTitle`] is empty.
   */
  static sectionEmpty(sectionTitle: string): TtblFormatError {
    return new TtblFormatError(
      `Section [${sectionTitle}] is empty`
    );
  }

  /**
   * Invalid metadata syntax in [`sectionTitle`] on line with "`text`".
   */
  static metadataBadSyntax(sectionTitle: string, text: string): TtblFormatError {
    return new TtblFormatError(
      `Invalid metadata syntax in [${sectionTitle}] on line with "${text}"`
    );
  }

  /**
   * Duplicate key in [`section.title`] metadata "`key`".
   */
  static metadataDuplicateKey(sectionTitle: string, key: string): TtblFormatError {
    return new TtblFormatError(
      `Duplicate key in [${sectionTitle}] metadata "${key}""`
    );
  }

  /**
   * Invalid grid syntax in [`sectionTitle`] on line with "`text`".
   */
  static gridBadSyntax(sectionTitle: string, text: string): TtblFormatError {
    return new TtblFormatError(
      `Invalid grid syntax in [${sectionTitle}] on line with "${text}"`
    );
  }

  /**
   * Duplicate stop in [`section.title`] grid "`stop`".
   */
  static gridDuplicateStop(sectionTitle: string, stop: StopID): TtblFormatError {
    return new TtblFormatError(
      `Duplicate stop in [${sectionTitle}] grid "${stop}""`
    );
  }

  /**
   * Grid is jagged in [`sectionTitle`].
   */
  static gridJagged(sectionTitle: string): TtblFormatError {
    return new TtblFormatError(
      `Grid is jagged in [${sectionTitle}]`
    );
  }

  /**
   * Grid has less than 2 rows in [`sectionTitle`].
   */
  static gridTooShort(sectionTitle: string): TtblFormatError {
    return new TtblFormatError(
      `Grid has less than 2 rows in [${sectionTitle}]`
    );
  }

  /**
   * Service in [`sectionTitle`] at column `col` doesn't make at least 2 stops.
   */
  static gridServiceTooFewStops(sectionTitle: string, col: number): TtblFormatError {
    return new TtblFormatError(
      `Service in [${sectionTitle}] at column ${col} doesn't make at least 2 ` +
      `stops.`
    );
  }

  /**
   * Service in [`sectionTitle`] at column `col` requires time travel.
   */
  static gridServiceTimeTravel(sectionTitle: string, col: number): TtblFormatError {
    return new TtblFormatError(
      `Service in [${sectionTitle}] at column ${col} requires time travel`
    );
  }

  /**
   * Metadata section [`sectionTitle`] was missing key "${key}".
   */
  static metadataMissingKey(sectionTitle: string, key: string): TtblFormatError {
    return new TtblFormatError(
      `Metadata section [${sectionTitle}] was missing key "${key}"`
    );
  }

  /**
   * Expecting a value of type "`expectedType`" for "${key}" in [`sectionTitle`]
   * section.
   */
  static metadataKeyWrongType(sectionTitle: string, key: string,
    expectedType: string): TtblFormatError {

    return new TtblFormatError(
      `Expecting a value of type "${expectedType}" for "${key}" in ` +
      `[${sectionTitle}] section`
    );
  }

  /**
   * Begins date occurs after ends date.
   */
  static metadataBeginsAfterEnds(): TtblFormatError {
    return new TtblFormatError(
      `Begins date occurs after ends date`
    );
  }

  /**
   * .ttbl file must have at least one grid.
   */
  static noGrids(): TtblFormatError {
    return new TtblFormatError(
      `.ttbl file must have at least one grid`
    );
  }

  /**
   * Line IDs must be between 0 - {@link MaxLineID} inclusive, so "`given`" is
   * invalid.
   */
  static invalidLineID(given: number): TtblFormatError {
    return new TtblFormatError(
      `Line IDs must be between 0 - ${MaxLineID} inclusive, so "${given}" is ` +
      `invalid.`
    );
  }

  /**
   * Timetable IDs must be between 0 - {@link MaxTimetableID} inclusive, so
   * "`given`" is invalid.
   */
  static invalidTimetableID(given: number): TtblFormatError {
    return new TtblFormatError(
      `Timetable IDs must be between 0 - ${MaxTimetableID} inclusive, so ` +
      `"${given}" is invalid.`
    );
  }
}
