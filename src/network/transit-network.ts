import { z } from "zod";
import { LookupError } from "../utils/error";
import { TransitNetworkError } from "./error";
import { Line } from "./line";
import { LineID } from "./line-id";
import { Stop } from "./stop";
import { StopID } from "./stop-id";

/**
 * Represents details about the entire transit network, i.e. the stops and
 * lines.
 */
export class TransitNetwork<StopType extends Stop = Stop, LineType extends Line = Line> {
  /**
   * A string representing the content in this object that can be used to
   * quickly determine if this is the latest data available. This is usually
   * the date of the data release, e.g. "2022-10-26".
   */
  readonly hash: string;

  /** The stops in the transit network. */
  readonly stops: StopType[];

  /** The lines in the transit network. */
  readonly lines: LineType[];

  /** Zod schema for parsing from JSON. */
  static readonly json = z.object({
    hash: z.string(),
    stops: Stop.json.array(),
    lines: Line.json.array()
  }).transform(x => new TransitNetwork(x.hash, x.stops, x.lines));

  /** Zod schema for parsing from JSON but only using raw types. */
  static readonly rawJson = z.object({
    hash: z.string(),
    stops: Stop.rawJson.array(),
    lines: Line.rawJson.array()
  });

  /**
   * Creates a {@link TransitNetwork}.
   * @param hash A string representing the content in this object that can be
   * used to quickly determine if this is the latest data available. This is
   * usually the date of the data release, e.g. "2022-10-26".
   * @param stops The stops in the transit network.
   * @param lines The lines in the transit network.
   */
  constructor(hash: string, stops: StopType[], lines: LineType[]) {
    // Check that two stops don't have the same ID.
    const uniqueStopIDsCount = new Set(stops.map(s => s.id)).size;
    if (uniqueStopIDsCount < stops.length) {
      throw TransitNetworkError.duplicateStops();
    }

    // Check that two lines don't have the same ID.
    const uniqueLineIDsCount = new Set(lines.map(l => l.id)).size;
    if (uniqueLineIDsCount < lines.length) {
      throw TransitNetworkError.duplicateLines();
    }

    // Check that all stop IDs used in the lines are present in the stops array.
    const stopIDs = stops.map(s => s.id);
    const stopIDsInLines = lines.map(l => l.stops).flat();
    if (stopIDsInLines.some(s => !stopIDs.includes(s))) {
      throw TransitNetworkError.linesHaveGhostStops();
    }

    this.hash = hash;
    this.stops = stops;
    this.lines = lines;
  }

  /**
   * Returns the line with the given id, or null.
   * @param id The id.
   */
  getLine(id: LineID): LineType | null {
    return this.lines.find(l => l.id == id) ?? null;
  }

  /**
   * Returns the line with the given id, or null.
   * @param id The id.
   */
  getStop(id: StopID): StopType | null {
    return this.stops.find(l => l.id == id) ?? null;
  }

  /**
   * Returns the line with the given id, or throws a {@link LookupError}.
   * @param id The id.
   */
  requireLine(id: LineID): LineType {
    const line = this.getLine(id);
    if (line != null) { return line; }
    throw LookupError.lineNotFound(id);
  }

  /**
   * Returns the stop with the given id, or throws a {@link LookupError}.
   * @param id The id.
   */
  requireStop(id: StopID): StopType {
    const stop = this.getStop(id);
    if (stop != null) { return stop; }
    throw LookupError.stopNotFound(id);
  }

  /** Convert to JSON object according to {@link TransitNetwork.rawJson}. */
  toJSON(): z.infer<typeof TransitNetwork.rawJson> {
    return {
      hash: this.hash,
      stops: this.stops.map(s => s.toJSON()),
      lines: this.lines.map(l => l.toJSON())
    };
  }
}
