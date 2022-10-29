import { LookupError, TimetableError, toTimetableEntryIndex } from "../../ts/_export";
import { entries, entryBounds, failingConstructors, passingConstructors }
  from "./data/test-timetables";

test("constructor validation", () => {
  for (const test of passingConstructors) {
    expect(test).not.toThrow(TimetableError);
  }

  for (const test of failingConstructors) {
    expect(test).toThrow(TimetableError);
  }
});

test("getEntry/requireEntry", () => {
  for (const test of entries) {
    const entry = test.entry;
    const timetable = test.timetable;
    expect(timetable.getEntry(entry.index)).toStrictEqual(entry);
  }

  for (const test of entryBounds) {
    const timetable = test.timetable;
    const justInRange = toTimetableEntryIndex(test.numOfEntries - 1);
    const outOfRange = toTimetableEntryIndex(test.numOfEntries);

    expect(timetable.getEntry(justInRange)).not.toEqual(null);
    expect(timetable.getEntry(outOfRange)).toEqual(null);
    expect(() => timetable.requireEntry(justInRange)).not.toThrow(LookupError);
    expect(() => timetable.requireEntry(outOfRange)).toThrow(LookupError);
  }
});
