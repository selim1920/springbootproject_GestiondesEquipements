package com.example.demo.Bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Intervention {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("interventions")
    private Equipement equipement;

    @ManyToOne
    @JsonIgnoreProperties("interventions")
    private Technicien technicien;

    private String statut;

    @Temporal(TemporalType.DATE)
    private Date date;

    private Double cout;

    // Getters / Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Equipement getEquipement() { return equipement; }

    public void setEquipement(Equipement equipement) { this.equipement = equipement; }

    public Technicien getTechnicien() { return technicien; }

    public void setTechnicien(Technicien technicien) { this.technicien = technicien; }

    public String getStatut() { return statut; }

    public void setStatut(String statut) { this.statut = statut; }

    public Date getDate() { return date; }

    public void setDate(Date date) { this.date = date; }

    public Double getCout() { return cout; }

    public void setCout(Double cout) { this.cout = cout; }
}
