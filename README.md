# 📦 Application de gestion des équipements et interventions de maintenance

![Java](https://img.shields.io/badge/Java-17-blue?logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-green?logo=spring)
![HTML](https://img.shields.io/badge/HTML5-orange?logo=html5)
![CSS](https://img.shields.io/badge/CSS3-blue?logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?logo=javascript)
![Docker](https://img.shields.io/badge/Docker-blue?logo=docker)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes)

---

## 📝 Description

Ce projet est une application de **gestion des équipements et interventions de maintenance** développée avec **Spring Boot** pour le backend et **HTML/CSS/JavaScript** pour le frontend.

L'application permet :

- De centraliser l’administration des équipements d’une entreprise
- De signaler et suivre les pannes
- De planifier des interventions
- D’attribuer des techniciens automatiquement ou manuellement
- De gérer les utilisateurs et leurs rôles (admin, technicien)
- De suivre des statistiques (nombre d’équipements, pannes, etc.)

Chaque panne signale un changement d’état de l’équipement concerné. Une fois l’intervention terminée, l’équipement est automatiquement remis en service et le technicien est libéré.

---

## 🧰 Technologies utilisées

### Backend
- Java 17
- Spring Boot
- JPA / Hibernate
- Jakarta Persistence API
- MySQL / H2

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)

### Déploiement & Conteneurisation
- Docker : Création d'une image du backend Spring Boot
- Kubernetes : Déploiement via cluster avec fichiers `Deployment`, `Service`, etc.

---

## 🚀 Instructions de démarrage

### Prérequis
- Java 17
- Maven
- Docker
- Minikube ou un cluster Kubernetes (si déploiement)

### Lancer localement

```bash
git clone https://gitlab.com/ton-utilisateur/ton-repo.git
cd ton-repo
./mvnw spring-boot:run
