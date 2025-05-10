package com.example.demo.service;

import com.example.demo.Bean.Intervention;
import com.example.demo.Bean.Technicien;
import com.example.demo.repository.InterventionRepository;
import com.example.demo.repository.TechnicienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterventionService {

    @Autowired
    private InterventionRepository interventionRepository;

    @Autowired
    private TechnicienRepository technicienRepository;

    public List<Intervention> findAll() {
        return interventionRepository.findAll();
    }

    public Intervention findById(Long id) {
        return interventionRepository.findById(id).orElse(null);
    }

    public Intervention save(Intervention intervention) {
        if (intervention.getTechnicien() != null && intervention.getTechnicien().getId() != null) {
            Technicien t = technicienRepository.findById(intervention.getTechnicien().getId()).orElse(null);
            if (t != null && t.isDisponibilite()) {
                t.setDisponibilite(false); // ✅ Le rendre indisponible
                technicienRepository.save(t);
            }
            intervention.setTechnicien(t); // pour être sûr que l'objet est géré
        }
        return interventionRepository.save(intervention);
    }


    public Intervention update(Long id, Intervention updated) {
        Intervention existing = interventionRepository.findById(id).orElse(null);
        if (existing == null) return null;

        // Gestion de l'état du technicien si changement
        Technicien oldTechnicien = existing.getTechnicien();
        Technicien newTechnicien = updated.getTechnicien();

        if (oldTechnicien != null && !oldTechnicien.equals(newTechnicien)) {
            oldTechnicien.setDisponibilite(true); // Ancien libre
            technicienRepository.save(oldTechnicien);
        }

        if (newTechnicien != null) {
            newTechnicien.setDisponibilite(false); // Nouveau occupé
            technicienRepository.save(newTechnicien);
        }

        existing.setEquipement(updated.getEquipement());
        existing.setTechnicien(newTechnicien);
        existing.setStatut(updated.getStatut());
        existing.setDate(updated.getDate());
        existing.setCout(updated.getCout());

        return interventionRepository.save(existing);
    }

    public void delete(Long id) {
        Intervention i = interventionRepository.findById(id).orElse(null);
        if (i != null && i.getTechnicien() != null) {
            // Libérer le technicien si suppression
            Technicien t = i.getTechnicien();
            t.setDisponibilite(true);
            technicienRepository.save(t);
        }
        interventionRepository.deleteById(id);
    }
    public Intervention terminer(Long id) {
        Intervention i = interventionRepository.findById(id).orElse(null);
        if (i != null) {
            i.setStatut("terminée"); // Maintenir le statut de l'intervention à "terminée"

            if (i.getTechnicien() != null) {
                Technicien t = i.getTechnicien();
                t.setDisponibilite(true);
                technicienRepository.save(t);
            }

            if (i.getEquipement() != null) {
                i.getEquipement().setEtat("En fonction"); // Met l'équipement en "En fonction"
            }

            return interventionRepository.save(i);
        }
        return null;
    }



    public Intervention planifierIntervention(Intervention intervention) {
        List<Technicien> techniciens = technicienRepository.findByDisponibiliteTrue();
        for (Technicien t : techniciens) {
            intervention.setTechnicien(t);
            t.setDisponibilite(false); // occuper le technicien
            technicienRepository.save(t);
            break;
        }
        return interventionRepository.save(intervention);
    }
    
}
