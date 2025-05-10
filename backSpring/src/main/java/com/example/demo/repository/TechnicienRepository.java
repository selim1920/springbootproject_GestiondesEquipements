package com.example.demo.repository;

import com.example.demo.Bean.Technicien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // ❗ IMPORT IMPORTANT

@Repository
public interface TechnicienRepository extends JpaRepository<Technicien, Long> {
    List<Technicien> findByDisponibiliteTrue();  // ✅ Méthode manquante à ajouter
}
