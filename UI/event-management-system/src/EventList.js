import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './eventlist.css';

function EventList() {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [showAttendees, setShowAttendees] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [eventIdToDelete, setEventIdToDelete] = useState(null);
  const [attendeeIdToDelete, setAttendeeIdToDelete] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8082/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const fetchAttendees = eventId => {
    axios.get(`http://localhost:8082/events/${eventId}`)
      .then(response => {
        setAttendees(response.data.attendees);
      })
      .catch(error => {
        console.error('Error fetching attendees:', error);
      });
  };

  const handleShowAttendees = (eventId, eventName) => {
    setSelectedEventName(eventName);
    setSelectedEventId(eventId);
    fetchAttendees(eventId);
    setShowAttendees(true);
  };

  const handleCloseAttendees = () => {
    setAttendees([]);
    setShowAttendees(false);
    setSelectedEventId("");
    setSelectedEventName("");
  };

  const handleToggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const eventData = {};
    formData.forEach((value, key) => {
      eventData[key] = value;
    });
    eventData.eventTime = new Date(eventData.eventTime).getTime() / 1000;

    axios.post('http://localhost:8082/events', eventData)
      .then(response => {
        axios.get('http://localhost:8082/events')
          .then(response => {
            setEvents(response.data);
          })
          .catch(error => {
            console.error('Error fetching events:', error);
          });
        setShowCreateForm(false);
      })
      .catch(error => {
        console.error('Error creating event:', error);
      });
  };

  const handleDeleteClick = (eventId) => {
    setShowPasswordInput(true);
    setEventIdToDelete(eventId);
  };

  const handleDeleteEvent = () => {
    if (!password) {
      alert('Please enter the password.');
      return;
    }

    axios.delete(`http://localhost:8082/events/${eventIdToDelete}/${password}`)
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
      })
      .catch(error => {
        console.error('Error deleting event:', error);
        alert('Error deleting event. Please check the password and try again.');
      });
  };

  const handleDeleteAttendee = (attendeeId) => {
    setAttendeeIdToDelete(attendeeId);
    setShowPasswordInput(true);
  };

  const handleConfirmDeleteAttendee = () => {
    if (!password) {
      alert('Please enter the password.');
      return;
    }

    axios.delete(`http://localhost:8082/events/${selectedEventId}/${password}/attendee/${attendeeIdToDelete}`)
      .then(response => {
        // After successful deletion, refresh attendee list
        fetchAttendees(selectedEventId);
        setShowPasswordInput(false); // Hide the password input field
        setPassword(''); // Clear the password input
      })
      .catch(error => {
        console.error('Error deleting attendee:', error);
        alert('Error deleting attendee. Please check the password and try again.');
      });
  };

  return (
    <div>
      <h1>Events</h1>
      <button onClick={handleToggleCreateForm}>Create Event</button>
      {showCreateForm && (
        <form onSubmit={handleCreateEvent}>
          <input type="text" placeholder="Event Name" name="eventName" />
          <input type="text" placeholder="Event Address" name="eventAddress" />
          <input type="datetime-local" placeholder="Event Time" name="eventTime" />
          <input type="text" placeholder="Owner Name" name="ownerName" />
          <input type="text" placeholder="Owner Email" name="ownerEmail" />
          <input type="text" placeholder="Password" name="password" />
          <button type="submit">Create</button>
        </form>
      )}

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
                <button onClick={() => handleShowAttendees(event.eventId, event.eventName)}>Show Attendees</button>
                {!(showPasswordInput && event.eventId === eventIdToDelete) && <button onClick={() => handleDeleteClick(event.eventId)}>Delete</button>}
                {showPasswordInput && event.eventId === eventIdToDelete && (
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                )}
                {showPasswordInput && event.eventId === eventIdToDelete && (
                  <button onClick={handleDeleteEvent}>Confirm Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAttendees && (
        <div className="attendees-container">
          <h2>Attendees for Event Name: {selectedEventName}</h2>
          <button onClick={handleCloseAttendees}>Close</button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map(attendee => (
                <tr key={attendee.attendeeId}>
                  <td>{attendee.name}</td>
                  <td>{attendee.email}</td>
                  <td>
                    {!(showPasswordInput && attendeeIdToDelete === attendee.attendeeId) && <button onClick={() => handleDeleteAttendee(attendee.attendeeId)}>Delete Attendee</button>}
                    {showPasswordInput && attendeeIdToDelete === attendee.attendeeId && (
                      <div>
                        <input
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleConfirmDeleteAttendee}>Confirm Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EventList;
