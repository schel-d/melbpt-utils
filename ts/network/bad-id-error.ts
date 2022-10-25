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
