import { DateTime } from "luxon";
import { DayOfWeek } from "../../ts/utils/day-of-week";
import { TimeError } from "../../ts/utils/time-utils";

test("DayOfWeek daysSinceMonday must be an integer 0-6 inclusive", () => {
  expect(() => new DayOfWeek(0)).not.toThrow(TimeError);
  expect(() => new DayOfWeek(1)).not.toThrow(TimeError);
  expect(() => new DayOfWeek(6)).not.toThrow(TimeError);

  expect(() => new DayOfWeek(7)).toThrow(TimeError);
  expect(() => new DayOfWeek(-1)).toThrow(TimeError);

  expect(() => new DayOfWeek(6.1)).toThrow(TimeError);
  expect(() => new DayOfWeek(0.1)).toThrow(TimeError);
  expect(() => new DayOfWeek(5.2)).toThrow(TimeError);
  expect(() => new DayOfWeek(NaN)).toThrow(TimeError);
});

test("DayOfWeek gives correct name and codename", () => {
  expect(DayOfWeek.mon.name).toStrictEqual("Monday");
  expect(DayOfWeek.fri.name).toStrictEqual("Friday");
  expect(DayOfWeek.sun.name).toStrictEqual("Sunday");
  expect(DayOfWeek.mon.codeName).toStrictEqual("mon");
  expect(DayOfWeek.fri.codeName).toStrictEqual("fri");
  expect(DayOfWeek.sun.codeName).toStrictEqual("sun");
});

test("DayOfWeek gives correct value for isWeekend and isWeekday", () => {
  expect(DayOfWeek.wed.isWeekday).toStrictEqual(true);
  expect(DayOfWeek.sat.isWeekday).toStrictEqual(false);
  expect(DayOfWeek.sun.isWeekday).toStrictEqual(false);
  expect(DayOfWeek.wed.isWeekend).toStrictEqual(false);
  expect(DayOfWeek.sat.isWeekend).toStrictEqual(true);
  expect(DayOfWeek.sun.isWeekend).toStrictEqual(true);
});

test("DayOfWeek gives correct value for yesterday and tomorrow", () => {
  expect(DayOfWeek.mon.yesterday()).toStrictEqual(DayOfWeek.sun);
  expect(DayOfWeek.sat.yesterday()).toStrictEqual(DayOfWeek.fri);
  expect(DayOfWeek.sun.yesterday()).toStrictEqual(DayOfWeek.sat);
  expect(DayOfWeek.mon.tomorrow()).toStrictEqual(DayOfWeek.tue);
  expect(DayOfWeek.sat.tomorrow()).toStrictEqual(DayOfWeek.sun);
  expect(DayOfWeek.sun.tomorrow()).toStrictEqual(DayOfWeek.mon);
});

test("DayOfWeek gives correct value from luxon datetime", () => {
  expect(DayOfWeek.fromLuxon(DateTime.utc(2022, 10, 24)))
    .toStrictEqual(DayOfWeek.mon);
  expect(DayOfWeek.fromLuxon(DateTime.local(2022, 10, 24)))
    .toStrictEqual(DayOfWeek.mon);
});
