# Module 5 : Dictionnaires et Ensembles

---

## Objectifs du module

À la fin de ce module, vous serez capable de :
- Créer et manipuler des dictionnaires (paires clé → valeur)
- Accéder aux valeurs et gérer les clés manquantes avec `.get()`
- Parcourir un dictionnaire avec `.items()`, `.keys()`, `.values()`
- Utiliser `defaultdict` et `Counter` de la bibliothèque `collections`
- Créer et manipuler des ensembles (set)
- Effectuer des opérations ensemblistes (union, intersection, différence)
- Choisir la structure de données adaptée à chaque situation
- Écrire des compréhensions de dictionnaire

---

## 1. Les dictionnaires (`dict`)

### 1.1 Qu'est-ce qu'un dictionnaire ?

Un **dictionnaire** est une collection **non ordonnée** de paires **clé → valeur**. Chaque clé est unique et sert à retrouver sa valeur associée.

**Analogogie du monde réel :** Un dictionnaire de langue. La "clé" est le mot (ex: "maison") et la "valeur" est la définition. On cherche par le mot, pas par la position.

```python
personne = {
    "nom": "Dupont",
    "prenom": "Alice",
    "age": 30,
    "actif": True
}
print(personne)
# → {'nom': 'Dupont', 'prenom': 'Alice', 'age': 30, 'actif': True}
```

**Structure visuelle :**
```
┌──────────────┬──────────────┐
│    CLÉ       │   VALEUR     │
├──────────────┼──────────────┤
│ "nom"        │ "Dupont"     │
│ "prenom"     │ "Alice"      │
│ "age"        │ 30           │
│ "actif"      │ True         │
└──────────────┴──────────────┘
```

### 1.2 Contraintes sur les clés

Les clés doivent être **immuables** (ne pas pouvoir changer) :
- ✅ Accepté : `str`, `int`, `float`, `tuple`, `bool`
- ❌ Refusé : `list`, `dict`, `set`

```python
# ✅ Clés valides
d = {
    "nom": "Alice",      # str
    42: "réponse",       # int
    3.14: "pi",          # float
    (1, 2): "point",     # tuple
}

# ❌ Clés invalides
# d = {["a", "b"]: "test"}  # TypeError: unhashable type: 'list'
```

### 1.3 Création d'un dictionnaire

```python
# Méthode 1 : accolades (recommandée)
notes = {"Alice": 15, "Bob": 12, "Charlie": 18}

# Méthode 2 : fonction dict()
notes2 = dict(Alice=15, Bob=12, Charlie=18)  # les clés deviennent des str

# Méthode 3 : à partir de paires
paires = [("Alice", 15), ("Bob", 12)]
notes3 = dict(paires)

# Dictionnaire vide
vide = {}
print(type(vide))          # → <class 'dict'>
```

---

## 2. Opérations sur les dictionnaires

### 2.1 Accès aux valeurs — attention aux erreurs

```python
personne = {"nom": "Dupont", "prenom": "Alice", "age": 30}

# Accès direct avec [clé]
print(personne["nom"])     # → Dupont
print(personne["age"])     # → 30

# Si la clé n'existe pas → erreur !
# print(personne["ville"])  # ❌ KeyError: 'ville'
```

### 2.2 Accès sécurisé avec `.get()`

```python
# .get(clé) → retourne la valeur ou None
print(personne.get("nom"))        # → Dupont
print(personne.get("ville"))      # → None (pas d'erreur !)

# .get(clé, valeur_par_défaut) → personnalise la valeur par défaut
print(personne.get("ville", "Inconnue"))  # → Inconnue
print(personne.get("nom", "Inconnu"))     # → Dupont (la clé existe)
```

> **💡 Règle d'or :** Toujours utiliser `.get()` quand on n'est pas sûr qu'une clé existe. `dict[clé]` est risqué.

### 2.3 Ajout et modification

```python
personne = {"nom": "Dupont"}

# Ajout d'une nouvelle clé
personne["prenom"] = "Alice"
print(personne)            # → {'nom': 'Dupont', 'prenom': 'Alice'}

# Modification d'une clé existante
personne["nom"] = "Martin"
print(personne)            # → {'nom': 'Martin', 'prenom': 'Alice'}

# .update() : ajoute ou modifie plusieurs clés à la fois
personne.update({"age": 30, "ville": "Paris", "nom": "Durand"})
print(personne)
# → {'nom': 'Durand', 'prenom': 'Alice', 'age': 30, 'ville': 'Paris'}
```

**Résultat attendu :**
```
{'nom': 'Dupont', 'prenom': 'Alice'}
{'nom': 'Martin', 'prenom': 'Alice'}
{'nom': 'Durand', 'prenom': 'Alice', 'age': 30, 'ville': 'Paris'}
```

### 2.4 Suppression

```python
personne = {"nom": "Dupont", "prenom": "Alice", "age": 30, "actif": True}

# del : supprime une clé
del personne["actif"]
print(personne)            # → {'nom': 'Dupont', 'prenom': 'Alice', 'age': 30}

# pop(clé) : supprime et retourne la valeur
age = personne.pop("age")
print(f"Âge supprimé : {age}")     # → Âge supprimé : 30
print(personne)                     # → {'nom': 'Dupont', 'prenom': 'Alice'}

# clear() : vide tout le dictionnaire
personne.clear()
print(personne)                     # → {}
```

**Résultat attendu :**
```
{'nom': 'Dupont', 'prenom': 'Alice', 'age': 30}
Âge supprimé : 30
{'nom': 'Dupont', 'prenom': 'Alice'}
{}
```

### 2.5 Test d'appartenance (sur les clés)

```python
personne = {"nom": "Dupont", "prenom": "Alice", "age": 30}

print("nom" in personne)         # → True
print("ville" in personne)       # → False
print("Dupont" in personne)      # → False ! (valeur, pas clé)

# Vérifier sur les valeurs
print("Dupont" in personne.values())  # → True
```

> **⚠️ Piège courant :** `in` sur un dictionnaire cherche parmi les **clés**, pas les valeurs.

### 2.6 Parcourir un dictionnaire

```python
personne = {"nom": "Dupont", "prenom": "Alice", "age": 30}

# Parcourir les clés
for cle in personne:
    print(f"Clé : {cle}")

print("---")

# Parcourir les paires clé-valeur
for cle, valeur in personne.items():
    print(f"{cle} → {valeur}")

print("---")

# Parcourir uniquement les valeurs
for valeur in personne.values():
    print(f"Valeur : {valeur}")

print("---")

# Parcourir uniquement les clés
for cle in personne.keys():
    print(f"Clé : {cle}")
```

**Résultat attendu :**
```
Clé : nom
Clé : prenom
Clé : age
---
nom → Dupont
prenom → Alice
age → 30
---
Valeur : Dupont
Valeur : Alice
Valeur : 30
---
Clé : nom
Clé : prenom
Clé : age
```

---

## 3. Méthodes avancées des dictionnaires

### 3.1 setdefault et la valeur par défaut

```python
# setdefault : si la clé n'existe pas, l'ajoute avec la valeur par défaut
inventaire = {"pommes": 5, "bananes": 3}

# Clé qui existe : retourne la valeur (ne modifie pas)
resultat = inventaire.setdefault("pommes", 0)
print(resultat)                 # → 5
print(inventaire)               # → {'pommes': 5, 'bananes': 3} (inchangé)

# Clé qui n'existe pas : crée la paire avec la valeur par défaut
resultat = inventaire.setdefault("cerises", 0)
print(resultat)                 # → 0
print(inventaire)               # → {'pommes': 5, 'bananes': 3, 'cerises': 0}
```

### 3.2 fromkeys : créer un dictionnaire à partir de clés

```python
# Créer un dictionnaire avec des clés et une valeur par défaut
clés = ["Alice", "Bob", "Charlie"]
notes = dict.fromkeys(clés, 0)
print(notes)                    # → {'Alice': 0, 'Bob': 0, 'Charlie': 0}

# Attention aux valeurs mutables !
# dict.fromkeys(..., []) crée la MÊME liste pour toutes les clés
d = dict.fromkeys(["a", "b", "c"], [])
d["a"].append(1)
print(d)                        # → {'a': [1], 'b': [1], 'c': [1]}  (piège !)
```

> **⚠️ Piège avec `fromkeys` :** La valeur par défaut est un seul objet partagé. Utilisez une compréhension pour éviter ça.

### 3.3 Fusion de dictionnaires (Python 3.9+)

```python
d1 = {"a": 1, "b": 2}
d2 = {"b": 3, "c": 4}

# Opérateur | (Python 3.9+)
fusion = d1 | d2
print(fusion)                # → {'a': 1, 'b': 3, 'c': 4}

# |= pour modifier sur place
d1 |= d2
print(d1)                    # → {'a': 1, 'b': 3, 'c': 4}
```

Avant Python 3.9, on utilisait :
```python
fusion = {**d1, **d2}        # décompression de dictionnaire
print(fusion)                # → {'a': 1, 'b': 3, 'c': 4}
```

---

## 4. defaultdict et Counter (module collections)

### 4.1 `defaultdict` — un dictionnaire avec valeur par défaut

`defaultdict` évite les vérifications `if clé in dict` : si une clé manque, elle est automatiquement créée avec la valeur par défaut du type donné.

```python
from collections import defaultdict

# Comptage de lettres avec un dict normal
texte = "abracadabra"
compteur_normal = {}
for lettre in texte:
    if lettre in compteur_normal:
        compteur_normal[lettre] += 1
    else:
        compteur_normal[lettre] = 1
print(compteur_normal)
# → {'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}

# Avec defaultdict(int) — int() donne 0 par défaut
compteur = defaultdict(int)  # int() → 0
for lettre in texte:
    compteur[lettre] += 1     # pas besoin de vérifier l'existence !
print(dict(compteur))
# → {'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}
```

**Résultat attendu :**
```
{'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}
{'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}
```

Autres usages de `defaultdict` :

```python
# defaultdict(list) → list() donne [] par défaut
groupes = defaultdict(list)
noms = [("A", "Alice"), ("B", "Bob"), ("A", "Alex"), ("C", "Charlie")]
for lettre, nom in noms:
    groupes[lettre].append(nom)
print(dict(groupes))
# → {'A': ['Alice', 'Alex'], 'B': ['Bob'], 'C': ['Charlie']}

# defaultdict(set) → set() donne set() par défaut
# (pour éviter les doublons automatiquement)
```

### 4.2 `Counter` — compter les éléments comme un pro

```python
from collections import Counter

texte = "abracadabra"
compteur = Counter(texte)
print(compteur)              # → Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})

# Les 2 lettres les plus fréquentes
print(compteur.most_common(2))   # → [('a', 5), ('b', 2)]

# Additionner des compteurs
c1 = Counter("aab")
c2 = Counter("abc")
print(c1 + c2)               # → Counter({'a': 3, 'b': 2, 'c': 1})
print(c1 - c2)               # → Counter({'a': 1})  (soustraction, pas de négatifs)
```

**Résultat attendu :**
```
Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})
[('a', 5), ('b', 2)]
Counter({'a': 3, 'b': 2, 'c': 1})
Counter({'a': 1})
```

> **💡 Counter est idéal pour :** analyser des textes, détecter des anomalies, trouver les mots les plus fréquents, etc.

---

## 5. Les ensembles (`set`)

### 5.1 Qu'est-ce qu'un ensemble ?

Un **ensemble** (set) est une collection **non ordonnée** d'éléments **uniques**.

**Analogogie du monde réel :** Un sac de billes. Chaque couleur de bille n'apparaît qu'une seule fois. L'ordre ne compte pas.

```python
# Création avec des accolades
couleurs = {"rouge", "vert", "bleu"}
print(couleurs)              # → {'vert', 'bleu', 'rouge'} (ordre quelconque)

# Création avec set()
nombres = set([1, 2, 2, 3, 3, 3])  # les doublons sont supprimés
print(nombres)               # → {1, 2, 3}

# Ensemble vide (attention !)
# vide = {}      # ❌ c'est un dictionnaire vide !
vide = set()     # ✅ ensemble vide
print(type({}))             # → <class 'dict'>
print(type(set()))          # → <class 'set'>
```

> **⚠️ Piège courant :** `{}` crée un dictionnaire vide, pas un ensemble. Utilisez `set()` pour un ensemble vide.

### 5.2 Propriétés des ensembles

```python
# Les doublons sont automatiquement supprimés
nombres = {1, 2, 2, 3, 3, 3, 4, 4, 4, 4}
print(nombres)               # → {1, 2, 3, 4}

# Les ensembles sont non ordonnés
# print(nombres[0])          # ❌ TypeError: 'set' object is not subscriptable

# Test d'appartenance très rapide
print(3 in nombres)          # → True
print(99 in nombres)         # → False

# On ne peut mettre que des éléments immuables
# {{1, 2}}                  # ❌ TypeError: unhashable type: 'set'
```

### 5.3 Ajout et suppression

```python
couleurs = {"rouge", "vert"}

# add() : ajoute un élément
couleurs.add("bleu")
print(couleurs)              # → {'rouge', 'vert', 'bleu'}

# add() avec un doublon : ne fait rien (pas d'erreur)
couleurs.add("rouge")
print(couleurs)              # → {'rouge', 'vert', 'bleu'} (inchangé)

# remove() : supprime un élément (erreur si absent)
couleurs.remove("vert")
print(couleurs)              # → {'rouge', 'bleu'}
# couleurs.remove("jaune")   # ❌ KeyError: 'jaune'

# discard() : supprime sans erreur si absent
couleurs.discard("jaune")    # pas d'erreur !
print(couleurs)              # → {'rouge', 'bleu'}

# pop() : supprime et retourne un élément ARBITRAIRE
element = couleurs.pop()
print(f"Élément retiré : {element}")

# clear() : vide l'ensemble
couleurs.clear()
print(couleurs)              # → set()
```

### 5.4 Opérations ensemblistes

```python
a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

# Union : éléments dans A OU B
print(a | b)                 # → {1, 2, 3, 4, 5, 6, 7, 8}
print(a.union(b))            # (méthode équivalente)

# Intersection : éléments dans A ET B
print(a & b)                 # → {4, 5}
print(a.intersection(b))     # (méthode équivalente)

# Différence : éléments dans A mais PAS dans B
print(a - b)                 # → {1, 2, 3}
print(a.difference(b))       # (méthode équivalente)

# Différence symétrique : éléments dans A ou B mais pas les deux
print(a ^ b)                 # → {1, 2, 3, 6, 7, 8}
print(a.symmetric_difference(b))
```

**Résultat attendu :**
```
{1, 2, 3, 4, 5, 6, 7, 8}
{4, 5}
{1, 2, 3}
{1, 2, 3, 6, 7, 8}
```

**Schémas visuels :**
```
         Union (|)       Intersection (&)    Différence (-)
    ┌──────┐┌──────┐   ┌──────┐┌──────┐   ┌──────┐┌──────┐
    │1 2 3 ││ 6 7 8│   │     ││     │   │1 2 3 ││     │
    │  4 5 ││4 5   │   │  4 5 ││4 5   │   │      ││     │
    └──────┘└──────┘   └──────┘└──────┘   └──────┘└──────┘
```

### 5.5 Comparaison d'ensembles

```python
a = {1, 2, 3}
b = {1, 2, 3, 4, 5}

# Sous-ensemble : tous les éléments de A sont dans B
print(a.issubset(b))         # → True
print(a <= b)                # → True

# Sur-ensemble : tous les éléments de B sont dans A
print(b.issuperset(a))       # → True
print(b >= a)                # → True

# Disjoints : aucun élément commun
c = {10, 20}
print(a.isdisjoint(c))       # → True
print(a.isdisjoint(b))       # → False
```

**Résultat attendu :**
```
True
True
True
True
True
False
```

---

## 6. Compréhension de dictionnaire (dict comprehension)

### 6.1 Syntaxe de base

```python
# {clé: valeur for élément in séquence}

# Carrés des nombres de 0 à 5
carres = {x: x**2 for x in range(6)}
print(carres)                # → {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Transformer une liste en dictionnaire
mots = ["pomme", "banane", "cerise"]
longueurs = {mot: len(mot) for mot in mots}
print(longueurs)             # → {'pomme': 5, 'banane': 6, 'cerise': 6}
```

### 6.2 Avec condition

```python
# Inverser clé-valeur si la valeur est immuable
original = {"a": 1, "b": 2, "c": 3}
inverse = {v: k for k, v in original.items()}
print(inverse)               # → {1: 'a', 2: 'b', 3: 'c'}

# Filtrer les paires
notes = {"Alice": 15, "Bob": 8, "Charlie": 18, "David": 5}
admis = {nom: note for nom, note in notes.items() if note >= 10}
print(admis)                 # → {'Alice': 15, 'Charlie': 18}
```

**Résultat attendu :**
```
{1: 'a', 2: 'b', 3: 'c'}
{'Alice': 15, 'Charlie': 18}
```

### 6.3 Comparaison : boucle classique vs compréhension

```python
notes = ["Alice:15", "Bob:12", "Charlie:18"]

# Boucle classique
d1 = {}
for entree in notes:
    nom, note = entree.split(":")
    d1[nom] = int(note)

# Compréhension (équivalente)
d2 = {nom: int(note) for entree in notes for nom, note in [entree.split(":")]}

print(d1 == d2)              # → True
```

---

## 7. Les `frozenset`

Un `frozenset` est un ensemble **immuable** : on ne peut pas ajouter ou supprimer des éléments après création.

```python
# frozenset crée un ensemble "gelé"
immutable = frozenset([1, 2, 3, 3, 3])
print(immutable)             # → frozenset({1, 2, 3})

# immutable.add(4)           # ❌ AttributeError: 'frozenset' object has no attribute 'add'

# Utile : peut servir de clé de dictionnaire (contrairement à set)
dictionnaire = {
    frozenset({"a", "b"}): "valeur_ab",
    frozenset({"c", "d"}): "valeur_cd"
}
print(dictionnaire[frozenset({"a", "b"})])  # → valeur_ab
```

---

## 8. Quand utiliser quelle structure ?

```python
# Résumé des structures de données

# 📋 LISTE : ordre important, doublons autorisés
etudiants = ["Alice", "Bob", "Alice"]    # OK, Alice apparaît 2 fois

# 📦 TUPLE : données fixes, clé de dictionnaire
coordonnees = (48.85, 2.35)              # ne change pas

# 📚 DICTIONNAIRE : association clé → valeur
notes = {"Alice": 15, "Bob": 12}        # chercher par nom

# 🎯 ENSEMBLE : unicité, tests d'appartenance
mots_connus = {"python", "java", "rust"}  # "est-ce que je connais ce mot ?"
```

**Guide de choix :**
```
J'ai besoin de...
├── stocker plusieurs éléments dans l'ordre ?
│   ├── modifiable ?            → liste
│   └── immuable ?              → tuple
├── associer des clés à des valeurs ?
│   └── dictionnaire
└── garantir l'unicité ?
    ├── modifiable ?             → set
    └── immuable ?               → frozenset
```

---

## 9. Cas pratique : Annuaire téléphonique

```python
annuaire = {}

while True:
    print(f"\n=== Annuaire ({len(annuaire)} contacts) ===")
    print("1. Ajouter un contact")
    print("2. Chercher un contact")
    print("3. Afficher tous les contacts")
    print("4. Supprimer un contact")
    print("5. Quitter")

    choix = input("Votre choix : ")

    if choix == "1":
        nom = input("Nom : ").lower()
        telephone = input("Téléphone : ")
        annuaire[nom] = telephone
        print(f"✅ Contact '{nom}' ajouté")
    elif choix == "2":
        nom = input("Nom à chercher : ").lower()
        telephone = annuaire.get(nom, "❌ Inconnu")
        print(f"📞 {nom}: {telephone}")
    elif choix == "3":
        if annuaire:
            for nom, tel in sorted(annuaire.items()):
                print(f"  📞 {nom}: {tel}")
        else:
            print("  (annuaire vide)")
    elif choix == "4":
        nom = input("Nom à supprimer : ").lower()
        if nom in annuaire:
            del annuaire[nom]
            print(f"✅ '{nom}' supprimé")
        else:
            print(f"❌ '{nom}' introuvable")
    elif choix == "5":
        print("Au revoir !")
        break
    else:
        print("❌ Choix invalide")
```

---

## 10. À retenir — Résumé du module

| Concept | À retenir |
|---------|-----------|
| Dictionnaire | `{"clé": "valeur"}` — clé unique, valeur quelconque |
| `dict.get(clé, défaut)` | Accès sécurisé (pas d'erreur si clé absente) |
| `dict.items()` | Parcourir clés + valeurs |
| `dict.keys()` / `dict.values()` | Parcourir clés ou valeurs seules |
| `defaultdict(type)` | Valeur par défaut automatique |
| `Counter` | Comptage d'éléments |
| Ensemble `set()` | Collection non ordonnée d'éléments uniques |
| `\|` union, `&` inter, `-` diff | Opérations ensemblistes |
| `{k: v for ...}` | Compréhension de dictionnaire |
| `frozenset()` | Ensemble immuable (peut être clé) |
| `{}` = dict, `set()` = set | Attention au vide ! |

---

## 11. Exercices

### Exercice 1 : Compteur de mots
Demandez une phrase. Utilisez `Counter` pour afficher les 3 mots les plus fréquents (insensible à la casse).

### Exercice 2 : Carnet de notes
Créez un dictionnaire `notes = {"Alice": [15, 12, 18], "Bob": [10, 8, 14], "Charlie": [19, 17, 16]}`. Affichez la moyenne de chaque élève.

### Exercice 3 : Mots uniques
Demandez une phrase. Affichez le nombre de mots **uniques** (utilisez un ensemble).

### Exercice 4 : Trouver les doublons
Écrivez une fonction qui prend une liste et retourne les éléments qui apparaissent plus d'une fois (utilisez un `Counter`).

### Exercice 5 : Fusion de dictionnaires
Créez deux dictionnaires `stock1` et `stock2` (produit → quantité). Fusionnez-les en additionnant les quantités pour les produits en commun.

```python
stock1 = {"pommes": 10, "bananes": 5, "cerises": 3}
stock2 = {"bananes": 8, "cerises": 2, "dattes": 4}
# Résultat attendu : {"pommes": 10, "bananes": 13, "cerises": 5, "dattes": 4}
```

---

## Progression

```
Module 1: ✅ Introduction
Module 2: ✅ Variables et types
Module 3: ✅ Strings
Module 4: ✅ Listes et Tuples
Module 5: ✅ Dictionnaires et Ensembles  ← Vous êtes ici
Module 6: ⬜ Contrôle de flux
```
