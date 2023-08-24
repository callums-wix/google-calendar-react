import { useEffect, useRef } from "react";
import { CSS, STRINGS, UNITS, dayOfWeeks } from "../../utils/consts";
import {
  createDayId,
  createWeekDates,
  eventTimeInMs,
  getSortedEventsFromDay,
  positionEvents,
} from "../../utils/utils";
import "./weekCalendar.css";
import { useDays } from "../../context/days";
import EventElement from "../events/EventElement";
import { EventObject } from "../../types";

interface WeekCalendarProps {
  mainDate: Date;
}
export default function WeekCalendar({ mainDate }: WeekCalendarProps) {
  const datesOfWeek = createWeekDates(mainDate);

  return (
    <>
      <WeekHeader datesOfWeek={datesOfWeek} />
      <WeekGrid datesOfWeek={datesOfWeek} />
    </>
  );
}

interface WeekHeaderProps {
  datesOfWeek: Date[];
}

function WeekHeader({ datesOfWeek }: WeekHeaderProps) {
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
}

interface DateColumnProps {
  date: Date;
}
function DateColumn({ date }: DateColumnProps) {
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
}

interface WeekGridProps {
  datesOfWeek: Date[];
}
function WeekGrid({ datesOfWeek }: WeekGridProps) {
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
        })}
      </div>
    </div>
  );
}
