# Module 29 : Environnements virtuels et gestion des dépendances

**Objectifs pédagogiques**
- Comprendre pourquoi isoler les dépendances par projet
- Maîtriser `venv` et `pip` (création, activation, gestion des paquets)
- Connaître les formats de dépendances (`requirements.txt`, `pip freeze` vs `pip-compile`)
- Découvrir les gestionnaires modernes : `pipenv` et `poetry`
- Comprendre la résolution de dépendances et les lock files
- Savoir dockeriser une application Python
- Configurer `.gitignore` correctement

---

## Partie 1 : Pourquoi un environnement virtuel ?

### 1.1 Le problème

Sans environnement virtuel, tous les paquets Python sont installés **globalement** :

```bash
# Tous les projets partagent les mêmes paquets
pip install requests
pip install django

# Projet A a besoin de Django 3.2
# Projet B a besoin de Django 5.0
# → CONFLIT ! impossible d'avoir les deux versions
```

**Résultat :** Un projet qui fonctionnait hier peut casser aujourd'hui parce qu'une mise à jour globale a changé une dépendance.

### 1.2 La solution : isolation par projet

Chaque projet a son propre **environnement virtuel** (espace isolé avec son interpréteur Python et ses paquets) :

```
Projet A/                     Projet B/
  .venv/                        .venv/
    Lib/                          Lib/
      django==3.2                   django==5.0
      requests==2.31                requests==2.28
  app.py                        app.py
```

**À retenir :** L'environnement virtuel ne fait que copier l'interpréteur Python et créer un espace de paquets isolé. Il ne contient pas Python lui-même.

---

## Partie 2 : `venv` — L'outil standard (Python 3.3+)

`venv` est intégré à Python. Pas d'installation supplémentaire.

### 2.1 Créer et activer un environnement

```bash
# Créer un environnement virtuel nommé ".venv" (convention)
python -m venv .venv

# Sous Windows : activer
.venv\Scripts\activate

# Sous macOS/Linux :
source .venv/bin/activate

# Vérifier que l'environnement est actif
# Windows : (.venv) apparaît dans le prompt
which python    # → .venv/bin/python  (Linux/macOS)
where python    # → .venv\Scripts\python.exe  (Windows)

# Désactiver
deactivate
```

**Résultat attendu après activation :**
```bash
(.venv) C:\Users\...
```

### 2.2 Gérer les paquets avec pip

```bash
# Une fois l'environnement activé :
pip install requests
pip install flask==3.0.0
pip install "pandas>=2.0,<3.0"

# Voir les paquets installés
pip list
# → Package    Version
# → flask      3.0.0
# → requests   2.31.0

# Voir les dépendances détaillées
pip show requests
# → Name: requests
# → Version: 2.31.0
# → Requires: certifi, charset, urllib3, idna

# Désinstaller
pip uninstall requests -y  # -y = pas de confirmation
```

**Piège courant :** Oublier d'activer l'environnement → on installe dans le Python global. Toujours vérifier que `(.venv)` est dans le prompt.

---

## Partie 3 : `requirements.txt` — Le fichier de dépendances

### 3.1 Structure

```
# requirements.txt
# Versions exactes (reproductibilité)
requests==2.31.0
flask==3.0.0

# Versions minimales
pytest>=7.0

# Bornes
numpy>=1.20,<2.0

# Sans contrainte (dernière version compatible)
click

# Éditable (paquet en développement local)
-e ./mon_package_local

# Package depuis GitHub
git+https://github.com/author/package.git@v1.0
```

### 3.2 pip freeze vs pip-compile

**`pip freeze`** : Liste **toutes** les dépendances installées (y compris les sous-dépendances).

```bash
# Générer requirements.txt à partir de l'environnement actif
pip freeze > requirements.txt

# Contenu typique :
# certifi==2024.1.0
# charset-normalizer==3.3.2
# click==8.1.7
# flask==3.0.0
# ...
# urllib3==2.1.0
# werkzeug==3.0.1
```

**Problème :** `pip freeze` inclut **toutes** les sous-dépendances. Ça fige tout, mais on perd l'information sur nos dépendances directes.

**`pip-compile`** (outil `pip-tools`) : Séparation entre dépendances **directes** et **complètes**.

```bash
pip install pip-tools
```

```python
# requirements.in — on écrit seulement nos dépendances directes
flask==3.0.0
requests
pytest>=7.0
```

```bash
# pip-compile génère requirements.txt avec toutes les sous-dépendances
pip-compile requirements.in
```

```
# requirements.txt (généré automatiquement)
# Ce fichier est généré par pip-compile, ne pas modifier à la main
#
# requirements.in
flask==3.0.0
    # via -r requirements.in
requests==2.31.0
    # via -r requirements.in
certifi==2024.1.0
    # via requests
charset-normalizer==3.3.2
    # via requests
click==8.1.7
    # via flask
...
```

**À retenir :**
- `requirements.in` = ce que **vous** voulez (dépendances directes)
- `requirements.txt` = ce qui est **réellement** installé (résolution complète)
- `pip freeze` = l'instantané de l'environnement actuel

### 3.3 Bonnes pratiques des requirements

```
requirements/
  base.in       → dépendances communes
  dev.in        → dépendances de développement (pytest, mypy...)
  prod.txt      → généré à partir de base.in
  dev.txt       → généré à partir de base.in + dev.in
```

```bash
pip-compile requirements/base.in       → prod.txt
pip-compile requirements/dev.in        → dev.txt
```

---

## Partie 4 : `pipenv` — Gestionnaire intégré

`pipenv` combine **venv + pip + requirements** en un seul outil.

### 4.1 Installation et usage de base

```bash
pip install pipenv

# Dans un nouveau projet
pipenv install requests     # Installe requests + crée un venv automatiquement
pipenv install --dev pytest # Dépendance de développement

# Activer l'environnement
pipenv shell

# Installer depuis le Pipfile.lock (reproductible)
pipenv install --deploy

# Voir le graphe des dépendances
pipenv graph
```

### 4.2 Fichiers générés

```
mon_projet/
  Pipfile         → Dépendances directes (équivalent de requirements.in)
  Pipfile.lock    → Dépendances complètes (équivalent de requirements.txt)
  .venv/          → Environnement virtuel
```

**Pipfile :**
```toml
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
requests = "*"             # * = n'importe quelle version
flask = ">=3.0"            # Version minimale

[dev-packages]
pytest = ">=7.0"
mypy = "*"

[requires]
python_version = "3.11"
```

**Pipfile.lock** : Fichier **généré automatiquement** qui contient les versions exactes de TOUTES les dépendances (y compris sous-dépendances) et leurs hash SHA256 pour vérifier l'intégrité.

```bash
# Installer exactement ce qui est dans le lock (reproduction)
pipenv install --deploy
```

**À retenir :** Toujours commiter `Pipfile` **ET** `Pipfile.lock` dans Git pour assurer la reproductibilité.

---

## Partie 5 : `poetry` — Gestionnaire moderne et complet

`poetry` est l'outil le plus moderne. Il gère à la fois les dépendances, l'empaquetage et la publication.

### 5.1 Installation

```bash
pip install poetry

# Créer un nouveau projet
poetry new mon_projet
# → Crée la structure :
#   mon_projet/
#     pyproject.toml
#     README.md
#     mon_projet/
#       __init__.py
#     tests/
#       __init__.py

# Ou initialiser un projet existant
poetry init
```

### 5.2 Usage quotidien

```bash
# Ajouter une dépendance
poetry add requests          # Production
poetry add --dev pytest      # Développement

# Installer depuis pyproject.toml + poetry.lock
poetry install

# Activer l'environnement
poetry shell

# Exécuter une commande dans l'environnement
poetry run python app.py

# Voir les dépendances
poetry show --tree
# → requests 2.31.0 HTTP library
# → ├── certifi >=2017.4.17
# → ├── charset-normalizer >=2,<4
# → ├── idna >=2.5,<4
# → └── urllib3 >=1.21.1,<3
```

### 5.3 pyproject.toml avec Poetry

```toml
[tool.poetry]
name = "mon-projet"
version = "0.1.0"
description = "Description de mon projet"
authors = ["Moi <moi@example.com>"]
license = "MIT"
readme = "README.md"

[tool.poetry.dependencies]
python = "^3.11"        # Compatible 3.11 à <4.0
requests = "^2.31"      # Compatible 2.31 à <3.0
flask = ">=3.0,<4.0"

[tool.poetry.group.dev.dependencies]
pytest = "^7.0"
mypy = "^1.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

**Notation des versions avec Poetry :**
- `^2.31` = >=2.31, <3.0
- `~2.31` = >=2.31, <2.40
- `>=3.0` = n'importe quelle version >= 3.0
- `*` = n'importe quelle version

### 5.4 poetry.lock

Comme `Pipfile.lock`, `poetry.lock` contient les versions exactes résolues. **Toujours commiter les deux fichiers.**

```bash
# Forcer la mise à jour du lock
poetry lock

# Installer exactement ce qui est dans le lock
poetry install --no-dev  # Production (sans dev-dependencies)
```

---

## Partie 6 : `conda` — Gestionnaire multi-langage

Conda n'est pas limité à Python. Il gère aussi les dépendances C/C++, R, etc.

### 6.1 Commandes de base

```bash
# Créer un environnement
conda create --name mon_projet python=3.11

# Activer
conda activate mon_projet

# Installer des paquets
conda install numpy pandas matplotlib

# Installer depuis conda-forge (dépôt communautaire)
conda install -c conda-forge opencv

# Lier avec pip (si le paquet n'est pas dans conda)
pip install requests

# Exporter l'environnement
conda env export > environment.yml

# Recréer l'environnement
conda env create -f environment.yml

# Désactiver
conda deactivate
```

### 6.2 environment.yml

```yaml
name: mon_projet
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.11
  - numpy>=1.24
  - pandas>=2.0
  - matplotlib>=3.7
  - pip
  - pip:
    - requests>=2.31      # Paquet pip dans environnement conda
    - flask>=3.0
```

**Quand utiliser conda ?**
- Projets scientifiques avec des dépendances complexes (C/C++, CUDA)
- Data Science / Machine Learning (numpy, scipy, tensorflow)
- Équipes qui mélangent plusieurs langages

---

## Partie 7 : Résolution de dépendances et lock files

### 7.1 Le problème de la résolution

```
Appli demande :            requests>=2.0, pandas>=1.0
requests 2.31 demande :    urllib3>=1.21.1,<3
pandas 1.5 demande :       numpy>=1.20
urllib3 2.1 demande :      ...
```

Le résolveur doit trouver des versions de TOUS les paquets qui satisfont **toutes les contraintes simultanément**. C'est un problème NP-difficile !

### 7.2 Lock file = solution

Le **lock file** (`Pipfile.lock`, `poetry.lock`) enregistre la solution trouvée pour garantir la reproductibilité :

```bash
# Sans lock : pip résout à nouveau → version potentiellement différente
pip install -r requirements.in

# Avec lock : versions exactes garanties
pip install -r requirements.txt
pipenv install --deploy
poetry install
```

**Règle d'or :** Toujours utiliser un gestionnaire qui produit un **lock file** pour la production.

---

## Partie 8 : Dockerisation d'une application Python

Docker permet d'encapsuler l'application + ses dépendances dans une image portable.

### 8.1 Dockerfile avec Poetry

```dockerfile
# Dockerfile — Utilise Poetry pour les dépendances
FROM python:3.11-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY pyproject.toml poetry.lock ./

# Installer les dépendances
RUN pip install poetry \
    && poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

# Copier le code source
COPY . .

# Commande par défaut
CMD ["python", "app.py"]
```

### 8.2 Dockerfile avec requirements.txt

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copier d'abord les dépendances (pour le cache Docker)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du code
COPY . .

CMD ["python", "app.py"]
```

### 8.3 .dockerignore

```dockerignore
.venv/
__pycache__/
*.pyc
.git/
.gitignore
.vscode/
tests/
*.md
.env
```

**À retenir :** `WORKDIR /app` + Docker = pas besoin d'environnement virtuel ! L'isolation est fournie par Docker.

---

## Partie 9 : `.gitignore` pour projets Python

### 9.1 Fichier minimal

```
# Environnement virtuel
.venv/
venv/
env/
ENV/

# Caches Python
__pycache__/
*.pyc
*.pyo

# Fichiers de dépendances (générés automatiquement)
*.egg-info/
dist/
build/

# IDE
.vscode/
.idea/

# Environnement
.env

# OS
.DS_Store    # macOS
Thumbs.db    # Windows
```

### 9.2 Avec Poetry/Pipenv

```
# En plus du .gitignore de base :
Pipfile.lock       # ❌ NON : on commit le lock !
poetry.lock         # ❌ NON : on commit le lock !
```

**Règle :** On commit **toujours** le lock file. On ne commit **jamais** le dossier `.venv/`.

---

## Partie 10 : Tableau comparatif

| Outil | Création venv | Lock file | Build/Publish | Complexité |
|-------|---------------|-----------|---------------|------------|
| `venv` + `pip` | Manuelle | Non (freeze) | Non | Faible |
| `pipenv` | Automatique | Pipfile.lock | Non | Moyenne |
| `Poetry` | Automatique | poetry.lock | Oui | Moyenne |
| `Conda` | Via `conda create` | environment.yml | Non | Élevée |

**Recommandation :**
- **Projet simple :** `venv` + `pip` + `requirements.txt`
- **Projet moderne :** `Poetry` (tout-en-un)
- **Data Science :** `Conda`

---

## Exercices

1. **Créer un environnement :** Crée un projet avec `venv`, active-le, installe `requests` et `flask`, génère le `requirements.txt` avec `pip freeze`.

2. **Migration vers Poetry :** Initialise Poetry dans un projet existant avec `requirements.txt`. Convertit les dépendances en `pyproject.toml` et vérifie que tout s'installe.

3. **Dockeriser une app Flask :** Crée un `Dockerfile` pour une application Flask simple. Utilise une image `python:3.11-slim`, installe les dépendances, et expose le port 5000.

4. **Résolution de conflits :** Simule une situation où deux paquets demandent des versions incompatibles d'une même sous-dépendance. Utilise `pipdeptree` pour diagnostiquer le conflit.

5. **Environnement conda :** Crée un environnement conda avec Python 3.11, numpy, pandas et matplotlib. Exporte-le en `environment.yml`.
