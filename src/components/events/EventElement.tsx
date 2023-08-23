import { EventObject } from "../../types";
import { CSS, UNITS } from "../../utils/consts";
import { getHeightAndTopPos, toReadableTimeString } from "../../utils/utils";

interface EventElementProps {
  event: EventObject;
}

const EventElement = ({ event }: EventElementProps) => {
  const { height, top } = getHeightAndTopPos(event, UNITS.GRID_HEIGHT);
  return (
    <button
      className={`${CSS.V_CONTAINER} event-container event`}
      data-eventid={event.id}
      data-dayid={event.dayId}
      data-type={event}
      onClick={() => handleEventClick(event)}
      style={{ left: `${event.position ? event.position : 0}px`, height, top }}
    >
      <h3 className="event-header">{event.title}</h3>
      <p className="event-start">{toReadableTimeString(event)}</p>
      <p className="event-desc">{event.description}</p>
    </button>
  );
};

function handleEventClick(event: EventObject) {
  console.log("click");
}

export default EventElement;
