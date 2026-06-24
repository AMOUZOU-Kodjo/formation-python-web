# Vidéo #16 — Itérateurs et générateurs

## Informations générales
- **Titre** : Python #16 — Itérateurs et générateurs (Formation Complète)
- **Durée** : ~14 min
- **Miniature** : `banners/16-itérateurs-et-générateurs.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 16 — ITÉRATEURS & GÉNÉRATEURS

> "Bienvenue dans le module 16. On va voir comment parcourir des séquences efficacement avec les itérateurs, et comment produire des valeurs à la volée avec les générateurs. Ces outils sont au cœur de boucles `for` et du traitement de flux en Python."

---

### 0:30 — Itérateurs : `__iter__` et `__next__` (3 min)
**Texte écran :** PROTOCOLE D'ITÉRATION

> "Un itérateur est un objet qui implémente deux méthodes : `__iter__` et `__next__`. `__iter__` renvoie l'itérateur lui-même, `__next__` renvoie l'élément suivant ou lève `StopIteration`."

```python
class Compteur:
    def __init__(self, max):
        self.max = max
        self.n = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.n >= self.max:
            raise StopIteration
        self.n += 1
        return self.n

for x in Compteur(5):
    print(x)  # 1 2 3 4 5
```

> "Tout objet qui définit `__iter__` et `__next__` est utilisable dans une boucle `for`."

---

### 3:30 — `for` utilise implicitement des itérateurs (2 min)
**Texte écran :** FOR UTILISE DES ITÉRATEURS

> "Quand on écrit `for x in chose`, Python appelle `iter(chose)` pour obtenir un itérateur, puis `next()` à chaque tour jusqu'à `StopIteration`."

```python
# Ce qu'il se passe sous le capot
ma_liste = [10, 20, 30]
it = iter(ma_liste)
print(next(it))  # 10
print(next(it))  # 20
print(next(it))  # 30
# print(next(it))  # StopIteration
```

> "C'est exactement ce que fait la boucle `for` automatiquement, mais avec une gestion élégante de la fin."

---

### 5:30 — Générer des séquences avec `yield` (2 min)
**Texte écran :** GÉNÉRATEURS AVEC YIELD

> "Un générateur est une fonction qui utilise `yield` au lieu de `return`. À chaque `yield`, la fonction se met en pause et reprend plus tard."

```python
def compter(max):
    n = 1
    while n <= max:
        yield n
        n += 1

gen = compter(3)
print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3
```

> "Contrairement à `return` qui termine la fonction, `yield` la suspend et conserve son état."

---

### 7:30 — `yield` vs `return` (1 min 30)
**Texte écran :** YIELD VS RETURN

```python
# return : tout d'un coup
def carres_return(n):
    return [x**2 for x in range(n)]

# yield : un par un
def carres_yield(n):
    for x in range(n):
        yield x**2

print(carres_return(5))     # [0, 1, 4, 9, 16]
print(list(carres_yield(5)))  # [0, 1, 4, 9, 16]
```

> "Avec `yield`, les valeurs sont produites à la demande, sans stocker toute la liste en mémoire."

---

### 9:00 — Générer des suites infinies (1 min 30)
**Texte écran :** SUITES INFINIES

```python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
for _ in range(10):
    print(next(fib))  # 0 1 1 2 3 5 8 13 21 34
```

> "Avec `yield`, on peut représenter des suites infinies sans saturer la mémoire. On ne calcule que ce qu'on consomme."

---

### 10:30 — Pipe | et lecture de fichiers volumineux (1 min 30)
**Texte écran :** FICHIERS VOLUMINEUX

```python
def lire_grosses_lignes(fichier):
    with open(fichier, "r", encoding="utf-8") as f:
        for ligne in f:
            yield ligne.strip()

# Traitement ligne par ligne, mémoire constante
for ligne in lire_grosses_lignes("énorme_fichier.log"):
    if "ERREUR" in ligne:
        print(ligne)
```

> "Idéal pour les logs ou CSV géants. Aucune limite de taille puisque chaque ligne est lue une par une."

---

### 12:00 — `itertools` : count, cycle, chain, groupby (2 min)
**Texte écran :** ITERTOOLS

```python
from itertools import count, cycle, chain, groupby

# count : compteur infini
for x in count(10, 2):
    if x > 20:
        break
    print(x)  # 10 12 14 16 18 20

# cycle : répète à l'infini
colors = cycle(["rouge", "vert", "bleu"])
for _ in range(5):
    print(next(colors))  # rouge vert bleu rouge vert

# chain : enchaîne des itérables
print(list(chain([1, 2], "abc")))  # [1, 2, 'a', 'b', 'c']

# groupby : groupe des éléments consécutifs
data = [("A", 1), ("A", 2), ("B", 3)]
for cle, groupe in groupby(data, key=lambda x: x[0]):
    print(cle, list(groupe))
```

> "`itertools` est une boîte à outils géniale pour travailler avec les itérateurs de façon expressive et performante."

---

### 14:00 — Conclusion
> "Module 17 : on aborde les décorateurs, l'un des concepts les plus élégants de Python."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 16 : Itérateurs et générateurs

Au programme :
00:00 — Introduction
00:30 — Itérateurs : __iter__ et __next__
03:30 — for utilise implicitement des itérateurs
05:30 — Générer des séquences avec yield
07:30 — yield vs return
09:00 — Suites infinies
10:30 — Lecture de fichiers volumineux
12:00 — itertools : count, cycle, chain, groupby
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

#python #formationpython #iterateurs #generateurs #yield #itertools
```

## Tags YouTube
```
python, formation python, iterateurs python, generateurs python, yield python, itertools python, iter next python, protocole d iteration python, python avancé, apprendre python, cours python
```
