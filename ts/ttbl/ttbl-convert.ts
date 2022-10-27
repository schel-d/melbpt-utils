import { Timetable } from "../timetable/timetable";
import { TimetableEntryStop, TimetableEntryWithinSection }
  from "../timetable/timetable-entry";
import { isTimetableEntryIndex } from "../timetable/timetable-entry-index";
import { TimetableError } from "../timetable/timetable-error";
import { TimetableSection } from "../timetable/timetable-section";
import { LocalTime } from "../utils/local-time";
import { TtblFile } from "./ttbl-file";

/**
 * Creates a {@link Timetable} from a {@link TtblFile}. Throws a
 * {@link TimetableError} if the ttbl content is invalid. Does not check that
 * the data in the resulting {@link Timetable} lines up with the
 * {@link TransitNetwork} information, so use {@link Timetable.validate} for
 * that.
 * @param ttbl The parsed .ttbl file.
 */
export function timetableFromTtbl(ttbl: TtblFile): Timetable {
  // Each grid section becomes a timetable section.
  const sections = [];
  let currIndex = 0;

  for (const grid of ttbl.grids) {
    // Map each service into a entry for the timetable section.
    const entries = [];
    for (let x = 0; x < grid.width; x++) {
      const times = grid.rows
        .map(r => {
          return { stop: r.stop, time: r.times[x] };
        })
        .filter(t => t.stop != null)
        .map(x => new TimetableEntryStop(x.stop, x.time as LocalTime));

      const entry = new TimetableEntryWithinSection(times);
      entries.push(entry);
    }

    // Individual sections make sure they're not overflowing, but if the last
    // section fits perfectly within the bounds, we'd now be one over, so check.
    if (!isTimetableEntryIndex(currIndex)) {
      throw TimetableError.tooManyServices();
    }

    const section = new TimetableSection(
      grid.direction, grid.wdr, currIndex, entries
    );
    sections.push(section);

    (currIndex as number) += section.entriesCount;
  }

  return new Timetable(
    ttbl.id, ttbl.line, ttbl.created, ttbl.type, ttbl.begins, ttbl.ends,
    sections
  );
}
