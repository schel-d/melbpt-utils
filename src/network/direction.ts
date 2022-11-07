import { areUnique } from "schel-d-utils";
import { z } from "zod";
import { DirectionID, isDirectionID, toDirectionID } from "./direction-id";
import { TransitNetworkError } from "./error";
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

  /** Zod schema for parsing from JSON but only using raw types. */
  static readonly rawJson = z.object({
    id: z.string(),
    name: z.string(),
    stops: z.number().array()
  });

  /**
   * Creates a {@link Direction}.
   * @param id The direction's unique ID (unique for this line at least).
   * @param name The direction's name.
   * @param stops The stops in this direction, in stopping order. This array
   * cannot have fewer than 2 elements.
   */
  constructor(id: DirectionID, name: string, stops: StopID[]) {
    if (stops.length < 2) {
      throw TransitNetworkError.notEnoughStops(id);
    }

    // Check that all stop ID's in the array are unique.
    if (!areUnique(stops)) {
      throw TransitNetworkError.duplicateStopsInDirection(id);
    }

    this.id = id;
    this.name = name;
    this.stops = stops;
  }

  /** Convert to JSON object according to {@link Direction.rawJson}. */
  toJSON(): z.infer<typeof Direction.rawJson> {
    return {
      id: this.id,
      name: this.name,
      stops: this.stops,
    };
  }
}
