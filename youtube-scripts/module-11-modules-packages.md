# Vidéo #11 — Modules et packages

## Informations générales
- **Titre** : Python #11 — Modules et packages (Formation Complète)
- **Durée** : ~13 min
- **Miniature** : `banners/11-modules-packages.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 11 — MODULES & PACKAGES

> "Bienvenue dans le module 11. Quand votre projet grandit, tout mettre dans un seul fichier devient vite ingérable. Les modules et packages sont la solution de Python pour organiser, réutiliser et partager du code."

---

### 0:30 — Qu'est-ce qu'un module ? (1 min)
**Texte écran :** QU'EST-CE QU'UN MODULE ?

> "Un module, c'est simplement un fichier `.py`. Chaque fichier Python que vous créez est déjà un module potentiel. Le nom du module, c'est le nom du fichier sans l'extension."

```python
# mon_module.py
pi = 3.14159

def saluer(nom):
    return f"Bonjour {nom}"

class Cercle:
    def __init__(self, rayon):
        self.rayon = rayon
```

> "Ce fichier `mon_module.py` peut être importé depuis un autre script."

---

### 1:30 — import : les différentes syntaxes (2 min)
**Texte écran :** TROIS SYNTAXES D'IMPORT

```python
# 1. Import du module entier
import math
print(math.sqrt(16))  # 4.0

# 2. Import spécifique
from math import sqrt, pi
print(sqrt(16))       # 4.0
print(pi)             # 3.14159...

# 3. Import avec alias
import math as m
print(m.sqrt(16))     # 4.0
```

> "La première préserve l'espace de nommage — on écrit `math.sqrt()`. La deuxième est plus courte mais peut créer des conflits. La troisième est pratique pour les noms longs."

```python
# Conflit à éviter
from math import sqrt

def sqrt(x):
    return x * x  # Écrase math.sqrt !

print(sqrt(4))  # 16, pas 2
```

---

### 3:30 — Créer son propre module (2 min)
**Texte écran :** CRÉER UN MODULE

```python
# utils.py
def addition(a, b):
    return a + b

def multiplication(a, b):
    return a * b

VERSION = "1.0"
```

```python
# main.py
import utils

print(utils.addition(3, 4))        # 7
print(utils.multiplication(3, 4))  # 12
print(utils.VERSION)               # 1.0
```

> "Il suffit que les deux fichiers soient dans le même dossier. Python trouve automatiquement les modules voisins."

---

### 5:30 — Créer un package (2 min)
**Texte écran :** CRÉER UN PACKAGE

> "Un package, c'est un dossier qui contient un fichier spécial `__init__.py` et d'autres modules."

```
mon_package/
├── __init__.py
├── maths.py
└── strings.py
```

```python
# __init__.py
print("Package chargé !")
```

```python
# maths.py
def factorielle(n):
    if n <= 1:
        return 1
    return n * factorielle(n - 1)
```

```python
# strings.py
def inverser(s):
    return s[::-1]
```

```python
# main.py
from mon_package import maths, strings

print(maths.factorielle(5))   # 120
print(strings.inverser("abc"))  # cba
```

> "Depuis Python 3.3, `__init__.py` n'est plus obligatoire, mais c'est une excellente pratique de le garder."

---

### 7:30 — Import absolu vs relatif (1 min 30)
**Texte écran :** IMPORT ABSOLU VS RELATIF

```
mon_projet/
├── main.py
└── services/
    ├── __init__.py
    ├── utilisateur.py
    └── admin.py
```

```python
# services/admin.py

# Import absolu (recommandé)
from services.utilisateur import creer_compte

# Import relatif (moins lisible)
from .utilisateur import creer_compte
from ..autre_module import quelque_chose
```

> "Les imports absolus sont recommandés par la PEP 8. Les imports relatifs, avec des points, sont utiles dans les packages profonds mais moins lisibles."

---

### 9:00 — if __name__ == "__main__" (2 min)
**Texte écran :** if __name__ == "__main__"

```python
# calculs.py
def carre(x):
    return x ** 2

def cube(x):
    return x ** 3

if __name__ == "__main__":
    # Ce code ne s'exécute que si on lance CE fichier
    print("Test des fonctions :")
    print(f"5² = {carre(5)}")
    print(f"5³ = {cube(5)}")
```

```python
# main.py
import calculs  # Le test ne s'exécute PAS
print(calculs.carre(3))  # 9
```

> "La variable `__name__` vaut `"__main__"` quand le fichier est exécuté directement. Quand il est importé, elle vaut le nom du module. C'est le standard pour écrire du code qui sert à la fois de module et de script."

---

### 11:00 — PYTHONPATH et sys.path (1 min 30)
**Texte écran :** PYTHONPATH & sys.path

```python
import sys

# Où Python cherche-t-il les modules ?
print(sys.path)
# ['', '/usr/lib/python3.11', ...]
```

> "Python cherche dans `sys.path`. Le premier élément est le dossier courant. Pour ajouter un chemin :"

```python
import sys
sys.path.append("/chemin/vers/mes/modules")
import mon_module  # Maintenant trouvable

# Variable d'environnement PYTHONPATH
# export PYTHONPATH="/chemin/vers/modules:$PYTHONPATH"
```

> "En pratique, on utilise plutôt les environnements virtuels et `pip install -e .` que la manipulation directe de `sys.path`."

---

### 12:30 — Conclusion
> "Module 12 : la lecture et l'écriture de fichiers — CSV, JSON, et tout ce qu'il faut savoir."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 11 : Modules et packages

Au programme :
00:00 — Introduction
00:30 — Qu'est-ce qu'un module ?
01:30 — import : les différentes syntaxes
03:30 — Créer son propre module
05:30 — Créer un package
07:30 — Import absolu vs relatif
09:00 — if __name__ == "__main__"
11:00 — PYTHONPATH et sys.path
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

#python #formationpython #modules #packages #import #pythonmodules
```

## Tags YouTube
```
python, formation python, apprendre python, cours python, python débutant, programmation python, python complet, python de a à z, python 2026, tutoriel python, modules python, packages python, import python, if __name__ == "__main__", sys.path
```
