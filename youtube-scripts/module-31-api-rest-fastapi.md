# Vidéo #31 — API REST avec FastAPI

## Informations générales
- **Titre** : Python #31 — API REST avec FastAPI (Formation Complète)
- **Durée** : ~15 min
- **Miniature** : `banners/31-api-rest-fastapi.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 31 — API REST AVEC FASTAPI

> "Passons au développement web. FastAPI est le framework Python moderne pour construire des API REST rapidement, avec validation automatique et documentation générée."

---

### 0:30 — Qu'est-ce qu'une API REST ? (2 min)
**Texte écran :** API REST

> "REST = Representational State Transfer. C'est un style d'architecture pour construire des APIs web."

**Les verbes HTTP :**
| Méthode | Action | Exemple |
|---------|--------|---------|
| `GET` | Lire | Récupérer la liste des utilisateurs |
| `POST` | Créer | Ajouter un nouvel utilisateur |
| `PUT` | Remplacer | Mettre à jour un utilisateur |
| `DELETE` | Supprimer | Supprimer un utilisateur |

> "Les URLs représentent des ressources : `/utilisateurs`, `/articles/42`. Les verbes HTTP représentent les actions."

---

### 2:30 — FastAPI vs Flask vs Django (1 min 30)
**Texte écran :** CHOISIR LE BON FRAMEWORK

| Framework | Usage |
|-----------|-------|
| **FastAPI** | API modernes, asynchrones, auto-documentées |
| **Flask** | Léger, simple, flexible |
| **Django** | Full-stack, batteries incluses, admin |

> "FastAPI est le plus performant, utilise les type hints Python pour la validation, et génère automatiquement la documentation Swagger."

---

### 4:00 — Installation et premier serveur (1 min 30)
**Texte écran :** PREMIÈRE API

```bash
pip install fastapi uvicorn
```

```python
# main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def lire_racine():
    return {"message": "Hello World"}
```

```bash
# Lancer le serveur
uvicorn main:app --reload
```

> "`--reload` redémarre automatiquement le serveur à chaque modification de code."

---

### 5:30 — GET, POST, PUT, DELETE (2 min)
**Texte écran :** LES 4 OPÉRATIONS CRUD

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Base de données simulée
articles = []

@app.get("/articles")
def lister_articles():
    return articles

@app.post("/articles")
def creer_article(article: dict):
    articles.append(article)
    return article

@app.put("/articles/{article_id}")
def modifier_article(article_id: int, article: dict):
    articles[article_id] = article
    return article

@app.delete("/articles/{article_id}")
def supprimer_article(article_id: int):
    articles.pop(article_id)
    return {"ok": True}
```

---

### 7:30 — Paramètres : path, query, body (2 min)
**Texte écran :** PARAMÈTRES

```python
from fastapi import FastAPI

app = FastAPI()

# Path parameter
@app.get("/articles/{article_id}")
def lire_article(article_id: int):
    return {"id": article_id}

# Query parameters
@app.get("/articles/")
def filtrer_articles(categorie: str = None, limite: int = 10):
    return {"catégorie": categorie, "limite": limite}

# Body (POST)
from pydantic import BaseModel

class Article(BaseModel):
    titre: str
    contenu: str
    auteur: str

@app.post("/articles/")
def creer_article(article: Article):
    return {"titre": article.titre, "auteur": article.auteur}
```

> "Les paramètres de chemin sont dans l'URL, les query parameters après `?`, et le body dans le corps de la requête."

---

### 9:30 — Modèles Pydantic (2 min)
**Texte écran :** MODÈLES PYDANTIC

```python
from pydantic import BaseModel
from datetime import date
from typing import Optional

class Article(BaseModel):
    titre: str
    contenu: str
    auteur: str
    publie: bool = False
    date_creation: date = None
    note: Optional[float] = None

@app.post("/articles/")
def creer_article(article: Article):
    return article
```

> "Pydantic valide automatiquement les types : `titre` doit être une chaîne, `note` un float optionnel. Si le client envoie des données invalides, FastAPI renvoie une erreur 422."

**Validation avancée :**
```python
from pydantic import BaseModel, Field

class Article(BaseModel):
    titre: str = Field(..., min_length=3, max_length=100)
    contenu: str = Field(..., min_length=10)
    note: float = Field(ge=0, le=10)
```

---

### 11:30 — Documentation automatique (1 min)
**Texte écran :** SWAGGER UI

> "FastAPI génère automatiquement deux documentations :"

```
/swagger — Swagger UI (interface interactive)
/redoc  — ReDoc (documentation lisible)
```

> "Ouvrez `http://127.0.0.1:8000/docs` et vous pouvez tester chaque endpoint directement dans le navigateur. C'est un des plus gros avantages de FastAPI."

---

### 12:30 — Status codes et exceptions (2 min)
**Texte écran :** STATUS CODES & ERREURS

```python
from fastapi import FastAPI, HTTPException, status

app = FastAPI()

articles = {1: {"titre": "Python"}}

@app.get("/articles/{article_id}", status_code=status.HTTP_200_OK)
def lire_article(article_id: int):
    if article_id not in articles:
        raise HTTPException(
            status_code=404,
            detail="Article introuvable"
        )
    return articles[article_id]

@app.post("/articles/", status_code=status.HTTP_201_CREATED)
def creer_article(article: dict):
    return article
```

> "Utilisez les bons codes HTTP : 200 (OK), 201 (créé), 404 (pas trouvé), 422 (validation échouée), 500 (erreur serveur)."

---

### 14:00 — Bonnes pratiques (1 min)
**Texte écran :** BONNES PRATIQUES

- Utiliser des modèles Pydantic pour la validation
- Toujours définir les status codes
- Structurer le projet avec des routers
- Utiliser des dépendances avec `Depends`
- Activer CORS avec `CORSMiddleware`
- Versionner l'API (`/v1/articles`)

---

### 15:00 — Conclusion
> "Module 32 : on branche une vraie base de données avec SQLite et SQLAlchemy."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 31 : API REST avec FastAPI

Au programme :
00:00 — Introduction
00:30 — Qu'est-ce qu'une API REST ?
02:30 — FastAPI vs Flask vs Django
04:00 — Installation et premier serveur
05:30 — GET, POST, PUT, DELETE
07:30 — Paramètres : path, query, body
09:30 — Modèles Pydantic et validation
11:30 — Documentation automatique (Swagger)
12:30 — Status codes et exceptions
14:00 — Bonnes pratiques
15:00 — Prochain module

📚 Formation complète (36 modules) : https://formation-python-web.vercel.app
📄 Cours PDF : https://savoirbox.vercel.app/cours-python
📂 Code source : https://github.com/AMOUZOU-Kodjo/formation-python-web

📌 LES 36 MODULES :
1  — Introduction à Python
2  — Variables, types et opérateurs
3  — Chaînes de caractères
4  — Listes et tuples
5  — Dictionnaires et ensembles
6  — Contrôle de flux (if/else)
7  — Boucles (for/while)
8  — Fonctions
9  — Compréhensions
10 — Gestion des erreurs
11 — Modules et packages
12 — Fichiers
13 — POO : classes
14 — Héritage et polymorphisme
15 — Méthodes spéciales
16 — Itérateurs et générateurs
17 — Décorateurs
18 — Context managers
19 — Bibliothèque standard
20 — Expressions régulières
21 — Programmation fonctionnelle
22 — Type hints
23 — Async / Await
24 — Threading & Multiprocess
25 — Métaclasses & Introspection
26 — Design patterns
27 — Tests unitaires
28 — Logging & Debugging
29 — Environnements virtuels
30 — Packaging et distribution
31 — API REST avec FastAPI
32 — Bases de données
33 — Web scraping
34 — Introduction à la data science
35 — Visualisation de données
36 — Projet final

#python #formationpython #fastapi #api #rest #pydantic #swagger #backend
```

## Tags YouTube
```
python, formation python, fastapi, api rest python, pydantic, uvicorn, swagger python, apprendre python, cours python, programmation python, développement web python, backend python
```
