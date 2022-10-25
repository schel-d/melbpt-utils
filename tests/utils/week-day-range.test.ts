import { WeekDayRange } from "../../ts/utils/week-day-range";
import { TimeError } from "../../ts/utils/time-utils";
import { DayOfWeek } from "../../ts/utils/day-of-week";

test("parse", () => {
  expect(() => WeekDayRange.parse("MTWTFSS")).not.toThrow(TimeError);
  expect(() => WeekDayRange.parse("MTWT___")).not.toThrow(TimeError);
  expect(() => WeekDayRange.parse("__W__SS")).not.toThrow(TimeError);
  expect(() => WeekDayRange.parse("_______")).not.toThrow(TimeError);

  expect(() => WeekDayRange.parse("___W__SS")).toThrow(TimeError);
  expect(() => WeekDayRange.parse("__W__SS_")).toThrow(TimeError);
  expect(() => WeekDayRange.parse("mtwtfss")).toThrow(TimeError);
});

test("toString", () => {
  expect(WeekDayRange.parse("MTWTFSS").toString()).toStrictEqual("MTWTFSS");
  expect(WeekDayRange.parse("MTWT___").toString()).toStrictEqual("MTWT___");
  expect(WeekDayRange.parse("__W__SS").toString()).toStrictEqual("__W__SS");
  expect(WeekDayRange.parse("_______").toString()).toStrictEqual("_______");
});

test("numOfDays", () => {
  expect(WeekDayRange.parse("MTWTFSS").numOfDays).toStrictEqual(7);
  expect(WeekDayRange.parse("M______").numOfDays).toStrictEqual(1);
  expect(WeekDayRange.parse("__W__SS").numOfDays).toStrictEqual(3);
  expect(WeekDayRange.parse("_______").numOfDays).toStrictEqual(0);
});

test("getDayOfWeekByIndex", () => {
  expect(WeekDayRange.parse("__W__SS").getDayOfWeekByIndex(0).codeName)
    .toStrictEqual("wed");
  expect(WeekDayRange.parse("__W__SS").getDayOfWeekByIndex(1).codeName)
    .toStrictEqual("sat");
  expect(WeekDayRange.parse("__W__SS").getDayOfWeekByIndex(2).codeName)
    .toStrictEqual("sun");

  expect(() => WeekDayRange.parse("__W__SS").getDayOfWeekByIndex(-1))
    .toThrow(TimeError);
  expect(() => WeekDayRange.parse("__W__SS").getDayOfWeekByIndex(1.3))
    .toThrow(TimeError);
  expect(() => WeekDayRange.parse("__W__SS").getDayOfWeekByIndex(3))
    .toThrow(TimeError);
});

test("includes", () => {
  expect(WeekDayRange.parse("__W__SS").includes(DayOfWeek.wed))
    .toStrictEqual(true);
  expect(WeekDayRange.parse("__W__SS").includes(DayOfWeek.sat))
    .toStrictEqual(true);
  expect(WeekDayRange.parse("__W__SS").includes(DayOfWeek.fri))
    .toStrictEqual(false);
});

test("indexOf", () => {
  expect(WeekDayRange.parse("__W__SS").indexOf(DayOfWeek.wed))
    .toStrictEqual(0);
  expect(WeekDayRange.parse("__W__SS").indexOf(DayOfWeek.sat))
    .toStrictEqual(1);
  expect(WeekDayRange.parse("__W__SS").indexOf(DayOfWeek.sun))
    .toStrictEqual(2);

  expect(() => WeekDayRange.parse("__W__SS").indexOf(DayOfWeek.fri))
    .toThrow(TimeError);
  expect(() => WeekDayRange.parse("__W__SS").indexOf(DayOfWeek.mon))
    .toThrow(TimeError);
});
