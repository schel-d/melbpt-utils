import { TtblFormatError } from "./error";
import { throwIfUnsupportedVersion } from "./ttbl-version";
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
   * file, not including the square brackets themselves.
   * @param lines The text found inside this section, between this section's
   * title and the next section (excluding blank lines, and each surrounding
   * whitespace removed).
   */
  constructor(title: string, lines: string[]) {
    this.title = title;
    this.lines = lines;
  }

  /**
   * Returns an array of sections parsed from the text. Throws a
   * TtblVersionError if the .ttbl version is unsupported.
   * @param text The text.
   */
  static parseSections(text: string): TtblFileSection[] {
    // Throw a TtblVersionError if the version is not supported.
    throwIfUnsupportedVersion(text);

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
}
