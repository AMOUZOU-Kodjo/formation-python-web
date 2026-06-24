# Vidéo #32 — Bases de données

## Informations générales
- **Titre** : Python #32 — Bases de données (Formation Complète)
- **Durée** : ~15 min
- **Miniature** : `banners/32-bases-de-donnees.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 32 — BASES DE DONNÉES

> "Une application sans base de données, c'est comme un carnet sans stylo. Dans ce module, on va voir SQLite, SQLAlchemy, les relations, et les migrations."

---

### 0:30 — SQLite : base embarquée (1 min 30)
**Texte écran :** SQLITE

> "SQLite est une base de données embarquée : pas de serveur, pas de configuration. Tout tient dans un seul fichier `.db`."

**Avantages :**
- Incluse dans Python (module `sqlite3`)
- Aucune installation requise
- Parfaite pour le développement, les prototypes, les applications mobiles
- Supporte SQL standard

```python
import sqlite3
print(sqlite3.sqlite_version)   # 3.45.0
```

---

### 2:00 — sqlite3 : connexion et curseur (2 min)
**Texte écran :** CONNEXION & CURSEUR

```python
import sqlite3

# Connexion (crée le fichier s'il n'existe pas)
conn = sqlite3.connect("ma_base.db")

# Curseur (exécute les requêtes)
cur = conn.cursor()

# Fermer
cur.close()
conn.close()
```

> "Le **curseur** est l'objet qui exécute les requêtes SQL. La **connexion** gère la transaction."

**Avec context manager :**
```python
with sqlite3.connect("ma_base.db") as conn:
    cur = conn.cursor()
    cur.execute("...")
    # conn.commit() automatique à la sortie
```

---

### 4:00 — CREATE TABLE et INSERT (2 min)
**Texte écran :** CRÉER ET INSÉRER

```python
import sqlite3

with sqlite3.connect("bibliotheque.db") as conn:
    cur = conn.cursor()

    # Créer la table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS livres (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titre TEXT NOT NULL,
            auteur TEXT NOT NULL,
            annee INTEGER,
            lu BOOLEAN DEFAULT 0
        )
    """)

    # Insérer un seul livre
    cur.execute(
        "INSERT INTO livres (titre, auteur, annee) VALUES (?, ?, ?)",
        ("Python pour les nuls", "John Doe", 2024)
    )

    # Insérer plusieurs
    livres = [
        ("FastAPI au quotidien", "Jane Doe", 2025),
        ("Data Science 101", "Bob Smith", 2023),
    ]
    cur.executemany(
        "INSERT INTO livres (titre, auteur, annee) VALUES (?, ?, ?)",
        livres
    )
```

> "Le `?` est un placeholder sécurisé contre l'injection SQL. Ne JAMAIS concaténer les valeurs directement dans la requête."

---

### 6:00 — SELECT, UPDATE, DELETE (2 min)
**Texte écran :** LIRE, MODIFIER, SUPPRIMER

```python
with sqlite3.connect("bibliotheque.db") as conn:
    cur = conn.cursor()

    # SELECT
    cur.execute("SELECT * FROM livres")
    for row in cur.fetchall():
        print(row)   # (1, "Titre", "Auteur", 2024, 0)

    # SELECT avec filtre
    cur.execute("SELECT * FROM livres WHERE annee > ?", (2023,))

    # UPDATE
    cur.execute(
        "UPDATE livres SET lu = 1 WHERE id = ?",
        (1,)
    )

    # DELETE
    cur.execute("DELETE FROM livres WHERE id = ?", (3,))
```

> "`fetchall()` retourne toutes les lignes. `fetchone()` en retourne une. `fetchmany(n)` en retourne n."

---

### 8:00 — SQLAlchemy ORM (2 min 30)
**Texte écran :** SQLALCHEMY ORM

> "L'ORM (Object-Relational Mapping) permet de manipuler la base de données avec des objets Python plutôt qu'avec du SQL brut."

```bash
pip install sqlalchemy
```

```python
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base, Session

# Connexion
engine = create_engine("sqlite:///bibliotheque.db", echo=True)

# Base
Base = declarative_base()

# Modèle
class Livre(Base):
    __tablename__ = "livres"

    id = Column(Integer, primary_key=True)
    titre = Column(String, nullable=False)
    auteur = Column(String, nullable=False)
    annee = Column(Integer)
    lu = Column(Boolean, default=False)

    def __repr__(self):
        return f"<Livre {self.titre}>"

# Créer les tables
Base.metadata.create_all(engine)
```

---

### 10:30 — Session et CRUD avec SQLAlchemy (2 min)
**Texte écran :** CRUD AVEC SESSION

```python
from sqlalchemy.orm import Session

# Ajouter
with Session(engine) as session:
    livre = Livre(titre="Python 101", auteur="Alice", annee=2025)
    session.add(livre)
    session.commit()

# Lire
with Session(engine) as session:
    livres = session.query(Livre).all()
    for l in livres:
        print(l.titre)

    livre = session.query(Livre).filter_by(titre="Python 101").first()

# Modifier
with Session(engine) as session:
    livre = session.query(Livre).filter_by(titre="Python 101").first()
    livre.lu = True
    session.commit()

# Supprimer
with Session(engine) as session:
    livre = session.query(Livre).filter_by(titre="Python 101").first()
    session.delete(livre)
    session.commit()
```

---

### 12:00 — Relations : one-to-many, many-to-many (2 min)
**Texte écran :** RELATIONS

**One-to-Many :**
```python
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Auteur(Base):
    __tablename__ = "auteurs"
    id = Column(Integer, primary_key=True)
    nom = Column(String)
    livres = relationship("Livre", back_populates="auteur")

class Livre(Base):
    __tablename__ = "livres"
    id = Column(Integer, primary_key=True)
    titre = Column(String)
    auteur_id = Column(Integer, ForeignKey("auteurs.id"))
    auteur = relationship("Auteur", back_populates="livres")
```

**Many-to-Many :**
```python
from sqlalchemy import Table

# Table d'association
livres_categories = Table(
    "livres_categories", Base.metadata,
    Column("livre_id", ForeignKey("livres.id")),
    Column("categorie_id", ForeignKey("categories.id"))
)

class Categorie(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True)
    nom = Column(String)
    livres = relationship("Livre", secondary=livres_categories, back_populates="categories")

Livre.categories = relationship("Categorie", secondary=livres_categories, back_populates="livres")
```

---

### 14:00 — Injection SQL et Alembic (1 min)
**Texte écran :** SÉCURITÉ & MIGRATIONS

**NE JAMAIS FAIRE :**
```python
# ❌ Injection SQL !
titre = input("Titre : ")
cur.execute(f"SELECT * FROM livres WHERE titre = '{titre}'")
# Si l'utilisateur tape : ' OR 1=1 --
# → SELECT * FROM livres WHERE titre = '' OR 1=1 --'
```

**TOUJOURS FAIRE :**
```python
cur.execute("SELECT * FROM livres WHERE titre = ?", (titre,))
```

**Alembic pour les migrations :**
```bash
pip install alembic
alembic init alembic
alembic revision --autogenerate -m "ajouter_table_auteurs"
alembic upgrade head
```

> "Alembic génère automatiquement les scripts de migration en comparant vos modèles SQLAlchemy avec l'état de la base."

---

### 14:30 — Conclusion
> "Module 33 : on scrappe des pages web avec requests et BeautifulSoup."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 32 : Bases de données

Au programme :
00:00 — Introduction
00:30 — SQLite : base embarquée
02:00 — sqlite3 : connexion et curseur
04:00 — CREATE TABLE et INSERT
06:00 — SELECT, UPDATE, DELETE
08:00 — SQLAlchemy ORM et modèles
10:30 — Session et CRUD avec SQLAlchemy
12:00 — Relations : one-to-many, many-to-many
14:00 — Injection SQL et migrations Alembic
14:30 — Prochain module

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

#python #formationpython #sqlite #sqlalchemy #bdd #database #alembic #orm
```

## Tags YouTube
```
python, formation python, base de données python, sqlite python, sqlalchemy, alembic, orm python, sql python, apprendre python, cours python, programmation python, python avancé
```
