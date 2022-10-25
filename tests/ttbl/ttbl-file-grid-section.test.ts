import { TtblFormatError } from "../../ts/ttbl/ttbl-format-error";
import { TtblFileSection } from "../../ts/ttbl/ttbl-file-section";
import { TtblFileGridSection } from "../../ts/ttbl/ttbl-file-grid-section";
import { failing, failingConstructors, passing } from "./data/test-grids";

test("constructor validation", () => {
  for (const test of failingConstructors) {
    expect(test).toThrow(TtblFormatError);
  }
});

test("promote", () => {
  for (const test of passing) {
    const section = TtblFileSection.parseSections(test.text)[0];
    const grid = TtblFileGridSection.promote(section);
    expect(grid).toEqual(test.grid);
  }

  for (const test of failing) {
    const section = TtblFileSection.parseSections(test.text)[0];
    expect(() => TtblFileGridSection.promote(section)).toThrow(TtblFormatError);
  }
});
