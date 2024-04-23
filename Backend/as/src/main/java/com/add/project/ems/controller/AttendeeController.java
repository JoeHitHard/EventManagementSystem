package com.add.project.ems.controller;

import com.add.project.ems.storage.access.AttendeeAccess;
import com.add.project.ems.storage.access.EventAccess;
import com.add.project.ems.storage.tabels.Attendee;
import com.add.project.ems.storage.tabels.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/attendees")
public class AttendeeController {

    @Autowired
    private AttendeeAccess attendeeAccess;
    @Autowired
    private EventAccess eventAccess;


    // Create Operation
    @PostMapping("/{eventId}")
    public Attendee addAttendee(@PathVariable String eventId, @RequestBody Attendee attendee) {
        Optional<Event> event = eventAccess.findById(eventId);
        return attendeeAccess.save(attendee);
    }

    // Read Operations
    @GetMapping("/{id}")
    public Optional<Attendee> getAttendeeById(@PathVariable String id) {
        return attendeeAccess.findById(id);
    }

    @GetMapping
    public List<Attendee> getAllAttendees() {
        return attendeeAccess.findAll();
    }

    // Update Operation
    @PutMapping("/{id}")
    public Attendee updateAttendee(@PathVariable String id, @RequestBody Attendee updatedAttendee) {
        updatedAttendee.setAttendeeId(id); // Ensure the ID is set
        return attendeeAccess.save(updatedAttendee);
    }

    // Delete Operation
    @DeleteMapping("/{id}")
    public void deleteAttendee(@PathVariable String id) {
        attendeeAccess.deleteById(id);
    }
}
