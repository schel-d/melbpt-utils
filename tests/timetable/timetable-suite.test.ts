import { Timetable, TimetableError, TimetableSuite, TtblFile } from "../../src/_export";
import { failingTexts, passingTexts } from "./data/test-timetable-suites";

test("constructor validation", () => {
  for (const test of passingTexts) {
    const timetables = test.map(t => Timetable.fromTtbl(TtblFile.parse(t)));
    expect(() => new TimetableSuite(timetables)).not.toThrow(TimetableError);
  }

  for (const test of failingTexts) {
    const timetables = test.map(t => Timetable.fromTtbl(TtblFile.parse(t)));
    expect(() => new TimetableSuite(timetables)).toThrow(TimetableError);
  }
});
