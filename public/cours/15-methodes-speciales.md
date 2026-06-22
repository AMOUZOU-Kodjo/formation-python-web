# Module 15 : Méthodes spéciales (Dunder Methods)

---

## Objectifs pédagogiques

À la fin de ce module, vous serez capable de :
- Comprendre le rôle des **méthodes spéciales** (dunder methods) en Python
- Implémenter `__str__` et `__repr__` (représentation textuelle)
- Redéfinir les **opérateurs arithmétiques** (`+`, `-`, `*`, etc.)
- Maîtriser `__eq__` et `__hash__` (égalité et hachage)
- Utiliser `__getitem__`, `__setitem__`, `__len__` (comportement de conteneur)
- Implémenter `__call__` (objets appelables comme des fonctions)
- Comprendre `__new__` vs `__init__`
- Optimiser la mémoire avec `__slots__`

---

## 1. `__str__` et `__repr__` : représentation textuelle

### La différence fondamentale

- **`__repr__`** : représentation "officielle" (idéalement, on doit pouvoir recréer l'objet avec)
- **`__str__`** : représentation "lisible" pour l'utilisateur (comme un résumé)

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        # Idéal : doit pouvoir recréer l'objet
        return f"Point({self.x}, {self.y})"

    def __str__(self):
        # Lisible par un humain
        return f"Point en ({self.x}, {self.y})"

p = Point(3, 4)

# __repr__ est appelé dans la console/REPL
print(repr(p))   # → Point(3, 4)

# __str__ est appelé par print()
print(str(p))    # → Point en (3, 4)
print(p)         # → Point en (3, 4)  (print() utilise __str__)
```

> **Règle d'or** : Si vous ne devez implémenter qu'une seule, choisissez `__repr__`. En l'absence de `__str__`, Python utilise `__repr__` comme fallback.

### L'idéal pour `__repr__`

```python
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    def __repr__(self):
        # On doit pouvoir copier-coller cette sortie dans le code
        return f"Temperature({self.celsius})"

t = Temperature(25)
print(repr(t))         # → Temperature(25)
# évaluer Temperature(25) dans Python recrée l'objet !
```

### Cas concret : classe `Livre`

```python
class Livre:
    def __init__(self, titre, auteur, annee):
        self.titre = titre
        self.auteur = auteur
        self.annee = annee

    def __repr__(self):
        return f"Livre({self.titre!r}, {self.auteur!r}, {self.annee})"
        #         ↑ !r force repr() pour avoir les guillemets

    def __str__(self):
        return f"{self.titre} ({self.auteur}, {self.annee})"

livre = Livre("1984", "George Orwell", 1949)
print(repr(livre))  # → Livre('1984', 'George Orwell', 1949)
print(livre)        # → 1984 (George Orwell, 1949)
```

---

## 2. Opérateurs arithmétiques

### Contrat complet des opérateurs

| Opération | Méthode directe | Méthode inversée | Méthode sur place |
|-----------|----------------|------------------|-------------------|
| `a + b` | `__add__` | `__radd__` | `__iadd__` (+=) |
| `a - b` | `__sub__` | `__rsub__` | `__isub__` (-=) |
| `a * b` | `__mul__` | `__rmul__` | `__imul__` (*=) |
| `a / b` | `__truediv__` | `__rtruediv__` | `__itruediv__` (/=) |
| `a // b` | `__floordiv__` | `__rfloordiv__` | `__ifloordiv__` (//=) |
| `a % b` | `__mod__` | `__rmod__` | `__imod__` (%=) |
| `a ** b` | `__pow__` | `__rpow__` | `__ipow__` (**=) |
| `-a` (unaire) | `__neg__` | — | — |
| `+a` (unaire) | `__pos__` | — | — |
| `~a` | `__invert__` | — | — |

### Exemple progressif : la classe `Vecteur`

```python
class Vecteur:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Vecteur({self.x}, {self.y})"

    # --- Opérations directes ---

    def __add__(self, other):
        """a + b : addition de deux vecteurs."""
        return Vecteur(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        """a - b : soustraction de deux vecteurs."""
        return Vecteur(self.x - other.x, self.y - other.y)

    def __mul__(self, scalaire):
        """a * k : multiplication par un scalaire (à droite)."""
        return Vecteur(self.x * scalaire, self.y * scalaire)

    def __truediv__(self, scalaire):
        """a / k : division par un scalaire."""
        if scalaire == 0:
            raise ZeroDivisionError("Division par zéro !")
        return Vecteur(self.x / scalaire, self.y / scalaire)

    # --- Opérations inversées (scalaire * vecteur) ---

    def __rmul__(self, scalaire):
        """k * a : multiplication scalaire à gauche.
        Appelé quand Python ne sait pas faire int.__mul__(Vecteur)."""
        return self * scalaire  # on réutilise __mul__

    # --- Opérateur unaire ---

    def __neg__(self):
        """-a : opposé du vecteur."""
        return Vecteur(-self.x, -self.y)

    # --- Opérations sur place ---

    def __iadd__(self, other):
        """a += b : modifie l'objet sur place (pas de nouvelle instance)."""
        self.x += other.x
        self.y += other.y
        return self  # doit retourner self

    def __isub__(self, other):
        """a -= b."""
        self.x -= other.x
        self.y -= other.y
        return self

# Test
v1 = Vecteur(2, 3)
v2 = Vecteur(4, 5)

# Addition
print(v1 + v2)   # → Vecteur(6, 8)

# Soustraction
print(v1 - v2)   # → Vecteur(-2, -2)

# Multiplication (directe et inversée)
print(v1 * 3)    # → Vecteur(6, 9)
print(3 * v1)    # → Vecteur(6, 9)  (grâce à __rmul__)

# Division
print(v1 / 2)    # → Vecteur(1.0, 1.5)

# Opposé
print(-v1)       # → Vecteur(-2, -3)

# += modifie l'objet
v3 = Vecteur(1, 1)
v3 += Vecteur(2, 2)
print(v3)        # → Vecteur(3, 3)
```

### Mécanisme des opérations inversées

```python
# Quand on fait 3 * v1, Python essaie :
# 1. int.__mul__(3, v1) → NotImplemented (int ne connaît pas Vecteur)
# 2. Vecteur.__rmul__(v1, 3) → OK !
# C'est pour ça qu'on implémente __rmul__
```

> **Piège courant** : Le type renvoyé doit être cohérent.
> ```python
> def __add__(self, other):
>     if isinstance(other, Vecteur):
>         return Vecteur(self.x + other.x, self.y + other.y)
>     return NotImplemented  # ← dire "je ne sais pas faire" plutôt qu'erreur
> ```

---

## 3. Comparaisons : `__eq__`, `__lt__`, etc.

### Contrat des comparaisons

| Opération | Méthode |
|-----------|---------|
| `a == b` | `__eq__` |
| `a != b` | `__ne__` |
| `a < b` | `__lt__` |
| `a <= b` | `__le__` |
| `a > b` | `__gt__` |
| `a >= b` | `__ge__` |

### Implémentation complète

```python
class Vecteur:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Vecteur({self.x}, {self.y})"

    @property
    def norme(self):
        return (self.x**2 + self.y**2) ** 0.5

    # Égalité
    def __eq__(self, other):
        if isinstance(other, Vecteur):
            return self.x == other.x and self.y == other.y
        return NotImplemented

    # Différence (optionnel : Python utilise l'inverse de __eq__ sinon)
    def __ne__(self, other):
        if isinstance(other, Vecteur):
            return not self.__eq__(other)
        return NotImplemented

    # Inférieur (basé sur la norme)
    def __lt__(self, other):
        if isinstance(other, Vecteur):
            return self.norme < other.norme
        return NotImplemented

    # Inférieur ou égal
    def __le__(self, other):
        if isinstance(other, Vecteur):
            return self.norme <= other.norme
        return NotImplemented

    # Supérieur (Python utilise l'inverse de __lt__ si manquant)
    def __gt__(self, other):
        if isinstance(other, Vecteur):
            return self.norme > other.norme
        return NotImplemented

    # Supérieur ou égal (Python utilise l'inverse de __le__ si manquant)
    def __ge__(self, other):
        if isinstance(other, Vecteur):
            return self.norme >= other.norme
        return NotImplemented

v1 = Vecteur(3, 4)   # norme = 5
v2 = Vecteur(1, 2)   # norme ≈ 2.236
v3 = Vecteur(3, 4)   # identique à v1

print(v1 == v3)   # → True
print(v1 != v2)   # → True
print(v1 < v2)    # → False (5 < 2.236 ? Non)
print(v1 > v2)    # → True
```

> **Optimisation** : Python peut déduire `!=` de `==` et `>=` de `<` (inverse). Mais il est plus efficace d'implémenter au moins `__eq__` et `__lt__`.

---

## 4. `__hash__` : le contrat avec `__eq__`

### Règle d'or

> **Si deux objets sont égaux (`__eq__`), ils doivent avoir le même hash (`__hash__`).**

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

    def __eq__(self, other):
        if isinstance(other, Point):
            return self.x == other.x and self.y == other.y
        return NotImplemented

    def __hash__(self):
        return hash((self.x, self.y))  # hash d'un tuple immuable

# Maintenant, Point peut être utilisé dans un set ou comme clé dict :
p1 = Point(1, 2)
p2 = Point(1, 2)
p3 = Point(3, 4)

print(p1 == p2)              # → True (__eq__)
print(hash(p1) == hash(p2))  # → True (mêmes coordonnées = même hash)

ensemble = {p1, p2, p3}
print(len(ensemble))         # → 2 (p1 et p2 sont "égaux" donc un seul)

dictionnaire = {p1: "A", p3: "B"}
print(dictionnaire[p2])      # → "A" (p2 a le même hash que p1)
```

### Cas particuliers

```python
# Objet mutable = pas de hash (objet non hashable)
class ListeMutable:
    def __init__(self, items):
        self.items = items

    def __eq__(self, other):
        return self.items == other.items

    # Pas de __hash__ → Python met __hash__ à None automatiquement

# l1 = ListeMutable([1, 2])
# d = {l1: "test"}  # ⚠️ TypeError: unhashable type: 'ListeMutable'

# Forcer l'immutabilité avec dataclass(frozen=True)
from dataclasses import dataclass

@dataclass(frozen=True)
class PointFige:
    x: int
    y: int

p = PointFige(1, 2)
print(hash(p))  # → OK, frozen=True génère __hash__
```

> **Piège courant** : Définir `__eq__` sans `__hash__` rend l'objet non hashable (plus possible dans un set ou comme clé dict). Python définit `__hash__ = None` automatiquement quand vous définissez `__eq__`.

---

## 5. `__getitem__`, `__setitem__`, `__len__` : objets conteneurs

### Comportement de liste personnalisée

```python
class Boite:
    """Une boîte qui contient des objets, comme une liste."""

    def __init__(self):
        self._items = []

    def __repr__(self):
        return f"Boite({self._items})"

    def __len__(self):
        """len(boite) → nombre d'éléments."""
        return len(self._items)

    def __getitem__(self, index):
        """boite[i] → accès par index."""
        return self._items[index]

    def __setitem__(self, index, valeur):
        """boite[i] = valeur → modification par index."""
        self._items[index] = valeur

    def __delitem__(self, index):
        """del boite[i] → suppression par index."""
        del self._items[index]

    def __contains__(self, item):
        """item in boite → test d'appartenance."""
        return item in self._items

    def __iter__(self):
        """for x in boite → itération."""
        return iter(self._items)

    def __bool__(self):
        """bool(boite) → True si non vide."""
        return len(self._items) > 0

    def ajouter(self, item):
        self._items.append(item)

# Test
boite = Boite()
boite.ajouter("pomme")
boite.ajouter("banane")
boite.ajouter("cerise")

print(len(boite))           # → 3
print(boite[1])             # → banane
print("pomme" in boite)    # → True

for fruit in boite:
    print(fruit.upper())    # → POMME, BANANE, CERISE

print(bool(Boite()))        # → False (vide)
print(bool(boite))         # → True (non vide)
```

### Contrat complet des méthodes de conteneur

| Méthode | Appelé par | Description |
|---------|-----------|-------------|
| `__len__` | `len(obj)` | Longueur |
| `__getitem__` | `obj[i]`, `obj[i:j]` | Accès en lecture |
| `__setitem__` | `obj[i] = v` | Accès en écriture |
| `__delitem__` | `del obj[i]` | Suppression |
| `__contains__` | `x in obj` | Appartenance |
| `__iter__` | `for x in obj`, `iter(obj)` | Itération |
| `__reversed__` | `reversed(obj)` | Itération inverse |
| `__missing__` | `obj[x]` (sous-classe de dict) | Clé manquante |

---

## 6. `__call__` : objets appelables

### Des objets qui se comportent comme des fonctions

```python
class Multiplicateur:
    """Un objet qu'on peut appeler comme une fonction."""

    def __init__(self, facteur):
        self.facteur = facteur

    def __call__(self, valeur):
        """Appelé quand on fait objet(valeur)."""
        return valeur * self.facteur

# Usage
fois2 = Multiplicateur(2)
fois3 = Multiplicateur(3)

print(fois2(5))    # → 10  (appelle __call__ avec 5)
print(fois3(5))    # → 15
print(fois2(10))   # → 20

# On peut vérifier qu'ils sont appelables :
print(callable(fois2))  # → True
```

### Cas concret : compteur à état

```python
class CompteurAppels:
    """Compte combien de fois il est appelé."""
    def __init__(self):
        self.compte = 0

    def __call__(self, *args, **kwargs):
        self.compte += 1
        print(f"Appel n°{self.compte} avec args={args}, kwargs={kwargs}")

c = CompteurAppels()
c("hello")        # → Appel n°1 avec args=('hello',), kwargs={}
c(x=42)           # → Appel n°2 avec args=(), kwargs={'x': 42}
c()               # → Appel n°3 avec args=(), kwargs={}
```

> **Quand utiliser `__call__` ?**
> - Décorateurs (on y reviendra)
> - Fonctions avec état persistant
> - Currying (fixer certains paramètres)

---

## 7. `__new__` vs `__init__`

### Le vrai constructeur

- **`__new__`** : crée l'objet (alloue la mémoire) — c'est un **constructeur**
- **`__init__`** : initialise l'objet déjà créé — c'est un **initialisateur**

```python
class Exemple:
    def __new__(cls, *args, **kwargs):
        """Appelé en PREMIER. Crée l'objet."""
        print(f"1. __new__ : création d'un objet {cls.__name__}")
        instance = super().__new__(cls)  # allocation mémoire
        return instance  # si on ne retourne pas une instance de cls, __init__ n'est pas appelé

    def __init__(self, valeur):
        """Appelé en SECOND. Initialise l'objet."""
        print(f"2. __init__ : initialisation avec {valeur}")
        self.valeur = valeur

obj = Exemple(42)
# 1. __new__ : création d'un objet Exemple
# 2. __init__ : initialisation avec 42
```

### Quand utiliser `__new__` ?

```python
# Singleton : une seule instance de la classe
class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, valeur=None):
        if not hasattr(self, 'initialise'):
            self.valeur = valeur
            self.initialise = True

a = Singleton("premier")
b = Singleton("second")
print(a is b)        # → True (même instance)
print(a.valeur)      # → "premier" (le second __init__ n'a pas réinitialisé)
```

> **Ne JAMAIS utiliser `__new__` sauf si :**
> - Vous faites un **singleton**
> - Vous sous-classez des **types immuables** (int, str, tuple)
> - Vous implémentez un **pool d'objets** (pattern avancé)

```python
# Sous-classer un tuple (immuable) nécessite __new__
class Point3D(tuple):
    def __new__(cls, x, y, z):
        return super().__new__(cls, (x, y, z))

    @property
    def x(self):
        return self[0]

    @property
    def y(self):
        return self[1]

    @property
    def z(self):
        return self[2]

p = Point3D(1, 2, 3)
print(p.x)        # → 1
print(p.y)        # → 2
print(p[0])       # → 1 (c'est toujours un tuple)
```

---

## 8. `__slots__` : optimiser la mémoire

### Le problème

Chaque objet Python a un `__dict__` (dictionnaire) qui stocke ses attributs. Ce dictionnaire prend beaucoup de mémoire.

```python
class SansSlots:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class AvecSlots:
    __slots__ = ('x', 'y')  # seuls ces attributs sont autorisés

    def __init__(self, x, y):
        self.x = x
        self.y = y

sans = SansSlots(1, 2)
avec = AvecSlots(1, 2)

print(sans.__dict__)  # → {'x': 1, 'y': 2}  (dictionnaire, mémoire)
# print(avec.__dict__)  # ⚠️ AttributeError: pas de __dict__ !

# On gagne en mémoire (~50% d'économie)
import sys
print(sys.getsizeof(sans))  # → 56 (taille de l'objet)
print(sys.getsizeof(avec))  # → 48 (plus petit)

# On ne peut pas ajouter d'attribut dynamique
# avec.z = 3  # ⚠️ AttributeError: 'AvecSlots' object has no attribute 'z'
```

> **Piège avec __slots__** :
> 1. Pas de `__dict__` = pas d'attributs dynamiques
> 2. Les classes filles doivent redéfinir `__slots__`
> 3. On ne peut pas avoir `__weakref__` sauf si on l'ajoute manuellement

---

## 9. Autres méthodes spéciales utiles

### `__bool__` : vérité d'un objet

```python
class Compte:
    def __init__(self, solde=0):
        self.solde = solde

    def __bool__(self):
        return self.solde > 0

c1 = Compte(100)
c2 = Compte(0)

print(bool(c1))  # → True
print(bool(c2))  # → False

# Utilisé automatiquement dans if
if c1:
    print("Compte positif")  # affiché
if not c2:
    print("Compte vide")     # affiché
```

### `__enter__` / `__exit__` : context manager

(Voir module 18 pour les détails complets)

### `__iter__` / `__next__` : itérateur

(Voir module 16 pour les détails complets)

---

## Résumé du module

| Méthode | Usage | Contrat |
|---------|-------|---------|
| `__repr__` | `repr(x)`, debug | Représentation officielle |
| `__str__` | `str(x)`, `print(x)` | Représentation lisible |
| `__add__` | `x + y` | Retourne un nouvel objet |
| `__radd__` | `y + x` (si y ne sait pas) | Appelle `__add__` |
| `__iadd__` | `x += y` | Modifie et retourne `self` |
| `__eq__` | `x == y` | Booléen ou `NotImplemented` |
| `__hash__` | `hash(x)` | Entier, cohérent avec `__eq__` |
| `__getitem__` | `x[i]` | Valeur ou IndexError |
| `__setitem__` | `x[i] = v` | None |
| `__call__` | `x(args)` | Retourne un résultat |
| `__new__` | Construction | Crée et retourne l'instance |
| `__init__` | Initialisation | None |
| `__slots__` | Optimisation mémoire | Tuple de noms d'attributs |
| `__bool__` | `bool(x)`, `if x` | True ou False |
| `__len__` | `len(x)` | Entier >= 0 |
| `__contains__` | `x in y` | Booléen |

---

## Exercices

### Exercice 1 : Classe `Complexe`
Créez une classe `Complexe` pour les nombres complexes avec :
- `__init__` (partie réelle, partie imaginaire)
- `__repr__` (format `Complexe(3, 4)`)
- `__str__` (format `3 + 4i`)
- `__add__`, `__sub__`, `__mul__`, `__truediv__`
- `__eq__` et `__hash__`
- `__abs__` (module = sqrt(real² + imag²))
- `conjugue()` méthode qui retourne le conjugué

### Exercice 2 : Pile (Stack)
Créez une classe `Pile` avec :
- `__init__` : liste vide
- `__len__` : taille de la pile
- `__bool__` : True si non vide
- `__getitem__` : accès par index
- `__iter__` : itération
- `__repr__` : `Pile([1, 2, 3])`
- Méthodes : `empiler(item)`, `depiler()`, `sommet()`

### Exercice 3 : `__call__` comme fonction accumulateur
Créez une classe `Accumulateur` qui :
- `__init__` : part de 0 (ou d'une valeur initiale)
- `__call__(valeur)` : ajoute la valeur, retourne le total

### Exercice 4 : Dataclass avec contraintes
Créez une `@dataclass` `Personne` avec nom, age. Ajoutez `__post_init__` pour valider que age > 0, et `__bool__` pour que True si age >= 18.
