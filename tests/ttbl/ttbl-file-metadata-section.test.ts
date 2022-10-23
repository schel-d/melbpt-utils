import { TtblFormatError } from "../../ts/ttbl/error";
import { TtblFileSection } from "../../ts/ttbl/ttbl-file-section";
import { Metadata, TtblFileMetadataSection }
  from "../../ts/ttbl/ttbl-file-metadata-section";

test("TtblFileMetadataSection.promote promotes correctly", () => {
  const passing: { text: string, result: Metadata }[] = [
    {
      text: "[timetable]\nversion: 2",
      result: { "version": "2" },
    },
    {
      text: "[timetable]\nversion: 2\nkey: value",
      result: { "version": "2", "key": "value" },
    },
    {
      text: "[timetable]\nversion: 2\nkey:value",
      result: { "version": "2", "key": "value" }
    },
    {
      text: "[timetable]\nversion: 2\nkey: value with a space",
      result: { "version": "2", "key": "value with a space" },
    }
  ];

  for (const test of passing) {
    const section = TtblFileSection.parseSections(test.text)[0];
    expect(TtblFileMetadataSection.promote(section))
      .toEqual(new TtblFileMetadataSection("timetable", test.result));
  }

  const failing = [
    "[timetable]\nversion: 2\nkey:: value",
    "[timetable]\nversion: 2\nkey: value:",
    "[timetable]\nversion: 2\nkey: value\nkey: value",
    "[timetable]\nversion: 2\nkey: value\nkey: value2",
    "[timetable]\nversion: 2\n:key",
    "[timetable]\nversion: 2\nkey:",
    "[timetable]\nversion: 2\ntext"
  ];

  for (const text of failing) {
    const section = TtblFileSection.parseSections(text)[0];
    expect(() => TtblFileMetadataSection.promote(section))
      .toThrow(TtblFormatError);
  }
});
