import { BadIDError } from "../../ts/network/error";
import { toLineID } from "../../ts/network/line-id";

test("toLineID", () => {
  expect(() => toLineID(1)).not.toThrow(BadIDError);
  expect(() => toLineID(35)).not.toThrow(BadIDError);

  expect(() => toLineID(0)).toThrow(BadIDError);
  expect(() => toLineID(36)).toThrow(BadIDError);
  expect(() => toLineID(-1)).toThrow(BadIDError);
  expect(() => toLineID(99)).toThrow(BadIDError);
  expect(() => toLineID(35.01)).toThrow(BadIDError);
  expect(() => toLineID(0.3)).toThrow(BadIDError);
  expect(() => toLineID(3.5)).toThrow(BadIDError);
});