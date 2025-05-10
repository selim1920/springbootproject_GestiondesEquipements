package com.example.demo.service;

import com.example.demo.Bean.Equipement;
import com.example.demo.Bean.Panne;
import com.example.demo.repository.PanneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PanneService {

    @Autowired
    private PanneRepository panneRepository;

    @Autowired
    private EquipementService equipementService;

    // Récupérer toutes les pannes
    public List<Panne> findAll() {
        return panneRepository.findAll();
    }

    // Sauvegarder une panne et changer l’état de l’équipement à "En panne"
    public Panne save(Panne panne) {
        if (panne.getEquipement() != null && panne.getEquipement().getId() != null) {
            Equipement equipement = equipementService.findById(panne.getEquipement().getId());
            if (equipement != null) {
                equipement.setEtat("En panne");
                equipementService.save(equipement);
            }
        }
        return panneRepository.save(panne);
    }

    // Récupérer une panne par ID
    public Panne findById(Long id) {
        return panneRepository.findById(id).orElse(null);
    }

    // Mettre à jour une panne
    public Panne update(Long id, Panne updated) {
        Panne panne = panneRepository.findById(id).orElse(null);
        if (panne == null) return null;

        panne.setDescription(updated.getDescription());
        panne.setCategorie(updated.getCategorie());
        panne.setEquipement(updated.getEquipement());
        panne.setDateSignalement(updated.getDateSignalement());

        return panneRepository.save(panne);
    }

    // Supprimer une panne
    public void delete(Long id) {
        panneRepository.deleteById(id);
    }

    // Récupérer les pannes liées à un équipement
    public List<Panne> findByEquipementId(Long equipementId) {
        return panneRepository.findByEquipementId(equipementId);
    }
}
