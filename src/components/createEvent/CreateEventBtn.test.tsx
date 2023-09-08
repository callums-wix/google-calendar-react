import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateEventBtn from "./CreateEventBtn";
import { DaysProvider } from "../../context/daysContext";
describe("Test CreateEventBtn", () => {
  let createEventBtn: JSX.Element;
  beforeEach(() => {
    createEventBtn = (
      <DaysProvider>
        <CreateEventBtn />;
      </DaysProvider>
    );
  });
  test("should open form on click", () => {
    render(createEventBtn);
    fireEvent.click(screen.getByText("Create"));
    expect(screen.getByTestId("form-dialog")).toBeInTheDocument();
  });
});
