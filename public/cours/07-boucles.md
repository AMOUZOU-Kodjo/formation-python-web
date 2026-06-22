# Module 7 : Boucles

**Objectifs pédagogiques :**
- Maîtriser la boucle `for` pour parcourir des séquences
- Comprendre et utiliser `while` avec des conditions
- Savoir contrôler le flux des boucles (`break`, `continue`, `else`)
- Utiliser `range()`, `enumerate()`, `zip()` efficacement
- Reconnaître et éviter les boucles infinies

---

## 1. La boucle `for`

### 1.1 Principe de base

La boucle `for` parcourt **chaque élément** d'une séquence (liste, chaîne, tuple, dictionnaire…).

**Analogie :** Imaginez un tapis roulant avec des colis. La boucle `for` prend chaque colis un par un, fait quelque chose avec, puis passe au suivant.

```python
# Exemple 1 : parcourir une liste
fruits = ["pomme", "banane", "cerise"]
for fruit in fruits:
    print(fruit)
# → pomme
# → banane
# → cerise
```

```python
# Exemple 2 : parcourir une chaîne (c'est une séquence de caractères)
mot = "Python"
for lettre in mot:
    print(lettre, end="-")
# → P-y-t-h-o-n-
```

### 1.2 Itérer sur différents types

```python
# Tuple
for coord in (10, 20, 30):
    print(coord)
# → 10, 20, 30

# Dictionnaire (clés par défaut)
scores = {"Alice": 15, "Bob": 12, "Charlie": 18}
for nom in scores:
    print(nom)
# → Alice, Bob, Charlie

# Dictionnaire (clés + valeurs)
for nom, score in scores.items():
    print(f"{nom} : {score}")
# → Alice : 15
# → Bob : 12
# → Charlie : 18

# Set (ordre non garanti)
for couleur in {"rouge", "vert", "bleu"}:
    print(couleur)
# → ordre aléatoire (vert, bleu, rouge...)
```

### 1.3 La fonction `range()`

`range(start, stop, step)` génère une séquence d'entiers.

```python
# 1 argument : range(stop) → de 0 à stop-1
for i in range(5):
    print(i, end=" ")
# → 0 1 2 3 4

# 2 arguments : range(start, stop)
for i in range(2, 7):
    print(i, end=" ")
# → 2 3 4 5 6

# 3 arguments : range(start, stop, step)
for i in range(0, 10, 2):
    print(i, end=" ")
# → 0 2 4 6 8

# Step négatif (comptage à rebours)
for i in range(10, 0, -2):
    print(i, end=" ")
# → 10 8 6 4 2
```

> **Attention :** `range()` ne crée PAS une liste en mémoire (économies de ressources). `range(1000000)` est très léger.

```python
# Comparaison mémoire
import sys
print(sys.getsizeof(range(1000)))      # ~48 octets
print(sys.getsizeof(list(range(1000))))  # ~8056 octets
```

---

## 2. La boucle `while`

### 2.1 Principe

La boucle `while` répète un bloc **tant qu'une condition est vraie**.

**Analogie :** C'est comme un radiateur qui chauffe tant que la température est inférieure à celle programmée.

```python
# Exemple simple : compter jusqu'à 5
compteur = 0
while compteur < 5:
    print(f"Compteur : {compteur}")
    compteur += 1  # ← NE PAS OUBLIER : sinon boucle infinie !
# → Compteur : 0
# → Compteur : 1
# → Compteur : 2
# → Compteur : 3
# → Compteur : 4
```

```python
# Exemple : attente d'une condition
import random
tentatives = 0
trouve = False
while not trouve:
    valeur = random.randint(1, 10)
    tentatives += 1
    if valeur == 7:
        trouve = True
        print(f"7 trouvé en {tentatives} tentative(s)")
```

### 2.2 Boucles infinies (et comment les éviter)

**Attention : piège courant !** Une boucle dont la condition ne devient jamais fausse.

```python
# BOUCLE INFINIE ! Ne jamais exécuter ceci sans protection :
# compteur = 0
# while compteur < 5:
#     print("Infini !")
#     # On a oublié compteur += 1 → la condition reste toujours vraie

# Cas plus subtil :
# x = 10
# while x > 0:
#     x = x / 2
#     if x < 1:
#         x = 10  # on réinitialise → jamais ≤ 0 → infini
```

**Protection contre les boucles infinies :**

```python
# Ajouter un garde-fou avec un compteur max
compteur = 0
MAX_ITERATIONS = 1000
while True:  # volontairement infini
    print(f"Itération {compteur}")
    compteur += 1
    if compteur >= MAX_ITERATIONS:
        print("Arrêt de sécurité")
        break
```

### 2.3 `while` vs `for`

| `for` | `while` |
|---|---|
| Quand on connaît le nombre d'itérations | Quand on attend une condition |
| Parcours de séquence | Lecture jusqu'à une sentinelle |
| Plus sûr (pas d'infini par oubli) | Plus flexible mais risqué |

---

## 3. Contrôle de flux dans les boucles

### 3.1 `break` — sortir immédiatement

`break` interrompt la boucle sur-le-champ et passe à la suite.

```python
# Exemple : chercher un élément
eleves = ["Alice", "Bob", "Charlie", "David", "Eve"]
recherche = "Charlie"
for eleve in eleves:
    if eleve == recherche:
        print(f"Trouvé : {eleve}")
        break  # on a trouvé, inutile de continuer
    print(f"Pas {recherche} : {eleve}")
# → Pas Charlie : Alice
# → Pas Charlie : Bob
# → Trouvé : Charlie
```

```python
# break dans while — validation de saisie
while True:
    reponse = input("Tape 'quit' pour quitter : ")
    if reponse == "quit":
        print("Au revoir !")
        break
    print(f"Tu as tapé : {reponse}")
```

### 3.2 `continue` — passer à l'itération suivante

`continue` saute le reste du bloc et passe directement à l'élément suivant.

```python
# Afficher uniquement les nombres impairs
for i in range(10):
    if i % 2 == 0:
        continue  # on saute les pairs
    print(i)
# → 1, 3, 5, 7, 9
```

```python
# continue dans une boucle while
n = 0
while n < 10:
    n += 1
    if n % 3 == 0:
        continue  # on saute les multiples de 3
    print(n)
# → 1, 2, 4, 5, 7, 8, 10
```

### 3.3 `else` sur les boucles (concept avancé)

Le bloc `else` s'exécute **uniquement si la boucle se termine normalement** (sans `break`).

**Analogie :** C'est comme dire "si on a parcouru tous les éléments sans trouver ce qu'on cherchait, alors…"

```python
# Recherche : else s'exécute si break n'a PAS été déclenché
mots = ["chat", "chien", "oiseau"]
recherche = "souris"
for mot in mots:
    if mot == recherche:
        print(f"Trouvé : {mot}")
        break
else:
    print(f"'{recherche}' introuvable dans la liste")
# → 'souris' introuvable dans la liste
```

```python
# Avec while
n = 1
while n < 10:
    if n == 7:
        print("7 trouvé, on arrête")
        break
    n += 1
else:
    print("7 jamais trouvé")
# → 7 trouvé, on arrête (car n devient 7)
```

> **Piège courant :** Le `else` d'une boucle est souvent confondu avec le `else` d'un `if`. Rappelez-vous : il appartient au `for` ou au `while`, pas au `if`.

---

## 4. Parcours avancé avec `enumerate()` et `zip()`

### 4.1 `enumerate()` — récupérer index et valeur

`enumerate()` donne un compteur automatique pour chaque élément.

```python
# Sans enumerate (lourdeau)
fruits = ["pomme", "banane", "cerise"]
i = 0
for fruit in fruits:
    print(f"{i}. {fruit}")
    i += 1

# Avec enumerate (élégant)
for i, fruit in enumerate(fruits):
    print(f"{i}. {fruit}")
# → 0. pomme
# → 1. banane
# → 2. cerise

# Départ personnalisé
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
# → 1. pomme
# → 2. banane
# → 3. cerise
```

```python
# Cas d'usage : trouver l'index d'un élément
notes = [12, 15, 8, 19, 10]
for i, note in enumerate(notes):
    if note >= 18:
        print(f"Mention très bien : index {i} → note {note}")
        break
# → Mention très bien : index 3 → note 19
```

### 4.2 `zip()` — parcourir plusieurs listes en parallèle

`zip()` agrège les éléments de mêmes index de plusieurs séquences.

```python
# Usage simple
noms = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
for nom, age in zip(noms, ages):
    print(f"{nom} a {age} ans")
# → Alice a 25 ans
# → Bob a 30 ans
# → Charlie a 35 ans
```

```python
# zip avec 3 listes ou plus
noms = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
villes = ["Paris", "Lyon", "Marseille"]
for nom, age, ville in zip(noms, ages, villes):
    print(f"{nom} ({age} ans) - {ville}")
```

```python
# Zip avec des listes de tailles différentes
# → s'arrête à la plus courte
noms = ["Alice", "Bob", "Charlie", "David"]
ages = [25, 30, 35]
for nom, age in zip(noms, ages):
    print(f"{nom} a {age} ans")
# → Alice 25, Bob 30, Charlie 35 (David ignoré !)

# Pour éviter ce comportement silencieux, utiliser zip(strict=True) (Python 3.10+)
# from itertools import zip_longest
# for nom, age in zip_longest(noms, ages, fillvalue="?"):
#     print(f"{nom} a {age} ans")
```

### 4.3 Combinaison : `enumerate()` + `zip()`

```python
noms = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
for i, (nom, age) in enumerate(zip(noms, ages), start=1):
    print(f"{i}. {nom} ({age} ans)")
# → 1. Alice (25 ans)
# → 2. Bob (30 ans)
# → 3. Charlie (35 ans)
```

---

## 5. Itération sur structures complexes

```python
# Matrice (liste de listes)
matrice = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
for ligne in matrice:
    for colonne in ligne:
        print(colonne, end=" ")
    print()
# → 1 2 3
# → 4 5 6
# → 7 8 9

# Liste de dictionnaires
employes = [
    {"nom": "Alice", "poste": "Dev", "salaire": 45000},
    {"nom": "Bob", "poste": "DevOps", "salaire": 48000},
    {"nom": "Charlie", "poste": "Data", "salaire": 52000},
]
for employe in employes:
    print(f"{employe['nom']} ({employe['poste']}) : {employe['salaire']}€")
```

---

## 6. Résumé

| Outil | Usage |
|---|---|
| `for x in sequence` | Parcourir une séquence |
| `range(start, stop, step)` | Générer une progression d'entiers |
| `while condition` | Boucler tant qu'une condition est vraie |
| `break` | Sortir immédiatement de la boucle |
| `continue` | Passer à l'itération suivante |
| `else` après boucle | Code exécuté si pas de `break` |
| `enumerate(seq, start=0)` | Parcourir avec index |
| `zip(seq1, seq2)` | Parcourir plusieurs séquences en parallèle |

---

## 7. Exercices

**Exercice 1 :** Écrire un programme qui affiche la table de multiplication de 1 à 10 (format 1×1=1 … 10×10=100).

**Exercice 2 :** Demander un mot à l'utilisateur et afficher chaque lettre avec son index.

**Exercice 3 :** Avec deux listes `noms = ["Alice", "Bob", "Charlie"]` et `notes = [[12,15],[8,17],[19,14]]`, afficher pour chaque élève sa moyenne.

**Exercice 4 :** Deviner un nombre secret. Le programme choisit un nombre entre 1 et 100, l'utilisateur propose des valeurs. Après chaque essai, le programme dit "plus" ou "moins". Limiter à 10 tentatives.

**Exercice 5 :** Trouver tous les nombres premiers entre 1 et 100 en utilisant des boucles imbriquées.
