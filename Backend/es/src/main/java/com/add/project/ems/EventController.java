package com.add.project.ems;

import com.add.project.ems.storage.access.AttendeeAccess;
import com.add.project.ems.storage.access.EventAccess;
import com.add.project.ems.storage.tabels.Attendee;
import com.add.project.ems.storage.tabels.Event;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@RestController
@RequestMapping("/events")
public class EventController {
    private static final Logger logger = LoggerFactory.getLogger(EventController.class);


    @Autowired
    private EventAccess eventAccess;

    @Autowired
    private AttendeeAccess attendeeAccess;

    // Create Operation
    @PostMapping
    public Event addEvent(@RequestBody Event event) {
        return eventAccess.save(event);
    }

    // Read Operations
    @GetMapping("/{id}")
    public Optional<Event> getEventById(@PathVariable String id) {
        return eventAccess.findById(id);
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventAccess.findAll();
    }

    // Update Operation
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable String id, @RequestBody Event updatedEvent) {
        Optional<Event> event = eventAccess.findById(id);
        if (event.isPresent()) {
            if (event.get().getPassword().equals(updatedEvent.getPassword())) {
                updatedEvent.setEventId(id);
                return eventAccess.save(updatedEvent);
            } else {
                throw new RuntimeException("Event ID password not valid");
            }
        }
        throw new RuntimeException("Event ID doesnt exits");
    }

    // Delete Operation
    @DeleteMapping("/{id}/{password}")
    public Event deleteEvent(@PathVariable String id, @PathVariable String password) {
        logger.info("id: {}", id);
        Optional<Event> event = eventAccess.findById(id);
        if (event.isPresent()) {
            if (event.get().getPassword().equals(password)) {
                eventAccess.deleteById(id);
                logger.info("id: {} is deleted", id);
                return event.get();
            }
            throw new RuntimeException("Event ID password not valid");
        }
        throw new RuntimeException("Event ID doesnt exits: " + id );
    }

    @DeleteMapping("/{eventId}/{password}/attendee/{attendeeId}")
    public Event deleteEventAttendee(@PathVariable String eventId, @PathVariable String password, @PathVariable String attendeeId) {
        Optional<Event> event = eventAccess.findById(eventId);
        if (event.isPresent()) {
            if (event.get().getPassword().equals(password)) {
                Event selectedEvent = event.get();
                Optional<Attendee> attendee = attendeeAccess.findById(attendeeId);
                if (attendee.isPresent()) {
                    selectedEvent.getAttendees().remove(attendee.get());
                    eventAccess.save(selectedEvent);
                    attendeeAccess.delete(attendee.get());
                }
                return selectedEvent;
            } else {
                throw new RuntimeException("Event ID password not valid");
            }
        }
        throw new RuntimeException("Event ID doesnt exits: " + eventId);
    }

    @GetMapping("/{eventId}/attendee")
    public Set<Attendee> getAllEvents(@PathVariable String eventId) {
        Optional<Event> event = eventAccess.findById(eventId);
        if (event.isPresent()) {
            return event.get().getAttendees();
        }
        throw new RuntimeException("Event ID doesnt exits");
    }
}

