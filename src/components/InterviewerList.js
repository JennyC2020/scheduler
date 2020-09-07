import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default function InterviewerList({
  interviewers,
  interviewer,
  setInterviewer,
}) {
  const interviewerData = interviewers.map(({id, name, avatar}) => {
    return (
      <InterviewerListItem
        key={id}
        name={name}
        avatar={avatar}
        selected={id === interviewer}
        setInterviewer={() => setInterviewer(id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerData}</ul>
    </section>
  );
}
