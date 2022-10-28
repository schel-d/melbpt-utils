import { TimetableError } from "../../ts/timetable/timetable-error";
import { failingConstructors, passingConstructors } from "./test/test-timetable-entries";

test("constructor validation", () => {
  for (const test of passingConstructors) {
    expect(test).not.toThrow(TimetableError);
  }

  for (const test of failingConstructors) {
    expect(test).toThrow(TimetableError);
  }
});
