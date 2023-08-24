import { EventObject } from "../../types";
import { STRINGS } from "../../utils/consts";
import { toReadableTimeString } from "../../utils/utils";

interface EventDialogProps {
  event: EventObject;
  dialogRef: React.RefObject<HTMLDialogElement>;
  setToggleDialog: () => void;
}
const EventDialog = ({
  event,
  dialogRef,
  setToggleDialog,
}: EventDialogProps) => {
  return (
    <dialog className="event-dialog-container" ref={dialogRef}>
      <h3 className="event-dialog-title">{event.title}</h3>
      <p className="event-dialog-time">{toReadableTimeString(event)}</p>
      <p className="event-dialog-desc">{event.description}</p>
      <button
        className="button hairline-button event-dialog-delete"
        data-eventid={event.id}
        data-dayid={event.dayId}
        onClick={() => handleDelete(event.id, event.dayId)}
      >
        {STRINGS.DELETE_EVENT}
      </button>
      <button
        className="button close-dialog form-dialog-close"
        onClick={() => setToggleDialog()}
      ></button>
    </dialog>
  );
};

function handleDelete(id: string, dayid: string) {
  console.log("delete");
}

export default EventDialog;
