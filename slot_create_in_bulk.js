const startDate = new Date("2024-02-20T10:00:00.000Z");
const endDate = new Date("2024-02-20T10:30:00.000Z");
const duration = 30; // Duration in minutes

for (let i = 0; i < 48; i++) {
  // Format dates to ISO string and slice to get the required format
  const startISO = startDate.toISOString();
  const endISO = endDate.toISOString();

    fetch("https://edu.21-school.ru/services/graphql", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-EN",
    "content-type": "application/json",
    "schoolid": "667a42af-5469-4a33-9858-677d9d20956a",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "userrole": "STUDENT",
    "x-edu-org-unit-id": "667a42af-5469-4a33-9858-677d9d20956a",
    "x-edu-product-id": "96098f4b-5708-4c42-a62c-6893419169b3"
  },
  "referrer": "https://edu.21-school.ru/",
  "referrerPolicy": "origin",
  "body": "{\"operationName\":\"calendarAddEvent\",\"variables\":{\"start\":\""+startISO +"\",\"end\":\""+endISO+"\"},\"query\":\"mutation calendarAddEvent($start: DateTime!, $end: DateTime!) {\\n  student {\\n    addEventToTimetable(start: $start, end: $end) {\\n      ...CalendarEvent\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment CalendarEvent on CalendarEvent {\\n  id\\n  start\\n  end\\n  description\\n  eventType\\n  eventCode\\n  eventSlots {\\n    id\\n    type\\n    start\\n    end\\n    __typename\\n  }\\n  bookings {\\n    ...CalendarReviewBooking\\n    __typename\\n  }\\n  exam {\\n    ...CalendarEventExam\\n    __typename\\n  }\\n  studentCodeReview {\\n    studentGoalId\\n    __typename\\n  }\\n  activity {\\n    ...CalendarEventActivity\\n    studentFeedback {\\n      id\\n      rating\\n      comment\\n      __typename\\n    }\\n    status\\n    activityType\\n    isMandatory\\n    isWaitListActive\\n    isVisible\\n    comments {\\n      type\\n      createTs\\n      comment\\n      __typename\\n    }\\n    organizers {\\n      id\\n      login\\n      __typename\\n    }\\n    __typename\\n  }\\n  goals {\\n    goalId\\n    goalName\\n    __typename\\n  }\\n  penalty {\\n    ...Penalty\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment CalendarReviewBooking on CalendarBooking {\\n  id\\n  answerId\\n  eventSlotId\\n  task {\\n    id\\n    goalId\\n    goalName\\n    studentTaskAdditionalAttributes {\\n      cookiesCount\\n      __typename\\n    }\\n    assignmentType\\n    __typename\\n  }\\n  eventSlot {\\n    id\\n    start\\n    end\\n    event {\\n      eventUserRole\\n      __typename\\n    }\\n    school {\\n      shortName\\n      __typename\\n    }\\n    __typename\\n  }\\n  verifierUser {\\n    ...CalendarReviewUser\\n    __typename\\n  }\\n  verifiableInfo {\\n    verifiableStudents {\\n      ...VerifiableStudentItem\\n      __typename\\n    }\\n    team {\\n      name\\n      __typename\\n    }\\n    __typename\\n  }\\n  bookingStatus\\n  isOnline\\n  vcLinkUrl\\n  additionalChecklist {\\n    filledChecklistId\\n    filledChecklistStatusRecordingEnum\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment CalendarReviewUser on User {\\n  id\\n  login\\n  __typename\\n}\\n\\nfragment VerifiableStudentItem on VerifiableStudent {\\n  userId\\n  login\\n  avatarUrl\\n  levelCode\\n  isTeamLead\\n  cookiesCount\\n  codeReviewPoints\\n  school {\\n    shortName\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment CalendarEventExam on Exam {\\n  examId\\n  eventId\\n  beginDate\\n  endDate\\n  name\\n  location\\n  currentStudentsCount\\n  maxStudentCount\\n  updateDate\\n  goalId\\n  goalName\\n  isWaitListActive\\n  isInWaitList\\n  stopRegisterDate\\n  __typename\\n}\\n\\nfragment CalendarEventActivity on ActivityEvent {\\n  activityEventId\\n  eventId\\n  name\\n  beginDate\\n  endDate\\n  isRegistered\\n  description\\n  currentStudentsCount\\n  maxStudentCount\\n  location\\n  updateDate\\n  isWaitListActive\\n  isInWaitList\\n  stopRegisterDate\\n  __typename\\n}\\n\\nfragment Penalty on Penalty {\\n  comment\\n  id\\n  duration\\n  status\\n  startTime\\n  createTime\\n  penaltySlot {\\n    currentStudentsCount\\n    description\\n    duration\\n    startTime\\n    id\\n    endTime\\n    __typename\\n  }\\n  reasonId\\n  __typename\\n}\\n\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

  // Increment start and end times by 30 minutes
  startDate.setMinutes(startDate.getMinutes() + duration);
  endDate.setMinutes(endDate.getMinutes() + duration);
}

