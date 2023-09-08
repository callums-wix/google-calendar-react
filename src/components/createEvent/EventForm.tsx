import { SyntheticEvent, useState } from "react";
import { CSS, STRINGS } from "../../utils/consts";
import "./eventForm.css";
import { useDays } from "../../context/daysContext";
import { EventObject } from "../../types";
import { createDayId, createEventId } from "../../utils/utils";

interface EventFormProps {
  setShowEventForm: () => void;
  formRef: React.RefObject<HTMLDialogElement>;
}
interface FormData {
  title: string;
  start: string;
  end: string;
  desc: string;
}
type InputNames = keyof FormData;

export default function EventForm({
  setShowEventForm,
  formRef,
}: EventFormProps) {
  const { addEvent } = useDays();
  const [toggleError, setToggleError] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    start: "",
    end: "",
    desc: "",
  });

  function handleSubmit(e: SyntheticEvent, setShowEventForm: () => void) {
    e.preventDefault();
    if (
      new Date(formData.start.toString()).getTime() >=
      new Date(formData.end.toString()).getTime()
    ) {
      setToggleError(true);
      return;
    }
    const event: EventObject = {
      id: createEventId(),
      dayId: createDayId(new Date(formData.start.toString())),
      title: formData.title,
      startDate: formData.start,
      endDate: formData.end,
      description: formData.desc,
    };
    addEvent(event);
    setShowEventForm();
  }

  return (
    <dialog className="form-dialog" ref={formRef}>
      <form
        className={`${CSS.V_CONTAINER} event-form`}
        action=""
        method="dialog"
        onSubmit={(e) => handleSubmit(e, setShowEventForm)}
        data-testid="form-dialog"
      >
        <Input
          formData={formData}
          setFormData={setFormData}
          name="title"
          type="text"
          required={true}
          placeholder="Add title"
        />
        <Input
          formData={formData}
          setFormData={setFormData}
          name="start"
          type="datetime-local"
          required={true}
          placeholder=""
        />
        <Input
          formData={formData}
          setFormData={setFormData}
          name="end"
          type="datetime-local"
          required={true}
          placeholder=""
        />
        <label htmlFor="form-desc" className="form-desc-label">
          <textarea
            id="form-desc"
            name="form-desc"
            placeholder="Add description"
            cols={40}
            rows={3}
            data-testid="form-desc"
            value={formData.desc}
            onChange={(e) =>
              setFormData((prevValue) => ({
                ...prevValue,
                desc: e.target.value,
              }))
            }
          />
        </label>
        <button
          className="button hairline-button event-submit-button"
          type="submit"
          data-testid="form-submit"
        >
          Save
        </button>
        {toggleError && (
          <span className="error-tooltip">{STRINGS.TOOLTIP_DATE}</span>
        )}
      </form>
      <button
        className="button close-dialog form-dialog-close"
        onClick={() => setShowEventForm()}
      ></button>
    </dialog>
  );
}

interface InputProps {
  name: InputNames;
  placeholder: string;
  required: boolean;
  type: React.HTMLInputTypeAttribute;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

function Input({
  name,
  placeholder,
  required,
  type,
  formData,
  setFormData,
}: InputProps) {
  return (
    <label htmlFor={`form-${name}`} className={`form-${name}-label`}>
      {`${name}: `}
      <input
        id={`form-${name}`}
        name={`form-${name}`}
        type={type}
        className={`input form-${name}-input`}
        required={required}
        placeholder={placeholder}
        data-testid={`form-${name}`}
        value={formData[name]}
        onChange={(e) =>
          setFormData((prevValue) => ({ ...prevValue, [name]: e.target.value }))
        }
      />
    </label>
  );
}
