import { toDirectionID } from "../../ts/network/direction-id";
import { BadIDError } from "../../ts/utils/error";

test("toDirectionID", () => {
  expect(() => toDirectionID("fine")).not.toThrow(BadIDError);
  expect(() => toDirectionID("kebab-case")).not.toThrow(BadIDError);
  expect(() => toDirectionID("a-b-c-o-k")).not.toThrow(BadIDError);
  expect(() => toDirectionID("platform-9")).not.toThrow(BadIDError);
  expect(() => toDirectionID("9a")).not.toThrow(BadIDError);

  expect(() => toDirectionID("--not-kebab-case")).toThrow(BadIDError);
  expect(() => toDirectionID("-illegal")).toThrow(BadIDError);
  expect(() => toDirectionID("nope--")).toThrow(BadIDError);
  expect(() => toDirectionID("nope--nope")).toThrow(BadIDError);
  expect(() => toDirectionID("hate-it-")).toThrow(BadIDError);
});
