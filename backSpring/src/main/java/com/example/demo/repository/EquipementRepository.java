package com.example.demo.repository;

import com.example.demo.Bean.Equipement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipementRepository extends JpaRepository<Equipement, Long> {
    List<Equipement> findByEtat(String etat);
    long countByEtat(String etat);
    List<Equipement> findByNomContainingIgnoreCase(String nom);

    // Pagination supporté automatiquement par JpaRepository
    // No need for explicit method for pagination, it's provided by findAll(Pageable pageable)
}
