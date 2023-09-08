import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DaysProvider } from "../../context/daysContext";
import MainCalendar from "./MainCalendar";
import { VIEW } from "../../utils/utils";

describe("MainCalendar", () => {
  const mockDate = new Date(2023, 9, 15);
  test("should render correct view based on input", () => {
    render(
      <DaysProvider>
        <MainCalendar mainDate={mockDate} view={VIEW.WEEK} />
      </DaysProvider>
    );
    expect(screen.queryByTestId("week-header")).toBeInTheDocument();
    render(
      <DaysProvider>
        <MainCalendar mainDate={mockDate} view={VIEW.MONTH} />
      </DaysProvider>
    );
    expect(screen.queryByTestId("month-header")).toBeInTheDocument();
  });
});
