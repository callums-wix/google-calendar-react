import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DaysProvider } from "../../context/daysContext";
import EventForm from "./EventForm";
import { createRef } from "react";
import { STRINGS } from "../../utils/consts";

describe("Test EventForm", () => {
  let eventForm: JSX.Element;
  let setShowEventForm: () => void;
  const formRef = createRef<HTMLDialogElement>();
  const firstDateString = "2023-08-15T11:00";
  const secondDateString = "2023-08-15T14:00";

  beforeEach(() => {
    setShowEventForm = vi.fn();
    eventForm = (
      <DaysProvider>
        <EventForm setShowEventForm={setShowEventForm} formRef={formRef} />
      </DaysProvider>
    );
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
  test("should correctly display user inpit", () => {
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
