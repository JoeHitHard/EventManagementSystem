package com.add.project.ems.storage.tabels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "attendee")
public class Attendee {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "VARCHAR(36)")
    private String attendeeId;

    private String name;
    private String email;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "attendee_event",
            joinColumns = @JoinColumn(name = "attendee_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private Set<Event> events = new HashSet<>();

    public Attendee() {
    }

    public Attendee(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public Attendee(String attendeeId, String name, String email) {
        this.attendeeId = attendeeId;
        this.name = name;
        this.email = email;
    }

    public String getAttendeeId() {
        return attendeeId;
    }

    public void setAttendeeId(String attendeeId) {
        this.attendeeId = attendeeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }
}
