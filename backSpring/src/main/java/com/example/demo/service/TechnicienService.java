package com.example.demo.service;

import com.example.demo.Bean.Technicien;
import com.example.demo.repository.TechnicienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnicienService {

    @Autowired
    private TechnicienRepository technicienRepository;

    public List<Technicien> findAll() {
        return technicienRepository.findAll();
    }

    public List<Technicien> findDisponibles() {
        return technicienRepository.findByDisponibiliteTrue();
    }

    public Technicien save(Technicien technicien) {
        return technicienRepository.save(technicien);
    }

    public Technicien findById(Long id) {
        return technicienRepository.findById(id).orElse(null);
    }

    public Technicien update(Long id, Technicien updated) {
        Technicien t = technicienRepository.findById(id).orElse(null);
        if (t == null) return null;

        t.setNom(updated.getNom());
        t.setCompetences(updated.getCompetences());
        t.setDisponibilite(updated.isDisponibilite());
        return technicienRepository.save(t);
    }

    public void delete(Long id) {
        technicienRepository.deleteById(id);
    }
}
