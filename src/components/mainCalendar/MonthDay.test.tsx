import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DaysProvider } from "../../context/daysContext";
import MonthDay, { EventItem } from "./MonthDay";
import { createDayId, formatTimeString } from "../../utils/utils";
import { EventObject } from "../../types";
import React from "react";

describe("MonthDay", () => {
  const mockDate = new Date(2023, 9, 15);
  let monthDay: JSX.Element;
  beforeEach(() => {
    monthDay = (
      <DaysProvider>
        <MonthDay
          date={mockDate}
          mainDate={mockDate}
          id={createDayId(mockDate)}
        />
      </DaysProvider>
    );
  });
  test("should display correct date", () => {
    render(monthDay);
    expect(screen.queryByText(mockDate.getDate()));
  });
});

describe("MonthDay -> EventItem", () => {
  const mockEvent: EventObject = {
    id: "26569",
    dayId: "Thu-Jul-27-2023",
    title: "Event 1",
    startDate: "2023-07-27T13:25",
    endDate: "2023-07-27T15:25",
    description: "",
  };
  let eventItem: JSX.Element;
  beforeEach(() => {
    eventItem = (
      <DaysProvider>
        <EventItem event={mockEvent} />
      </DaysProvider>
    );
  });
  test("should display correct time and title", () => {
    render(eventItem);
    expect(
      screen.queryByText(
        `${formatTimeString(mockEvent.startDate)} ${mockEvent.title}`
      )
    ).toBeInTheDocument();
  });
});
