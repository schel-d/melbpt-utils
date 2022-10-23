/**
 * Returns the text split into lines, with empty lines removed, and whitespace
 * trimmed.
 * @param text The text.
 */
export function lineify(text: string): string[] {
  return text
    .split("\n")
    .map(s => s.trim())
    .filter(s => s.length != 0);
}
