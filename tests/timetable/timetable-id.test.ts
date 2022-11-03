import { toTimetableID, BadIDError, base36ToTimetableID, timetableIDToBase36 }
  from "../../ts/_export";

test("toTimetableID", () => {
  expect(() => toTimetableID(1)).not.toThrow(BadIDError);
  expect(() => toTimetableID(1295)).not.toThrow(BadIDError);
  expect(() => toTimetableID("1")).not.toThrow(BadIDError);
  expect(() => toTimetableID("1295")).not.toThrow(BadIDError);
  expect(() => toTimetableID("001295")).not.toThrow(BadIDError);

  expect(() => toTimetableID(0)).toThrow(BadIDError);
  expect(() => toTimetableID(1296)).toThrow(BadIDError);
  expect(() => toTimetableID("0")).toThrow(BadIDError);
  expect(() => toTimetableID("1296")).toThrow(BadIDError);
  expect(() => toTimetableID("1a")).toThrow(BadIDError);
  expect(() => toTimetableID("cat")).toThrow(BadIDError);
  expect(() => toTimetableID(-1)).toThrow(BadIDError);
  expect(() => toTimetableID(2555)).toThrow(BadIDError);
  expect(() => toTimetableID(1295.01)).toThrow(BadIDError);
  expect(() => toTimetableID(0.3)).toThrow(BadIDError);
  expect(() => toTimetableID(3.5)).toThrow(BadIDError);

  expect(base36ToTimetableID("01")).toEqual(1);
  expect(base36ToTimetableID("zz")).toEqual(1295);
  expect(() => base36ToTimetableID("0")).toThrow(BadIDError);
  expect(() => base36ToTimetableID("100")).toThrow(BadIDError);

  expect(timetableIDToBase36(base36ToTimetableID("01"))).toEqual("01");
  expect(timetableIDToBase36(base36ToTimetableID("zz"))).toEqual("zz");
});
