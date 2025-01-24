# Système de Location de Voitures

Ce projet est une application web de gestion de location de voitures, développée avec **Laravel** pour le backend et **React** pour le frontend.

## Fonctionnalités principales

- **Gestion des voitures** :
  - Ajout, modification et suppression des voitures.
  - Recherche de voitures par critères.
- **Réservation de voitures** :
  - Réservation sécurisée avec la passerelle de paiement Stripe.
- **Gestion des utilisateurs** :
  - Authentification et autorisation sécurisées (JWT et Laravel Sanctum).
  - Création et gestion des utilisateurs depuis un tableau de bord.
- **Gestion des locations et maintenance** :
  - Affichage des locations actives.
  - Gestion des tâches de maintenance des voitures.

---

## Architecture du Projet

### Backend (Laravel)
- Framework : **Laravel 11.9**
- Authentification : **JWT** et **Sanctum**
- Paiement : Intégration de **Stripe**
- Base de données : MySQL (ou tout autre SGBD compatible avec Laravel)
- Tests : **PHPUnit**
- Autres dépendances :
  - **Faker** pour générer des données fictives.
  - **Laravel Sail** pour le développement local via Docker.

### Frontend (React)
- Framework : **React 18**
- Routage : **React Router**
- UI :
  - **Bootstrap 5.3** pour le design.
  - **React Icons** pour les icônes.
- Outils :
  - **Axios** pour les requêtes API.
  - **FilePond** pour la gestion des fichiers (ex. : images).
  - **Chart.js** pour les visualisations.

---

## Installation et Exécution

### Prérequis
1. **Backend** :
   - PHP >= 8.2
   - Composer
   - MySQL ou un autre SGBD
2. **Frontend** :
   - Node.js >= 18
   - npm ou yarn

### Étapes d'installation

#### Backend
1. Clonez le projet et accédez au répertoire backend :
   ```bash
   git clone https://github.com/votre-utilisateur/nom-du-projet.git
   cd nom-du-projet/backend
