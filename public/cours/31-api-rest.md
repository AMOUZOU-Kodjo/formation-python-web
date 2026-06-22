# Module 31 : API REST avec FastAPI

## Objectifs pédagogiques

À la fin de ce module, vous serez capable de :
- Comprendre ce qu'est une API REST et ses principes fondamentaux
- Installer et configurer FastAPI avec Uvicorn
- Créer des endpoints GET, POST, PUT, DELETE
- Valider des données avec Pydantic (types, contraintes, modèles imbriqués)
- Utiliser la documentation interactive automatique (Swagger UI / ReDoc)
- Gérer les dépendances, le CORS et les middleware
- Structurer un projet API professionnel

---

## 1. Qu'est-ce qu'une API REST ?

### Définitions

**API (Application Programming Interface)** : interface qui permet à deux logiciels de communiquer. Imaginez un serveur dans un restaurant : vous (le client) passez une commande au serveur (l'API), qui la transmet à la cuisine (le serveur), puis vous rapporte le plat (la réponse).

**REST (Representational State Transfer)** : style d'architecture qui définit des conventions pour concevoir des APIs web. Il repose sur le protocole HTTP.

### Les verbes HTTP (méthodes)

| Méthode | Action (CRUD) | Exemple |
|---------|---------------|---------|
| **GET** | Lire une ressource (Read) | `GET /utilisateurs` → liste des utilisateurs |
| **POST** | Créer une ressource (Create) | `POST /utilisateurs` → crée un utilisateur |
| **PUT** | Remplacer complètement une ressource (Update) | `PUT /utilisateurs/1` → remplace l'utilisateur 1 |
| **PATCH** | Modifier partiellement une ressource | `PATCH /utilisateurs/1` → modifie seulement le nom |
| **DELETE** | Supprimer une ressource (Delete) | `DELETE /utilisateurs/1` → supprime l'utilisateur 1 |

### Les codes de statut HTTP

Les codes les plus courants dans une API REST :

| Code | Signification | Quand l'utiliser |
|------|---------------|------------------|
| **200** | OK | Requête réussie |
| **201** | Created | Ressource créée (POST) |
| **204** | No Content | Suppression réussie (DELETE) |
| **400** | Bad Request | Données invalides envoyées |
| **404** | Not Found | Ressource inexistante |
| **422** | Unprocessable Entity | Validation Pydantic échouée |
| **500** | Internal Server Error | Erreur serveur |

---

## 2. Installation et premier serveur

### Installation

```bash
pip install fastapi uvicorn
```

- **FastAPI** : le framework lui-même
- **Uvicorn** : serveur ASGI (Asynchronous Server Gateway Interface) qui exécute notre application

> **À retenir** : FastAPI est basé sur Starlette (pour les parties web) et Pydantic (pour les données). Il est conçu pour être rapide, à la fois en termes de performances et de productivité.

### Premier endpoint — "Hello World"

Créez un fichier `main.py` :

```python
from fastapi import FastAPI

# On crée une instance de l'application
app = FastAPI()

# Décorateur : on associe une fonction à une route HTTP
@app.get("/")
def lire_racine():
    """Endpoint racine : retourne un message de bienvenue."""
    return {"message": "Hello World"}
```

**Explications pas à pas :**

1. `from fastapi import FastAPI` — on importe la classe FastAPI
2. `app = FastAPI()` — on crée une instance. C'est notre application.
3. `@app.get("/")` — décorateur qui dit : "quand quelqu'un fait un GET sur `/`, exécute la fonction suivante"
4. `def lire_racine()` — la fonction qui gère la requête
5. `return {"message": "Hello World"}` — FastAPI convertit automatiquement ce dictionnaire en JSON

### Lancer le serveur

```bash
uvicorn main:app --reload
```

**Explication des paramètres :**

- `main` : nom du fichier Python (sans `.py`)
- `app` : nom de la variable FastAPI dans ce fichier
- `--reload` : redémarre automatiquement le serveur quand on modifie le code (pratique en développement)

**Résultat attendu :**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     (Press CTRL+C to quit)
```

Ouvrez http://localhost:8000 dans votre navigateur :

```json
{"message": "Hello World"}
```

---

## 3. Les endpoints avec paramètres

### Paramètres de chemin (path parameters)

```python
@app.get("/items/{item_id}")
def lire_item(item_id: int):
    return {"item_id": item_id, "message": f"Vous avez demandé l'item {item_id}"}
```

**Explication :**
- `{item_id}` dans l'URL est un paramètre dynamique
- `item_id: int` dans la fonction = conversion automatique + validation du type
- Si on visite `/items/abc` → erreur 422 (car "abc" n'est pas un entier)

**Test :** http://localhost:8000/items/42
```json
{"item_id": 42, "message": "Vous avez demandé l'item 42"}
```

### Paramètres de requête (query parameters)

```python
@app.get("/items/{item_id}")
def lire_item(item_id: int, q: str | None = None, limit: int = 10):
    return {
        "item_id": item_id,
        "q": q,
        "limit": limit
    }
```

**Explication :**
- Les paramètres de fonction qui ne sont pas dans le chemin deviennent automatiquement des paramètres de requête (query string)
- `str | None = None` : paramètre optionnel, la syntaxe `type | None` est celle de Python 3.10+
- `limit: int = 10` : paramètre optionnel avec valeur par défaut

**Tests :**
- http://localhost:8000/items/42 → `{"item_id": 42, "q": null, "limit": 10}`
- http://localhost:8000/items/42?q=test&limit=5 → `{"item_id": 42, "q": "test", "limit": 5}`

### Combinaison des deux

```python
@app.get("/users/{user_id}/items/{item_id}")
def lire_item_utilisateur(user_id: int, item_id: int, detail: bool = False):
    return {
        "user_id": user_id,
        "item_id": item_id,
        "detail": detail
    }
```

**Test :** http://localhost:8000/users/1/items/5?detail=true

---

## 4. La validation avec Pydantic

### Pourquoi Pydantic ?

Pydantic est une bibliothèque de validation de données basée sur les **type hints** Python. FastAPI l'utilise pour :
1. Valider les données entrantes (requêtes)
2. Documenter automatiquement les types attendus
3. Convertir les types si nécessaire (ex: `"42"` → `42`)

### Premier modèle

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = False  # valeur par défaut
```

**Ce que cela signifie :**
- Tout `Item` doit avoir un `name` (chaîne) et un `price` (nombre décimal)
- `is_offer` est optionnel (vaut `False` par défaut)
- Si on envoie `{"name": "Sac", "price": "29.99"}` → Pydantic convertit `"29.99"` en `29.99`
- Si on envoie `{"price": 10}` → erreur (name manquant)

### Utilisation dans un endpoint POST

```python
@app.post("/items")
def creer_item(item: Item):
    """Crée un nouvel item (données JSON validées automatiquement)."""
    return {
        "message": f"Item '{item.name}' créé avec succès",
        "price": item.price,
        "is_offer": item.is_offer
    }
```

**Explication :**
- FastAPI lit le corps de la requête (JSON)
- Il valide les données selon le modèle `Item`
- Si validation réussie → la fonction reçoit un objet `Item` complet
- Si validation échoue → erreur 422 avec détails

**Test avec curl :**
```bash
curl -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Sac à dos", "price": 29.99}'
```

**Résultat attendu :**
```json
{
  "message": "Item 'Sac à dos' créé avec succès",
  "price": 29.99,
  "is_offer": false
}
```

### Validation avancée avec Field

```python
from pydantic import BaseModel, Field

class Item(BaseModel):
    name: str = Field(..., min_length=1, max_length=50, description="Nom de l'item")
    price: float = Field(..., gt=0, le=10000, description="Prix en euros")
    is_offer: bool = Field(default=False, description="Est-ce une offre promotionnelle ?")
    description: str | None = Field(default=None, max_length=500)
```

**Explication des validateurs :**
- `Field(...)` : `...` signifie "obligatoire" (pas de valeur par défaut)
- `min_length`, `max_length` : pour les chaînes
- `gt=0` (greater than) : prix strictement positif
- `le=10000` (less or equal) : prix maximum
- `description` : utilisé par la documentation auto

### Modèles avec validation personnalisée

```python
from pydantic import BaseModel, field_validator

class Utilisateur(BaseModel):
    nom: str
    email: str
    age: int

    @field_validator("email")
    @classmethod
    def email_doit_contenir_at(cls, v: str) -> str:
        if "@" not in v:
            raise ValueError("L'email doit contenir un @")
        return v.lower()  # normalisation : on met en minuscules

    @field_validator("age")
    @classmethod
    def age_doit_etre_positif(cls, v: int) -> int:
        if v < 0 or v > 150:
            raise ValueError("L'âge doit être entre 0 et 150")
        return v
```

**Test :**
```bash
curl -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -d '{"nom": "Alice", "email": "alice(at)ex.com", "age": 25}'
```

**Résultat :** erreur 422 avec le message : `"L'email doit contenir un @"`

### Modèles imbriqués (relation)

```python
from pydantic import BaseModel
from datetime import datetime

class Categorie(BaseModel):
    id: int
    nom: str

class Produit(BaseModel):
    id: int
    nom: str
    prix: float
    categorie: Categorie  # modèle imbriqué
    date_creation: datetime | None = None
```

**Test :**
```json
{
  "id": 1,
  "nom": "Ordinateur",
  "prix": 999.99,
  "categorie": {"id": 5, "nom": "Informatique"}
}
```

> **À retenir** : Pydantic valide récursivement. Chaque sous-objet est lui-même validé selon son modèle.

---

## 5. CRUD complet avec base de données en mémoire

### Structure de données simulée

```python
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

app = FastAPI(title="Mon API CRUD", version="1.0.0")

# Modèle
class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = False

# "Base de données" simulée (dictionnaire en mémoire)
items_db: dict[int, Item] = {}
compteur_id: int = 0
```

### Create (POST)

```python
@app.post("/items", status_code=status.HTTP_201_CREATED)
def creer_item(item: Item):
    global compteur_id
    compteur_id += 1
    items_db[compteur_id] = item
    return {"id": compteur_id, **item.model_dump()}
```

**Explication :**
- `status_code=201` : le code HTTP pour "Created"
- `item.model_dump()` : convertit l'objet Pydantic en dictionnaire (nouveau nom pour `.dict()` depuis Pydantic v2)
- On renvoie l'ID attribué avec les données

### Read all (GET)

```python
@app.get("/items")
def lister_items():
    """Retourne tous les items. Si la base est vide, retourne un dictionnaire vide."""
    return items_db
```

### Read one (GET avec ID)

```python
@app.get("/items/{item_id}")
def lire_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(
            status_code=404,
            detail=f"Item {item_id} introuvable"
        )
    return items_db[item_id]
```

**Explication :**
- `HTTPException` : le mécanisme de FastAPI pour retourner des erreurs HTTP
- On vérifie d'abord si l'item existe, sinon 404

### Update (PUT)

```python
@app.put("/items/{item_id}")
def mettre_a_jour(item_id: int, item: Item):
    """Remplace complètement un item."""
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item introuvable")
    items_db[item_id] = item
    return {"id": item_id, **item.model_dump()}
```

> **Attention** : PUT remplace **tout** l'item. Les champs non fournis prendront leur valeur par défaut.

### Delete (DELETE)

```python
@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def supprimer_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item introuvable")
    del items_db[item_id]
    # Pas de return : 204 No Content
```

> **Piège courant** : ne pas oublier qu'avec `status_code=204`, on ne doit pas retourner de contenu. FastAPI l'ignore de toute façon, mais c'est une bonne pratique.

---

## 6. La documentation interactive automatique

### Swagger UI

FastAPI génère automatiquement une documentation interactive à partir de vos type hints et docstrings.

- **Swagger UI** : http://localhost:8000/docs
- **ReDoc** : http://localhost:8000/redoc

**Ce que Swagger UI vous donne gratuitement :**
- Liste de tous les endpoints
- Schémas des modèles Pydantic
- Bouton "Try it out" pour tester chaque endpoint
- Codes de statut documentés

### Enrichir la documentation

```python
from fastapi import FastAPI, Query, Path

app = FastAPI(
    title="API Todo",
    description="Une API REST pour gérer des tâches",
    version="2.0.0",
    contact={
        "name": "Mon Nom",
        "email": "mon@email.com",
    },
)

@app.get("/items/{item_id}")
def lire_item(
    item_id: int = Path(..., ge=1, description="ID de l'item"),
    q: str | None = Query(None, max_length=50, description="Recherche optionnelle")
):
    """Récupère un item par son ID."""
    return {"item_id": item_id, "q": q}
```

**Explication :**
- `Path(...)` : documente et valide un paramètre de chemin
- `Query(None, max_length=50)` : documente un paramètre de requête
- Les docstrings des fonctions apparaissent dans la documentation

---

## 7. Les dépendances (Dependency Injection)

### Principe

Les dépendances permettent d'extraire de la logique répétitive (authentification, base de données, validation) dans des fonctions réutilisables.

### Exemple simple : dépendance de validation

```python
from fastapi import FastAPI, Depends

app = FastAPI()

# Dépendance : une simple fonction
def verifier_token(api_key: str | None = None):
    """Vérifie que l'API key est valide."""
    if api_key is None:
        raise HTTPException(status_code=401, detail="API key manquante")
    if api_key != "secret123":
        raise HTTPException(status_code=403, detail="API key invalide")
    return {"utilisateur": "admin", "api_key": api_key}

# L'endpoint utilise Depends()
@app.get("/users/me")
def lire_profil(auth: dict = Depends(verifier_token)):
    """Retourne le profil de l'utilisateur authentifié."""
    return {"message": "Bienvenue", "utilisateur": auth["utilisateur"]}
```

### Dépendance avec paramètres

```python
def pagination(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100)
) -> tuple[int, int]:
    """Dépendance qui extrait les paramètres de pagination."""
    return skip, limit

@app.get("/items")
def lister_items(pagination_params: tuple[int, int] = Depends(pagination)):
    skip, limit = pagination_params
    # logique de pagination
    items_page = list(items_db.values())[skip:skip + limit]
    return {"items": items_page, "total": len(items_db)}
```

---

## 8. CORS (Cross-Origin Resource Sharing)

### Pourquoi le CORS ?

Quand votre frontend (ex : React sur `localhost:3000`) veut appeler votre API (sur `localhost:8000`), le navigateur bloque la requête pour des raisons de sécurité. CORS permet d'autoriser ces requêtes.

```bash
pip install "fastapi[standard]"
```

```python
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://monsite.com"],
    allow_credentials=True,
    allow_methods=["*"],  # ou ["GET", "POST"]
    allow_headers=["*"],
)
```

**Explication :**
- `allow_origins` : liste des domaines autorisés
- `allow_credentials` : autoriser les cookies
- `allow_methods` : méthodes HTTP autorisées
- `allow_headers` : en-têtes autorisés

> **Piège courant** : en développement, on met `allow_origins=["*"]`, mais jamais en production !

---

## 9. Les middleware

Un middleware est une fonction qui s'exécute **avant** et **après** chaque requête. Utile pour :
- Logger les requêtes
- Ajouter des en-têtes de sécurité
- Chronométrer les appels
- Compresser les réponses

### Exemple : middleware de logging

```python
import time
from fastapi import Request

@app.middleware("http")
async def logger_temps(request: Request, call_next):
    """Mesure le temps d'exécution de chaque requête."""
    start = time.time()
    
    # call_next exécute la requête (passe au handler)
    response = await call_next(request)
    
    # Une fois la réponse obtenue
    duration = time.time() - start
    print(f"{request.method} {request.url.path} - {duration:.3f}s")
    
    return response
```

### Exemple : middleware d'en-têtes de sécurité

```python
from fastapi.responses import JSONResponse

@app.middleware("http")
async def ajouter_en_tetes_securite(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response
```

---

## 10. Structure d'un projet professionnel

Pour un vrai projet, ne mettez pas tout dans `main.py`. Structurez ainsi :

```
mon_api/
  app/
    __init__.py
    main.py          # création de l'instance FastAPI, inclusion des routers
    models.py         # modèles Pydantic
    database.py       # connexion DB (plus tard avec SQLAlchemy)
    routers/
      __init__.py
      items.py        # endpoints liés aux items
      users.py        # endpoints liés aux utilisateurs
    dependencies.py   # dépendances réutilisables
    middleware.py     # middleware personnalisé
  tests/
    __init__.py
    test_items.py
  requirements.txt
```

### Exemple avec routers

```python
# app/routers/items.py
from fastapi import APIRouter

router = APIRouter(prefix="/items", tags=["Items"])

items_db = {}

@router.get("/")
def lister_items():
    return items_db

@router.post("/", status_code=201)
def creer_item(item: Item):
    items_db[item.name] = item
    return item
```

```python
# app/main.py
from fastapi import FastAPI
from app.routers import items, users

app = FastAPI()
app.include_router(items.router)
app.include_router(users.router)
```

**Avantages :**
- Code mieux organisé
- Routers réutilisables
- Tags pour la documentation (groupe d'endpoints)
- Préfixe commun (`/items`) défini une fois

---

## Résumé du module

- **REST** : architecture basée sur les verbes HTTP (GET, POST, PUT, DELETE)
- **FastAPI** : framework moderne, rapide, avec validation automatique
- **Pydantic** : validation des données basée sur les types Python
- **Documentation** : Swagger UI automatique à `/docs`
- **Dépendances** : `Depends()` pour injection de dépendances
- **CORS** : configurer avec `CORSMiddleware` pour autoriser le frontend
- **Middleware** : intercepte toutes les requêtes (logging, sécurité)

---

## Exercices

### Exercice 1 : API de gestion de livres
Créez une API REST pour gérer une bibliothèque :
- Modèle `Livre` avec `titre`, `auteur`, `annee`, `isbn`
- Endpoints CRUD complets
- Validation : année entre 1900 et 2025, ISBN à 13 chiffres
- Documentation avec descriptions

### Exercice 2 : Todo List avec priorités
- Modèle `Todo` : `id`, `titre`, `description`, `priorite` (1-5), `fait` (bool)
- `GET /todos` : filtre optionnel par priorité
- `GET /todos?fait=false` : filtres combinés
- `PUT /todos/{id}/toggle` : bascule l'état fait/pas fait

### Exercice 3 : Mini réseau social
- Modèles : `Utilisateur` (nom, email, bio), `Publication` (titre, contenu, auteur_id)
- Endpoints : CRUD utilisateurs, CRUD publications
- Une publication appartient à un utilisateur (clé étrangère via l'ID)
- Dépendance d'authentification simple (token en query param)
- Middleware de logging
