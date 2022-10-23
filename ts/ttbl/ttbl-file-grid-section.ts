import { StopID } from "../network/id";
import { LocalTime } from "../utils/local-time";
import { parseIntNull } from "../utils/num-utils";
import { TtblFormatError } from "./error";
import { TtblFileSection } from "./ttbl-file-section";

export type GridRow = {
  stop: StopID,
  comment: string,
  times: (LocalTime | null)[]
};

/**
 * Like a {@link TtblFileSection}, but the contents must be in the format of a
 * timetable grid.
 */
export class TtblFileGridSection extends TtblFileSection {
  readonly rows: GridRow[];

  constructor(title: string, rows: GridRow[]) {
    // Convert parsed rows back to text for base class's sake.
    super(title, rows.map(k =>
      writeGridRow(k, Math.max(...rows.map(r => r.comment.length)))
    ));
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

    section.lines.forEach(l => {
      // Separate all "words" separated by spaces, e.g.
      // "0001 some-comment 18:01  22:01  >02:01" becomes
      // ["0001", "some-comment", "18:01", "22:01", ">02:01"]
      const words = l.split(" ")
        .map(x => x.trim())
        .filter(x => x.length > 0);

      if (words.length < 3) {
        throw TtblFormatError.gridBadSyntax(section.title, l);
      }

      // First word is stop ID. Make sure it's an int, and is not a duplicate.
      const stopID = parseIntNull(words[0]);
      if (stopID == null) {
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

    // Check rectangularacity (all rows have same number of columns).
    if (rows.some(r => r.times.length != rows[0].times.length)) {
      throw TtblFormatError.gridJagged(section.title);
    }

    return new TtblFileGridSection(section.title, rows);
  }
}

/**
 * Writes the grid row as a .ttbl compliant string, e.g.
 * "0001 some-comment 18:01  22:01  >02:01"
 * @param row The row data
 * @param maxCommentLength The length of the longest comment in this section
 * (used to align the times between rows).
 */
function writeGridRow(row: GridRow, maxCommentLength: number): string {
  const timesString = row.times
    .map(t => t?.toString(true) ?? "-")
    .map(x => x.padEnd(6, " "))
    .join(" ");

  return `${row.stop.toFixed().padStart(4, "0")} ` +
    `${row.comment.padEnd(maxCommentLength, " ")} ${timesString}`;
}
