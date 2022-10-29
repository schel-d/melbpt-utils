import { readFileSync } from "fs";
import { TransitNetwork, TransitNetworkError } from "../../ts/_export";
import { obj01 } from "./data/test-networks";

test("json parse", () => {
  const passingTests = [
    { file: "tests/network/data/text01.json", obj: obj01 }
  ];

  for (const test of passingTests) {
    const json = readFileSync(test.file, { encoding: "utf8" });
    expect(TransitNetwork.json.parse(JSON.parse(json))).toEqual(test.obj);
  }

  const failingTests = [
    // Line with unknown stop ID.
    { file: "tests/network/data/badText01.json", errorType: TransitNetworkError },
    // Duplicate line ID.
    { file: "tests/network/data/badText02.json", errorType: TransitNetworkError },
    // Duplicate stop ID.
    { file: "tests/network/data/badText03.json", errorType: TransitNetworkError }
  ];

  for (const test of failingTests) {
    const json = readFileSync(test.file, { encoding: "utf8" });
    expect(() => TransitNetwork.json.parse(JSON.parse(json))).toThrow(test.errorType);
  }
});
