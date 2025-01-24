# Location Voiture - Laravel & React

Ce projet est une application de gestion de location de voitures. Il utilise **Laravel** pour le backend et **React** pour le frontend. Les utilisateurs peuvent consulter les voitures disponibles, réserver une voiture, et les administrateurs peuvent gérer les voitures et les locations.

## Prérequis

Avant de commencer, vous devez avoir les éléments suivants installés sur votre machine :

- **PHP** version 8.2 ou supérieure
- **Composer** (pour gérer les dépendances PHP)
- **Node.js** (pour le frontend)
- **npm** ou **yarn** (pour gérer les dépendances JavaScript)

## Installation

### Backend - Laravel

1. Clonez le dépôt du backend :
    ```bash
    git clone https://votre-repository-backend.git
    cd backend
    ```

2. Installez les dépendances PHP :
    ```bash
    composer install
    ```

3. Copiez le fichier `.env.example` et renommez-le en `.env` :
    ```bash
    cp .env.example .env
    ```

4. Générez la clé de l'application Laravel :
    ```bash
    php artisan key:generate
    ```

5. Configurez la base de données dans le fichier `.env`. Assurez-vous que les informations suivantes sont correctement définies :
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=location_voiture
    DB_USERNAME=root
    DB_PASSWORD=
    ```

6. Exécutez les migrations pour configurer la base de données :
    ```bash
    php artisan migrate
    ```

7. Démarrez le serveur Laravel :
    ```bash
    php artisan serve
    ```
    Le serveur sera accessible à l'adresse [http://localhost:8000](http://localhost:8000).

### Frontend - React

1. Clonez le dépôt du frontend :
    ```bash
    git clone https://votre-repository-frontend.git
    cd frontend
    ```

2. Installez les dépendances JavaScript :
    ```bash
    npm install
    ```

3. Lancez le serveur de développement :
    ```bash
    npm run dev
    ```
    Le frontend sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

### Lancer les deux serveurs

Pour lancer à la fois le serveur backend (Laravel) et le serveur frontend (React), vous pouvez utiliser `concurrently` pour exécuter les deux en même temps.

1. Assurez-vous que le projet React est configuré pour utiliser l'API Laravel en définissant l'URL du backend dans le code frontend (si nécessaire).

2. Dans le répertoire du frontend, ajoutez la commande suivante dans votre `package.json` pour lancer les deux serveurs en parallèle :

    ```json
    "scripts": {
      "dev": "concurrently \"php artisan serve\" \"npm run dev\""
    }
    ```

3. Exécutez la commande suivante dans le répertoire du frontend pour démarrer les deux serveurs :

    ```bash
    npm run dev
    ```

Cela démarre le serveur backend Laravel sur [http://localhost:8000](http://localhost:8000) et le serveur frontend React sur [http://localhost:3000](http://localhost:3000).

### Lancer les tests

- Pour exécuter les tests backend (Laravel) :
    ```bash
    php artisan test
    ```

- Pour exécuter les tests frontend (React) :
    ```bash
    npm run test
    ```

### Déploiement

1. **Backend** :
   - Pour déployer l'application backend, vous devez configurer un serveur web (comme Apache ou Nginx) avec PHP et un serveur de base de données (comme MySQL).
   - Assurez-vous que le fichier `.env` est bien configuré pour le serveur de production (base de données, clés API, etc.).

2. **Frontend** :
   - Pour déployer l'application frontend, vous devez créer une version de production :
     ```bash
     npm run build
     ```
   - Déployez le dossier `dist/` sur votre serveur web.

---

## Fonctionnalités

- **Backend** :
  - Gestion des utilisateurs, rôles et authentification avec Laravel Sanctum et JWT.
  - Gestion des voitures : ajout, modification, suppression.
  - Gestion des locations : réservations, historique des locations.
  - Gestion de la maintenance des voitures.

- **Frontend** :
  - Page d'accueil avec la liste des voitures disponibles.
  - ![screencapture-localhost-5173-2025-01-24-10_53_14](https://github.com/user-attachments/assets/54b060be-1a9d-4431-aac2-31c08b676f4e)

  - Fonctionnalité de réservation de voiture.
  - ![image](https://github.com/user-attachments/assets/a868b2f4-a483-408d-8a0d-ba5b594ca351)
  - Système de payment stripe.
  - ![image](https://github.com/user-attachments/assets/2d11d271-8b69-42d5-b5ce-b26212e87072)
  - Tableau de bord pour les administrateurs permettant la gestion des voitures, des utilisateurs et des locations.
![image](https://github.com/user-attachments/assets/51e448fd-b2f6-4fab-bd90-2b3293c2c16e)

![image](https://github.com/user-attachments/assets/f9381683-7b17-41a7-a061-d9cd91654a8d)

  - Interface des voiture
![image](https://github.com/user-attachments/assets/a49911e6-ea69-4763-a51c-178239bf748c)


---

## Technologies utilisées

- **Backend** : Laravel, PHP, MySQL
- **Frontend** : React, Vite, Bootstrap, Axios
- **Authentification** : JWT, Laravel Sanctum
- **Paiement** : Stripe pour le traitement des paiements en ligne

---

## Auteur

Développé par **Ahmed Jmal**.

