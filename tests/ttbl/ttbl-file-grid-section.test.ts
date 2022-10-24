import { TtblFormatError } from "../../ts/ttbl/error";
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
      text: "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place 03:04   17:52 >1:02",
      result: new TtblFileGridSection(
        "up",
        new WeekDayRange(true, true, true, true, true, true, true),
        [{
          stop: 1,
          comment: "place",
          times: [
            new LocalTime(3 * 60 + 4),
            new LocalTime(17 * 60 + 52),
            new LocalTime(25 * 60 + 2),
          ]
        }]
      )
    },
    {
      text: "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place-place 03:04 >1:02",
      result: new TtblFileGridSection(
        "up",
        new WeekDayRange(true, true, true, true, true, true, true),
        [{
          stop: 1,
          comment: "place-place",
          times: [
            new LocalTime(3 * 60 + 4),
            new LocalTime(25 * 60 + 2),
          ]
        }]
      )
    },
    {
      text: "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place 03:04\n0002 place 03:06",
      result: new TtblFileGridSection(
        "up",
        new WeekDayRange(true, true, true, true, true, true, true),
        [
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
              new LocalTime(3 * 60 + 6)
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
    "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place place 03:04 >1:02",
    "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place",
    "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place 03:04\n0002 other 03:06 04:06",
    "[timetable]\nversion: 2\n[up, MTWTFSS]\n0001 place 03:04\n0001 other 03:06",
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
