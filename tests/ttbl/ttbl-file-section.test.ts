import { TtblFileSection } from "../../ts/ttbl/ttbl-file-section";
import { TtblFormatError } from "../../ts/ttbl/ttbl-format-error";
import { failing, passing } from "./data/test-sections";

test("parseSections", () => {
  for (const test of passing) {
    const sections = TtblFileSection.parseSections(test.text);
    expect(sections).toEqual(test.obj);
  }

  for (const test of failing) {
    expect(() => TtblFileSection.parseSections(test.text)).toThrow(TtblFormatError);
  }
});