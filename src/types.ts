export type EventObject = {
  id: string;
  dayId: string;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  position?: number;
};
export type Day = {
  id: string;
  events: EventObject[];
};
export type Days = Day[];

export type Direction = "previous" | "next";
