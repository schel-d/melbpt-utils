import { lineify } from "./utils";

/**
 * .ttbl files without this version number will be rejected.
 */
const requiredVersion = "2";

/**
 * .ttbl files without these at the start will be rejected.
 */
const requiredLines = [
  "[timetable]",
  `version: ${requiredVersion}`
];

/**
 * Throws a {@link TtblVersionError} if the .ttbl file is not a supported
 * version.
 * @param text The text inside the .ttbl file.
 */
export function throwIfUnsupportedVersion(text: string) {
  // Split the file into lines, removing empty lines, and trimming whitespace.
  const lines = lineify(text);

  if (lines.length < requiredLines.length) {
    throw new TtblVersionError(requiredVersion);
  }
  if (requiredLines.some((v, i) => lines[i] !== v)) {
    throw new TtblVersionError(requiredVersion);
  }
}

/**
 * The error object used when the timetable being read in is an unsupported
 * version.
 */
export class TtblVersionError extends Error {
  /**
   * Creates a {@link TtblVersionError}.
   * @param supportedVersion The version this file should be.
   */
  constructor(supportedVersion: string) {
    super(`Unsupported .ttbl version. Please use version "${supportedVersion}".`);
    this.name = "TtblVersionError";
  }
}
