import { TtblVersionError, TtblFormatError, TtblFile } from "../../src/_export";
import { failing, failingVersion, passing, writing } from "./data/test-ttbls";

test("parse", () => {
  for (const test of passing) {
    const ttbl = TtblFile.parse(test.text);
    expect(ttbl).toEqual(test.obj);
  }

  for (const test of failingVersion) {
    expect(() => TtblFile.parse(test.text)).toThrow(TtblVersionError);
  }

  for (const test of failing) {
    expect(() => TtblFile.parse(test.text)).toThrow(TtblFormatError);
  }
});

test("write", () => {
  for (const test of writing) {
    const text = test.obj.write();
    expect(text).toEqual(test.out);
  }
});
