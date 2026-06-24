# Vidéo #21 — Programmation fonctionnelle

## Informations générales
- **Titre** : Python #21 — Programmation fonctionnelle (Formation Complète)
- **Durée** : ~13 min
- **Miniature** : `banners/21-programmation-fonctionnelle.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 21 — PROGRAMMATION FONCTIONNELLE

> "La programmation fonctionnelle est un paradigme basé sur l'application de fonctions sans effet de bord. Python n'est pas un langage purement fonctionnel, mais il embarque des outils puissants comme `map`, `filter`, `reduce` et `lambda`."

---

### 0:30 — `map` : appliquer une fonction à chaque élément (2 min)
**Texte écran :** MAP

> "`map` applique une fonction à chaque élément d'un itérable et retourne un itérateur."

```python
nombres = [1, 2, 3, 4, 5]

def au_carre(x):
    return x ** 2

carres = map(au_carre, nombres)
print(list(carres))  # [1, 4, 9, 16, 25]

# Version courte avec lambda
carres = map(lambda x: x ** 2, nombres)
print(list(carres))  # [1, 4, 9, 16, 25]
```

**Comparaison impératif vs fonctionnel :**
```python
# Impératif
carres = []
for x in nombres:
    carres.append(x ** 2)

# Fonctionnel
carres = list(map(lambda x: x ** 2, nombres))
```

> "`map` est plus concis et évite les boucles explicites."

---

### 2:30 — `filter` : filtrer une séquence (1 min 30)
**Texte écran :** FILTER

```python
nombres = [1, 2, 3, 4, 5, 6]

pairs = filter(lambda x: x % 2 == 0, nombres)
print(list(pairs))  # [2, 4, 6]

# Équivalent impératif
pairs = [x for x in nombres if x % 2 == 0]
```

> "`filter` conserve les éléments pour lesquels la fonction retourne `True`. La compréhension de liste est parfois plus lisible."

---

### 4:00 — `reduce` : accumulation (`functools.reduce`) (2 min)
**Texte écran :** REDUCE

```python
from functools import reduce

nombres = [1, 2, 3, 4, 5]

somme = reduce(lambda a, b: a + b, nombres)
print(somme)  # 15

produit = reduce(lambda a, b: a * b, nombres)
print(produit)  # 120

# Avec valeur initiale
somme = reduce(lambda a, b: a + b, nombres, 100)
print(somme)  # 115
```

> "`reduce` prend une fonction à deux arguments et l'applique cumulativement. C'est l'équivalent fonctionnel d'une boucle d'accumulation."

**Décomposition de l'exécution :**
```
reduce(+, [1, 2, 3, 4, 5])
→ ((1 + 2) + 3) + 4) + 5 = 15
```

---

### 6:00 — `lambda` : fonctions anonymes (1 min 30)
**Texte écran :** LAMBDA

> "`lambda` crée une fonction sans nom en une seule expression. Utile pour les fonctions courtes jetables."

```python
# Syntaxe : lambda args: expression

carre = lambda x: x ** 2
print(carre(5))  # 25

# Tri personnalisé
etudiants = [
    {"nom": "Alice", "note": 15},
    {"nom": "Bob", "note": 12},
    {"nom": "Charlie", "note": 18}
]
meilleurs = sorted(etudiants, key=lambda e: e["note"], reverse=True)
print(meilleurs[0]["nom"])  # Charlie
```

> "Limitez les `lambda` à des expressions simples. Si c'est plus complexe, utilisez une vraie fonction `def`."

---

### 7:30 — `itertools` : permutations, combinations, product (2 min)
**Texte écran :** ITERTOOLS

```python
from itertools import permutations, combinations, product

# Permutations : ordre compte
lettres = ["A", "B", "C"]
print(list(permutations(lettres, 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]

# Combinations : ordre ne compte pas
print(list(combinations(lettres, 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'C')]

# Product : produit cartésien
print(list(product([1, 2], ["X", "Y"])))
# [(1, 'X'), (1, 'Y'), (2, 'X'), (2, 'Y')]
```

> "Ces fonctions sont parfaites pour générer toutes les combinaisons possibles — mots de passe, tirages, arrangements."

---

### 9:30 — `functools` : `partial`, `lru_cache` (2 min)
**Texte écran :** FUNCTOOLS

```python
from functools import partial, lru_cache

# partial : fixer des arguments
def puissance(base, exp):
    return base ** exp

carre = partial(puissance, exp=2)
cube = partial(puissance, exp=3)

print(carre(5))   # 25
print(cube(5))    # 125

# lru_cache : mémoïsation
@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(50))  # 12586269025 (immédiat)
```

> "`partial` crée une nouvelle fonction avec des arguments pré-remplis. `lru_cache` mémorise les résultats pour éviter de recalculer."

---

### 11:30 — Programmation fonctionnelle vs impérative (1 min 30)
**Texte écran :** FONCTIONNEL VS IMPÉRATIF

**Même problème traité en deux styles :**

```python
notes = [12, 15, 8, 19, 14, 7, 16]

# Impératif
resultat = []
for note in notes:
    if note >= 10:
        resultat.append(note ** 2)

# Fonctionnel
resultat = list(map(lambda x: x ** 2,
                    filter(lambda x: x >= 10, notes)))

# Pythonique (compréhension)
resultat = [x ** 2 for x in notes if x >= 10]
```

> "Le style fonctionnel est concis. Mais souvent, la compréhension de liste est plus lisible — c'est le style pythonique recommandé. Choisissez l'outil adapté au contexte."

**Quand utiliser quel style ?**
- **Impératif** : logique complexe, effets de bord, clarté
- **Fonctionnel** : transformations en chaîne, données en flux
- **Compréhensions** : filtres + transformations simples (recommandé)

---

### 13:00 — Conclusion
> "Module 22 : on découvre les type hints, pour un code plus clair et mieux documenté."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 21 : Programmation fonctionnelle

Au programme :
00:00 — Introduction
00:30 — map : appliquer une fonction à chaque élément
02:30 — filter : filtrer une séquence
04:00 — reduce : accumulation (functools.reduce)
06:00 — lambda : fonctions anonymes
07:30 — itertools : permutations, combinations, product
09:30 — functools : partial, lru_cache
11:30 — Fonctionnelle vs impérative
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

#python #formationpython #programmationfonctionnelle #map #filter #reduce #lambda #itertools #functools
```

## Tags YouTube
```
python, formation python, programmation fonctionnelle python, map python, filter python, reduce python, lambda python, itertools permutations, functools partial, lru_cache, python avancé, apprendre python, cours python
```
