import { TransitNetwork } from "../network/transit-network";
import { Timetable } from "./timetable";
import { TimetableError } from "./timetable-error";

/**
 * Checks the line exixts, each direction present exists on the line, and every
 * entry stops correctly according to the direction. Throws a
 * {@link TimetableError} if the timetable is invalid.
 * @param network Transit network information.
 */
export function validateTimetable(timetable: Timetable, network: TransitNetwork) {
  // Ensure line exists.
  const line = network.getLine(timetable.line);
  if (line == null) {
    throw TimetableError.lineDoesntExist(timetable.line);
  }

  for (const section of timetable.sections) {
    // Ensure direction of this grid exists.
    const direction = line.getDirection(section.direction);
    if (direction == null) {
      throw TimetableError.directionDoesntExist(section.direction, line.id);
    }

    for (const entry of section.entries) {
      // Check that the entry doesn't contain any stops that aren't on this
      // direction, and that it always stops in order.
      const stopsOrder = entry.times.map(r => r.stop);
      const directionOrder = direction.stops.filter(d => stopsOrder.includes(d));
      if (stopsOrder.some((s, i) => directionOrder[i] != s)) {
        throw TimetableError.directionIncorrectStops(direction.id, line.id);
      }
    }
  }
}
