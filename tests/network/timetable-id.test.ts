import { BadIDError } from "../../ts/utils/error";
import { toTimetableID } from "../../ts/timetable/timetable-id";

test("toTimetableID", () => {
  expect(() => toTimetableID(1)).not.toThrow(BadIDError);
  expect(() => toTimetableID(1295)).not.toThrow(BadIDError);

  expect(() => toTimetableID(0)).toThrow(BadIDError);
  expect(() => toTimetableID(1296)).toThrow(BadIDError);
  expect(() => toTimetableID(-1)).toThrow(BadIDError);
  expect(() => toTimetableID(2555)).toThrow(BadIDError);
  expect(() => toTimetableID(1295.01)).toThrow(BadIDError);
  expect(() => toTimetableID(0.3)).toThrow(BadIDError);
  expect(() => toTimetableID(3.5)).toThrow(BadIDError);
});
