import {
  Direction, Line, Platform, Stop, toDirectionID, toLineID, toPlatformID,
  toStopID, TransitNetwork
} from "../../../src/_export";

export const network01 = new TransitNetwork(
  "2022-10-26",
  [
    new Stop(
      toStopID(244),
      "Seymour",
      [
        new Platform(toPlatformID("1"), "1"),
      ],
      [],
      "seymour"
    ),
    new Stop(
      toStopID(268),
      "Tallarook",
      [
        new Platform(toPlatformID("1"), "1"),
      ],
      [],
      "tallarook"
    ),
    new Stop(
      toStopID(40),
      "Broadmeadows",
      [
        new Platform(toPlatformID("1"), "1"),
      ],
      [],
      "broadmeadows"
    ),
    new Stop(
      toStopID(96),
      "Essendon",
      [
        new Platform(toPlatformID("1"), "1"),
      ],
      [],
      "essendon"
    ),
    new Stop(
      toStopID(253),
      "Southern Cross",
      [
        new Platform(toPlatformID("1"), "1"),
      ],
      [],
      "southerncross"
    ),
  ],
  [
    new Line(
      toLineID(3),
      "Albury",
      "purple",
      "regional",
      "linear",
      false,
      [],
      null,
      [
        new Direction(
          toDirectionID("albury-up"),
          "Southern Cross",
          [
            toStopID(244), toStopID(268), toStopID(40), toStopID(96), toStopID(253)
          ]
        ),
        new Direction(
          toDirectionID("albury-down"),
          "Seymour",
          [
            toStopID(253), toStopID(96), toStopID(40), toStopID(268), toStopID(244)
          ]
        )
      ]
    )
  ]
);
