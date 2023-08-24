import { SyntheticEvent, useState } from "react";
import { CSS, STRINGS } from "../../utils/consts";
import "./eventForm.css";

interface EventFormProps {
  setShowEventForm: () => void;
  formRef: React.RefObject<HTMLDialogElement>;
}

export default function EventForm({
  setShowEventForm,
  formRef,
}: EventFormProps) {
  const [toggleError, setToggleError] = useState(false);
  return (
    <dialog className="form-dialog" ref={formRef}>
      <form
        className={`${CSS.V_CONTAINER} event-form`}
        action=""
        method="dialog"
        onSubmit={(e) => handleSubmit(e, setShowEventForm)}
      >
        <Input
          name="title"
          type="text"
          required={true}
          placeholder="Add title"
        />
        <Input
          name="start"
          type="datetime-local"
          required={true}
          placeholder=""
        />
        <Input
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
  name: string;
  placeholder: string;
  required: boolean;
  type: React.HTMLInputTypeAttribute;
}
function Input({ name, placeholder, required, type }: InputProps) {
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
      />
    </label>
  );
}

function handleSubmit(e: SyntheticEvent, setShowEventForm: () => void) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const formJson = Object.fromEntries(formData.entries());
  setShowEventForm();
}
