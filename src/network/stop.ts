import { z } from "zod";
import { LookupError } from "../utils/error";
import { TransitNetworkError } from "./error";
import { Platform } from "./platform";
import { PlatformID } from "./platform-id";
import { isStopID, StopID, toStopID } from "./stop-id";

/**
 * Represents a {@link Stop} on the transit network.
 */
export class Stop {
  /** The stop's unique ID number. */
  readonly id: StopID;

  /** The stop's name. */
  readonly name: string;

  /**
   * Details about the platforms at this stop. This array must contain at least
   * 1 element.
   */
  readonly platforms: Platform[];

  /** Alternative search tags, if any. */
  readonly tags: string[];

  /** The url for this stop. Becomes `"trainquery.com/${urlName}"`. */
  readonly urlName: string;

  /** Zod schema for parsing from JSON. */
  static readonly json = z.object({
    id: z.number().refine(x => isStopID(x)).transform(x => toStopID(x)),
    name: z.string(),
    platforms: Platform.json.array().min(1),
    tags: z.string().array(),
    urlName: z.string()
  }).transform(x => new Stop(x.id, x.name, x.platforms, x.tags, x.urlName));

  /** Zod schema for parsing from JSON but only using raw types. */
  static readonly rawJson = z.object({
    id: z.number(),
    name: z.string(),
    platforms: Platform.rawJson.array(),
    tags: z.string().array(),
    urlName: z.string()
  });

  /**
   * Creates a {@link Stop}.
   * @param id The stop's unique ID number.
   * @param name The stop's name.
   * @param platforms Details about the platforms at this stop. This array must
   * contain at least 1 element.
   * @param tags Alternative search tags, if any.
   * @param urlName The url for this stop. Becomes
   * `"trainquery.com/${urlName}"`.
   */
  constructor(id: StopID, name: string, platforms: Platform[], tags: string[],
    urlName: string) {

    if (platforms.length < 1) {
      throw TransitNetworkError.noPlatforms(id);
    }

    // Check that two platforms don't have the same ID.
    const uniquePlatformIDsCount = new Set(platforms.map(p => p.id)).size;
    if (uniquePlatformIDsCount < platforms.length) {
      throw TransitNetworkError.duplicatePlatforms(id);
    }

    this.id = id;
    this.name = name;
    this.platforms = platforms;
    this.tags = tags;
    this.urlName = urlName;
  }

  /**
   * Returns the platform with the given id, or null.
   * @param id The id.
   */
  getPlatform(id: PlatformID): Platform | null {
    return this.platforms.find(d => d.id == id) ?? null;
  }

  /**
   * Returns the platform with the given id, or throws a {@link LookupError}.
   * @param id The id.
   */
  requirePlatform(id: PlatformID): Platform {
    const platform = this.getPlatform(id);
    if (platform != null) { return platform; }
    throw LookupError.platformNotFound(id);
  }

  /** Convert to JSON object according to {@link Stop.rawJson}. */
  toJSON(): z.infer<typeof Stop.rawJson> {
    return {
      id: this.id,
      name: this.name,
      platforms: this.platforms.map(p => p.toJSON()),
      tags: this.tags,
      urlName: this.urlName
    };
  }
}
