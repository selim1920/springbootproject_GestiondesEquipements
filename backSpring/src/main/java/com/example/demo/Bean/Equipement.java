package com.example.demo.Bean;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.Date;

@Entity
public class Equipement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String etat;

    @Temporal(TemporalType.DATE)  // Spécifie que nous utilisons uniquement la date sans l'heure
    private Date dateAcquisition;

    // Constructeur par défaut
    public Equipement() {
    }

    // Constructeur personnalisé
    public Equipement(String nom, String etat, Date dateAcquisition) {
        this.nom = nom;
        this.etat = etat;
        this.dateAcquisition = dateAcquisition;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public Date getDateAcquisition() {
        return dateAcquisition;
    }

    public void setDateAcquisition(Date dateAcquisition) {
        this.dateAcquisition = dateAcquisition;
    }

    @Override
    public String toString() {
        return "Equipement [id=" + id + ", nom=" + nom + ", etat=" + etat + ", dateAcquisition=" + dateAcquisition + "]";
    }
}
