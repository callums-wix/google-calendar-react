import { useRef, useState } from "react";
import MiniCalendar from "./components/sideBar/MiniCalendar";
import Header from "./components/header/Header";
import CreateEventBtn from "./components/createEvent/CreateEventBtn";
import { CSS } from "./utils/consts";
import EventForm from "./components/createEvent/EventForm";
import useOpenDialog from "./hooks/useDialog";
import { VIEW } from "./utils/utils";
import useStateSideEffect from "./hooks/useStateSideEffect";

function App() {
  const [miniCalDate, setMiniCalDate] = useState(new Date());
  const [mainDate, setMainDate] = useStateSideEffect<Date>(
    () => setMiniCalDate(mainDate),
    new Date()
  );

  const [view, setView] = useState(VIEW.WEEK);
  const formRef = useRef<HTMLDialogElement>(null);
  const [showEventForm, setShowEventForm] = useOpenDialog(formRef);

  return (
    <>
      <Header view={view} mainDate={mainDate} setMainDate={setMainDate} />
      <main className={`${CSS.H_CONTAINER} main-container`}>
        <CreateEventBtn setShowEventForm={setShowEventForm} />
        <MiniCalendar
          mainDate={mainDate}
          setMainDate={setMainDate}
          miniCalDate={miniCalDate}
          setMiniCalDate={setMiniCalDate}
        />
        {showEventForm && (
          <EventForm setShowEventForm={setShowEventForm} formRef={formRef} />
        )}
      </main>
    </>
  );
}

export default App;
