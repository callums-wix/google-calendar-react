import { CSS } from "../../utils/consts";
import "./createEventBtn.css";

interface CreateEventBtnProps {
  setShowEventForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateEventBtn = ({ setShowEventForm }: CreateEventBtnProps) => {
  return (
    <button
      className={`${CSS.H_CONTAINER} create-event-button`}
      onClick={() => setShowEventForm(true)}
    >
      <span className="event-button-plus"></span>
      {"Create"}
      <span className="view-arrow"></span>
    </button>
  );
};

export default CreateEventBtn;
