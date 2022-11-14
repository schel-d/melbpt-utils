import { z } from "zod";
import { CityLoopPortal, CityLoopPortals } from "../network/city-loop";

export const CityLoopDirections = ["clockwise", "anticlockwise"] as const;

/** A possible direction around the city loop. */
export type CityLoopDirection = typeof CityLoopDirections[number];

/**
 * The details about the city loop on this line diagram. At present, stops
 * within the loop section here cannot be shown as express. This is fine because
 * the line diagrams for actual services will draw their service as linear (for
 * now at least).
 */
export class LineGraphCityLoop {
  /** Which city loop portal this line uses. */
  readonly portal: CityLoopPortal;

  /** The usual running direction around the loop for this line, if any. */
  readonly direction: CityLoopDirection | null;

  /** Zod schema for parsing from JSON. */
  static readonly json = z.object({
    portal: z.enum(CityLoopPortals),
    direction: z.enum(CityLoopDirections).nullable()
  }).transform(x => new LineGraphCityLoop(x.portal, x.direction));

  /** Zod schema for parsing from JSON but only using raw types. */
  static readonly rawJson = z.object({
    portal: z.enum(CityLoopPortals),
    direction: z.enum(CityLoopDirections).nullable()
  });

  /**
   * Creates a {@link LineGraphCityLoop}.
   * @param portal Which city loop portal this line uses.
   * @param direction The usual running direction around the loop for this line,
   * if any.
   */
  constructor(portal: CityLoopPortal, direction: CityLoopDirection | null) {
    this.portal = portal;
    this.direction = direction;
  }

  /** Convert to JSON object according to {@link LineGraphCityLoop.rawJson}. */
  toJSON(): z.infer<typeof LineGraphCityLoop.rawJson> {
    return {
      portal: this.portal,
      direction: this.direction
    };
  }
}
