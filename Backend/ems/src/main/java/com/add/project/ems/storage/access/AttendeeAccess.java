package com.add.project.ems.storage.access;

import com.add.project.ems.storage.tabels.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendeeAccess extends JpaRepository<Attendee, String> {
}
