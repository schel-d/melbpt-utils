import { z } from "zod";
import { Line } from "./line";
import { Stop } from "./stop";

/**
 * Represents details about the entire transit network, i.e. the stops and
 * lines.
 */
export class Network {
  /**
   * A string representing the content in this object that can be used to
   * quickly determine if this is the latest data available. This is usually
   * the date of the data release, e.g. "2022-10-26".
   */
  readonly hash: string;

  /** The stops in the transit network. */
  readonly stops: Stop[];

  /** The lines in the transit network. */
  readonly lines: Line[];

  /** Zod schema for parsing from JSON. */
  static readonly json = z.object({
    hash: z.string(),
    stops: Stop.json.array(),
    lines: Line.json.array()
  }).transform(x => new Network(x.hash, x.stops, x.lines));

  /**
   * Creates a {@link Network}.
   * @param hash A string representing the content in this object that can be
   * used to quickly determine if this is the latest data available. This is
   * usually the date of the data release, e.g. "2022-10-26".
   * @param stops The stops in the transit network.
   * @param lines The lines in the transit network.
   */
  constructor(hash: string, stops: Stop[], lines: Line[]) {
    this.hash = hash;
    this.stops = stops;
    this.lines = lines;
  }
}
