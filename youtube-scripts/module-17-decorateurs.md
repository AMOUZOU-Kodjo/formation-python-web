# Vidéo #17 — Décorateurs

## Informations générales
- **Titre** : Python #17 — Décorateurs (Formation Complète)
- **Durée** : ~14 min
- **Miniature** : `banners/17-décorateurs.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 17 — DÉCORATEURS

> "Les décorateurs sont l'un des mécanismes les plus puissants de Python. Ils permettent d'enrichir ou de modifier le comportement d'une fonction sans toucher à son code. On les retrouve partout dans Flask, Django, et la bibliothèque standard."

---

### 0:30 — Fonctions comme objets (1 min 30)
**Texte écran :** FONCTIONS = OBJETS

> "En Python, les fonctions sont des objets de première classe. On peut les stocker, les passer en argument, les retourner."

```python
def saluer(nom):
    return f"Bonjour {nom}"

# Stocker une fonction dans une variable
ma_fonction = saluer
print(ma_fonction("Alice"))  # Bonjour Alice

# Passer une fonction en argument
def appliquer(f, x):
    return f(x)

print(appliquer(saluer, "Bob"))  # Bonjour Bob
```

> "Cette propriété est fondamentale pour comprendre les décorateurs."

---

### 2:00 — Closure et fonction intérieure (2 min)
**Texte écran :** CLOSURE

> "Une closure, c'est une fonction définie à l'intérieur d'une autre, qui capture les variables de la fonction englobante."

```python
def multiplier(coefficient):
    def interne(x):
        return x * coefficient
    return interne

double = multiplier(2)
triple = multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15
```

> "La fonction `interne` se souvient de la valeur de `coefficient` même après la fin de `multiplier`. C'est une closure."

---

### 4:00 — Décorateur simple : `@decorateur` (2 min)
**Texte écran :** DÉCORATEUR SIMPLE

> "Un décorateur est une fonction qui prend une fonction en entrée et retourne une fonction modifiée."

```python
def decorateur(func):
    def wrapper():
        print("Avant l'appel")
        func()
        print("Après l'appel")
    return wrapper

@decorateur
def dire_bonjour():
    print("Bonjour !")

dire_bonjour()
# Avant l'appel
# Bonjour !
# Après l'appel
```

> "Le `@decorateur` est du sucre syntaxique. C'est équivalent à écrire `dire_bonjour = decorateur(dire_bonjour)`."

---

### 6:00 — `@wraps` pour préserver les métadonnées (1 min 30)
**Texte écran :** @WRAPS

> "Sans précaution, le décorateur remplace le nom et la docstring de la fonction originale."

```python
def decorateur(func):
    def wrapper(*args, **kwargs):
        """Wrapper interne"""
        return func(*args, **kwargs)
    return wrapper

@decorateur
def dire_bonjour():
    """Dis bonjour"""
    pass

print(dire_bonjour.__name__)  # wrapper (pas dire_bonjour !)
```

> "On utilise `@wraps` pour copier les métadonnées de la fonction originale."

```python
from functools import wraps

def decorateur(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@decorateur
def dire_bonjour():
    """Dis bonjour"""
    pass

print(dire_bonjour.__name__)  # dire_bonjour ✅
```

---

### 7:30 — Décorateurs avec paramètres (2 min)
**Texte écran :** DÉCORATEURS PARAMÉTRÉS

> "Un décorateur peut lui-même prendre des paramètres. Il faut alors ajouter un niveau d'imbrication."

```python
def repeter(n):
    def decorateur(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorateur

@repeter(3)
def saluer(nom):
    print(f"Bonjour {nom}")

saluer("Alice")
# Bonjour Alice
# Bonjour Alice
# Bonjour Alice
```

> "On empile les fonctions : `repeter(3)` retourne le décorateur, qui lui-même retourne `wrapper`."

---

### 9:30 — Décorateurs de classe : `@classmethod`, `@staticmethod`, `@property` (2 min)
**Texte écran :** DÉCORATEURS DE CLASSE

```python
class Compteur:
    total = 0

    @classmethod
    def depuis_classe(cls):
        print(f"Total : {cls.total}")

    @staticmethod
    def utilitaire(x):
        return x ** 2

    def __init__(self):
        Compteur.total += 1

    @property
    def message(self):
        return f"Instance #{Compteur.total}"

c = Compteur()
print(c.message)     # Instance #1 (pas de parenthèses)
Compteur.depuis_classe()  # Total : 1
print(Compteur.utilitaire(5))  # 25
```

> "`@classmethod` reçoit la classe, `@staticmethod` ne reçoit rien, `@property` transforme une méthode en attribut."

---

### 11:30 — Exemples concrets : timer, logger, cache (2 min 30)
**Texte écran :** EXEMPLES CONCRETS

```python
import time
from functools import wraps, lru_cache

# Timer
def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        debut = time.time()
        resultat = func(*args, **kwargs)
        fin = time.time()
        print(f"{func.__name__} a pris {fin - debut:.3f}s")
        return resultat
    return wrapper

# Logger
def logger(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Appel de {func.__name__} avec {args}")
        return func(*args, **kwargs)
    return wrapper

@timer
def calcul_lent():
    time.sleep(1)
    return 42

print(calcul_lent())  # calcul_lent a pris 1.001s

# Cache intégré
@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(50))  # 12586269025 (instantané grâce au cache)
```

> "`@lru_cache` mémorise les résultats des appels précédents. C'est un décorateur intégré à `functools`."

---

### 14:00 — Conclusion
> "Module 18 : les context managers, la façon propre de gérer les ressources en Python."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 17 : Décorateurs

Au programme :
00:00 — Introduction
00:30 — Fonctions comme objets
02:00 — Closure et fonction intérieure
04:00 — Décorateur simple : @decorateur
06:00 — @wraps pour préserver les métadonnées
07:30 — Décorateurs avec paramètres
09:30 — Décorateurs de classe (classmethod, staticmethod, property)
11:30 — Exemples : timer, logger, cache (@lru_cache)
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

#python #formationpython #decorateurs #decorator #pythonavance #wraps
```

## Tags YouTube
```
python, formation python, decorateurs python, decorator python, functools wraps, classmethod, staticmethod, property, lru_cache, closure python, python avancé, apprendre python, cours python
```
