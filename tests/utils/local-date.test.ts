import { DateTime } from "luxon";
import { LocalDate } from "../../ts/utils/local-date";
import { TimeError } from "../../ts/utils/time-utils";

test("constructor validation", () => {
  expect(() => new LocalDate(2020, 2, 29)).not.toThrow(TimeError);

  expect(() => new LocalDate(2021, 2, 29)).toThrow(TimeError);
  expect(() => new LocalDate(2022, 13, 1)).toThrow(TimeError);
  expect(() => new LocalDate(2022, NaN, 4)).toThrow(TimeError);
});

test("fromISO", () => {
  expect(LocalDate.fromISO("2020-02-29").year).toStrictEqual(2020);
  expect(LocalDate.fromISO("2020-02-29").month).toStrictEqual(2);
  expect(LocalDate.fromISO("2020-02-29").day).toStrictEqual(29);

  expect(() => LocalDate.fromISO("2021-02-29")).toThrow(TimeError);
  expect(() => LocalDate.fromISO("2022-13-01")).toThrow(TimeError);
});

test("fromLuxon", () => {
  expect(LocalDate.fromLuxon(DateTime.utc(2020, 2, 29)).year)
    .toStrictEqual(2020);
  expect(LocalDate.fromLuxon(DateTime.utc(2020, 2, 29)).month)
    .toStrictEqual(2);
  expect(LocalDate.fromLuxon(DateTime.utc(2020, 2, 29)).day)
    .toStrictEqual(29);
  expect(LocalDate.fromLuxon(DateTime.local(2020, 2, 29)).year)
    .toStrictEqual(2020);
  expect(LocalDate.fromLuxon(DateTime.local(2020, 2, 29)).month)
    .toStrictEqual(2);
  expect(LocalDate.fromLuxon(DateTime.local(2020, 2, 29)).day)
    .toStrictEqual(29);

  expect(() => LocalDate.fromLuxon(DateTime.local(2021, 2, 29)))
    .toThrow(TimeError);
  expect(() => LocalDate.fromLuxon(DateTime.local(2022, 13, 1)))
    .toThrow(TimeError);
});

test("toISO", () => {
  expect(new LocalDate(2022, 10, 24).toISO()).toStrictEqual("2022-10-24");
});

test("isBefore, isAfter, isBeforeOrEqual, and isAfterOrEqual", () => {
  expect(new LocalDate(2022, 10, 24).isBefore(new LocalDate(2021, 10, 30)))
    .toStrictEqual(false);
  expect(new LocalDate(2022, 10, 24).isBefore(new LocalDate(2022, 8, 30)))
    .toStrictEqual(false);
  expect(new LocalDate(2022, 10, 24).isBefore(new LocalDate(2022, 10, 23)))
    .toStrictEqual(false);
  expect(new LocalDate(2022, 10, 24).isBefore(new LocalDate(2022, 10, 24)))
    .toStrictEqual(false);
  expect(new LocalDate(2022, 10, 24).isBefore(new LocalDate(2022, 10, 25)))
    .toStrictEqual(true);
  expect(new LocalDate(2022, 10, 24).isBefore(new LocalDate(2023, 10, 22)))
    .toStrictEqual(true);

  expect(new LocalDate(2022, 10, 24).isAfter(new LocalDate(2022, 10, 24)))
    .toStrictEqual(false);
  expect(new LocalDate(2022, 10, 25).isAfter(new LocalDate(2022, 10, 24)))
    .toStrictEqual(true);

  expect(new LocalDate(2022, 10, 24).isBeforeOrEqual(new LocalDate(2022, 10, 24)))
    .toStrictEqual(true);
  expect(new LocalDate(2022, 10, 23).isBeforeOrEqual(new LocalDate(2022, 10, 24)))
    .toStrictEqual(true);
  expect(new LocalDate(2022, 10, 24).isAfterOrEqual(new LocalDate(2022, 10, 24)))
    .toStrictEqual(true);
  expect(new LocalDate(2022, 10, 25).isAfterOrEqual(new LocalDate(2022, 10, 24)))
    .toStrictEqual(true);
});

test("yesterday and tomorrow", () => {
  expect(new LocalDate(2022, 10, 24).tomorrow().toISO())
    .toStrictEqual("2022-10-25");
  expect(new LocalDate(2022, 12, 31).tomorrow().toISO())
    .toStrictEqual("2023-01-01");
  expect(new LocalDate(2023, 1, 1).tomorrow().toISO())
    .toStrictEqual("2023-01-02");
  expect(new LocalDate(2022, 10, 24).yesterday().toISO())
    .toStrictEqual("2022-10-23");
  expect(new LocalDate(2022, 12, 31).yesterday().toISO())
    .toStrictEqual("2022-12-30");
  expect(new LocalDate(2023, 1, 1).yesterday().toISO())
    .toStrictEqual("2022-12-31");
});
