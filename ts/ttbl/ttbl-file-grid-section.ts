import { isStopID, StopID } from "../network/stop-id";
import { LocalTime } from "../utils/local-time";
import { parseIntNull } from "../utils/num-utils";
import { WeekdayRange } from "../utils/week-day-range";
import { TtblFormatError } from "./ttbl-format-error";
import { TtblFileSection } from "./ttbl-file-section";
import { splitTrim } from "./utils";
import { DirectionID, isDirectionID } from "../network/direction-id";

/**
 * Like a {@link TtblFileSection}, but the contents must be in the format of a
 * timetable grid.
 */
export class TtblFileGridSection extends TtblFileSection {
  /**
   * The direction this section provides timetable for.
   */
  readonly direction: DirectionID;

  /**
   * The days of the week this section provides timetable for.
   */
  readonly wdr: WeekdayRange;

  /**
   * The rows data found inside this section of the .ttbl file.
   */
  readonly rows: GridRow[];

  /**
   * Creates a {@link TtblFileGridSection}.
   * @param direction The direction this section provides timetable for.
   * @param wdr The days of the week this section provides timetable for.
   * @param rows The rows data found inside this section of the .ttbl file.
   */
  constructor(direction: DirectionID, wdr: WeekdayRange, rows: GridRow[]) {
    // Convert direction, wdr, and parsed rows back to text for base class's
    // sake (for title and lines).
    super(toTitle(direction, wdr), toText(rows));

    // Must be at least 2 rows.
    if (rows.length < 2) {
      throw TtblFormatError.gridNotEnoughRows(this.title);
    }

    // Check rectangularacity (all rows have same number of columns).
    if (rows.some(r => r.times.length != rows[0].times.length)) {
      throw TtblFormatError.gridJagged(this.title);
    }

    // Check each services for number of stops and time travel.
    for (let col = 0; col < rows[0].times.length; col++) {
      // Get every time in this column and filter all blanks.
      const service = rows
        .map(r => r.times[col])
        .filter(t => t != null) as LocalTime[];

      // Each service must stop at least twice.
      if (service.length < 2) {
        throw TtblFormatError.gridServiceNotEnoughStops(this.title, col);
      }

      // Times must be sequential, ordered from earliest to latest down the
      // rows (so check each time occurs after the one before it).
      for (let stop = 1; stop < service.length; stop++) {
        if (service[stop - 1].isAfter(service[stop])) {
          throw TtblFormatError.gridServiceTimeTravel(this.title, col);
        }
      }
    }

    this.direction = direction;
    this.wdr = wdr;
    this.rows = rows;
  }

  /**
   * Converts the already parsed {@link TtblFileSection} into a grid section.
   * Throws {@link TtblFormatError} if this section doesn't comply to the grid
   * format, if the same stop is present twice, or if the grid is jagged.
   * @param section The section.
   */
  static promote(section: TtblFileSection): TtblFileGridSection {
    const rows: GridRow[] = [];

    // Pull direction and weekday range from section header.
    const titleWords = splitTrim(section.title, ",");
    if (titleWords.length != 2) {
      throw TtblFormatError.gridBadSyntax(section.title, section.title);
    }

    // Check direction ID is ok.
    const directionID = titleWords[0];
    if (!isDirectionID(directionID)) {
      throw TtblFormatError.gridBadSyntax(section.title, section.title);
    }

    // Parse weekday range.
    let wdr: WeekdayRange | null = null;
    try {
      wdr = WeekdayRange.parse(titleWords[1]);
    }
    catch {
      throw TtblFormatError.gridBadSyntax(section.title, section.title);
    }

    section.lines.forEach(l => {
      // Separate all "words" separated by spaces, e.g.
      // "0001 some-comment 18:01  22:01  >02:01" becomes
      // ["0001", "some-comment", "18:01", "22:01", ">02:01"]
      const words = splitTrim(l, " ");

      if (words.length < 3) {
        throw TtblFormatError.gridBadSyntax(section.title, l);
      }

      // First word is stop ID. Make sure it's an int, and is not a duplicate.
      const stopID = parseIntNull(words[0]);
      if (stopID == null || !isStopID(stopID)) {
        throw TtblFormatError.gridBadSyntax(section.title, l);
      }
      if (rows.find(r => r.stop == stopID) != null) {
        throw TtblFormatError.gridDuplicateStop(section.title, stopID);
      }

      // Ensure comment is present as second word (and it doesn't go straight
      // into times).
      if (words[1].includes(":")) {
        throw TtblFormatError.gridBadSyntax(section.title, l);
      }

      // Every other word should be a time, or a "-".
      const times: (LocalTime | null)[] = [];
      words.slice(2).forEach(w => {
        if (w == "-") {
          times.push(null);
        }
        else {
          // If the parsing fails, catch the TimeError and throw TtblFormatError
          // instead.
          try {
            const time = LocalTime.parseWithMarker(w);
            times.push(time);
          }
          catch {
            throw TtblFormatError.gridBadSyntax(section.title, l);
          }
        }
      });

      // Now we've finished parsing this row, so push it to the array.
      rows.push({
        stop: stopID,
        comment: words[1],
        times: times
      });
    });

    // Rectangularacity is checked in constructor.
    return new TtblFileGridSection(directionID, wdr, rows);
  }
}

/**
 * The information stored inside each row of the grid.
 */
export class GridRow {
  /** The stop this row is for. */
  readonly stop: StopID;

  /** The comment string (ideally the stop name). */
  readonly comment: string;

  /** The array of times (or blanks) that make up the grid. */
  readonly times: (LocalTime | null)[];

  /**
   * Creates a {@link GridRow}.
   * @param stop The stop this row is for.
   * @param comment The comment string (ideally the stop name).
   * @param times The array of times (or blanks) that make up the grid.
   */
  constructor(stop: StopID, comment: string, times: (LocalTime | null)[]) {
    this.stop = stop;
    this.comment = comment;
    this.times = times;
  }
}

/**
 * Returns the grid section title string for a given direction and weekday range
 * (for the title field in the {@link TtblFileSection}).
 * @param direction The direction.
 * @param wdr The weekday range.
 */
function toTitle(direction: DirectionID, wdr: WeekdayRange) {
  return `${direction}, ${wdr.toString()}`;
}

/**
 * Writes the grid rows into a .ttbl compliant array of strings (for the lines
 * field in the {@link TtblFileSection}).
 * @param rows The grid rows.
 */
function toText(rows: GridRow[]) {
  const length = Math.max(...rows.map(r => r.comment.length));
  return rows.map(r => {
    const timesString = r.times
      .map(t => t?.toString(true) ?? "-")
      .map(x => x.padEnd(6, " "))
      .join(" ");

    return `${r.stop.toFixed().padStart(4, "0")} ` +
      `${r.comment.padEnd(length, " ")} ${timesString}`;
  });
}
