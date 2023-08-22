import { useRef, useState } from "react";
import MiniCalendar from "./components/sideBar/MiniCalendar";
import Header from "./components/header/Header";
import CreateEventBtn from "./components/createEvent/CreateEventBtn";
import { CSS } from "./utils/consts";
import EventForm from "./components/createEvent/EventForm";
import useOpenDialog from "./hooks/openDialog";

function App() {
  const formRef = useRef<HTMLDialogElement>(null);
  const [selectedDate, setselectedDate] = useState(new Date());
  // const [showEventForm, setShowEventForm] = useState(true);
  const [showEventForm, setShowEventForm] = useOpenDialog(formRef);

  return (
    <>
      <Header />
      <main className={`${CSS.H_CONTAINER} main-container`}>
        <CreateEventBtn setShowEventForm={setShowEventForm} />
        <MiniCalendar selectedDate={selectedDate} />
        {showEventForm && (
          <EventForm setShowEventForm={setShowEventForm} formRef={formRef} />
        )}
      </main>
    </>
  );
}

export default App;
