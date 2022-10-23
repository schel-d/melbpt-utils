import { TtblVersionError } from "./error";
import { lineify } from "./utils";

const requiredVersion = "2";

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
