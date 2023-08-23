import { useEffect, useRef } from "react";
import { CSS, STRINGS, UNITS, dayOfWeeks } from "../../utils/consts";
import { createDayId, createWeekDates } from "../../utils/utils";
import "./weekCalendar.css";

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
          return (
            <div
              className="calendar-event-column calendar-column"
              data-dayid={id}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekCalendar;
