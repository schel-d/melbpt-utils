import { kebabify, lineify } from "../../ts/_export";

test("lineify", () => {
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

test("kebabify", () => {
  expect(kebabify("")).toStrictEqual("");
  expect(kebabify("SCREAM")).toStrictEqual("scream");
  expect(kebabify("Dog food")).toStrictEqual("dog-food");
  expect(kebabify("It's about time!")).toStrictEqual("its-about-time");
  expect(kebabify("Söme fǔnky letţèrs")).toStrictEqual("sme-fnky-letrs");
});
