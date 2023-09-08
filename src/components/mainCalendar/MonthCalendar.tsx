import { CSS, UNITS, dayOfWeeks } from "../../utils/consts";
import { createDayId, createMonthDates } from "../../utils/utils";

import "./monthCalendar.css";
import MonthDay from "./MonthDay";

interface MonthCalendarProps {
  mainDate: Date;
}
export default function MonthCalendar({ mainDate }: MonthCalendarProps) {
  return (
    <>
      <MonthHeader />
      <MonthGrid mainDate={mainDate} />
    </>
  );
}
function MonthHeader() {
  return (
    <ol
      className={`${CSS.H_CONTAINER} column-container month-header-container`} data-testid='month-header'
    >
      {Array.from({ length: UNITS.DAYS_IN_WEEK }).map((_, i) => {
        return (
          <li className="month-header-item calendar-column" key={dayOfWeeks[i]}>
            <p className="month-header-day">{dayOfWeeks[i]}</p>
          </li>
        );
      })}
    </ol>
  );
}
interface MonthGridProps {
  mainDate: Date;
}
function MonthGrid({ mainDate }: MonthGridProps) {
  const monthDates = createMonthDates(mainDate);
  return (
    <div className="month-grid-container">
      {monthDates.map((date) => (
        <MonthDay
          date={date}
          mainDate={mainDate}
          id={createDayId(date)}
          key={date.getTime()}
        />
      ))}
    </div>
  );
}
