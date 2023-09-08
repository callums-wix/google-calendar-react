import { positionEvents } from "../../utils/utils";
import EventElement from "../events/EventElement";
import { EventObject } from "../../types";
import React from "react";

interface WeekColumnProps {
  events: EventObject[] | null;
  dayId: string;
}

function WeekColumn({ events, dayId }: WeekColumnProps) {
  return (
    <div className="calendar-event-column calendar-column" data-dayid={dayId}>
      {events &&
        positionEvents(events).map((event) => (
          <EventElement event={event} key={event.id} />
        ))}
    </div>
  );
}

export default WeekColumn;
