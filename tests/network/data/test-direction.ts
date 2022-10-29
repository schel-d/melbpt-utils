import { Direction, toDirectionID, toStopID } from "../../../ts/_export";

/** Test regular constructor. */
const constructor01 = () => new Direction(
  toDirectionID("up"),
  "Catville",
  [
    toStopID(1),
    toStopID(2)
  ]
);

/** Can't have no stops */
const badConstructor01 = () => new Direction(
  toDirectionID("up"),
  "Catville",
  []
);

/** Can't have same stop twice */
const badConstructor02 = () => new Direction(
  toDirectionID("up"),
  "Catville",
  [
    toStopID(1),
    toStopID(2),
    toStopID(3),
    toStopID(1),
    toStopID(4)
  ]
);

export const passingConstructors = [
  constructor01
];

export const failingConstructors = [
  badConstructor01,
  badConstructor02
];
