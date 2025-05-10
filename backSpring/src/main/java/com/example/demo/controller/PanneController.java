package com.example.demo.controller;

import com.example.demo.Bean.Panne;
import com.example.demo.service.PanneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pannes")
@CrossOrigin(origins = "*")
public class PanneController {

    @Autowired
    private PanneService panneService;

    @GetMapping("/")
    public List<Panne> findAll() {
        return panneService.findAll();
    }

    @PostMapping("/")
    public Panne save(@RequestBody Panne panne) {
        return panneService.save(panne);
    }

    @GetMapping("/{id}")
    public Panne findById(@PathVariable Long id) {
        return panneService.findById(id);
    }

    @PutMapping("/{id}")
    public Panne update(@PathVariable Long id, @RequestBody Panne updated) {
        return panneService.update(id, updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        panneService.delete(id);
    }

    @GetMapping("/equipement/{equipementId}")
    public List<Panne> findByEquipementId(@PathVariable Long equipementId) {
        return panneService.findByEquipementId(equipementId);
    }
}
