# Vidéo #9 — Compréhensions

## Informations générales
- **Titre** : Python #9 — Compréhensions (listes, dicts, sets) (Formation Complète)
- **Durée** : ~13 min
- **Miniature** : `banners/09-compréhensions.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 9 — COMPRÉHENSIONS

> "Bienvenue dans le module 9. Les compréhensions sont une syntaxe concise pour créer des listes, dictionnaires et ensembles en une ligne. Moins de code, plus de lisibilité — quand elles sont bien utilisées."

---

### 0:30 — List comprehension : syntaxe de base (2 min)
**Texte écran :** LIST COMPREHENSION

```python
# Syntaxe : [expression for element in iterable]

# Boucle classique
carres = []
for x in range(10):
    carres.append(x**2)

# Compréhension
carres = [x**2 for x in range(10)]
print(carres)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Autres exemples
nombres = [1, 2, 3, 4, 5]
doubles = [n * 2 for n in nombres]
print(doubles)  # [2, 4, 6, 8, 10]

mots = ["python", "java", "rust"]
majuscules = [m.upper() for m in mots]
print(majuscules)  # ["PYTHON", "JAVA", "RUST"]
```

> "On écrit ce qu'on veut produire à gauche, la boucle à droite. Python construit la liste automatiquement."

---

### 2:30 — Avec filtre (1 min 30)
**Texte écran :** FILTRES AVEC IF

```python
# Syntaxe : [expression for element in iterable if condition]

# Nombres pairs
pairs = [x for x in range(20) if x % 2 == 0]
print(pairs)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Mots de plus de 5 lettres
mots = ["python", "java", "javascript", "rust", "typescript"]
longs = [m for m in mots if len(m) > 5]
print(longs)  # ["python", "javascript", "typescript"]

# if-else dans l'expression
etiquettes = ["pair" if x % 2 == 0 else "impair" for x in range(5)]
print(etiquettes)  # ["pair", "impair", "pair", "impair", "pair"]
```

> "Le `if` filtrant se met à droite. Le `if/else` fait partie de l'expression à gauche."

---

### 4:00 — Dict comprehension (1 min 30)
**Texte écran :** DICT COMPREHENSION

```python
# Syntaxe : {cle: valeur for element in iterable}

# Carrés
carres = {x: x**2 for x in range(6)}
print(carres)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Filtrer un dictionnaire
notes = {"Alice": 16, "Bob": 12, "Charlie": 18, "David": 8}
bons = {nom: note for nom, note in notes.items() if note >= 14}
print(bons)  # {"Alice": 16, "Charlie": 18}

# Transformer les valeurs
notes_sur_20 = {nom: note for nom, note in notes.items()}
notes_sur_100 = {nom: note * 5 for nom, note in notes.items()}
```

---

### 5:30 — Set comprehension (1 min)
**Texte écran :** SET COMPREHENSION

```python
# Syntaxe : {expression for element in iterable}

# Doublons automatiquement supprimés
liste = [1, 2, 2, 3, 3, 3, 4, 5, 5]
uniques = {x for x in liste}
print(uniques)  # {1, 2, 3, 4, 5}

# Nombres pairs dans un set
pairs_set = {x for x in range(10) if x % 2 == 0}
print(pairs_set)  # {0, 2, 4, 6, 8}

# Longueur des mots
mots = ["python", "java", "rust"]
longueurs = {len(m) for m in mots}
print(longueurs)  # {4, 5, 6}
```

> "Le set comprehension utilise des accolades comme le dict comprehension, mais sans les `:`."

---

### 6:30 — Compréhensions imbriquées (1 min 30)
**Texte écran :** COMPRÉHENSIONS IMBRIQUÉES

```python
# Double boucle
paires = [(x, y) for x in range(3) for y in range(3)]
print(paires)
# [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]

# Aplatir une matrice
matrice = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
plat = [e for ligne in matrice for e in ligne]
print(plat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Table de multiplication
table = [f"{i}×{j}={i*j}" for i in range(1, 4) for j in range(1, 4)]
print(table)
# ["1×1=1", "1×2=2", "1×3=3", "2×1=2", "2×2=4", "2×3=6", "3×1=3", "3×2=6", "3×3=9"]
```

> "L'ordre des `for` est le même que dans une boucle imbriquée classique. On lit de gauche à droite."

---

### 8:00 — Performances vs boucles classiques (1 min 30)
**Texte écran :** PERFORMANCES

```python
import timeit

# Boucle classique
def avec_boucle():
    resultat = []
    for i in range(1000):
        resultat.append(i ** 2)
    return resultat

# Compréhension
def avec_comprehension():
    return [i ** 2 for i in range(1000)]

# Les compréhensions sont ~20-30% plus rapides
# car elles évitent les .append() répétés
```

> "La compréhension est plus rapide qu'une boucle avec `append()`. Son exécution est optimisée en C sous le capot."

---

### 9:30 — Lire plutôt qu'écrire des comprehensions complexes (1 min 30)
**Texte écran :** LISIBILITÉ AVANT TOUT

```python
# ❌ Trop complexe — à éviter
resultat = [
    (x, y, z)
    for x in range(10)
    for y in range(10)
    if x % 2 == 0
    for z in range(5)
    if x + y + z > 10
]

# ✅ Mieux : décomposer en étapes
pairs = [x for x in range(10) if x % 2 == 0]
combinaisons = [
    (x, y, z)
    for x in pairs
    for y in range(10)
    for z in range(5)
    if x + y + z > 10
]
```

**Règle d'or :**
- Si une compréhension dépasse 1 ligne, décompose-la
- Jamais plus de 2 `for` dans une compréhension
- Toujours se demander : est-ce plus lisible qu'une boucle ?

---

### 11:00 — Généralisation aux générateurs (aperçu) (1 min 30)
**Texte écran :** EXPRESSION GÉNÉRATRICE

```python
# Comprehension → liste en mémoire
carres_liste = [x**2 for x in range(1000000)]
# Prend ~32 Mo en mémoire

# Expression génératrice → paresseux
carres_gen = (x**2 for x in range(1000000))
# Ne prend presque rien en mémoire

for val in carres_gen:
    if val > 100:
        break
    print(val)

# Conversion possible
liste = list(carres_gen)  # attention à la mémoire
```

> "Les expressions génératrices utilisent `()` au lieu de `[]`. Elles ne stockent pas tout en mémoire, elles produisent les valeurs à la demande. On verra ça en détail au module 16."

---

### 12:30 — Conclusion (30s)
> "Module 10 : on aborde la gestion des erreurs et des exceptions avec try/except."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 9 : Compréhensions

Au programme :
00:00 — Introduction
00:30 — List comprehension : syntaxe de base
02:30 — Avec filtre (if)
04:00 — Dict comprehension
05:30 — Set comprehension
06:30 — Compréhensions imbriquées
08:00 — Performances vs boucles classiques
09:30 — Lire plutôt qu'écrire des comprehensions complexes
11:00 — Expressions génératrices (aperçu)
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

#python #formationpython #comprehensions #listcomprehension #pythonic
```

## Tags YouTube
```
python, formation python, list comprehension python, dict comprehension, set comprehension, python avancé, apprendre python, cours python, python débutant, programmation python, générateurs python, python performance
```
