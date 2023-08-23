import { EventObject } from "../../types";
import { STRINGS } from "../../utils/consts";
import { toReadableTimeString } from "../../utils/utils";

interface EventDialogProps {
  event: EventObject;
  ref: React.RefObject<HTMLDialogElement>;
  handleShowEventDialog: (event: EventObject) => void;
}
const EventDialog = ({
  event,
  ref,
  handleShowEventDialog,
}: EventDialogProps) => {
  return (
    <dialog className="event-dialog-container" ref={ref}>
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
        onClick={() => handleShowEventDialog(event)}
      ></button>
    </dialog>
  );
};

function handleDelete(id: string, dayid: string) {
  console.log("delete");
}

export default EventDialog;
