import { TimetableError } from "../../ts/_export";
import { network01 } from "./data/test-networks";
import { failing, passing } from "./data/test-timetables-validation";

test("validateTimetable", () => {
  const network = network01;

  for (const timetable of passing) {
    expect(() => timetable.validate(network)).not.toThrow(TimetableError);
  }

  for (const timetable of failing) {
    expect(() => timetable.validate(network)).toThrow(TimetableError);
  }
});
