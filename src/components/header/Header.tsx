import { useState } from "react";
import { Direction } from "../../types";
import { CSS, TITLE_IMAGE } from "../../utils/consts";
import { VIEW, changeByWeekOrMonth, getMonthString } from "../../utils/utils";
import "./header.css";

interface HeaderProps {
  view: VIEW;
  mainDate: Date;
  setMainDate: (date: Date) => void;
  setView: (view: VIEW) => void;
}

const Header = ({ view, mainDate, setMainDate, setView }: HeaderProps) => {
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
};

const HeaderTitle = () => {
  return (
    <div className={`${CSS.H_CONTAINER} header-title-container`}>
      <button className="menu-toggle button">
        <div className="menu-toggle-svg"></div>
      </button>
      <img className="title-image" src={TITLE_IMAGE} alt="Goggle Logo"></img>
      <h1 className="header-title">Calendar</h1>
    </div>
  );
};
interface NavBarProps {
  view: VIEW;
  mainDate: Date;
  setMainDate: (date: Date) => void;
  setView: (view: VIEW) => void;
}
const NavBar = ({ view, mainDate, setMainDate, setView }: NavBarProps) => {
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
          ></button>
          <button
            className="next-week-button change-week-button button"
            onClick={() =>
              handleWeekMonthChange("next", view, mainDate, setMainDate)
            }
          ></button>
        </li>
        <li className="header-date nav-item">{dateTitle}</li>
        <ViewMenu view={view} setView={setView} />
      </ul>
    </nav>
  );
};
interface ViewMenuProps {
  view: VIEW;
  setView: (view: VIEW) => void;
}
const ViewMenu = ({ view, setView }: ViewMenuProps) => {
  const [toggleViewMenu, setToggleViewMenu] = useState(false);
  return (
    <li className="view-container nav-item">
      <button
        className="view-button hairline-button button h-container"
        onClick={() => setToggleViewMenu(!toggleViewMenu)}
      >
        {view.toLowerCase()}
        <span className="view-arrow"></span>
        {toggleViewMenu && (
          <menu className="view-menu">
            <ViewButton view={VIEW.WEEK} viewText="Week" setView={setView} />
            <ViewButton view={VIEW.MONTH} viewText="Month" setView={setView} />
          </menu>
        )}
      </button>
    </li>
  );
};

interface ViewButtonProps {
  viewText: string;
  view: VIEW;
  setView: (view: VIEW) => void;
}

const ViewButton = ({ view, viewText, setView }: ViewButtonProps) => {
  return (
    <button
      className="view-item"
      data-view={view}
      onClick={() => setView(view)}
    >
      {viewText}
    </button>
  );
};

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

export default Header;
