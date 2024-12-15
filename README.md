# Test Front-End Inside

## Introduction

Ce projet est une SPA (Single Page Application) réalisée en **Vue.js 3** (Composition API) avec **Vite**.
L'objectif est d'afficher, ajouter, supprimer et trier des utilisateurs en utilisant une API externe.

## Technologies utilisées

- **Vue.js 3**
- **Vite** (pour le bundling)
- **SASS** (pour les styles)
- **Pinia** (pour le store)
- **ESLint** et **Prettier** (pour le linting et le formatage du code)
- **Vitest** (pour les tests unitaires)
- **Docker** (pour la containerisation)

## Prérequis

Assurez-vous d'avoir installé :

- Node.js (version >= 20)
- PNPM
- Docker et Docker Compose

## Installation

1. Clonez le dépôt :
    ```bash
    git clone <URL_DU_REPO>
    cd spa
    ```
2. Installez les dépendances :
    ```bash
    pnpm install
    ```
3. Lancez le projet via Docker Compose :
    ```bash
    docker-compose up --build
    ```
    Le projet sera accessible sur **http://localhost:4173**.

## Scripts utiles

- **Build du projet** :
    ```bash
    pnpm build
    ```
- **Lint du code** :
    ```bash
    pnpm lint
    ```
- **Formatage du code** :
    ```bash
    pnpm format
    ```
- **Tests unitaires** :
    ```bash
    pnpm test
    ```

---

**Bon développement ! 🚀**
