import { Days, EventObject } from "../../types";
import { STRINGS } from "../../utils/consts";
import { toReadableTimeString } from "../../utils/utils";
import { useDays } from "../../context/daysContext";

import "./eventDialog.css";

interface EventDialogProps {
  event: EventObject;
  dialogRef: React.RefObject<HTMLDialogElement>;
  setToggleDialog: () => void;
}
export default function EventDialog({
  event,
  dialogRef,
  setToggleDialog,
}: EventDialogProps) {
  const { days, deleteEvent } = useDays();
  return (
    <dialog className="event-dialog-container" ref={dialogRef}>
      <h3 className="event-dialog-title">{event.title}</h3>
      <p className="event-dialog-time">{toReadableTimeString(event)}</p>
      <p className="event-dialog-desc">{event.description}</p>
      <button
        className="button hairline-button event-dialog-delete"
        data-eventid={event.id}
        data-dayid={event.dayId}
        onClick={() => handleDelete(days, event.id, event.dayId, deleteEvent)}
      >
        {STRINGS.DELETE_EVENT}
      </button>
      <button
        className="button close-dialog form-dialog-close"
        onClick={() => setToggleDialog()}
      ></button>
    </dialog>
  );
}

function handleDelete(
  days: Days,
  id: string,
  dayid: string,
  deleteEvent: Function
) {
  const event = days
    .find((d) => d.id === dayid)
    ?.events.find((e) => e.id === id);
  deleteEvent(event);
}
