import {
  createDayId,
  getSortedEventsFromDay,
  positionEvents,
} from "../../utils/utils";
import EventElement from "../events/EventElement";
import { useDays } from "../../context/daysContext";

interface WeekColumnProps {
  date: Date;
}

function WeekColumn({ date }: WeekColumnProps) {
  const { days } = useDays();
  const id = createDayId(date);
  const events = getSortedEventsFromDay(id, days);

  return (
    <div
      key={id}
      className="calendar-event-column calendar-column"
      data-dayid={id}
    >
      {events &&
        positionEvents(events).map((event) => (
          <EventElement event={event} key={event.id} />
        ))}
    </div>
  );
}

export default WeekColumn;
