/**
 * The error object used when an attempt is made to create an invalid
 * {@link LineGraph}.
 */
export class BadLineGraphError extends Error {
  /**
   * Creates a {@link BadEnumError}.
   * @param message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "BadLineGraphError";
  }

  /** The terminus or origin of a LineGraph cannot be express. */
  static terminusOrOriginCannotBeExpress(): BadLineGraphError {
    return new BadLineGraphError(
      `The terminus or origin of a LineGraph cannot be express`
    );
  }

  /** A section of the line graph has too few stops. */
  static notEnoughStops(): BadLineGraphError {
    return new BadLineGraphError(
      `A section of the line graph has too few stops`
    );
  }

  /**
   * This line graph cannot have transparent stops because it has a loop or
   * branch.
   */
  static transparentStopsUnavailable(): BadLineGraphError {
    return new BadLineGraphError(
      `This line graph cannot have transparent stops because it has a loop ` +
      `or branch`
    );
  }

  /** The given index for the first opaque stop was out of bounds. */
  static badFirstOpaqueStopIndex(): BadLineGraphError {
    return new BadLineGraphError(
      `The given index for the first opaque stop was out of bounds`
    );
  }
}
