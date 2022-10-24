import { DateTime } from "luxon";
import { LocalTime } from "../../ts/utils/local-time";
import { TimeError } from "../../ts/utils/time-utils";

test("LocalTime rejects invalid times", () => {
  expect(() => new LocalTime(2 * 60 + 22)).not.toThrow(TimeError);

  expect(() => new LocalTime(NaN)).toThrow(TimeError);
  expect(() => new LocalTime(-1)).toThrow(TimeError);
  expect(() => new LocalTime(-20)).toThrow(TimeError);
  expect(() => new LocalTime(48 * 60)).toThrow(TimeError);
  expect(() => new LocalTime(48 * 60 + 10)).toThrow(TimeError);
  expect(() => new LocalTime(5.5)).toThrow(TimeError);
});

test("LocalTime interprets correct hour, minute, and isNextDay values", () => {
  expect(new LocalTime(2 * 60 + 22).hour).toStrictEqual(2);
  expect(new LocalTime(2 * 60 + 22).minute).toStrictEqual(22);
  expect(new LocalTime(2 * 60 + 22).isNextDay).toStrictEqual(false);
  expect(new LocalTime(45 * 60 + 59).hour).toStrictEqual(21);
  expect(new LocalTime(45 * 60 + 59).minute).toStrictEqual(59);
  expect(new LocalTime(45 * 60 + 59).isNextDay).toStrictEqual(true);
});

test("LocalTime parses correct hour, minute, and isNextDay values", () => {
  expect(LocalTime.parseWithMarker("2:22").hour).toStrictEqual(2);
  expect(LocalTime.parseWithMarker("2:22").minute).toStrictEqual(22);
  expect(LocalTime.parseWithMarker("2:22").isNextDay).toStrictEqual(false);
  expect(LocalTime.parseWithMarker(">21:59").hour).toStrictEqual(21);
  expect(LocalTime.parseWithMarker(">21:59").minute).toStrictEqual(59);
  expect(LocalTime.parseWithMarker(">21:59").isNextDay).toStrictEqual(true);
});

test("LocalTime converts to string correctly", () => {
  expect(LocalTime.parseWithMarker("2:22").toString(true))
    .toStrictEqual("02:22");
  expect(LocalTime.parseWithMarker("2:22").toString(false))
    .toStrictEqual("02:22");
  expect(LocalTime.parseWithMarker(">21:59").toString(true))
    .toStrictEqual(">21:59");
  expect(LocalTime.parseWithMarker(">21:59").toString(false))
    .toStrictEqual("21:59");
});

test("LocalTime converts to string correctly", () => {
  expect(LocalTime.fromLuxon(
    DateTime.local(2022, 10, 24, 4, 17, 29)
  ).toString(true)).toStrictEqual("04:17");
  expect(LocalTime.fromLuxon(
    DateTime.local(2022, 10, 24, 19, 59, 0)
  ).toString(true)).toStrictEqual("19:59");

  expect(LocalTime.fromLuxon(
    DateTime.utc(2022, 10, 24, 4, 17, 29)
  ).toString(true)).toStrictEqual("04:17");
  expect(LocalTime.fromLuxon(
    DateTime.utc(2022, 10, 24, 19, 59, 0)
  ).toString(true)).toStrictEqual("19:59");
});

test("LocalTime before/after comparisons work correctly", () => {
  const time = LocalTime.parseWithMarker("04:20");
  expect(time.isBefore(LocalTime.parseWithMarker("03:46")))
    .toStrictEqual(false);
  expect(time.isBefore(LocalTime.parseWithMarker("04:19")))
    .toStrictEqual(false);
  expect(time.isBefore(LocalTime.parseWithMarker("04:20")))
    .toStrictEqual(false);
  expect(time.isBefore(LocalTime.parseWithMarker("04:21")))
    .toStrictEqual(true);
  expect(time.isBefore(LocalTime.parseWithMarker("05:12")))
    .toStrictEqual(true);
  expect(time.isBefore(LocalTime.parseWithMarker(">03:46")))
    .toStrictEqual(true);

  expect(time.isAfter(LocalTime.parseWithMarker("04:20")))
    .toStrictEqual(false);
  expect(time.isAfter(LocalTime.parseWithMarker("04:19")))
    .toStrictEqual(true);

  expect(time.isBeforeOrEqual(LocalTime.parseWithMarker("04:20")))
    .toStrictEqual(true);
  expect(time.isAfterOrEqual(LocalTime.parseWithMarker("04:20")))
    .toStrictEqual(true);
});

test("LocalTime tomorrow and yesterday work correctly", () => {
  expect(() => LocalTime.parseWithMarker(">00:00").tomorrow())
    .toThrow(TimeError);
  expect(() => LocalTime.parseWithMarker(">05:32").tomorrow())
    .toThrow(TimeError);
  expect(() => LocalTime.parseWithMarker("08:19").yesterday())
    .toThrow(TimeError);
  expect(() => LocalTime.parseWithMarker("23:59").yesterday())
    .toThrow(TimeError);

  expect(LocalTime.parseWithMarker("00:00").tomorrow().toString(true))
    .toStrictEqual(">00:00");
  expect(LocalTime.parseWithMarker("23:59").tomorrow().toString(true))
    .toStrictEqual(">23:59");
  expect(LocalTime.parseWithMarker(">23:59").yesterday().toString(true))
    .toStrictEqual("23:59");
  expect(LocalTime.parseWithMarker(">00:00").yesterday().toString(true))
    .toStrictEqual("00:00");
});

test("LocalTime.startOfTomorrow is correct value", () => {
  expect(LocalTime.startOfTomorrow().toString(true))
    .toStrictEqual(">00:00");
});
