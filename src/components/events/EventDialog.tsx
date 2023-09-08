import { Days, EventObject } from "../../types";
import { STRINGS } from "../../utils/consts";
import { toReadableTimeString } from "../../utils/utils";
import { useDays } from "../../context/daysContext";
import React from "react";

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
  const { deleteEvent } = useDays();
  return (
    <dialog
      className="event-dialog-container"
      ref={dialogRef}
      data-testid={"event-dialog"}
    >
      <h3 className="event-dialog-title">{event.title}</h3>
      <p className="event-dialog-time">{toReadableTimeString(event)}</p>
      <p className="event-dialog-desc">{event.description}</p>
      <button
        className="button hairline-button event-dialog-delete"
        data-eventid={event.id}
        data-dayid={event.dayId}
        data-testid="dialog-delete"
        onClick={() => handleDelete(event, deleteEvent, setToggleDialog)}
      >
        {STRINGS.DELETE_EVENT}
      </button>
      <button
        className="button close-dialog form-dialog-close"
        onClick={() => setToggleDialog()}
        data-testid="dialog-close"
      ></button>
    </dialog>
  );
}

function handleDelete(
  event: EventObject,
  deleteEvent: Function,
  setToggleDialog: Function
) {
  setToggleDialog();
  deleteEvent(event);
}
