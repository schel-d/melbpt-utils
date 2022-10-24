import { DateTime } from "luxon";
import { posMod } from "./num-utils";
import { TimeError } from "./time-utils";

/**
 * Represents a day of the week value, e.g. Thursday.
 */
export class DayOfWeek {
  /**
   * The number of days this day of the week is away from Monday, e.g. 3 for
   * Thursday. This value will be an integer between 0-6 inclusive.
   */
  readonly daysSinceMonday: number;

  /** Monday. */
  static readonly mon = new DayOfWeek(0);

  /** Tuesday. */
  static readonly tue = new DayOfWeek(1);

  /** Wednesday. */
  static readonly wed = new DayOfWeek(2);

  /** Thursday. */
  static readonly thu = new DayOfWeek(3);

  /** Friday. */
  static readonly fri = new DayOfWeek(4);

  /** Saturday. */
  static readonly sat = new DayOfWeek(5);

  /** Sunday. */
  static readonly sun = new DayOfWeek(6);

  /**
   * Creates a {@link DayOfWeek}.
   * @param daysSinceMonday The number of days this day of the week is away from
   * Monday, e.g. 3 for Thursday. This value must be an integer between 0-6
   * inclusive, otherwise a {@link TimeError} is thrown.
   */
  constructor(daysSinceMonday: number) {
    if (daysSinceMonday < 0 || daysSinceMonday >= 7 ||
      !Number.isInteger(daysSinceMonday)) {

      throw TimeError.invalidDaysSinceMonday(daysSinceMonday);
    }

    this.daysSinceMonday = daysSinceMonday;
  }

  /**
   * Returns the name of the day of the week, e.g. "Thursday" for Thursday.
   */
  get name(): string {
    if (this.daysSinceMonday == 0) { return "Monday"; }
    if (this.daysSinceMonday == 1) { return "Tuesday"; }
    if (this.daysSinceMonday == 2) { return "Wednesday"; }
    if (this.daysSinceMonday == 3) { return "Thursday"; }
    if (this.daysSinceMonday == 4) { return "Friday"; }
    if (this.daysSinceMonday == 5) { return "Saturday"; }
    if (this.daysSinceMonday == 6) { return "Sunday"; }

    // Never happens since value is checked in constructor.
    throw TimeError.invalidDaysSinceMonday(this.daysSinceMonday);
  }

  /**
   * Returns the code name of the day of the week, e.g. "thu" for Thursday.
   */
  get codeName(): string {
    if (this.daysSinceMonday == 0) { return "mon"; }
    if (this.daysSinceMonday == 1) { return "tue"; }
    if (this.daysSinceMonday == 2) { return "wed"; }
    if (this.daysSinceMonday == 3) { return "thu"; }
    if (this.daysSinceMonday == 4) { return "fri"; }
    if (this.daysSinceMonday == 5) { return "sat"; }
    if (this.daysSinceMonday == 6) { return "sun"; }

    // Never happens since value is checked in constructor.
    throw TimeError.invalidDaysSinceMonday(this.daysSinceMonday);
  }

  /**
   * Returns true if this day of week is either Saturday or Sunday.
   */
  get isWeekend(): boolean {
    return this.daysSinceMonday == 5 || this.daysSinceMonday == 6;
  }

  /**
   * Returns true if this day of week is not Saturday or Sunday.
   */
  get isWeekday(): boolean {
    return !this.isWeekend;
  }

  /**
   * Returns the day of week of the day before this one.
   */
  yesterday(): DayOfWeek {
    return new DayOfWeek(posMod(this.daysSinceMonday - 1, 7));
  }

  /**
   * Returns the day of week of the day after this one.
   */
  tomorrow(): DayOfWeek {
    return new DayOfWeek(posMod(this.daysSinceMonday + 1, 7));
  }

  /**
   * Creates a {@link DayOfWeek} from a luxon datetime.
   * @param value The date to determine the day of week from.
   */
  static fromLuxon(value: DateTime): DayOfWeek {
    return new DayOfWeek(value.weekday - 1);
  }
}
