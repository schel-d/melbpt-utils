import { StopID } from "../network/id";

/**
 * The error object used when errors occur reading a timetable file.
 */
export class TtblFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TtblFormatError";
  }

  /**
   * Section [`sectionTitle`] is empty.
   */
  static sectionEmpty(sectionTitle: string): TtblFormatError {
    return new TtblFormatError(
      `Section [${sectionTitle}] is empty`
    );
  }

  /**
   * Invalid metadata syntax in [`sectionTitle`] on line with "`text`".
   */
  static metadataBadSyntax(sectionTitle: string, text: string): TtblFormatError {
    return new TtblFormatError(
      `Invalid metadata syntax in [${sectionTitle}] on line with "${text}"`
    );
  }

  /**
   * Duplicate key in [`section.title`] metadata "`key`".
   */
  static metadataDuplicateKey(sectionTitle: string, key: string): TtblFormatError {
    return new TtblFormatError(
      `Duplicate key in [${sectionTitle}] metadata "${key}""`
    );
  }

  /**
   * Invalid grid syntax in [`sectionTitle`] on line with "`text`".
   */
  static gridBadSyntax(sectionTitle: string, text: string): TtblFormatError {
    return new TtblFormatError(
      `Invalid grid syntax in [${sectionTitle}] on line with "${text}"`
    );
  }

  /**
   * Duplicate stop in [`section.title`] grid "`stop`".
   */
  static gridDuplicateStop(sectionTitle: string, stop: StopID): TtblFormatError {
    return new TtblFormatError(
      `Duplicate stop in [${sectionTitle}] grid "${stop}""`
    );
  }

  /**
   * Grid is jagged in [`sectionTitle`].
   */
  static gridJagged(sectionTitle: string): TtblFormatError {
    return new TtblFormatError(
      `Grid is jagged in [${sectionTitle}]`
    );
  }
}

/**
 * The error object used when the timetable being read in is an unsupported
 * version.
 */
export class TtblVersionError extends Error {
  constructor(supportedVersion: string) {
    super(`Unsupported .ttbl version. Please use version "${supportedVersion}".`);
    this.name = "TtblVersionError";
  }
}
