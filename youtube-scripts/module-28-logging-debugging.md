# Vidéo #28 — Logging & Debugging

## Informations générales
- **Titre** : Python #28 — Logging & Debugging (Formation Complète)
- **Durée** : ~14 min
- **Miniature** : `banners/28-logging-debugging.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 28 — LOGGING & DEBUGGING

> "Quand vos programmes grossissent, vous avez besoin de deux choses : journaliser ce qui se passe, et débusquer les bugs. Dans ce module, on va voir `logging`, `pdb`, `cProfile` et `timeit`."

---

### 0:30 — Pourquoi logger ? (1 min)
**Texte écran :** POURQUOI LOGGER ?

> "`print()` c'est bien pour débugguer vite fait, mais en production vous avez besoin de traces structurées, avec des niveaux, des horodatages, et la possibilité de tout désactiver d'un coup."

**Comparaison :**
```python
# À éviter en production
print("Démarrage du traitement...")

# La bonne façon
import logging
logging.info("Démarrage du traitement...")
```

---

### 1:30 — Niveaux de logging (2 min)
**Texte écran :** 5 NIVEAUX DE LOG

```python
import logging

logging.debug("Message de debug")        # DEBUG (10)
logging.info("Traitement en cours")       # INFO (20)
logging.warning("Espace disque faible")   # WARNING (30)
logging.error("Erreur de connexion")      # ERROR (40)
logging.critical("Système planté !")      # CRITICAL (50)
```

> "Par défaut, seuls les messages de niveau WARNING et supérieur s'affichent. On peut configurer ça avec `basicConfig`."

```python
logging.basicConfig(level=logging.DEBUG)
# Maintenant DEBUG et INFO s'affichent aussi
```

---

### 3:30 — basicConfig (2 min)
**Texte écran :** CONFIGURER LOGGING

```python
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s — %(levelname)s — %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

logging.info("Application démarrée")
# 2026-06-24 14:30:00 — INFO — Application démarrée
```

**Logger dans un fichier :**
```python
logging.basicConfig(
    filename="app.log",
    filemode="a",          # append
    level=logging.DEBUG,
    format="%(asctime)s — %(levelname)s — %(message)s"
)
```

> "Avec `filename`, tout part dans un fichier plutôt que la console. `filemode='a'` ajoute à la fin du fichier existant."

---

### 5:30 — Logger, Handler, Formatter (2 min)
**Texte écran :** LES 3 COMPOSANTS

> "`basicConfig` cache en réalité trois objets : le **Logger**, le **Handler**, et le **Formatter**. Les configurer séparément vous donne un contrôle total."

```python
import logging

# 1. Logger
logger = logging.getLogger("mon_app")
logger.setLevel(logging.DEBUG)

# 2. Handler (console)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)

# 3. Formatter
formatter = logging.Formatter(
    "%(name)s — %(levelname)s — %(message)s"
)
console_handler.setFormatter(formatter)

# On assemble
logger.addHandler(console_handler)

logger.info("Logger configuré manuellement")
```

> "Vous pouvez ajouter plusieurs handlers : un pour la console en WARNING, un pour un fichier en DEBUG, un pour un serveur distant en ERROR."

---

### 7:30 — Déboguer avec pdb (2 min 30)
**Texte écran :** DEBUGGER AVEC pdb

```python
def division(a, b):
    resultat = a / b
    return resultat

x = 10
y = 0

breakpoint()        # ← pdb s'arrête ici (Python 3.7+)
print(division(x, y))
```

**Commandes pdb essentielles :**
| Commande | Action |
|----------|--------|
| `n` (next) | Exécute la ligne suivante |
| `s` (step) | Entre dans une fonction |
| `c` (continue) | Reprend l'exécution |
| `p variable` | Affiche une variable |
| `q` (quit) | Quitte le débogueur |
| `l` (list) | Affiche le code autour |

> "À l'arrêt du breakpoint, tapez `p x` pour voir la valeur de x, `n` pour avancer ligne par ligne, `s` pour entrer dans la fonction."

---

### 10:00 — Inspecter la pile d'appels (1 min)
**Texte écran :** PILE D'APPELS

```python
def a():
    b()

def b():
    c()

def c():
    breakpoint()   # inspecter la pile

a()
```

> "Avec `w` (where) dans pdb, vous voyez toute la pile d'appels : `c` a été appelée par `b`, qui a été appelée par `a`. Tapez `u` (up) et `d` (down) pour naviguer entre les niveaux."

---

### 11:00 — cProfile (1 min 30)
**Texte écran :** PROFILER AVEC cProfile

```python
import cProfile
import re

def traitement():
    total = 0
    for i in range(100000):
        total += i ** 2
    return total

cProfile.run("traitement()", sort="cumtime")
```

> "`cProfile` mesure le temps passé dans chaque fonction. Utile pour trouver les goulots d'étranglement. Lancez-le et regardez les colonnes `ncalls`, `tottime` et `cumtime`."

**Sortie typique :**
```
ncalls  tottime  cumtime  filename
    1    0.002    0.050   traitement
100000  0.045    0.045   {range}
```

---

### 12:30 — timeit (1 min)
**Texte écran :** MESURER AVEC timeit

```python
import timeit

# Mesurer un petit bout de code
temps = timeit.timeit(
    '"-".join(str(n) for n in range(100))',
    number=10000
)
print(f"Temps : {temps:.4f} secondes")

# Alternative : comparer deux approches
t1 = timeit.timeit('"".join(str(i) for i in range(100))', number=10000)
t2 = timeit.timeit('"".join([str(i) for i in range(100)])', number=10000)

print(f"Générateur : {t1:.4f}s")
print(f"Liste     : {t2:.4f}s")
```

> "`timeit` exécute le code plusieurs fois et donne le temps moyen. Parfait pour comparer des implémentations."

---

### 13:30 — Conclusion
> "Module 29 : on verra pourquoi et comment isoler vos projets avec les environnements virtuels."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 28 : Logging & Debugging

Au programme :
00:00 — Introduction
00:30 — Pourquoi logger ?
01:30 — Niveaux de logging (DEBUG à CRITICAL)
03:30 — Configurer logging (basicConfig)
05:30 — Logger, Handler, Formatter
07:30 — Déboguer avec pdb (breakpoint, step, next)
10:00 — Inspecter la pile d'appels
11:00 — Profiler avec cProfile
12:30 — Mesurer le temps avec timeit
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

#python #formationpython #logging #debugging #pdb #cProfile #timeit
```

## Tags YouTube
```
python, formation python, logging python, debug python, pdb python, cProfile python, timeit python, apprendre python, cours python, programmation python, python avancé, python performance
```
