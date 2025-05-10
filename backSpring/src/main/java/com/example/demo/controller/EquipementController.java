package com.example.demo.controller;

import com.example.demo.Bean.Equipement;
import com.example.demo.service.EquipementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipements")
@CrossOrigin(origins = "*")
public class EquipementController {

    @Autowired
    private EquipementService equipementService;

    // Get all equipments
    @GetMapping("/")
    public List<Equipement> findAll() {
        return equipementService.findAll();
    }

    // Search equipments by name
    @GetMapping("/search")
    public List<Equipement> searchEquipements(@RequestParam String query) {
        return equipementService.searchEquipements(query);
    }

    // Get equipments with pagination
    @GetMapping("/page")
    public List<Equipement> getEquipementsPage(@RequestParam int page, @RequestParam int size) {
        return equipementService.findPaginated(page, size);
    }

    // Get equipments in panne
    @GetMapping("/enpanne")
    public List<Equipement> findEquipementsEnPanne() {
        return equipementService.findEquipementsEnPanne();
    }

    // Get equipments in fonction
    @GetMapping("/enfonction")
    public List<Equipement> findEquipementsEnFonction() {
        return equipementService.findEquipementsEnFonction();
    }

    // Get equipment statistics
    @GetMapping("/stats")
    public EquipementStats getEquipementStats() {
        long total = equipementService.countTotalEquipements();
        long panne = equipementService.countEquipementsEnPanne();
        long fonction = equipementService.countEquipementsEnFonction();
        return new EquipementStats(total, panne, fonction);
    }

    // Add a new equipment
    @PostMapping("/")
    public Equipement save(@RequestBody Equipement equipement) {
        return equipementService.save(equipement);
    }

    // Get an equipment by ID
    @GetMapping("/{id}")
    public Equipement findById(@PathVariable Long id) {
        return equipementService.findById(id);
    }

    // Update an equipment
    @PutMapping("/{id}")
    public Equipement update(@PathVariable Long id, @RequestBody Equipement updated) {
        return equipementService.update(id, updated);
    }

    // Delete an equipment
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        equipementService.delete(id);
    }
}

// EquipmentStats DTO to hold the statistics
class EquipementStats {
    private long totalEquipements;
    private long equipementsEnPanne;
    private long equipementsEnFonction;

    public EquipementStats(long totalEquipements, long equipementsEnPanne, long equipementsEnFonction) {
        this.totalEquipements = totalEquipements;
        this.equipementsEnPanne = equipementsEnPanne;
        this.equipementsEnFonction = equipementsEnFonction;
    }

    public long getTotalEquipements() {
        return totalEquipements;
    }

    public long getEquipementsEnPanne() {
        return equipementsEnPanne;
    }

    public long getEquipementsEnFonction() {
        return equipementsEnFonction;
    }
}
