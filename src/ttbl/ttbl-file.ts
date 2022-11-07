import { isLineID, LineID } from "../network/line-id";
import { TransitNetwork } from "../network/transit-network";
import { Timetable } from "../timetable/timetable";
import { isTimetableID, TimetableID } from "../timetable/timetable-id";
import { TimetableType, TimetableTypes } from "../timetable/timetable-type";
import { validateTimetable } from "../timetable/validate-timetable";
import { LocalDate } from "../utils/local-date";
import { ttblFromTimetable } from "./ttbl-convert";
import { TtblFileGridSection } from "./ttbl-file-grid-section";
import { TtblFileMetadataSection } from "./ttbl-file-metadata-section";
import { TtblFileSection } from "./ttbl-file-section";
import { TtblFormatError } from "./ttbl-format-error";
import { requiredVersion, throwIfUnsupportedVersion } from "./ttbl-version";

/**
 * The parsed form of a .ttbl file. This object has no knowledge of the network,
 * and as such, is not validated against it, so invalid line IDs, direction IDs,
 * etc. may be present.
 */
export class TtblFile {
  /** The date the .ttbl file was created. */
  readonly created: LocalDate;

  /** The timetable ID (0 - {@link MaxTimetableID} inclusive). */
  readonly id: TimetableID;

  /** The line ID (0 - {@link MaxLineID} inclusive). */
  readonly line: LineID;

  /** The timetable type. */
  readonly type: TimetableType;

  /** The date this timetable comes into effect (null for no begin date). */
  readonly begins: LocalDate | null;

  /** The date this timetable is retired (null for no end date). */
  readonly ends: LocalDate | null;

  /** The timetable data, sectionized. */
  readonly grids: TtblFileGridSection[];

  /**
   * Creates a {@link TtblFile}.
   * @param created The date the .ttbl file was created.
   * @param id The timetable ID (0 - {@link MaxTimetableID} inclusive).
   * @param line The line ID (0 - {@link MaxLineID} inclusive).
   * @param type The timetable type.
   * @param begins The date this timetable comes into effect (null for no begin
   * date).
   * @param ends The date this timetable is retired (null for no end date).
   * @param grids The timetable data, sectionized.
   */
  constructor(created: LocalDate, id: TimetableID, line: LineID,
    type: TimetableType, begins: LocalDate | null, ends: LocalDate | null,
    grids: TtblFileGridSection[]) {

    // Begins and ends dates checked in Timetable object.

    // Must have at least one grid.
    if (grids.length < 1) {
      throw TtblFormatError.notEnoughGrids();
    }

    this.created = created;
    this.id = id;
    this.line = line;
    this.type = type;
    this.begins = begins;
    this.ends = ends;
    this.grids = grids;
  }

  /**
   * Checks the line exixts, each direction present exists on the line, and
   * every entry stops correctly according to the direction. Throws a
   * {@link TimetableError} if the timetable is invalid.
   * @param network Transit network information.
   */
  validate(network: TransitNetwork) {
    validateTimetable(Timetable.fromTtbl(this), network);
  }

  /**
   * Returns the contents of this timetable as a .ttbl compliant string.
   */
  write(): string {
    const metadata = new TtblFileMetadataSection("timetable", {
      "version": requiredVersion,
      "created": this.created.toISO(),
      "id": this.id.toFixed(),
      "line": this.line.toFixed(),
      "type": this.type,
      "begins": this.begins == null ? "*" : this.begins.toISO(),
      "ends": this.ends == null ? "*" : this.ends.toISO()
    });

    return metadata.write() + "\n\n" +
      this.grids.map(g => g.write()).join("\n\n") + "\n";
  }

  /**
   * Parses a ttbl file from the provided text. Throws a TtblVersionError if the
   * .ttbl version is unsupported, and a {@link TtblFormatError} if the file is
   * formatted incorrectly. The content is not validated against the network, so
   * invalid line IDs, direction IDs, etc. may be present.
   * @param text The text.
   */
  static parse(text: string): TtblFile {
    // Throw a TtblVersionError if the version is not supported.
    throwIfUnsupportedVersion(text);

    const sections = TtblFileSection.parseSections(text);

    // Parse metadata (except version since it's already checked above). First
    // section in timetable must be the metadata. sections[0] is guaranteed to
    // exist since the version declaration was present.
    const metadata = TtblFileMetadataSection.promote(sections[0]);
    const created = metadata.getDate("created", false);
    const id = metadata.getInt("id");
    const line = metadata.getInt("line");
    const type = metadata.getEnum("type", TimetableTypes);
    const begins = metadata.getDate("begins", true);
    const ends = metadata.getDate("ends", true);

    // All other sections must be grids.
    const grids = sections.slice(1).map(s => TtblFileGridSection.promote(s));

    // Timetable IDs and Line IDs both have maximums, so these need to be
    // checked here.
    if (!isTimetableID(id)) {
      throw TtblFormatError.invalidTimetableID(id);
    }
    if (!isLineID(line)) {
      throw TtblFormatError.invalidLineID(line);
    }

    return new TtblFile(created, id, line, type, begins, ends, grids);
  }

  /**
   * Creates a {@link TtblFile} from a {@link Timetable}. Throws a
   * {@link LookupError} if the lines, directions, and stops within the
   * timetable do not exist. Use {@link Timetable.validate} to check before
   * running.
   * @param timetable The timetable information.
   * @param network The transit network information to get full direction
   * stop-lists from.
   */
  static fromTimetable(timetable: Timetable, network: TransitNetwork): TtblFile {
    return ttblFromTimetable(timetable, network);
  }
}
