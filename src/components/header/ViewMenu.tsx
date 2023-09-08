import { useState } from "react";
import { VIEW } from "../../utils/utils";

interface ViewMenuProps {
  view: VIEW;
  setView: (view: VIEW) => void;
}
export default function ViewMenu({ view, setView }: ViewMenuProps) {
  const [toggleViewMenu, setToggleViewMenu] = useState(false);
  return (
    <li className="view-container nav-item">
      <button
        className="view-button hairline-button button h-container"
        onClick={() => setToggleViewMenu(!toggleViewMenu)}
        data-testid="view-menu-toggle"
      >
        {view.toLowerCase()}
        <span className="view-arrow"></span>
      </button>
      {toggleViewMenu && (
        <menu className="view-menu" data-testid={"view-menu"}>
          <ViewButton
            view={VIEW.WEEK}
            viewText="Week"
            setView={(view) => {
              setView(view);
              setToggleViewMenu(!toggleViewMenu);
            }}
          />
          <ViewButton
            view={VIEW.MONTH}
            viewText="Month"
            setView={(view) => {
              setView(view);
              setToggleViewMenu(!toggleViewMenu);
            }}
          />
        </menu>
      )}
    </li>
  );
}

interface ViewButtonProps {
  viewText: string;
  view: VIEW;
  setView: (view: VIEW) => void;
}

function ViewButton({ view, viewText, setView }: ViewButtonProps) {
  return (
    <button
      className="view-item"
      data-view={view}
      onClick={() => setView(view)}
    >
      {viewText}
    </button>
  );
}
