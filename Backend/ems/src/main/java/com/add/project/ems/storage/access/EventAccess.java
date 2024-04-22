package com.add.project.ems.storage.access;

import com.add.project.ems.storage.tabels.Event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventAccess extends JpaRepository<Event, String> {
}
