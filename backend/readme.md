# Backend de l'Application To-Do List

Ce back-end fait partie de l'application Todo-List développée en utilisant Node.js avec Express et MySQL comme base de données. Il gère la logique métier, l'authentification, et fournit des API pour le front-end.

## Configuration

- Node.js (version 18.13.0)
- npm (version 9.2.0)
- -MySQL: Ver 8.0.35-0ubuntu0.23.04.1 for Linux on x86_64 ((Ubuntu))
- Express
- Bcrypt
- JSONWebToken

## Base de Données

Assurez-vous d'avoir une base de données MySQL configurée avec deux tables principales :

1. **Table Users:**

   - Nom de la table: `users`
   - Champs :
     - `id` (clé primaire, auto-incrémentée)
     - `nom` (nom de l'utilisateur)
     - `prenom` (prénom de l'utilisateur)
     - `email` (adresse e-mail de l'utilisateur)
     - `password` (mot de passe haché de l'utilisateur)

2. **Table Todolists:**
   - Nom de la table: `todolists`
   - Champs :
     - `id` (clé primaire, auto-incrémentée)
     - `id_user` (clé étrangère faisant référence à l'id de l'utilisateur dans la table `users`)
     - `titre` (titre de la tâche dans la todolist)
     - `description` (description de la tâche dans la todolist)
     - `statut` (statut de la tâche, par exemple 'En attente', 'En cours', 'Terminée')

Il existe une relation entre la table `users` et `todolists` via la clé étrangère `id_user` dans la table `todolists`.

## Lancement du Serveur

- npm install
- npm start

## API Endpoints
