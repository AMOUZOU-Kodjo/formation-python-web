# Module 17 : Décorateurs

---

## Objectifs pédagogiques

À la fin de ce module, vous serez capable de :
- Comprendre que les **fonctions sont des objets** en Python
- Créer un **décorateur simple** qui étend le comportement d'une fonction
- Créer des **décorateurs paramétrés** (avec arguments)
- Utiliser `functools.wraps` pour préserver les métadonnées
- Créer des **décorateurs avec état** (mémoire, compteur)
- **Chaîner** plusieurs décorateurs
- Créer un **décorateur de classe**
- Appliquer des décorateurs concrets : **timer, retry, cache**
- Comprendre comment `@property` et `@staticmethod` fonctionnent

---

## 1. Python : les fonctions sont des objets

### Prérequis fondamental

Avant de comprendre les décorateurs, il faut intérioriser ceci :

```python
def dire_bonjour():
    return "Bonjour !"

# Une fonction est un objet comme un autre :
print(type(dire_bonjour))    # → <class 'function'>
print(dire_bonjour.__name__) # → dire_bonjour

# On peut l'affecter à une variable :
ma_fonction = dire_bonjour
print(ma_fonction())         # → Bonjour !

# On peut la passer en argument :
def executer(fonction):
    print("Exécution de :", fonction.__name__)
    return fonction()

print(executer(dire_bonjour))
# Exécution de : dire_bonjour
# Bonjour !

# On peut définir une fonction dans une fonction :
def externe():
    print("Fonction externe")

    def interne():
        print("Fonction interne")

    return interne  # on retourne la fonction (pas l'appeler)

f = externe()
# → Fonction externe
f()
# → Fonction interne
```

> **À retenir** : Les décorateurs exploitent le fait que les fonctions sont des **objets de première classe** : on peut les passer, les retourner, les stocker.

### Closure : une fonction avec mémoire

Une **closure** est une fonction qui "capture" des variables de son environnement :

```python
def creer_multiplieur(facteur):
    """Retourne une fonction qui multiplie par facteur."""
    def multiplieur(valeur):
        return valeur * facteur  # facteur est "capturé"
    return multiplieur

fois3 = creer_multiplieur(3)
fois5 = creer_multiplieur(5)

print(fois3(10))  # → 30
print(fois5(10))  # → 50

# fois3 "se souvient" que facteur = 3
# fois5 "se souvient" que facteur = 5
```

> Les décorateurs sont basés sur les closures. Comprenez bien cet exemple avant de continuer.

---

## 2. Décorateur simple : le concept

### Définition

Un **décorateur** est une fonction qui :
1. **prend une fonction** en argument
2. crée une **fonction wrapper** qui ajoute du comportement
3. **retourne** le wrapper

```python
def mon_decorateur(fonction):
    """Décorateur : affiche un message avant et après l'appel."""
    def wrapper():
        print("→ Avant l'appel")
        fonction()
        print("← Après l'appel")
    return wrapper

# Application manuelle (sans syntaxe @)
def dire_bonjour():
    print("Bonjour !")

dire_bonjour = mon_decorateur(dire_bonjour)
dire_bonjour()
# → Avant l'appel
# Bonjour !
# ← Après l'appel
```

### La syntaxe `@`

```python
@mon_decorateur
def dire_bonjour():
    print("Bonjour !")

# Strictement équivalent à :
# dire_bonjour = mon_decorateur(dire_bonjour)

dire_bonjour()
# → Avant l'appel
# Bonjour !
# ← Après l'appel
```

> **À retenir** : `@decorateur` est juste du **sucre syntaxique**. `@mon_decorateur` et `dire_bonjour = mon_decorateur(dire_bonjour)` sont identiques.

### Décorateur avec paramètres de fonction

```python
def logger(fonction):
    """Décorateur : loggue les appels et le résultat."""
    def wrapper(*args, **kwargs):
        # *args et **kwargs capturent tous les arguments
        print(f"Appel de {fonction.__name__}("
              f"args={args}, kwargs={kwargs})")
        resultat = fonction(*args, **kwargs)
        print(f"  → Résultat : {resultat}")
        return resultat
    return wrapper

@logger
def addition(a, b):
    return a + b

@logger
def saluer(nom, greeting="Bonjour"):
    return f"{greeting}, {nom} !"

print(addition(3, 5))
# Appel de addition(args=(3, 5), kwargs={})
#   → Résultat : 8
# 8

print(saluer("Alice"))
# Appel de saluer(args=('Alice',), kwargs={})
#   → Résultat : Bonjour, Alice !
# Bonjour, Alice !

print(saluer("Bob", greeting="Salut"))
# Appel de saluer(args=('Bob',), kwargs={'greeting': 'Salut'})
#   → Résultat : Salut, Bob !
# Salut, Bob !
```

---

## 3. `functools.wraps` : préserver les métadonnées

### Le problème

```python
def decorateur(fonction):
    def wrapper(*args, **kwargs):
        return fonction(*args, **kwargs)
    return wrapper

@decorateur
def dire_bonjour():
    """Une fonction qui dit bonjour."""
    return "Bonjour !"

print(dire_bonjour.__name__)  # → wrapper (au lieu de dire_bonjour)
print(dire_bonjour.__doc__)   # → None (la docstring a disparu)
```

### La solution

```python
from functools import wraps

def decorateur(fonction):
    @wraps(fonction)  # ← recopie __name__, __doc__, etc.
    def wrapper(*args, **kwargs):
        return fonction(*args, **kwargs)
    return wrapper

@decorateur
def dire_bonjour():
    """Une fonction qui dit bonjour."""
    return "Bonjour !"

print(dire_bonjour.__name__)  # → dire_bonjour
print(dire_bonjour.__doc__)   # → Une fonction qui dit bonjour.
```

> **Règle** : **TOUJOURS** utiliser `@wraps(fonction)` sur le wrapper d'un décorateur. Sinon, les métadonnées de la fonction décorée sont perdues.

---

## 4. Décorateur avec paramètres

Parfois, on veut passer des **arguments** au décorateur lui-même.

### Structure en 3 niveaux

```python
def repeter(n=2):
    """Décorateur paramétré : répète l'appel n fois."""
    def decorateur(fonction):    # niveau intermédiaire : reçoit la fonction
        @wraps(fonction)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                resultat = fonction(*args, **kwargs)
            return resultat
        return wrapper
    return decorateur            # retourne le décorateur

# Usage
@repeter(3)
def saluer(nom):
    print(f"Bonjour {nom} !")

saluer("Alice")
# Bonjour Alice !
# Bonjour Alice !
# Bonjour Alice !

# Valeur par défaut
@repeter()     # équivaut à @repeter(2)
def bip():
    print("Bip !")

bip()
# Bip !
# Bip !
```

### Ce qui se passe

```python
# Quand on écrit @repeter(3) :
# 1. repeter(3) est appelé → retourne decorateur
# 2. @decorateur est appliqué à la fonction
# 3. C'est équivalent à : saluer = repeter(3)(saluer)

# Version sans sucre syntaxique :
def saluer(nom):
    print(f"Bonjour {nom} !")

saluer = repeter(3)(saluer)
```

> **Piège courant** : Oublier les parenthèses même quand on utilise la valeur par défaut.
> ```python
> @repeter       # ⚠️ repeter est appelé comme décorateur (sans parenthèses)
> def foo(): ...
> # Passe repeter.__init__(fonction) ? Non, repeter attend un argument n
> ```

### Solution pour décorateur optionnel

```python
def repeter(func=None, n=2):
    """Décorateur utilisable avec ou sans parenthèses."""
    def decorateur(fonction):
        @wraps(fonction)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                fonction(*args, **kwargs)
        return wrapper

    if func is None:
        # @repeter(n=3) : on retourne le décorateur
        return decorateur
    else:
        # @repeter : func est la fonction à décorer
        return decorateur(func)

@repeter
def a(): print("a")
@repeter(n=3)
def b(): print("b")

a()  # a (×2)
b()  # b (×3)
```

---

## 5. Décorateurs avec état

### Compteur d'appels

```python
from functools import wraps

def compter_appels(fonction):
    """Décorateur : compte combien de fois la fonction est appelée."""
    @wraps(fonction)
    def wrapper(*args, **kwargs):
        wrapper.compteur += 1
        print(f"Appel n°{wrapper.compteur} de {fonction.__name__}")
        return fonction(*args, **kwargs)

    wrapper.compteur = 0  # état attaché au wrapper
    return wrapper

@compter_appels
def dire_bonjour():
    print("Bonjour !")

dire_bonjour()  # Appel n°1 de dire_bonjour / Bonjour !
dire_bonjour()  # Appel n°2 de dire_bonjour / Bonjour !
dire_bonjour()  # Appel n°3 de dire_bonjour / Bonjour !
print(dire_bonjour.compteur)  # → 3
```

### Mémoïsation (cache)

```python
def memoize(fonction):
    """Décorateur : met en cache les résultats des appels."""
    cache = {}  # état : dictionnaire de cache
    hits = 0

    @wraps(fonction)
    def wrapper(*args, **kwargs):
        # Les clés du cache doivent être hashables
        cle = (args, tuple(sorted(kwargs.items())))
        if cle not in cache:
            cache[cle] = fonction(*args, **kwargs)
            wrapper.misses += 1
        else:
            wrapper.hits += 1
        return cache[cle]

    wrapper.hits = 0
    wrapper.misses = 0
    wrapper.cache = cache
    return wrapper

@memoize
def fibonacci(n):
    """Fibonacci récursif (naïf sans cache = très lent)."""
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(35))  # → 9227465 (instantané grâce au cache)
print(f"Hits: {fibonacci.hits}, Misses: {fibonacci.misses}")
# → Hits: 33, Misses: 36
# Sans cache, fibonacci(35) ferait 18 millions d'appels !
```

---

## 6. Cas concrets : timer, retry, cache

### Timer : mesurer le temps d'exécution

```python
import time
from functools import wraps

def timer(fonction):
    """Décorateur : mesure le temps d'exécution."""
    @wraps(fonction)
    def wrapper(*args, **kwargs):
        debut = time.perf_counter()
        resultat = fonction(*args, **kwargs)
        duree = time.perf_counter() - debut
        print(f"{fonction.__name__} a pris {duree:.4f}s")
        return resultat
    return wrapper

@timer
def calcul_lent():
    time.sleep(0.5)
    return "Fini !"

print(calcul_lent())
# calcul_lent a pris 0.5012s
# Fini !
```

### Retry : réessayer en cas d'erreur

```python
import time
from functools import wraps

def retry(max_tentatives=3, delai=0.5):
    """Décorateur : réessaie si une exception est levée."""
    def decorateur(fonction):
        @wraps(fonction)
        def wrapper(*args, **kwargs):
            for tentative in range(1, max_tentatives + 1):
                try:
                    return fonction(*args, **kwargs)
                except Exception as e:
                    if tentative == max_tentatives:
                        raise  # dernière tentative : on propage
                    print(f"Tentative {tentative}/{max_tentatives} "
                          f"échouée: {e}. Nouvel essai dans {delai}s...")
                    time.sleep(delai)
            return None  # jamais atteint
        return wrapper
    return decorateur

@retry(max_tentatives=3, delai=0.2)
def connexion_reseau():
    import random
    if random.random() < 0.7:  # 70% de chance d'échec
        raise ConnectionError("Timeout réseau")
    return "Connecté !"

print(connexion_reseau())
# Peut afficher :
# Tentative 1/3 échouée: Timeout réseau. Nouvel essai dans 0.2s...
# Tentative 2/3 échouée: Timeout réseau. Nouvel essai dans 0.2s...
# Connecté !
```

### LRU Cache : version simplifiée

```python
from functools import wraps

def lru_cache(maxsize=128):
    """Décorateur : cache LRU (Least Recently Used) simplifié."""
    def decorateur(fonction):
        cache = {}
        ordre = []  # pour suivre l'ordre d'utilisation

        @wraps(fonction)
        def wrapper(*args, **kwargs):
            cle = (args, tuple(sorted(kwargs.items())))
            if cle in cache:
                # Mettre à jour l'ordre (récent)
                ordre.remove(cle)
                ordre.append(cle)
                print(f"Cache HIT pour {args}")
                return cache[cle]

            resultat = fonction(*args, **kwargs)
            cache[cle] = resultat
            ordre.append(cle)

            if len(cache) > maxsize:
                # Supprimer le plus ancien
                ancien = ordre.pop(0)
                del cache[ancien]

            return resultat
        return wrapper
    return decorateur

@lru_cache(maxsize=3)
def calcul_cher(x):
    print(f"Calcul de {x}...")
    return x * x

print(calcul_cher(4))  # Calcul de 4... / 16
print(calcul_cher(5))  # Calcul de 5... / 25
print(calcul_cher(4))  # Cache HIT pour (4,) / 16
```

---

## 7. Chaînage de décorateurs

On peut empiler plusieurs décorateurs sur une même fonction :

```python
@timer
@logger  # s'applique d'abord à la fonction
def addition(a, b):
    return a + b

# Est équivalent à :
# addition = timer(logger(addition))

print(addition(3, 5))
# Appel de addition(args=(3, 5), kwargs={})    ← logger
#   → Résultat : 8                              ← logger
# addition a pris 0.0001s                       ← timer
# 8
```

> **Ordre d'application** : Les décorateurs s'appliquent de **bas en haut**.
> `@timer` puis `@logger` au-dessus = `timer(logger(fonction))`.
> logger s'exécute en premier, timer autour.

```python
from functools import wraps

def encadrer(fonction):
    @wraps(fonction)
    def wrapper(*args, **kwargs):
        print("=" * 20)
        resultat = fonction(*args, **kwargs)
        print("=" * 20)
        return resultat
    return wrapper

def majuscule(fonction):
    @wraps(fonction)
    def wrapper(*args, **kwargs):
        resultat = fonction(*args, **kwargs)
        return resultat.upper()
    return wrapper

@encadrer
@majuscule
def message():
    return "Bonjour tout le monde !"

# ordre : message → majuscule → encadrer
print(message())
# ====================
# BONJOUR TOUT LE MONDE !
# ====================
```

---

## 8. Décorateur de classe

### Ajouter des méthodes à une classe

```python
def ajouter_methode_spe(cls):
    """Décorateur de classe : ajoute une méthode."""
    @wraps  # pas de @wraps ici (ce n'est pas un décorateur de fonction)
    def nouvelle_methode(self):
        return "Nouvelle méthode ajoutée !"

    cls.nouvelle_methode = nouvelle_methode
    return cls

@ajouter_methode_spe
class MaClasse:
    def methode_existante(self):
        return "Méthode originale"

obj = MaClasse()
print(obj.methode_existante())  # → Méthode originale
print(obj.nouvelle_methode())   # → Nouvelle méthode ajoutée !
```

### Singleton avec décorateur de classe

```python
def singleton(cls):
    """Décorateur : garantit qu'une classe n'a qu'une instance."""
    instances = {}

    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]

    return get_instance  # remplace la classe par une fonction !

@singleton
class Configuration:
    def __init__(self, fichier="config.ini"):
        self.fichier = fichier
        print(f"Chargement de {fichier}...")

# Test
c1 = Configuration()
c2 = Configuration()
print(c1 is c2)  # → True (même instance)
print(c1.fichier)  # → config.ini
```

> **Attention** : Ce décorateur remplace la **classe** par une **fonction**. Cela peut surprendre. `isinstance(c1, Configuration)` ne fonctionne plus.

---

## 9. `@property` et `@staticmethod` déconstruits

### Comment `@property` fonctionne

`@property` est un **décorateur intégré** qui transforme une méthode en propriété (getter).

```python
# Voici comment on pourrait l'implémenter (simplifié)
class property_simple:
    def __init__(self, getter):
        self.getter = getter

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return self.getter(obj)

# Utilisation
class Cercle:
    def __init__(self, rayon):
        self._rayon = rayon

    @property_simple  # équivaut à rayon = property_simple(rayon)
    def rayon(self):
        return self._rayon
```

### Décorateurs de méthode intégrés

```python
class Exemple:
    @staticmethod
    def statique():
        return "Statique"

    @classmethod
    def de_classe(cls):
        return f"Classe: {cls.__name__}"

    @property
    def lecture_seule(self):
        return "Lecture seule"

# Ce sont des décorateurs intégrés.
# On peut maintenant créer les nôtres de la même manière.
```

---

## 10. Bonnes pratiques

### Checklist pour écrire un décorateur

- [ ] `@wraps(fonction)` pour préserver les métadonnées
- [ ] `*args, **kwargs` dans le wrapper (pour être générique)
- [ ] Retourner la valeur de la fonction originale (sauf si on la modifie)
- [ ] Documenter ce que le décorateur fait
- [ ] Tester le décorateur séparément

### Quand utiliser un décorateur vs une fonction normale ?

✅ **Décorateur** : Comportement transversal (logging, timing, cache, validation)
❌ **Fonction normale** : Logique métier spécifique

---

## Résumé du module

| Concept | Syntaxe | Usage |
|---------|---------|-------|
| **Décorateur simple** | `@deco` | Étendre le comportement d'une fonction |
| **Décorateur paramétré** | `@deco(args)` | Décorateur configurable |
| **`@wraps`** | `@wraps(fonction)` | Préserver `__name__`, `__doc__` |
| **État** | `wrapper.compteur` | Compteur, cache, historique |
| **Chaînage** | `@a\n@b` | `a(b(fonction))` — de bas en haut |
| **Décorateur classe** | `@deco` sur classe | Ajouter des méthodes, singleton |
| **`@property`** | Intégré | Getter/setter Pythonique |
| **`@staticmethod`** | Intégré | Méthode sans self/self |

---

## Exercices

### Exercice 1 : Décorateur `debug`
Créez un décorateur `debug` qui affiche :
- Le nom de la fonction
- Les arguments (args et kwargs)
- La valeur de retour
- Le temps d'exécution

### Exercice 2 : Décorateur `valider`
Créez un décorateur `valider_types(*types)` qui vérifie que les arguments sont du bon type :
```python
@valider_types(int, int)
def addition(a, b):
    return a + b

addition(3, 5)    # OK
addition("a", 5)  # TypeError
```

### Exercice 3 : Décorateur `limiter`
Créez un décorateur `limiter(max_appels)` qui limite le nombre d'appels à une fonction :
```python
@limiter(3)
def test():
    print("OK")

test()  # OK
test()  # OK
test()  # OK
test()  # Warning: Plus d'appels disponibles
```

### Exercice 4 : Cache avec TTL
Créez un décorateur `cache_ttl(duree=60)` qui met en cache les résultats pendant une durée donnée (en secondes). Après expiration, recalcule et remet en cache.

### Exercice 5 : Décorateur de classe `auto_repr`
Créez un décorateur de classe `auto_repr` qui ajoute automatiquement une méthode `__repr__` à une classe (basée sur `__init__`).
