import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./form";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";
import Confirm from "./Confirm";

// Different modes of the appointment
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM_DELETE = "CONFIRM_DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  // State machine hook which allows us to go forwards or backwards in the history of the component
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Helper to update and transition mode when saving appointment
  const save = (name, interviewer) => {
    if (!name || !interviewer) {
      transition(ERROR_SAVE);
      return;
    }

    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then((response) => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE));
  };
  // Helper to update and transition mode when deleting appointment
  const destroy = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then((response) => transition(EMPTY))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  // Conditional rendering based on the current "mode"
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM_DELETE)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRM_DELETE && (
        <Confirm
          message="Are you sure you would like to delete this?"
          onCancel={back}
          onConfirm={destroy}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Appointment could not be saved." onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Appointment could not be deleted." onClose={back} />
      )}
    </article>
  );
}
