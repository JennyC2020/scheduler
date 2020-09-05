import React, { useState, useEffect } from "react";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';


import "components/Application.scss";

const axios = require('axios');

export default function Application(props) {
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState('Monday')
  // const [appointments, setAppointments] = useState({});

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day })
  // const setDays = days => setState(prev => ({ ...prev, days }));

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

  // don't know where exactly to be passing down the interviewersArray!
  const interviewersArray = getInterviewersForDay(state, state.day);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log('appointment', appointment);
    console.log('appointments', appointments);


    setState({
      ...state,
      appointments
    })

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(res => {
        console.log('PUT res', res);
        setState({
          ...state,
          appointments
        })
      })

  }

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log('appointment', appointment);
    console.log('appointments', appointments);

    setState({
      ...state,
      appointments
    })

    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        console.log('DELETE res', res);
        setState({
          ...state,
          appointments
        })
      })

  }

  // axios.get('/api/debug/reset').then(res => console.log(res));

  const appointmentData = apptArray.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewersArray}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
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
          <Appointment key="last" time="6pm"
            interviewers={interviewersArray}
            bookInterview={bookInterview}
          />
        </section>
      }
    </main>
  );
}