/**
 * Returns the text split into lines, with empty lines removed, and whitespace
 * trimmed.
 * @param text The text.
 */
export function lineify(text: string): string[] {
  return splitTrim(text, "\n");
}

/**
 * Returns the text split into an array by a given delimiter, with empty lines
 * removed, and whitespace trimmed.
 * @example splitTrim("cat  ,dog,  crazy frog", ",") == ["cat", "dog", "crazy frog"]
 * @param text The text.
 */
export function splitTrim(text: string, delimiter: string): string[] {
  return text
    .split(delimiter)
    .map(s => s.trim())
    .filter(s => s.length != 0);
}
