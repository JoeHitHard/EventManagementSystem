package com.add.project.ems;

import com.add.project.ems.storage.access.AttendeeAccess;
import com.add.project.ems.storage.access.EventAccess;
import com.add.project.ems.storage.tabels.Attendee;
import com.add.project.ems.storage.tabels.Event;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

@SpringBootApplication
public class TestDataGenerator implements CommandLineRunner {
    @Autowired
    private EventAccess eventAccess;
    @Autowired
    private AttendeeAccess attendeeAccess;

    public static void main(String[] args) {
        SpringApplication.run(TestDataGenerator.class, args);
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        generateTestData();
        generateTestData(eventAccess.findAll());
    }

    private void generateTestData() {
        Faker faker = new Faker();
        for (int i = 0; i < 10; i++) {
            Event event = new Event();
            event.setEventName(faker.gameOfThrones().character());
            event.setEventTime(generateRandomTime());
            event.setMaxAttendees((long) faker.number().numberBetween(5, 20));
            event.setOwnerName(faker.name().fullName());
            event.setOwnerEmail(faker.internet().emailAddress());
            event.setEventAddress(faker.address().fullAddress());
            eventAccess.save(event);
        }
    }

    private void generateTestData(List<Event> events) {
        Faker faker = new Faker();
        for (int i = 0; i < 100; i++) {
            Attendee attendee = new Attendee();
            attendee.setName(faker.name().fullName());
            attendee.setEmail(faker.internet().emailAddress());
            Set<Event> events1 = attendee.getEvents();
            events1.add(getRandomEvent(events));
            events1.add(getRandomEvent(events));
            events1.add(getRandomEvent(events));
            attendeeAccess.save(attendee);
        }
    }

    public Event getRandomEvent(List<Event> events) {
        if (events == null || events.isEmpty()) {
            return null;
        }
        Random random = new Random();
        int randomIndex = random.nextInt(events.size());
        return events.get(randomIndex);
    }


    private Long generateRandomTime() {
        long now = Instant.now().getEpochSecond();
        long thirtyDaysInSeconds = 30L * 24 * 60 * 60;
        return ThreadLocalRandom.current().nextLong(now, now + thirtyDaysInSeconds);
    }
}
