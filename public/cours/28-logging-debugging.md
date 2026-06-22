# Module 28 : Logging et Debugging

**Objectifs pédagogiques**
- Maîtriser le module `logging` (niveaux, handlers, formatters)
- Configurer le logging avancé (fichiers rotatifs, email, plusieurs destinations)
- Savoir déboguer avec `pdb` et `breakpoint()`
- Faire du debugging post-mortem
- Profiler le code avec `cProfile`
- Analyser les erreurs avec `traceback`

---

## Partie 1 : Le module `logging` — Journaliser son application

### 1.1 Pourquoi logging plutôt que print ?

```python
# ❌ print est temporaire et ne s'adapte pas
print("[DEBUG] Valeur de x =", x)     # On oublie de supprimer
print("[INFO] Connexion établie")     # Pas de niveaux
print("[ERROR] Erreur !")              # Pas de destination configurable

# ✅ logging est professionnel
import logging
logging.basicConfig(level=logging.DEBUG)
logging.debug(f"Valeur de x = {x}")      # ← visible seulement en debug
logging.info("Connexion établie")          # ← visible en info
logging.error("Erreur !")                  # ← toujours visible
```

**Différence clé :** `print` écrit toujours, partout. `logging` permet de **contrôler** ce qui est affiché, où, et à quel niveau de détail.

### 1.2 Les niveaux de log (hiérarchiques)

```python
import logging

# Configuration de base (à faire UNE fois au début)
logging.basicConfig(
    level=logging.DEBUG,  # Niveau minimum affiché
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='app.log',    # Optionnel : écrire dans un fichier
)

# Niveaux : DEBUG < INFO < WARNING < ERROR < CRITICAL
# Si level=WARNING, seuls WARNING, ERROR et CRITICAL sont affichés
logging.debug("Message de debug")       # → 10
logging.info("Information")             # → 20
logging.warning("Avertissement")        # → 30
logging.error("Erreur")                 # → 40
logging.critical("Critique")            # → 50
```

**Résultat attendu (exemple avec level=INFO) :**
```
2025-01-15 10:30:00,123 - root - INFO - Information
2025-01-15 10:30:00,124 - root - WARNING - Avertissement
2025-01-15 10:30:00,125 - root - ERROR - Erreur
2025-01-15 10:30:00,126 - root - CRITICAL - Critique
```

→ `DEBUG` n'apparaît pas car on a configuré `level=INFO`.

**À retenir :** Le niveau est **hiérarchique**. `WARNING` affiche tout ce qui est >= 30.

### 1.3 Logger par module

La bonne pratique est de créer un logger par module :

```python
# module_a.py
import logging

logger = logging.getLogger(__name__)  # → "module_a"

def faire_quelque_chose():
    logger.info("Début de faire_quelque_chose")
    try:
        1 / 0
    except ZeroDivisionError:
        logger.exception("Erreur de division")
```

```python
# module_b.py
import logging

logger = logging.getLogger(__name__)  # → "module_b"

def autre_chose():
    logger.warning("Attention dans module_b")
```

**Résultat attendu :** Grâce à `%(name)s` dans le format, on sait quel module a produit chaque ligne. Indispensable dans une appli complexe.

---

## Partie 2 : Handlers et Formateurs — Où et comment écrire

### 2.1 Les handlers (destinations)

Un **handler** définit la **destination** des logs. On peut en avoir plusieurs.

```python
import logging

# Créer un logger
logger = logging.getLogger("mon_app")
logger.setLevel(logging.DEBUG)

# Handler 1 : Console
console = logging.StreamHandler()  # Par défaut : sys.stderr
console.setLevel(logging.INFO)

# Handler 2 : Fichier
fichier = logging.FileHandler("mon_app.log")
fichier.setLevel(logging.DEBUG)

# Formateur commun
formatter = logging.Formatter('%(asctime)s | %(name)s | %(levelname)s | %(message)s')
console.setFormatter(formatter)
fichier.setFormatter(formatter)

# Ajouter les handlers au logger
logger.addHandler(console)
logger.addHandler(fichier)

# Test
logger.debug("Debug seulement dans le fichier")    # → fichier seulement
logger.info("Info dans fichier + console")          # → les deux
logger.warning("Warning dans fichier + console")    # → les deux
```

**Résultat attendu :**
- Console : `2025-01-15 10:30:00,123 | mon_app | INFO | Info...`
- Console : `2025-01-15 10:30:00,124 | mon_app | WARNING | Warning...`
- Fichier : les 3 lignes (y compris DEBUG)

**Piège :** `logger.setLevel()` et `handler.setLevel()` sont **cumulatifs**. Le logger filtre d'abord, puis le handler filtre. Un message doit passer les DEUX pour être émis.

### 2.2 Configuration avancée : fichier rotatif

Pour éviter que les logs remplissent le disque, on utilise des **fichiers rotatifs** :

```python
from logging.handlers import RotatingFileHandler, TimedRotatingFileHandler

# Rotation par TAILLE : quand le fichier dépasse 1 Mo
rotatif_taille = RotatingFileHandler(
    "app.log",
    maxBytes=1_000_000,  # 1 Mo
    backupCount=5        # Garder 5 archives
)
# → Génère : app.log, app.log.1, app.log.2, ..., app.log.5

# Rotation par TEMPS : toutes les 24h (à minuit)
rotatif_temps = TimedRotatingFileHandler(
    "app.log",
    when="midnight",     # Rotation chaque nuit
    interval=1,
    backupCount=30       # Garder 30 jours
)

# Autres options pour 'when' :
# 'S' = secondes, 'M' = minutes, 'H' = heures, 'D' = jours
# 'W0'-'W6' = jour de semaine (W0 = lundi)
```

### 2.3 Configuration avancée : logging par email

```python
from logging.handlers import SMTPHandler

# Envoyer un email pour les erreurs critiques
email_handler = SMTPHandler(
    mailhost=("smtp.example.com", 587),
    fromaddr="app@example.com",
    toaddrs=["admin@example.com"],
    subject="ALERTE Application !",
    credentials=("user", "password"),  # (optionnel)
    secure=(),                          # TLS
)
email_handler.setLevel(logging.ERROR)  # Seulement les erreurs

logger = logging.getLogger("mon_app")
logger.addHandler(email_handler)
```

### 2.4 Les formateurs (format des messages)

Les formateurs utilisent des **champs** avec `%(nom_champ)s` :

```python
import logging

# Format complet (recommandé pour fichier)
formateur1 = logging.Formatter(
    '%(asctime)s | %(name)-15s | %(levelname)-8s | %(filename)s:%(lineno)d | %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# Format simple (pour console)
formateur2 = logging.Formatter(
    '%(levelname)s: %(message)s'
)

# Champs disponibles :
# %(name)s      → nom du logger
# %(levelname)s → DEBUG/INFO/WARNING/ERROR/CRITICAL
# %(message)s   → le message
# %(asctime)s   → date et heure
# %(filename)s  → nom du fichier source
# %(lineno)d    → numéro de ligne
# %(funcName)s  → nom de la fonction
# %(process)d   → PID
# %(thread)d    → Thread ID
```

### 2.5 Décorateur de log automatique

```python
import logging
from functools import wraps

logger = logging.getLogger(__name__)

def log_appel(func):
    """Décorateur qui logue automatiquement les appels de fonction."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        logger.debug(f"→ {func.__name__}(args={args}, kwargs={kwargs})")
        try:
            resultat = func(*args, **kwargs)
            logger.debug(f"← {func.__name__} → {resultat}")
            return resultat
        except Exception as e:
            logger.exception(f"✗ {func.__name__} → ERREUR: {e}")
            raise
    return wrapper


@log_appel
def division(a, b):
    return a / b

# Test
division(10, 2)
# → → division(args=(10, 2), kwargs={})
# → ← division → 5.0

division(10, 0)
# → → division(args=(10, 0), kwargs={})
# → ✗ division → ERREUR: division by zero
# → Traceback (most recent call last)...
```

---

## Partie 3 : Debugging avec pdb et breakpoint

### 3.1 pdb — Le débogueur interactif

```python
import pdb

def calculer_moyenne(nombres):
    total = sum(nombres)
    count = len(nombres)

    pdb.set_trace()  # Point d'arrêt : on entre dans le débogueur

    moyenne = total / count
    return moyenne

# Lancer
resultat = calculer_moyenne([10, 20, 30])
```

**Commandes pdb essentielles :**

| Commande | Raccourci | Description |
|----------|-----------|-------------|
| `next` | `n` | Exécute la ligne suivante (sans entrer dans les fonctions) |
| `step` | `s` | Entre dans la fonction appelée sur cette ligne |
| `continue` | `c` | Continue jusqu'au prochain point d'arrêt |
| `print variable` | `p var` | Affiche la valeur d'une variable |
| `pp variable` | | Pretty-print d'une variable complexe |
| `list` | `l` | Affiche le code source autour de la ligne courante |
| `args` | `a` | Affiche les arguments de la fonction courante |
| `where` | `w` | Affiche la pile d'appel (stack trace) |
| `up` / `down` | `u` / `d` | Remonte/descend dans la pile d'appel |
| `quit` | `q` | Quitte le débogueur |

**Session typique :**
```
(Pdb) n
> (Pdb) p total
50
(Pdb) p count
2
(Pdb) p nombres
[10, 20, 30]
(Pdb) n
> moyenne = total / count
(Pdb) p moyenne
25.0
(Pdb) c
```

### 3.2 breakpoint() — Python 3.7+

```python
def fonction(x):
    y = x * 2
    breakpoint()  # Équivalent à pdb.set_trace(), mais plus simple
    z = y + 10
    return z
```

**Avantage :** `breakpoint()` utilise `PYTHONBREAKPOINT` (variable d'environnement). On peut changer de débogueur sans modifier le code :

```bash
# Utiliser pdb (par défaut)
python mon_script.py

# Utiliser ipdb (plus joli)
export PYTHONBREAKPOINT=ipdb.set_trace
python mon_script.py

# Désactiver tous les points d'arrêt
export PYTHONBREAKPOINT=0
python mon_script.py
```

### 3.3 Debugging post-mortem

Le **post-mortem** permet d'entrer dans pdb **après** une erreur, pour examiner l'état au moment du crash.

```python
import pdb

def crash():
    x = 10
    y = 0
    z = x / y  # ZeroDivisionError !

try:
    crash()
except:
    pdb.post_mortem()  # Entre dans pdb là où l'exception a eu lieu
```

**Version avec `python -m pdb` :**
```bash
python -m pdb mon_script.py
```
→ Tape `c` (continue) pour lancer, et pdb s'arrête sur l'erreur automatiquement.

### 3.4 Points d'arrêt conditionnels avec pdb

```python
import pdb

for i in range(1000):
    # On ne veut s'arrêter que quand i == 500
    if i == 500:
        pdb.set_trace()
    resultat = i * 2
```

**Alternative :** Utiliser `breakpoint()` avec une condition intégrée via `PYTHONBREAKPOINT`.

---

## Partie 4 : Profiling avec cProfile

### 4.1 Pourquoi profiler ?

Quand votre programme est lent, **ne devinez pas** où est le goulot d'étranglement. Mesurez avec un profileur.

```python
import cProfile
import pstats

def lent():
    total = 0
    for i in range(10_000_000):
        total += i
    return total

def rapide():
    return sum(range(10_000_000))

# Profiler
cProfile.run('lent()', sort='time')
cProfile.run('rapide()', sort='time')
```

**Résultat attendu :**
```
   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.345    0.345    0.345    0.345 test.py:4(lent)
        1    0.123    0.123    0.123    0.123 test.py:9(rapide)
```

→ `tottime` = temps dans la fonction seule. `cumtime` = temps incluant les sous-appels.

### 4.2 Profiler un script complet

```bash
# Profiler tout un script
python -m cProfile -o profil_stats.dat mon_script.py

# Analyser les résultats
python -c "
import pstats
p = pstats.Stats('profil_stats.dat')
p.sort_stats('cumtime').print_stats(20)  # Top 20 des plus lents
"
```

---

## Partie 5 : Analyse des erreurs avec traceback

### 5.1 Le module traceback

```python
import traceback

def fonction_a():
    return fonction_b()

def fonction_b():
    return 1 / 0  # Erreur ici

try:
    fonction_a()
except Exception:
    # Récupérer la trace complète sous forme de chaîne
    trace = traceback.format_exc()
    print("TRACE COMPLÈTE :")
    print(trace)
```

**Résultat attendu :**
```
TRACE COMPLÈTE :
Traceback (most recent call last):
  File "test.py", line 9, in fonction_a
    return fonction_b()
  File "test.py", line 12, in fonction_b
    return 1 / 0
ZeroDivisionError: division by zero
```

### 5.2 Extraire des informations de la trace

```python
import traceback
import sys

try:
    1 / 0
except ZeroDivisionError:
    # Obtenir le tuple (type, valeur, traceback)
    exc_type, exc_value, exc_tb = sys.exc_info()

    print(f"Type : {exc_type.__name__}")        # → ZeroDivisionError
    print(f"Message : {exc_value}")              # → division by zero

    # Extraire la dernière frame (là où l'erreur a eu lieu)
    frame = traceback.extract_tb(exc_tb)[-1]
    print(f"Fichier : {frame.filename}")
    print(f"Ligne : {frame.lineno}")
    print(f"Fonction : {frame.name}")
    print(f"Code : {frame.line}")
```

---

## Partie 6 : Configuration complète d'un système de logging

### 6.1 Exemple complet

```python
import logging
import logging.handlers
import sys

def configurer_logging(nom_app="mon_app", fichier_log="app.log"):
    """Configure le logging de l'application."""
    # Logger principal
    logger = logging.getLogger(nom_app)
    logger.setLevel(logging.DEBUG)

    # Format commun
    formatter_verbose = logging.Formatter(
        '%(asctime)s | %(name)-15s | %(levelname)-8s | '
        '%(filename)s:%(lineno)d | %(message)s'
    )
    formatter_simple = logging.Formatter(
        '%(levelname)-8s | %(message)s'
    )

    # Handler 1 : Console (INFO et plus)
    console = logging.StreamHandler(sys.stdout)
    console.setLevel(logging.INFO)
    console.setFormatter(formatter_simple)
    logger.addHandler(console)

    # Handler 2 : Fichier (DEBUG et plus, rotation)
    fichier = logging.handlers.RotatingFileHandler(
        fichier_log,
        maxBytes=1_000_000,  # 1 Mo
        backupCount=5
    )
    fichier.setLevel(logging.DEBUG)
    fichier.setFormatter(formatter_verbose)
    logger.addHandler(fichier)

    # Handler 3 : Fichier d'erreurs séparé
    erreurs = logging.handlers.RotatingFileHandler(
        "erreurs.log",
        maxBytes=1_000_000,
        backupCount=3
    )
    erreurs.setLevel(logging.ERROR)
    erreurs.setFormatter(formatter_verbose)
    logger.addHandler(erreurs)

    return logger


# Utilisation
log = configurer_logging()

log.debug("Message détaillé (fichier seulement)")
log.info("Message informatif (console + fichier)")
log.warning("Avertissement (console + fichier)")
log.error("Erreur (console + fichier + erreurs.log)")
```

### 6.2 Bonnes pratiques

1. **Un logger par module :** `logger = logging.getLogger(__name__)`
2. **Ne jamais logger d'informations sensibles :** mots de passe, tokens, données personnelles
3. **Utiliser `logger.exception()`** dans les blocs `except` : elle ajoute automatiquement la trace
4. **Configurer le logging au démarrage** de l'application (dans `main` ou dans un fichier de config)
5. **Éviter les logs en production au niveau DEBUG** (volume énorme et ralentissement)

---

## Résumé du module

| Concept | Rôle | Exemple |
|---------|------|---------|
| `logging.basicConfig()` | Configuration rapide | Niveau, format, fichier |
| `logging.getLogger()` | Logger par module | `__name__` |
| `StreamHandler` | Sortie console | `sys.stdout`, `sys.stderr` |
| `FileHandler` | Sortie fichier | `app.log` |
| `RotatingFileHandler` | Rotation par taille | `maxBytes=1_000_000` |
| `SMTPHandler` | Logs par email | Pour les erreurs critiques |
| `Formatter` | Format des messages | `%(asctime)s %(message)s` |
| `pdb.set_trace()` / `breakpoint()` | Point d'arrêt | Inspecter l'état |
| `pdb.post_mortem()` | Debug post-erreur | Analyser le crash |
| `cProfile` | Profiling | `python -m cProfile script.py` |
| `traceback` | Analyse des erreurs | `format_exc()`, `extract_tb()` |

---

## Exercices

1. **Logging configurable :** Crée une fonction `setup_logging(level, fichier)` qui configure le logging pour écrire à la fois dans un fichier (niveau DEBUG) et sur la console (niveau >= INFO). Le format doit inclure la date, le niveau et le message.

2. **Décorateur de timing :** Crée un décorateur `@timer` qui logue le temps d'exécution de chaque fonction décorée. Utilise `logging` au lieu de `print`.

3. **Debugging interactif :** Écris une fonction `recherche_dichotomique(liste, cible)` avec une erreur intentionnelle. Débogue-la avec `pdb` pour trouver et corriger l'erreur.

4. **Profileur :** Compare les performances de `sum(range(n))` vs une boucle `for` manuelle pour `n=10_000_000`. Utilise `cProfile` et explique la différence.

5. **Système de logging complet :** Implémente un système qui logue dans 3 destinations :
   - Console : niveau INFO, format simple
   - Fichier principal : niveau DEBUG, rotation 5 Mo, 3 backups
   - Fichier d'erreurs : niveau ERROR seulement, sans rotation
   Inclus un décorateur `@log_appel` qui trace les entrées/sorties des fonctions.
