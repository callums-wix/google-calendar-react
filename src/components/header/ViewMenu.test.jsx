import { expect, test, describe, vi } from "vitest";
import { render, screen, userEvent } from "@testing-library/react";
import ViewMenu from "./ViewMenu";
import { VIEW } from "../../utils/utils";

describe("Test ViewMenu", () => {
  test("Button correctly toggles menu open", async () => {
    const mockSetView = vi.fn();
    const initalView = VIEW.WEEK;
    render(<ViewMenu view={initalView} setView={mockSetView} />);
    const toggleBtn = screen.getByTestId("view-menu-toggle");
    expect(toggleBtn.textContent).toBe(initalView.toLowerCase());
    await toggleBtn.click();
    expect(screen.getByTestId("view-menu")).toBeInTheDocument();
  });
});
