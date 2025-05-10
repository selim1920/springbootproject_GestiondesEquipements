package com.example.demo.repository;

import com.example.demo.Bean.Intervention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterventionRepository extends JpaRepository<Intervention, Long> {
    // Custom queries (if needed) can be added here
}
