import { BadIDError } from "../../ts/utils/error";
import { toStopID } from "../../ts/network/stop-id";

test("toStopID", () => {
  expect(() => toStopID(1)).not.toThrow(BadIDError);
  expect(() => toStopID(9999)).not.toThrow(BadIDError);

  expect(() => toStopID(0)).toThrow(BadIDError);
  expect(() => toStopID(10000)).toThrow(BadIDError);
  expect(() => toStopID(-1)).toThrow(BadIDError);
  expect(() => toStopID(99999)).toThrow(BadIDError);
  expect(() => toStopID(35.01)).toThrow(BadIDError);
  expect(() => toStopID(0.3)).toThrow(BadIDError);
  expect(() => toStopID(3.5)).toThrow(BadIDError);
});
