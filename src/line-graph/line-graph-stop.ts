import { z } from "zod";
import { StopID, stopIDZodSchema } from "../network/stop-id";

/**
 * A stop in the {@link LineGraph}, with the option of showing it as express.
 */
export class LineGraphStop {
  /** The stop id. */
  readonly id: StopID;

  /** Whether or not to show it as express. */
  readonly isExpress: boolean;

  /** Zod schema for parsing from JSON. */
  static readonly json = z.object({
    id: stopIDZodSchema,
    isExpress: z.boolean()
  }).transform(x => new LineGraphStop(x.id, x.isExpress));

  /** Zod schema for parsing from JSON but only using raw types. */
  static readonly rawJson = z.object({
    id: z.number(),
    isExpress: z.boolean()
  });

  /**
   * Creates a {@link LineGraphStop}.
   * @param id The stop id.
   * @param isExpress Whether or not to show it as express.
   */
  constructor(id: StopID, isExpress: boolean) {
    this.id = id;
    this.isExpress = isExpress;
  }

  /** Convert to JSON object according to {@link LineGraphStop.rawJson}. */
  toJSON(): z.infer<typeof LineGraphStop.rawJson> {
    return {
      id: this.id,
      isExpress: this.isExpress
    };
  }
}
