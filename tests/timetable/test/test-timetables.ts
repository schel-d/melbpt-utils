import { toDirectionID } from "../../../ts/network/direction-id";
import { toLineID } from "../../../ts/network/line-id";
import { toStopID } from "../../../ts/network/stop-id";
import { Timetable } from "../../../ts/timetable/timetable";
import { TimetableEntryStop, TimetableEntryWithinSection }
  from "../../../ts/timetable/timetable-entry";
import { toTimetableEntryIndex } from "../../../ts/timetable/timetable-entry-index";
import { toTimetableID } from "../../../ts/timetable/timetable-id";
import { TimetableSection } from "../../../ts/timetable/timetable-section";
import { LocalDate } from "../../../ts/utils/local-date";
import { LocalTime } from "../../../ts/utils/local-time";
import { WeekdayRange } from "../../../ts/utils/week-day-range";

/** Test regular constructor. */
const constructor01 = () => new Timetable(
  toTimetableID(1),
  toLineID(1),
  new LocalDate(2022, 10, 28),
  "main",
  null,
  null,
  [
    new TimetableSection(
      toDirectionID("up"),
      WeekdayRange.parse("MTWT___"),
      toTimetableEntryIndex(1),
      [
        new TimetableEntryWithinSection([
          new TimetableEntryStop(toStopID(1), LocalTime.fromTime(1, 20)),
          new TimetableEntryStop(toStopID(2), LocalTime.fromTime(1, 23))
        ])
      ]
    )
  ]
);

/** Must have at least one section. */
const badConstructor01 = () => new Timetable(
  toTimetableID(1),
  toLineID(1),
  new LocalDate(2022, 10, 28),
  "main",
  null,
  null,
  []
);

export const passingConstructors = [
  constructor01
];

export const failingConstructors = [
  badConstructor01
];
