# Module 19 : La bibliothèque standard — des outils prêts à l'emploi

La bibliothèque standard de Python est l'un de ses plus grands atouts. Python est livré avec « des batteries incluses » — des dizaines de modules prêts à l'emploi pour le calcul, les dates, le système, le web, et bien plus.

> **Objectif** : Savoir utiliser les modules `math`, `random`, `datetime`, `os`, `sys`, `json`, `collections` avec aisance.

---

## 1. `math` — Mathématiques avancées

Le module `math` donne accès à des fonctions mathématiques qui vont bien au-delà des opérateurs de base (`+`, `-`, `*`, `/`).

```python
import math

# Constantes fondamentales
print(math.pi)    # → 3.141592653589793
print(math.e)     # → 2.718281828459045
print(math.tau)   # → 6.283185307179586 (2π)
print(math.inf)   # → inf  (infini)
print(math.nan)   # → nan  (pas un nombre)
```

### 1.1 Arrondis et division

```python
import math

# floor : arrondit à l'entier inférieur
print(math.floor(3.7))    # → 3
print(math.floor(-3.7))   # → -4  (attention: vers le bas, pas vers zéro)

# ceil : arrondit à l'entier supérieur
print(math.ceil(3.2))     # → 4
print(math.ceil(-3.2))    # → -3

# trunc : tronque la partie décimale (vers zéro)
print(math.trunc(3.7))    # → 3
print(math.trunc(-3.7))   # → -3

# modf : sépare partie entière et fractionnaire
partie_ent, partie_dec = math.modf(3.75)
print(partie_ent)         # → 3.0
print(partie_dec)         # → 0.75

# isclose : compare des flottants avec tolérance
print(math.isclose(0.1 + 0.2, 0.3))       # → True (évite 0.1+0.2 != 0.3)
print(math.isclose(0.1 + 0.2, 0.3, rel_tol=1e-9))  # → True
```

### 1.2 Puissances, racines et logarithmes

```python
import math

# Racine carrée
print(math.sqrt(16))      # → 4.0

# Racine cubique (Python 3.11+)
print(math.cbrt(27))      # → 3.0

# Fonctions puissance
print(math.pow(2, 10))    # → 1024.0  (float)
print(2 ** 10)            # → 1024    (int — préférer ** pour les entiers)

# hypot(x, y) = sqrt(x² + y²) — évite le dépassement
print(math.hypot(3, 4))   # → 5.0  (utile pour les distances)

# Logarithme naturel (base e)
print(math.log(100))      # → 4.605170185988091
# Logarithme en base 10
print(math.log(100, 10))  # → 2.0
# Logarithme en base 2
print(math.log2(1024))    # → 10.0
# Logarithme décimal
print(math.log10(1000))   # → 3.0
```

### 1.3 Trigonométrie

```python
import math

angle_deg = 90
angle_rad = math.radians(angle_deg)  # degrés → radians
print(angle_rad)                     # → 1.5707963267948966

print(math.sin(angle_rad))           # → 1.0
print(math.cos(angle_rad))           # → 6.123233995736766e-17 (proche de 0)
print(math.tan(angle_rad))           # → 1.633123935319537e16 (infini)

# Degrés → radians (inverse)
print(math.degrees(math.pi / 2))     # → 90.0
```

### 1.4 Combinaisons et factorielles

```python
import math

# Factorielle
print(math.factorial(5))    # → 120  (5 × 4 × 3 × 2 × 1)

# Combinaisons : C(n, k) = n! / (k! * (n-k)!)
print(math.comb(10, 3))     # → 120  (10 choisir 3)

# Permutations : P(n, k) = n! / (n-k)!
print(math.perm(10, 3))     # → 720

# PGCD (Greatest Common Divisor)
print(math.gcd(12, 8))      # → 4
print(math.gcd(0, 5))       # → 5

# PPCM (Least Common Multiple) — Python 3.9+
print(math.lcm(12, 8))      # → 24
```

> **Piège** : `math.floor(-3.7)` retourne **-4**, pas -3 ! La fonction descend toujours vers -∞. Utilisez `int(-3.7)` pour tronquer vers zéro (→ -3).

---

## 2. `random` — Générer des nombres aléatoires

Le module `random` permet de générer des nombres pseudo-aléatoires. Attention : pas assez sécurisé pour la cryptographie (utilisez `secrets` dans ce cas).

### 2.1 Nombres aléatoires de base

```python
import random

# Float entre 0.0 (inclus) et 1.0 (exclu)
print(random.random())        # → ex: 0.374540...

# Float dans un intervalle [a, b]
print(random.uniform(10, 20)) # → ex: 14.278...

# Entier entre a et b (inclus)
print(random.randint(1, 10))  # → ex: 7

# Entier avec un pas (a, b inclus, step)
print(random.randrange(0, 10, 2))  # → ex: 6  (pair entre 0 et 8)
```

### 2.2 Choix dans une séquence

```python
import random

fruits = ["pomme", "banane", "cerise", "datte"]

# Un élément au hasard
print(random.choice(fruits))       # → ex: "cerise"

# k éléments avec remise (peut répéter)
print(random.choices(fruits, k=3)) # → ex: ["banane", "pomme", "banane"]

# k éléments uniques (sans remise)
print(random.sample(fruits, k=2))  # → ex: ["datte", "pomme"]
```

### 2.3 Mélanger une séquence

```python
import random

# Mélange sur place (modifie la liste)
cartes = ["As", "Roi", "Dame", "Valet", "10"]
random.shuffle(cartes)
print(cartes)  # → ex: ["Valet", "As", "10", "Dame", "Roi"]
```

### 2.4 Reproductibilité avec `seed`

```python
import random

# Avec la même "graine", on obtient la même séquence
random.seed(42)
print([random.randint(1, 100) for _ in range(3)])
# → [82, 15, 4]   (reproductible)

random.seed(42)  # on remet la graine au début
print([random.randint(1, 100) for _ in range(3)])
# → [82, 15, 4]   (même résultat)
```

> **Piège** : `random.sample()` échoue si `k` est plus grand que la population. Utilisez `random.choices()` si vous voulez autoriser les répétitions.

---

## 3. `datetime` — Manipuler dates et heures

Le module `datetime` est essentiel pour tout ce qui touche au temps : logs, réservations, analyses temporelles.

### 3.1 Date et heure actuelles

```python
from datetime import datetime, date, time

# Date + heure actuelles
maintenant = datetime.now()
print(maintenant)            # → 2026-06-22 14:30:45.123456

# Date actuelle seulement
aujourdhui = date.today()
print(aujourdhui)            # → 2026-06-22

# Créer une date précise
naissance = date(1995, 3, 15)
print(naissance)             # → 1995-03-15

# Créer une heure précise
rendez_vous = time(14, 30, 0)
print(rendez_vous)           # → 14:30:00

# Créer un datetime précis
evenement = datetime(2026, 12, 25, 20, 0, 0)
print(evenement)             # → 2026-12-25 20:00:00
```

### 3.2 Accéder aux composants

```python
from datetime import datetime

dt = datetime(2026, 6, 22, 14, 30, 45, 123456)
print(dt.year)    # → 2026
print(dt.month)   # → 6
print(dt.day)     # → 22
print(dt.hour)    # → 14
print(dt.minute)  # → 30
print(dt.second)  # → 45
print(dt.weekday())  # → 0  (lundi = 0, dimanche = 6)
# isoweekday() : lundi = 1, dimanche = 7
print(dt.isoweekday())  # → 1
```

### 3.3 Formatage et parsing

```python
from datetime import datetime

dt = datetime.now()

# datetime → chaîne (formatage)
print(dt.strftime("%d/%m/%Y"))             # → 22/06/2026
print(dt.strftime("%A %d %B %Y"))          # → Monday 22 June 2026
print(dt.strftime("%H:%M:%S"))             # → 14:30:45

# Chaîne → datetime (parsing)
date_str = "15/01/2024 09:30"
dt_parse = datetime.strptime(date_str, "%d/%m/%Y %H:%M")
print(dt_parse)  # → 2024-01-15 09:30:00
```

**Codes de format courants :**

| Code | Signification | Exemple |
|------|--------------|---------|
| `%d` | Jour (01-31) | `22` |
| `%m` | Mois (01-12) | `06` |
| `%Y` | Année sur 4 chiffres | `2026` |
| `%H` | Heure (00-23) | `14` |
| `%M` | Minute (00-59) | `30` |
| `%S` | Seconde (00-59) | `45` |
| `%A` | Nom du jour | `Monday` |
| `%B` | Nom du mois | `June` |

### 3.4 Calculs avec `timedelta`

```python
from datetime import datetime, timedelta

maintenant = datetime.now()

# Ajouter / soustraire du temps
dans_une_semaine = maintenant + timedelta(days=7)
il_y_a_3_jours = maintenant - timedelta(days=3)
dans_2h30 = maintenant + timedelta(hours=2, minutes=30)

print(dans_une_semaine)  # → 2026-06-29 14:30:45
print(il_y_a_3_jours)    # → 2026-06-19 14:30:45

# Différence entre deux dates
noel = datetime(2026, 12, 25, 0, 0, 0)
duree = noel - maintenant
print(duree)              # → 185 days, 9:29:15
print(duree.days)         # → 185
print(duree.total_seconds())  # → 16030155.0

# Combien de jours depuis le début de l'année ?
debut_annee = datetime(2026, 1, 1)
ecoule = maintenant - debut_annee
print(f"Jour {ecoule.days + 1} de l'année")
```

> **Piège** : `strptime` (parse) et `strftime` (format) sont facilement confondus. Astuce mnémotechnique : **p** = **p**arser, **f** = **f**ormat.

---

## 4. `os` et `os.path` — Interagir avec le système

Le module `os` permet de dialoguer avec le système d'exploitation : fichiers, dossiers, variables d'environnement.

### 4.1 Répertoire courant et listing

```python
import os

# Dossier de travail actuel
chemin = os.getcwd()
print(chemin)            # → C:\Users\Marcellin\Documents\FormationPython

# Lister le contenu d'un dossier
contenu = os.listdir(".")
print(contenu)           # → ['19-Bibliotheque-standard', '20-Regex', ...]

# Changer de dossier (à utiliser avec précaution)
# os.chdir("C:/Temp")
```

### 4.2 Manipuler des chemins (os.path)

```python
import os

# Joindre des chemins (gère les séparateurs automatiquement)
chemin = os.path.join("dossier", "sous-dossier", "fichier.txt")
print(chemin)  # → dossier\sous-dossier\fichier.txt  (sous Windows)
               # → dossier/sous-dossier/fichier.txt  (sous Linux/Mac)

# Obtenir le nom de fichier / dossier parent
print(os.path.basename("C:/data/photo.jpg"))  # → photo.jpg
print(os.path.dirname("C:/data/photo.jpg"))   # → C:/data
print(os.path.split("C:/data/photo.jpg"))     # → ('C:/data', 'photo.jpg')

# Extension
print(os.path.splitext("photo.jpg"))          # → ('photo', '.jpg')

# Vérifications
print(os.path.exists("fichier.txt"))          # → True / False
print(os.path.isfile("fichier.txt"))          # → True si c'est un fichier
print(os.path.isdir("dossier"))               # → True si c'est un dossier
print(os.path.getsize("fichier.txt"))         # → taille en octets

# Taille lisible
taille = os.path.getsize("fichier.txt")
print(f"{taille / 1024:.1f} Ko")
```

### 4.3 Créer, renommer, supprimer

```python
import os

# Créer un dossier
os.mkdir("nouveau_dossier")

# Créer une arborescence complète
os.makedirs("a/b/c/d", exist_ok=True)

# Renommer / déplacer
os.rename("ancien.txt", "nouveau.txt")

# Supprimer un fichier
os.remove("fichier_a_supprimer.txt")

# Supprimer un dossier vide
os.rmdir("dossier_vide")
```

### 4.4 Variables d'environnement

```python
import os

# Lire une variable
path = os.environ.get("PATH", "valeur_par_defaut")
print(path[:50] + "..." if len(path) > 50 else path)

# Définir (temporairement, pour ce processus)
os.environ["MON_APP_MODE"] = "debug"
print(os.environ.get("MON_APP_MODE"))  # → debug

# Lister toutes les variables
for cle, valeur in sorted(os.environ.items())[:5]:
    print(f"{cle} = {valeur}")
```

Les `pathlib`-istes préféreront l'alternative moderne `pathlib.Path`, mais `os.path` reste très largement utilisé.

> **Piège** : `os.remove()` ne fonctionne que sur les fichiers. Pour supprimer un dossier non vide, utilisez `shutil.rmtree()`.

---

## 5. `sys` — Le système Python

Le module `sys` donne accès à des paramètres et fonctions liés à l'interpréteur Python lui-même.

```python
import sys

# Arguments de la ligne de commande
# Lancez : python script.py arg1 arg2
print(sys.argv)  # → ['script.py', 'arg1', 'arg2']

# Version de Python
print(sys.version)          # → 3.11.4 (tags/v3.11.4:...) 
print(sys.version_info)     # → sys.version_info(major=3, minor=11, ...)

# Sortie standard / erreur
sys.stdout.write("Écrire comme avec print\n")
sys.stderr.write("Message d'erreur\n")

# Plateforme
print(sys.platform)         # → win32  (même sur Windows 64-bit)

# Quitter le programme proprement
# sys.exit(0)    # 0 = succès, 1 = erreur

# Ajouter un chemin d'import
sys.path.append("C:/mon/chemin")
print(sys.path[:3])  # → premiers chemins où Python cherche les modules

# Taille d'un objet en octets
print(sys.getsizeof("Hello"))       # → 54
print(sys.getsizeof([1, 2, 3, 4]))  # → 104
```

> **Astuce** : `sys.argv[0]` est toujours le nom du script. Les arguments commencent à `sys.argv[1]`.

---

## 6. `json` — Échanger des données

JSON (JavaScript Object Notation) est le format d'échange de données le plus utilisé sur le web.

### 6.1 Sérialisation : Python → JSON

```python
import json

# Conversion Python → chaîne JSON
data = {
    "nom": "Alice",
    "age": 30,
    "actif": True,
    "notes": [15.5, 17.0, 14.5],
    "adresse": None
}

json_str = json.dumps(data, indent=2, ensure_ascii=False)
print(json_str)
# → {
# →   "nom": "Alice",
# →   "age": 30,
# →   "actif": true,
# →   "notes": [15.5, 17.0, 14.5],
# →   "adresse": null
# → }

# Écrire dans un fichier
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
```

### 6.2 Désérialisation : JSON → Python

```python
import json

# Depuis une chaîne
json_str = '{"nom": "Bob", "age": 25, "actif": true}'
data = json.loads(json_str)
print(data)             # → {'nom': 'Bob', 'age': 25, 'actif': True}
print(type(data))       # → <class 'dict'>
print(data["nom"])      # → Bob

# Depuis un fichier
with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
```

### 6.3 Gérer les types non-sérialisables

```python
import json
from datetime import datetime

# Les objets datetime ne sont pas sérialisables par défaut
def serialiseur(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} non sérialisable")

data = {"nom": "Meeting", "date": datetime.now()}
json_str = json.dumps(data, default=serialiseur, indent=2)
print(json_str)
# → {
# →   "nom": "Meeting",
# →   "date": "2026-06-22T14:30:45.123456"
# → }
```

**Correspondance Python ↔ JSON :**

| Python | JSON |
|--------|------|
| `dict` | `{}` |
| `list` | `[]` |
| `str` | `"..."` |
| `int` / `float` | `nombre` |
| `True` / `False` | `true` / `false` |
| `None` | `null` |

> **Piège** : Les clés d'un dictionnaire Python sont converties en chaînes JSON. Relire un fichier JSON redonne un `dict` avec des clés `str`.

---

## 7. `collections` — Structures de données avancées

Le module `collections` propose des versions améliorées des conteneurs standards.

### 7.1 `Counter` — Compter les éléments

```python
from collections import Counter

# Compter les lettres d'un mot
lettres = Counter("abracadabra")
print(lettres)
# → Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})

# Les plus fréquents
print(lettres.most_common(3))
# → [('a', 5), ('b', 2), ('r', 2)]

# Compter des éléments d'une liste
notes = ["A", "B", "A", "C", "A", "B", "D"]
print(Counter(notes))
# → Counter({'A': 3, 'B': 2, 'C': 1, 'D': 1})

# Opérations entre compteurs
c1 = Counter(a=3, b=1)
c2 = Counter(a=1, b=2, c=1)
print(c1 + c2)  # → Counter({'a': 4, 'b': 3, 'c': 1})
print(c1 - c2)  # → Counter({'a': 2})  (pas de négatifs)
```

### 7.2 `defaultdict` — Éviter les KeyError

```python
from collections import defaultdict

# defaultdict avec type int : valeur par défaut = 0
compteur = defaultdict(int)
mots = ["pomme", "banane", "pomme", "cerise", "banane", "pomme"]
for mot in mots:
    compteur[mot] += 1  # pas de KeyError !
print(dict(compteur))  # → {'pomme': 3, 'banane': 2, 'cerise': 1}

# defaultdict avec list : valeur par défaut = []
groupes = defaultdict(list)
eleves = [("Maths", "Alice"), ("Maths", "Bob"), ("Français", "Alice")]
for matiere, eleve in eleves:
    groupes[matiere].append(eleve)
print(dict(groupes))
# → {'Maths': ['Alice', 'Bob'], 'Français': ['Alice']}

# defaultdict avec set : valeur par défaut = set()
inverse = defaultdict(set)
original = {"Alice": "Maths", "Bob": "Français", "Charlie": "Maths"}
for nom, matiere in original.items():
    inverse[matiere].add(nom)
print(dict(inverse))
# → {'Maths': {'Alice', 'Charlie'}, 'Français': {'Bob'}}
```

### 7.3 `deque` — File d'attente double

```python
from collections import deque

# Une deque permet d'ajouter/retirer efficacement aux deux extrémités
file = deque(maxlen=5)  # taille maximale
file.append("a")        # ajoute à droite
file.append("b")
file.appendleft("z")    # ajoute à gauche
print(file)             # → deque(['z', 'a', 'b'])

# Retirer
print(file.pop())       # → 'b'  (retire à droite)
print(file.popleft())   # → 'z'  (retire à gauche)

# Rotation (utile pour les buffers circulaires)
d = deque([1, 2, 3, 4, 5])
d.rotate(2)
print(d)                # → deque([4, 5, 1, 2, 3])
d.rotate(-1)
print(d)                # → deque([5, 1, 2, 3, 4])

# File d'attente avec taille max (les anciens éléments sont perdus)
log = deque(maxlen=3)
for i in range(10):
    log.append(f"ligne-{i}")
print(log)  # → deque(['ligne-7', 'ligne-8', 'ligne-9'])
```

> **À retenir** : `deque` est plus efficace que `list` pour les ajouts/retraits aux extrémités (O(1) vs O(n)).

---

## Résumé

| Module | Usage principal |
|--------|-----------------|
| `math` | Constantes, arrondis, trigonométrie, combinatoire |
| `random` | Nombres aléatoires, choix, mélanges |
| `datetime` | Dates, heures, timedelta, formatage |
| `os` | Fichiers, dossiers, variables d'environnement |
| `sys` | Arguments, version, plateforme |
| `json` | Sérialisation, désérialisation JSON |
| `collections` | Counter, defaultdict, deque |

```python
# Aperçu : un petit utilitaire qui combine plusieurs modules
import os, json, math
from datetime import datetime
from collections import Counter

rapport = {
    "date": datetime.now().isoformat(),
    "cwd": os.getcwd(),
    "fichiers": len(os.listdir(".")),
    "pi": round(math.pi, 4)
}
print(json.dumps(rapport, indent=2))
```

---

## Exercices

1. **Générateur de mots de passe** : Utilisez `random` et `string` pour générer un mot de passe aléatoire de 16 caractères avec lettres, chiffres et symboles.
2. **Calculateur d'âge** : Demandez une date de naissance et calculez l'âge exact en années, mois et jours.
3. **Inventaire JSON** : Créez un dictionnaire d'inventaire, sauvegardez-le en JSON, lisez-le et affichez la valeur totale.
4. **Statistiques de texte** : Utilisez `Counter` sur un texte long pour trouver les 10 mots les plus fréquents (ignorez la ponctuation).
