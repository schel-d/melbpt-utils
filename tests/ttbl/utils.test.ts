import { lineify } from "../../ts/ttbl/utils";

test("lineify splits a string into lines", () => {
  expect(lineify(""))
    .toStrictEqual([]);

  expect(lineify("the cat goes meow"))
    .toStrictEqual(["the cat goes meow"]);

  expect(lineify("the cat goes meow\nthe dog goes woof"))
    .toStrictEqual(["the cat goes meow", "the dog goes woof"]);

  expect(lineify("the cat goes meow\n\nthe dog goes woof"))
    .toStrictEqual(["the cat goes meow", "the dog goes woof"]);

  expect(lineify("\nthe cat goes meow\nthe dog goes woof"))
    .toStrictEqual(["the cat goes meow", "the dog goes woof"]);

  expect(lineify("\nthe cat goes meow\nthe dog goes woof\n"))
    .toStrictEqual(["the cat goes meow", "the dog goes woof"]);

  expect(lineify("\nthe cat goes meow\n\nthe dog goes woof\n"))
    .toStrictEqual(["the cat goes meow", "the dog goes woof"]);

  expect(lineify("\nthe cat\n goes meow\n  \n the dog goes woof \n"))
    .toStrictEqual(["the cat", "goes meow", "the dog goes woof"]);
});
