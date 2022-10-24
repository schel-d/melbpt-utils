import { TtblFileSection } from "../../ts/ttbl/ttbl-file-section";

test("TtblFileSection.parseSections parses correctly", () => {
  expect(TtblFileSection.parseSections(
    "[irrelevant]\nbacon: stuff"
  )).toEqual([
    new TtblFileSection("irrelevant", [
      "bacon: stuff"
    ])
  ]);

  expect(TtblFileSection.parseSections(
    "\n[multiple]\nsections: now?\n\n[summit, whatever]\nsome text\nand more \n " +
    "and a lil bit more!\n"
  )).toEqual([
    new TtblFileSection("multiple", [
      "sections: now?"
    ]),
    new TtblFileSection("summit, whatever", [
      "some text", "and more", "and a lil bit more!"
    ])
  ]);
});
