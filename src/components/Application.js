import React from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment/index";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  // Import state management functions
  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();

  // Build schedule based on our fetched data
  const apptArray = getAppointmentsForDay(state, state.day);
  const interviewersArray = getInterviewersForDay(state, state.day);

  const appointmentData = apptArray.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersArray}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
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
            <DayList days={state.days} day={state.day} setDay={setDay} />
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
          <Appointment
            key="last"
            time="5pm"
            interviewers={interviewersArray}
            bookInterview={bookInterview}
          />
        </section>
      }
    </main>
  );
}
