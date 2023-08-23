import "./mainCalendar.css";
import { useRef, useState } from "react";
import { CSS } from "../../utils/consts";
import WeekCalendar from "./WeekCalendar";
import { VIEW } from "../../utils/utils";
import MonthCalendar from "./MonthCalendar";
import useDialog from "../../hooks/useDialog";
import EventDialog from "../events/EventDialog";
import { EventObject } from "../../types";

interface MainCalendarProps {
  mainDate: Date;
  view: VIEW;
}
const MainCalendar = ({ mainDate, view }: MainCalendarProps) => {
  const [focusedEvent, setFocusedEvent] = useState<EventObject>();
  const eventDialogRef = useRef(null);
  const [showEventDialog, setShowEventDialog] = useDialog(eventDialogRef);
  function handleShowEventDialog(event: EventObject) {
    setFocusedEvent(event);
    setShowEventDialog();
  }

  return (
    <section className={`${CSS.V_CONTAINER} calendar-container`}>
      {view === VIEW.WEEK ? (
        <WeekCalendar mainDate={mainDate} />
      ) : (
        <MonthCalendar mainDate={mainDate} />
      )}
      {showEventDialog && focusedEvent && (
        <EventDialog
          event={focusedEvent}
          ref={eventDialogRef}
          handleShowEventDialog={handleShowEventDialog}
        />
      )}
    </section>
  );
};

export default MainCalendar;
