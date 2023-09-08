import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EventObject } from "../../types";
import EventDialog from "./EventDialog";
import { createRef } from "react";
import { DaysProvider } from "../../context/daysContext";
import { toReadableTimeString } from "../../utils/utils";
import React from "react";

describe("EventDialog", () => {
  const event: EventObject = {
    id: "26569",
    title: "Event 1",
    dayId: "Tue-Aug-15-2023",
    startDate: "2023-08-15T10:00",
    endDate: "2023-08-15T12:00",
    description: "This is a description",
  };
  let eventDialog: JSX.Element;
  let setToggleDialog: () => void;
  const dialogRef = createRef<HTMLDialogElement>();
  beforeEach(() => {
    setToggleDialog = vi.fn();
    eventDialog = (
      <DaysProvider>
        <EventDialog
          event={event}
          dialogRef={dialogRef}
          setToggleDialog={setToggleDialog}
        />
      </DaysProvider>
    );
  });
  test("should call toggle on click of close button", () => {
    render(eventDialog);
    const closeBtn = screen.getByTestId("dialog-close");
    fireEvent.click(closeBtn);
    expect(setToggleDialog).toBeCalled();
  });
  test("should call toggle on click of delete button", () => {
    render(eventDialog);
    const deleteBtn = screen.getByText("Delete Event");
    fireEvent.click(deleteBtn);
    expect(setToggleDialog).toBeCalled();
  });
  test("should display event content", () => {
    render(eventDialog);
    expect(screen.queryByText(event.title)).toBeInTheDocument();
    expect(screen.queryByText(event.description!)).toBeInTheDocument();
    expect(screen.queryByText(toReadableTimeString(event))).toBeInTheDocument();
  });
});
