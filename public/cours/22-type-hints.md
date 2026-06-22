# Module 22 : Type Hints — du Python typé statiquement

Depuis Python 3.5 (PEP 484), il est possible d'ajouter des **annotations de type** aux variables, paramètres et valeurs de retour. Cela ne change pas l'exécution (Python reste dynamique), mais permet aux outils comme **mypy** de détecter des erreurs avant l'exécution.

> **Objectif** : Maîtriser le système de typage de Python : annotations, `typing`, génériques, `Protocol`, `TypedDict`, et la vérification avec `mypy`.

---

## 1. Pourquoi typer son code ?

```python
# Sans types : une erreur peut passer inaperçue
def additionner(a, b):
    return a + b

print(additionner(5, 10))      # → 15  (ok)
print(additionner("5", "10"))  # → "510"  (probablement pas voulu !)

# Avec types : mypy vous alertera
def additionner(a: int, b: int) -> int:
    return a + b

# mypy détecte : error: Argument 1 to "additionner" has incompatible type "str"; expected "int"
```

**Les avantages :**
- Détection d'erreurs avant l'exécution
- Auto-complétion améliorée dans les IDE
- Documentation vivante du code
- Refactoring plus sûr

---

## 2. Annotations de base

```python
# Variables simples
nom: str = "Alice"
age: int = 30
taille: float = 1.72
actif: bool = True

# Inférence de type (Python déduit tout seul)
message = "Hello"     # type inféré : str
compteur = 42         # type inféré : int
print(type(message))  # → <class 'str'>
```

### 2.1 Annoter les fonctions

```python
def saluer(nom: str) -> str:
    return f"Bonjour {nom}"

def calculer_imc(poids: float, taille: float) -> float:
    """Calcule l'IMC à partir du poids (kg) et de la taille (m)."""
    return poids / (taille ** 2)

# Paramètres avec valeurs par défaut
def creer_utilisateur(nom: str, age: int = 18, actif: bool = True) -> dict:
    return {"nom": nom, "age": age, "actif": actif}
```

### 2.2 Annotation des méthodes

```python
class CompteBancaire:
    def __init__(self, titulaire: str, solde: float = 0.0) -> None:
        self.titulaire = titulaire
        self.solde = solde

    def deposer(self, montant: float) -> float:
        self.solde += montant
        return self.solde

    def retirer(self, montant: float) -> float:
        if montant <= self.solde:
            self.solde -= montant
        return self.solde
```

---

## 3. Le module `typing` — types complexes

Les collections standard (`list`, `dict`, etc.) s'utilisent seules depuis Python 3.9+ ; avant, il fallait `from typing import List, Dict, ...`.

### 3.1 List, Dict, Tuple, Set

```python
from typing import List, Dict, Tuple, Set

# Python 3.9+ : list[str] directement
noms: list[str] = ["Alice", "Bob", "Charlie"]
notes: list[float] = [15.5, 12.0, 18.0]

# Dictionnaires
coordonnees: dict[str, float] = {"latitude": 48.85, "longitude": 2.35}
population: dict[str, int] = {"Paris": 2161000, "Lyon": 513275}

# Tuples (taille fixe et type par position)
point: tuple[float, float] = (48.85, 2.35)
# Tuple de taille variable
args: tuple[int, ...] = (1, 2, 3, 4)  # n'importe quel nombre d'int

# Sets
ids: set[int] = {1, 2, 3, 4}
```

### 3.2 `Optional` — valeur ou None

```python
from typing import Optional

# Optional[X] = X | None (Python 3.10+)
def trouver_utilisateur(uid: int) -> Optional[str]:
    base = {1: "Alice", 2: "Bob"}
    return base.get(uid)  # retourne str ou None

resultat = trouver_utilisateur(1)
if resultat is not None:  # mypy exige cette vérification
    print(resultat.upper())  # mypy sait ici que c'est un str

# Syntaxe alternative Python 3.10+ :
def trouver_utilisateur(uid: int) -> str | None: ...
```

### 3.3 `Union` — plusieurs types possibles

```python
from typing import Union

# Union[X, Y] = X | Y (Python 3.10+)
def convertir(valeur: Union[int, str]) -> float:
    return float(valeur)

# Python 3.10+ :
def convertir(valeur: int | str) -> float:
    return float(valeur)

# Cas pratique : une fonction qui accepte plusieurs types
def afficher_valeur(v: int | float | str) -> None:
    print(f"Valeur: {v}")
```

### 3.4 `Any` — n'importe quel type

```python
from typing import Any

# Any désactive la vérification de type
def charger_donnees(source: Any) -> Any:
    return source  # mypy ne vérifie pas

# À utiliser avec parcimonie — c'est une porte de sortie
```

> **À retenir** : Préférez `str | None` (PEP 604) à `Optional[str]` si vous utilisez Python 3.10+. Plus lisible.

---

## 4. `TypeVar` et génériques — fonctions polymorphes

Les **génériques** permettent de créer des fonctions qui fonctionnent avec plusieurs types **tout en gardant l'information de type**.

### 4.1 Premier générique

```python
from typing import TypeVar

T = TypeVar("T")  # T est un type quelconque

# Cette fonction retourne le même type que son entrée
def premier_element(seq: list[T]) -> T | None:
    if seq:
        return seq[0]
    return None

# mypy déduit :
resultat_int: int | None = premier_element([1, 2, 3])      # T = int
resultat_str: str | None = premier_element(["a", "b", "c"])  # T = str
```

### 4.2 Plusieurs TypeVar

```python
from typing import TypeVar

A = TypeVar("A")
B = TypeVar("B")

def associer(cles: list[A], valeurs: list[B]) -> dict[A, B]:
    return dict(zip(cles, valeurs))

resultat = associer(["nom", "age"], ["Alice", 30])
# Type inféré : dict[str, int | str]
```

### 4.3 TypeVar avec contraintes

```python
from typing import TypeVar

# T doit être un nombre
Num = TypeVar("Num", int, float)

def somme_carres(a: Num, b: Num) -> Num:
    return a * a + b * b

print(somme_carres(3, 4))     # → 25   (int)
print(somme_carres(3.0, 4.0)) # → 25.0  (float)
# somme_carres("3", "4")  # mypy: error!
```

### 4.4 Classes génériques

```python
from typing import Generic, TypeVar

T = TypeVar("T")

class Pile(Generic[T]):
    def __init__(self) -> None:
        self._elements: list[T] = []

    def push(self, item: T) -> None:
        self._elements.append(item)

    def pop(self) -> T | None:
        if self._elements:
            return self._elements.pop()
        return None

# Usage
pile_int = Pile[int]()
pile_int.push(42)
pile_int.push(10)
print(pile_int.pop())  # → 10  (mypy sait que c'est int)

pile_str = Pile[str]()
pile_str.push("Hello")
```

> **À retenir** : Les génériques lient les types entre paramètres et retour. `def premier_element(list[T]) -> T` garantit que le retour a le même type que les éléments de la liste.

---

## 5. `Protocol` — duck typing statique (Python 3.8+)

`Protocol` permet de définir une **structure** attendue, pas une classe spécifique. C'est du **duck typing** avec vérification statique.

```python
from typing import Protocol

class Volatile(Protocol):
    def voler(self) -> str: ...

class Oiseau:
    def voler(self) -> str:
        return "Je vole avec mes ailes"

class Avion:
    def voler(self) -> str:
        return "Je vole avec mes réacteurs"

class Poisson:
    def nager(self) -> str:
        return "Je nage"

def faire_voler(objet: Volatile) -> None:
    print(objet.voler())

faire_voler(Oiseau())  # → Je vole avec mes ailes
faire_voler(Avion())   # → Je vole avec mes réacteurs
# faire_voler(Poisson())  # mypy: error! Poisson n'a pas de méthode voler
```

**Avantage** : Pas besoin d'héritage. N'importe quelle classe qui a la bonne structure est acceptée.

### Protocol avec attributs

```python
from typing import Protocol

class Nommable(Protocol):
    nom: str

def saluer(obj: Nommable) -> str:
    return f"Bonjour {obj.nom}"

class Personne:
    def __init__(self, nom: str):
        self.nom = nom

class Entreprise:
    def __init__(self, nom: str, siret: str):
        self.nom = nom

print(saluer(Personne("Alice")))     # → Bonjour Alice
print(saluer(Entreprise("ACME", "123")))  # → Bonjour ACME
```

> **À retenir** : `Protocol` implémente le **duck typing statique** — "si ça ressemble à un canard et que ça cancane comme un canard, c'est un canard".

---

## 6. `TypedDict` — dictionnaires typés

`TypedDict` permet de typer un dictionnaire avec des clés fixes et des types précis.

```python
from typing import TypedDict, NotRequired  # NotRequired: Python 3.11+

class Utilisateur(TypedDict):
    nom: str
    age: int
    email: str
    adresse: NotRequired[str]  # clé optionnelle

# Création
user1: Utilisateur = {
    "nom": "Alice",
    "age": 30,
    "email": "alice@example.com",
}

user2: Utilisateur = {
    "nom": "Bob",
    "age": 25,
    "email": "bob@site.fr",
    "adresse": "1 rue de Paris",  # optionnel
}

# Accès typé
print(user1["nom"])  # mypy sait que c'est un str
# user1["age"] + "ans"  # mypy: error! int + str
```

### TypedDict en mode total=False

```python
from typing import TypedDict

class Config(TypedDict, total=False):
    debug: bool
    port: int
    host: str

# Toutes les clés sont optionnelles
config: Config = {}
config["debug"] = True  # ok
config["port"] = 8080   # ok
```

> **À retenir** : Un `TypedDict` reste un `dict` normal à l'exécution. Les vérifications sont purement statiques.

---

## 7. `Literal` — valeurs exactes

`Literal` permet de spécifier une valeur précise, pas seulement un type.

```python
from typing import Literal

def set_status(status: Literal["actif", "inactif", "suspendu"]) -> str:
    return f"État: {status}"

print(set_status("actif"))   # → État: actif
# set_status("absent")  # mypy: error! "absent" n'est pas dans Literal

# Avec plusieurs valeurs
def ouvrir_mode(mode: Literal["r", "w", "a", "x"]) -> str:
    return f"Ouvert en mode {mode}"

# Combinaison avec booléen
type_reponse: Literal[200, 201, 400, 404, 500]
```

---

## 8. `@overload` — signatures multiples

`@overload` permet de définir plusieurs signatures pour une même fonction, avec un comportement différent selon les types d'entrée.

```python
from typing import overload

@overload
def doubler(valeur: int) -> int: ...

@overload
def doubler(valeur: str) -> str: ...

@overload
def doubler(valeur: list[int]) -> list[int]: ...

# Implémentation réelle (sans type précis)
def doubler(valeur: int | str | list[int]) -> int | str | list[int]:
    if isinstance(valeur, int):
        return valeur * 2
    elif isinstance(valeur, str):
        return valeur + valeur
    elif isinstance(valeur, list):
        return [x * 2 for x in valeur]
    raise TypeError("Type non supporté")

# mypy sait quel type retourner selon l'entrée
print(doubler(5))        # → 10    (mypy sait que c'est int)
print(doubler("AB"))     # → ABAB  (mypy sait que c'est str)
print(doubler([1, 2]))   # → [2, 4] (mypy sait que c'est list[int])
```

> **Piège** : `@overload` est purement décoratif pour mypy. L'implémentation finale n'a pas de décorateur `@overload` et doit gérer tous les cas.

---

## 9. `NewType` et `TypeAlias`

### 9.1 NewType — distinguer des types de même nature

```python
from typing import NewType

UserId = NewType("UserId", int)
ProductId = NewType("ProductId", int)

def get_user(uid: UserId) -> str:
    return f"User #{uid}"

def get_product(pid: ProductId) -> str:
    return f"Product #{pid}"

# OK
print(get_user(UserId(42)))      # → User #42

# mypy détecte l'erreur :
# print(get_user(42))             # error! int != UserId
# print(get_user(ProductId(42)))  # error! ProductId != UserId
```

### 9.2 TypeAlias — alias de type

```python
from typing import TypeAlias

# Python 3.10+
Vector: TypeAlias = list[float]
Matrice: TypeAlias = list[Vector]

def produit_scalaire(a: Vector, b: Vector) -> float:
    return sum(x * y for x, y in zip(a, b))

v1: Vector = [1.0, 2.0, 3.0]
v2: Vector = [4.0, 5.0, 6.0]
print(produit_scalaire(v1, v2))  # → 32.0
```

---

## 10. Vérification avec `mypy`

```bash
pip install mypy
mypy mon_fichier.py           # Vérifie le fichier
mypy mon_fichier.py --strict  # Mode strict (toutes les options)
mypy src/                      # Vérifie tout un dossier
```

### Exemple de vérification

```python
# fichier: demo_types.py
def saluer(nom: str) -> str:
    return f"Bonjour {nom}"

age: int = "trente"  # mypy détecte : Incompatible types
```

```bash
# Terminal
$ mypy demo_types.py
demo_types.py:5: error: Incompatible types in assignment
    (expression has type "str", variable has type "int")
Found 1 error in 1 file (checked 1 source file)
```

### Configuration mypy

```ini
# mypy.ini ou setup.cfg
[mypy]
python_version = 3.11
strict = True
ignore_missing_imports = True
disallow_untyped_defs = True
```

---

## 11. Typage progressif — commencer petit, ajouter plus tard

Un des grands avantages du typage Python est qu'il est **progressif** : vous pouvez commencer par annoter quelques fonctions et en ajouter au fil du temps.

```python
# Étape 1 : pas de types
def additionner(a, b):
    return a + b

# Étape 2 : paramètres typés, retour Any
def additionner(a: int, b: int):
    return a + b

# Étape 3 : tout typé
def additionner(a: int, b: int) -> int:
    return a + b
```

> **À retenir** : Même partiel, le typage apporte déjà des bénéfices. Vous pouvez typer **un fichier à la fois**.

---

## Résumé

| Concept | Usage | Exemple |
|---------|-------|---------|
| Annotations de base | Types simples | `def f(x: int) -> str` |
| `list[str]` | Collections typées | `noms: list[str]` |
| `Optional[X]` / `X \| None` | Valeur ou None | `def find(id) -> str \| None` |
| `TypeVar` | Génériques | `def first[T](list[T]) -> T` |
| `Protocol` | Duck typing statique | `class Volatile(Protocol)` |
| `TypedDict` | Dictionnaire structuré | `class User(TypedDict)` |
| `Literal` | Valeur exacte | `mode: Literal["r", "w"]` |
| `@overload` | Multi-signatures | plusieurs `def` pour une fonction |
| `NewType` | Distinguer des int | `UserId = NewType("UserId", int)` |

---

## Exercices

1. **Annotez une fonction existante** : Prenez une fonction que vous avez écrite et ajoutez des type hints complets.
2. **Générique max** : Écrivez une fonction `max_liste(liste: list[T]) -> T` qui retourne le maximum d'une liste (n'importe quel type comparable).
3. **Protocol Iterable** : Créez un `Protocol` `Sommable` avec une méthode `somme()` et faites en sorte qu'une classe `Panier` et une classe `Caisse` l'implémentent.
4. **TypedDict JSON** : Définissez un `TypedDict` pour la réponse d'une API météo (température, humidité, vent, description).
5. **Overload d'analyse** : Écrivez une fonction `analyser` qui accepte `str` (retourne `list[str]`) ou `int` (retourne `list[int]`) avec `@overload`.
