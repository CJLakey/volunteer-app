"use client";
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import NavBar from './NavBar';
import Footer from './Footer';

export default function CalendarComponent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch('./api/schedule');
        const data = await response.json();

        const formattedEvents = data.schedules.map(schedule => ({
          title: `${schedule.first_name} ${schedule.last_name} - ${schedule.volunteer_type}`,
          start: schedule.volunteer_date ? new Date(schedule.volunteer_date) : null,
          allDay: true,
          extendedProps: {
            volunteerType: schedule.volunteer_type,
          },
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  const validEvents = events.filter(event => event.start !== null);

  return (
    <div className='flex flex-col'>
        <NavBar />
        <div className="flex justify-center items-center min-h-screen bg-green-100">
          <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={validEvents}
              editable={false}
              height="auto"
              dayMaxEventRows={true} // Allow multiple event rows per day
              eventContent={(arg) => {
                // Custom event rendering to show full text
                return (
                  <div title={arg.event.title} className="truncate">
                    {arg.event.title}
                  </div>
                );
              }}
              eventDidMount={(info) => {
                // Tooltip on hover
                info.el.setAttribute('title', info.event.title);

                // Color coding based on volunteer type
                const volunteerType = info.event.extendedProps.volunteerType;
                if (volunteerType === 'counter') {
                  info.el.style.backgroundColor = 'darkgreen';
                } else if (volunteerType === 'cleaner') {
                  info.el.style.backgroundColor = 'darkblue';
                } else if (volunteerType === 'meals') {
                  info.el.style.backgroundColor = 'darkcoral';
                }
              }}
            />
          </div>
          <style jsx global>{`
            .fc {
              color: black;
            }
            .fc-daygrid-day-number {
              color: black;
            }
            .fc-toolbar-title {
              color: black;
            }
            .truncate {
              white-space: normal;
              overflow: visible;
            }
          `}</style>
        </div>
        <Footer />
    </div>
  );
}
