import { TransitNetworkError } from "../../ts/_export";
import { failingConstructors, passingConstructors } from "./data/test-lines";

test("constructor validation", () => {
  for (const test of passingConstructors) {
    expect(test).not.toThrow(TransitNetworkError);
  }

  for (const test of failingConstructors) {
    expect(test).toThrow(TransitNetworkError);
  }
});
