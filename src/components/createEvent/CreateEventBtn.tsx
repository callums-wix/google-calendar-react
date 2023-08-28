import { useRef } from "react";
import { CSS } from "../../utils/consts";
import "./createEventBtn.css";
import useDialog from "../../hooks/useDialog";
import EventForm from "./EventForm";
import { DaysProvider } from "../../context/daysContext";

export default function CreateEventBtn() {
  const formRef = useRef<HTMLDialogElement>(null);
  const [showEventForm, setShowEventForm] = useDialog(formRef);

  return (
    <>
      <button
        className={`${CSS.H_CONTAINER} create-event-button`}
        onClick={() => setShowEventForm()}
      >
        <span className="event-button-plus"></span>
        {"Create"}
        <span className="view-arrow"></span>
      </button>
      {showEventForm && (
        <EventForm setShowEventForm={setShowEventForm} formRef={formRef} />
      )}
    </>
  );
}
