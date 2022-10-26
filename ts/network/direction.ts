import { z } from "zod";
import { DirectionID, isDirectionID, toDirectionID } from "./direction-id";
import { TransitDataError } from "./error";
import { isStopID, StopID, toStopID } from "./stop-id";

/**
 * Represents a direction of travel on a particular line in the transit network.
 */
export class Direction {
  /** The direction's unique ID (unique for this line at least). */
  readonly id: DirectionID;

  /** The direction's name. */
  readonly name: string;

  /**
   * The stops in this direction, in stopping order. This array cannot have
   * fewer than 2 elements.
   */
  readonly stops: StopID[];

  /** Zod schema for parsing from JSON. */
  static readonly json = z.object({
    id: z.string().refine(x => isDirectionID(x)).transform(x => toDirectionID(x)),
    name: z.string(),
    stops: z.number().refine(x => isStopID(x)).transform(x => toStopID(x))
      .array().min(2)
  }).transform(x => new Direction(x.id, x.name, x.stops));

  /**
   * Creates a {@link Direction}.
   * @param id The direction's unique ID (unique for this line at least).
   * @param name The direction's name.
   * @param stops The stops in this direction, in stopping order. This array
   * cannot have fewer than 2 elements.
   */
  constructor(id: DirectionID, name: string, stops: StopID[]) {
    if (stops.length < 2) { throw TransitDataError.notEnoughStops(id); }

    this.id = id;
    this.name = name;
    this.stops = stops;
  }
}
