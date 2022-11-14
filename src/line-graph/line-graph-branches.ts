import { z } from "zod";
import { BadLineGraphError } from "./error";
import { LineGraphStop } from "./line-graph-stop";

/**
 * The details about the branches on this line.
 */
export class LineGraphBranches {
  /** The stops on the first branch. */
  readonly branchAStops: LineGraphStop[];

  /** The stops on the second branch. */
  readonly branchBStops: LineGraphStop[];

  /** Zod schema for parsing from JSON. */
  static readonly json = z.object({
    branchAStops: LineGraphStop.json.array().min(1),
    branchBStops: LineGraphStop.json.array().min(1),
  }).transform(x => new LineGraphBranches(x.branchAStops, x.branchBStops));

  /** Zod schema for parsing from JSON but only using raw types. */
  static readonly rawJson = z.object({
    branchAStops: LineGraphStop.rawJson.array(),
    branchBStops: LineGraphStop.rawJson.array(),
  });

  /**
   * Creates a {@link LineGraphBranches}.
   * @param branchAStops The stops on the first branch.
   * @param branchBStops The stops on the second branch.
   */
  constructor(branchAStops: LineGraphStop[], branchBStops: LineGraphStop[]) {
    // Each branch must have one stop.
    if (branchAStops.length < 1 || branchBStops.length < 1) {
      throw BadLineGraphError.notEnoughStops();
    }

    // The termini cannot be express.
    const lastStopBranchA = branchAStops[branchAStops.length - 1];
    const lastStopBranchB = branchBStops[branchBStops.length - 1];
    if (lastStopBranchA.isExpress || lastStopBranchB.isExpress) {
      throw BadLineGraphError.terminusOrOriginCannotBeExpress();
    }

    this.branchAStops = branchAStops;
    this.branchBStops = branchBStops;
  }

  /** Convert to JSON object according to {@link LineGraphBranches.rawJson}. */
  toJSON(): z.infer<typeof LineGraphBranches.rawJson> {
    return {
      branchAStops: this.branchAStops.map(x => x.toJSON()),
      branchBStops: this.branchBStops.map(x => x.toJSON()),
    };
  }
}
