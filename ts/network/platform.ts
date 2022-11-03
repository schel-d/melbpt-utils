import { z } from "zod";
import { isPlatformID, PlatformID, toPlatformID } from "./platform-id";

/**
 * Represents a platform at a particular stop on the network.
 */
export class Platform {
  /** The platform's unique ID (unique to its stop at least). */
  readonly id: PlatformID;

  /** The name of the platform. */
  readonly name: string;

  /** Zod schema for parsing from JSON. */
  static readonly json = z.object({
    id: z.string().refine(x => isPlatformID(x)).transform(x => toPlatformID(x)),
    name: z.string()
  }).transform(x => new Platform(x.id, x.name));

  /** Zod schema for parsing from JSON but only using raw types. */
  static readonly rawJson = z.object({
    id: z.string(),
    name: z.string()
  });

  /**
   * Creates a {@link Platform}.
   * @param id The platform's unique ID (unique to its stop at least).
   * @param name The name of the platform.
   */
  constructor(id: PlatformID, name: string) {
    this.id = id;
    this.name = name;
  }

  /** Convert to JSON object according to {@link Platform.rawJson}. */
  toJSON(): z.infer<typeof Platform.rawJson> {
    return {
      id: this.id,
      name: this.name
    };
  }
}
