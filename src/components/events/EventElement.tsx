import { useRef } from "react";
import { EventObject } from "../../types";
import { CSS, UNITS } from "../../utils/consts";
import { getHeightAndTopPos, toReadableTimeString } from "../../utils/utils";
import "./eventElement.css";
import EventDialog from "./EventDialog";
import useDialog from "../../hooks/useDialog";

interface EventElementProps {
  event: EventObject;
}

const EventElement = ({ event }: EventElementProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [toggleDialog, setToggleDialog] = useDialog(dialogRef);

  const { height, top } = getHeightAndTopPos(event, UNITS.GRID_HEIGHT);
  return (
    <>
      <button
        className={`${CSS.V_CONTAINER} event-container event`}
        data-eventid={event.id}
        data-dayid={event.dayId}
        data-type={event}
        onClick={() => setToggleDialog()}
        style={{
          left: `${event.position ? event.position : 0}px`,
          height,
          top,
        }}
      >
        <h3 className="event-header">{event.title}</h3>
        <p className="event-start">{toReadableTimeString(event)}</p>
        <p className="event-desc">{event.description}</p>
      </button>
      {toggleDialog && (
        <EventDialog
          dialogRef={dialogRef}
          event={event}
          setToggleDialog={setToggleDialog}
        />
      )}
    </>
  );
};

export default EventElement;
