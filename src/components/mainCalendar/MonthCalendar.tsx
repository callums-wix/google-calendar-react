import { CSS, UNITS, dayOfWeeks } from "../../utils/consts";
import { createDayId, createMonthDates } from "../../utils/utils";
import "./monthCalendar.css";

interface MonthCalendarProps {
  mainDate: Date;
}
const MonthCalendar = ({ mainDate }: MonthCalendarProps) => {
  return (
    <>
      <MonthHeader />
      <MonthGrid mainDate={mainDate} />
    </>
  );
};
const MonthHeader = () => {
  return (
    <ol
      className={`${CSS.H_CONTAINER} column-container month-header-container`}
    >
      {Array.from({ length: UNITS.DAYS_IN_WEEK }).map((_, i) => {
        return (
          <li className="month-header-item calendar-column">
            <p className="month-header-day">{dayOfWeeks[i]}</p>
          </li>
        );
      })}
    </ol>
  );
};
interface MonthGridProps {
  mainDate: Date;
}
const MonthGrid = ({ mainDate }: MonthGridProps) => {
  const monthDates = createMonthDates(mainDate);
  return (
    <div className="month-grid-container">
      {monthDates.map((date) => (
        <MonthSquare date={date} mainDate={mainDate} id={createDayId(date)} />
      ))}
    </div>
  );
};

interface MonthSquareProps {
  date: Date;
  mainDate: Date;
  id: string;
}
const MonthSquare = ({ date, mainDate, id }: MonthSquareProps) => {
  const unfocus = date.getMonth() !== mainDate.getMonth() ? "unfocus" : "focus";

  return (
    <div className="month-square-container">
      <p className={`month-square-date ${unfocus}`}>{date.getDate()}</p>
    </div>
  );
};
export default MonthCalendar;
