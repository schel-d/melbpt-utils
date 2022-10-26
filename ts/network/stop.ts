import { z } from "zod";
import { Platform } from "./platform";
import { isStopID, StopID, toStopID } from "./stop-id";

/**
 * Represents a {@link Stop} on the transit network.
 */
export class Stop {
  /** The stop's unique ID number. */
  readonly id: StopID;

  /** The stop's name. */
  readonly name: string;

  /** Details about the platforms at this stop. */
  readonly platforms: Platform[];

  /** Alternative search tags, if any. */
  readonly tags: string[];

  /** The url for this stop. Becomes `"trainquery.com/${urlName}"`. */
  readonly urlName: string;

  /** Zod schema for parsing from JSON. */
  static readonly json = z.object({
    id: z.number().refine(x => isStopID(x)).transform(x => toStopID(x)),
    name: z.string(),
    platforms: Platform.json.array(),
    tags: z.string().array(),
    urlName: z.string()
  }).transform(x => new Stop(x.id, x.name, x.platforms, x.tags, x.urlName));

  /**
   * Creates a {@link Stop}.
   * @param id The stop's unique ID number.
   * @param name The stop's name.
   * @param platforms Details about the platforms at this stop.
   * @param tags Alternative search tags, if any.
   * @param urlName The url for this stop. Becomes
   * `"trainquery.com/${urlName}"`.
   */
  constructor(id: StopID, name: string, platforms: Platform[], tags: string[],
    urlName: string) {

    this.id = id;
    this.name = name;
    this.platforms = platforms;
    this.tags = tags;
    this.urlName = urlName;
  }
}
