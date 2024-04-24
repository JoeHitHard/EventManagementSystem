// EventList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './eventlist.css';
import CreateEventForm from './CreateEventForm';
import EventTable from './EventTable';
import AttendeeList from './AttendeeList';

function EventList() {
  const [events, setEvents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAttendees, setShowAttendees] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEditForm, setShowEditForm] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);
  const handleToggleEditForm = (event) => {
      setShowEditForm(true);
      event.eventTime = new Date(event.eventTime * 1000).toISOString().slice(0,16);;
      setActiveEvent(event);
    };
    const handleEditEvent = (eventData) => {
      eventData.eventTime = new Date(eventData.eventTime).getTime() / 1000;
      axios.put(`http://localhost:8082/events/${activeEvent.eventId}`, eventData)
        .then(response => {
          window.location.reload();
        })
        .catch(error => {
          console.error('Error creating event:', error);
        });
    };
  

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('http://localhost:8082/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  };

  const handleToggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleCreateEvent = (eventData) => {
    eventData.eventTime = new Date(eventData.eventTime).getTime() / 1000;
    axios.post('http://localhost:8082/events', eventData)
      .then(response => {
        fetchEvents();
        setShowCreateForm(false);
      })
      .catch(error => {
        console.error('Error creating event:', error);
      });
  };

  const handleShowAttendees = (event) => {
    setSelectedEvent(event);
    setShowAttendees(true);
  };

  const handleCloseAttendees = () => {
    setShowAttendees(false);
  };

  return (
    <div className="eventlist-container">
      <h1>Events</h1>
      <button onClick={handleToggleCreateForm}>Create Event</button>
      {showCreateForm && (
        <CreateEventForm onCreateEvent={handleCreateEvent} />
      )}

      <EventTable
        events={events}
        handleToggleEditForm={handleToggleEditForm}
        onShowAttendees={handleShowAttendees}
      />

      {showEditForm && (
        <CreateEventForm 
        eventData={activeEvent}
        onCreateEvent={handleEditEvent} />
      )}

      {showAttendees && (
        <AttendeeList
          event={selectedEvent}
          onClose={handleCloseAttendees}
          onEventChange={fetchEvents}
        />
      )}
    </div>
  );
}

export default EventList;
