import React, { useState, useEffect } from "react";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterview } from '../helpers/selectors';


import "components/Application.scss";

const axios = require('axios');





export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day })


  useEffect(() => {

    const promiseDays = axios.get('/api/days');
    const promiseAppointments = axios.get('/api/appointments');
    const promiseInterviewers = axios.get('/api/interviewers');

    Promise.all([promiseDays, promiseAppointments, promiseInterviewers]).then((all) => {
      let [days, appointments, interviewers] = all;

      days = days.data;
      appointments = appointments.data;
      interviewers = interviewers.data;

      console.log('days', days);
      console.log('appointments', appointments);
      console.log('interviewers', interviewers);

      setState(prev => ({ ...prev, days, appointments, interviewers }));
    })
  }, []);

  const apptArray = getAppointmentsForDay(state, state.day);
  const appointmentData = apptArray.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
    />
  });


  return (
    <main className="layout">
      {
        <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
        </section>
      }
      {
        <section className="schedule">
          {appointmentData}
          <Appointment key="last" time="6pm" />
        </section>
      }
    </main>
  );
}