import { Direction } from "../../types";
import { CSS } from "../../utils/consts";
import "./miniCalendar.css";

import { VIEW, changeByWeekOrMonth, getMonthString } from "../../utils/utils";
import MiniCalGrid from "./MiniCalGrid";

interface MiniCalendarProps {
  mainDate: Date;
  setMainDate: (date: Date) => void;
  miniCalDate: Date;
  setMiniCalDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function MiniCalendar({
  mainDate,
  setMainDate,
  miniCalDate,
  setMiniCalDate,
}: MiniCalendarProps) {
  return (
    <aside className="sidebar-container">
      <div className={`${CSS.V_CONTAINER} mini-calendar-container`}>
        <MiniHeader miniCalDate={miniCalDate} setMiniCalDate={setMiniCalDate} />
        <MiniCalGrid
          miniCalDate={miniCalDate}
          mainDate={mainDate}
          setMainDate={setMainDate}
        />
      </div>
    </aside>
  );
}

interface MiniHeaderProps {
  miniCalDate: Date;
  setMiniCalDate: React.Dispatch<React.SetStateAction<Date>>;
}
function MiniHeader({ miniCalDate, setMiniCalDate }: MiniHeaderProps) {
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
          miniCalDate={miniCalDate}
          setMiniCalDate={setMiniCalDate}
        />
        <NavButton
          dir="next"
          miniCalDate={miniCalDate}
          setMiniCalDate={setMiniCalDate}
        />
      </div>
    </header>
  );
}

interface NavButtonProps {
  dir: Direction;
  miniCalDate: Date;
  setMiniCalDate: React.Dispatch<React.SetStateAction<Date>>;
}
function NavButton({ dir, miniCalDate, setMiniCalDate }: NavButtonProps) {
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
}
