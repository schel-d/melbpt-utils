import { Timetable, TtblFile } from "../../src/_export";
import { network01 } from "./data/test-networks";
import { passing, writing } from "./data/test-timetables";

test("parse", () => {
  for (const test of passing) {
    const ttbl = TtblFile.parse(test.text);
    const timetable = Timetable.fromTtbl(ttbl);
    expect(timetable).toEqual(test.obj);
  }
});

test("write", () => {
  const network = network01;

  for (const test of writing) {
    const ttbl = TtblFile.fromTimetable(test.obj, network);
    expect(ttbl.write()).toEqual(test.out);
  }
});
