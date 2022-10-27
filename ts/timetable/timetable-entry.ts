import { DirectionID } from "../network/direction-id";
import { LineID } from "../network/line-id";
import { StopID } from "../network/stop-id";
import { DayOfWeek } from "../utils/day-of-week";
import { LocalTime } from "../utils/local-time";
import { TimetableEntryIndex } from "./timetable-entry-index";
import { TimetableError } from "./timetable-error";
import { TimetableID } from "./timetable-id";

/**
 * Represents a stop and the time it is stopped at.
 */
export class TimetableEntryStop {
  /** The stop ID. */
  readonly stop: StopID;

  /** The time this entry stops there. */
  readonly time: LocalTime;

  /**
   * Creates a {@link TimetableEntryStop}.
   * @param stop The stop id.
   * @param time The time this entry stops there.
   */
  constructor(stop: StopID, time: LocalTime) {
    this.stop = stop;
    this.time = time;
  }
}

/**
 * Represents a service in a timetable section that repeats every day of the
 * week in a particular weekday range.
 */
export class TimetableEntryWithinSection {
  /**
   * A list of stops and the times they are stopped at.
   */
  readonly times: TimetableEntryStop[];

  /**
   * Creates a {@link TimetableEntryWithinSection}.
   * @param times A list of stops and the times they are stopped at. Throws a
   * {@link TimetableError} if fewer than 2 stops are given or they are ordered
   * such that time travel would be required.
   */
  constructor(times: TimetableEntryStop[]) {
    // Each service must stop at least twice.
    if (times.length < 2) {
      throw TimetableError.entriesNotEnoughStops();
    }

    // Times must be sequential, ordered from earliest to latest (so check each
    // time occurs after the one before it).
    for (let i = 1; i < times.length; i++) {
      if (times[i - 1].time.isAfter(times[i].time)) {
        throw TimetableError.entriesTimeTravel();
      }
    }

    this.times = times;
  }
}

/**
 * Represents a service in a timetable that repeats every week on a particular
 * day of the week.
 */
export class TimetableEntryWithinTimetable extends TimetableEntryWithinSection {
  /** The index within the timetable that this entry is. */
  readonly index: TimetableEntryIndex;

  /** The direction this timetable entry runs in. */
  readonly direction: DirectionID;

  /** The day of the week the entry runs on. */
  readonly dayOfWeek: DayOfWeek;

  /**
   * Creates a {@link TimetableEntryWithinTimetable}.
   * @param index The index within the timetable that this entry is.
   * @param direction The direction this timetable entry runs in.
   * @param dayOfWeek The day of the week the entry runs on.
   * @param times A list of stops and the times they are stopped at.
   */
  constructor(index: TimetableEntryIndex, direction: DirectionID,
    dayOfWeek: DayOfWeek, times: TimetableEntryStop[]) {

    super(times);
    this.index = index;
    this.direction = direction;
    this.dayOfWeek = dayOfWeek;
  }

  /**
   * Upgrades a {@link TimetableEntryWithinSection} to a
   * {@link TimetableEntryWithinTimetable}.
   * @param entry The entry.
   * @param index The index within the timetable that this entry is.
   * @param direction The direction this timetable entry runs in.
   * @param dayOfWeek The day of the week the entry runs on.
   */
  static fromEntryWithinSection(entry: TimetableEntryWithinSection,
    index: TimetableEntryIndex, direction: DirectionID,
    dayOfWeek: DayOfWeek): TimetableEntryWithinTimetable {

    return new TimetableEntryWithinTimetable(
      index, direction, dayOfWeek, entry.times
    );
  }
}

/**
 * Represents a service in a timetable section that repeats every week on a
 * particular day of the week.
 */
export class TimetableEntry extends TimetableEntryWithinTimetable {
  /** The timetable ID of the timetable this entry belongs to. */
  readonly timetable: TimetableID;

  /** The line ID of the line of the timetable that this entry belongs to. */
  readonly line: LineID;

  /**
   * Creates a {@link TimetableEntry}.
   * @param timetable The timetable ID of the timetable this entry belongs to.
   * @param line The line ID of the line of the timetable that this entry
   * belongs to.
   * @param index The index within the timetable that this entry is.
   * @param direction The direction this timetable entry runs in.
   * @param dayOfWeek The day of the week the entry runs on.
   * @param times A list of stops and the times they are stopped at.
   */
  constructor(timetable: TimetableID, line: LineID, index: TimetableEntryIndex,
    direction: DirectionID, dayOfWeek: DayOfWeek, times: TimetableEntryStop[]) {

    super(index, direction, dayOfWeek, times);
    this.timetable = timetable;
    this.line = line;
  }

  /**
   * Upgrades a {@link TimetableEntryWithinTimetable} to a
   * {@link TimetableEntry}.
   * @param entry The entry.
   * @param timetable The timetable ID of the timetable this entry belongs to.
   * @param line The line ID of the line of the timetable that this entry
   * belongs to.
   */
  static fromEntryWithinTimetable(entry: TimetableEntryWithinTimetable,
    timetable: TimetableID, line: LineID): TimetableEntry {

    return new TimetableEntry(
      timetable, line, entry.index, entry.direction, entry.dayOfWeek,
      entry.times
    );
  }
}
