import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Day, Days, EventObject } from "../types";
import { Store } from "../services/db";
import { DB } from "../utils/consts";
import daysReducer from "./daysReducer";

const db = new Store(DB.URL);

export interface DaysContextProps {
  days: Days;
  addEvent: (event: EventObject) => void;
  deleteEvent: (event: EventObject) => void;
}

export const DaysContext = createContext<DaysContextProps | null>(null);

interface DaysProviderProps {
  children: React.ReactNode;
}
export function DaysProvider({ children }: DaysProviderProps) {
  const [days, dispatch] = useReducer(daysReducer, []);

  useEffect(() => {
    async function fetchDays() {
      const data = await db.get<Days>("days");
      dispatch({ type: "set", payload: data });
    }
    fetchDays();
  }, []);

  async function addEvent(event: EventObject) {
    const day = await db
      .get<Days>("days")
      .then((days) => days.find((d) => d.id === event.dayId));
    if (!day) {
      await db.post<EventObject>(`days/`, {
        id: event.dayId,
        events: [event],
      });
    } else {
      await db.put<Day>(`days/${day.id}`, {
        events: [...day.events, event],
      });
    }
    dispatch({ type: "create", payload: event });
  }

  async function deleteEvent(event: EventObject) {
    const day = await db
      .get<Days>("days")
      .then((days) => days.find((d) => d.id === event.dayId));
    if (!day) throw new Error("Failed to find data");

    const filteredEvents = day.events.filter((e) => event.id !== e.id);
    const newDay: Day = { id: event.dayId, events: filteredEvents };

    await db.put(`days/${event.dayId}`, newDay);
    dispatch({ type: "delete", payload: event });
  }

  return (
    <DaysContext.Provider value={{ days, addEvent, deleteEvent }}>
      {children}
    </DaysContext.Provider>
  );
}

export const useDays = () => {
  const context = useContext(DaysContext);
  if (!context) throw new Error("Context must be used within a provider");
  return context;
};
