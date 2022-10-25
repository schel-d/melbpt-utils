import { DayOfWeek } from "./day-of-week";

/**
 * The official time zone name for Melbourne as used by Luxon.
 */
export const melbTimeZone = "Australia/Melbourne";

/**
 * The error object used when an invalid LocalTime, LocalDate, or DayOfWeek
 * operation occurs.
 */
export class TimeError extends Error {
  /**
   * Creates a {@link TimeError}.
   * @param message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "TimeError";
  }

  /**
   * Minute of day "`minuteOfDay`" is out of range for a LocalTime.
   */
  static timeOutOfRange(minuteOfDay: number): TimeError {
    return new TimeError(
      `Minute of day "${minuteOfDay}" is out of range for a LocalTime.`
    );
  }

  /**
   * String "`value`" cannot be interpreted as a LocalTime.
   */
  static badTimeString(value: string): TimeError {
    return new TimeError(
      `String "${value}" cannot be interpreted as a LocalTime.`
    );
  }

  /**
   * "`value`" is not a valid days since Monday number for a day of
   * week.
   */
  static invalidDaysSinceMonday(value: number): TimeError {
    return new TimeError(
      `"${value}" is not a valid days since Monday number for a day of week.`
    );
  }

  /**
   * Minute of day "`minuteOfDay`" is out of range for a LocalTime.
   */
  static invalidDate(year: number, month: number, day: number): TimeError {
    return new TimeError(
      `Date with year=${year}, month=${month}, and day=${day} is invalid.`
    );
  }

  /**
   * "`iso`" is an invalid date string.
   */
  static invalidISODate(iso: string): TimeError {
    return new TimeError(
      `"${iso}" is an invalid date string.`
    );
  }

  /**
   * "`value`" is not a valid weekday range.
   */
  static invalidWDR(value: string): TimeError {
    return new TimeError(
      `"${value}" is not a valid weekday range.`
    );
  }

  /**
   * "`value`" is not a valid weekday range.
   */
  static invalidDayOfWeekIndex(value: number): TimeError {
    return new TimeError(
      `"${value}" is not a valid day of week index for this weekday range.`
    );
  }

  /**
   * This weekday range does not have "`dayOfWeek`".
   */
  static dayNotFound(dayOfWeek: DayOfWeek): TimeError {
    return new TimeError(
      `This weekday range does not have "${dayOfWeek.codeName}".`
    );
  }
}
