import { DayOfWeek, TimeError, WeekdayRange } from "../../src/_export";

test("parse", () => {
  expect(() => WeekdayRange.parse("MTWTFSS")).not.toThrow(TimeError);
  expect(() => WeekdayRange.parse("MTWT___")).not.toThrow(TimeError);
  expect(() => WeekdayRange.parse("__W__SS")).not.toThrow(TimeError);
  expect(() => WeekdayRange.parse("_______")).not.toThrow(TimeError);

  expect(() => WeekdayRange.parse("___W__SS")).toThrow(TimeError);
  expect(() => WeekdayRange.parse("__W__SS_")).toThrow(TimeError);
  expect(() => WeekdayRange.parse("mtwtfss")).toThrow(TimeError);
});

test("toString", () => {
  expect(WeekdayRange.parse("MTWTFSS").toString()).toStrictEqual("MTWTFSS");
  expect(WeekdayRange.parse("MTWT___").toString()).toStrictEqual("MTWT___");
  expect(WeekdayRange.parse("__W__SS").toString()).toStrictEqual("__W__SS");
  expect(WeekdayRange.parse("_______").toString()).toStrictEqual("_______");
});

test("numOfDays", () => {
  expect(WeekdayRange.parse("MTWTFSS").numOfDays).toStrictEqual(7);
  expect(WeekdayRange.parse("M______").numOfDays).toStrictEqual(1);
  expect(WeekdayRange.parse("__W__SS").numOfDays).toStrictEqual(3);
  expect(WeekdayRange.parse("_______").numOfDays).toStrictEqual(0);
});

test("getDayOfWeekByIndex", () => {
  expect(WeekdayRange.parse("__W__SS").getDayOfWeekByIndex(0).codeName)
    .toStrictEqual("wed");
  expect(WeekdayRange.parse("__W__SS").getDayOfWeekByIndex(1).codeName)
    .toStrictEqual("sat");
  expect(WeekdayRange.parse("__W__SS").getDayOfWeekByIndex(2).codeName)
    .toStrictEqual("sun");

  expect(() => WeekdayRange.parse("__W__SS").getDayOfWeekByIndex(-1))
    .toThrow(TimeError);
  expect(() => WeekdayRange.parse("__W__SS").getDayOfWeekByIndex(1.3))
    .toThrow(TimeError);
  expect(() => WeekdayRange.parse("__W__SS").getDayOfWeekByIndex(3))
    .toThrow(TimeError);
});

test("includes", () => {
  expect(WeekdayRange.parse("__W__SS").includes(DayOfWeek.wed))
    .toStrictEqual(true);
  expect(WeekdayRange.parse("__W__SS").includes(DayOfWeek.sat))
    .toStrictEqual(true);
  expect(WeekdayRange.parse("__W__SS").includes(DayOfWeek.fri))
    .toStrictEqual(false);
});

test("indexOf", () => {
  expect(WeekdayRange.parse("__W__SS").indexOf(DayOfWeek.wed))
    .toStrictEqual(0);
  expect(WeekdayRange.parse("__W__SS").indexOf(DayOfWeek.sat))
    .toStrictEqual(1);
  expect(WeekdayRange.parse("__W__SS").indexOf(DayOfWeek.sun))
    .toStrictEqual(2);

  expect(() => WeekdayRange.parse("__W__SS").indexOf(DayOfWeek.fri))
    .toThrow(TimeError);
  expect(() => WeekdayRange.parse("__W__SS").indexOf(DayOfWeek.mon))
    .toThrow(TimeError);
});
