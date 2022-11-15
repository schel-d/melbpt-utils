import { areUnique } from "schel-d-utils";
import { z } from "zod";
import { LookupError } from "../utils/error";
import { TransitNetworkError } from "./error";
import { Platform } from "./platform";
import { PlatformID } from "./platform-id";
import { StopID, stopIDZodSchema } from "./stop-id";

/**
 * Represents a {@link Stop} on the transit network.
 */
export class Stop<PlatformType extends Platform = Platform> {
  /** The stop's unique ID number. */
  readonly id: StopID;

  /** The stop's name. */
  readonly name: string;

  /**
   * Details about the platforms at this stop. This array must contain at least
   * 1 element.
   */
  readonly platforms: PlatformType[];

  /** Alternative search tags, if any. */
  readonly tags: string[];

  /** The url for this stop. Becomes `"trainquery.com/${urlName}"`. */
  readonly urlName: string;

  /** The ticketing zones this stop is inside. */
  readonly zones: string[];

  /** Zod schema for parsing from JSON. */
  static readonly json = z.object({
    id: stopIDZodSchema,
    name: z.string(),
    platforms: Platform.json.array().min(1),
    tags: z.string().array(),
    urlName: z.string(),
    zones: z.string().array()
  }).transform(x => new Stop(x.id, x.name, x.platforms, x.tags, x.urlName, x.zones));

  /** Zod schema for parsing from JSON but only using raw types. */
  static readonly rawJson = z.object({
    id: z.number(),
    name: z.string(),
    platforms: Platform.rawJson.array(),
    tags: z.string().array(),
    urlName: z.string(),
    zones: z.string().array()
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
  constructor(id: StopID, name: string, platforms: PlatformType[], tags: string[],
    urlName: string, zones: string[]) {

    if (platforms.length < 1) {
      throw TransitNetworkError.noPlatforms(id);
    }

    // Check that two platforms don't have the same ID.
    if (!areUnique(platforms, (a, b) => a.id == b.id)) {
      throw TransitNetworkError.duplicatePlatforms(id);
    }

    this.id = id;
    this.name = name;
    this.platforms = platforms;
    this.tags = tags;
    this.urlName = urlName;
    this.zones = zones;
  }

  /**
   * Returns the platform with the given id, or null.
   * @param id The id.
   */
  getPlatform(id: PlatformID): PlatformType | null {
    return this.platforms.find(d => d.id == id) ?? null;
  }

  /**
   * Returns the platform with the given id, or throws a {@link LookupError}.
   * @param id The id.
   */
  requirePlatform(id: PlatformID): PlatformType {
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
      urlName: this.urlName,
      zones: this.zones
    };
  }
}
