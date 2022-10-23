import { TtblVersionError } from "../../ts/ttbl/error";
import { throwIfUnsupportedVersion } from "../../ts/ttbl/ttbl-version";

test("throwIfUnsupportedVersion throws as appropriate", () => {
  expect(() => throwIfUnsupportedVersion(""))
    .toThrow(TtblVersionError);
  expect(() => throwIfUnsupportedVersion("[timetable]"))
    .toThrow(TtblVersionError);
  expect(() => throwIfUnsupportedVersion("[timetable]\nversion: 3"))
    .toThrow(TtblVersionError);
  expect(() => throwIfUnsupportedVersion("[timetable]\nversion: 3\nother stuff"))
    .toThrow(TtblVersionError);
  expect(() => throwIfUnsupportedVersion("[timetable]\nversion: 2"))
    .not.toThrow(TtblVersionError);
  expect(() => throwIfUnsupportedVersion("\n[timetable]\n\nversion: 2"))
    .not.toThrow(TtblVersionError);
  expect(() => throwIfUnsupportedVersion("[timetable]\nversion: 2\nother stuff"))
    .not.toThrow(TtblVersionError);
});
