package com.example.demo.service;

import com.example.demo.Bean.Equipement;
import com.example.demo.repository.EquipementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipementService {

    @Autowired
    private EquipementRepository equipementRepository;

    // Retrieve all equipments
    public List<Equipement> findAll() {
        return equipementRepository.findAll();
    }

    // Search equipments by name
    public List<Equipement> searchEquipements(String query) {
        return equipementRepository.findByNomContainingIgnoreCase(query);
    }

    // Paginate equipments
    public List<Equipement> findPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size); // page starts from 0
        return equipementRepository.findAll(pageable).getContent();
    }

    // Retrieve equipments in panne
    public List<Equipement> findEquipementsEnPanne() {
        return equipementRepository.findByEtat("En panne");
    }

    // Retrieve equipments in fonction
    public List<Equipement> findEquipementsEnFonction() {
        return equipementRepository.findByEtat("En fonction");
    }

    // Count total equipments
    public long countTotalEquipements() {
        return equipementRepository.count();
    }

    // Count equipments in panne
    public long countEquipementsEnPanne() {
        return equipementRepository.countByEtat("En panne");
    }

    // Count equipments in fonction
    public long countEquipementsEnFonction() {
        return equipementRepository.countByEtat("En fonction");
    }

    // Save a new equipment
    public Equipement save(Equipement equipement) {
        return equipementRepository.save(equipement);
    }

    // Retrieve an equipment by ID
    public Equipement findById(Long id) {
        return equipementRepository.findById(id).orElse(null);
    }

    // Update an equipment
    public Equipement update(Long id, Equipement updated) {
        Equipement eq = equipementRepository.findById(id).orElse(null);
        if (eq == null) return null;

        eq.setNom(updated.getNom());
        eq.setEtat(updated.getEtat());
        eq.setDateAcquisition(updated.getDateAcquisition());
        return equipementRepository.save(eq);
    }

    // Delete an equipment
    public void delete(Long id) {
        equipementRepository.deleteById(id);
    }
}
