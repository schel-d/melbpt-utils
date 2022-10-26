import { readFileSync } from "fs";
import { TransitDataError } from "../../ts/network/error";
import { Network } from "../../ts/network/network";
import { obj01 } from "./data/obj01";

test("json parse", () => {
  const passingTests = [
    { file: "tests/network/data/text01.json", obj: obj01 }
  ];

  for (const test of passingTests) {
    const json = readFileSync(test.file, { encoding: "utf8" });
    expect(Network.json.parse(JSON.parse(json))).toEqual(test.obj);
  }

  const failingTests = [
    // Line with unknown stop ID.
    { file: "tests/network/data/badText01.json", errorType: TransitDataError }
  ];

  for (const test of failingTests) {
    const json = readFileSync(test.file, { encoding: "utf8" });
    expect(() => Network.json.parse(JSON.parse(json))).toThrow(test.errorType);
  }
});
