import { useEffect, useRef } from "react";
import { CSS, STRINGS, UNITS, dayOfWeeks } from "../../utils/consts";
import {
  createDayId,
  createWeekDates,
  eventTimeInMs,
  sortEvents,
} from "../../utils/utils";
import "./weekCalendar.css";
import { useDays } from "../../context/days";
import EventElement from "../events/EventElement";
import { Days, EventObject } from "../../types";

interface WeekCalendarProps {
  mainDate: Date;
}
const WeekCalendar = ({ mainDate }: WeekCalendarProps) => {
  const datesOfWeek = createWeekDates(mainDate);

  return (
    <>
      <WeekHeader datesOfWeek={datesOfWeek} />
      <WeekGrid datesOfWeek={datesOfWeek} />
    </>
  );
};

interface WeekHeaderProps {
  datesOfWeek: Date[];
}

const WeekHeader = ({ datesOfWeek }: WeekHeaderProps) => {
  return (
    <>
      <div className={`${CSS.H_CONTAINER} calendar-header`}>
        <div className="calendar-sidebar gmt-container small-text">
          {STRINGS.GMT}
        </div>
        <ol
          className={`${CSS.H_CONTAINER} column-container calendar-days-container`}
        >
          {datesOfWeek.map((date, i) => (
            <DateColumn date={date} key={createDayId(date)} />
          ))}
        </ol>
      </div>
    </>
  );
};

interface DateColumnProps {
  date: Date;
}
const DateColumn = ({ date }: DateColumnProps) => {
  const isToday =
    date.toDateString() === new Date().toDateString()
      ? "calendar-date-today"
      : "null";
  return (
    <li
      className={`${CSS.V_CONTAINER} calendar-date-column calendar-column`}
      data-dayid={createDayId(date)}
    >
      {dayOfWeeks[date.getDay()]}
      <div className={`calendar-date ${isToday}`}>{date.getDate()}</div>
    </li>
  );
};

interface WeekGridProps {
  datesOfWeek: Date[];
}
const WeekGrid = ({ datesOfWeek }: WeekGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const days = useDays();

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollTop = UNITS.GRID_HEIGHT * 7;
    }
  }, [gridRef]);

  return (
    <div className={`${CSS.H_CONTAINER} calendar-grid`} ref={gridRef}>
      <div className="calendar-sidebar calendar-times">
        {Array.from({ length: UNITS.HOURS_IN_DAY }).map((_, i) => {
          const hourMarking = i > 11 ? `${i - 11} PM` : `${i + 1} AM`;
          return (
            <div className="calendar-time small-text" key={hourMarking}>
              {hourMarking}
            </div>
          );
        })}
      </div>
      <div
        className={`${CSS.H_CONTAINER} column-container grid-column-container`}
      >
        {datesOfWeek.map((date) => {
          const id = createDayId(date);
          const events = getEventsFromDay(id, days);

          return (
            <div
              className="calendar-event-column calendar-column"
              data-dayid={id}
            >
              {events &&
                positionEvents(events).map((event) => (
                  <EventElement event={event} />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

function getEventsFromDay(id: string, days: Days) {
  return days.find((day) => day.id === id)?.events;
}
function positionEvents(events: EventObject[]): EventObject[] {
  const sortedEvents = sortEvents(events);
  if (sortedEvents.length < 2) return sortedEvents;
  let position = 0;
  sortedEvents.forEach((event, i) => {
    for (let j = i + 1; j < sortedEvents.length; j++) {
      if (
        eventTimeInMs(event.endDate) < eventTimeInMs(sortedEvents[j].startDate)
      ) {
        position = 0;
        break;
      }
      if (
        eventTimeInMs(event.endDate) > eventTimeInMs(sortedEvents[j].startDate)
      ) {
        const previous = sortedEvents[j - 1];
        if (previous.position)
          sortedEvents[j].position = previous.position + 10;
        else {
          position += 10;
          sortedEvents[j].position = position;
        }
      }
    }
  });
  return sortedEvents;
}
export default WeekCalendar;
