import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EventObject } from "../../types";
import WeekColumn from "./WeekColumn";
import { createDayId } from "../../utils/utils";

describe("WeekColumn", () => {
  let weekColumn: JSX.Element;
  const mockDate = new Date(2023, 9, 15);
  const mockEvents: EventObject[] = [
    {
      id: "26569",
      dayId: "Thu-Jul-27-2023",
      title: "Event 1",
      startDate: "2023-07-27T13:25",
      endDate: "2023-07-27T15:25",
      description: "",
    },
    {
      id: "58296",
      dayId: "Thu-Jul-27-2023",
      title: "Event 2",
      startDate: "2023-07-27T10:30",
      endDate: "2023-07-27T11:30",
      description: "",
    },
  ];
  beforeEach(() => {
    weekColumn = (
      <WeekColumn events={mockEvents} dayId={createDayId(mockDate)} />
    );
  });
  test("should render EventElements components", () => {
    const col = render(weekColumn);
    const elements = screen.getAllByTestId("event-element");
    expect(elements).toHaveLength(mockEvents.length);
    expect(col.baseElement).toHaveTextContent("Event 1");
    expect(col.baseElement).toHaveTextContent("Event 2");
  });
});
