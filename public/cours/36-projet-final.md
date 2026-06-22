# Module 36 : Projet final — Application complète

## Objectifs pédagogiques

Ce projet final vous permet de **mettre en pratique l'ensemble des compétences** acquises durant la formation. Vous allez concevoir, développer, tester et documenter une application complète, du cahier des charges à la livraison.

**Ce qui est évalué :**
- Qualité du code et architecture
- Utilisation appropriée des technologies
- Tests et robustesse
- Documentation et présentation
- Autonomie et capacité à prendre des décisions techniques

---

## 1. Règles communes à tous les projets

### Stack technique autorisée

| Domaine | Technologies |
|---------|-------------|
| Backend | FastAPI (obligatoire) |
| Base de données | SQLite + SQLAlchemy (obligatoire) |
| Frontend | Optionnel (HTML/CSS simple, ou API-only) |
| Scraping | requests + BeautifulSoup / Selenium (si pertinent) |
| Data Science | NumPy + Pandas (si pertinent) |
| Visualisation | Matplotlib / Seaborn (si pertinent) |
| Tests | pytest (obligatoire) |
| Documentation | README.md + docstrings + Swagger (automatique) |

### Contraintes techniques

1. **Type hints** : toutes les fonctions doivent être typées
2. **Tests** : au moins 10 tests (unitaires + intégration) avec pytest
3. **Logging** : utiliser le module `logging` de Python
4. **Gestion des erreurs** : try/except + codes HTTP appropriés (API)
5. **README.md** : décrire l'installation, l'utilisation, les choix techniques
6. **requirements.txt** : lister toutes les dépendances avec versions

### Structure de code attendue

```
projet_final/
  app/
    __init__.py
    main.py              # point d'entrée FastAPI
    models.py            # modèles SQLAlchemy
    schemas.py           # modèles Pydantic (validation)
    database.py          # configuration DB + session
    routers/
      __init__.py
      items.py
      users.py
    services/            # logique métier
      __init__.py
      service_items.py
    dependencies.py      # dépendances FastAPI (auth, etc.)
    logging_config.py    # configuration des logs
  tests/
    __init__.py
    test_api.py
    conftest.py          # fixtures partagées
  data/                  # données (CSV, JSON, etc.)
  notebooks/             # notebooks d'analyse (si pertinent)
  requirements.txt
  Dockerfile             # optionnel mais encouragé
  docker-compose.yml     # optionnel mais encouragé
  README.md
```

### Critères d'évaluation détaillés

| Critère | Points | Détail |
|---------|--------|--------|
| **Fonctionnalité** | /25 | L'application fonctionne et répond au cahier des charges |
| **Architecture** | /15 | Code organisé, séparation des responsabilités |
| **Qualité du code** | /15 | PEP 8, type hints, noms explicites, pas de code mort |
| **Tests** | /15 | Au moins 10 tests, couverture des cas principaux |
| **Gestion d'erreurs** | /10 | Erreurs HTTP appropriées, validation, logs |
| **Documentation** | /10 | README complet, docstrings, Swagger |
| **Déploiement** | /5 | Dockerfile, docker-compose ou instructions claires |
| **Présentation** | /5 | Soutenance claire, démo, justifications techniques |
| **Bonus** | +5 | Fonctionnalité avancée (WebSocket, async scraping, animation) |

---

## 2. Projet 1 : Application Web de gestion de tâches (Todo App)

### Description

Une application de gestion de tâches complète avec API REST, authentification, et une interface simple.

### Fonctionnalités obligatoires

- [x] CRUD de tâches (titre, description, priorité, date d'échéance, statut)
- [x] Inscription et connexion (authentification par JWT)
- [x] Chaque utilisateur ne voit que ses propres tâches
- [x] Filtres : par statut (à faire/en cours/terminé), par priorité, par date
- [x] Tri : par date d'échéance, par priorité, par date de création
- [x] Tests : au moins 10 tests pytest

### Fonctionnalités bonus

- [ ] Catégories de tâches (relation many-to-many)
- [ ] Pagination des résultats
- [ ] Recherche textuelle (LIKE / ILIKE)
- [ ] Interface frontend basique (HTML/CSS simple ou Jinja2)
- [ ] Export en CSV des tâches

### Modèles de données

```python
# app/models.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

class Priorite(enum.Enum):
    BASSE = 1
    MOYENNE = 2
    HAUTE = 3
    CRITIQUE = 4

class StatutTache(enum.Enum):
    A_FAIRE = "a_faire"
    EN_COURS = "en_cours"
    TERMINE = "termine"

class Utilisateur(Base):
    __tablename__ = "utilisateurs"
    id = Column(Integer, primary_key=True)
    nom = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    mot_de_passe = Column(String, nullable=False)  # hashé !
    date_creation = Column(DateTime, default=datetime.utcnow)
    taches = relationship("Tache", back_populates="proprietaire")

class Tache(Base):
    __tablename__ = "taches"
    id = Column(Integer, primary_key=True)
    titre = Column(String(200), nullable=False)
    description = Column(String, default="")
    priorite = Column(Integer, default=Priorite.MOYENNE.value)
    statut = Column(String, default=StatutTache.A_FAIRE.value)
    date_echeance = Column(DateTime, nullable=True)
    date_creation = Column(DateTime, default=datetime.utcnow)
    proprietaire_id = Column(Integer, ForeignKey("utilisateurs.id"), nullable=False)
    proprietaire = relationship("Utilisateur", back_populates="taches")
```

### Endpoints API

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/auth/inscription` | Créer un compte |
| POST | `/auth/connexion` | Se connecter (retourne token JWT) |
| GET | `/taches` | Lister mes tâches (filtres optionnels) |
| POST | `/taches` | Créer une tâche |
| GET | `/taches/{id}` | Détail d'une tâche |
| PUT | `/taches/{id}` | Modifier une tâche |
| DELETE | `/taches/{id}` | Supprimer une tâche |
| PATCH | `/taches/{id}/statut` | Changer le statut |

---

## 3. Projet 2 : Analyseur de données financières

### Description

Un système qui scrape des données financières, les analyse avec Pandas/NumPy, les visualise, et expose les résultats via une API REST.

### Fonctionnalités obligatoires

- [x] Scraper les cours d'au moins 3 actions sur 6 mois (Yahoo Finance ou équivalent)
- [x] Stocker les données dans SQLite via SQLAlchemy
- [x] Calculer des indicateurs : moyenne mobile (10j, 50j), rendement, volatilité
- [x] Exposer les données via une API REST (FastAPI)
- [x] Générer un graphique de synthèse (cours + moyennes mobiles) avec matplotlib
- [x] Tests : au moins 10 tests

### Fonctionnalités bonus

- [ ] Comparaison entre plusieurs actions (corrélation)
- [ ] Prédiction simple (régression linéaire ou ARIMA)
- [ ] Export PDF du rapport d'analyse (avec ReportLab ou FPDF)
- [ ] Dashboard HTML avec Chart.js
- [ ] Scraping automatique planifié (schedule ou boucle)

### Structure spécifique

```
projet_final/
  app/
    main.py
    models.py          # Action, CoursHistorique
    schemas.py
    database.py
    routers/
        actions.py
        analyse.py
    services/
        scraper.py      # scraping des cours
        calculs.py      # indicateurs techniques (moyennes, volatilité)
        visualisation.py # génération de graphiques
```

### Exemples de calculs

```python
# services/calculs.py
import pandas as pd
import numpy as np

def calculer_moyenne_mobile(cours: pd.Series, periode: int = 10) -> pd.Series:
    """Calcule la moyenne mobile simple sur N jours."""
    return cours.rolling(window=periode).mean()

def calculer_rendement(cours: pd.Series) -> pd.Series:
    """Calcule le rendement journalier en pourcentage."""
    return cours.pct_change() * 100

def calculer_volatilite(cours: pd.Series, periode: int = 20) -> pd.Series:
    """Calcule la volatilité historique (écart-type des rendements sur N jours)."""
    rendements = cours.pct_change()
    return rendements.rolling(window=periode).std() * np.sqrt(252)  # annualisé
```

---

## 4. Projet 3 : Système de e-commerce minimal

### Description

Un back-end de e-commerce avec gestion des utilisateurs, produits, panier et commandes.

### Fonctionnalités obligatoires

- [x] CRUD produits (nom, description, prix, stock, catégorie)
- [x] CRUD utilisateurs (inscription, connexion, profil)
- [x] Panier : ajouter/supprimer/modifier quantité
- [x] Validation de commande (transformation du panier en commande)
- [x] Gestion des stocks (décrémentation à la commande)
- [x] Historique des commandes par utilisateur
- [x] Tests : couverture des cas nominaux et erreurs

### Fonctionnalités bonus

- [ ] Paiement simulé (simple endpoint de validation)
- [ ] Recherche et filtrage de produits (par prix, catégorie)
- [ ] Moyenne des notes / avis sur les produits
- [ ] Administration (CRUD produits réservé aux admins)

### Modèles de données

```python
class Produit(Base):
    __tablename__ = "produits"
    id = Column(Integer, primary_key=True)
    nom = Column(String(200), nullable=False)
    description = Column(Text)
    prix = Column(Float, nullable=False)  # en euros ou centimes
    stock = Column(Integer, default=0)
    categorie_id = Column(Integer, ForeignKey("categories.id"))
    actif = Column(Boolean, default=True)

class Panier(Base):
    __tablename__ = "paniers"
    id = Column(Integer, primary_key=True)
    utilisateur_id = Column(Integer, ForeignKey("utilisateurs.id"), unique=True)
    lignes = relationship("LignePanier", back_populates="panier")

class LignePanier(Base):
    __tablename__ = "lignes_panier"
    id = Column(Integer, primary_key=True)
    panier_id = Column(Integer, ForeignKey("paniers.id"))
    produit_id = Column(Integer, ForeignKey("produits.id"))
    quantite = Column(Integer, default=1)
    panier = relationship("Panier", back_populates="lignes")
    produit = relationship("Produit")

class Commande(Base):
    __tablename__ = "commandes"
    id = Column(Integer, primary_key=True)
    utilisateur_id = Column(Integer, ForeignKey("utilisateurs.id"))
    date_commande = Column(DateTime, default=datetime.utcnow)
    statut = Column(String, default="en_attente")  # en_attente, payee, expediee, livree
    total = Column(Float)
    lignes = relationship("LigneCommande", back_populates="commande")
```

---

## 5. Projet 4 : Dashboard temps réel

### Description

Un tableau de bord qui collecte des données en temps réel (ou quasi-réel) et les visualise via WebSocket.

### Fonctionnalités obligatoires

- [x] Collecte périodique de données (toutes les 5-10 secondes)
  - Soit via scraping d'une API publique (météo, crypto, etc.)
  - Soit via simulation (générateur de données aléatoires)
- [x] API REST pour les données historiques (GET /donnees?depuis=...)
- [x] WebSocket pour diffusion en temps réel des nouvelles données
- [x] Stockage des données dans SQLite via SQLAlchemy
- [x] Visualisation : génération de graphiques matplotlib/seaborn des tendances
- [x] Tests : au moins 10 tests

### Fonctionnalités bonus

- [ ] Frontend HTML/JS qui se met à jour en temps réel via WebSocket
- [ ] Alerte configurable (seuil dépassé → log ou notification)
- [ ] Export des données en CSV
- [ ] Cache (Redis simulé avec dictionnaire)

### Architecture

```
                    ┌─────────────┐
                    │  Collecteur  │ (récupère les données toutes les N secondes)
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │    API      │ (FastAPI : REST + WebSocket)
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         ┌────▼───┐  ┌────▼───┐  ┌────▼───┐
         │ SQLite  │  │  Client│  │  Client│
         │ (histo) │  │ (WS)   │  │ (REST) │
         └────────┘  └────────┘  └────────┘
```

### Implémentation WebSocket avec FastAPI

```python
from fastapi import WebSocket, WebSocketDisconnect
from typing import List
import asyncio

class GestionnaireConnexions:
    def __init__(self):
        self.connexions: List[WebSocket] = []

    async def connecter(self, websocket: WebSocket):
        await websocket.accept()
        self.connexions.append(websocket)

    def deconnecter(self, websocket: WebSocket):
        self.connexions.remove(websocket)

    async def diffuser(self, donnees: dict):
        """Envoie des données à tous les clients connectés."""
        for connexion in self.connexions:
            try:
                await connexion.send_json(donnees)
            except:
                pass  # connexion perdue

gestionnaire = GestionnaireConnexions()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await gestionnaire.connecter(websocket)
    try:
        while True:
            await websocket.receive_text()  # maintient la connexion
    except WebSocketDisconnect:
        gestionnaire.deconnecter(websocket)

# Tâche de fond : collecte et diffusion
@app.on_event("startup")
async def demarrer_collecte():
    asyncio.create_task(collecter_et_diffuser())

async def collecter_et_diffuser():
    while True:
        donnees = {"timestamp": datetime.now().isoformat(), "valeur": random.gauss(100, 10)}
        # Stocker en base
        # ...
        # Diffuser aux clients WebSocket
        await gestionnaire.diffuser(donnees)
        await asyncio.sleep(5)
```

---

## 6. Conseils pour la soutenance

### Structure de la présentation (10-15 minutes)

1. **Introduction** (1 min) : quel projet, pourquoi ce choix
2. **Démo** (5 min) : montrer l'application qui fonctionne (API, endpoints, tests)
3. **Architecture** (3 min) : diagramme ou explication de la structure
4. **Choix techniques** (3 min) : pourquoi telle librairie, telle approche
5. **Difficultés rencontrées** (2 min) : ce qui a été dur et comment vous l'avez résolu
6. **Améliorations possibles** (1 min) : si vous aviez plus de temps

### Questions possibles

- Pourquoi avez-vous choisi cette architecture ?
- Comment gérez-vous les erreurs ?
- Quels tests avez-vous écrits et pourquoi ?
- Comment pourriez-vous passer à l'échelle ?
- Qu'avez-vous appris de nouveau durant ce projet ?

### Checklist de rendu final

- [ ] Code source complet (README inclus)
- [ ] Tous les tests passent : `pytest tests/ -v`
- [ ] L'API démarre : `uvicorn app.main:app --reload`
- [ ] Documentation Swagger accessible sur `/docs`
- [ ] requirements.txt avec versions figées
- [ ] Logs configurés (fichier + console)
- [ ] README.md avec : description, installation, utilisation, structure, choix techniques
- [ ] (Optionnel) Dockerfile + docker-compose.yml
- [ ] (Optionnel) Déploiement en ligne (Render, Railway, ou autre)

---

## Résumé du module

- **4 projets au choix** : Todo App, Analyse financière, E-commerce, Dashboard temps réel
- **Stack imposée** : FastAPI + SQLAlchemy + SQLite + pytest
- **Qualité exigée** : code propre, typé, testé, documenté
- **Livrables** : code sur GitHub/GitLab, README, Swagger, tests verts
- **Soutenance** : démo + explications techniques + retours d'expérience
