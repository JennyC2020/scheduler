import React from 'react';
import DayListItem from './DayListItem';

export default function DayList({ days, day, setDay }) {

  const daysData = days.map(({ id, name, spots }) => {
    return <DayListItem
      key={id}
      name={name}
      spots={spots}
      selected={name === day}
      setDay={setDay} />
  })

  return (
    <ul>
      {daysData}
    </ul>
  );

}