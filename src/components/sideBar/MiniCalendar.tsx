import { Direction } from "../../types";
import { CSS, UNITS, dayOfWeeks } from "../../utils/consts";
import { useState } from "react";
import "./miniCalendar.css";

import {
  VIEW,
  changeByWeekOrMonth,
  changeDateByDays,
  createDayId,
  createWeekDates,
  getFirstDayOfMonth,
  getMonthString,
} from "../../utils/utils";

interface MiniCalendarProps {
  selectedDate: Date;
}

const MiniCalendar = ({ selectedDate }: MiniCalendarProps) => {
  const [miniCalDate, setMiniCalDate] = useState(new Date());

  return (
    <aside className="sidebar-container">
      <div className={`${CSS.V_CONTAINER} mini-calendar-container`}>
        <MiniHeader miniCalDate={miniCalDate} setMiniCalDate={setMiniCalDate} />
        <MiniCalGrid miniCalDate={miniCalDate} selectedDate={selectedDate} />
      </div>
    </aside>
  );
};

interface MiniHeaderProps {
  miniCalDate: Date;
  setMiniCalDate: React.Dispatch<React.SetStateAction<Date>>;
}
const MiniHeader = ({ miniCalDate, setMiniCalDate }: MiniHeaderProps) => {
  const calDateHeading = `${getMonthString(
    miniCalDate,
    VIEW.MONTH
  )} ${miniCalDate.getFullYear()}`;

  return (
    <header className={`${CSS.H_CONTAINER} mini-header-container`}>
      <span className="mini-title">{calDateHeading}</span>
      <div className={`${CSS.H_CONTAINER} mini-btn-container`}>
        <NavButton
          dir="previous"
          miniCalDate={new Date()}
          setMiniCalDate={setMiniCalDate}
        />
        <NavButton
          dir="next"
          miniCalDate={new Date()}
          setMiniCalDate={setMiniCalDate}
        />
      </div>
    </header>
  );
};

interface NavButtonProps {
  dir: Direction;
  miniCalDate: Date;
  setMiniCalDate: React.Dispatch<React.SetStateAction<Date>>;
}
const NavButton = ({ dir, miniCalDate, setMiniCalDate }: NavButtonProps) => {
  return (
    <button
      className={`mini-${dir}-btn button mini-btn`}
      name="dir"
      onClick={() =>
        setMiniCalDate(changeByWeekOrMonth(miniCalDate, VIEW.MONTH, dir))
      }
      data-testid={`mini-${dir}`}
    ></button>
  );
};

interface MinCalProps {
  miniCalDate: Date;
  selectedDate: Date;
}

const MiniCalGrid = ({ miniCalDate, selectedDate }: MinCalProps) => {
  return (
    <table className={`${CSS.V_CONTAINER} mini-calendar-grid`}>
      <thead>
        <tr className={`${CSS.H_CONTAINER} mini-row mini-day-letters`}>
          {Array.from({ length: UNITS.DAYS_IN_WEEK }).map((_, i) => {
            const letter = dayOfWeeks[i][0];
            return (
              <th
                className={`${CSS.V_CONTAINER} mini-day-title mini-cell`}
                key={`letter-${i}`}
              >
                {letter}
              </th>
            );
          })}
        </tr>
      </thead>
      <MonthDates miniCalDate={miniCalDate} selectedDate={selectedDate} />
    </table>
  );
};

interface MonthDatesProps {
  miniCalDate: Date;
  selectedDate: Date;
}
const MonthDates = ({ miniCalDate, selectedDate }: MonthDatesProps) => {
  const firstDayOfMonth = getFirstDayOfMonth(miniCalDate);
  let dateMarker = new Date(firstDayOfMonth);
  return (
    <tbody className="mini-grid-body" onClick={() => handleMiniDate}>
      {Array.from({ length: 6 }).map((_, i) => {
        const weekDates = createWeekDates(dateMarker);
        dateMarker = changeDateByDays(dateMarker, UNITS.DAYS_IN_WEEK);
        return (
          <tr className={`${CSS.H_CONTAINER} mini-row`} key={i}>
            {weekDates.map((date) => (
              <DateElement
                key={date.getTime()}
                date={date}
                firstDayOfMonth={firstDayOfMonth}
                selectedDate={selectedDate}
              />
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

interface DateElementProps {
  date: Date;
  firstDayOfMonth: Date;
  selectedDate: Date;
}

const DateElement = ({
  date,
  firstDayOfMonth,
  selectedDate,
}: DateElementProps) => {
  let classes = [];
  if (date.toDateString() === new Date().toDateString())
    classes.push("calendar-date-today");
  if (
    date.toDateString() === selectedDate.toDateString() &&
    date.toDateString() !== new Date().toDateString()
  )
    classes.push("selected-date");
  if (date.getMonth() !== firstDayOfMonth.getMonth()) classes.push(CSS.UNFOCUS);
  return (
    <td
      className={`mini-month-day mini-cell v-container ${classes.join(" ")}`}
      data-dateid={createDayId(date)}
    >
      {date.getDate().toString()}
    </td>
  );
};

function handleMiniDate() {
  console.log("click");
}

export default MiniCalendar;
