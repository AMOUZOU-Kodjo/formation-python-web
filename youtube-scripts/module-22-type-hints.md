# Vidéo #22 — Type Hints (Annotations de type)

## Informations générales
- **Titre** : Python #22 — Type Hints (Formation Complète)
- **Durée** : ~13 min
- **Miniature** : `banners/22-type-hints.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 22 — TYPE HINTS

> "Bienvenue dans le module 22. On va parler des annotations de type en Python. Vous avez peut-être entendu que Python est un langage dynamique — pas de déclaration de types. Mais depuis Python 3.5, on peut ajouter des indicateurs de type pour améliorer la lisibilité et la robustesse de notre code."

---

### 0:30 — Pourquoi annoter ? (1 min 30)
**Texte écran :** POURQUOI DES TYPES ?

> "Le typage dynamique, c'est une force — mais ça peut aussi être une source d'erreurs."

```python
def ajouter(a, b):
    return a + b

ajouter(5, 3)        # 8
ajouter("a", "b")    # "ab"  ← fonctionne mais pas voulu
```

> "Avec une annotation, on indique clairement l'intention : ces paramètres doivent être des entiers."

```python
def ajouter(a: int, b: int) -> int:
    return a + b
```

> "Les annotations ne sont pas vérifiées à l'exécution. Ce sont des indicateurs pour le développeur, l'IDE, et les outils comme mypy."

---

### 2:00 — Syntaxe de base (2 min)
**Texte écran :** SYNTAXE DES ANNOTATIONS

```python
# Variable
nom: str = "Alice"
age: int = 25
taille: float = 1.68
actif: bool = True
rien: None = None
```

```python
# Paramètres et retour
def saluer(nom: str) -> str:
    return f"Bonjour {nom}"

def afficher(message: str) -> None:
    print(message)
```

> "Le type après les deux-points pour les variables et paramètres. La flèche `->` pour le type de retour."

---

### 4:00 — typing : List, Dict, Tuple, Set (2 min)
**Texte écran :** TYPES COLLECTIONS

> "Pour les types complexes, on utilise le module `typing`."

```python
from typing import List, Dict, Tuple, Set

# Liste
notes: List[int] = [12, 15, 18]

# Dictionnaire
coordonnees: Dict[str, float] = {"lat": 48.85, "lon": 2.35}

# Tuple de taille fixe
point: Tuple[float, float] = (48.85, 2.35)

# Tuple avec types variés
donnee: Tuple[str, int, bool] = ("Alice", 25, True)

# Ensemble
tags: Set[str] = {"python", "typage"}
```

> "Depuis Python 3.9, on peut aussi écrire `list[int]`, `dict[str, float]` directement sans `typing`."

---

### 6:00 — Optional, Union, Any (2 min)
**Texte écran :** OPTIONAL, UNION, ANY

```python
from typing import Optional, Union, Any

# Optional = valeur ou None
def trouver_utilisateur(id: int) -> Optional[str]:
    if id == 42:
        return "Alice"
    return None  # OK

# Union = plusieurs types possibles
def afficher_id(valeur: Union[int, str]) -> str:
    return f"ID: {valeur}"

# Any = n'importe quel type (on évite si possible)
def logger(data: Any) -> None:
    print(data)
```

> "Depuis Python 3.10, on peut écrire `str | None` au lieu de `Optional[str]`, et `int | str` au lieu de `Union[int, str]`."

---

### 8:00 — TypeVar pour la généricité (1 min 30)
**Texte écran :** GÉNÉRIQUES AVEC TYPEVAR

> "Quand on veut une fonction qui fonctionne avec plusieurs types tout en gardant la cohérence du type."

```python
from typing import TypeVar

T = TypeVar("T")

def premier_element(liste: list[T]) -> T:
    return liste[0]

premier_element([1, 2, 3])     # int
premier_element(["a", "b"])    # str
```

> "Le type de retour est le même que le type des éléments de la liste. C'est la généricité."

---

### 9:30 — Protocol (duck typing statique) (1 min 30)
**Texte écran :** PROTOCOL

> "Avec `Protocol`, on peut définir une interface sans héritage formel. Le duck typing, mais vérifiable."

```python
from typing import Protocol

class Volant(Protocol):
    def voler(self) -> None: ...

class Oiseau:
    def voler(self) -> None:
        print("L'oiseau vole")

class Avion:
    def voler(self) -> None:
        print("L'avion vole")

def faire_voler(b: Volant) -> None:
    b.voler()

faire_voler(Oiseau())  # OK
faire_voler(Avion())   # OK aussi
```

---

### 11:00 — mypy pour valider les types (1 min 30)
**Texte écran :** MYPY — VÉRIFICATION STATIQUE

> "Les annotations, c'est bien. Les vérifier, c'est mieux. mypy est l'outil standard."

```bash
pip install mypy
mypy mon_fichier.py
```

```python
# mon_fichier.py
def doubler(n: int) -> int:
    return n * 2

doubler("10")  # mypy va détecter l'erreur
```

> "mypy analyse votre code et détecte les incohérences de type. Intégrez-le dans votre éditeur pour des retours en temps réel."

**Avantages :**
- Documentation intégrée
- Meilleure autocomplétion dans l'IDE
- Détection d'erreurs avant l'exécution
- Refactoring facilité

---

### 12:30 — Conclusion
> "Module 23 : on passe à l'asynchrone avec async et await. On va voir comment faire plusieurs choses en même temps."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 22 : Type Hints

Au programme :
00:00 — Introduction
00:30 — Pourquoi annoter ?
02:00 — Syntaxe de base
04:00 — typing : List, Dict, Tuple, Set
06:00 — Optional, Union, Any
08:00 — TypeVar pour la généricité
09:30 — Protocol (duck typing statique)
11:00 — mypy pour valider les types
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

#python #formationpython #typehints #mypy #typage
```

## Tags YouTube
```
python, formation python, type hints, annotations de type, mypy, typing python, python typing, python 3.10, python avancé, cours python, programmation python
```
