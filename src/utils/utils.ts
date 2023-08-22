import { EventObject } from "../types";
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

export function positionElement(
  element: any,
  startDate: string,
  endDate: string,
  blockHeight: number
): any {
  const timeDiffInMS =
    new Date(endDate).getTime() - new Date(startDate).getTime();
  const timeDiffInHours = timeDiffInMS / 1000 / 60 / 60;
  if (!element.options.styles) element.options.styles = [];
  element.options.styles.push({
    name: "height",
    value: `${timeDiffInHours * blockHeight}px`,
  });
  element.options.styles.push({
    name: "top",
    value: `${getHoursFromMidnight(new Date(startDate)) * blockHeight}px`,
  });
  return element;
}

function getHoursFromMidnight(date: Date): number {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours + minutes / 60;
}

export function sortedEventListOnDate(day: Day | null): EventObject[] {
  if (!day) return [];
  return day.events.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}

export function toggleHide(element: HTMLElement): void {
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
    element.style.display = "flex";
  } else {
    element.style.display = "none";
    element.classList.add("hidden");
  }
}

export function eventTimeInMs(date: string) {
  return new Date(date).getTime();
}
