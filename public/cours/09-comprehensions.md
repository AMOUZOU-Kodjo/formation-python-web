# Module 9 : Compréhensions

**Objectifs pédagogiques :**
- Comprendre et utiliser les list comprehensions
- Maîtriser les dict et set comprehensions
- Créer des générateurs par compréhension
- Savoir quand utiliser (et quand éviter) les compréhensions
- Comparer performance et lisibilité

---

## 1. List comprehension — liste en compréhension

### 1.1 Principe de base

Une **list comprehension** est une syntaxe concise pour créer des listes à partir d'une séquence, sans boucle `for` explicite.

**Analogie :** C'est comme une machine qui prend des fruits en entrée et produit des jus : chaque fruit (entrée) passe par une transformation (expression) pour devenir un jus (élément de la liste).

```python
# Style impératif (avec boucle)
carres = []
for i in range(10):
    carres.append(i ** 2)
print(carres)
# → [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Style déclaratif (compréhension)
carres = [i ** 2 for i in range(10)]
print(carres)
# → [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

**Syntaxe :** `[expression for élément in séquence]`

### 1.2 Avec condition (`if`)

```python
# Nombres pairs de 0 à 19
pairs = [i for i in range(20) if i % 2 == 0]
print(pairs)
# → [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Minuscules d'une chaîne
phrase = "Bonjour TOUT le Monde"
minuscules = [c for c in phrase if c.islower()]
print(minuscules)
# → ['o', 'n', 'j', 'o', 'u', 'r', 'l', 'e', 'n', 'd', 'e']
```

### 1.3 Avec condition `if/else` (opérateur ternaire)

Ici, le `if/else` fait partie de **l'expression**, pas du filtrage.

```python
# Syntaxe : [valeur_si_vrai if condition else valeur_si_faux for élément in séquence]
nombres = [-3, 5, -1, 8, -7, 2]
positifs_negatifs = ["positif" if n >= 0 else "négatif" for n in nombres]
print(positifs_negatifs)
# → ['négatif', 'positif', 'négatif', 'positif', 'négatif', 'positif']

# Transformer des notes en mentions
notes = [8, 12, 15, 18, 5]
mentions = [
    "excellent" if n >= 16
    else "bien" if n >= 14
    else "passable" if n >= 10
    else "insuffisant"
    for n in notes
]
print(mentions)
# → ['insuffisant', 'passable', 'bien', 'excellent', 'insuffisant']
```

> **Piège :** Ne confondez pas `[x for x in seq if cond]` (filtre) et `[val if cond else autre for x in seq]` (transformation conditionnelle).

### 1.4 Boucles imbriquées

```python
# Table de multiplication (matrice 3×3)
paires = [(a, b) for a in range(3) for b in range(3)]
print(paires)
# → [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]

# Aplatir une matrice
matrice = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
platis = [element for ligne in matrice for element in ligne]
print(platis)
# → [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Avec condition sur chaque niveau
# Toutes les combinaisons (a,b) où a < b
combos = [(a, b) for a in range(5) for b in range(5) if a < b]
print(combos)
# → [(0, 1), (0, 2), (0, 3), (0, 4), (1, 2), (1, 3), (1, 4), (2, 3), (2, 4), (3, 4)]
```

**Ordre d'écriture :** L'ordre des `for` dans la compréhension suit l'ordre des boucles imbriquées classiques :

```python
# Equivalent boucle :
for a in range(3):
    for b in range(3):
        (a, b)

# Comprehension :
[(a, b) for a in range(3) for b in range(3)]
```

---

## 2. Dict comprehension — dictionnaire en compréhension

### 2.1 Syntaxe de base

```python
# Syntaxe : {clé: valeur for élément in séquence}
carres_dict = {x: x ** 2 for x in range(5)}
print(carres_dict)
# → {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

### 2.2 À partir de deux listes (avec zip)

```python
produits = ["pomme", "banane", "cerise"]
prix = [1.20, 0.80, 2.50]
catalogue = {produit: prix for produit, prix in zip(produits, prix)}
print(catalogue)
# → {'pomme': 1.2, 'banane': 0.8, 'cerise': 2.5}
```

### 2.3 Filtrage et transformation

```python
# Filtrer les paires clé-valeur
notes = {"Alice": 15, "Bob": 8, "Charlie": 18, "David": 6}
admis = {nom: note for nom, note in notes.items() if note >= 10}
print(admis)
# → {'Alice': 15, 'Charlie': 18}

# Transformer les valeurs
notes_bonus = {nom: note + 1 for nom, note in notes.items()}
print(notes_bonus)
# → {'Alice': 16, 'Bob': 9, 'Charlie': 19, 'David': 7}

# Inverser clés et valeurs
inverse = {v: k for k, v in {"a": 1, "b": 2, "c": 3}.items()}
print(inverse)
# → {1: 'a', 2: 'b', 3: 'c'}
```

> **Attention :** Si deux clés deviennent identiques dans l'inversion, la dernière écrase la précédente.

---

## 3. Set comprehension — ensemble en compréhension

### 3.1 Syntaxe

```python
# Syntaxe : {expression for élément in séquence}
nombres = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
uniques_au_carre = {n ** 2 for n in nombres}
print(uniques_au_carre)
# → {16, 1, 4, 9}  (aucun doublon, ordre non garanti)

nombres_uniques = {x % 3 for x in range(10)}
print(nombres_uniques)
# → {0, 1, 2}
```

**Différence clé :** Un set comprehension utilise `{}` comme un dict, mais sans `:` — juste une expression.

| Syntaxe | Résultat |
|---|---|
| `[x for x in seq]` | `list` |
| `{x: y for x in seq}` | `dict` |
| `{x for x in seq}` | `set` |
| `(x for x in seq)` | `generator` |

---

## 4. Generator expression — expression génératrice

### 4.1 Pourquoi des générateurs ?

Un générateur produit les valeurs **à la demande** sans tout stocker en mémoire.

**Analogie :** Un générateur est comme un robinet : l'eau coule quand on ouvre, au lieu de remplir toute une piscine d'avance.

```python
# List comprehension : tout en mémoire
liste_carres = [x ** 2 for x in range(1000000)]
print(sys.getsizeof(liste_carres))
# → ~8 000 000 octets (8 Mo)

# Generator expression : rien en mémoire
gen_carres = (x ** 2 for x in range(1000000))
print(sys.getsizeof(gen_carres))
# → ~104 octets

# Utilisation : on itère dessus
for val in gen_carres:
    if val > 100:
        break
    print(val)
# → 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100
```

### 4.2 Quand utiliser un générateur

```python
# Passer un générateur à une fonction (parenthèses optionnelles)
somme = sum(x ** 2 for x in range(10))
print(somme)
# → 285

# Filtrer avec un générateur (économique)
nombres_pairs = (n for n in range(1_000_000) if n % 2 == 0)
print(next(nombres_pairs))  # → 0
print(next(nombres_pairs))  # → 2
```

> **À retenir :** Un générateur ne se parcourt QU'UNE SEULE FOIS. Après épuisement, il est vide.

```python
gen = (x for x in [1, 2, 3])
print(list(gen))  # → [1, 2, 3]
print(list(gen))  # → []  vide !
```

---

## 5. Comparaison : boucle vs compréhension vs générateur

```python
import time

# Méthode 1 : boucle classique
def avec_boucle(n):
    resultats = []
    for i in range(n):
        if i % 2 == 0:
            resultats.append(i ** 2)
    return resultats

# Méthode 2 : list comprehension
def avec_comprehension(n):
    return [i ** 2 for i in range(n) if i % 2 == 0]

# Méthode 3 : generator
def avec_generateur(n):
    return (i ** 2 for i in range(n) if i % 2 == 0)

# Test de performance
n = 10_000_000

t0 = time.time()
r1 = avec_boucle(n)
t1 = time.time()
print(f"Boucle : {t1 - t0:.3f}s")

t0 = time.time()
r2 = avec_comprehension(n)
t2 = time.time()
print(f"Comprehension : {t2 - t0:.3f}s")

# Généralement : comprehension ≈ boucle (légèrement plus rapide)
# Générateur : beaucoup plus rapide MAIS ne construit pas la liste
```

---

## 6. Quand les utiliser (et quand les éviter)

### 6.1 À faire ✅

- Transformations simples : `[x * 2 for x in data]`
- Filtres simples : `[x for x in data if x > 0]`
- Création de dictionnaires : `{k: f(k) for k in cles}`
- Générateurs pour grands volumes : `(x for x in huge_data)`

### 6.2 À éviter ❌

- Plus de 2 niveaux d'imbrication : trop difficile à lire
- Logique complexe avec plusieurs `if/else` imbriqués
- Effets de bord (appels à `print()`) dans une compréhension
- Quand la lisibilité est plus importante que la concision

```python
# MAUVAIS : trop complexe
resultats = [
    (a, b, c)
    for a in range(5)
    for b in range(5)
    for c in range(5)
    if a != 0
    if b % 2 == 0 or c % 2 == 0
    if a + b > c
]
# BON : transformé en boucle avec commentaires
resultats = []
for a in range(5):
    if a == 0:
        continue
    for b in range(5):
        for c in range(5):
            if b % 2 == 0 or c % 2 == 0:
                if a + b > c:
                    resultats.append((a, b, c))
```

### 6.3 Règle d'or

> **"Explicit is better than implicit."** — Zen of Python
>
> Si vous devez réfléchir plus de 5 secondes pour comprendre une compréhension, remplacez-la par une boucle.

---

## 7. Résumé

| Type | Syntaxe | Résultat |
|---|---|---|
| Liste | `[expr for x in seq]` | `list` |
| Dictionnaire | `{k: v for x in seq}` | `dict` |
| Ensemble | `{expr for x in seq}` | `set` |
| Générateur | `(expr for x in seq)` | `generator` |

- Les compréhensions sont plus concises et légèrement plus rapides que les boucles
- Les générateurs économisent la mémoire pour les grandes séquences
- Évitez les compréhensions trop complexes (≤ 2 niveaux, ≤ 1 condition de filtrage)
- Un générateur est "paresseux" (lazy) et ne se parcourt qu'une fois

---

## 8. Exercices

**Exercice 1 :** À partir d'une liste `nombres = [1, 2, 3, 4, 5]`, créer une liste des carrés avec une list comprehension.

**Exercice 2 :** Filtrer les mots de longueur ≥ 5 dans `mots = ["Python", "est", "un", "langage", "magique"]`.

**Exercice 3 :** Créer un dictionnaire associant chaque lettre de "abcdefghij" à son rang (a→1, b→2…).

**Exercice 4 :** Avec `notes = {"Alice": 12, "Bob": 8, "Charlie": 15, "David": 18}`, créer un dictionnaire des élèves avec mention "admis" (≥10) ou "refusé" (<10).

**Exercice 5 (générateur) :** Créer un générateur qui produit les 20 premiers nombres de Fibonacci, sans les stocker en mémoire.

**Exercice 6 (défi) :** En une seule compréhension, créer une matrice identité 5×5 (des 1 sur la diagonale, des 0 ailleurs).
