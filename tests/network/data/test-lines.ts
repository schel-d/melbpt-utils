import { Direction, Line, toDirectionID, toLineID, toStopID } from "../../../ts/_export";

/** Test regular constructor. */
const constructor01 = () => new Line(
  toLineID(1),
  "Catville",
  "blue",
  "suburban",
  "linear",
  false,
  [],
  null,
  [
    new Direction(toDirectionID("up"), "Catville", [toStopID(1), toStopID(2)]),
    new Direction(toDirectionID("down"), "Dogton", [toStopID(3), toStopID(4)]),
  ]
);

/** Can't have no directions. */
const badConstructor01 = () => new Line(
  toLineID(1),
  "Catville",
  "blue",
  "suburban",
  "linear",
  false,
  [],
  null,
  []
);

/** Can't have multiple direction with same ID. */
const badConstructor02 = () => new Line(
  toLineID(1),
  "Catville",
  "blue",
  "suburban",
  "linear",
  false,
  [],
  null,
  [
    new Direction(toDirectionID("up"), "Catville", [toStopID(1), toStopID(2)]),
    new Direction(toDirectionID("up"), "Dogton", [toStopID(3), toStopID(4)]),
  ]
);

export const passingConstructors = [
  constructor01
];

export const failingConstructors = [
  badConstructor01,
  badConstructor02
];
