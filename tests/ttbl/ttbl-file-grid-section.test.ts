import { TtblFormatError } from "../../ts/ttbl/ttbl-format-error";
import { TtblFileSection } from "../../ts/ttbl/ttbl-file-section";
import { TtblFileGridSection } from "../../ts/ttbl/ttbl-file-grid-section";
import { LocalTime } from "../../ts/utils/local-time";
import { WeekDayRange } from "../../ts/utils/week-day-range";

test("TtblFileGridSection.promote promotes correctly", () => {
  type PassingConfig = {
    text: string,
    result: TtblFileGridSection,
  }
  const passing: PassingConfig[] = [
    {
      text: "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place 03:04 04:04\n0002 " +
        "place 03:06 -\n0003 place 03:08 04:08",
      result: new TtblFileGridSection(
        "up",
        new WeekDayRange(true, true, true, true, true, true, true),
        [
          {
            stop: 1,
            comment: "place",
            times: [
              new LocalTime(3 * 60 + 4),
              new LocalTime(4 * 60 + 4)
            ]
          },
          {
            stop: 2,
            comment: "place",
            times: [
              new LocalTime(3 * 60 + 6),
              null
            ]
          },
          {
            stop: 3,
            comment: "place",
            times: [
              new LocalTime(3 * 60 + 8),
              new LocalTime(4 * 60 + 8)
            ]
          }
        ]
      )
    },
    {
      text: "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place-ville " +
        "03:04 12:47 >01:59\n0002 somewhere 03:06 13:04 >03:58",
      result: new TtblFileGridSection(
        "up",
        new WeekDayRange(true, true, true, true, true, true, true),
        [
          {
            stop: 1,
            comment: "place-ville",
            times: [
              new LocalTime(3 * 60 + 4),
              new LocalTime(12 * 60 + 47),
              new LocalTime(25 * 60 + 59)
            ]
          },
          {
            stop: 2,
            comment: "somewhere",
            times: [
              new LocalTime(3 * 60 + 6),
              new LocalTime(13 * 60 + 4),
              new LocalTime(27 * 60 + 58)
            ]
          }
        ]
      )
    }
  ];
  for (const test of passing) {
    const section = TtblFileSection.parseSections(test.text)[1];
    expect(TtblFileGridSection.promote(section)).toEqual(test.result);
  }

  const failing = [
    "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place place 03:04 >1:02\n" +
    "0002 place 03:04 >1:02",
    "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place place 03:04 >1:02\n" +
    "0002 place disgrace 03:04 >1:02",
    "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place 0002 disgrace",
    "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place 03:04\n0002 other 03:06 04:06",
    "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place 03:04\n0001 other 03:06",
    "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place 04:04\n0002 other 03:06",
    "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place >02:04\n0002 other 03:06",
  ];
  for (const text of failing) {
    const section = TtblFileSection.parseSections(text)[1];
    expect(() => TtblFileGridSection.promote(section)).toThrow(TtblFormatError);
  }
});

test("Cannot create TtblFileGridSection with jagged rows", () => {
  expect(() => {
    new TtblFileGridSection("up", WeekDayRange.parse("MTWTFSS"), [
      {
        stop: 1,
        comment: "place",
        times: [
          new LocalTime(3 * 60 + 4)
        ]
      },
      {
        stop: 2,
        comment: "place",
        times: [
          new LocalTime(3 * 60 + 6),
          new LocalTime(3 * 60 + 8)
        ]
      }
    ]);
  }).toThrow(TtblFormatError);
  expect(() => {
    new TtblFileGridSection("up", WeekDayRange.parse("MTWTFSS"), [
      {
        stop: 1,
        comment: "place",
        times: [
          new LocalTime(3 * 60 + 4),
          new LocalTime(4 * 60 + 4)
        ]
      },
      {
        stop: 2,
        comment: "place",
        times: [
          new LocalTime(3 * 60 + 6)
        ]
      }
    ]);
  }).toThrow(TtblFormatError);
});
