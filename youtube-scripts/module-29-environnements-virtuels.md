# Vidéo #29 — Environnements virtuels

## Informations générales
- **Titre** : Python #29 — Environnements virtuels (Formation Complète)
- **Durée** : ~13 min
- **Miniature** : `banners/29-environnements-virtuels.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 29 — ENVIRONNEMENTS VIRTUELS

> "Quand vous travaillez sur plusieurs projets Python, impossible de partager les mêmes dépendances. Chaque projet doit avoir son environnement isolé. C'est là que `venv`, `pipenv`, `poetry` et `conda` entrent en jeu."

---

### 0:30 — Pourquoi isoler ? (1 min 30)
**Texte écran :** POURQUOI ISOLER SES PROJETS ?

> "Imaginez : le projet A utilise Django 4.2, le projet B utilise Django 5.0. Sans environnement virtuel, les versions entrent en conflit."

**Problèmes sans isolation :**
- Versions incompatibles entre projets
- Impossible de reproduire exactement un environnement
- Conflits avec les paquets système

> "L'environnement virtuel crée un dossier isolé avec son propre Python et ses propres paquets."

---

### 2:00 — venv (2 min)
**Texte écran :** CRÉER UN ENVIRONNEMENT AVEC venv

> "`venv` est inclus dans Python 3.3+. Pas besoin d'installer quoi que ce soit."

```bash
# Créer l'environnement
python -m venv .venv

# Activer (Windows)
.venv\Scripts\activate

# Activer (macOS/Linux)
source .venv/bin/activate
```

> "Votre terminal affiche `(.venv)` devant le prompt. Ça signifie que l'environnement est actif."

```bash
# Désactiver
deactivate

# Supprimer (il suffit de supprimer le dossier)
rm -rf .venv
```

---

### 4:00 — pip : installer et gérer les paquets (2 min)
**Texte écran :** GÉRER LES PAQUETS AVEC pip

```bash
# Installer
pip install requests
pip install django==4.2
pip install "fastapi>=0.100,<1.0"

# Lister
pip list

# Chercher les infos
pip show requests

# Désinstaller
pip uninstall requests
```

> "`pip list` affiche tous les paquets installés dans l'environnement actif. Utilisez `pip show` pour voir la version, les dépendances et la licence."

---

### 6:00 — requirements.txt (1 min 30)
**Texte écran :** requirements.txt

```bash
# Générer le fichier
pip freeze > requirements.txt
```

**Contenu de requirements.txt :**
```
django==4.2
fastapi==0.104.1
requests==2.31.0
uvicorn==0.24.0
```

```bash
# Installer tout d'un coup
pip install -r requirements.txt
```

> "`pip freeze` liste tous les paquets avec leur version exacte. Le fichier `requirements.txt` se partage dans le dépôt Git pour que tout le monde ait les mêmes versions."

---

### 7:30 — pipenv (1 min 30)
**Texte écran :** PIPENV

> "`pipenv` combine pip et venv en une seule commande, avec un vrai fichier de verrouillage."

```bash
# Installation
pip install pipenv

# Installer un paquet
pipenv install requests

# Créer le Pipfile.lock (verrouillage)
pipenv lock

# Activer l'environnement
pipenv shell
```

> "`Pipfile` remplace `requirements.txt`. `Pipfile.lock` fige les versions exactes comme `package-lock.json` en JavaScript."

---

### 9:00 — Poetry (1 min 30)
**Texte écran :** POETRY

> "Poetry est la solution moderne et complète : gestion des dépendances + packaging."

```bash
# Installer
pip install poetry

# Nouveau projet
poetry new mon_projet

# Ajouter une dépendance
poetry add fastapi

# Installer depuis pyproject.toml
poetry install

# Activer l'environnement virtuel
poetry shell
```

> "Poetry crée automatiquement un `pyproject.toml` et gère le verrouillage des versions. C'est aujourd'hui l'outil recommandé pour les nouveaux projets."

---

### 10:30 — Conda (1 min 30)
**Texte écran :** CONDA (DATA SCIENCE)

> "Conda vient avec la distribution Anaconda. Très utilisé en data science car il gère aussi les paquets non-Python (C, CUDA, R...)."

```bash
# Créer un environnement
conda create -n projet_data python=3.11

# Activer
conda activate projet_data

# Installer
conda install numpy pandas matplotlib

# Désactiver
conda deactivate
```

> "Contrairement à pip, Conda gère les binaires systèmes. C'est indispensable si vous utilisez des bibliothèques comme TensorFlow ou PyTorch."

---

### 12:00 — Bonnes pratiques (1 min)
**Texte écran :** BONNES PRATIQUES

**Fichier `.gitignore` :**
```
.venv/
*.pyc
__pycache__/
```

**Recommandations :**
- Toujours utiliser un `.venv` par projet
- Committer `requirements.txt` ou `pyproject.toml`
- Ne jamais committer le dossier `.venv`
- Utiliser Poetry pour les nouveaux projets
- Préférer Conda si vous faites de la data science

---

### 13:00 — Conclusion
> "Module 30 : on va voir comment empaqueter et distribuer vos propres modules Python."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 29 : Environnements virtuels

Au programme :
00:00 — Introduction
00:30 — Pourquoi isoler ses projets ?
02:00 — Créer un environnement avec venv
04:00 — pip : installer et gérer les paquets
06:00 — requirements.txt
07:30 — pipenv
09:00 — Poetry
10:30 — Conda (data science)
12:00 — Bonnes pratiques
13:00 — Prochain module

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

#python #formationpython #environnementvirtuel #venv #pip #poetry #conda
```

## Tags YouTube
```
python, formation python, environnement virtuel python, venv python, pip python, poetry python, conda python, requirements.txt, apprendre python, cours python, programmation python, python débutant
```
