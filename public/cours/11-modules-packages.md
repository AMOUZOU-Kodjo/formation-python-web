# Module 11 : Modules et Packages

**Objectifs pédagogiques :**
- Comprendre ce qu'est un module et comment l'importer
- Maîtriser les différentes syntaxes d'import
- Utiliser `if __name__ == "__main__"` correctement
- Créer et organiser des packages
- Distinguer imports relatifs et absolus
- Configurer `sys.path` et la découverte des modules

---

## 1. Qu'est-ce qu'un module ?

### 1.1 Définition

Un **module** est simplement un fichier Python (`.py`) contenant du code (variables, fonctions, classes). Tout fichier `.py` est automatiquement un module.

**Analogie :** Un module est comme un chapitre de livre. Vous pouvez lire chaque chapitre indépendamment, et chaque chapitre traite d'un sujet spécifique.

```python
# === Fichier : mon_module.py ===
PI = 3.14159

def saluer(nom):
    return f"Bonjour {nom} !"

class Cercle:
    def __init__(self, rayon):
        self.rayon = rayon

    def aire(self):
        return PI * self.rayon ** 2
```

```python
# === Fichier : main.py ===
import mon_module

print(mon_module.PI)                    # → 3.14159
print(mon_module.saluer("Alice"))       # → Bonjour Alice !
c = mon_module.Cercle(5)
print(c.aire())                         # → 78.53975
```

### 1.2 Comment Python trouve les modules ?

Python cherche les modules dans les dossiers listés dans `sys.path` :

```python
import sys
for chemin in sys.path:
    print(chemin)
# Contient généralement :
# 1. Le dossier du script principal
# 2. Les dossiers dans PYTHONPATH
# 3. Les dossiers d'installation de Python (Lib, site-packages)
```

> **Piège courant :** Si votre fichier s'appelle `math.py` ou `random.py`, il masquera le module standard du même nom !

```python
# MAUVAIS : votre fichier math.py écrase le module standard
import math  # → charge votre fichier, pas le vrai math
```

---

## 2. Les syntaxes d'import

### 2.1 Les différentes formes

```python
# 1. Import complet
import math
print(math.sqrt(16))  # → 4.0
print(math.pi)        # → 3.1415...

# 2. Import partiel (depuis un module)
from math import sqrt, pi
print(sqrt(16))       # → 4.0  (sans préfixe)
print(pi)             # → 3.1415...

# 3. Alias (renommer)
import numpy as np
import pandas as pd
from math import sqrt as racine_carree
print(racine_carree(16))  # → 4.0

# 4. Import déconseillé (pollution de namespace)
from math import *   # importe TOUT
print(sin(0))        # fonctionne, mais on ne sait pas d'où vient sin
```

### 2.2 `from math import *` — pourquoi c'est déconseillé ?

```python
# Problème : collisions silencieuses
from math import *
from statistics import *
# Si les deux ont une fonction mean(), la deuxième écrase la première

# Exemple concret
from math import isclose
# Mais on ne sait pas si on a importé autre chose par hasard
```

> **Règle :** Préférez `import module` (préfixe) ou `from module import noms_explicites` (explicite).

---

## 3. `if __name__ == "__main__"` — le point d'entrée

### 3.1 Principe

Chaque module possède une variable `__name__`. Elle vaut `"__main__"` quand le fichier est exécuté directement, ou le nom du module quand il est importé.

```python
# Fichier : utils.py
def fonction_importable():
    return "Je peux être importée"

if __name__ == "__main__":
    # Ce code ne s'exécute QUE si on lance python utils.py
    print("Test de utils.py :")
    print(fonction_importable())
    print("Tests terminés.")
```

```python
# Fichier : main.py
import utils  # N'affiche PAS "Test de utils.py"
print(utils.fonction_importable())
```

**Analogie :** C'est comme une personne qui a deux casquettes. Quand elle est chez elle (exécution directe), elle fait son ménage (tests). Quand elle est invitée chez quelqu'un (importée), elle est juste un invité qui apporte quelque chose (ses fonctions).

### 3.2 Cas d'usage

```python
# Fichier : calculs.py
def factorielle(n):
    if n <= 1:
        return 1
    return n * factorielle(n - 1)

def tester():
    """Tests unitaires du module."""
    assert factorielle(0) == 1
    assert factorielle(5) == 120
    assert factorielle(3) == 6
    print("Tous les tests ont réussi.")

if __name__ == "__main__":
    tester()
```

---

## 4. Packages — organiser en dossiers

### 4.1 Structure d'un package

Un **package** est un dossier contenant un fichier `__init__.py` (optionnel depuis Python 3.3+, mais recommandé).

```
mon_package/
│
├── __init__.py        # Initialisation du package
├── calculs.py         # Fonctions mathématiques
├── io.py              # Entrées/sorties
└── modeles/
    ├── __init__.py
    ├── utilisateur.py
    └── produit.py
```

### 4.2 Contenu de `__init__.py`

```python
# __init__.py peut être vide, mais sert à :
# 1. Initialiser le package
# 2. Définir ce que "from package import *" exporte
# 3. Rendre disponibles des objets directement depuis le package

# Exemple : mon_package/__init__.py
from .calculs import factorielle, fibonacci
from .io import lire_fichier, ecrire_fichier

__all__ = [
    "factorielle",
    "fibonacci",
    "lire_fichier",
    "ecrire_fichier",
    "version",
]

version = "1.0.0"
```

```python
# Utilisation
import mon_package
print(mon_package.factorielle(5))  # → 120
print(mon_package.version)         # → 1.0.0
```

### 4.3 Imports absolus vs relatifs

```python
# === Import ABSOLU (recommandé) ===
# On spécifie le chemin complet depuis la racine du projet
from mon_package.calculs import factorielle
from mon_package.modeles.utilisateur import Utilisateur

# === Import RELATIF (déconseillé sauf dans le package) ===
# On utilise . pour "dossier courant" et .. pour "dossier parent"
from .calculs import factorielle         # même dossier
from ..modeles.utilisateur import Utilisateur  # dossier parent
```

```python
# Exemple : mon_package/io.py importe calculs

# Absolu (fonctionne partout)
from mon_package.calculs import factorielle

# Relatif (ne fonctionne QUE dans le package)
from .calculs import factorielle
```

> **Règle :** Utilisez les imports absolus dans vos scripts principaux et les imports relatifs à l'intérieur du package (mais seulement si le package est bien structuré).

### 4.4 Créer un package pas à pas

```
1. Créer un dossier : mkdir mon_package/
2. Créer __init__.py   (peut être vide)
3. Créer les modules   (calculs.py, io.py, ...)
4. Importer depuis les autres scripts
```

```python
# Exemple complet du module calculs.py
import math

def factorielle(n):
    """Calcule n! de manière itérative."""
    if n < 0:
        raise ValueError("Pas de factorielle négative")
    resultat = 1
    for i in range(2, n + 1):
        resultat *= i
    return resultat

def fibonacci(n):
    """Retourne le n-ième nombre de Fibonacci."""
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

def est_premier(n):
    """Vérifie si n est un nombre premier."""
    if n < 2:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True
```

---

## 5. Configuration du chemin des modules

### 5.1 `sys.path` et `PYTHONPATH`

Si vos modules sont dans un dossier non standard, vous devez le dire à Python :

```python
# Méthode 1 : modifier sys.path dans le code
import sys
sys.path.append("C:/chemin/vers/mes_modules")
import mon_module  # maintenant accessible

# Méthode 2 : variable d'environnement PYTHONPATH
# (à configurer dans le terminal, pas dans le code)
# export PYTHONPATH="/chemin/vers/mes_modules:$PYTHONPATH"
```

### 5.2 Structure de projet recommandée

```
mon_projet/
│
├── main.py                 # Point d'entrée
├── requirements.txt        # Dépendances
├── README.md
│
├── src/                    # Code source
│   ├── __init__.py
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── helpers.py
│   │   └── validators.py
│   │
│   └── models/
│       ├── __init__.py
│       └── user.py
│
└── tests/                  # Tests unitaires
    ├── __init__.py
    └── test_helpers.py
```

---

## 6. Bonnes pratiques

### 6.1 Ce qu'il faut faire ✅

1. **Un module = une responsabilité** — ne mettez pas tout dans un seul fichier
2. **Noms explicites** — `calculs_mathematiques.py` plutôt que `cm.py`
3. **Utiliser `__init__.py`** même vide pour marquer les packages
4. **Imports absolus** sauf dans le package lui-même
5. **Grouper les imports** : d'abord les modules standards, puis les tiers, puis les vôtres
6. **Éviter `from module import *`** sauf si `__all__` est défini

```python
# Ordre des imports (convention PEP8)
import sys              # 1. Modules standards
import os

import numpy as np      # 2. Bibliothèques tierces
import requests

from mon_projet import utils  # 3. Modules locaux
```

### 6.2 Ce qu'il faut éviter ❌

```python
# MAUVAIS : import à l'intérieur d'une fonction
def calcul():
    import math  # import chaque appel !
    return math.sqrt(2)

# BON : import en haut du fichier
import math

# MAUVAIS : imports circulaires
# module_a.py import module_b
# module_b.py import module_a  # ← erreur !
```

---

## 7. Résumé

| Concept | À retenir |
|---|---|
| Module | Un fichier `.py` |
| Package | Un dossier contenant `__init__.py` |
| `import module` | Accès avec préfixe `module.fonction()` |
| `from module import f` | Accès direct `f()` |
| `if __name__ == "__main__"` | Code exécuté seulement si le fichier est lancé directement |
| Import absolu | Depuis la racine du projet |
| Import relatif | Depuis le dossier courant (`.`, `..`) |
| `sys.path` | Liste des dossiers où Python cherche les modules |

---

## 8. Exercices

**Exercice 1 :** Créer un module `operations.py` avec les fonctions `addition`, `soustraction`, `multiplication`, `division`. Créer un second fichier `test.py` qui importe et teste ces fonctions.

**Exercice 2 :** Ajouter un bloc `if __name__ == "__main__"` à `operations.py` avec des tests automatiques.

**Exercice 3 :** Créer un package `bibliotheque/` avec `__init__.py`, `livre.py` et `auteur.py`. Un livre a un titre, un auteur et une année.

**Exercice 4 :** Dans `bibliotheque/__init__.py`, importer automatiquement les classes `Livre` et `Auteur` pour qu'elles soient accessibles via `from bibliotheque import Livre`.

**Exercice 5 (défi) :** Créer une mini-bibliothèque avec des imports conditionnels : si `numpy` est disponible, l'utiliser pour des calculs ; sinon, utiliser le module `math` standard.
