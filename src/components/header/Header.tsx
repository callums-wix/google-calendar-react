import { useState } from "react";
import { Direction } from "../../types";
import { CSS, TITLE_IMAGE } from "../../utils/consts";
import { VIEW } from "../../utils/utils";
import "./header.css";

const Header = () => {
  return (
    <header className={`${CSS.H_CONTAINER} header`}>
      <HeaderTitle />
      <NavBar />
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

const NavBar = () => {
  return (
    <nav className={`${CSS.H_CONTAINER} nav-container`}>
      <ul className={`nav-list ${CSS.H_CONTAINER}`}>
        <li className="nav-item">
          <button
            className="todau-button button hairline-button"
            onClick={handleSwitchView}
          >
            Today
          </button>
        </li>
        <li className="nav-item h-container arrow-container">
          <button
            className="previous-week-button change-week-button button"
            onClick={() => handleWeekMonthChange("previous")}
          ></button>
          <button
            className="next-week-button change-week-button button"
            onClick={() => handleWeekMonthChange("next")}
          ></button>
        </li>
        <li className="header-date nav-item">Aug 2023</li>
        <ViewMenu />
      </ul>
    </nav>
  );
};

const ViewMenu = () => {
  const [toggleViewMenu, setToggleViewMenu] = useState(false);
  return (
    <li className="view-container nav-item">
      <button
        className="view-button hairline-button button h-container"
        onClick={() => setToggleViewMenu(!toggleViewMenu)}
      >
        Week
        {toggleViewMenu && (
          <menu className="view-menu">
            <ViewButton view={VIEW.WEEK} viewText="Week" />
            <ViewButton view={VIEW.MONTH} viewText="Month" />
          </menu>
        )}
      </button>
    </li>
  );
};

interface ViewButtonProps {
  viewText: string;
  view: VIEW;
}

const ViewButton = ({ view, viewText }: ViewButtonProps) => {
  return (
    <button className="view-item" data-view={view} onClick={handleSwitchView}>
      {viewText}
    </button>
  );
};

function handleSwitchView() {
  console.log("Switch View");
}
function handleWeekMonthChange(dir: Direction) {
  console.log(dir);
}

export default Header;
