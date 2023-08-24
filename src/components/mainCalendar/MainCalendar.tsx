import "./mainCalendar.css";
import { CSS } from "../../utils/consts";
import WeekCalendar from "./WeekCalendar";
import { VIEW } from "../../utils/utils";
import MonthCalendar from "./MonthCalendar";
import { DaysProvider } from "../../context/days";
interface MainCalendarProps {
  mainDate: Date;
  view: VIEW;
}
export default function MainCalendar({ mainDate, view }: MainCalendarProps) {
  return (
    <DaysProvider>
      <section className={`${CSS.V_CONTAINER} calendar-container`}>
        {view === VIEW.WEEK ? (
          <WeekCalendar mainDate={mainDate} />
        ) : (
          <MonthCalendar mainDate={mainDate} />
        )}
      </section>
    </DaysProvider>
  );
}
