// EventTable.js
import React, { useState } from 'react';
import axios from 'axios';
import CreateEventForm from './CreateEventForm';


function EventTable({ events, onShowAttendees, setEvents }) {
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [password, setPassword] = useState('');
    const [activeEvent, setActiveEvent] = useState(null);
    const [showEditForm, setShowEditForm] = useState(null);
    const handleToggleEditForm = (event) => {
        setShowEditForm(true);
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

    const handleDeleteClick = (eventId) => {
        setShowPasswordInput(true);
        setActiveEvent(eventId);
      };
    
      const handleDeleteEvent = () => {
        if (!password) {
          alert('Please enter the password.');
          return;
        }
    
        axios.delete(`http://localhost:8082/events/${activeEvent.eventId}/${password}`)
          .then(response => {
            // After successful deletion, refresh event list
            axios.get(`http://localhost:8082/events`)
              .then(response => {
                setEvents(response.data);
              })
              .catch(error => {
                console.error('Error fetching events:', error);
              });
            setShowPasswordInput(false); // Hide the password input field
            setPassword(''); // Clear the password input
            window.location.reload();
        })
          .catch(error => {
            console.error('Error deleting event:', error);
            alert('Error deleting event. Please check the password and try again.');
          });
      };
  return (
    <div>
        <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Time</th>
          <th>Owner</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <tr key={event.eventId}>
            <td>{event.eventName}</td>
            <td>{event.eventAddress}</td>
            <td>{new Date(event.eventTime * 1000).toLocaleString()}</td>
            <td>{event.ownerName}</td>
            <td>
              <button onClick={() => onShowAttendees(event)}>Show Attendees</button>
              <button onClick={handleToggleEditForm}>Edit Event</button>
              {!(showPasswordInput && event.eventId === activeEvent.eventId) && <button onClick={() => handleDeleteClick(event)}>Delete</button>}
                {showPasswordInput && event.eventId === activeEvent.eventId && (
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                )}
                {showPasswordInput && event.eventId === activeEvent && (
                  <button onClick={handleDeleteEvent}>Confirm Delete</button>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      {showEditForm && (
        <CreateEventForm 
        eventData={activeEvent}
        onCreateEvent={handleEditEvent} />
      )}
    </div>
  );
}

export default EventTable;
