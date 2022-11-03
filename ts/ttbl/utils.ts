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

/**
 * Returns the same string is kebab-case form. Returned string is guaranteed to
 * only contain a-z, numbers, and dashes. All other symbols such as dollar
 * signs, and accented characters will be removed (for better or for worse).
 * @param text The string to convert.
 */
export function kebabify(text: string): string {
  return text
    // Make lowercase.
    .toLowerCase()

    // Replace spaces with dashes.
    .replace(/\s/g, "-")

    // Remove all other non ASCII letters.
    .replace(/[^a-z0-9-]/g, "");
}
