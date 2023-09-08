import { DATA_ATTR, UNITS, CSS, dayOfWeeks } from "../../utils/consts";
import {
  changeDateByDays,
  createDayId,
  createWeekDates,
  getFirstDayOfMonth,
} from "../../utils/utils";

interface MinCalGridProps {
  miniCalDate: Date;
  mainDate: Date;
  setMainDate: (date: Date) => void;
}

export default function MiniCalGrid({
  miniCalDate,
  mainDate,
  setMainDate,
}: MinCalGridProps) {
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
      <MonthDates
        miniCalDate={miniCalDate}
        mainDate={mainDate}
        setMainDate={setMainDate}
      />
    </table>
  );
}

interface MonthDatesProps {
  miniCalDate: Date;
  mainDate: Date;
  setMainDate: (date: Date) => void;
}
function MonthDates({ miniCalDate, mainDate, setMainDate }: MonthDatesProps) {
  const firstDayOfMonth = getFirstDayOfMonth(miniCalDate);
  let dateMarker = new Date(firstDayOfMonth);
  return (
    <tbody
      className="mini-grid-body"
      onClick={(e) => handleSelectDate(e, setMainDate)}
    >
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
                mainDate={mainDate}
              />
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

interface DateElementProps {
  date: Date;
  firstDayOfMonth: Date;
  mainDate: Date;
}

function DateElement({ date, firstDayOfMonth, mainDate }: DateElementProps) {
  let classes = [];
  if (date.toDateString() === new Date().toDateString())
    classes.push("calendar-date-today");
  if (
    date.toDateString() === mainDate.toDateString() &&
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
}

function handleSelectDate(
  e: React.MouseEvent<HTMLTableSectionElement, MouseEvent>,
  setMainDate: (date: Date) => void
) {
  if (
    e.target instanceof HTMLElement &&
    e.target.hasAttribute(DATA_ATTR.DATE_ID)
  ) {
    setMainDate(new Date(e.target.dataset.dateid as string));
  }
}
