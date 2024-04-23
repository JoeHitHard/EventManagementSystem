// AttendeeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendeeList({ event, onClose, onEventChange }) {
  const [attendees, setAttendees] = useState([]);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [attendeeIdToDelete, setAttendeeIdToDelete] = useState(null);

  useEffect(() => {
    if (event) {
      fetchAttendees(event.eventId);
    }
  }, [event]);

  const fetchAttendees = (eventId) => {
    axios.get(`http://localhost:8082/events/${eventId}`)
      .then(response => {
        setAttendees(response.data.attendees);
      })
      .catch(error => {
        console.error('Error fetching attendees:', error);
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

    axios.delete(`http://localhost:8082/events/${event.eventId}/${password}/attendee/${attendeeIdToDelete}`)
      .then(response => {
        fetchAttendees(event.eventId);
        setShowPasswordInput(false);
        setPassword('');
        onEventChange(); // Notify parent component about the change
      })
      .catch(error => {
        console.error('Error deleting attendee:', error);
        alert('Error deleting attendee. Please check the password and try again.');
      });
  };

  return (
    <div className="attendees-container">
      <h2>Attendees for Event Name: {event.eventName}</h2>
      <button onClick={onClose}>Close</button>
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
                <button onClick={() => handleDeleteAttendee(attendee.attendeeId)}>Delete Attendee</button>
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
  );
}

export default AttendeeList;
