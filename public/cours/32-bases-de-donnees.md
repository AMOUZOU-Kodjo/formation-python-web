# Module 32 : Bases de données avec SQLite et SQLAlchemy

## Objectifs pédagogiques

À la fin de ce module, vous serez capable de :
- Comprendre la différence entre SQL pur et ORM
- Créer et manipuler une base SQLite avec SQL pur (`sqlite3`)
- Utiliser SQLAlchemy ORM pour mapper des classes Python à des tables
- Effectuer des opérations CRUD avec une session SQLAlchemy
- Modéliser des relations (one-to-many, many-to-many)
- Gérer les migrations avec Alembic
- Utiliser SQLAlchemy de manière asynchrone

---

## 1. SQL pur vs ORM : comprendre les approches

### Approche SQL pur

On écrit directement les requêtes SQL sous forme de chaînes de caractères :

```python
import sqlite3
conn = sqlite3.connect("base.db")
curseur = conn.cursor()
curseur.execute("SELECT * FROM utilisateurs WHERE age > ?", (25,))
```

**Avantages :** contrôle total, compréhension du SQL, pas de couche d'abstraction.
**Inconvénients :** chaînes SQL fragiles, pas de vérification à la compilation, répétitif.

### Approche ORM (Object-Relational Mapping)

On manipule des objets Python, l'ORM traduit en SQL :

```python
session.query(Utilisateur).filter(Utilisateur.age > 25).all()
```

**Avantages :** code plus naturel, vérification des types, changement de base de données facile.
**Inconvénients :** magie (perte de contrôle), peut générer du SQL inefficace.

> **À retenir** : L'ORM ne remplace pas le SQL. Il le cache. Savoir écrire du SQL est indispensable pour comprendre ce que fait l'ORM.

---

## 2. SQLite avec le module `sqlite3`

SQLite est une base de données légère, sans serveur, stockée dans un seul fichier. Elle est intégrée à Python (pas d'installation).

### Connexion et curseur

```python
import sqlite3

# Connexion : crée le fichier s'il n'existe pas
conn = sqlite3.connect("ma_base.db")

# Le curseur exécute les requêtes
curseur = conn.cursor()
```

> **Attention** : `sqlite3.connect` crée le fichier automatiquement s'il n'existe pas. Une faute de frappe dans le nom crée donc une nouvelle base vide.

### Création de table

```python
curseur.execute("""
    CREATE TABLE IF NOT EXISTS utilisateurs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        age INTEGER DEFAULT 18,
        date_inscription TEXT DEFAULT CURRENT_DATE
    )
""")
conn.commit()  # valide la transaction
```

**Explication :**
- `AUTOINCREMENT` : l'ID s'incrémente automatiquement
- `NOT NULL` : champ obligatoire
- `UNIQUE` : pas de doublon
- `DEFAULT` : valeur par défaut

### Insertion de données

```python
# Méthode 1 : avec ? (paramètres)
curseur.execute(
    "INSERT INTO utilisateurs (nom, email, age) VALUES (?, ?, ?)",
    ("Alice", "alice@example.com", 30)
)

# Méthode 2 : plusieurs lignes d'un coup
utilisateurs = [
    ("Bob", "bob@example.com", 25),
    ("Charlie", "charlie@example.com", 35),
]
curseur.executemany(
    "INSERT INTO utilisateurs (nom, email, age) VALUES (?, ?, ?)",
    utilisateurs
)

conn.commit()
```

> **Piège courant** : ne JAMAIS concaténer des chaînes pour construire du SQL (risque d'injection SQL).
> ```python
> # DANGEREUX !!!
> curseur.execute(f"INSERT INTO users VALUES ('{nom}')")
> ```
> Toujours utiliser `?` (paramètres).

### Requêtes SELECT

```python
# Tous les utilisateurs
curseur.execute("SELECT * FROM utilisateurs")
for ligne in curseur.fetchall():
    print(ligne)
# → (1, 'Alice', 'alice@example.com', 30, '2025-03-01')

# Avec condition
curseur.execute(
    "SELECT nom, age FROM utilisateurs WHERE age >= ?",
    (30,)
)
for ligne in curseur.fetchall():
    print(ligne)
# → ('Alice', 30)

# Un seul résultat
alice = curseur.execute(
    "SELECT * FROM utilisateurs WHERE email = ?",
    ("alice@example.com",)
).fetchone()
print(alice)
# → (1, 'Alice', 'alice@example.com', 30, '2025-03-01')
```

### Mise à jour et suppression

```python
# Mettre à jour
curseur.execute(
    "UPDATE utilisateurs SET age = ? WHERE nom = ?",
    (31, "Alice")
)
print(f"Lignes modifiées : {curseur.rowcount}")
conn.commit()

# Supprimer
curseur.execute(
    "DELETE FROM utilisateurs WHERE age < ?",
    (18,)
)
conn.commit()
```

### Fermeture de la connexion

```python
curseur.close()
conn.close()
```

> **À retenir** : toujours fermer la connexion, ou utiliser un context manager.

### Avec context manager (recommandé)

```python
with sqlite3.connect("ma_base.db") as conn:
    curseur = conn.cursor()
    curseur.execute("SELECT * FROM utilisateurs")
    resultats = curseur.fetchall()
    # conn.commit() est automatique si pas d'erreur
    # conn.close() est automatique
```

---

## 3. SQLAlchemy ORM — Les bases

### Installation

```bash
pip install sqlalchemy
```

### Connexion et déclaration des modèles

```python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, Session

# 1. Moteur de base de données
engine = create_engine("sqlite:///ma_base.db", echo=True)
# echo=True : affiche les requêtes SQL générées (utile pour le débogage)

# 2. Classe de base pour les modèles
Base = declarative_base()

# 3. Définition d'un modèle (table)
class Utilisateur(Base):
    __tablename__ = "utilisateurs"
    
    id = Column(Integer, primary_key=True)
    nom = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    age = Column(Integer, default=18)

    def __repr__(self):
        return f"<Utilisateur(nom='{self.nom}', age={self.age})>"

# 4. Création de la table dans la base
Base.metadata.create_all(engine)
```

**Explication :**
- `create_engine("sqlite:///ma_base.db")` : connecteur vers SQLite (fichier local)
- `echo=True` : affiche le SQL généré dans la console
- `declarative_base()` : classe mère pour tous nos modèles
- `Column(type)` : définit une colonne
- `Base.metadata.create_all(engine)` : crée toutes les tables

### La session : coeur des opérations

La session est l'équivalent du curseur en SQL pur. Elle gère les transactions.

```python
# Création d'une session
with Session(engine) as session:
    # CREATE
    alice = Utilisateur(nom="Alice", email="alice@ex.com", age=30)
    session.add(alice)
    session.commit()  → INSERT INTO utilisateurs (nom, email, age) VALUES (...)

    # READ all
    users = session.query(Utilisateur).all()
    # → SELECT * FROM utilisateurs
    
    # READ with filter
    alice = session.query(Utilisateur).filter_by(nom="Alice").first()
    # → SELECT * FROM utilisateurs WHERE nom = ? LIMIT 1
    
    # READ with complex filter
    adultes = session.query(Utilisateur)\
        .filter(Utilisateur.age >= 18)\
        .order_by(Utilisateur.nom)\
        .all()

    # UPDATE
    alice.age = 31
    session.commit()  # → UPDATE utilisateurs SET age = ? WHERE id = ?

    # DELETE
    session.delete(alice)
    session.commit()  # → DELETE FROM utilisateurs WHERE id = ?
```

> **À retenir** : `session.commit()` valide la transaction. Sans appel à `commit()`, rien n'est écrit dans la base.

### Filtres courants SQLAlchemy

```python
# Égalité
session.query(Utilisateur).filter(Utilisateur.nom == "Alice")

# Différent
session.query(Utilisateur).filter(Utilisateur.age != 30)

# Supérieur / Inférieur
session.query(Utilisateur).filter(Utilisateur.age > 25)
session.query(Utilisateur).filter(Utilisateur.age >= 18)

# ET
from sqlalchemy import and_
session.query(Utilisateur).filter(
    and_(Utilisateur.age > 20, Utilisateur.nom.like("A%"))
)

# OU
from sqlalchemy import or_
session.query(Utilisateur).filter(
    or_(Utilisateur.nom == "Alice", Utilisateur.age < 20)
)

# IN
session.query(Utilisateur).filter(Utilisateur.age.in_([25, 30, 35]))

# LIKE (recherche textuelle)
session.query(Utilisateur).filter(Utilisateur.nom.like("%ice%"))
```

---

## 4. CRUD complet avec SQLAlchemy

### Modèle étendu

```python
from datetime import datetime
from sqlalchemy import DateTime

class Article(Base):
    __tablename__ = "articles"
    
    id = Column(Integer, primary_key=True)
    titre = Column(String(200), nullable=False)
    contenu = Column(String, nullable=False)
    date_publication = Column(DateTime, default=datetime.utcnow)
    est_publie = Column(Integer, default=0)  # booléen en SQLite
```

### Créer

```python
with Session(engine) as session:
    article = Article(
        titre="Introduction à SQLAlchemy",
        contenu="Contenu très intéressant ici..."
    )
    session.add(article)
    session.flush()  # exécute le SQL sans commit, utile pour obtenir l'ID
    print(f"Article créé avec l'ID {article.id}")
    session.commit()
```

### Lire avec pagination

```python
with Session(engine) as session:
    # Pagination : skip et limit
    articles = session.query(Article)\
        .filter(Article.est_publie == 1)\
        .order_by(Article.date_publication.desc())\
        .offset(0)\
        .limit(10)\
        .all()
```

### Mettre à jour (deux méthodes)

```python
with Session(engine) as session:
    # Méthode 1 : modifier l'objet
    article = session.query(Article).filter_by(id=1).first()
    if article:
        article.titre = "Titre modifié"
        article.est_publie = 1
        session.commit()

    # Méthode 2 : update directe (une seule requête)
    session.query(Article)\
        .filter(Article.id == 1)\
        .update({"titre": "Titre modifié", "est_publie": 1})
    session.commit()
```

### Supprimer

```python
with Session(engine) as session:
    # Méthode 1 : supprimer un objet
    article = session.query(Article).filter_by(id=1).first()
    if article:
        session.delete(article)
        session.commit()

    # Méthode 2 : delete direct
    session.query(Article).filter(Article.id == 1).delete()
    session.commit()
```

---

## 5. Les relations entre tables

### One-to-Many (Un utilisateur → plusieurs articles)

```python
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Utilisateur(Base):
    __tablename__ = "utilisateurs"
    
    id = Column(Integer, primary_key=True)
    nom = Column(String, nullable=False)
    email = Column(String, unique=True)
    
    # Relation inverse : un utilisateur a plusieurs articles
    articles = relationship("Article", back_populates="auteur")

class Article(Base):
    __tablename__ = "articles"
    
    id = Column(Integer, primary_key=True)
    titre = Column(String, nullable=False)
    contenu = Column(String)
    auteur_id = Column(Integer, ForeignKey("utilisateurs.id"))
    
    # Relation : un article appartient à un utilisateur
    auteur = relationship("Utilisateur", back_populates="articles")
```

**Explication :**
- `ForeignKey("utilisateurs.id")` : contrainte SQL qui dit "cette colonne fait référence à l'ID de la table utilisateurs"
- `relationship()` : lien Python entre les objets (pas une colonne SQL)
- `back_populates` : relie les deux côtés de la relation

```python
with Session(engine) as session:
    # Créer un utilisateur avec ses articles
    alice = Utilisateur(nom="Alice", email="alice@ex.com")
    alice.articles = [
        Article(titre="Article 1", contenu="aaa"),
        Article(titre="Article 2", contenu="bbb"),
    ]
    session.add(alice)
    session.commit()

    # Navigation dans la relation
    article = session.query(Article).first()
    print(article.auteur.nom)  # → "Alice"

    alice = session.query(Utilisateur).filter_by(nom="Alice").first()
    for art in alice.articles:
        print(art.titre)
    # → "Article 1"
    # → "Article 2"
```

> **Piège courant** : avec `back_populates`, il faut définir **les deux côtés**. Sinon SQLAlchemy ne fait pas le lien en Python.

### Many-to-Many (Plusieurs articles ↔ plusieurs catégories)

Nécessite une **table d'association** :

```python
from sqlalchemy import Table, Text

# Table d'association (ne correspond pas à une classe)
article_categorie = Table(
    "article_categorie",
    Base.metadata,
    Column("article_id", Integer, ForeignKey("articles.id"), primary_key=True),
    Column("categorie_id", Integer, ForeignKey("categories.id"), primary_key=True),
)

class Categorie(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True)
    nom = Column(String, unique=True, nullable=False)
    description = Column(Text)
    
    articles = relationship("Article", secondary=article_categorie, back_populates="categories")

class Article(Base):
    # ... (colonnes existantes) ...
    categories = relationship("Categorie", secondary=article_categorie, back_populates="articles")
```

**Explication :**
- `secondary=article_categorie` : indique la table d'association
- `primary_key=True` sur les deux colonnes de la table d'association : évite les doublons

```python
with Session(engine) as session:
    # Créer des catégories
    python = Categorie(nom="Python")
    web = Categorie(nom="Web")
    session.add_all([python, web])
    session.commit()

    # Associer un article à des catégories
    article = session.query(Article).first()
    article.categories = [python, web]
    session.commit()

    # Navigation
    for cat in article.categories:
        print(cat.nom)
    # → "Python", "Web"

    # Un article dans une catégorie
    articles_python = session.query(Article)\
        .join(Article.categories)\
        .filter(Categorie.nom == "Python")\
        .all()
```

---

## 6. Sessions avancées : patterns recommandés

### Contexte de session (pattern du "session maker")

```python
from sqlalchemy.orm import sessionmaker

# Factory de sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Utilisation
with SessionLocal() as session:
    resultat = session.query(Utilisateur).all()
```

### Pattern avec dépendance (pour FastAPI)

```python
# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

```python
# main.py (FastAPI)
from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
from .database import get_db, Utilisateur

app = FastAPI()

@app.get("/users")
def lire_users(db: Session = Depends(get_db)):
    users = db.query(Utilisateur).all()
    return users
```

**Explication :**
- `get_db()` crée une session au début de chaque requête
- Le `finally` garantit la fermeture même en cas d'erreur
- `Depends(get_db)` injecte la session dans l'endpoint

---

## 7. Migrations avec Alembic

Les migrations permettent de faire évoluer le schéma de la base de données (ajouter une colonne, créer une table, etc.) sans perdre les données existantes.

### Installation et initialisation

```bash
pip install alembic
alembic init alembic
```

Cette commande crée :
- `alembic/` : dossier des migrations
- `alembic.ini` : configuration

### Configuration

Dans `alembic.ini` :
```ini
sqlalchemy.url = sqlite:///./ma_base.db
```

Dans `alembic/env.py` :
```python
import sys
sys.path.append(".")

from models import Base  # vos modèles SQLAlchemy
target_metadata = Base.metadata
```

### Créer une migration automatique

```bash
alembic revision --autogenerate -m "ajout colonne bio"
```

**Résultat attendu :**
```
INFO  [alembic] Detected added column 'utilisateurs.bio'
Generating alembic/versions/abc123_ajout_colonne_bio.py
```

### Appliquer la migration

```bash
alembic upgrade head
```

### Commandes essentielles

| Commande | Action |
|----------|--------|
| `alembic init alembic` | Initialiser Alembic |
| `alembic revision --autogenerate -m "message"` | Créer une migration |
| `alembic upgrade head` | Appliquer toutes les migrations |
| `alembic downgrade -1` | Revenir en arrière d'une migration |
| `alembic history` | Voir l'historique |
| `alembic current` | Voir la version actuelle |

---

## 8. SQLAlchemy asynchrone

Pour les applications asynchrones (FastAPI, aiohttp), on utilise la version async :

```bash
pip install sqlalchemy[asyncio] aiosqlite
```

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select

# Moteur asynchrone (notez "sqlite+aiosqlite")
engine = create_async_engine("sqlite+aiosqlite:///./ma_base.db", echo=True)

# Session asynchrone
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def get_users():
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(Utilisateur))
        users = result.scalars().all()
        return users

# En FastAPI
@app.get("/users")
async def lire_users(db: AsyncSession = Depends(get_async_db)):
    result = await db.execute(select(Utilisateur))
    return result.scalars().all()
```

**Différences clés :**
- `create_async_engine` au lieu de `create_engine`
- `AsyncSession` au lieu de `Session`
- `await session.execute()` au lieu de `session.query()`
- `select(Modèle)` au lieu de `session.query(Modèle)`

---

## Résumé du module

- **SQLite** : base légère idéale pour l'apprentissage, intégrée à Python
- **SQL pur** : contrôle total, mais répétitif
- **SQLAlchemy ORM** : abstraction objet, productivité, portabilité
- **Relations** : `ForeignKey` + `relationship()` pour one-to-many, table d'association pour many-to-many
- **Session** : gère les transactions, `commit()` valide, `close()` libère
- **Migrations (Alembic)** : évolution contrôlée du schéma
- **Async** : `create_async_engine` + `AsyncSession` pour les apps asynchrones

---

## Exercices

### Exercice 1 : Gestionnaire de bibliothèque
- Modèles : `Livre` (titre, auteur, annee, isbn, disponible), `Emprunteur` (nom, email)
- Relation : un emprunteur peut emprunter plusieurs livres
- CRUD complet avec SQLAlchemy
- Requête : livres non disponibles + nom de l'emprunteur

### Exercice 2 : Blog avec commentaires
- Modèles : `Article`, `Commentaire`, `Utilisateur`
- Relations : Article → Commentaire (one-to-many), Utilisateur → Commentaire (one-to-many)
- Requêtes avancées : tous les commentaires d'un article, articles récents avec leurs auteurs
- Utiliser `joinedload` pour éviter les requêtes N+1

### Exercice 3 : Migrations
- Créer un projet Alembic
- Ajouter une colonne `note` (Integer) à la table `Article`
- Créer et appliquer la migration
- Vérifier que les données existantes ne sont pas perdues

### Exercice 4 : Many-to-Many
- Modèles : `Etudiant`, `Cours`, avec table d'association `inscription`
- Un étudiant peut suivre plusieurs cours, un cours a plusieurs étudiants
- Colonne supplémentaire dans la table d'association : `note` (Float)
- Requête : liste des étudiants avec la moyenne de leurs notes
