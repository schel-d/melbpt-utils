import { readFileSync } from "fs";
import { TransitNetworkError } from "../../ts/network/error";
import { TransitNetwork } from "../../ts/network/transit-network";
import { obj01 } from "./data/obj01";

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
