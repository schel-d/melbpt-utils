import { DayOfWeek } from "./day-of-week";
import { TimeError } from "./time-utils";

/**
 * Represents which days of the week a timetable entry runs on.
 */
export class WeekdayRange {
  /**
   * Whether or not Monday is included in the weekday range.
   */
  readonly mon: boolean;

  /**
   * Whether or not Tuesday is included in the weekday range.
   */
  readonly tue: boolean;

  /**
   * Whether or not Wednesday is included in the weekday range.
   */
  readonly wed: boolean;

  /**
   * Whether or not Thursday is included in the weekday range.
   */
  readonly thu: boolean;

  /**
   * Whether or not Friday is included in the weekday range.
   */
  readonly fri: boolean;

  /**
   * Whether or not Saturday is included in the weekday range.
   */
  readonly sat: boolean;

  /**
   * Whether or not Sunday is included in the weekday range.
   */
  readonly sun: boolean;

  /**
   * Creates a {@link WeekdayRange}.
   * @param mon Whether or not Monday is included in the weekday range.
   * @param tue Whether or not Tuesday is included in the weekday range.
   * @param wed Whether or not Wednesday is included in the weekday range.
   * @param thu Whether or not Thursday is included in the weekday range.
   * @param fri Whether or not Friday is included in the weekday range.
   * @param sat Whether or not Saturday is included in the weekday range.
   * @param sun Whether or not Sunday is included in the weekday range.
   */
  constructor(mon: boolean, tue: boolean, wed: boolean, thu: boolean,
    fri: boolean, sat: boolean, sun: boolean) {

    this.mon = mon;
    this.tue = tue;
    this.wed = wed;
    this.thu = thu;
    this.fri = fri;
    this.sat = sat;
    this.sun = sun;
  }

  /**
   * Parse a weekday range from a string, e.g. "MTWT___". Throws a
   * {@link TimeError} on failure.
   * @param value The string, e.g. "MTWT___".
   */
  static parse(value: string): WeekdayRange {
    if (value.length != 7) { throw TimeError.invalidWDR(value); }

    const isLetterOrUnderscore = (char: string, allowedLetter: string) => {
      if (char == allowedLetter) { return true; }
      if (char == "_") { return false; }
      throw TimeError.invalidWDR(value);
    };

    return new WeekdayRange(
      isLetterOrUnderscore(value[0], "M"),
      isLetterOrUnderscore(value[1], "T"),
      isLetterOrUnderscore(value[2], "W"),
      isLetterOrUnderscore(value[3], "T"),
      isLetterOrUnderscore(value[4], "F"),
      isLetterOrUnderscore(value[5], "S"),
      isLetterOrUnderscore(value[6], "S")
    );
  }

  /**
   * Converts this weekday range into a string, e.g. "MTWT___".
   */
  toString(): string {
    return (this.mon ? "M" : "_") +
      (this.tue ? "T" : "_") +
      (this.wed ? "W" : "_") +
      (this.thu ? "T" : "_") +
      (this.fri ? "F" : "_") +
      (this.sat ? "S" : "_") +
      (this.sun ? "S" : "_");
  }

  /**
   * Counts how many days are in this weekday range.
   */
  get numOfDays(): number {
    let count = 0;
    if (this.mon) { count++; }
    if (this.tue) { count++; }
    if (this.wed) { count++; }
    if (this.thu) { count++; }
    if (this.fri) { count++; }
    if (this.sat) { count++; }
    if (this.sun) { count++; }
    return count;
  }

  /**
   * Get day of week number (where 0 means Monday and 6 means Sunday), based on
   * an index. This is useful for weekday ranges that span multiple days. For
   * example if the weekday range is __WT_S_, index 0 returns 2 (for
   * Wednesday), index 1 returns 3 (for Thursday), and index 2 returns 5 (for
   * Saturday). Throws a {@link TimeError} if the index is out of range.
   */
  getDayOfWeekByIndex(index: number): DayOfWeek {
    const days: number[] = [];
    if (this.mon) { days.push(0); }
    if (this.tue) { days.push(1); }
    if (this.wed) { days.push(2); }
    if (this.thu) { days.push(3); }
    if (this.fri) { days.push(4); }
    if (this.sat) { days.push(5); }
    if (this.sun) { days.push(6); }
    if (index < 0 || index >= days.length) {
      throw TimeError.invalidDayOfWeekIndex(index);
    }
    return DayOfWeek.fromDaysSinceMonday(days[index]);
  }

  /**
   * Returns true if the given {@link day} is within this weekday range.
   * @param day The day of week to test.
   */
  includes(day: DayOfWeek): boolean {
    const indexedDays = {
      0: this.mon,
      1: this.tue,
      2: this.wed,
      3: this.thu,
      4: this.fri,
      5: this.sat,
      6: this.sun
    };
    return indexedDays[day.daysSinceMonday];
  }

  /**
   * Returns the weekday range as an array of {@link DayOfWeek} objects.
   */
  days(): DayOfWeek[] {
    const result: DayOfWeek[] = [];
    if (this.mon) { result.push(DayOfWeek.mon); }
    if (this.tue) { result.push(DayOfWeek.tue); }
    if (this.wed) { result.push(DayOfWeek.wed); }
    if (this.thu) { result.push(DayOfWeek.thu); }
    if (this.fri) { result.push(DayOfWeek.fri); }
    if (this.sat) { result.push(DayOfWeek.sat); }
    if (this.sun) { result.push(DayOfWeek.sun); }
    return result;
  }

  /**
   * Returns the index on the given day of week within this weekday range, e.g.
   * 3 for Thursday if the weekday range is Mon-Thu. Throws a {@link TimeError}
   * if the day isn't in the weekday range at all.
   */
  indexOf(dayOfWeek: DayOfWeek): number {
    const days: number[] = [];
    if (this.mon) { days.push(0); }
    if (this.tue) { days.push(1); }
    if (this.wed) { days.push(2); }
    if (this.thu) { days.push(3); }
    if (this.fri) { days.push(4); }
    if (this.sat) { days.push(5); }
    if (this.sun) { days.push(6); }

    const index = days.indexOf(dayOfWeek.daysSinceMonday);
    if (index == -1) { throw TimeError.dayNotFound(dayOfWeek); }

    return index;
  }

  /**
   * Returns true if this and {@link other} refer to the same weekday range.
   * @param other The other.
   */
  equals(other: WeekdayRange): boolean {
    return this.mon == other.mon
      && this.tue == other.tue
      && this.wed == other.wed
      && this.thu == other.thu
      && this.fri == other.fri
      && this.sat == other.sat
      && this.sun == other.sun;
  }
}
