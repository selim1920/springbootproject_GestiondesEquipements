package com.example.demo.repository;

import com.example.demo.Bean.Panne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PanneRepository extends JpaRepository<Panne, Long> {
    // Requête personnalisée pour récupérer les pannes liées à un équipement spécifique
    List<Panne> findByEquipementId(Long equipementId);
    
}
