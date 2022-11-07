import { DirectionID } from "../network/direction-id";
import { WeekdayRange } from "../utils/weekday-range";
import { TimetableEntryWithinTimetable, TimetableEntryWithinSection }
  from "./timetable-entry";
import { isTimetableEntryIndex, TimetableEntryIndex, toTimetableEntryIndex }
  from "./timetable-entry-index";
import { TimetableError } from "./timetable-error";

/**
 * Represents a group of entries in a timetable that run in a common direction
 * on the same days of the week.
 */
export class TimetableSection {
  /** The direction every entry in this section runs in. */
  readonly direction: DirectionID;

  /** The days of the week every entry in the section runs on. */
  readonly wdr: WeekdayRange;

  /**
   * The index that the first entry in this section will use. Entries are
   * indexed per timetable, not per section, so this section needs to know which
   * range of indices it's entries belong to.
   */
  readonly firstIndex: TimetableEntryIndex;

  /** The timetable entries in this section. */
  readonly entries: TimetableEntryWithinSection[];

  /**
   * Creates a new {@link TimetableSection}.
   * @param direction The direction every entry in this section runs in.
   * @param wdr The days of the week every entry in the section runs on.
   * @param firstIndex The index that the first entry in this section will use.
   * Entries are indexed per timetable, not per section, so this section needs
   * to know which range of indices it's entries belong to.
   * @param entries The timetable entries in this section.
   */
  constructor(direction: DirectionID, wdr: WeekdayRange,
    firstIndex: TimetableEntryIndex, entries: TimetableEntryWithinSection[]) {

    // Ensure section is not empty
    if (entries.length < 1) {
      throw TimetableError.emptySection();
    }

    // Ensure there aren't so many services that the last index is not valid.
    const lastIndex = firstIndex + entries.length * wdr.numOfDays - 1;
    if (!isTimetableEntryIndex(lastIndex)) {
      throw TimetableError.tooManyServices();
    }

    this.direction = direction;
    this.wdr = wdr;
    this.firstIndex = firstIndex;
    this.entries = entries;
  }

  /**
   * Returns the number of entries within the timetable, where 1 service that
   * runs on Mon-Thu counts as 4.
   */
  get entriesCount() {
    return this.entries.length * this.wdr.numOfDays;
  }

  /** Returns the last {@link TimetableEntryIndex} used in this section. */
  get lastIndex(): TimetableEntryIndex {
    return toTimetableEntryIndex(this.firstIndex + this.entriesCount - 1);
  }

  /**
   * Returns true if the entry with the given index is found in this timetable.
   * @param index The index to search for.
   */
  hasIndex(index: TimetableEntryIndex): boolean {
    return index >= this.firstIndex && index <= this.lastIndex;
  }

  /**
   * Returns the timetable entry corresponding to the given index, or returns
   * null if that index isn't within this section.
   * @param index The index to search for.
   */
  getEntryByIndex(index: TimetableEntryIndex): TimetableEntryWithinTimetable | null {
    if (!this.hasIndex(index)) { return null; }

    // Entries have multiple indices, one for each day of the week they occur
    // on, so we must calculate which day of week this index is for.
    const localIndex = index - this.firstIndex;
    const arrayIndex = localIndex % this.entries.length;
    const dayOfWeekIndex = Math.floor(localIndex / this.entries.length);
    const dayOfWeek = this.wdr.getDayOfWeekByIndex(dayOfWeekIndex);

    const entry = this.entries[arrayIndex];
    return TimetableEntryWithinTimetable.fromEntryWithinSection(
      entry, index, this.direction, dayOfWeek
    );
  }

  /**
   * Returns the entire list of entries as {@link TimetableEntryWithinTimetable}
   * objects. If this section spans multiple days of the week, then an entry
   * for each day of the week is provided with the appropriate index.
   */
  getIndexedEntries(): TimetableEntryWithinTimetable[] {
    // For each day of the week within the sections weekday range...
    return this.wdr.days().map((w, i) => {
      // Calculate the offset index for this day of the week.
      const startIndex = this.firstIndex + this.entries.length * i;

      // Convert all entries to their "WithinTimetable" versions.
      return this.entries.map((e, j) => {
        return TimetableEntryWithinTimetable.fromEntryWithinSection(
          e, toTimetableEntryIndex(startIndex + j), this.direction, w
        );
      });
    }).flat();
  }
}
