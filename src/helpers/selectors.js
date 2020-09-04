export function getAppointmentsForDay(state, day) {

  if (!state.days.length) return [];

  let filteredAppointments = [];
  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      filteredAppointments.push(dayObj)
    }
  }
  if (!filteredAppointments.length) return [];
  const appointments = filteredAppointments[0].appointments.map(appt => {
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

  console.log('result', result);

  if (!Object.keys(result).length) {
    return null;
  }

  return result;

}