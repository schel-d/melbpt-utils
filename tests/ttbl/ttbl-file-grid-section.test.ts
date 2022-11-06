import { TtblFormatError, TtblFileSection, TtblFileGridSection } from "../../src/_export";
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
    expect(grid).toEqual(test.obj);
  }

  for (const test of failing) {
    const section = TtblFileSection.parseSections(test.text)[0];
    expect(() => TtblFileGridSection.promote(section)).toThrow(TtblFormatError);
  }
});
