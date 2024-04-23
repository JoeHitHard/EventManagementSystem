// CreateEventForm.js
import React, { useState, useEffect } from 'react';

function CreateEventForm({ eventData, onCreateEvent, onClose }) {
  const [formData, setFormData] = useState({
    eventName: '',
    eventAddress: '',
    eventTime: '',
    ownerName: '',
    ownerEmail: '',
    password: ''
  });

  useEffect(() => {
    // Populate form fields with existing event details when editing
    if (eventData) {
      setFormData({
        eventName: eventData.eventName,
        eventAddress: eventData.eventAddress,
        eventTime: eventData.eventTime,
        ownerName: eventData.ownerName,
        ownerEmail: eventData.ownerEmail,
        password: '' // Assuming password field should not be populated when editing
      });
    }
  }, [eventData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use different function for editing an existing event
    if (eventData) {
      // Pass the updated event data to the parent component for handling
      onCreateEvent(eventData.eventId, formData);
    } else {
      // For creating a new event
      onCreateEvent(formData);
    }
  };

  return (
    <div>
      <h2>{eventData ? 'Edit Event' : 'Create Event'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Event Name" name="eventName" value={formData.eventName} onChange={handleChange} />
        <input type="text" placeholder="Event Address" name="eventAddress" value={formData.eventAddress} onChange={handleChange} />
        <input type="datetime-local" placeholder="Event Time" name="eventTime" value={formData.eventTime} onChange={handleChange} />
        <input type="text" placeholder="Owner Name" name="ownerName" value={formData.ownerName} onChange={handleChange} />
        <input type="text" placeholder="Owner Email" name="ownerEmail" value={formData.ownerEmail} onChange={handleChange} />
        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
        <button type="submit">{eventData ? 'Save' : 'Create'}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateEventForm;
