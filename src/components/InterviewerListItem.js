import React from 'react';
import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {

  const interviewClass = classNames(
    'interviewers__item',
    { 'interviewers__item--selected': props.selected },
  );

  const interviewImgClass = classNames(
    'interviewers__item-image',
    { 'interviewers__item--selected-image': props.selected }
  );

  // let interviewName;

  // if (interviewClass === 'interviewers__item interviewers__item--selected') {
  //   interviewName = props.name;
  // }

  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img
        className={interviewImgClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );


}