# Vidéo #19 — Bibliothèque standard

## Informations générales
- **Titre** : Python #19 — Bibliothèque standard (Formation Complète)
- **Durée** : ~14 min
- **Miniature** : `banners/19-bibliothèque-standard.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 19 — BIBLIOTHÈQUE STANDARD

> "Python est livré avec une bibliothèque standard immense : plus de 200 modules prêts à l'emploi. Inutile de tout connaître, mais savoir ce qui existe vous fera gagner un temps fou. On va voir les modules les plus utiles."

---

### 0:30 — `math` (2 min)
**Texte écran :** MATH

```python
import math

# Constantes
print(math.pi)       # 3.141592653589793
print(math.inf)      # inf
print(math.nan)      # nan

# Fonctions trigonométriques
print(math.sin(math.pi / 2))  # 1.0
print(math.cos(0))            # 1.0

# Arrondis et racine
print(math.sqrt(25))   # 5.0
print(math.ceil(3.2))  # 4
print(math.floor(3.9)) # 3
print(math.factorial(5))  # 120

# Log et exponentielle
print(math.log(100, 10))  # 2.0
print(math.exp(2))        # 7.389...
```

> "`math` contient toutes les fonctions mathématiques classiques ainsi que les constantes."

---

### 2:30 — `random` (2 min)
**Texte écran :** RANDOM

```python
import random

# Nombre aléatoire
print(random.random())         # 0.0 à 1.0
print(random.randint(1, 6))    # Entier entre 1 et 6
print(random.uniform(0, 10))   # Float entre 0 et 10

# Choix aléatoire dans une liste
couleurs = ["rouge", "vert", "bleu"]
print(random.choice(couleurs))            # Un élément
print(random.choices(couleurs, k=2))      # Avec remise
print(random.sample(couleurs, k=2))       # Sans remise

# Mélanger une liste
cartes = list(range(52))
random.shuffle(cartes)
print(cartes[:5])
```

> "`random` sert pour les jeux, les simulations, les tirages au sort. Utilisez `sample` plutôt que `choice` pour des sélections sans remise."

---

### 4:30 — `datetime` (2 min 30)
**Texte écran :** DATETIME

```python
from datetime import date, time, datetime, timedelta

# Dates et moments
auj = date.today()
maintenant = datetime.now()

print(auj)               # 2026-06-24
print(maintenant)        # 2026-06-24 14:30:00

# Créer une date
naissance = date(2000, 5, 15)
print(naissance.year)    # 2000

# Durée
age = auj - naissance
print(age.days)          # Nombre de jours vécus

# timedelta
dans_7_jours = auj + timedelta(days=7)
print(dans_7_jours)      # 2026-07-01

# Formatage
print(maintenant.strftime("%d/%m/%Y %H:%M"))
# 24/06/2026 14:30
```

> "`datetime` gère dates, heures, et durées. `strftime` sert à formater l'affichage."

---

### 7:00 — `os` et `sys` (2 min)
**Texte écran :** OS & SYS

```python
import os
import sys

# OS : Système de fichiers
print(os.getcwd())             # Dossier courant
os.listdir(".")                # Lister les fichiers
os.makedirs("dossier/test", exist_ok=True)

# Variables d'environnement
print(os.getenv("USERNAME"))

# Chemin
print(os.path.join("a", "b", "c"))  # a\b\c
print(os.path.exists("fichier.txt"))

# SYS : Arguments ligne de commande
# python script.py arg1 arg2
print(sys.argv)       # ['script.py', 'arg1', 'arg2']

# Version Python
print(sys.version)    # 3.13.x
```

> "`os` pour interagir avec le système d'exploitation, `sys` pour les paramètres du programme et de l'interpréteur."

---

### 9:00 — `json` (2 min)
**Texte écran :** JSON

```python
import json

# Python → JSON
donnees = {
    "nom": "Alice",
    "age": 25,
    "langues": ["fr", "en"]
}

# Sérialiser
json_str = json.dumps(donnees, indent=2)
print(json_str)
# {
#   "nom": "Alice",
#   "age": 25,
#   "langues": ["fr", "en"]
# }

# Écrire dans un fichier
with open("data.json", "w") as f:
    json.dump(donnees, f, indent=2)

# Lire depuis un fichier
with open("data.json", "r") as f:
    charge = json.load(f)
print(charge["nom"])  # Alice
```

> "`json.dumps` vers une chaîne, `json.dump` vers un fichier. Pareil pour `load` / `loads`."

---

### 11:00 — `collections` (2 min)
**Texte écran :** COLLECTIONS

```python
from collections import deque, Counter, defaultdict, namedtuple

# deque : file d'attente performante
file = deque(["a", "b", "c"])
file.append("d")
file.popleft()      # 'a'
print(file)         # deque(['b', 'c', 'd'])

# Counter : compter des éléments
texte = "mississippi"
compteur = Counter(texte)
print(compteur)     # Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})

# defaultdict : dictionnaire avec valeur par défaut
notes = defaultdict(list)
notes["maths"].append(15)  # Pas d'erreur si clé absente

# namedtuple : tuple avec champs nommés
Point = namedtuple("Point", ["x", "y"])
p = Point(10, 20)
print(p.x, p.y)     # 10 20
```

> "`collections` étend les types de base avec des structures plus expressives et plus performantes."

---

### 13:00 — `itertools` et `functools` (aperçu) (1 min)
**Texte écran :** ITERTOOLS & FUNCTOOLS

```python
from itertools import accumulate, product
from functools import reduce

# accumulate : somme cumulée
print(list(accumulate([1, 2, 3, 4])))  # [1, 3, 6, 10]

# product : produit cartésien
print(list(product([1, 2], ["a", "b"])))
# [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]

# reduce : accumulation
somme = reduce(lambda a, b: a + b, [1, 2, 3, 4])
print(somme)  # 10
```

> "On reverra `itertools` et `functools` en détail dans le module 21 sur la programmation fonctionnelle."

---

### 14:00 — Conclusion
> "Module 20 : les expressions régulières — un outil puissant pour chercher et manipuler du texte."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 19 : Bibliothèque standard

Au programme :
00:00 — Introduction
00:30 — math : sqrt, sin, pi, inf, nan
02:30 — random : randint, choice, shuffle, sample
04:30 — datetime : date, time, datetime, timedelta
07:00 — os et sys : système et ligne de commande
09:00 — json : dump, load, dumps, loads
11:00 — collections : deque, Counter, defaultdict, namedtuple
13:00 — itertools et functools (aperçu)
14:00 — Prochain module

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

#python #formationpython #bibliothequestandard #math #random #datetime #json #collections
```

## Tags YouTube
```
python, formation python, bibliotheque standard python, math python, random python, datetime python, os python, sys python, json python, collections python, itertools python, functools python, apprendre python, cours python
```
