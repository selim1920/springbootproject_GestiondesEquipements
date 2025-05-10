package com.example.demo.repository;

import com.example.demo.Bean.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    // Optionnel : ajouter une méthode pour trouver par email
    Utilisateur findByEmail(String email);
}
