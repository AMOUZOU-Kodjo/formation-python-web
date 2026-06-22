# Module 30 : Packaging et Distribution

**Objectifs pédagogiques**
- Comprendre la structure complète d'un package Python
- Maîtriser `pyproject.toml` et sa configuration
- Savoir construire et distribuer un package (wheel, sdist)
- Publier sur PyPI avec `twine`
- Créer des commandes CLI avec les entry points
- Comprendre la différence entre wheel et sdist
- Appliquer le versionnement sémantique
- Découvrir les namespace packages et le choix de licence

---

## Partie 1 : Structure d'un package Python

### 1.1 Structure minimale

```
mon_package/
  pyproject.toml         ← Configuration du package (OBLIGATOIRE)
  src/
    mon_package/         ← Code source (convention src layout)
      __init__.py        ← Rend le dossier importable
      module1.py
      module2.py
  tests/
    test_module1.py
    test_module2.py
  README.md
  LICENSE
```

**Pourquoi `src/` (src layout) ?**
- Évite les confusions entre le code source et le package installé
- Empêche d'importer le code source directement (oblige à installer)
- Pratique recommandée par PyPA (Python Packaging Authority)

### 1.2 Le fichier `__init__.py`

```python
# src/mon_package/__init__.py

# Définit ce qui est exporté par défaut
__version__ = "0.1.0"
__author__ = "Moi"

# Imports pratiques pour les utilisateurs
from .module1 import fonction_a
from .module2 import fonction_b

# Contrôle ce que "from mon_package import *" exporte
__all__ = ["fonction_a", "fonction_b", "classe_c"]
```

### 1.3 Module simple

```python
# src/mon_package/module1.py

def fonction_a(nom: str) -> str:
    """Dit bonjour à quelqu'un."""
    return f"Bonjour, {nom} !"

def fonction_b(a: int, b: int) -> int:
    """Additionne deux nombres."""
    return a + b
```

---

## Partie 2 : `pyproject.toml` — Le fichier de configuration central

Depuis PEP 517/518, `pyproject.toml` est le fichier **obligatoire** pour tout package Python.

### 2.1 Configuration complète

```toml
[build-system]
# OBLIGATOIRE : quel outil pour construire le package
requires = ["setuptools>=68.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
# Métadonnées du package
name = "mon-package"            # Nom sur PyPI (tirets, pas underscores)
version = "0.1.0"              # Version sémantique
description = "Un package formidable"
readme = "README.md"
requires-python = ">=3.9"

authors = [
    {name = "Alice", email = "alice@example.com"},
]
maintainers = [
    {name = "Bob", email = "bob@example.com"},
]
license = {text = "MIT"}
keywords = ["exemple", "pedagogie", "python"]
classifiers = [
    "Development Status :: 3 - Alpha",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.9",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
]

# Dépendances de production
dependencies = [
    "requests>=2.31.0",
    "click>=8.0",
]

# Dépendances optionnelles (extras)
[project.optional-dependencies]
dev = [
    "pytest>=7.0",
    "mypy>=1.0",
    "ruff>=0.1",
]
doc = [
    "sphinx>=7.0",
    "sphinx-rtd-theme>=1.3",
]

# Entry points (CLI)
[project.scripts]
mon-outil = "mon_package.cli:main"

# Entry points (plugins)
[project.entry-points."mon_package.plugins"]
formatteur = "mon_package.plugins:formatteur"

[project.urls]
Homepage = "https://github.com/moi/mon-package"
Documentation = "https://mon-package.readthedocs.io"
Source = "https://github.com/moi/mon-package"
Tracker = "https://github.com/moi/mon-package/issues"

[tool.setuptools.packages.find]
where = ["src"]               # Chercher les packages dans src/
include = ["mon_package*"]    # Inclure ce qui correspond
exclude = ["tests*"]          # Exclure les tests
```

### 2.2 Les classifiers PyPI

Les **classifiers** sont des catégories standardisées qui aident les utilisateurs à trouver votre package. Les plus importants :

```python
classifiers = [
    # Stade de développement
    "Development Status :: 1 - Planning",
    "Development Status :: 2 - Pre-Alpha",
    "Development Status :: 3 - Alpha",
    "Development Status :: 4 - Beta",
    "Development Status :: 5 - Production/Stable",
    "Development Status :: 6 - Mature",

    # Licence
    "License :: OSI Approved :: MIT License",
    "License :: OSI Approved :: Apache Software License",
    "License :: OSI Approved :: GNU General Public License v3 (GPLv3)",

    # Versions Python
    "Programming Language :: Python :: 3 :: Only",
    "Programming Language :: Python :: 3.9",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
    "Programming Language :: Python :: 3.12",

    # Public cible
    "Intended Audience :: Developers",
    "Intended Audience :: Science/Research",
    "Topic :: Software Development :: Libraries",
]
```

---

## Partie 3 : Versionnement sémantique (SemVer)

### 3.1 Le format `MAJEUR.MINEUR.PATCH`

```
v2.5.1
↑  ↑  ↑
|  |  └─ PATCH : correction de bug (rétrocompatible)
|  └──── MINEUR : nouvelle fonctionnalité (rétrocompatible)
└─────── MAJEUR : changement cassant (non rétrocompatible)
```

### 3.2 Exemples concrets

```
1.0.0    → Première version stable
1.0.1    → Correction d'un bug
1.1.0    → Nouvelle fonctionnalité (l'ancien code marche toujours)
2.0.0    → Changement cassant (API incompatible)
```

### 3.3 Pré-versions et métadonnées

```
1.0.0-alpha.1    → Développement précoce
1.0.0-beta.2     → Beta test
1.0.0-rc.3       → Release Candidate
1.0.0            → Release finale
1.0.1.post1      → Post-release (correctif après la release)
```

### 3.4 Gestion de la version dans le code

```python
# src/mon_package/__init__.py
__version__ = "0.1.0"

# Méthode recommandée : une seule source de vérité
# On peut aussi utiliser importlib.metadata (Python 3.8+)
from importlib.metadata import version

def get_version():
    try:
        return version("mon-package")
    except:
        return "0.0.0"
```

**Piège :** Ne pas oublier de synchroniser la version dans `pyproject.toml` et dans `__init__.py`. Certains outils comme `setuptools-scm` automatisent ça.

---

## Partie 4 : Construction — wheel vs sdist

### 4.1 Les deux formats

| Format | Extension | Contenu | Usage |
|--------|-----------|---------|-------|
| **sdist** (source distribution) | `.tar.gz` | Code source brut | Distribution universelle |
| **wheel** (built distribution) | `.whl` | Code prêt à installer | Installation rapide |

```bash
# Construire les deux
pip install build
python -m build

# Résultat :
# dist/
#   mon_package-0.1.0.tar.gz    ← sdist
#   mon_package-0.1.0-py3-none-any.whl  ← wheel
```

**Résultat attendu :**
```
Successfully built mon_package-0.1.0.tar.gz and mon_package-0.1.0-py3-none-any.whl
```

### 4.2 Différence pratique

```bash
# sdist : il faut compiler/construire
pip install mon_package-0.1.0.tar.gz
# → Exécute setup.py (lent, peut planter)

# wheel : copie directe (80% plus rapide)
pip install mon_package-0.1.0-py3-none-any.whl
# → Simple copie de fichiers (rapide, fiable)
```

**Quand build ?**
- Toujours publier les DEUX formats
- sdist pour les plateformes exotiques
- wheel pour l'installation standard

### 4.3 Pure Python vs extensions C

```python
# Pure Python (pas de compilation) :
# mon_package-0.1.0-py3-none-any.whl
#                ↑    ↑    ↑
#                |    |    └─ any (n'importe quelle plateforme)
#                |    └─────── none (pas d'ABI spécifique)
#                └──────────── Python 3 uniquement

# Avec extension C (numpy, cython) :
# mon_package-0.1.0-cp311-cp311-win_amd64.whl
#                ↑     ↑
#                |     └─ Windows 64 bits, Python 3.11
#                └──────── CPython 3.11
```

---

## Partie 5 : Entry points — Créer des commandes CLI

### 5.1 Script CLI basique

```python
# src/mon_package/cli.py
import click

@click.command()
@click.argument("nom")
@click.option("--compteur", default=1, help="Nombre de répétitions")
def main(nom: str, compteur: int):
    """Dit bonjour à NOM plusieurs fois."""
    for _ in range(compteur):
        print(f"Bonjour, {nom} !")

if __name__ == "__main__":
    main()
```

```toml
# pyproject.toml
[project.scripts]
mon-outil = "mon_package.cli:main"
```

```bash
# Après installation :
mon-outil Alice --compteur 3
# → Bonjour, Alice !
# → Bonjour, Alice !
# → Bonjour, Alice !
```

### 5.2 Entry points pour plugins

Les entry points permettent aussi un **système de plugins** :

```toml
# Dans le package A (hôte) :
[project.entry-points."mon_app.plugins"]

# Dans le package B (plugin) :
[project.entry-points."mon_app.plugins"]
plugin_b = "package_b.plugin:mon_plugin"
```

```python
# Découverte des plugins :
from importlib.metadata import entry_points

def decouvrir_plugins():
    plugins = entry_points(group="mon_app.plugins")
    for plugin in plugins:
        fonction = plugin.load()
        fonction()
```

---

## Partie 6 : Distribution sur PyPI

### 6.1 Préparation

```bash
# 1. S'assurer que le build fonctionne
python -m build

# 2. Vérifier le contenu des archives
tar xzf dist/mon_package-0.1.0.tar.gz -C /tmp
```

### 6.2 Publication avec Twine

```bash
# Installer twine
pip install twine

# Tester sur TestPyPI (bac à sable)
twine upload --repository testpypi dist/*

# Installer depuis TestPyPI pour vérifier
pip install --index-url https://test.pypi.org/simple/ mon-package

# Publier sur PyPI (production)
twine upload dist/*

# On peut aussi passer le token directement :
twine upload --username __token__ --password pypi-xxxx dist/*
```

**Résultat attendu :**
```
Uploading mon_package-0.1.0-py3-none-any.whl
100% ━━━━━━━━━━━━━━━━━━━━ 8.2 kB • 00:00
Uploading mon_package-0.1.0.tar.gz
100% ━━━━━━━━━━━━━━━━━━━━ 6.7 kB • 00:00
```

### 6.3 Token PyPI (sécurité)

```bash
# 1. Créer un token sur https://pypi.org/manage/account/
# 2. Créer ~/.pypirc
```

```ini
[testpypi]
username = __token__
password = pypi-xxxxx

[pypi]
username = __token__
password = pypi-yyyyy
```

**Ne JAMAIS** mettre le token dans le code ou le commit. Utiliser les variables d'environnement :

```bash
set TWINE_USERNAME=__token__  # Windows
export TWINE_USERNAME=__token__  # Linux/macOS

set TWINE_PASSWORD=pypi-xxxxx
export TWINE_PASSWORD=pypi-xxxxx
```

---

## Partie 7 : CI/CD pour PyPI (GitHub Actions)

Automatiser la publication à chaque tag ou release :

```yaml
# .github/workflows/publish.yml
name: Publish to PyPI

on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: |
          pip install build twine

      - name: Build package
        run: python -m build

      - name: Publish to PyPI
        env:
          TWINE_USERNAME: __token__
          TWINE_PASSWORD: ${{ secrets.PYPI_TOKEN }}
        run: twine upload dist/*
```

**Workflow :**
1. `git tag v0.2.0`
2. `git push --tags`
3. Créer une Release sur GitHub
4. Le workflow publie automatiquement sur PyPI

---

## Partie 8 : Namespace Packages

### 8.1 Le problème

Sans namespace packages, on ne peut pas avoir deux packages avec le même préfixe :

```
# Package A : mon_entreprise.logging
# Package B : mon_entreprise.auth
# → Si A installé et B installé, que se passe-t-il ?
```

### 8.2 Solution : namespace packages

Un **namespace package** permet de répartir un même namespace (`mon_entreprise`) sur plusieurs packages distincts.

**Structure :**

Package A (`mon-entreprise-logging`) :
```
mon_entreprise/
  logging/
    __init__.py
    logger.py
```

Package B (`mon-entreprise-auth`) :
```
mon_entreprise/
  auth/
    __init__.py
    authentication.py
```

**Configuration pyproject.toml :**

```toml
# mon-entreprise-logging/pyproject.toml
[tool.setuptools.packages.find]
where = ["."]
include = ["mon_entreprise.logging*"]

[tool.setuptools.package-dir]
"" = "."

# Pas de __init__.py dans mon_entreprise/ !
```

**Règle :** Pour les namespace packages, le dossier du namespace (`mon_entreprise/`) ne doit **pas** avoir de `__init__.py`.

```bash
# Installer les deux packages
pip install mon-entreprise-logging mon-entreprise-auth

# Utilisation :
from mon_entreprise.logging import logger
from mon_entreprise.auth import authentication
```

---

## Partie 9 : Choix de licence

### 9.1 Licences principales

| Licence | Usage | Commercial | Obligations |
|---------|-------|------------|-------------|
| **MIT** | Permissive, la plus utilisée | Oui | Garder le copyright |
| **Apache 2.0** | Permissive + brevets | Oui | Garder le copyright, notifier les changements |
| **GPLv3** | Copyleft fort | Oui mais... | Doit rester open source (même les modifications) |
| **BSD** | Permissive (3 clauses) | Oui | Garder le copyright |
| **Unlicense** | Domaine public | Oui | Aucune |

```text
# LICENSE (MIT)
MIT License

Copyright (c) 2025 Alice

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

**Recommandation :** MIT pour la plupart des projets. GPL si vous voulez forcer les modifications à rester open source.

---

## Partie 10 : Checklist finale avant publication

```
[ ] pyproject.toml complet et correct
[ ] README.md rédigé et formaté (Markdown)
[ ] LICENSE choisi et présent
[ ] Version à jour (pyproject.toml + __init__.py)
[ ] Tests passent (pytest)
[ ] Type checking OK (mypy)
[ ] Code formatting OK (ruff ou black)
[ ] python -m build fonctionne
[ ] twine check dist/* (vérifie le rendu sur PyPI)
[ ] Testé sur TestPyPI avant la vraie publication
```

```bash
# Vérification finale
twine check dist/*
# → Checking dist/mon_package-0.1.0-py3-none-any.whl: PASSED
```

---

## Exercices

1. **Créer un package :** Crée la structure complète d'un package `calculatrice` avec les modules `addition`, `soustraction`, `multiplication` et une CLI avec `click` qui prend deux nombres et une opération.

2. **Publier sur TestPyPI :** Configure le `pyproject.toml` pour le package de l'exercice 1, construis-le (`python -m build`), et publie-le sur TestPyPI. Vérifie qu'on peut l'installer avec `pip install --index-url https://test.pypi.org/simple/`.

3. **Entry points :** Ajoute une commande `calculatrice` qui s'installe avec le package. La CLI doit accepter `calculatrice add 3 5` et afficher `8`.

4. **Namespace package :** Crée deux packages séparés `entreprise-utils` et `entreprise-auth` qui partagent le namespace `entreprise`. Le premier ajoute des utilitaires, le second de l'authentification. Vérifie qu'on peut importer les deux.

5. **CI/CD :** Configure une GitHub Action qui exécute les tests à chaque push, et qui publie sur PyPI quand un tag `v*` est poussé.
