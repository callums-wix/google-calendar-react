import { EventObject, Day, Days } from "../types";
import { VIEW } from "../utils/utils";
import { Store } from "./db";
import { Subject } from "./subject";
import { ERROR, DB } from "../utils/consts";

export type StateObject = {
  mainDate: Date;
  days: Day[];
  view: VIEW;
};

export class State extends Subject<StateObject> {
  private static instance: State;
  private Store: Store;

  private constructor(initialState: StateObject) {
    super(initialState);
    this.Store = new Store(DB.URL);
  }

  public static getInstance(): State {
    const initialState = {
      mainDate: new Date(),
      days: [],
      view: VIEW.WEEK,
    };
    if (!State.instance) {
      State.instance = new State(initialState);
    }
    return State.instance;
  }

  async loadState() {
    this.setState("days", await this.Store.get<Days>("dates"));
  }

  public setSelectedDate(date: Date) {
    this.setState("mainDate", date);
  }

  public setView(view: VIEW) {
    this.setState("view", view);
  }

  public setDays(days: Day[]) {
    this.setState("days", days);
  }

  public getDay(id: string): Day | null {
    const day = this.getValue("days").find((d) => d.id === id);
    return day || null;
  }

  public getEvent(dayId: string, eventId: string): EventObject {
    const event = this.getDay(dayId)?.events.find((e) => e.id === eventId);
    if (!event) {
      throw new Error(ERROR.SERVER);
    }
    return event;
  }

  public async addEvent(event: EventObject): Promise<void> {
    const day = this.getDay(event.dayId);

    if (!day) {
      await this.Store.post<EventObject>(`dates/`, {
        id: event.dayId,
        events: [event],
      });
      this.setDays([
        ...this.getValue("days"),
        { id: event.dayId, events: [event] },
      ]);
    } else {
      const res = await this.Store.put<Day>(`dates/${day.id}`, {
        events: [...day.events, event],
      });
      this.setDays(
        this.getValue("days").map((d) => (d.id === day.id ? res : d))
      );
    }
  }

  public async removeEvent(eventId: string, dayId: string): Promise<void> {
    const events = this.getValue("days").find((d) => d.id === dayId)?.events;
    if (!events) throw new Error(ERROR.UNKNOWN);

    const filteredEvents = events.filter((event) => event.id !== eventId);
    const newDay: Day = { id: dayId, events: filteredEvents };

    this.setState(
      "days",
      this.getValue("days").map((d) => {
        if (d.id === dayId) {
          return newDay;
        }
        return d;
      })
    );
    await this.Store.put(`dates/${dayId}`, newDay);
  }
}
