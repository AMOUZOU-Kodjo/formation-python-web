# Module 4 : Listes et Tuples

---

## Objectifs du module

À la fin de ce module, vous serez capable de :
- Créer et manipuler des listes (ajout, suppression, modification)
- Comprendre la différence entre listes et tuples
- Utiliser le slicing sur les listes
- Appliquer les méthodes principales (append, pop, sort, etc.)
- Déballer une séquence (unpacking)
- Comprendre la notion de référence vs copie
- Utiliser les listes comme piles (LIFO) ou files (FIFO)
- Écrire des compréhensions simples de listes

---

## 1. Les listes (`list`)

### 1.1 Qu'est-ce qu'une liste ?

Une **liste** est une collection **ordonnée**, **modifiable** (mutable) et **hétérogène** (peut contenir différents types).

**Analogogie du monde réel :** Une liste de courses écrite sur un tableau blanc. Vous pouvez ajouter un élément, en retirer un, modifier un élément existant. L'ordre compte (le pain est en premier, le lait en deuxième...).

```python
# Liste de fruits
fruits = ["pomme", "banane", "cerise"]
print(fruits)              # → ['pomme', 'banane', 'cerise']

# Liste de nombres
nombres = [1, 2, 3, 4, 5]
print(nombres)             # → [1, 2, 3, 4, 5]

# Liste hétérogène (mélange de types)
mixte = [1, "texte", 3.14, True]
print(mixte)               # → [1, 'texte', 3.14, True]

# Liste vide
vide = []
print(vide)                # → []
```

### 1.2 Création avec la fonction `list()`

```python
# list() avec une chaîne → liste de caractères
print(list("Python"))      # → ['P', 'y', 't', 'h', 'o', 'n']

# list() avec un tuple → le transforme en liste
print(list((1, 2, 3)))     # → [1, 2, 3]

# list() pour créer une liste vide
print(list())              # → []
```

### 1.3 Indexation et slicing (comme les chaînes)

Les listes utilisent exactement les mêmes règles d'indexation que les chaînes :

```python
fruits = ["pomme", "banane", "cerise", "datte", "figue"]

# Indexation
print(fruits[0])           # → pomme
print(fruits[-1])          # → figue (dernier)
print(fruits[-2])          # → datte (avant-dernier)

# Slicing [début:fin:pas]
print(fruits[1:3])         # → ['banane', 'cerise'] (fin exclue)
print(fruits[:3])          # → ['pomme', 'banane', 'cerise'] (3 premiers)
print(fruits[::2])         # → ['pomme', 'cerise', 'figue'] (un sur deux)
print(fruits[::-1])        # → ['figue', 'datte', 'cerise', 'banane', 'pomme']
```

**Résultat attendu :**
```
pomme
figue
datte
['banane', 'cerise']
['pomme', 'banane', 'cerise']
['pomme', 'cerise', 'figue']
['figue', 'datte', 'cerise', 'banane', 'pomme']
```

---

## 2. Opérations principales sur les listes

### 2.1 Longueur, appartenance, concaténation, répétition

```python
fruits = ["pomme", "banane", "cerise"]

# len() : nombre d'éléments
print(len(fruits))         # → 3

# in : test d'appartenance
print("banane" in fruits)  # → True
print("kiwi" in fruits)    # → False

# Concaténation
panier = fruits + ["kiwi", "mangue"]
print(panier)              # → ['pomme', 'banane', 'cerise', 'kiwi', 'mangue']

# Répétition
print([0] * 5)             # → [0, 0, 0, 0, 0]
print(["A"] * 3)           # → ['A', 'A', 'A']
```

**Résultat attendu :**
```
3
True
False
['pomme', 'banane', 'cerise', 'kiwi', 'mangue']
[0, 0, 0, 0, 0]
['A', 'A', 'A']
```

### 2.2 Ajouter des éléments : `append()` et `insert()`

```python
liste = ["pomme", "banane"]
print("Départ :", liste)

# append() : ajoute à la fin
liste.append("cerise")
print("Après append :", liste)      # → ['pomme', 'banane', 'cerise']

# insert( position, valeur ) : insère à un index précis
liste.insert(0, "abricot")          # insère au début
print("Après insert(0):", liste)    # → ['abricot', 'pomme', 'banane', 'cerise']

liste.insert(2, "kiwi")             # insère à l'index 2
print("Après insert(2):", liste)    # → ['abricot', 'pomme', 'kiwi', 'banane', 'cerise']
```

**Résultat attendu :**
```
Départ : ['pomme', 'banane']
Après append : ['pomme', 'banane', 'cerise']
Après insert(0): ['abricot', 'pomme', 'banane', 'cerise']
Après insert(2): ['abricot', 'pomme', 'kiwi', 'banane', 'cerise']
```

### 2.3 Supprimer des éléments

```python
liste = ["abricot", "pomme", "kiwi", "banane", "cerise"]
print("Départ :", liste)

# remove(valeur) : supprime la PREMIÈRE occurrence
liste.remove("kiwi")
print("Après remove kiwi :", liste)  # → ['abricot', 'pomme', 'banane', 'cerise']

# pop(index) : supprime et retourne l'élément à l'index donné
element = liste.pop(0)               # retire "abricot"
print(f"pop(0) a retourné: {element}")
print("Liste après pop(0):", liste)  # → ['pomme', 'banane', 'cerise']

# pop() sans index : supprime et retourne le DERNIER élément
dernier = liste.pop()
print(f"pop() a retourné: {dernier}")
print("Liste après pop():", liste)   # → ['pomme', 'banane']

# clear() : vide toute la liste
liste.clear()
print("Après clear:", liste)         # → []
```

**Résultat attendu :**
```
Départ : ['abricot', 'pomme', 'kiwi', 'banane', 'cerise']
Après remove kiwi : ['abricot', 'pomme', 'banane', 'cerise']
pop(0) a retourné: abricot
Liste après pop(0): ['pomme', 'banane', 'cerise']
pop() a retourné: cerise
Liste après pop(): ['pomme', 'banane']
Après clear: []
```

> **⚠️ Piège courant avec `remove()` :** Si l'élément n'existe pas, Python lève une erreur `ValueError`. Vérifiez toujours avec `in` avant de supprimer.

### 2.4 Modifier un élément existant

```python
fruits = ["pomme", "banane", "cerise"]
print("Avant :", fruits)

fruits[1] = "mangue"       # on remplace l'élément à l'index 1
print("Après :", fruits)   # → ['pomme', 'mangue', 'cerise']

# Modification par slicing
fruits[::2] = ["kiwi", "datte"]  # modifie les indices pairs
print("Final :", fruits)   # → ['kiwi', 'mangue', 'datte']
```

> **💡 Noter la différence avec les chaînes :** `fruits[1] = "x"` est autorisé sur une liste (mutable) mais interdit sur une chaîne (immuable).

### 2.5 Trier et inverser

```python
nombres = [5, 2, 8, 1, 9, 3]
print("Original :", nombres)

# sort() : trie la liste SUR PLACE (modifie la liste)
nombres.sort()
print("Après sort:", nombres)       # → [1, 2, 3, 5, 8, 9]

# sort(reverse=True) : ordre décroissant
nombres.sort(reverse=True)
print("Tri inverse:", nombres)      # → [9, 8, 5, 3, 2, 1]

# reverse() : inverse l'ordre (sans trier)
nombres.reverse()
print("Après reverse:", nombres)    # → [1, 2, 3, 5, 8, 9]

# sorted() : retourne une NOUVELLE liste triée (ne modifie pas l'originale)
original = [3, 1, 4, 1, 5]
triee = sorted(original)
print("Original:", original)        # → [3, 1, 4, 1, 5] (inchangé)
print("Triée:", triee)              # → [1, 1, 3, 4, 5]
```

**Résultat attendu :**
```
Original : [5, 2, 8, 1, 9, 3]
Après sort: [1, 2, 3, 5, 8, 9]
Tri inverse: [9, 8, 5, 3, 2, 1]
Après reverse: [1, 2, 3, 5, 8, 9]
Original: [3, 1, 4, 1, 5]
Triée: [1, 1, 3, 4, 5]
```

> **💡 Astuce :** `sort()` modifie la liste d'origine. `sorted()` laisse l'originale intacte et retourne une nouvelle liste. Choisissez selon votre besoin.

### 2.6 Index, comptage et étendue

```python
nombres = [10, 20, 30, 20, 40, 20, 50]

# index(valeur) : trouve l'index de la première occurrence
print(nombres.index(20))           # → 1
print(nombres.index(40))           # → 4
# print(nombres.index(99))         # ❌ ValueError: 99 not in list

# count(valeur) : nombre d'occurrences
print(nombres.count(20))           # → 3
print(nombres.count(99))           # → 0

# extend(liste) : ajoute tous les éléments d'une autre liste
a = [1, 2, 3]
a.extend([4, 5, 6])
print(a)                           # → [1, 2, 3, 4, 5, 6]

# Équivalent avec +=
b = [1, 2, 3]
b += [4, 5, 6]
print(b)                           # → [1, 2, 3, 4, 5, 6]
```

**Résultat attendu :**
```
1
4
3
0
[1, 2, 3, 4, 5, 6]
[1, 2, 3, 4, 5, 6]
```

---

## 3. Listes comme piles et files

### 3.1 Pile (LIFO — Last In, First Out)

Comme une pile d'assiettes : la dernière qu'on pose est la première qu'on prend.

```python
pile = []

# On empile (push)
pile.append("Action 1")
pile.append("Action 2")
pile.append("Action 3")
print("Pile après ajouts:", pile)    # → ['Action 1', 'Action 2', 'Action 3']

# On dépile (pop) — prend le dernier
derniere = pile.pop()
print(f"Dépilé: {derniere}")         # → Action 3
print("Pile après dépilement:", pile)  # → ['Action 1', 'Action 2']
```

**Résultat attendu :**
```
Pile après ajouts: ['Action 1', 'Action 2', 'Action 3']
Dépilé: Action 3
Pile après dépilement: ['Action 1', 'Action 2']
```

**Application :** système "annuler" (undo) d'un éditeur de texte, historique de navigation.

### 3.2 File (FIFO — First In, First Out)

Comme une file d'attente à la caisse : le premier arrivé est le premier servi.

```python
from collections import deque

file = deque()

# On ajoute à droite
file.append("Client 1")
file.append("Client 2")
file.append("Client 3")
print("File après arrivées:", file)   # → deque(['Client 1', 'Client 2', 'Client 3'])

# On sert par la gauche (premier arrivé)
prochain = file.popleft()
print(f"Servi: {prochain}")           # → Client 1
print("File restante:", file)         # → deque(['Client 2', 'Client 3'])
```

**Résultat attendu :**
```
File après arrivées: deque(['Client 1', 'Client 2', 'Client 3'])
Servi: Client 1
File restante: deque(['Client 2', 'Client 3'])
```

> **💡 Pourquoi `deque` plutôt qu'une liste pour une file ?** Avec une liste, `pop(0)` est lent (tous les éléments doivent être décalés). `deque.popleft()` est instantané (O(1)).

---

## 4. Références vs Copies

### 4.1 Les listes sont des références

En Python, une variable contenant une liste ne stocke pas la liste elle-même, mais une **référence** vers celle-ci.

```python
# Deux noms pour la même liste
a = [1, 2, 3]
b = a              # b référence la MÊME liste que a

print("a:", a)     # → [1, 2, 3]
print("b:", b)     # → [1, 2, 3]

# Modification via b
b.append(4)

print("a:", a)     # → [1, 2, 3, 4]  (a aussi modifié !)
print("b:", b)     # → [1, 2, 3, 4]
```

**Résultat attendu :**
```
a: [1, 2, 3]
b: [1, 2, 3]
a: [1, 2, 3, 4]
b: [1, 2, 3, 4]
```

**Explication :** `a` et `b` pointent vers le **même emplacement mémoire**. Modifier via l'un affecte l'autre.

**Schéma conceptuel :**
```
a ──→ [1, 2, 3, 4]  ←── b
```

### 4.2 Comment faire une vraie copie ?

```python
originale = [1, 2, 3]

# Méthode 1 : copy()
copie1 = originale.copy()

# Méthode 2 : list()
copie2 = list(originale)

# Méthode 3 : slicing [:]
copie3 = originale[:]

# Testons : modifier la copie n'affecte pas l'originale
copie1.append(4)
print("Originale:", originale)     # → [1, 2, 3] (inchangé)
print("Copie 1:", copie1)          # → [1, 2, 3, 4]
```

**Résultat attendu :**
```
Originale: [1, 2, 3]
Copie 1: [1, 2, 3, 4]
```

### 4.3 Copie superficielle vs profonde

```python
# Copie superficielle (shallow copy) : ne copie qu'un niveau
originale = [[1, 2], [3, 4]]
copie = originale.copy()

copie[0].append(99)       # modifier un élément interne
print("Originale:", originale)  # → [[1, 2, 99], [3, 4]]  (modifié aussi !)
print("Copie:", copie)          # → [[1, 2, 99], [3, 4]]
```

Pour une copie complète (deep copy) de structures imbriquées :
```python
import copy
originale = [[1, 2], [3, 4]]
profonde = copy.deepcopy(originale)

profonde[0].append(99)
print("Originale:", originale)   # → [[1, 2], [3, 4]] (inchangé)
print("Profonde:", profonde)     # → [[1, 2, 99], [3, 4]]
```

---

## 5. Les tuples (`tuple`)

### 5.1 Définition et création

Un **tuple** est une collection **ordonnée** et **immuable** (ne peut pas être modifiée après création).

```python
# Avec des parenthèses
coordonnees = (10, 20)
jours = ("lundi", "mardi", "mercredi")

# Sans parenthèses (c'est la virgule qui compte)
point = 3, 4
print(type(point))           # → <class 'tuple'>

# Tuple d'un seul élément (attention à la virgule !)
seul = (5,)                  # tuple avec 1 élément
pas_un_tuple = (5)           # simple entier !
print(type(seul))            # → <class 'tuple'>
print(type(pas_un_tuple))    # → <class 'int'>
```

> **⚠️ Piège courant :** `(5)` n'est PAS un tuple à un élément. La virgule est obligatoire : `(5,)`.

### 5.2 Différence clé : mutable vs immutable

```python
# Une liste peut être modifiée
ma_liste = [1, 2, 3]
ma_liste[0] = 99
print(ma_liste)              # → [99, 2, 3]

# Un tuple ne peut PAS être modifié
mon_tuple = (1, 2, 3)
# mon_tuple[0] = 99         # ❌ TypeError: 'tuple' object does not support item assignment
```

### 5.3 Quand utiliser un tuple plutôt qu'une liste ?

| Scénario | Liste | Tuple |
|----------|-------|-------|
| Données qui changent | ✅ | ❌ |
| Clé de dictionnaire | ❌ | ✅ |
| Retour de fonction | ✅ | ✅ (léger) |
| Coordonnées fixes | ❌ | ✅ |
| Performance optimale | ❌ | ✅ (un peu plus rapide) |

```python
# Exemple : coordonnées GPS (ne change jamais)
position = (48.8566, 2.3522)   # Paris

# Exemple : jour de la semaine (ne change pas)
jours = ("lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche")

# Exemple : retour multiple d'une fonction
def diviser(a, b):
    quotient = a // b
    reste = a % b
    return quotient, reste    # retourne un tuple

resultat = diviser(17, 5)
print(resultat)               # → (3, 2)
q, r = resultat
print(f"Quotient: {q}, Reste: {r}")  # → Quotient: 3, Reste: 2
```

### 5.4 Opérations possibles sur un tuple

```python
t = (10, 20, 30, 40, 20)

# Accès par index
print(t[0])                  # → 10
print(t[-1])                 # → 40

# Slicing (retourne un nouveau tuple)
print(t[1:3])                # → (20, 30)

# len(), in, count(), index()
print(len(t))                # → 5
print(20 in t)               # → True
print(t.count(20))           # → 2
print(t.index(40))           # → 3

# Concaténation (crée un nouveau tuple)
t2 = t + (50, 60)
print(t2)                    # → (10, 20, 30, 40, 20, 50, 60)
```

**Résultat attendu :**
```
10
40
(20, 30)
5
True
2
3
(10, 20, 30, 40, 20, 50, 60)
```

---

## 6. Déballage (unpacking)

### 6.1 Déballage simple

```python
# Avec un tuple
coordonnees = (3, 4)
x, y = coordonnees
print(f"x={x}, y={y}")       # → x=3, y=4

# Avec une liste
fruits = ["pomme", "banane", "cerise"]
a, b, c = fruits
print(a, b, c)               # → pomme banane cerise
```

### 6.2 Déballage avancé (avec `*`)

```python
# Le * capte les éléments restants dans une liste
premier, *reste = [1, 2, 3, 4, 5]
print(premier)               # → 1
print(reste)                 # → [2, 3, 4, 5]

# * au milieu
premier, *milieu, dernier = [1, 2, 3, 4, 5]
print(premier)               # → 1
print(milieu)                # → [2, 3, 4]
print(dernier)               # → 5

# Ignorer des éléments avec _
_, deuxieme, *_ = [10, 20, 30, 40]
print(deuxieme)              # → 20
```

**Résultat attendu :**
```
1
[2, 3, 4, 5]
1
[2, 3, 4]
5
20
```

> **💡 Astuce :** Le `_` en Python est une convention pour "je ne vais pas utiliser cette valeur". Utile lors du déballage.

### 6.3 Échange de valeurs revisité

```python
# Sans variable temporaire (Python uniquement)
a, b = 1, 2
a, b = b, a
print(a, b)                  # → 2 1

# Ceci est en réalité un déballage de tuple !
# a, b = b, a  équivaut à : (a, b) = (b, a)
```

---

## 7. Compréhension de listes (list comprehension)

### 7.1 Syntaxe de base

La **compréhension de liste** permet de créer une liste en une seule ligne, de façon élégante et performante.

```python
# Syntaxe : [expression for élément in séquence]

# Exemple 1 : les carrés de 0 à 9
carres = [x ** 2 for x in range(10)]
print(carres)                # → [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Exemple 2 : doublons chaque nombre
doubles = [x * 2 for x in [1, 2, 3, 4, 5]]
print(doubles)               # → [2, 4, 6, 8, 10]

# Exemple 3 : extrait les premières lettres
mots = ["pomme", "banane", "cerise"]
premieres = [mot[0] for mot in mots]
print(premieres)             # → ['p', 'b', 'c']
```

**Résultat attendu :**
```
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
[2, 4, 6, 8, 10]
['p', 'b', 'c']
```

### 7.2 Avec condition

```python
# Syntaxe : [expression for élément in séquence if condition]

# Nombres pairs de 0 à 20
pairs = [x for x in range(21) if x % 2 == 0]
print(pairs)                 # → [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# Mots de plus de 5 lettres
mots = ["python", "java", "javascript", "c", "ruby", "rust"]
longs = [mot.upper() for mot in mots if len(mot) > 4]
print(longs)                 # → ['PYTHON', 'JAVASCRIPT', 'RUST']
```

**Résultat attendu :**
```
[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
['PYTHON', 'JAVASCRIPT', 'RUST']
```

### 7.3 Comparaison : boucle classique vs compréhension

```python
# Approche classique (boucle for)
carres = []
for x in range(10):
    carres.append(x ** 2)

# Approche compréhension (équivalente)
carres2 = [x ** 2 for x in range(10)]

print(carres == carres2)     # → True
```

La compréhension est plus courte, plus lisible (une fois qu'on y est habitué) et légèrement plus rapide.

---

## 8. Cas pratique : Gestionnaire de liste de courses

```python
courses = []

while True:
    print(f"\n=== Liste de courses ({len(courses)} articles) ===")
    print("1. Ajouter un article")
    print("2. Supprimer un article")
    print("3. Afficher la liste")
    print("4. Vider la liste")
    print("5. Quitter")

    choix = input("Votre choix : ")

    if choix == "1":
        article = input("Article à ajouter : ")
        courses.append(article)
        print(f"✅ '{article}' ajouté !")
    elif choix == "2":
        article = input("Article à supprimer : ")
        if article in courses:
            courses.remove(article)
            print(f"✅ '{article}' supprimé !")
        else:
            print(f"❌ '{article}' n'est pas dans la liste")
    elif choix == "3":
        if courses:
            for i, article in enumerate(courses, 1):
                print(f"  {i}. {article}")
        else:
            print("  (liste vide)")
    elif choix == "4":
        courses.clear()
        print("✅ Liste vidée !")
    elif choix == "5":
        print("Au revoir !")
        break
    else:
        print("❌ Choix invalide")
```

**Résultat attendu (exécution) :**
```
=== Liste de courses (0 articles) ===
1. Ajouter un article
...
```

---

## 9. À retenir — Résumé du module

| Concept | À retenir |
|---------|-----------|
| `list` | Ordonnée, mutable, hétérogène — `[1, 2, 3]` |
| `tuple` | Ordonné, immuable — `(1, 2, 3)` |
| Slicing | `liste[debut:fin:pas]` |
| `append(x)` | Ajoute x à la fin |
| `insert(i, x)` | Insère x à la position i |
| `pop(i)` | Supprime et retourne l'élément à i (ou dernier) |
| `remove(x)` | Supprime la première occurrence de x |
| `sort()` / `sorted()` | Trie sur place / retourne une nouvelle liste |
| `copy()` / `[:]` | Fait une copie superficielle |
| `a, b = b, a` | Échange de valeurs |
| `*reste` | Déballage avec capture |
| `[x**2 for x in range(10)]` | Compréhension de liste |
| Pile : `append() + pop()` | LIFO |
| File : `deque.append() + popleft()` | FIFO |

---

## 10. Exercices

### Exercice 1 : Gestion de notes
Demandez 5 notes à l'utilisateur, stockez-les dans une liste, puis affichez :
- La moyenne
- La note maximale et la note minimale
- Les notes triées

### Exercice 2 : Filtre de mots
Demandez une phrase à l'utilisateur. Affichez uniquement les mots de plus de 3 lettres, en majuscules (utilisez une compréhension de liste).

### Exercice 3 : Suppression des doublons
Écrivez un script qui prend une liste avec des doublons et retourne une liste sans doublons (tout en gardant l'ordre).

**Indice :** Parcourez la liste et construisez une nouvelle liste en vérifiant `if element not in nouvelle_liste`.

### Exercice 4 : Pile d'actions (undo)
Créez un petit programme qui propose un menu :
1. "écrire X" → ajoute X à une pile
2. "annuler" → dépile la dernière action
3. "historique" → affiche la pile
4. "quitter"

### Exercice 5 : Analyse de notes avec tuples
Créez une liste de tuples `(nom, note)`. Affichez le classement des élèves trié par note (décroissant).

---

## Progression

```
Module 1: ✅ Introduction
Module 2: ✅ Variables et types
Module 3: ✅ Strings
Module 4: ✅ Listes et Tuples  ← Vous êtes ici
Module 5: ⬜ Dictionnaires et Ensembles
Module 6: ⬜ Contrôle de flux
```
