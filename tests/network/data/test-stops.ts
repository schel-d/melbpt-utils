import { Platform } from "../../../ts/network/platform";
import { toPlatformID } from "../../../ts/network/platform-id";
import { Stop } from "../../../ts/network/stop";
import { toStopID } from "../../../ts/network/stop-id";

/** Test regular constructor. */
const constructor01 = () => new Stop(
  toStopID(1),
  "Catville",
  [
    new Platform(toPlatformID("1"), "1a")
  ],
  [],
  "catville"
);

/** Can't have no platforms. */
const badConstructor01 = () => new Stop(
  toStopID(1),
  "Catville",
  [],
  [],
  "catville"
);

/** Can't have multiple platforms with same ID. */
const badConstructor02 = () => new Stop(
  toStopID(1),
  "Catville",
  [
    new Platform(toPlatformID("1"), "1a"),
    new Platform(toPlatformID("1"), "1b")
  ],
  [],
  "catville"
);

export const passingConstructors = [
  constructor01
];

export const failingConstructors = [
  badConstructor01,
  badConstructor02
];
