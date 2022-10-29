import {
  Direction, Line, Platform, Stop, toDirectionID, toLineID, toPlatformID,
  toStopID, TransitNetwork
} from "../../../ts/_export";

export const network01 = new TransitNetwork(
  "2022-10-26",
  [
    new Stop(
      toStopID(1),
      "Catville",
      [
        new Platform(toPlatformID("1"), "1"),
        new Platform(toPlatformID("2"), "2"),
      ],
      [],
      "catville"
    ),
    new Stop(
      toStopID(2),
      "Dogtown",
      [
        new Platform(toPlatformID("1"), "1"),
      ],
      [],
      "dogtown"
    ),
    new Stop(
      toStopID(3),
      "Ratlands",
      [
        new Platform(toPlatformID("1a"), "1A"),
        new Platform(toPlatformID("1b"), "1B"),
      ],
      [
        "mouseton"
      ],
      "ratlands"
    ),
  ],
  [
    new Line(
      toLineID(1),
      "Catville",
      "cyan",
      "suburban",
      "linear",
      false,
      [
        "ratlands",
        "mouseton"
      ],
      null,
      [
        new Direction(
          toDirectionID("up"),
          "Ratlands",
          [
            toStopID(1), toStopID(2), toStopID(3)
          ]
        ),
        new Direction(
          toDirectionID("down"),
          "Catville",
          [
            toStopID(3), toStopID(2), toStopID(1)
          ]
        )
      ]
    ),
    new Line(
      toLineID(2),
      "Dogtown",
      "cyan",
      "suburban",
      "linear",
      false,
      [
        "ratlands",
        "mouseton"
      ],
      null,
      [
        new Direction(
          toDirectionID("up"),
          "Ratlands",
          [
            toStopID(2), toStopID(3)
          ]
        ),
        new Direction(
          toDirectionID("down"),
          "Dogtown",
          [
            toStopID(3), toStopID(2)
          ]
        )
      ]
    )
  ]
);
