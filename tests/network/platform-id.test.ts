import { BadIDError } from "../../ts/network/error";
import { toPlatformID } from "../../ts/network/platform-id";

test("toPlatformID", () => {
  expect(() => toPlatformID("fine")).not.toThrow(BadIDError);
  expect(() => toPlatformID("kebab-case")).not.toThrow(BadIDError);
  expect(() => toPlatformID("a-b-c-o-k")).not.toThrow(BadIDError);
  expect(() => toPlatformID("platform-9")).not.toThrow(BadIDError);
  expect(() => toPlatformID("9a")).not.toThrow(BadIDError);

  expect(() => toPlatformID("--not-kebab-case")).toThrow(BadIDError);
  expect(() => toPlatformID("-illegal")).toThrow(BadIDError);
  expect(() => toPlatformID("nope--")).toThrow(BadIDError);
  expect(() => toPlatformID("nope--nope")).toThrow(BadIDError);
  expect(() => toPlatformID("hate-it-")).toThrow(BadIDError);
});
