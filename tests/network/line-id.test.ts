import { toLineID, BadIDError, base36ToLineID, lineIDToBase36 } from "../../src/_export";

test("toLineID", () => {
  expect(() => toLineID(1)).not.toThrow(BadIDError);
  expect(() => toLineID(35)).not.toThrow(BadIDError);
  expect(() => toLineID("1")).not.toThrow(BadIDError);
  expect(() => toLineID("35")).not.toThrow(BadIDError);
  expect(() => toLineID("0035")).not.toThrow(BadIDError);

  expect(() => toLineID(0)).toThrow(BadIDError);
  expect(() => toLineID(36)).toThrow(BadIDError);
  expect(() => toLineID("0")).toThrow(BadIDError);
  expect(() => toLineID("36")).toThrow(BadIDError);
  expect(() => toLineID("1a")).toThrow(BadIDError);
  expect(() => toLineID("cat")).toThrow(BadIDError);
  expect(() => toLineID(-1)).toThrow(BadIDError);
  expect(() => toLineID(99)).toThrow(BadIDError);
  expect(() => toLineID(35.01)).toThrow(BadIDError);
  expect(() => toLineID(0.3)).toThrow(BadIDError);
  expect(() => toLineID(3.5)).toThrow(BadIDError);

  expect(base36ToLineID("1")).toEqual(1);
  expect(base36ToLineID("z")).toEqual(35);
  expect(() => base36ToLineID("0")).toThrow(BadIDError);
  expect(() => base36ToLineID("10")).toThrow(BadIDError);

  expect(lineIDToBase36(base36ToLineID("1"))).toEqual("1");
  expect(lineIDToBase36(base36ToLineID("z"))).toEqual("z");
});
