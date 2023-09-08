import { useRef } from "react";
import { useDays } from "../../context/daysContext";
import useDialog from "../../hooks/useDialog";
import {
  formatTimeString,
  getSortedEventsFromDay,
  sortEvents,
} from "../../utils/utils";
import EventDialog from "../events/EventDialog";
import { EventObject } from "../../types";

interface MonthSquareProps {
  date: Date;
  mainDate: Date;
  id: string;
}
export default function MonthDay({ date, mainDate, id }: MonthSquareProps) {
  const { days } = useDays();
  const events = getSortedEventsFromDay(id, days);

  const unfocus = date.getMonth() !== mainDate.getMonth() ? "unfocus" : "focus";

  return (
    <div className="month-square-container">
      <p className={`month-square-date ${unfocus}`}>{date.getDate()}</p>
      {events &&
        sortEvents(events).map((event) => (
          <EventItem event={event} key={event.id} />
        ))}
    </div>
  );
}

interface EventItemProps {
  event: EventObject;
}

export function EventItem({ event }: EventItemProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [toggleDialog, setToggleDialog] = useDialog(dialogRef);
  return (
    <>
      <li
        className="month-item event"
        data-eventid={event.id}
        data-dayid={event.dayId}
        onClick={() => setToggleDialog()}
      >
        {`${formatTimeString(event.startDate)} ${event.title}`}
      </li>
      {toggleDialog && (
        <EventDialog
          dialogRef={dialogRef}
          event={event}
          setToggleDialog={setToggleDialog}
        />
      )}
    </>
  );
}
