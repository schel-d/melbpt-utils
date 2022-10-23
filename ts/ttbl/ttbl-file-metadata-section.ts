import { TtblFormatError } from "./error";
import { TtblFileSection } from "./ttbl-file-section";

export type Metadata = Record<string, string>;

/**
 * Like a {@link TtblFileSection}, but all lines must be in the format
 * "key: value". Used for the metadata at the top of each .ttbl file.
 */
export class TtblFileMetadataSection extends TtblFileSection {
  readonly data: Metadata;

  constructor(title: string, data: Metadata) {
    // Convert data back to text for base class's sake.
    super(title, Object.keys(data).map(k => `${k}: ${data[k]}`));
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
}
