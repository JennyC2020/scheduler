import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames/bind";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full ": props.spots === 0,
  });

  const formatSpots = (spots) => {
    if (!spots) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    }
    return `${spots} spots remaining`;
  };

  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={dayClass}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
