import { TtblVersionError } from "../../ts/ttbl/error";
import { TtblFileSection } from "../../ts/ttbl/ttbl-file-section";

test("TtblFileSection.parseSections parses correctly", () => {
  expect(() => TtblFileSection.parseSections("[timetable]\nversion: 3"))
    .toThrow(TtblVersionError);

  expect(TtblFileSection.parseSections(
    "[timetable]\nversion: 2"
  )).toEqual([
    new TtblFileSection("timetable", [
      "version: 2"
    ])
  ]);

  expect(TtblFileSection.parseSections(
    "\n[timetable]\nversion: 2\n\n[summit, whatever]\nsome text\nand more \n " +
    "and a lil bit more!\n"
  )).toEqual([
    new TtblFileSection("timetable", [
      "version: 2"
    ]),
    new TtblFileSection("summit, whatever", [
      "some text", "and more", "and a lil bit more!"
    ])
  ]);
});
