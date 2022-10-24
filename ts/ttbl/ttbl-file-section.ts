import { TtblFormatError } from "./ttbl-format-error";
import { lineify } from "./utils";

/**
 * A "section" of a .ttbl file, where sections begin with [bracketed strings].
 */
export class TtblFileSection {
  /**
   * The string inside the square brackets at the start of the file, not
   * including the square brackets themselves.
   */
  readonly title: string;

  /**
   * The text found inside this section, between this section's title and the
   * next section (excluding blank lines, and each surrounding whitespace
   * removed).
   */
  readonly lines: string[];

  /**
   * Creates a {@link TtblFileSection}.
   * @param title The string inside the square brackets at the start of the
   * file. Throws a {@link TtblFormatError} if the title string given still
   * includes the brackets.
   * @param lines The text found inside this section, between this section's
   * title and the next section (excluding blank lines, and each surrounding
   * whitespace removed).
   */
  constructor(title: string, lines: string[]) {
    if (title.includes("[") || title.includes("]")) {
      throw TtblFormatError.badTitle(title);
    }
    this.title = title;
    this.lines = lines;
  }

  /**
   * Returns an array of sections parsed from the text. Does not check for the
   * correct version, but will throw a {@link TtblFormatError} if a section is
   * empty or contains illegal characters in the title.
   * @param text The text.
   */
  static parseSections(text: string): TtblFileSection[] {
    // Split the file into lines, removing empty lines, and trimming whitespace.
    const lines = lineify(text);

    const sections: TtblFileSection[] = [];
    let prevSectionStartIndex: number | null = null;

    // Intentionally loop one past the end of the number of lines...
    for (let i = 0; i <= lines.length; i++) {

      // If in the last loop (beyond the end of the file), or reached a header...
      if (i == lines.length || (lines[i].startsWith("[") && lines[i].endsWith("]"))) {

        // If a section was being tracked, you've found the end of it, so submit
        // it.
        if (prevSectionStartIndex != null) {
          const headerLine = lines[prevSectionStartIndex];

          const sectionHeader = headerLine.substring(1, headerLine.length - 1);
          const sectionLines = lines.slice(prevSectionStartIndex + 1, i);

          if (sectionLines.length == 0) {
            throw TtblFormatError.sectionEmpty(sectionHeader);
          }

          sections.push(new TtblFileSection(sectionHeader, sectionLines));
        }

        // And start tracking the next section (irrelevant for end of file, but
        // that's ok).
        prevSectionStartIndex = i;
      }
    }

    return sections;
  }

  /**
   * Returns the contents of this timetable section as a .ttbl compliant string.
   */
  write(): string {
    return `[${this.title}]\n${this.lines.join("\n")}`;
  }
}
