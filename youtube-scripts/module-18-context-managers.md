# Vidéo #18 — Context managers

## Informations générales
- **Titre** : Python #18 — Context managers (Formation Complète)
- **Durée** : ~12 min
- **Miniature** : `banners/18-context-managers.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 18 — CONTEXT MANAGERS

> "Un context manager, c'est la façon élégante de gérer l'ouverture et la fermeture des ressources en Python : fichiers, connexions base de données, locks. Fini les oublis de `close()`."

---

### 0:30 — `with ... as` : fermeture automatique (2 min)
**Texte écran :** WITH ... AS

> "Le mot-clé `with` garantit que la ressource est libérée, même en cas d'erreur."

```python
# Sans with (risqué)
f = open("fichier.txt", "r")
contenu = f.read()
f.close()  # Si erreur avant, fichier jamais fermé

# Avec with (sûr)
with open("fichier.txt", "r") as f:
    contenu = f.read()
# Fermeture automatique ici
```

> "C'est équivalent à un bloc `try / finally`, mais plus court et plus lisible."

**Cas de figure courant :**
```python
with open("source.txt", "r") as src, open("dest.txt", "w") as dst:
    dst.write(src.read())
```

---

### 2:30 — Créer un context manager avec une classe (3 min)
**Texte écran :** CLASSE CONTEXT MANAGER

> "On implémente `__enter__` et `__exit__` pour créer son propre gestionnaire de contexte."

```python
class Fichier:
    def __init__(self, nom, mode="r"):
        self.nom = nom
        self.mode = mode

    def __enter__(self):
        self.fichier = open(self.nom, self.mode)
        return self.fichier

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.fichier.close()
        return False  # Ne pas propager l'exception

with Fichier("test.txt", "w") as f:
    f.write("Bonjour !")
```

> "`__enter__` retourne la ressource. `__exit__` est appelée à la sortie du bloc, quoi qu'il arrive."

**Méthode `__exit__` :**
- `exc_type` : type de l'exception (None si tout va bien)
- `exc_val` : valeur de l'exception
- `exc_tb` : traceback

---

### 5:30 — `contextmanager` avec `contextlib` (2 min 30)
**Texte écran :** CONTEXTLIB — YIELD

> "Avec `@contextmanager`, on transforme un générateur en context manager — plus court qu'une classe."

```python
from contextlib import contextmanager

@contextmanager
def fichier_ouvert(nom, mode="r"):
    print("Ouverture du fichier...")
    f = open(nom, mode)
    try:
        yield f  # ← c'est ce que reçoit le `as`
    finally:
        print("Fermeture du fichier...")
        f.close()

with fichier_ouvert("test.txt", "w") as f:
    f.write("Bonjour avec contextmanager !")
```

> "Le code avant `yield` s'exécute à l'entrée, le code après à la sortie. C'est très lisible."

---

### 8:00 — Gestion des exceptions dans `__exit__` (1 min 30)
**Texte écran :** GÉRER LES EXCEPTIONS

```python
class IgnoreErreur:
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is ValueError:
            print(f"ValueError ignorée : {exc_val}")
            return True  # ← supprime l'exception
        return False

with IgnoreErreur():
    int("pas_un_nombre")  # ValueError ignorée
print("On continue...")
```

> "Si `__exit__` retourne `True`, l'exception est supprimée. Sinon, elle continue à se propager."

---

### 9:30 — Cas concrets (2 min)
**Texte écran :** CAS CONCRETS

**Connexion base de données :**
```python
@contextmanager
def connexion_bd(uri):
    conn = creer_connexion(uri)
    try:
        yield conn
        conn.commit()
    except:
        conn.rollback()
        raise
    finally:
        conn.close()
```

**Lock threading :**
```python
from threading import Lock

verrou = Lock()
with verrou:
    # Section critique, thread-safe
    compteur += 1
```

> "`Lock` implémente `__enter__` et `__exit__` — on peut l'utiliser directement avec `with`."

---

### 11:30 — `contextlib.suppress` et `redirect_stdout` (1 min)
**Texte écran :** CONTEXTLIB AVANCÉ

```python
from contextlib import suppress, redirect_stdout
import io

# suppress : ignore une exception spécifique
with suppress(FileNotFoundError):
    open("inexistant.txt")  # Pas d'erreur

# redirect_stdout : capturer la sortie
buffer = io.StringIO()
with redirect_stdout(buffer):
    print("Ceci est capturé")
print(buffer.getvalue())  # "Ceci est capturé\n"
```

> "Deux outils supplémentaires très pratiques parmi ceux proposés par `contextlib`."

---

### 12:30 — Conclusion
> "Module 19 : on explore la bibliothèque standard de Python — des modules prêts à l'emploi pour tout faire."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 18 : Context managers

Au programme :
00:00 — Introduction
00:30 — with ... as : fermeture automatique
02:30 — Créer un context manager avec une classe (__enter__, __exit__)
05:30 — contextmanager avec contextlib (yield)
08:00 — Gestion des exceptions dans __exit__
09:30 — Cas concrets : fichiers, DB, lock threading
11:30 — contextlib.suppress, redirect_stdout
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

#python #formationpython #contextmanager #with #contextlib #gestionressources
```

## Tags YouTube
```
python, formation python, context manager python, with python, contextlib, enter exit python, gestion ressources python, python avancé, apprendre python, cours python
```
