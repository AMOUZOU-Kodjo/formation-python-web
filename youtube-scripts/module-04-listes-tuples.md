# Vidéo #4 — Listes et tuples

## Informations générales
- **Titre** : Python #4 — Listes et tuples (Formation Complète)
- **Durée** : ~14 min
- **Miniature** : `banners/04-listes-et-tuples.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 4 — LISTES & TUPLES

> "Bienvenue dans le module 4. Après les chaînes de caractères, on attaque les listes et les tuples. Deux structures de données fondamentales pour stocker des collections d'éléments."

---

### 0:30 — Création de listes (2 min)
**Texte écran :** CRÉER DES LISTES

```python
# Liste vide
ma_liste = []

# Avec des éléments
fruits = ["pomme", "banane", "cerise"]
nombres = [1, 2, 3, 4, 5]
mixte = ["texte", 42, 3.14, True]

print(fruits)    # ["pomme", "banane", "cerise"]
print(len(fruits))  # 3
```

**Point clé :**
- Les listes sont ordonnées, mutables, et acceptent tout type
- `len()` donne la taille

---

### 2:30 — Méthodes des listes (3 min)
**Texte écran :** MÉTHODES ESSENTIELLES

```python
fruits = ["pomme", "banane", "cerise"]

# Ajouter
fruits.append("kiwi")           # ["pomme", "banane", "cerise", "kiwi"]
fruits.insert(1, "mangue")      # ["pomme", "mangue", "banane", "cerise", "kiwi"]

# Supprimer
fruits.remove("banane")         # enlève le premier "banane"
dernier = fruits.pop()          # enlève et retourne le dernier
element = fruits.pop(1)         # enlève l'index 1

# Trier
fruits.sort()                   # tri alphabétique (modifie la liste)
fruits.reverse()                # inverse l'ordre

print(fruits)
```

> "`append` ajoute à la fin, `insert` à une position, `remove` par valeur, `pop` par index. `sort` et `reverse` modifient la liste sur place."

---

### 5:30 — Indexation et slicing (2 min)
**Texte écran :** INDEXATION & SLICING

```python
liste = ["a", "b", "c", "d", "e"]
# Index :  0    1    2    3    4
#         -5   -4   -3   -2   -1

print(liste[0])      # a
print(liste[-1])     # e
print(liste[1:4])    # ["b", "c", "d"]
print(liste[:3])     # ["a", "b", "c"]
print(liste[::2])    # ["a", "c", "e"]
print(liste[::-1])   # ["e", "d", "c", "b", "a"]
```

> "Même principe que pour les strings — l'indexation et le slicing fonctionnent à l'identique."

---

### 7:30 — Les tuples (2 min 30)
**Texte écran :** LES TUPLES

```python
# Tuple : immuable
point = (3, 4)
couleur = (255, 0, 0)

print(point[0])      # 3
point[0] = 5         # ERREUR ! TypeError

# Tuple à un élément
tuple_un = (42,)     # virgule obligatoire

# Unpacking
x, y = point
print(x, y)          # 3 4

# Retour multiple
def min_max(liste):
    return min(liste), max(liste)

mini, maxi = min_max([3, 7, 2, 9])
print(mini, maxi)    # 2 9
```

> "Les tuples sont comme des listes mais immuables. On ne peut pas modifier un tuple après sa création. Parfaits pour des données qui ne doivent pas changer."

---

### 10:00 — Méthodes courantes (1 min 30)
**Texte écran :** FONCTIONS UTILES

```python
nombres = [10, 5, 8, 3, 12]

len(nombres)        # 5
min(nombres)        # 3
max(nombres)        # 12
sum(nombres)        # 38
sorted(nombres)     # [3, 5, 8, 10, 12] (ne modifie pas)

# Appartenance
3 in nombres        # True
7 in nombres        # False
7 not in nombres    # True
```

> "`len`, `min`, `max`, `sum` sont des fonctions natives qui marchent sur les listes. `sorted()` retourne une nouvelle liste triée sans modifier l'originale."

---

### 11:30 — Compréhensions de listes (aperçu) (1 min 30)
**Texte écran :** COMPRÉHENSION DE LISTE

```python
# Carrés des nombres de 0 à 9
carres = [x**2 for x in range(10)]
print(carres)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Avec filtre
pairs = [x for x in range(20) if x % 2 == 0]
print(pairs)   # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```

> "On y consacrera un module entier plus tard, mais voici un avant-goût : la compréhension de liste permet de créer une liste en une seule ligne."

---

### 13:00 — Comparaison listes vs tuples (1 min)
**Texte écran :** LISTE vs TUPLE

| Critère | Liste | Tuple |
|---------|-------|-------|
| Mutabilité | ✅ modifiable | ❌ immuable |
| Syntaxe | `[]` | `()` |
| Vitesse | plus lent | plus rapide |
| Usages | collections dynamiques | données fixes, clés de dict |

```python
# Tuple comme clé de dictionnaire
coords = {(0, 0): "origine", (1, 2): "point A"}
print(coords[(0, 0)])  # "origine"
```

---

### 14:00 — Conclusion
> "Module 5 : on continue avec les dictionnaires et les ensembles."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 4 : Listes et tuples

Au programme :
00:00 — Introduction
00:30 — Création de listes
02:30 — Méthodes des listes (append, remove, sort, pop)
05:30 — Indexation et slicing
07:30 — Les tuples (immuabilité, unpacking)
10:00 — Méthodes courantes (len, min, max, sum, in)
11:30 — Compréhensions de listes (aperçu)
13:00 — Comparaison listes vs tuples
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

#python #formationpython #listes #tuples #datastructures
```

## Tags YouTube
```
python, formation python, listes python, tuples python, apprendre python, cours python, python débutant, programmation python, slicing python, compréhension liste
```
