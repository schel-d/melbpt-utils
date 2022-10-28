import { TransitNetworkError } from "../../ts/network/error";
import { failingConstructors, passingConstructors } from "./data/test-direction";

test("constructor validation", () => {
  for (const test of passingConstructors) {
    expect(test).not.toThrow(TransitNetworkError);
  }

  for (const test of failingConstructors) {
    expect(test).toThrow(TransitNetworkError);
  }
});
