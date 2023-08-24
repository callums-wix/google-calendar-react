import { Days, EventObject } from "../types";
import { UNITS } from "./consts";
import { Day } from "../types";

export enum VIEW {
  MONTH = "MONTH",
  WEEK = "WEEK",
}

export function onOutsideClick(
  dialog: HTMLElement,
  e: MouseEvent,
  callback: Function
) {
  const dimensions = dialog.getBoundingClientRect();

  if (
    e.clientX < dimensions.left ||
    e.clientX > dimensions.right ||
    e.clientY < dimensions.top ||
    e.clientY > dimensions.bottom
  ) {
    callback();
  }
}

// TODO: can improve to hash id.
export function createEventId(): string {
  return Math.floor(Math.random() * 100000).toString();
}

export function createDayId(date: Date): string {
  const whiteSpace = /\s/g;
  return date.toDateString().replace(whiteSpace, "-");
}

export function overlappingMonths(mainDate: Date): string | null {
  const dates = createWeekDates(mainDate);
  const months: string[] = [];
  for (const date of dates) {
    const monthString = date.toLocaleDateString("en-EN", { month: "short" });
    if (!months.includes(monthString)) months.push(monthString);
  }
  if (months.length < 2) return null;
  return months.join("-");
}

export function createWeekDates(mainDate: Date): Date[] {
  const datesOfWeek = [...Array(UNITS.DAYS_IN_WEEK)].map((_, i) => {
    const daysToShift = i - mainDate.getDay();
    const dateOfEachDay = changeDateByDays(mainDate, daysToShift);
    return dateOfEachDay;
  });
  return datesOfWeek;
}

export function createMonthDates(mainDate: Date): Date[] {
  const firstDayOfMonth = getFirstDayOfMonth(mainDate);
  let markerDate = firstDayOfMonth;
  let monthDates: Date[] = [];
  let currentMonth = true;
  while (currentMonth) {
    monthDates = [...monthDates, ...createWeekDates(markerDate)];
    if (markerDate.getMonth() !== firstDayOfMonth.getMonth())
      currentMonth = false;
    markerDate = changeDateByDays(markerDate, UNITS.DAYS_IN_WEEK);
  }
  return monthDates;
}

export function changeDateByDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  return new Date(newDate.setDate(newDate.getDate() + days));
}

export function toReadableTimeString(event: EventObject): string {
  if (!event) return "";
  return `${formatTimeString(event.startDate)} - ${formatTimeString(
    event.endDate
  )}`;
}

export function formatTimeString(date: string): string {
  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  let mins = dateObj.getMinutes().toString();
  if (mins.length < 2) mins = "0" + mins;
  if (hours === 12) return `${hours}${mins ? ":" + mins : ""}pm`;
  if (hours > 11) return `${hours - 12}${mins ? ":" + mins : ""}pm`;
  return `${hours}${mins ? ":" + mins : ""}am`;
}

export function getMonthString(date: Date, view: VIEW): string {
  const months = overlappingMonths(date);
  if (months && view === VIEW.WEEK) return months;
  return date.toLocaleDateString("en-EN", { month: "long" });
}

export function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function changeByWeekOrMonth(
  mainDate: Date,
  view: VIEW,
  direction: "previous" | "next"
): Date {
  if (view === VIEW.WEEK) {
    const newDate = changeDateByDays(mainDate, direction === "next" ? 7 : -7);
    return newDate;
  }
  if (view === VIEW.MONTH) {
    const daysInMonth = getDaysInMonth(mainDate);
    const newDate = changeDateByDays(
      mainDate,
      direction === "next" ? daysInMonth : -daysInMonth
    );
    return newDate;
  }

  return mainDate;
}

export function getDaysInMonth(date: Date): number {
  const currentMonth = date.getMonth() + 1;
  return new Date(date.getFullYear(), currentMonth, 0).getDate();
}

export function getHeightAndTopPos(event: EventObject, blockHeight: number) {
  const timeDiffInMS =
    new Date(event.endDate).getTime() - new Date(event.startDate).getTime();
  const timeDiffInHours = timeDiffInMS / 1000 / 60 / 60;
  return {
    height: `${timeDiffInHours * blockHeight}px`,
    top: `${getHoursFromMidnight(new Date(event.startDate)) * blockHeight}px`,
  };
}

function getHoursFromMidnight(date: Date): number {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours + minutes / 60;
}

export function eventTimeInMs(date: string) {
  return new Date(date).getTime();
}

export function getSortedEventsFromDay(
  id: string,
  days: Days
): EventObject[] | null {
  const events = days.find((day) => day.id === id)?.events;
  if (events) return sortEvents(events);
  return null;
}
export function sortEvents(events: EventObject[]): EventObject[] {
  return events.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}

export function positionEvents(events: EventObject[]): EventObject[] {
  if (events.length < 2) return events;
  let position = 0;
  events.forEach((event, i) => {
    for (let j = i + 1; j < events.length; j++) {
      if (eventTimeInMs(event.endDate) < eventTimeInMs(events[j].startDate)) {
        position = 0;
        break;
      }
      if (eventTimeInMs(event.endDate) > eventTimeInMs(events[j].startDate)) {
        const previous = events[j - 1];
        if (previous.position) events[j].position = previous.position + 10;
        else {
          position += 10;
          events[j].position = position;
        }
      }
    }
  });
  return events;
}
