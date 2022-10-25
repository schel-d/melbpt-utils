import { LocalDate } from "../utils/local-date";
import { parseIntNull } from "../utils/num-utils";
import { TtblFormatError } from "./ttbl-format-error";
import { TtblFileSection } from "./ttbl-file-section";

export type Metadata = Record<string, string>;

/**
 * Like a {@link TtblFileSection}, but all lines must be in the format
 * "key: value". Used for the metadata at the top of each .ttbl file.
 */
export class TtblFileMetadataSection extends TtblFileSection {
  /**
   * The metadata found inside this section of the .ttbl file.
   */
  readonly data: Metadata;

  /**
   * Creates a {@link TtblFileMetadataSection}.
   * @param title The string inside the square brackets at the start of the
   * file, not including the square brackets themselves.
   * @param data The metadata found inside this section of the .ttbl file.
   */
  constructor(title: string, data: Metadata) {
    // Convert data back to text for base class's sake.
    super(title, toText(data));
    this.data = data;
  }

  /**
   * Converts the already parsed {@link TtblFileSection} into metadata section.
   * Throws {@link TtblFormatError} if this section doesn't comply to the
   * "key: value" format, or if there are duplicate keys.
   * @param section
   */
  static promote(section: TtblFileSection): TtblFileMetadataSection {
    const data: Metadata = {};

    section.lines.forEach(l => {
      // Split by ":". Each line should have exactly one ":".
      const split = l.split(":").map(x => x.trim());
      if (split.length != 2) {
        throw TtblFormatError.metadataBadSyntax(section.title, l);
      }

      // Make sure there is text before and after the ":".
      const key = split[0];
      const value = split[1];
      if (key.length < 1 || value.length < 1) {
        throw TtblFormatError.metadataBadSyntax(section.title, l);
      }

      // Make sure the key isn't already used.
      if (key in data) {
        throw TtblFormatError.metadataDuplicateKey(section.title, key);
      }

      data[key] = value;
    });

    return new TtblFileMetadataSection(section.title, data);
  }

  /**
   * Returns the value with the given key, or throws a {@link TtblFormatError}
   * if the key was not found.
   * @param key The key.
   */
  get(key: string): string {
    if (key in this.data) { return this.data[key]; }
    throw TtblFormatError.metadataMissingKey(this.title, key);
  }

  /**
   * Returns the value with the given key as a number, or throws a
   * {@link TtblFormatError} if the key was not found or value was not a number.
   * @param key The key.
   */
  getInt(key: string): number {
    const num = parseIntNull(this.get(key));
    if (num != null) { return num; }
    throw TtblFormatError.metadataKeyWrongType(this.title, key, "number");
  }

  /**
   * Returns the value with the given key as a {@link LocalDate}, or throws a
   * {@link TtblFormatError} if the key was not found or value was not a date.
   * @param key The key.
   * @param allowWildcard True if "*" is allowed (causes the function to return
   * null).
   */
  getDate(key: string, allowWildcard: false): LocalDate
  getDate(key: string, allowWildcard: true): LocalDate | null
  getDate(key: string, allowWildcard: boolean): LocalDate | null {
    const str = this.get(key);
    if (allowWildcard && str == "*") { return null; }

    try {
      return LocalDate.fromISO(str);
    }
    catch {
      throw TtblFormatError.metadataKeyWrongType(this.title, key, "date");
    }
  }

  /**
   * Returns the value with the given key as a number, or throws a
   * {@link TtblFormatError} if the key was not found or value was not a number.
   * @param key The key.
   */
  getEnum<T extends readonly string[]>(key: string, options: T): T[number] {
    const val = this.get(key);
    if (options.includes(val)) { return val; }
    throw TtblFormatError.metadataKeyWrongType(
      this.title, key, `enum[${options.join(", ")}]`
    );
  }
}

/**
 * Writes the metadata pairs into a .ttbl compliant array of strings (for the
 * lines field in the {@link TtblFileSection}).
 * @param data The metadata key-value pairs.
 */
function toText(data: Metadata) {
  return Object.keys(data).map(k => `${k}: ${data[k]}`);
}
