import { parseIntThrow, parseIntNull, posMod } from "../../ts/utils/num-utils";

test("parseIntThrow converts valid strings to integers", () => {
  expect(parseIntThrow("3")).toStrictEqual(3);
  expect(parseIntThrow("-3")).toStrictEqual(-3);
});

test("parseIntThrow rejects text with non-number characters", () => {
  expect(() => parseIntThrow("3a")).toThrow();
  expect(() => parseIntThrow("-3a")).toThrow();
});

test("parseIntThrow rejects text with decimals", () => {
  expect(() => parseIntThrow("3.2")).toThrow();
  expect(() => parseIntThrow("-3.4")).toThrow();
  expect(() => parseIntThrow("0.0")).toThrow();
});

test("parseIntNull converts valid strings to integers", () => {
  expect(parseIntNull("3")).toStrictEqual(3);
  expect(parseIntNull("-3")).toStrictEqual(-3);
});

test("parseIntNull rejects text with non-number characters", () => {
  expect(parseIntNull("3a")).toEqual(null);
  expect(parseIntNull("-3a")).toEqual(null);
});

test("parseIntNull rejects text with decimals", () => {
  expect(parseIntNull("3.2")).toEqual(null);
  expect(parseIntNull("-3.4")).toEqual(null);
  expect(parseIntNull("0.0")).toEqual(null);
});

test("posMod calculates correct answer for positive numbers", () => {
  expect(posMod(0, 4)).toStrictEqual(0);
  expect(posMod(1, 4)).toStrictEqual(1);
  expect(posMod(2, 4)).toStrictEqual(2);
  expect(posMod(3, 4)).toStrictEqual(3);
  expect(posMod(4, 4)).toStrictEqual(0);
  expect(posMod(5, 4)).toStrictEqual(1);
  expect(posMod(6, 4)).toStrictEqual(2);
  expect(posMod(7, 4)).toStrictEqual(3);
  expect(posMod(8, 4)).toStrictEqual(0);
});

test("posMod calculates correct answer for negative numbers", () => {
  expect(posMod(-8, 4)).toStrictEqual(0);
  expect(posMod(-7, 4)).toStrictEqual(1);
  expect(posMod(-6, 4)).toStrictEqual(2);
  expect(posMod(-5, 4)).toStrictEqual(3);
  expect(posMod(-4, 4)).toStrictEqual(0);
  expect(posMod(-3, 4)).toStrictEqual(1);
  expect(posMod(-2, 4)).toStrictEqual(2);
  expect(posMod(-1, 4)).toStrictEqual(3);
  expect(posMod(0, 4)).toStrictEqual(0);
});

test("posMod calculates correct answer for decimal positive numbers", () => {
  expect(posMod(8.000, 4)).toStrictEqual(0);
  expect(posMod(7.999, 4)).toBeCloseTo(3.999, 8);
  expect(posMod(0.5, 4)).toBeCloseTo(0.5, 8);
  expect(posMod(4.2, 4)).toBeCloseTo(0.2, 8);
  expect(posMod(4.001, 4)).toBeCloseTo(0.001, 8);
});

test("posMod calculates correct answer for decimal negative numbers", () => {
  expect(posMod(-4.000, 4)).toStrictEqual(0);
  expect(posMod(-3.999, 4)).toBeCloseTo(0.001, 8);
  expect(posMod(-4.1, 4)).toBeCloseTo(3.9, 8);
  expect(posMod(-2.2, 4)).toBeCloseTo(1.8, 8);
  expect(posMod(-0.001, 4)).toBeCloseTo(3.999, 8);
});
