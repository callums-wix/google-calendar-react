import { Days, EventObject } from "../types";

export type ActionType =
  | { type: "set"; payload: Days }
  | { type: "create"; payload: EventObject }
  | { type: "delete"; payload: EventObject };

export default function daysReducer(days: Days, action: ActionType): Days {
  switch (action.type) {
    case "create": {
      const event = action.payload;
      if (!days.some((day) => day.id === event.dayId))
        return [...days, { id: event.dayId, events: [event] }];
      return days.map((d) =>
        d.id === event.dayId ? { id: d.id, events: [...d.events, event] } : d
      );
    }
    case "set": {
      return action.payload;
    }
    case "delete": {
      const event = action.payload;
      const filteredEvents = days.map((d) =>
        d.id === event.dayId
          ? { id: d.id, events: d.events.filter((e) => e.id !== event.id) }
          : d
      );
      return filteredEvents;
    }
    default:
      return days;
  }
}
