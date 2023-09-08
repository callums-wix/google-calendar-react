import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ViewMenu from "./ViewMenu";
import { VIEW } from "../../utils/utils";
import React from "react";

describe("Test ViewMenu", () => {
  let viewMenu: JSX.Element;
  let setView: (view: VIEW) => void;
  const initalView = VIEW.WEEK;
  beforeEach(() => {
    setView = vi.fn();
    viewMenu = <ViewMenu view={initalView} setView={setView} />;
  });
  test("should correctly toggles menu open", async () => {
    render(viewMenu);
    const toggleBtn = screen.getByTestId("view-menu-toggle");
    expect(toggleBtn.textContent).toBe(initalView.toLowerCase());
    fireEvent.click(toggleBtn);
    expect(screen.getByTestId("view-menu")).toBeInTheDocument();
  });
  test("should call set view with correct argument", () => {
    render(viewMenu);
    const toggleBtn = screen.getByTestId("view-menu-toggle");
    expect(toggleBtn.textContent).toBe(initalView.toLowerCase());
    fireEvent.click(toggleBtn);
    fireEvent.click(screen.getByText("Month"));
    expect(setView).toBeCalledWith(VIEW.MONTH);
  });
  test("should hide menu when toggle clicked second time", () => {
    render(viewMenu);
    const toggleBtn = screen.getByTestId("view-menu-toggle");
    expect(toggleBtn.textContent).toBe(initalView.toLowerCase());
    fireEvent.click(toggleBtn);
    fireEvent.click(toggleBtn);
    const menu = screen.queryByTestId("view-menu");
    expect(menu).toBeNull();
  });
});
