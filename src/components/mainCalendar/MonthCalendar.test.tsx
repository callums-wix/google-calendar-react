import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DaysProvider } from "../../context/daysContext";
import MonthCalendar from "./MonthCalendar";
import { dayOfWeeks } from "../../utils/consts";

describe("MonthCalendar", () => {
  const mockDate = new Date(2023, 9, 15);
  let monthCalendar: JSX.Element;
  beforeEach(() => {
    monthCalendar = (
      <DaysProvider>
        <MonthCalendar mainDate={mockDate} />
      </DaysProvider>
    );
  });
  test("should display each day of the week", () => {
    render(monthCalendar);
    dayOfWeeks.forEach((day) => {
      expect(screen.queryByText(day)).toBeInTheDocument();
    });
  });
  test("should first", () => {});
});
