import { TtblFile } from "../export";
import { LineID } from "../network/line-id";
import { TransitNetwork } from "../network/transit-network";
import { timetableFromTtbl } from "../ttbl/ttbl-convert";
import { LookupError } from "../utils/error";
import { LocalDate } from "../utils/local-date";
import { TimetableEntry } from "./timetable-entry";
import { TimetableEntryIndex } from "./timetable-entry-index";
import { TimetableError } from "./timetable-error";
import { TimetableID } from "./timetable-id";
import { TimetableSection } from "./timetable-section";
import { TimetableType } from "./timetable-type";
import { validateTimetable } from "./validate-timetable";

/**
 * Represents a timetable on a particular line.
 */
export class Timetable {
  /** The ID of this timetable. */
  readonly id: TimetableID;

  /** The line this timetable is for. */
  readonly line: LineID;

  /**
   * The date this timetable was originally created. Helps the program know how
   * recently timetables for each line have been updated.
   */
  readonly created: LocalDate;

  /** The timetable type. */
  readonly type: TimetableType;

  /**
   * When this timetable comes into effect. Leave null if it comes into effect
   * immediately and retroactively applies to every past calendar day too.
   */
  readonly begins: LocalDate | null;

  /**
   * When this timetable ends (and presumably another timetable comes into
   * effect). Leave null if its end date is currently unknown, as will likely
   * usually be the case for main timetables.
   */
  readonly ends: LocalDate | null;

  /**
   * The sections of the timetable, containing the entries themselves. Entries
   * are grouped by direction and weekday range.
   */
  readonly sections: TimetableSection[];

  /**
   * Creates a {@link Timetable}.
   * @param id The ID of this timetable.
   * @param line The line this timetable is for.
   * @param created The date this timetable was originally created. Helps the
   * program know how recently timetables for each line have been updated.
   * @param type The timetable type.
   * @param begins When this timetable comes into effect. Leave null if it comes
   * into effect immediately and retroactively applies to every past calendar
   * day too.
   * @param ends When this timetable ends (and presumably another timetable
   * comes into effect). Leave null if its end date is currently unknown, as
   * will likely usually be the case for main timetables.
   * @param sections The sections of the timetable, containing the entries
   * themselves. Entries are grouped by direction and weekday range.
   */
  constructor(id: TimetableID, line: LineID, created: LocalDate,
    type: TimetableType, begins: LocalDate | null, ends: LocalDate | null,
    sections: TimetableSection[]) {

    if (sections.length < 1) {
      throw TimetableError.emptySection();
    }

    this.id = id;
    this.line = line;
    this.created = created;
    this.type = type;
    this.begins = begins;
    this.ends = ends;

    this.sections = sections;
  }

  /**
   * Returns the timetable entry corresponding to the given index, or returns
   * null if that index isn't used within this timetable.
   * @param index The index to search for.
   */
  getEntry(index: TimetableEntryIndex): TimetableEntry | null {
    const section = this.sections.find(s => s.hasIndex(index));
    if (section == null) { return null; }

    const result = section.getEntryByIndex(index);
    if (result == null) { return null; }

    return TimetableEntry.fromEntryWithinTimetable(result, this.id, this.line);
  }

  /**
   * Returns the timetable entry corresponding to the given index, or throws a
   * {@link LookupError} if that index isn't used within this timetable.
   * @param index The index to search for.
   */
  requireEntry(index: TimetableEntryIndex): TimetableEntry {
    const entry = this.getEntry(index);
    if (entry != null) { return entry; }
    throw LookupError.timetableEntryNotFound(index);
  }

  /**
   * Checks the line exixts, each direction present exists on the line, and
   * every entry stops correctly according to the direction. Throws a
   * {@link TimetableError} if the timetable is invalid.
   * @param network Transit network information.
   */
  validate(network: TransitNetwork) {
    validateTimetable(this, network);
  }

  /**
   * Creates a {@link Timetable} from a {@link TtblFile}. Throws a
   * {@link TimetableError} if the ttbl content is invalid. Does not check that
   * the data in the resulting {@link Timetable} lines up with the
   * {@link TransitNetwork} information, so use {@link validate} for that.
   * @param ttbl The parsed .ttbl file.
   */
  static fromTtbl(ttbl: TtblFile): Timetable {
    return timetableFromTtbl(ttbl);
  }
}
