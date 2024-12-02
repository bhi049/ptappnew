import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { getTrainings } from '../services/api';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    const data = await getTrainings();
    const trainings = data._embedded?.trainings || [];
    const formattedEvents = trainings.map((training) => ({
      title: `${training.activity}`,
      start: new Date(training.date),
      end: new Date(new Date(training.date).getTime() + training.duration * 60000), // Duration in minutes
    }));
    setEvents(formattedEvents);
  };

  return (
    <div>
      <h2>Kalenteri</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
      />
    </div>
  );
}

export default CalendarPage;
