import { Direction } from "./direction";
import {
  CityLoopPortal, CityLoopPortals, LineColor, LineColors, LineRouteType,
  LineRouteTypes, LineService, LineServices
} from "./line-enums";
import { z } from "zod";
import { isLineID, LineID, toLineID } from "./line-id";

/**
 * Represents a line on the transit network.
 */
export class Line {
  /** The line's unique ID. */
  readonly id: LineID;

  /** The line's name. */
  readonly name: string;

  /** The line's color. */
  readonly color: LineColor;

  /** The line's service type, e.g. suburban or regional. */
  readonly service: LineService;

  /** The route type, e.g. linear or city-loop. */
  readonly routeType: LineRouteType;

  /** Whether this line only operates for special events. */
  readonly specialEventsOnly: boolean;

  /** Alternative search tags. */
  readonly tags: string[];

  /** The city loop portal this line uses (if any). */
  readonly routeLoopPortal: CityLoopPortal | null;

  /** Details about the directions this line travels in. */
  readonly directions: Direction[];

  /** Zod schema for parsing from JSON. */
  static readonly json = z.object({
    id: z.number().refine(x => isLineID(x)).transform(x => toLineID(x)),
    name: z.string(),
    color: z.enum(LineColors),
    service: z.enum(LineServices),
    routeType: z.enum(LineRouteTypes),
    specialEventsOnly: z.boolean(),
    tags: z.string().array(),
    routeLoopPortal: z.enum(CityLoopPortals).optional(),
    directions: Direction.json.array()
  }).transform(x => new Line(
    x.id, x.name, x.color, x.service, x.routeType, x.specialEventsOnly, x.tags,
    x.routeLoopPortal ?? null, x.directions
  ));

  /**
   * Creates a {@link Line}.
   * @param id The line's unique ID.
   * @param name The line's name.
   * @param color The line's color.
   * @param service The line's service type, e.g. suburban or regional.
   * @param routeType The route type, e.g. linear or city-loop.
   * @param specialEventsOnly Whether this line only operates for special events.
   * @param tags Alternative search tags.
   * @param routeLoopPortal The city loop portal this line uses (if any).
   * @param directions Details about the directions this line travels in.
   */
  constructor(id: LineID, name: string, color: LineColor, service: LineService,
    routeType: LineRouteType, specialEventsOnly: boolean, tags: string[],
    routeLoopPortal: CityLoopPortal | null, directions: Direction[]) {

    this.id = id;
    this.name = name;
    this.color = color;
    this.service = service;
    this.routeType = routeType;
    this.specialEventsOnly = specialEventsOnly;
    this.tags = tags;
    this.routeLoopPortal = routeLoopPortal;
    this.directions = directions;
  }
}
