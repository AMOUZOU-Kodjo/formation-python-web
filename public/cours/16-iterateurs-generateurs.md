# Module 16 : Itérateurs et Générateurs

---

## Objectifs pédagogiques

À la fin de ce module, vous serez capable de :
- Distinguer **itérable** vs **itérateur** (concept fondamental)
- Créer un **itérateur personnalisé** avec `__iter__` et `__next__`
- Créer un **générateur** avec `yield`
- Utiliser `yield from` pour chaîner des générateurs
- Comprendre les **expressions génératrices**
- Construire des **pipelines de données** avec des générateurs
- Exploiter `send()`, `throw()`, `close()` sur un générateur
- Évaluer les performances mémoire des générateurs

---

## 1. Itérable vs Itérateur : la distinction fondamentale

### Définitions

- **Itérable** : objet qu'on peut passer à `iter()` pour obtenir un **itérateur**.
  - Exemples : listes, tuples, chaînes, dicts, sets, fichiers
  - Caractéristique : implémente `__iter__()` qui retourne un itérateur

- **Itérateur** : objet sur lequel on peut appeler `next()` pour obtenir l'élément suivant.
  - Caractéristique : implémente `__iter__()` (retourne self) et `__next__()` (retourne l'élément suivant)

```python
# Une liste est un ITÉRABLE (pas un itérateur)
liste = [1, 2, 3]
print(type(liste))       # → <class 'list'>
print(hasattr(liste, '__iter__'))  # → True
print(hasattr(liste, '__next__'))  # → False

# On obtient un itérateur à partir d'un itérable
it = iter(liste)
print(type(it))          # → <class 'list_iterator'>
print(hasattr(it, '__iter__'))  # → True
print(hasattr(it, '__next__'))  # → True

# On consomme l'itérateur pas à pas
print(next(it))          # → 1
print(next(it))          # → 2
print(next(it))          # → 3
# print(next(it))        # ⚠️ StopIteration
```

### Analogie : la playlist musicale

- **Liste de lecture** (playlist) = **itérable** : c'est la collection de chansons
- **Lecteur** qui joue les chansons une par une = **itérateur**

```python
playlist = ["Song A", "Song B", "Song C"]  # itérable
lecteur = iter(playlist)                     # itérateur

print(next(lecteur))  # → Song A
print(next(lecteur))  # → Song B
print(next(lecteur))  # → Song C
# La playlist est épuisée...
```

### Le protocole d'itération

```python
# Comment une boucle for fonctionne réellement :
for element in iterable:
    print(element)

# Est équivalent à :
it = iter(iterable)   # 1. obtient un itérateur
while True:
    try:
        element = next(it)    # 2. élément suivant
    except StopIteration:     # 3. fin de l'itération
        break
    print(element)            # 4. traite l'élément
```

> **À retenir** : Les boucles `for` sont du **sucre syntaxique** autour du protocole d'itération. C'est important car cela permet à `for` de fonctionner avec **tout** objet itérable.

### Test d'appartenance avec `iter()`

```python
def est_iterable(obj):
    """Vérifie si un objet est itérable."""
    try:
        iter(obj)
        return True
    except TypeError:
        return False

print(est_iterable([1, 2, 3]))    # → True
print(est_iterable("hello"))      # → True
print(est_iterable(42))           # → False
print(est_iterable(open))         # → False (une fonction n'est pas itérable)
```

---

## 2. Créer un itérateur personnalisé

### Approche classe

```python
class Compteur:
    """Itérateur qui compte de 0 à max-1."""

    def __init__(self, maximum):
        self.maximum = maximum
        self.courant = 0

    def __iter__(self):
        """Retourne l'itérateur (self)."""
        return self

    def __next__(self):
        """Retourne l'élément suivant ou lève StopIteration."""
        if self.courant >= self.maximum:
            raise StopIteration
        valeur = self.courant
        self.courant += 1
        return valeur

# Utilisation
for nombre in Compteur(5):
    print(nombre)  # → 0, 1, 2, 3, 4

# Ou manuellement
c = Compteur(3)
print(next(c))  # → 0
print(next(c))  # → 1
print(next(c))  # → 2
# print(next(c))  # → StopIteration
```

### Itérateur infini (attention !)

```python
class CompteurInfini:
    """Itérateur qui ne s'arrête jamais."""

    def __init__(self, depart=0):
        self.courant = depart

    def __iter__(self):
        return self

    def __next__(self):
        valeur = self.courant
        self.courant += 1
        return valeur

# Utilisation avec limite
c = CompteurInfini(10)
for i, val in enumerate(c):
    if i >= 5:
        break
    print(val, end=" ")  # → 10 11 12 13 14
```

### Séparer itérable et itérateur (bonne pratique)

```python
class Gamme:
    """Itérable : représente une gamme de nombres."""

    def __init__(self, debut, fin):
        self.debut = debut
        self.fin = fin

    def __iter__(self):
        """Chaque appel à iter() crée un NOUVEL itérateur."""
        return GammeIterator(self.debut, self.fin)


class GammeIterator:
    """Itérateur : parcourt la gamme."""

    def __init__(self, debut, fin):
        self.courant = debut
        self.fin = fin

    def __iter__(self):
        return self

    def __next__(self):
        if self.courant >= self.fin:
            raise StopIteration
        val = self.courant
        self.courant += 1
        return val

# Avantage : on peut itérer plusieurs fois !
g = Gamme(1, 4)
print(list(g))   # → [1, 2, 3]
print(list(g))   # → [1, 2, 3] (nouvel itérateur à chaque fois)

# Avec l'approche où l'itérable EST l'itérateur :
c = Compteur(4)
print(list(c))   # → [0, 1, 2, 3]
print(list(c))   # → [] (épuisé !)
```

---

## 3. Générateurs : la version simplifiée

### `yield` : le mot magique

Un **générateur** est une fonction qui utilise `yield` au lieu de `return`. Quand Python voit `yield`, il crée automatiquement un itérateur.

```python
def compteur(maximum):
    """Générateur : compte de 0 à maximum-1."""
    courant = 0
    while courant < maximum:
        yield courant       # ← "produit" une valeur et se met en pause
        courant += 1
    # Pas de return → StopIteration levé automatiquement à la fin

# On obtient un objet générateur
gen = compteur(5)
print(type(gen))  # → <class 'generator'>
print(gen)        # → <generator object compteur at 0x...>

# On peut l'utiliser avec next()
print(next(gen))  # → 0
print(next(gen))  # → 1
print(next(gen))  # → 2
print(next(gen))  # → 3
print(next(gen))  # → 4
# print(next(gen))  # → StopIteration

# Ou dans une boucle for
for nombre in compteur(3):
    print(nombre, end=" ")  # → 0 1 2
```

### Comment `yield` fonctionne (mécanique interne)

```
Appel: gen = compteur(3)
         ↓
    def compteur(maximum=3):    ← Rien ne s'exécute encore !
        courant = 0
        ─────────────────────────────────────────
next(gen) → yield courant → "pause" → retourne 0
                            ↓
next(gen) → courant += 1 → yield courant → "pause" → retourne 1
                            ↓
next(gen) → courant += 1 → yield courant → "pause" → retourne 2
                            ↓
next(gen) → courant += 1 → while False → fin → StopIteration
```

> **Piège courant** : `return` dans un générateur lève `StopIteration` avec une valeur (accessible via `StopIteration.value`). Évitez cela, c'est déroutant.

### Générateur infini (sans risque de mémoire)

```python
def fibonacci_infini():
    """Générateur infini de la suite de Fibonacci."""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# On ne stocke rien en mémoire : on prend ce qu'on veut
fib = fibonacci_infini()
print(next(fib))  # → 0
print(next(fib))  # → 1
print(next(fib))  # → 1
print(next(fib))  # → 2
print(next(fib))  # → 3
print(next(fib))  # → 5

# Prendre les 10 premiers
from itertools import islice
premiers = list(islice(fibonacci_infini(), 10))
print(premiers)  # → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

---

## 4. `yield from` : chaîner des générateurs

### Sans yield from

```python
def chaine(*iterables):
    """Chaîne plusieurs itérables en un seul."""
    resultat = []
    for it in iterables:
        for element in it:  # itération manuelle
            resultat.append(element)
    return resultat

# Problème : crée une liste intermédiaire (pas efficace)
```

### Avec yield from

```python
def chaine(*iterables):
    """Chaîne plusieurs itérables sans liste intermédiaire."""
    for it in iterables:
        yield from it  # délègue l'itération à 'it'

# Test
resultat = list(chaine([1, 2], [3, 4], [5, 6]))
print(resultat)  # → [1, 2, 3, 4, 5, 6]

# Équivalent à :
for it in iterables:
    for element in it:
        yield element
```

### Cas concret : flatten une liste imbriquée

```python
def flatten(iterable):
    """Aplatit des listes potentiellement imbriquées."""
    for element in iterable:
        if isinstance(element, (list, tuple)):
            yield from flatten(element)  # récursif !
        else:
            yield element

imbrique = [1, [2, 3], [4, [5, 6]], 7]
aplati = list(flatten(imbrique))
print(aplati)  # → [1, 2, 3, 4, 5, 6, 7]
```

---

## 5. Expressions génératrices

### Syntaxe

Même syntaxe que les listes en compréhension, mais avec des **parenthèses** au lieu des **crochets**.

```python
# Liste en compréhension (tout en mémoire)
liste_carres = [x**2 for x in range(1000000)]
print(type(liste_carres))   # → <class 'list'>
print(sys.getsizeof(liste_carres))  # → ~8 Mo

# Expression génératrice (paresseuse)
gen_carres = (x**2 for x in range(1000000))
print(type(gen_carres))     # → <class 'generator'>
import sys
print(sys.getsizeof(gen_carres))  # → ~112 octets !
```

### Comparaison mémoire

```python
import sys

# Liste : tout est pré-calculé
liste = [i for i in range(100000)]
print(f"Liste : {sys.getsizeof(liste)} octets")    # → ~800 Ko

# Générateur : rien n'est calculé encore
gen = (i for i in range(100000))
print(f"Generator : {sys.getsizeof(gen)} octets")  # → ~112 octets

# Utilisation : même résultat
print(sum(liste))   # → 4999950000
print(sum(gen))     # → 4999950000
```

### Quand utiliser l'une ou l'autre ?

```python
# Expression génératrice (✅ si on consomme une seule fois)
total = sum(x**2 for x in range(1000))  # pas de liste intermédiaire

# Liste en compréhension (✅ si on a besoin de plusieurs passages)
carres = [x**2 for x in range(1000)]
for c in carres:   # premier passage
    print(c)
for c in carres:   # deuxième passage (possible avec une liste)
    print(c)

# Générateur épuisé après un passage :
gen = (x**2 for x in range(1000))
print(sum(gen))    # → 332833500
print(sum(gen))    # → 0 (épuisé !)
```

---

## 6. Pipeline avec générateurs

Les générateurs excellent pour créer des **pipelines de traitement** de données. Chaque étape est un générateur qui reçoit d'un autre générateur.

```python
# Données : des lignes de texte
lignes = [
    "python java python",
    "java c++ python",
    "c++ c++ java python",
]

# Étape 1 : générateur de lignes
def lire_lignes(fichier):
    yield from fichier

# Étape 2 : découper chaque ligne en mots
def mots(iterateur_lignes):
    for ligne in iterateur_lignes:
        for mot in ligne.split():
            yield mot

# Étape 3 : filtrer les mots courts
def filtrer_mots(iterateur_mots, taille_min=3):
    for mot in iterateur_mots:
        if len(mot) >= taille_min:
            yield mot

# Étape 4 : compter les occurrences
def compter_mots(iterateur_mots):
    compteur = {}
    for mot in iterateur_mots:
        compteur[mot] = compteur.get(mot, 0) + 1
    return compteur

# Construction du pipeline
pipeline = lire_lignes(lignes)           # itérateur de lignes
pipeline = mots(pipeline)                # itérateur de mots
pipeline = filtrer_mots(pipeline, 3)     # itérateur filtré
resultat = compter_mots(pipeline)        # consommateur final

print(resultat)
# → {'python': 3, 'java': 2, 'c++': 1}
```

> **Avantage** : Chaque étape est **indépendante**, **réutilisable** et ne consomme pas de mémoire. On peut ajouter/supprimer des étapes sans tout casser.

---

## 7. `send()`, `throw()`, `close()`

Les générateurs ne sont pas à sens unique ! On peut **envoyer des données** au générateur avec `send()`.

### `send()` : communiquer avec un générateur

```python
def accumulateur():
    """Générateur qui accumule des valeurs."""
    total = 0
    while True:
        valeur = yield total  # ← reçoit une valeur ET produit total
        total += valeur

acc = accumulateur()
next(acc)  # initialisation (obligatoire avant le premier send)
# OU : acc.send(None)  (équivalent à next(acc))

print(acc.send(10))  # → 10  (total après +10)
print(acc.send(20))  # → 30  (total après +20)
print(acc.send(5))   # → 35
```

### Mécanisme détaillé de `send()`

```python
def generateur():
    print("Démarrage")
    x = yield 1    # ← point A : yield 1, puis reçoit la valeur envoyée
    print(f"Reçu : {x}")
    y = yield 2    # ← point B
    print(f"Reçu : {y}")
    yield 3

g = generateur()
print(next(g))      # → 1  (va jusqu'au premier yield)
print(g.send("A"))  # → 2  (envoie "A" → x="A", continue → y performance yield 2)
print(g.send("B"))  # → 3
```

### `throw()` : lever une exception dans le générateur

```python
def safe_divide():
    for i in range(5):
        try:
            valeur = yield i
            if valeur == 0:
                raise ZeroDivisionError("Division par zéro !")
            print(f"100 / {valeur} = {100 / valeur}")
        except ZeroDivisionError as e:
            print(f"Erreur attrapée : {e}")

sd = safe_divide()
next(sd)  # initialisation
sd.send(10)     # → 100 / 10 = 10.0
sd.send(0)      # → Erreur attrapée : Division par zéro !
sd.throw(ValueError("Test"))  # → ValueError dans le générateur
```

### `close()` : arrêter proprement un générateur

```python
def propre():
    try:
        for i in range(10):
            yield i
    finally:
        print("Nettoyage : ressources libérées")

p = propre()
print(next(p))  # → 0
print(next(p))  # → 1
p.close()       # → Nettoyage : ressources libérées
# Plus aucun next(p) possible
```

---

## 8. Performance mémoire : cas concret

### Comparaison : lecture fichier

```python
# ❌ MAUVAISE APPROCHE : tout en mémoire
def lire_fichier_entier(chemin):
    with open(chemin, 'r', encoding='utf-8') as f:
        return f.readlines()  # charge tout en mémoire

# ✅ BONNE APPROCHE : générateur
def lire_fichier_lazy(chemin):
    with open(chemin, 'r', encoding='utf-8') as f:
        for ligne in f:  # f est déjà un itérateur !
            yield ligne

# Les fichiers de 1 Go :
# 1ère approche : utilise 1 Go de RAM
# 2ème approche : utilise ~quelques Ko de RAM
```

### Analyse mémoire détaillée

```python
def analyser_memoire():
    # range() est paresseux
    grand = range(10_000_000)

    # Une liste prendrait 80 Mo
    # Un générateur prend... 112 octets
    gen = (x * 2 for x in grand)

    # La différence est cruciale pour :
    # - Traitement d'images volumineuses
    # - Fichiers logs multi-GB
    # - Flux réseau en temps réel
    # - Bases de données avec des millions de lignes
    pass
```

---

## 9. Bonus : itertools et autres astuces

### Combiner itertools avec les générateurs

```python
from itertools import islice, cycle, count, chain

# count : générateur infini
for i in count(10):    # 10, 11, 12, 13...
    if i > 15: break
    print(i)

# cycle : cycle infini
colors = cycle(["rouge", "vert", "bleu"])
for _ in range(6):
    print(next(colors))  # rouge, vert, bleu, rouge, vert, bleu

# islice : découper un itérateur
gen = (x**2 for x in range(100))
premiers = list(islice(gen, 5))  # [0, 1, 4, 9, 16]
```

---

## Résumé du module

| Concept | Définition | Exemple |
|---------|-----------|---------|
| **Itérable** | Peut être passé à `iter()` | `liste`, `tuple`, `str`, `dict` |
| **Itérateur** | Peut être passé à `next()` | `iter(liste)`, générateur |
| **`__iter__`** | Retourne un itérateur | `return self` ou `return iter(...)` |
| **`__next__`** | Retourne l'élément suivant | Lève `StopIteration` à la fin |
| **`yield`** | Produit une valeur dans un générateur | `yield valeur` |
| **`yield from`** | Délègue l'itération à un sous-itérable | `yield from iterable` |
| **Expression génératrice** | Compréhension avec `()` | `(x**2 for x in range(n))` |
| **`send()`** | Envoie une valeur au générateur | `gen.send(valeur)` |
| **`throw()`** | Lève une exception dans le générateur | `gen.throw(TypeError)` |
| **`close()`** | Ferme proprement le générateur | `gen.close()` |

### Itérable vs Itérateur (tableau)

| Propriété | Itérable | Itérateur |
|-----------|----------|-----------|
| A `__iter__` | ✅ Oui | ✅ Oui |
| A `__next__` | ❌ Non | ✅ Oui |
| Peut être parcouru plusieurs fois | ✅ Oui | ❌ Non (épuisé) |
| `next(objet)` marche | ❌ Non | ✅ Oui |
| Exemples | `[1,2,3]`, `"abc"` | `iter([1,2,3])`, générateur |

---

## Exercices

### Exercice 1 : Itérateur de Fibonacci
Créez un itérateur (classe) `Fibonacci` qui génère la suite de Fibonacci jusqu'à `maxi` (paramètre du constructeur). Implémentez `__iter__` et `__next__`.

### Exercice 2 : Générateur de nombres premiers
Écrivez un générateur `nombres_premiers()` qui génère les nombres premiers indéfiniment (crible d'Ératosthène paresseux). Utilisez `itertools.islice` pour en prendre les 20 premiers.

### Exercice 3 : Pipeline de traitement de tweets
Créez un pipeline de générateurs qui :
1. `lire_lignes(fichier)` : lit les lignes d'un fichier
2. `filtrer_hashtags(lignes)` : ne garde que les lignes contenant "#"
3. `extraire_mots(lignes)` : extrait les mots de chaque ligne
4. `compter_mots(mots)` : {mot: compteur} final
Testez avec une liste simulée de tweets.

### Exercice 4 : Générateur avec send()
Créez un générateur `interrupteur()` qui :
- Démarre éteint (False)
- `next(gen)` : retourne l'état actuel (True/False)
- `gen.send(True)` ou `gen.send(False)` : change l'état
- `gen.send("toggle")` : inverse l'état

### Exercice 5 : Paginateur
Créez un générateur `paginer(liste, taille_page)` qui produit des pages (sous-listes) de la taille demandée.
