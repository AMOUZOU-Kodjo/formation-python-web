# Vidéo #25 — Métaclasses & Introspection

## Informations générales
- **Titre** : Python #25 — Métaclasses & Introspection (Formation Complète)
- **Durée** : ~13 min
- **Miniature** : `banners/25-metaclasses-introspection.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 25 — MÉTACLASSES & INTROSPECTION

> "Bienvenue dans le module 25. Aujourd'hui, on va voir comment Python construit ses classes, et comment on peut inspecter les objets à l'exécution. Deux sujets avancés qui vous feront vraiment comprendre le fonctionnement interne de Python."

---

### 0:30 — type() pour créer des classes dynamiquement (2 min)
**Texte écran :** CRÉER DES CLASSES AVEC type()

> "Vous connaissez `type()` pour connaître le type d'une variable. Mais `type()` peut aussi créer des classes."

```python
# Syntaxe : type(nom_classe, bases, dict_attributs)

Personne = type("Personne", (), {
    "espece": "humain",
    "__init__": lambda self, nom: setattr(self, "nom", nom),
    "saluer": lambda self: f"Bonjour, je suis {self.nom}",
})

p = Personne("Alice")
print(p.saluer())       # "Bonjour, je suis Alice"
print(type(p))          # <class '__main__.Personne'>
```

> "C'est exactement ce que fait Python quand vous utilisez le mot-clé `class`. La syntaxe `class` n'est que du sucre."

---

### 2:30 — Métaclasse : une classe qui crée des classes (2 min)
**Texte écran :** LES MÉTACLASSES

> "Une métaclasse, c'est une classe dont les instances sont des classes. Son `__new__` reçoit le futur objet classe."

```python
class MetaClasse(type):
    def __new__(mcs, nom, bases, dct):
        print(f"Création de la classe {nom}")
        # Ajouter automatiquement un attribut
        dct["cree_par"] = "MetaClasse"
        return super().__new__(mcs, nom, bases, dct)

class MaClasse(metaclass=MetaClasse):
    valeur = 42

print(MaClasse.cree_par)  # "MetaClasse"
```

> "On hérite de `type`. La métaclasse est appelée à chaque création de classe. Utile pour ajouter des comportements automatiques."

---

### 4:30 — __new__ et __init_subclass__ (1 min 30)
**Texte écran :** __new__ ET __init_subclass__

```python
# __new__ d'une classe normale
class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

a = Singleton()
b = Singleton()
print(a is b)  # True

# __init_subclass__ — agir à la création d'une sous-classe
class Base:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        print(f"Nouvelle sous-classe : {cls.__name__}")

class Enfant(Base): pass  # Affiche "Nouvelle sous-classe : Enfant"
```

> "`__new__` contrôle la création d'une instance. `__init_subclass__` est appelée quand on hérite d'une classe."

---

### 6:00 — Introspection : dir(), type(), getattr(), hasattr() (2 min)
**Texte écran :** INTROSPECTION

> "L'introspection, c'est la capacité d'examiner un objet à l'exécution."

```python
class Personne:
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age

    def saluer(self):
        print(f"Bonjour, je suis {self.nom}")

p = Personne("Alice", 25)

# Attributs et méthodes disponibles
print(dir(p))

# Vérifier l'existence
print(hasattr(p, "nom"))       # True
print(hasattr(p, "saluer"))    # True

# Obtenir un attribut par son nom
print(getattr(p, "nom"))       # "Alice"
methode = getattr(p, "saluer")
methode()                      # "Bonjour, je suis Alice"

# Type
print(type(p))                 # <class '__main__.Personne'>
print(isinstance(p, Personne)) # True
```

> "`getattr()` est très utilisé pour du code dynamique — par exemple charger des plugins ou des configurations."

---

### 8:00 — Le module inspect (2 min)
**Texte écran :** LE MODULE inspect

```python
import inspect

def ma_fonction(x: int, y: int = 10) -> int:
    """Multiplie x par y."""
    return x * y

# Obtenir la signature
sig = inspect.signature(ma_fonction)
for nom, param in sig.parameters.items():
    print(f"{nom}: {param.annotation} = {param.default}")
    # x: <class 'int'> = <class 'inspect._empty'>
    # y: <class 'int'> = 10

# Obtenir le code source
print(inspect.getsource(ma_fonction))
# → return x * y

# Lister les membres d'un objet
print(inspect.getmembers(ma_fonction))
```

```python
# Cas concret : inspecter une classe
class Exemple:
    def methode1(self): pass
    @staticmethod
    def methode2(): pass

for nom, membre in inspect.getmembers(Exemple):
    if inspect.isfunction(membre):
        print(f"Méthode : {nom}")
```

> "`inspect` est utilisé par les ORM, les frameworks web, les validateurs — tout ce qui a besoin de connaître la structure du code à l'exécution."

---

### 10:00 — Cas concrets : ORM et sérialiseurs (1 min 30)
**Texte écran :** CAS CONCRETS

**ORM (comme SQLAlchemy) :**
```python
class ModelMeta(type):
    def __new__(mcs, nom, bases, dct):
        if nom == "Model":
            return super().__new__(mcs, nom, bases, dct)
        # Convertir les attributs en colonnes
        colonnes = {
            k: v for k, v in dct.items()
            if not k.startswith("_")
        }
        print(f"Table {nom.lower()} : colonnes = {list(colonnes.keys())}")
        return type.__new__(mcs, nom, bases, dct)

class Model(metaclass=ModelMeta):
    pass

class Utilisateur(Model):
    nom = "TEXT"
    age = "INTEGER"

class Article(Model):
    titre = "TEXT"
    contenu = "TEXT"
```

**Sérialiseur (comme Marshmallow) :**
```python
def serializer(cls):
    """Décorateur : crée un schéma automatiquement."""
    from dataclasses import dataclass, asdict
    return dataclass(cls)

@serializer
class Produit:
    nom: str
    prix: float

p = Produit("Chaise", 49.99)
from dataclasses import asdict
print(asdict(p))  # {"nom": "Chaise", "prix": 49.99}
```

---

### 11:30 — __slots__ pour optimiser la mémoire (1 min)
**Texte écran :** __slots__

```python
class SansSlots:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class AvecSlots:
    __slots__ = ("x", "y")
    def __init__(self, x, y):
        self.x = x
        self.y = y

sans = SansSlots(1, 2)
avec = AvecSlots(1, 2)

# AvecSlots n'a pas de __dict__
# print(avec.__dict__)  # AttributeError !

# Gain mémoire pour des millions d'instances
# Pas de dictionnaire par instance
```

> "`__slots__` fixe la liste des attributs autorisés. Plus de `__dict__` par instance, donc moins de mémoire. Utile pour des millions d'objets."

---

### 12:30 — Conclusion
> "Module 26 : on aborde les design patterns. Comment structurer son code avec des patrons de conception éprouvés."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 25 : Métaclasses & Introspection

Au programme :
00:00 — Introduction
00:30 — type() pour créer des classes
02:30 — Métaclasse : une classe pour créer des classes
04:30 — __new__ et __init_subclass__
06:00 — Introspection : dir(), type(), getattr(), hasattr()
08:00 — Le module inspect
10:00 — Cas concrets : ORM, sérialiseurs
11:30 — __slots__ pour optimiser la mémoire
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

#python #formationpython #metaclasses #introspection #pythonavancé
```

## Tags YouTube
```
python, formation python, metaclasses, introspection, type python, inspect module, python avancé, ORM python, slots python, cours python, programmation python
```
