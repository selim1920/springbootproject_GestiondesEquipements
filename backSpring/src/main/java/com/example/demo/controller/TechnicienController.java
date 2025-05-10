package com.example.demo.controller;

import com.example.demo.Bean.Technicien;
import com.example.demo.service.TechnicienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/techniciens")
@CrossOrigin(origins = "*")
public class TechnicienController {

    @Autowired
    private TechnicienService technicienService;

    @GetMapping("/")
    public List<Technicien> findAll() {
        return technicienService.findAll();
    }

    @GetMapping("/disponibles")
    public List<Technicien> findDisponibles() {
        return technicienService.findDisponibles();
    }

    @PostMapping("/")
    public Technicien save(@RequestBody Technicien technicien) {
        return technicienService.save(technicien);
    }

    @GetMapping("/{id}")
    public Technicien findById(@PathVariable Long id) {
        return technicienService.findById(id);
    }

    @PutMapping("/{id}")
    public Technicien update(@PathVariable Long id, @RequestBody Technicien updated) {
        return technicienService.update(id, updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        technicienService.delete(id);
    }
}
