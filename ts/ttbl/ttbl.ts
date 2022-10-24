import { isLineID, LineID } from "../network/id";
import { isTimetableID, TimetableID } from "../timetable/id";
import { LocalDate } from "../utils/local-date";
import { TtblFileGridSection } from "./ttbl-file-grid-section";
import { TtblFileMetadataSection } from "./ttbl-file-metadata-section";
import { TtblFileSection } from "./ttbl-file-section";
import { TtblFormatError } from "./ttbl-format-error";
import { throwIfUnsupportedVersion } from "./ttbl-version";

export type TtblType = typeof TtblTypes[number];
export const TtblTypes = ["main", "temporary", "public-holiday"] as const;

/**
 * The parsed form of a .ttbl file. This object has no knowledge of the network,
 * and as such, is not validated against it, so invalid line IDs, direction IDs,
 * etc. may be present.
 */
export class Ttbl {
  /** The date the .ttbl file was created. */
  readonly created: LocalDate;

  /** The timetable ID (0 - {@link MaxTimetableID} inclusive). */
  readonly id: TimetableID;

  /** The line ID (0 - {@link MaxLineID} inclusive). */
  readonly line: LineID;

  /** The timetable type. */
  readonly type: TtblType;

  /** The date this timetable comes into effect (null for no begin date). */
  readonly begins: LocalDate | null;

  /** The date this timetable is retired (null for no end date). */
  readonly ends: LocalDate | null;

  /** The timetable data, sectionized. */
  readonly grids: TtblFileGridSection[];

  /**
   * Creates a {@link Ttbl}.
   * @param created The date the .ttbl file was created.
   * @param id The timetable ID (0 - {@link MaxTimetableID} inclusive).
   * @param line The line ID (0 - {@link MaxLineID} inclusive).
   * @param type The timetable type.
   * @param begins The date this timetable comes into effect (null for no begin
   * date).
   * @param ends The date this timetable is retired (null for no end date).
   * @param grids The timetable data, sectionized.
   */
  constructor(created: LocalDate, id: TimetableID, line: LineID, type: TtblType,
    begins: LocalDate | null, ends: LocalDate | null,
    grids: TtblFileGridSection[]) {

    // Ensure begins and ends do not require time travel.
    if (begins != null && ends != null && !begins.isBeforeOrEqual(ends)) {
      throw TtblFormatError.metadataBeginsAfterEnds();
    }

    // Must have at least one grid.
    if (grids.length < 1) {
      throw TtblFormatError.noGrids();
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
   * Parses a ttbl file from the provided text. Throws a TtblVersionError if the
   * .ttbl version is unsupported, and a {@link TtblFormatError} if the file is
   * formatted incorrectly. The content is not validated against the network, so
   * invalid line IDs, direction IDs, etc. may be present.
   * @param text The text.
   */
  static parse(text: string): Ttbl {
    // Throw a TtblVersionError if the version is not supported.
    throwIfUnsupportedVersion(text);

    const sections = TtblFileSection.parseSections(text);

    // Parse metadata (except version since it's already checked above). First
    // section in timetable must be the metadata.
    const metadata = TtblFileMetadataSection.promote(sections[0]);
    const created = metadata.getDate("created", false);
    const id = metadata.getInt("id");
    const line = metadata.getInt("line");
    const type = metadata.getEnum("type", TtblTypes);
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

    return new Ttbl(created, id, line, type, begins, ends, grids);
  }

  /**
   * Returns the contents of this timetable as a .ttbl compliant string.
   */
  write(): string {
    const metadata = new TtblFileMetadataSection("timetable", {
      "created": this.created.toISO(),
      "id": this.id.toFixed(),
      "line": this.line.toFixed(),
      "type": this.type,
      "begins": this.begins == null ? "*" : this.begins.toISO(),
      "ends": this.ends == null ? "*" : this.ends.toISO()
    });

    return metadata.write() + "\n\n" + this.grids.map(g => g.write()).join("\n\n");
  }
}
