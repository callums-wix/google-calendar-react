import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EventElement from "./EventElement";
import { EventObject } from "../../types";
import { DaysProvider } from "../../context/daysContext";
import { getHeightAndTopPos, toReadableTimeString } from "../../utils/utils";
import { UNITS } from "../../utils/consts";
import React from "react";

const mockEvent: EventObject = {
  id: "28970",
  dayId: "Wed-Aug-02-2023",
  title: "event 3",
  startDate: "2023-08-02T10:25",
  endDate: "2023-08-02T14:25",
  description: "This is a description",
};

describe("Test EventElement", () => {
  let eventElement: JSX.Element;
  beforeEach(() => {
    eventElement = (
      <DaysProvider>
        <EventElement event={mockEvent} />;
      </DaysProvider>
    );
  });
  test("should contain correct content", () => {
    render(eventElement);
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
    expect(
      screen.getByText(toReadableTimeString(mockEvent))
    ).toBeInTheDocument();
    expect(screen.getByText(mockEvent.description!)).toBeInTheDocument();
  });
  test("should toggle dialog with correct content", () => {
    render(eventElement);
    fireEvent.click(screen.getByText(mockEvent.title));
    const dialog = screen.getByTestId("event-dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent(mockEvent.title);
    expect(dialog).toHaveTextContent(toReadableTimeString(mockEvent));
    expect(dialog).toHaveTextContent(mockEvent.description!);
  });
  test("should have correct position", () => {
    render(eventElement);
    const { height, top } = getHeightAndTopPos(mockEvent, UNITS.GRID_HEIGHT);
    const btn = screen.getByRole("button");
    const styles = getComputedStyle(btn);
    expect(styles.top).toBe(top);
    expect(styles.height).toBe(height);
  });
});
