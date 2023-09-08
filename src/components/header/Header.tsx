import { Direction } from "../../types";
import { CSS, TITLE_IMAGE } from "../../utils/consts";
import { VIEW, changeByWeekOrMonth, getMonthString } from "../../utils/utils";
import "./header.css";
import ViewMenu from "./ViewMenu";

interface HeaderProps {
  view: VIEW;
  mainDate: Date;
  setMainDate: (date: Date) => void;
  setView: (view: VIEW) => void;
}

export default function Header({
  view,
  mainDate,
  setMainDate,
  setView,
}: HeaderProps) {
  return (
    <header className={`${CSS.H_CONTAINER} header`}>
      <HeaderTitle />
      <NavBar
        view={view}
        mainDate={mainDate}
        setMainDate={setMainDate}
        setView={setView}
      />
    </header>
  );
}

function HeaderTitle() {
  return (
    <div className={`${CSS.H_CONTAINER} header-title-container`}>
      <button className="menu-toggle button">
        <div className="menu-toggle-svg"></div>
      </button>
      <img className="title-image" src={TITLE_IMAGE} alt="Goggle Logo"></img>
      <h1 className="header-title">Calendar</h1>
    </div>
  );
}

interface NavBarProps {
  view: VIEW;
  mainDate: Date;
  setMainDate: (date: Date) => void;
  setView: (view: VIEW) => void;
}
function NavBar({ view, mainDate, setMainDate, setView }: NavBarProps) {
  const dateTitle = `${getMonthString(
    mainDate,
    view
  )} ${mainDate.getFullYear()}`;

  return (
    <nav className={`${CSS.H_CONTAINER} nav-container`}>
      <ul className={`nav-list ${CSS.H_CONTAINER}`}>
        <li className="nav-item">
          <button
            className="todau-button button hairline-button"
            onClick={() => handleChangeToToday(setMainDate)}
            data-testid="switch-today"
          >
            Today
          </button>
        </li>
        <li className="nav-item h-container arrow-container">
          <button
            className="previous-week-button change-week-button button"
            onClick={() =>
              handleWeekMonthChange("previous", view, mainDate, setMainDate)
            }
            data-testid="switch-prev"
          ></button>
          <button
            className="next-week-button change-week-button button"
            onClick={() =>
              handleWeekMonthChange("next", view, mainDate, setMainDate)
            }
            data-testid="switch-next"
          ></button>
        </li>
        <li className="header-date nav-item" data-testid="header-month">
          {dateTitle}
        </li>
        <ViewMenu view={view} setView={setView} />
      </ul>
    </nav>
  );
}

function handleChangeToToday(setMainDate: (date: Date) => void) {
  setMainDate(new Date());
}

function handleWeekMonthChange(
  dir: Direction,
  view: VIEW,
  mainDate: Date,
  setMainDate: (date: Date) => void
) {
  const newDate = changeByWeekOrMonth(mainDate, view, dir);
  setMainDate(newDate);
}
