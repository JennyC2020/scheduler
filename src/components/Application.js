import React, { useState, useEffect } from "react";
import DayList from 'components/DayList';
import "components/Application.scss";
import Appointment from 'components/Appointment';
//import { getAppointmentsForDay } from "helpers/selectors";

const axios = require('axios');


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//     interview: {
//       student: "Mike Tyson",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcom",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "4pm",
//     interview: {
//       student: "Tiger Woods",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcom",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "5pm",
//   },
// ];


export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });

  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));


  useEffect(() => {
    // axios.get('/api/days')
    //   .then(result => {
    //     setDays(result.data);
    //   })
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments')
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(appointment => <Appointment key={appointment.id} {...appointment} />)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

