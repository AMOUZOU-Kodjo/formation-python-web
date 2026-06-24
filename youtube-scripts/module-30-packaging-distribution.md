# Vidéo #30 — Packaging et distribution

## Informations générales
- **Titre** : Python #30 — Packaging et distribution (Formation Complète)
- **Durée** : ~13 min
- **Miniature** : `banners/30-packaging-distribution.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 30 — PACKAGING & DISTRIBUTION

> "Vous avez écrit une super librairie Python. Comment la partager ? Comment la publier sur PyPI pour que le monde entier puisse faire `pip install votre-package` ? C'est l'objet de ce module."

---

### 0:30 — Structure d'un package (2 min)
**Texte écran :** STRUCTURE D'UN PACKAGE

> "Un package Python, c'est un dossier avec un fichier `__init__.py` et un `pyproject.toml`."

```
mon_package/
├── pyproject.toml        # Métadonnées du projet
├── src/
│   └── mon_package/
│       ├── __init__.py   # Rend le dossier importable
│       ├── module1.py
│       └── module2.py
├── tests/
│   └── test_module1.py
├── README.md
└── LICENSE
```

```python
# src/mon_package/__init__.py
__version__ = "0.1.0"
```

> "Le fichier `__init__.py` peut être vide. Il suffit qu'il existe pour que Python reconnaisse le dossier comme un package."

---

### 2:30 — pyproject.toml (2 min)
**Texte écran :** pyproject.toml (PEP 621)

> "Depuis PEP 621, le standard pour décrire un package est le fichier `pyproject.toml`."

```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "mon-package"
version = "0.1.0"
description = "Un super package Python"
readme = "README.md"
license = {text = "MIT"}
authors = [
    {name = "Votre Nom", email = "vous@example.com"}
]
requires-python = ">=3.10"
dependencies = [
    "requests>=2.31",
]

[project.optional-dependencies]
dev = [
    "pytest>=7",
    "ruff",
]
```

> "On y met le nom, la version, la description, les dépendances, et tout ce qui décrit le projet."

---

### 4:30 — Build system : setuptools vs hatchling vs flit (1 min 30)
**Texte écran :** CHOISIR UN BUILD SYSTEM

| Outil | Avantage |
|-------|----------|
| `setuptools` | Historique, très répandu |
| `hatchling` | Rapide, moderne, recommandé |
| `flit` | Simple, léger |

```toml
# setuptools
[build-system]
requires = ["setuptools"]
build-backend = "setuptools.build_meta"

# hatchling (recommandé)
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

# flit
[build-system]
requires = ["flit_core"]
build-backend = "flit_core.buildapi"
```

> "Notre préférence va à `hatchling` : plus rapide que setuptools, très bien intégré à l'écosystème moderne."

---

### 6:00 — Créer une distribution : sdist et wheel (1 min 30)
**Texte écran :** SDIST & WHEEL

```bash
# Installer le build
pip install build

# Créer les distributions
python -m build
```

> "Cette commande crée deux fichiers dans le dossier `dist/` :"

```
dist/
├── mon_package-0.1.0.tar.gz   # Source distribution (sdist)
└── mon_package-0.1.0-py3-none-any.whl  # Wheel (binaire)
```

> "Le **sdist** contient les sources. Le **wheel** est le format binaire prêt à l'emploi. pip préfère toujours le wheel car l'installation est plus rapide."

---

### 7:30 — Tester en local : pip install -e . (1 min)
**Texte écran :** INSTALLATION EN DÉVELOPPEMENT

```bash
# Depuis la racine du projet
pip install -e .
```

> "Le `-e` signifie 'editable' ou 'en mode développement' : les changements dans votre code sont immédiatement pris en compte sans réinstaller."

```python
# Test rapide
import mon_package
print(mon_package.__version__)  # 0.1.0
```

---

### 8:30 — Versionnement sémantique (1 min)
**Texte écran :** SEMANTIC VERSIONING

```
MAJEUR.MINEUR.PATCH

1.0.0 → Première version stable
1.1.0 → Nouvelle fonctionnalité (rétrocompatible)
2.0.0 → Changement qui casse la rétrocompatibilité
1.1.1 → Correction de bug
```

```python
# __init__.py
__version__ = "1.0.0"

# Avec importlib.metadata (Python 3.8+)
from importlib.metadata import version
print(version("mon-package"))  # "0.1.0"
```

> `__version__` reste la convention la plus utilisée. Certains projets la stockent dans un fichier `_version.py` séparé."

---

### 9:30 — Publier sur PyPI (2 min)
**Texte écran :** PUBLIER SUR PyPI

**1. Créer un compte :**
- https://pypi.org → Register
- https://test.pypi.org (pour tester)

**2. Installer twine :**
```bash
pip install twine
```

**3. Téléverser :**
```bash
# D'abord sur TestPyPI
twine upload -r testpypi dist/*

# Puis sur PyPI (production)
twine upload dist/*
```

**4. Vérifier :**
```bash
pip install mon-package
```

> "Testez toujours d'abord sur TestPyPI avant de publier sur le vrai PyPI. Utilisez un token d'API plutôt que votre mot de passe."

---

### 11:30 — Bonnes pratiques (1 min)
**Texte écran :** BONNES PRATIQUES

- Ajouter `.gitignore` avec `dist/`, `*.egg-info/`, `__pycache__/`
- Ajouter un `README.md` avec description et installation
- Ajouter une licence (MIT, Apache, GPL...)
- Configurer `pyproject.toml` avec les bons champs
- Versionner avec `__version__` dans `__init__.py`
- Utiliser `hatchling` comme build backend
- Tester avec `pip install -e .` avant de publier

---

### 12:30 — Conclusion
> "Module 31 : on construit notre première API REST avec FastAPI."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 30 : Packaging et distribution

Au programme :
00:00 — Introduction
00:30 — Structure d'un package Python
02:30 — pyproject.toml (PEP 621)
04:30 — setuptools vs hatchling vs flit
06:00 — Créer une distribution : sdist et wheel
07:30 — Tester en local : pip install -e .
08:30 — Versionnement sémantique
09:30 — Publier sur PyPI (et TestPyPI)
11:30 — Bonnes pratiques
12:30 — Prochain module

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

#python #formationpython #packaging #pypi #pyproject #wheel #opensource
```

## Tags YouTube
```
python, formation python, packaging python, pypi, pyproject.toml, wheel python, sdist python, twine python, pip install, apprendre python, cours python, programmation python
```
