import { LookupError } from "../utils/error";
import { LocalDate } from "../utils/local-date";
import { Timetable } from "./timetable";
import { TimetableEntry } from "./timetable-entry";
import { TimetableEntryIndex } from "./timetable-entry-index";
import { TimetableError } from "./timetable-error";
import { TimetableID } from "./timetable-id";
import { TimetableTypes } from "./timetable-type";

/**
 * An object to hold the entire collection of timetables.
 */
export class TimetableSuite {
  /**
   * The array of timetables managed by this object.
   */
  readonly timetables: Timetable[];

  /**
   * Creates a {@link TimetableSuite} object.
   * @param timetables The array of timetables managed by this object.
   */
  constructor(timetables: Timetable[]) {
    // Check that two timetables don't have the same ID.
    const uniqueTimetableIDsCount = new Set(timetables.map(t => t.id)).size;
    if (uniqueTimetableIDsCount < timetables.length) {
      throw TimetableError.duplicateTimetables();
    }

    // Check that timetables with the same line and type do not occur in
    // overlapping timespans.
    const uniqueLines = new Set(timetables.map(t => t.line));
    for (const line of uniqueLines) {
      for (const type of TimetableTypes) {
        const relevant = timetables.filter(t => t.line == line && t.type == type);

        // Loops that check each pair of timetables once only.
        for (let a = 0; a < relevant.length - 1; a++) {
          for (let b = a + 1; b < relevant.length; b++) {
            const timetableA = relevant[a];
            const timetableB = relevant[b];

            if (hasOverlap(timetableA.begins, timetableA.ends,
              timetableB.begins, timetableB.ends)) {

              throw TimetableError.overlappingTimetables(line, type);
            }
          }
        }
      }
    }

    this.timetables = timetables;
  }

  /**
   * Returns the timetable entry corresponding to the given {@link index} within
   * the timetable with the matching {@link timetableID}, or returns null if an
   * entry matching those requirements can't be found.
   * @param timetableID The timetable ID of the timetable to search in.
   * @param index The index to search for.
   */
  getEntry(timetableID: TimetableID,
    index: TimetableEntryIndex): TimetableEntry | null {

    const timetable = this.timetables.find(t => t.id == timetableID);
    if (timetable == null) { return null; }

    const entry = timetable.getEntry(index);
    return entry;
  }

  /**
   * Returns the timetable entry corresponding to the given {@link index} within
   * the timetable with the matching {@link timetableID}, or throws a
   * {@link LookupError} if an entry matching those requirements can't be found.
   * @param timetableID The timetable ID of the timetable to search in.
   * @param index The index to search for.
   */
  requireEntry(timetableID: TimetableID,
    index: TimetableEntryIndex): TimetableEntry {

    const entry = this.getEntry(timetableID, index);
    if (entry != null) { return entry; }
    throw LookupError.timetableEntryNotFoundInSuite(timetableID, index);
  }
}

/**
 * Returns true if the timespans a and b overlap. Assumes {@link xStart} occurs
 * before or at {@link xEnd}, and likewise with {@link yStart} and {@link yEnd}.
 * @param xStart The start time in the first range (null means "from the
 * beginning of time").
 * @param xEnd The end time in the first range (null means never-ending).
 * @param yStart The start time in the second range (null means "from the
 * beginning of time").
 * @param yEnd The end time in the second range (null means never-ending).
 */
function hasOverlap(xStart: LocalDate | null, xEnd: LocalDate | null,
  yStart: LocalDate | null, yEnd: LocalDate | null): boolean {

  const xStartNum = xStart?.decimalISO ?? -1;
  const yStartNum = yStart?.decimalISO ?? -1;
  const xEndNum = xEnd?.decimalISO ?? 100000000;
  const yEndNum = yEnd?.decimalISO ?? 100000000;

  const noOverlap = xEndNum < yStartNum || yEndNum < xStartNum;

  return !noOverlap;
}
