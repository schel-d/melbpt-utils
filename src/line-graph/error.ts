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

  /**
   * The terminus or origin of a LineGraph cannot be express.
   */
  static terminusOrOriginCannotBeExpress(): BadLineGraphError {
    return new BadLineGraphError(
      `The terminus or origin of a LineGraph cannot be express`
    );
  }

  /**
   * Some section of the line graph has too few stops.
   */
  static notEnoughStops(): BadLineGraphError {
    return new BadLineGraphError(
      `Some section of the line graph has too few stops`
    );
  }
}
