export function getAppointmentsForDay(state, day) {
  if (!state.days.length) return [];

  let filteredAppointments = [];

  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      filteredAppointments.push(dayObj);
    }
  }

  if (!filteredAppointments.length) return [];

  const appointments = filteredAppointments[0].appointments.map((appt) => {
    return state.appointments[appt];
  });

  return appointments;
}

export function getInterview(state, interview) {
  let result = {};

  for (let intObj in state.interviewers) {
    if (interview && state.interviewers[intObj].id === interview.interviewer) {
      result.student = interview.student;
      result.interviewer = state.interviewers[intObj];
    }
  }

  if (!Object.keys(result).length) {
    return null;
  }

  return result;
}

export function getInterviewersForDay(state, day) {
  let results = [];

  for (let dayObj of state.days) {
    if (day === dayObj.name) {
      for (let interviewer of dayObj.interviewers) {
        results.push(state.interviewers[interviewer]);
      }
    }
  }

  return results;
}

export function updateSpotsRemaining(state, appointments) {
  let currentDayObj;
  for (let day of state.days) {
    if (day.name === state.day) {
      currentDayObj = day;
    }
  }

  const apptsByDay = currentDayObj.appointments;
  let spotsRemaining = 0;

  for (let appt of apptsByDay) {
    if (!appointments[appt].interview) {
      spotsRemaining++;
    }
  }

  let days = [];

  for (let day of state.days) {
    if (day.name === state.day) {
      day.spots = spotsRemaining;
    }
    days.push(day);
  }

  return days;
}
