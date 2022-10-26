import { TtblFormatError } from "../../ts/ttbl/ttbl-format-error";
import { TtblFileSection } from "../../ts/ttbl/ttbl-file-section";
import { TtblFileMetadataSection }
  from "../../ts/ttbl/ttbl-file-metadata-section";
import { failing, failingProperties, objProperties, passing, passingProperties }
  from "./data/test-metadata";

test("promote", () => {
  for (const test of passing) {
    const section = TtblFileSection.parseSections(test.text)[0];
    const grid = TtblFileMetadataSection.promote(section);
    expect(grid).toEqual(test.obj);
  }

  for (const test of failing) {
    const section = TtblFileSection.parseSections(test.text)[0];
    expect(() => TtblFileMetadataSection.promote(section)).toThrow(TtblFormatError);
  }
});

test("get/getInt/getDate/getEnum", () => {
  const metadata = objProperties;

  for (const test of passingProperties) {
    expect(test.func(metadata)).toStrictEqual(test.value);
  }
  for (const test of failingProperties) {
    expect(() => test.func(metadata)).toThrow(TtblFormatError);
  }
});
