import { TimetableError } from "../../src/_export";
import { failingConstructors, passingConstructors } from "./data/test-timetable-sections";

test("constructor validation", () => {
  for (const test of passingConstructors) {
    expect(test).not.toThrow(TimetableError);
  }

  for (const test of failingConstructors) {
    expect(test).toThrow(TimetableError);
  }
});
