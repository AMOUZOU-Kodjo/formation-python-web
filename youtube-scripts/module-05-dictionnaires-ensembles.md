# Vidéo #5 — Dictionnaires et ensembles

## Informations générales
- **Titre** : Python #5 — Dictionnaires et ensembles (Formation Complète)
- **Durée** : ~14 min
- **Miniature** : `banners/05-dictionnaires-et-ensembles.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 5 — DICTIONNAIRES & ENSEMBLES

> "Bienvenue dans le module 5. Les dictionnaires stockent des données clé-valeur, les ensembles des collections sans doublon. Deux structures puissantes et complémentaires."

---

### 0:30 — Création de dictionnaires (2 min)
**Texte écran :** CRÉER UN DICTIONNAIRE

```python
# Avec accolades
eleve = {
    "nom": "Alice",
    "age": 25,
    "note": 16.5
}

# Avec dict()
autres = dict(nom="Bob", age=30)

print(eleve["nom"])        # Alice
print(eleve.get("note"))   # 16.5
print(eleve.get("classe", "N/A"))  # "N/A"
```

> "Un dictionnaire associe une clé unique à une valeur. L'accès se fait avec `[]` ou `get()`. `get()` est plus sûr car il ne lève pas d'erreur si la clé n'existe pas."

---

### 2:30 — Modification et ajout (1 min 30)
**Texte écran :** MODIFIER UN DICTIONNAIRE

```python
eleve = {"nom": "Alice", "age": 25}

# Ajouter / modifier
eleve["note"] = 16.5       # ajout
eleve["age"] = 26          # modification

# Supprimer
del eleve["note"]          # supprime la clé
note = eleve.pop("age")    # supprime et retourne la valeur

# Mise à jour multiple
eleve.update({"nom": "Alice B.", "classe": "Terminale"})

print(eleve)
```

> "Les dictionnaires sont mutables. On peut ajouter, modifier et supprimer des paires clé-valeur dynamiquement."

---

### 4:00 — Méthodes keys, values, items (2 min)
**Texte écran :** ITÉRER SUR UN DICT

```python
eleve = {"nom": "Alice", "age": 25, "note": 16.5}

# Clés
print(eleve.keys())    # dict_keys(["nom", "age", "note"])

# Valeurs
print(eleve.values())  # dict_values(["Alice", 25, 16.5])

# Paires
print(eleve.items())   # dict_items([("nom", "Alice"), ("age", 25), ("note", 16.5)])

# Itération classique
for cle, valeur in eleve.items():
    print(f"{cle} : {valeur}")

# Vérifier l'existence
if "nom" in eleve:
    print("Clé 'nom' existe")
```

> "`keys()`, `values()`, `items()` retournent des vues dynamiques. Parfaites pour l'itération."

---

### 6:00 — Ensembles (set) : création (2 min)
**Texte écran :** LES ENSEMBLES (SET)

```python
# Création
fruits = {"pomme", "banane", "cerise"}
nombres = set([1, 2, 2, 3, 3, 4])  # {1, 2, 3, 4}

# Pas d'ordre, pas d'index
fruits.add("kiwi")
fruits.remove("banane")

# Supprimer les doublons d'une liste
liste = [1, 2, 2, 3, 3, 4, 4, 5]
uniques = list(set(liste))
print(uniques)  # [1, 2, 3, 4, 5] (ordre non garanti)
```

> "Les ensembles ne contiennent pas de doublons et ne sont pas ordonnés. Pas d'index, pas d'accès par position."

---

### 8:00 — Union, intersection, différence (2 min)
**Texte écran :** OPÉRATIONS SUR LES ENSEMBLES

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# Union
print(a | b)          # {1, 2, 3, 4, 5, 6}
print(a.union(b))

# Intersection
print(a & b)          # {3, 4}
print(a.intersection(b))

# Différence
print(a - b)          # {1, 2}
print(a.difference(b))

# Différence symétrique
print(a ^ b)          # {1, 2, 5, 6}
```

> "Les opérateurs `|`, `&`, `-`, `^` sont très pratiques. Plus élégant que des boucles."

---

### 10:00 — Cas d'usage : compter, filtrer (1 min 30)
**Texte écran :** CAS PRATIQUES

```python
# Compter les occurrences
texte = "python est un langage python puissant"
mots = texte.split()
compteur = {}
for mot in mots:
    compteur[mot] = compteur.get(mot, 0) + 1

print(compteur)
# {"python": 2, "est": 1, "un": 1, "langage": 1, "puissant": 1}

# Enlever les doublons tout en gardant l'ordre
mots_uniques = list(dict.fromkeys(mots))
print(mots_uniques)
```

---

### 11:30 — Dict comprehension (aperçu) (1 min)
**Texte écran :** DICT COMPREHENSION

```python
# Carrés en dictionnaire
carres = {x: x**2 for x in range(6)}
print(carres)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Inverser clés-valeurs
original = {"a": 1, "b": 2, "c": 3}
inverse = {v: k for k, v in original.items()}
print(inverse)  # {1: "a", 2: "b", 3: "c"}
```

---

### 12:30 — Frozen set (30s)
**Texte écran :** FROZENSET

```python
# Version immuable d'un set
frozen = frozenset([1, 2, 3, 3, 4])
print(frozen)          # frozenset({1, 2, 3, 4})
# frozen.add(5)        # ERREUR ! immuable

# Utilisable comme clé de dict
groupes = {frozenset([1, 2]): "groupe A"}
```

---

### 13:00 — Conclusion (30s)
> "Module 6 : on attaque le contrôle de flux avec if, elif, else et match/case."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 5 : Dictionnaires et ensembles

Au programme :
00:00 — Introduction
00:30 — Création de dictionnaires
02:30 — Modification et ajout
04:00 — Méthodes keys, values, items
06:00 — Ensembles (set) : création
08:00 — Union, intersection, différence
10:00 — Cas d'usage : compter, filtrer
11:30 — Dict comprehension (aperçu)
12:30 — Frozen set
13:30 — Prochain module

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

#python #formationpython #dictionnaires #ensembles #set #dict
```

## Tags YouTube
```
python, formation python, dictionnaires python, sets python, ensembles python, apprendre python, cours python, python débutant, programmation python, dict comprehension, frozenset
```
