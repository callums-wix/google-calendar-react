import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import WeekCalendar from "./WeekCalendar";
import { DaysProvider } from "../../context/daysContext";
import { dayOfWeeks } from "../../utils/consts";
import { createWeekDates } from "../../utils/utils";
import React from "react";

describe("WeekCalendar", () => {
  const mockDate = new Date(2023, 9, 15);
  let weekCalendar: JSX.Element;
  beforeEach(() => {
    weekCalendar = (
      <DaysProvider>
        <WeekCalendar mainDate={mockDate} />;
      </DaysProvider>
    );
  });
  test("should correctly display days of the week", () => {
    const container = render(weekCalendar);
    dayOfWeeks.forEach((day) => {
      expect(container.baseElement).toHaveTextContent(day);
    });
  });
  test("should correctly display dates of each day", () => {
    const container = render(weekCalendar);

    const days = createWeekDates(mockDate);
    days.forEach((day) => {
      expect(container.baseElement).toHaveTextContent(day.getDate().toString());
    });
  });
  test("should ", () => {});
});
