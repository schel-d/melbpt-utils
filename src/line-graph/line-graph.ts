import { z } from "zod";
import { BadLineGraphError } from "./error";
import { LineGraphBranches } from "./line-graph-branches";
import { LineGraphCityLoop } from "./line-graph-city-loop";
import { LineGraphStop } from "./line-graph-stop";

/**
 * The data structure of what to draw in a line diagram for a particular line.
 */
export class LineGraph {
  /**
   * The stops (after the loop but before the fork, if either are present) to
   * show on the diagram.
   */
  readonly stops: LineGraphStop[];

  /** Details about how to show the city loop, if at all. */
  readonly loop: LineGraphCityLoop | null;

  /** Details about how to show the branches on this line, if at all. */
  readonly branches: LineGraphBranches | null;

  /**
   * Unless null, all stops before this one will be shown semi-transparent. If
   * a loop or branch is present, this must be null.
   */
  readonly firstOpaqueStopIndex: number | null;

  /** Zod schema for parsing from JSON. */
  static readonly json = z.object({
    stops: LineGraphStop.json.array().min(1),
    loop: LineGraphCityLoop.json.nullable(),
    branches: LineGraphBranches.json.nullable(),
    firstOpaqueStopIndex: z.number().nullable()
  }).transform(x => new LineGraph(
    x.stops, x.loop, x.branches, x.firstOpaqueStopIndex
  ));

  /** Zod schema for parsing from JSON but only using raw types. */
  static readonly rawJson = z.object({
    stops: LineGraphStop.rawJson.array(),
    loop: LineGraphCityLoop.rawJson.nullable(),
    branches: LineGraphBranches.rawJson.nullable(),
    firstOpaqueStopIndex: z.number().nullable()
  });

  /**
   * Creates a {@link LineGraph}.
   * @param stops The stops (after the loop but before the fork, if either are
   * present) to show on the diagram.
   * @param loop Details about how to show the city loop, if at all.
   * @param branches Details about how to show the branches on this line, if at
   * all.
   */
  constructor(stops: LineGraphStop[], loop: LineGraphCityLoop | null,
    branches: LineGraphBranches | null, firstOpaqueStopIndex: number | null) {

    // If the line is linear, you need two stops.
    if (loop == null && branches == null && stops.length < 2) {
      throw BadLineGraphError.notEnoughStops();
    }

    // Otherwise you only need 1 stop (the loop or fork will contribute the
    // other stops, and if you have both you need at least 1 stop in-between).
    if (stops.length < 1) {
      throw BadLineGraphError.notEnoughStops();
    }

    // The origin cannot be express. If there's a city loop then it's not the
    // origin is it? So it's fine.
    if (loop == null && stops[0].isExpress) {
      throw BadLineGraphError.terminusOrOriginCannotBeExpress();
    }

    // Only completely linear line graphs can have transparent stops.
    if ((loop != null || branches != null) && firstOpaqueStopIndex != null) {
      throw BadLineGraphError.transparentStopsUnavailable();
    }

    // Make sure the index is in range. 0 is valid for all stops opaque (regular
    // behaviour) and the value can be equal to the number to stops to make all
    // stops transparent.
    if (firstOpaqueStopIndex != null && (!Number.isInteger(firstOpaqueStopIndex)
      || firstOpaqueStopIndex < 0 || firstOpaqueStopIndex >= stops.length)) {
      throw BadLineGraphError.badFirstOpaqueStopIndex();
    }

    this.stops = stops;
    this.loop = loop;
    this.branches = branches;
    this.firstOpaqueStopIndex = firstOpaqueStopIndex;
  }

  /** Convert to JSON object according to {@link LineGraph.rawJson}. */
  toJSON(): z.infer<typeof LineGraph.rawJson> {
    return {
      stops: this.stops.map(x => x.toJSON()),
      loop: this.loop?.toJSON() ?? null,
      branches: this.branches?.toJSON() ?? null,
      firstOpaqueStopIndex: this.firstOpaqueStopIndex
    };
  }
}
