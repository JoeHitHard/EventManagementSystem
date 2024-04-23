package com.add.project.ems.storage.tabels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.HashSet;
import java.util.Set;
import java.util.StringJoiner;

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
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @ManyToMany(mappedBy = "events", cascade = CascadeType.ALL)
    private Set<Attendee> attendees = new HashSet<>();

    public Event() {
    }

    public Event(String eventId, String eventName, Long eventTime, Long maxAttendees, String ownerName, String ownerEmail, String eventAddress, String password) {
        this.eventId = eventId;
        this.eventName = eventName;
        this.eventTime = eventTime;
        this.maxAttendees = maxAttendees;
        this.ownerName = ownerName;
        this.ownerEmail = ownerEmail;
        this.eventAddress = eventAddress;
        this.password = password;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Attendee> getAttendees() {
        return attendees;
    }

    public void setAttendees(Set<Attendee> attendees) {
        this.attendees = attendees;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Event.class.getSimpleName() + "[", "]")
                .add("eventId='" + eventId + "'")
                .add("eventName='" + eventName + "'")
                .add("eventTime=" + eventTime)
                .add("maxAttendees=" + maxAttendees)
                .add("ownerName='" + ownerName + "'")
                .add("ownerEmail='" + ownerEmail + "'")
                .add("eventAddress='" + eventAddress + "'")
                .add("password='" + password + "'")
                .add("attendees=" + attendees)
                .toString();
    }
}
