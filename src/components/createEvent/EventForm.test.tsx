import { expect, test, describe, vi, beforeEach, Mock } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  DaysContext,
  DaysContextProps,
  DaysProvider,
  useDays,
} from "../../context/daysContext";
import EventForm from "./EventForm";
import React, { createRef } from "react";
import { STRINGS } from "../../utils/consts";
function setupTest(params: {
  addEvent?: Mock;
  setShowEventForm?: Mock;
  formRef?: React.RefObject<HTMLDialogElement>;
}) {
  const {
    addEvent = vi.fn(),
    setShowEventForm = vi.fn(),
    formRef = createRef<HTMLDialogElement>(),
  } = params;
  return render(
    <DaysContext.Provider
      value={{ addEvent: addEvent, days: [], deleteEvent: vi.fn() }}
    >
      <EventForm setShowEventForm={setShowEventForm} formRef={formRef} />
    </DaysContext.Provider>
  );
}

describe("Test EventForm", () => {
  let eventForm: JSX.Element;
  let setShowEventForm: () => void;
  let addEvent;

  const formRef = createRef<HTMLDialogElement>();
  const firstDateString = "2023-08-15T11:00";
  const secondDateString = "2023-08-15T14:00";

  // beforeEach(() => {
  //   setShowEventForm = vi.fn();
  //   addEvent = vi.fn();
  //   eventForm = (
  //     <DaysContext.Provider
  //       value={{ addEvent, days: [], deleteEvent: vi.fn() }}
  //     >
  //       <EventForm setShowEventForm={setShowEventForm} formRef={formRef} />
  //     </DaysContext.Provider>
  //   );
  // });
  test.only("should fire addEvent won submit with valid data", async () => {
    const addEvent = vi.fn();
    const { getByTestId, getByText } = setupTest({ addEvent });
    const title = getByTestId("form-title") as HTMLInputElement;
    const start = getByTestId("form-start") as HTMLInputElement;
    const end = getByTestId("form-end") as HTMLInputElement;
    const desc = getByTestId("form-desc") as HTMLTextAreaElement;
    fireEvent.change(getByTestId("form-title"), {
      target: { value: "Title" },
    });
    fireEvent.change(start, { target: { value: firstDateString } });
    fireEvent.change(end, { target: { value: secondDateString } });
    fireEvent.change(desc, { target: { value: "desc" } });
    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(addEvent).toBeCalled();
      expect(addEvent).toBeCalledWith({
        id: expect.any(String),
        dayId: expect.any(String),
        title: "Title",
        startDate: firstDateString,
        endDate: secondDateString,
        description: "desc",
      });
    });
  });
  test("should handle validation", async () => {
    render(eventForm);
    const title = screen.getByTestId("form-title");
    const start = screen.getByTestId("form-start");
    const end = screen.getByTestId("form-end");
    expect(title).toBeInvalid();
    expect(start).toBeInvalid();
    expect(end).toBeInvalid();
    fireEvent.change(title, { target: { value: "Title" } });
    fireEvent.change(start, { target: { value: secondDateString } });
    fireEvent.change(end, { target: { value: firstDateString } });
    expect(title).toBeValid();
    expect(start).toBeValid();
    expect(end).toBeValid();
    fireEvent.click(screen.getByText("Save"));
    expect(screen.getByText(STRINGS.TOOLTIP_DATE)).toBeInTheDocument();
  });
  test("should correctly display user input", () => {
    render(eventForm);
    const title = screen.getByTestId("form-title") as HTMLInputElement;
    const start = screen.getByTestId("form-start") as HTMLInputElement;
    const end = screen.getByTestId("form-end") as HTMLInputElement;
    const desc = screen.getByTestId("form-desc") as HTMLTextAreaElement;
    fireEvent.change(title, { target: { value: "Title" } });
    fireEvent.change(start, { target: { value: firstDateString } });
    fireEvent.change(end, { target: { value: secondDateString } });
    fireEvent.change(desc, { target: { value: "desc" } });
    expect(title.value).toBe("Title");
    expect(start.value).toBe(firstDateString);
    expect(end.value).toBe(secondDateString);
    expect(desc.value).toBe("desc");
  });
  test("should call setShowEventForm on successfull submit", () => {
    render(eventForm);
    const title = screen.getByTestId("form-title");
    const start = screen.getByTestId("form-start");
    const end = screen.getByTestId("form-end");
    fireEvent.change(title, { target: { value: "Title" } });
    fireEvent.change(start, { target: { value: firstDateString } });
    fireEvent.change(end, { target: { value: secondDateString } });
    fireEvent.click(screen.getByText("Save"));
    expect(setShowEventForm).toBeCalled();
  });
});
