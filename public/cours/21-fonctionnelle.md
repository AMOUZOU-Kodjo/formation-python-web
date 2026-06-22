# Module 21 : Programmation fonctionnelle en Python

La **programmation fonctionnelle** est un paradigme qui traite le calcul comme une évaluation de fonctions, en évitant les changements d'état et les données mutables. Python n'est pas un langage purement fonctionnel (comme Haskell), mais il offre des outils puissants pour adopter ce style quand c'est pertinent.

> **Objectif** : Maîtriser `map`, `filter`, `reduce`, `lambda`, `itertools` et `functools` pour écrire du code plus déclaratif et composable.

---

## 1. `lambda` — Les fonctions anonymes

Une fonction lambda est une **fonction sans nom**, définie sur une seule ligne.

```python
# Syntaxe : lambda paramètres: expression

# Version classique
def carre(x):
    return x ** 2

# Version lambda
carre = lambda x: x ** 2

print(carre(5))  # → 25
```

### 1.1 Lambda avec plusieurs paramètres

```python
# Addition
addition = lambda a, b: a + b
print(addition(3, 4))  # → 7

# Condition (opérateur ternaire)
max2 = lambda a, b: a if a > b else b
print(max2(10, 7))  # → 10
```

### 1.2 Lambda avec `sorted` (cas pratique très fréquent)

```python
personnes = [
    ("Alice", 30, "Paris"),
    ("Bob", 25, "Lyon"),
    ("Charlie", 35, "Marseille"),
]

# Trier par âge (2e élément)
trie_par_age = sorted(personnes, key=lambda p: p[1])
print(trie_par_age)
# → [('Bob', 25, 'Lyon'), ('Alice', 30, 'Paris'), ('Charlie', 35, 'Marseille')]

# Trier par ville (3e élément)
trie_par_ville = sorted(personnes, key=lambda p: p[2])
print(trie_par_ville)
# → [('Bob', 25, 'Lyon'), ('Charlie', 35, 'Marseille'), ('Alice', 30, 'Paris')]
```

> **À retenir** : Les lambdas sont pratiques, mais ne les utilisez pas si la logique est complexe. Préférez une vraie fonction `def` pour la lisibilité.

---

## 2. `map()` — Appliquer une transformation à chaque élément

`map(fonction, iterable)` applique `fonction` à chaque élément de `iterable` et retourne un itérateur.

### 2.1 Boucle `for` vs `map`

```python
# Style impératif (boucle)
nombres = [1, 2, 3, 4, 5]
carres = []
for n in nombres:
    carres.append(n ** 2)
print(carres)  # → [1, 4, 9, 16, 25]

# Style fonctionnel (map)
carres = list(map(lambda x: x ** 2, nombres))
print(carres)  # → [1, 4, 9, 16, 25]
```

### 2.2 `map` avec une fonction nommée

```python
def celsius_vers_fahrenheit(c):
    return c * 9/5 + 32

temperatures_c = [0, 10, 20, 30, 100]
temperatures_f = list(map(celsius_vers_fahrenheit, temperatures_c))
print(temperatures_f)  # → [32.0, 50.0, 68.0, 86.0, 212.0]
```

### 2.3 `map` avec plusieurs itérables

```python
a = [1, 2, 3]
b = [10, 20, 30]
c = [100, 200, 300]

sommes = list(map(lambda x, y, z: x + y + z, a, b, c))
print(sommes)  # → [111, 222, 333]

# Les plus courtes itérables déterminent la longueur
a = [1, 2, 3, 4]
b = [10, 20]
print(list(map(lambda x, y: x + y, a, b)))  # → [11, 22]  s'arrête à 2
```

> **À retenir** : `map` est paresseux — il retourne un itérateur. Convertissez-le en `list()` si vous avez besoin des résultats immédiatement.

---

## 3. `filter()` — Garder les éléments qui satisfont une condition

`filter(fonction, iterable)` garde les éléments pour lesquels la fonction retourne `True`.

### 3.1 Boucle `for` vs `filter`

```python
# Style impératif
nombres = [1, 2, 3, 4, 5, 6]
pairs = []
for n in nombres:
    if n % 2 == 0:
        pairs.append(n)
print(pairs)  # → [2, 4, 6]

# Style fonctionnel
pairs = list(filter(lambda x: x % 2 == 0, nombres))
print(pairs)  # → [2, 4, 6]
```

### 3.2 Filtrer les valeurs non-nulles

```python
# `filter(None, ...)` supprime les valeurs "falsy"
donnees = [0, "Hello", "", None, 42, False, "World"]
propres = list(filter(None, donnees))
print(propres)  # → ['Hello', 42, 'World']

# Équivalent à :
propres = [x for x in donnees if x]
```

### 3.3 Cas pratique : filtrer une liste de dictionnaires

```python
produits = [
    {"nom": "Pomme", "prix": 1.5, "stock": 10},
    {"nom": "Banane", "prix": 0.8, "stock": 0},
    {"nom": "Cerise", "prix": 3.0, "stock": 5},
    {"nom": "Datte", "prix": 2.0, "stock": 0},
]

# Produits en stock
en_stock = list(filter(lambda p: p["stock"] > 0, produits))
print([p["nom"] for p in en_stock])  # → ['Pomme', 'Cerise']
```

> **À retenir** : Pour des filtres simples, une liste en compréhension est souvent plus lisible. `filter` brille quand on veut chaîner des opérations.

---

## 4. `reduce()` — Accumuler les éléments

`reduce(fonction, iterable, initial)` applique la fonction cumulativement aux éléments.

`reduce` se trouve dans le module `functools` (pas en built-in).

### 4.1 Boucle `for` vs `reduce`

```python
from functools import reduce

# Somme : version boucle
nombres = [1, 2, 3, 4, 5]
somme = 0
for n in nombres:
    somme += n
print(somme)  # → 15

# Somme : version reduce
somme = reduce(lambda acc, x: acc + x, nombres, 0)
print(somme)  # → 15

# Étape par étape, voici ce qui se passe :
# acc=0, x=1 → 0+1 = 1
# acc=1, x=2 → 1+2 = 3
# acc=3, x=3 → 3+3 = 6
# acc=6, x=4 → 6+4 = 10
# acc=10, x=5 → 10+5 = 15
```

### 4.2 Sans valeur initiale

```python
from functools import reduce

# Sans valeur initiale, reduce utilise le 1er élément comme acc initial
produit = reduce(lambda acc, x: acc * x, [1, 2, 3, 4, 5])
print(produit)  # → 120  (1×2×3×4×5)

# Attention : si la liste est vide, sans initial → TypeError
# reduce(lambda a, x: a + x, [])  # TypeError!
reduce(lambda a, x: a + x, [], 0)  # → 0  (correct)
```

### 4.3 Cas avancé : trouver le maximum

```python
from functools import reduce

nombres = [3, 7, 2, 9, 1, 5]
maximum = reduce(lambda acc, x: acc if acc > x else x, nombres)
print(maximum)  # → 9
```

> **À retenir** : Python a souvent des built-ins qui remplacent `reduce` : `sum()`, `max()`, `min()`, `all()`, `any()`. Utilisez-les d'abord.

---

## 5. Chaînage fonctionnel — composer map, filter, reduce

La vraie puissance du style fonctionnel apparaît quand on chaîne les opérations.

```python
from functools import reduce

notes = [12, 8, 15, 9, 18, 10, 7, 14, 6]

# Chaîne fonctionnelle : filtrer les échecs, les pondérer, calculer la moyenne
# 1. Garder les >= 10 (filter)
# 2. Ajouter 1 point bonus (map)
# 3. Faire la moyenne (reduce)

moyenne_ponderee = (
    reduce(lambda acc, x: acc + x,
           map(lambda n: n + 1,          # étape 2 : bonus
               filter(lambda n: n >= 10,  # étape 1 : filtre
                      notes)),
           0)
    / len(list(filter(lambda n: n >= 10, notes)))
)
print(f"Moyenne avec bonus: {moyenne_ponderee:.1f}")  # dépend des notes

# Version plus lisible (équivalente)
notes_ok = [n for n in notes if n >= 10]
notes_bonus = [n + 1 for n in notes_ok]
moyenne = sum(notes_bonus) / len(notes_bonus)
```

**Pipeline de traitement :**

```python
from functools import reduce

def pipeline(*fonctions):
    """Applique les fonctions en chaîne de droite à gauche."""
    def appliquer(x):
        return reduce(lambda val, f: f(val), fonctions, x)
    return appliquer

# Exemple : notes → valides → bonus → somme → moyenne
donnees = [12, 8, 15, 9, 18, 10, 7, 14, 6]

nettoyer = pipeline(
    lambda notes: [n for n in notes if n >= 10],
    lambda notes: [n + 1 for n in notes],
    sum,
    lambda s: s / (sum(1 for n in donnees if n >= 10))
)
print(nettoyer(donnees))  # → moyenne avec bonus
```

> **À retenir** : Le chaînage fonctionnel est puissant mais peut nuire à la lisibilité. Trouvez le juste équilibre avec les compréhensions de liste.

---

## 6. `itertools` — Les itérateurs avancés

Le module `itertools` est une véritable boîte à outils pour travailler avec des itérateurs.

### 6.1 `chain` — Enchaîner des itérables

```python
from itertools import chain

# Concaténer des séquences
resultat = list(chain([1, 2, 3], [4, 5], [6]))
print(resultat)  # → [1, 2, 3, 4, 5, 6]

# Alternative : aplatir une liste de listes
listes = [[1, 2], [3, 4, 5], [6]]
plat = list(chain.from_iterable(listes))
print(plat)  # → [1, 2, 3, 4, 5, 6]
```

### 6.2 `cycle` et `count` — Itérateurs infinis

```python
from itertools import cycle, count

# cycle : répète une séquence indéfiniment
couleurs = cycle(["rouge", "vert", "bleu"])
print([next(couleurs) for _ in range(5)])
# → ['rouge', 'vert', 'bleu', 'rouge', 'vert']

# count : compte à partir d'un nombre
compteur = count(10, 2)  # start=10, step=2
print([next(compteur) for _ in range(4)])
# → [10, 12, 14, 16]
```

### 6.3 `permutations`, `combinations`, `product`

```python
from itertools import permutations, combinations, combinations_with_replacement, product

letters = "ABC"

# Permutations : ordre compte (n! / (n-k)!)
print(list(permutations(letters, 2)))
# → [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]

# Combinations : ordre ne compte pas, sans remise
print(list(combinations(letters, 2)))
# → [('A', 'B'), ('A', 'C'), ('B', 'C')]

# Combinations avec remise
print(list(combinations_with_replacement(letters, 2)))
# → [('A', 'A'), ('A', 'B'), ('A', 'C'), ('B', 'B'), ('B', 'C'), ('C', 'C')]

# Product : produit cartésien
print(list(product("AB", [1, 2])))
# → [('A', 1), ('A', 2), ('B', 1), ('B', 2)]
```

### 6.4 `groupby` — Grouper des éléments consécutifs

```python
from itertools import groupby

notes = [
    ("Alice", 15), ("Bob", 12), ("Charlie", 15),
    ("David", 10), ("Eve", 12), ("Frank", 15),
]

# Important : groupby nécessite des données triées par la clé !
notes_triees = sorted(notes, key=lambda x: x[1])

for valeur, groupe in groupby(notes_triees, key=lambda x: x[1]):
    noms = [e[0] for e in groupe]
    print(f"Note {valeur}: {', '.join(noms)}")
# → Note 10: David
# → Note 12: Bob, Eve
# → Note 15: Alice, Charlie, Frank
```

### 6.5 `accumulate` — Cumuler des valeurs

```python
from itertools import accumulate
import operator

nombres = [1, 2, 3, 4, 5]

# Par défaut : somme cumulée
print(list(accumulate(nombres)))
# → [1, 3, 6, 10, 15]

# Produit cumulé
print(list(accumulate(nombres, operator.mul)))
# → [1, 2, 6, 24, 120]

# Maximum cumulé
print(list(accumulate([3, 1, 7, 2, 9], max)))
# → [3, 3, 7, 7, 9]
```

### 6.6 `islice` et `takewhile` — Limiter les itérables

```python
from itertools import islice, takewhile, dropwhile

# islice : découpe un itérateur comme [:]
nombres = range(100)
print(list(islice(nombres, 5)))        # → [0, 1, 2, 3, 4]
print(list(islice(nombres, 10, 15)))   # → [10, 11, 12, 13, 14]

# takewhile : prend tant que la condition est vraie
print(list(takewhile(lambda x: x < 5, [1, 3, 7, 2, 9])))
# → [1, 3]  (s'arrête au 7 car 7 ≥ 5)

# dropwhile : ignore tant que la condition est vraie
print(list(dropwhile(lambda x: x < 5, [1, 3, 7, 2, 9])))
# → [7, 2, 9]  (prend à partir du 7)
```

> **À retenir** : `itertools` est l'un des modules les plus utiles. `chain`, `product`, `islice` et `groupby` sont incontournables.

---

## 7. `functools` — Outils pour les fonctions

### 7.1 `partial` — Figer des paramètres

```python
from functools import partial

# Fonction de base
def puissance(base, exp):
    return base ** exp

# Créer des versions spécialisées
carre = partial(puissance, exp=2)
cube = partial(puissance, exp=3)

print(carre(5))   # → 25   (5²)
print(cube(3))    # → 27   (3³)

# Autre exemple : log avec base par défaut
import math
log_base2 = partial(math.log, base=2)
log_base10 = partial(math.log, base=10)

print(log_base2(1024))   # → 10.0
print(log_base10(1000))  # → 3.0
```

### 7.2 `lru_cache` — Mémoïsation (mise en cache)

`lru_cache` mémoïse automatiquement les résultats d'une fonction. Idéal pour les fonctions récursives pures.

```python
from functools import lru_cache

# SANS cache : O(2^n) — explosion exponentielle
def fib_sans_cache(n):
    if n < 2:
        return n
    return fib_sans_cache(n-1) + fib_sans_cache(n-2)

# AVEC cache : O(n) — chaque valeur calculée une seule fois
@lru_cache(maxsize=128)
def fib_cache(n):
    if n < 2:
        return n
    return fib_cache(n-1) + fib_cache(n-2)

# Test de performance
import time

t0 = time.perf_counter()
fib_sans_cache(35)
t1 = time.perf_counter()
print(f"Sans cache: {t1-t0:.3f}s")  # → ~0.6s

t0 = time.perf_counter()
fib_cache(35)
t1 = time.perf_counter()
print(f"Avec cache: {t1-t0:.3f}s")  # → ~0.001s

# Voir les stats du cache
print(fib_cache.cache_info())
# → CacheInfo(hits=32, misses=36, maxsize=128, currsize=36)
```

### 7.3 `wraps` — Préserver les métadonnées des fonctions décorées

```python
from functools import wraps

def log_appel(func):
    @wraps(func)  # préserve le nom et la docstring
    def wrapper(*args, **kwargs):
        print(f"Appel de {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_appel
def saluer(nom):
    """Dit bonjour à quelqu'un."""
    return f"Bonjour {nom}"

print(saluer("Alice"))  # → Appel de saluer \n Bonjour Alice
print(saluer.__name__)  # → saluer (sans @wraps, ce serait "wrapper")
```

---

## 8. Programmation sans effet de bord (immutabilité)

Le style fonctionnel privilégie les **fonctions pures** : pas d'effet de bord, résultat uniquement basé sur les entrées.

```python
# Style impur (modifie l'état)
def ajouter_element(liste, element):
    liste.append(element)
    return liste

ma_liste = [1, 2, 3]
ajouter_element(ma_liste, 4)
print(ma_liste)  # → [1, 2, 3, 4]  (modifié !)

# Style pur (ne modifie pas l'entrée)
def ajouter_element_pur(liste, element):
    return [*liste, element]  # crée une nouvelle liste

ma_liste = [1, 2, 3]
nouvelle_liste = ajouter_element_pur(ma_liste, 4)
print(ma_liste)       # → [1, 2, 3]  (inchangé)
print(nouvelle_liste) # → [1, 2, 3, 4]
```

---

## Résumé

| Outil | Rôle | Exemple |
|-------|------|---------|
| `lambda` | Fonction anonyme | `lambda x: x*2` |
| `map(f, it)` | Transformer chaque élément | `map(str.upper, mots)` |
| `filter(f, it)` | Garder selon condition | `filter(str.isdigit, chars)` |
| `reduce(f, it, init)` | Accumuler | `reduce(mul, [1,2,3], 1)` |
| `itertools.chain` | Concaténer | `chain([1], [2,3])` |
| `itertools.product` | Produit cartésien | `product("AB", "12")` |
| `itertools.groupby` | Grouper par clé | `groupby(trie, key=...)` |
| `itertools.accumulate` | Cumuler | `accumulate(nombres, mul)` |
| `functools.partial` | Figer paramètres | `partial(math.log, base=2)` |
| `functools.lru_cache` | Mémoïsation | `@lru_cache` sur récursion |

```python
# Un pipeline fonctionnel complet :
from functools import reduce
from itertools import chain, accumulate

notes = [12, 8, 15, 9, 18, 10, 7, 14, 6]

resultat = (
    list(chain(
        ["=== RÉSULTATS ==="],
        map(lambda n: f"Note: {n}",
            filter(lambda n: n >= 10, sorted(notes))),
        [f"Somme: {sum(n for n in notes if n >= 10)}"]
    ))
)
for ligne in resultat:
    print(ligne)
```

---

## Exercices

1. **Map+Filter** : À partir d'une liste de températures en Celsius, filtrez les négatives et convertissez les positives en Fahrenheit avec `map`.
2. **Reduce** : Calculez la factorielle de 10 avec `reduce` et `operator.mul`.
3. **Groupby** : À partir d'une liste de mots, regroupez-les par leur première lettre avec `itertools.groupby`.
4. **Chaînage** : Transformez un texte en : minuscules → mots → longueurs des mots → somme totale des longueurs (utilisez map, filter if needed, reduce).
5. **LRU Cache** : Implémentez une fonction de calcul de nombres de Catalan (récursive) et montrez la différence avec/sans `lru_cache`.
