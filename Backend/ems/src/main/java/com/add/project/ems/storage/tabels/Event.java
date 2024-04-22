package com.add.project.ems.storage.tabels;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "VARCHAR(36)")
    private String eventId;

    private String eventName;
    private Long eventTime;
    private Long maxAttendees;
    private String ownerName;
    private String ownerEmail;
    private String eventAddress;

    @ManyToMany(mappedBy = "events", cascade = CascadeType.ALL)
    private Set<Attendee> attendees = new HashSet<>();

    public Event() {
    }

    public Event(String eventName, Long eventTime, Long maxAttendees, String ownerName, String ownerEmail, String eventAddress) {
        this.eventName = eventName;
        this.eventTime = eventTime;
        this.maxAttendees = maxAttendees;
        this.ownerName = ownerName;
        this.ownerEmail = ownerEmail;
        this.eventAddress = eventAddress;
    }

    public Event(String eventId, String eventName, Long eventTime, Long maxAttendees, String ownerName, String ownerEmail, String eventAddress) {
        this.eventId = eventId;
        this.eventName = eventName;
        this.eventTime = eventTime;
        this.maxAttendees = maxAttendees;
        this.ownerName = ownerName;
        this.ownerEmail = ownerEmail;
        this.eventAddress = eventAddress;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public Long getEventTime() {
        return eventTime;
    }

    public void setEventTime(Long eventTime) {
        this.eventTime = eventTime;
    }

    public Long getMaxAttendees() {
        return maxAttendees;
    }

    public void setMaxAttendees(Long maxAttendees) {
        this.maxAttendees = maxAttendees;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }

    public String getEventAddress() {
        return eventAddress;
    }

    public void setEventAddress(String eventAddress) {
        this.eventAddress = eventAddress;
    }

    public Set<Attendee> getAttendees() {
        return attendees;
    }

    public void setAttendees(Set<Attendee> attendees) {
        this.attendees = attendees;
    }
}
