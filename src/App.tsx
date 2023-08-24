import { useRef, useState } from "react";
import MiniCalendar from "./components/sideBar/MiniCalendar";
import Header from "./components/header/Header";
import CreateEventBtn from "./components/createEvent/CreateEventBtn";
import { CSS, ERROR } from "./utils/consts";
import EventForm from "./components/createEvent/EventForm";
import useDialog from "./hooks/useDialog";
import { VIEW } from "./utils/utils";
import MainCalendar from "./components/mainCalendar/MainCalendar";

function App() {
  const [view, setView] = useState(VIEW.WEEK);
  const [mainDate, setMainDate] = useState(new Date());
  const [miniCalDate, setMiniCalDate] = useState(mainDate);

  const formRef = useRef<HTMLDialogElement>(null);
  const [showEventForm, setShowEventForm] = useDialog(formRef);

  function handleMainDate(date: Date) {
    setMiniCalDate(date);
    setMainDate(date);
  }

  return (
    <>
      <Header
        view={view}
        mainDate={mainDate}
        setMainDate={handleMainDate}
        setView={setView}
      />
      <main className={`${CSS.H_CONTAINER} main-container`}>
        <CreateEventBtn setShowEventForm={setShowEventForm} />
        <MiniCalendar
          mainDate={mainDate}
          setMainDate={handleMainDate}
          miniCalDate={miniCalDate}
          setMiniCalDate={setMiniCalDate}
        />
        <MainCalendar mainDate={mainDate} view={view} />
        {showEventForm && (
          <EventForm setShowEventForm={setShowEventForm} formRef={formRef} />
        )}
      </main>
    </>
  );
}

export default App;
