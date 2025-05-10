package com.example.demo.controller;

import com.example.demo.Bean.Intervention;
import com.example.demo.service.InterventionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/interventions")
@CrossOrigin(origins = "*")
public class InterventionController {

    @Autowired
    private InterventionService interventionService;

    @GetMapping("/")
    public List<Intervention> findAll() {
        return interventionService.findAll();
    }
    
    @PutMapping("/terminer/{id}")
    public Intervention terminer(@PathVariable Long id) {
        return interventionService.terminer(id);
    }


    @GetMapping("/{id}")
    public Intervention findById(@PathVariable Long id) {
        return interventionService.findById(id);
    }

    @PostMapping("/")
    public Intervention save(@RequestBody Intervention intervention) {
        return interventionService.save(intervention);
    }

    @PutMapping("/{id}")
    public Intervention update(@PathVariable Long id, @RequestBody Intervention intervention) {
        return interventionService.update(id, intervention);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        interventionService.delete(id);
    }

    @PostMapping("/planifier")
    public Intervention planifier(@RequestBody Intervention intervention) {
        return interventionService.planifierIntervention(intervention);
    }
    
}
