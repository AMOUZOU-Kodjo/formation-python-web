# Module 18 : Context Managers

---

## Objectifs pedagogiques

A la fin de ce module, vous serez capable de :
- Expliquer pourquoi les context managers sont utiles (vs `try/finally`)
- Creer un **context manager avec une classe** (`__enter__` / `__exit__`)
- Creer un **context manager avec `@contextmanager`** et `yield`
- Utiliser les utilitaires de `contextlib` (`redirect_stdout`, `closing`, `suppress`)
- Gerer plusieurs ressources avec `ExitStack`
- Appliquer des cas concrets : base de donnees, lock, timer

---

## 1. Pourquoi les context managers ?

### Le probleme : oublier de fermer/liberer

```python
# MAUVAIS : on oublie de fermer le fichier
f = open("data.txt", "w", encoding="utf-8")
f.write("Hello")
# Oops, f.close() n'est jamais appele !
# Le fichier peut etre corrompu, verrouille...

# PASSE-PARTOUT : try/finally fonctionne mais verbeux
f = open("data.txt", "w", encoding="utf-8")
try:
    f.write("Hello")
finally:
    f.close()  # garanti d'etre appele
```

### La solution : `with`

```python
# BON : context manager
with open("data.txt", "w", encoding="utf-8") as f:
    f.write("Hello")
# f.close() est appele AUTOMATIQUEMENT a la sortie du bloc
```

### Pourquoi `with` est superieur a `try/finally`

```python
# try/finally : verbeux, facile a oublier
resource = acquerir()
try:
    utiliser(resource)
finally:
    liberer(resource)

# with : clair, sur, concis
with acquerir() as resource:
    utiliser(resource)
# liberation automatique
```

> **A retenir** : Le `with` garantit que `__exit__` est appele **meme si une exception survient** dans le bloc.

---

## 2. Creer un context manager : approche classe

### Le protocole

Un context manager doit implementer deux methodes :
- **`__enter__`** : appele a l'entree du bloc `with`. Retourne la valeur apres `as`.
- **`__exit__`** : appele a la sortie du bloc (succes ou exception). Nettoie les ressources.

```python
class MonFichier:
    """Context manager pour fichier (similaire a open())."""

    def __init__(self, nom, mode="r"):
        self.nom = nom
        self.mode = mode
        self.fichier = None

    def __enter__(self):
        """Appele a l'entree du with. Retourne la ressource."""
        print(f"Ouverture de {self.nom}...")
        self.fichier = open(self.nom, self.mode, encoding="utf-8")
        return self.fichier  # sera lie a "as f"

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Appele a la sortie du with. Nettoie.
        - exc_type : type de l'exception (None si pas d'erreur)
        - exc_val : valeur de l'exception
        - exc_tb : traceback
        """
        print(f"Fermeture de {self.nom}...")
        if self.fichier:
            self.fichier.close()

        # Retourner False → propager l'exception
        # Retourner True → supprimer l'exception
        return False

# Utilisation
with MonFichier("test.txt", "w") as f:
    f.write("Hello depuis MonFichier !")
# Ouverture de test.txt...
# Fermeture de test.txt...
```

### Les details de `__exit__`

```python
class TestContext:
    def __enter__(self):
        return "ressource"

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"exc_type: {exc_type}")
        print(f"exc_val: {exc_val}")

        if exc_type is ValueError:
            print("→ On ignore les ValueError")
            return True   # supprime l'exception
        # return False (implicite) → propage l'exception

# Cas 1 : pas d'erreur
with TestContext() as r:
    print(r)
# exc_type: None
# exc_val: None

# Cas 2 : ValueError (ignore)
with TestContext() as r:
    raise ValueError("Oups !")
# exc_type: <class 'ValueError'>
# exc_val: Oups !
# → On ignore les ValueError (pas d'erreur affichee)

# Cas 3 : TypeError (propage)
with TestContext() as r:
    raise TypeError("Erreur grave")
# exc_type: <class 'TypeError'>
# exc_val: Erreur grave
# → TypeError est propage (visible apres)
```

> **Piege courant** : Ne jamais retourner `True` sans raison. Supprimer une exception peut cacher des bugs !

### Exemple concret : verrouillage (lock)

```python
import threading

class Verrou:
    """Context manager pour un verrouillage."""
    def __init__(self, lock=None):
        self.lock = lock or threading.Lock()

    def __enter__(self):
        self.lock.acquire()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.lock.release()
        return False

# Usage
lock = threading.Lock()

def tache_securee():
    with Verrou(lock):
        print("Section critique : un thread a la fois")

threads = [threading.Thread(target=tache_securee) for _ in range(5)]
for t in threads: t.start()
for t in threads: t.join()
```

### Exemple concret : connexion base de donnees

```python
class ConnexionBD:
    """Context manager simule pour une base de donnees."""

    def __init__(self, hote, base):
        self.hote = hote
        self.base = base
        self.connectee = False

    def __enter__(self):
        print(f"Connexion a {self.hote}/{self.base}...")
        self.connectee = True
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Fermeture de la connexion...")
        self.connectee = False
        if exc_type:
            print(f"Rollback a cause de : {exc_val}")
        else:
            print("Commit reussi !")
        return False

    def requete(self, sql):
        if not self.connectee:
            raise RuntimeError("Pas connecte !")
        print(f"Execution : {sql}")
        return f"Resultat de {sql}"

# Succes
with ConnexionBD("localhost", "mydb") as db:
    db.requete("SELECT * FROM users")
# Connexion a localhost/mydb...
# Execution : SELECT * FROM users
# Commit reussi !
# Fermeture de la connexion...

# Erreur
with ConnexionBD("localhost", "mydb") as db:
    db.requete("SELECT * FROM users")
    raise ValueError("Erreur metier")
# Connexion a localhost/mydb...
# Execution : SELECT * FROM users
# Rollback a cause de : Erreur metier
# Fermeture de la connexion...
# ValueError est propage
```

---

## 3. `@contextmanager` : approche fonctionnelle

### Le decorateur qui simplifie tout

Python fournit `contextlib.contextmanager`, un decorateur qui transforme un **generateur** (avec `yield`) en context manager.

```python
from contextlib import contextmanager

@contextmanager
def mon_fichier(nom, mode):
    """Context manager via decorateur. Plus concis que la classe."""
    print(f"Ouverture de {nom}...")
    f = open(nom, mode, encoding="utf-8")
    try:
        yield f  # ← c'est la valeur retournee par __enter__
    finally:
        print(f"Fermeture de {nom}...")
        f.close()  # ← equivalent de __exit__

# Utilisation identique
with mon_fichier("test.txt", "w") as f:
    f.write("Hello depuis @contextmanager !")
# Ouverture de test.txt...
# Fermeture de test.txt...
```

### Comment ca fonctionne

```python
@contextmanager
def exemple():
    print("1. __enter__")
    yield "ressource"
    print("4. __exit__ (normal)")

# Equivalent a :
class ExempleClasse:
    def __enter__(self):
        print("1. __enter__")
        return "ressource"

    def __exit__(self, *args):
        print("4. __exit__")

with exemple() as r:
    print(f"2. Utilisation de {r}")
    print("3. Fin du bloc")
# 1. __enter__
# 2. Utilisation de ressource
# 3. Fin du bloc
# 4. __exit__ (normal)
```

> **Important** : Le code avant `yield` = `__enter__`. Le code apres `yield` = `__exit__`. Le `try/finally` est **obligatoire** pour gerer les exceptions proprement.

### Gestion des exceptions avec `@contextmanager`

```python
@contextmanager
def gestion_erreur():
    print("Debut")
    try:
        yield
    except ValueError as e:
        print(f"ValueError attrapee : {e}")
        # Ne pas relancer → l'exception est supprimee
    except TypeError:
        print("TypeError attrapee, mais on relance")
        raise  # on relance → propagee
    finally:
        print("Nettoyage (toujours execute)")

# ValueError supprimee
with gestion_erreur():
    raise ValueError("Pas grave")
# Debut
# ValueError attrapee : Pas grave
# Nettoyage (toujours execute)

# TypeError propagee
with gestion_erreur():
    raise TypeError("Grave")
# Debut
# TypeError attrapee, mais on relance
# Nettoyage (toujours execute)
# TypeError: Grave
```

---

## 4. Utilitaires du module `contextlib`

### `redirect_stdout` : capturer la sortie standard

```python
from contextlib import redirect_stdout
import io

def dire_bonjour():
    print("Bonjour tout le monde !")
    print("Ceci est un message normal.")

# Capturer la sortie dans une chaine
buffer = io.StringIO()
with redirect_stdout(buffer):
    dire_bonjour()

contenu = buffer.getvalue()
print(f"--- Contenu capture ---\n{contenu}--- Fin ---")
# Affiche :
# --- Contenu capture ---
# Bonjour tout le monde !
# Ceci est un message normal.
# --- Fin ---
```

### `redirect_stderr` : capturer les erreurs

```python
from contextlib import redirect_stderr
import io

# Meme principe pour stderr
err_buffer = io.StringIO()
with redirect_stderr(err_buffer):
    import sys
    print("Erreur !", file=sys.stderr)
```

### `closing` : appeler automatiquement `.close()`

Pour les objets qui ont une methode `close()` mais ne sont pas des context managers :

```python
from contextlib import closing
from urllib.request import urlopen

with closing(urlopen("https://www.python.org")) as page:
    # page.close() sera appele automatiquement
    print(page.status)  # → 200
```

### `suppress` : ignorer certaines exceptions

```python
from contextlib import suppress
import os

# Au lieu de :
try:
    os.remove("fichier_temporaire.txt")
except FileNotFoundError:
    pass

# On peut ecrire :
with suppress(FileNotFoundError):
    os.remove("fichier_temporaire.txt")

# On peut ignorer plusieurs types
with suppress(FileNotFoundError, PermissionError):
    os.remove("fichier_protege.txt")
```

### `nullcontext` : context manager no-op

Utile quand on a besoin d'un context manager de facon conditionnelle :

```python
from contextlib import nullcontext

def traiter_fichier(nom_fichier=None):
    # Si nom_fichier est fourni, ouvrir le fichier
    # Sinon, utiliser stdin (pas de gestion de contexte necessaire)
    ctx = open(nom_fichier) if nom_fichier else nullcontext()
    with ctx as source:
        for ligne in source:
            print(ligne.strip())

# Equivalent de :
import sys
if nom_fichier:
    with open(nom_fichier) as f:
        ...
else:
    for ligne in sys.stdin:
        ...
```

---

## 5. Context manager timer

### Approche classe

```python
import time

class Chronometre:
    """Context manager : mesure le temps d'execution du bloc."""

    def __enter__(self):
        self.debut = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.duree = time.perf_counter() - self.debut
        print(f"Duree : {self.duree:.4f}s")
        return False

# Utilisation
with Chronometre() as chrono:
    time.sleep(0.5)
    total = sum(range(1000000))
# Duree : 0.5123s
```

### Approche `@contextmanager` plus concise

```python
@contextmanager
def chronometre():
    debut = time.perf_counter()
    try:
        yield
    finally:
        duree = time.perf_counter() - debut
        print(f"Duree : {duree:.4f}s")

with chronometre():
    time.sleep(0.3)
# Duree : 0.3012s
```

### Chronometre avec nom

```python
@contextmanager
def timer(nom="Bloc"):
    debut = time.perf_counter()
    try:
        yield
    finally:
        duree = time.perf_counter() - debut
        print(f"[{nom}] {duree:.4f}s")

with timer("Calcul intensif"):
    sum(x**2 for x in range(10**6))
# [Calcul intensif] 0.0341s
```

---

## 6. Gerer plusieurs ressources : `ExitStack`

### Le probleme des ressources multiples

```python
# Plusieurs with imbriques = lourd
with open("a.txt") as f1:
    with open("b.txt") as f2:
        with open("c.txt") as f3:
            contenu = f1.read() + f2.read() + f3.read()

# Plusieurs ressources dans un seul with (Python 3.10+)
with (
    open("a.txt") as f1,
    open("b.txt") as f2,
    open("c.txt") as f3,
):
    contenu = f1.read() + f2.read() + f3.read()
```

### `ExitStack` : gestion dynamique

`ExitStack` permet de gerer un **nombre variable** de context managers :

```python
from contextlib import ExitStack

def ouvrir_fichiers(*noms):
    """Ouvre un nombre arbitraire de fichiers."""
    with ExitStack() as stack:
        fichiers = [
            stack.enter_context(open(nom, encoding="utf-8"))
            for nom in noms
        ]
        # Tous les fichiers sont ouverts
        # Ils seront fermes automatiquement a la sortie du with
        return [f.read() for f in fichiers]
```

### Cas concret : nettoyage conditionnel

```python
from contextlib import ExitStack

def ecrire_fichiers_si_valide(fichiers_donnees):
    """Ecrit des fichiers mais nettoie si erreur."""
    with ExitStack() as stack:
        fichiers = {}
        for nom, contenu in fichiers_donnees.items():
            f = open(nom, "w", encoding="utf-8")
            stack.enter_context(f)
            fichiers[nom] = f

        # Si une exception survient ici, tous les fichiers
        # deja ouverts sont fermes automatiquement
        for nom, contenu in fichiers_donnees.items():
            if not contenu:
                raise ValueError(f"Contenu vide pour {nom}")
            fichiers[nom].write(contenu)

    # Si on arrive ici, tout est commit (fichiers fermes)
    print("Tous les fichiers ecrits avec succes")
```

### `callback` et `pop_all`

```python
def operation_risquee():
    with ExitStack() as stack:
        # Enregistrer un callback de nettoyage
        stack.callback(lambda: print("Nettoyage 1"))
        stack.callback(lambda: print("Nettoyage 2"))

        # Si tout va bien, on "pop" le stack
        # pour ne pas nettoyer
        stack.pop_all()
        print("Operation reussie, on garde les ressources")

operation_risquee()
# Operation reussie, on garde les ressources
# (pas de message de nettoyage)
```

---

## 7. Comparaison : approche classe vs `@contextmanager`

| Criteres | Classe | `@contextmanager` |
|----------|--------|-------------------|
| **Complexite** | Plus long a ecrire | Plus concis |
| **Lisibilite** | Claire, explicite | Tres lisible |
| **Etat** | Peut stocker etat dans `self` | Variable locale suffit |
| **Heritage** | Peut etre sous-classee | Pas d'heritage possible |
| **Utilisation unique** | Non (on peut reutiliser) | Oui (generateur unique) |
| **Cas complexes** | Meilleure (exceptions, etat) | Suffit pour 90% des cas |

**Regle empirique** :
- Si le context manager est simple (< 10 lignes) : `@contextmanager`
- Si le context manager gere un etat complexe : classe
- Si vous devez sous-classer : classe

---

## 8. Bonnes pratiques

### Toujours utiliser `with` pour les ressources

```python
# Fichiers
with open(...) as f: ...

# Connexions base de donnees
with connection.cursor() as cur: ...

# Verrous threading
with lock: ...

# Tests unitaires
with self.assertRaises(ValueError): ...
```

### Ne pas retourner `True` dans `__exit__` sauf si necessaire

```python
# MAUVAIS : supprime toute exception
def __exit__(self, *args):
    return True  # ← cache tous les bugs !

# BON : laisse propager (ou traite specifiquement)
def __exit__(self, exc_type, *args):
    if exc_type is ValueError:
        return True  # ← ne supprime QUE les ValueError
    return False
```

### Implementer `__enter__` et `__exit__` proprement

- `__enter__` : ouvrir/initialiser, retourner la ressource
- `__exit__` : fermer/nettoyer, retourner False (sauf exception traitee)

---

## Resume du module

| Concept | Methode / Syntaxe | Description |
|---------|------------------|-------------|
| **Motif de base** | `with x as y:` | Gestion automatique de ressources |
| **Approche classe** | `__enter__` + `__exit__` | Controle total |
| **Approche decorateur** | `@contextmanager` + `yield` | Plus concis |
| **`redirec_stdout`** | `contextlib.redirect_stdout` | Capturer print() |
| **`suppress`** | `contextlib.suppress(e)` | Ignorer une exception |
| **`closing`** | `contextlib.closing(obj)` | Appeler .close() |
| **`ExitStack`** | `contextlib.ExitStack` | Gerer N ressources |
| **`nullcontext`** | `contextlib.nullcontext()` | No-op conditionnel |

---

## Exercices

### Exercice 1 : Context manager CSV
Creez une classe `FichierCSV` qui :
- `__enter__` ouvre le fichier et retourne un lecteur CSV (`csv.reader`)
- `__exit__` ferme le fichier
- Testez avec un petit fichier CSV

### Exercice 2 : `@contextmanager` pour base de donnees
Reecrivez `ConnexionBD` avec `@contextmanager` au lieu d'une classe.

### Exercice 3 : Temporisateur
Creez un context manager `tempo(secondes)` qui :
- A l'entree : ne fait rien
- A la sortie : attend `secondes` secondes (time.sleep)
- Utile pour : limiter le debit d'appels API

### Exercice 4 : `ExitStack` pour sauvegarde atomique
Creez une fonction `sauvegarder_fichiers(donnees)` qui :
- Ecrit chaque fichier dans un dossier temporaire
- Si tout reussit, deplace les fichiers vers la destination
- Si une erreur survient, supprime les fichiers temporaires
- Utilisez `ExitStack` pour gerer le nettoyage

### Exercice 5 : Profiler hierarchique
Creez un context manager `profileur(nom)` qui :
- Mesure le temps d'execution
- Supporte l'imbrication (with dans with)
- Affiche avec indentation : `  [outer] 0.5s`
