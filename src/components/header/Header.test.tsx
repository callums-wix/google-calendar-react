import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { VIEW } from "../../utils/utils";
import React from "react";

describe("Test Header", () => {
  let header: JSX.Element;
  let setMainDate: (mainDate: Date) => void;
  let setView: (view: VIEW) => void;
  const initalView = VIEW.WEEK;
  const initalDay = 15;
  const initalDate = new Date(2023, 7, initalDay);
  beforeEach(() => {
    setView = vi.fn();
    setMainDate = vi.fn();
    header = (
      <Header
        view={initalView}
        mainDate={initalDate}
        setMainDate={setMainDate}
        setView={setView}
      />
    );
  });
  test("should correctly display current month", () => {
    render(header);
    const headerMonth = screen.getByTestId("header-month");
    expect(headerMonth.textContent).toBe("August 2023");
  });
  test("should correctly navigate though weeks", () => {
    render(header);
    const nextBtn = screen.getByTestId("switch-next");
    const prevBtn = screen.getByTestId("switch-prev");
    fireEvent.click(nextBtn);
    expect(setMainDate).toBeCalledWith(new Date(2023, 7, initalDay + 7));
    fireEvent.click(prevBtn);
    fireEvent.click(prevBtn);
    expect(setMainDate).toBeCalledWith(new Date(2023, 7, initalDay - 7));
  });
  test("should set call to current date on today button click", () => {
    render(header);
    const todayBtn = screen.getByTestId("switch-today");
    fireEvent.click(todayBtn);
    expect(setMainDate).toBeCalledWith(new Date());
  });
});
