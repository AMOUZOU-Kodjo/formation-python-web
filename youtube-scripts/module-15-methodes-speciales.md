# Vidéo #15 — Méthodes spéciales (magiques)

## Informations générales
- **Titre** : Python #15 — Méthodes spéciales (magiques) (Formation Complète)
- **Durée** : ~13 min
- **Miniature** : `banners/15-methodes-speciales.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 15 — MÉTHODES SPÉCIALES

> "Bienvenue dans le module 15. Les méthodes spéciales, ou méthodes magiques, sont ces méthodes entourées de doubles underscores comme `__init__` ou `__str__`. Elles permettent à vos objets de se comporter comme des objets natifs de Python. On va les découvrir une par une."

---

### 0:30 — Qu'est-ce qu'une méthode magique ? (1 min)
**Texte écran :** C'EST QUOI UNE MÉTHODE MAGIQUE ?

> "Les méthodes magiques commencent et finissent par `__`. Python les appelle automatiquement dans certaines situations."

```python
# Quand on écrit :
print(str(42))
# Python appelle en réalité :
print((42).__str__())

# Quand on écrit :
len([1, 2, 3])
# Python appelle en réalité :
[1, 2, 3].__len__()
```

> "On ne les appelle jamais directement. C'est Python qui les invoque quand on utilise `str()`, `len()`, `+`, `==`, etc."

| Méthode | Déclencheur |
|---------|-------------|
| `__init__` | `MaClasse()` |
| `__str__` | `str(obj)`, `print(obj)` |
| `__len__` | `len(obj)` |
| `__add__` | `obj1 + obj2` |
| `__eq__` | `obj1 == obj2` |

---

### 1:30 — __str__ et __repr__ (2 min)
**Texte écran :** __str__ & __repr__

```python
class Personne:
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age

    def __str__(self):
        return f"{self.nom}, {self.age} ans"

    def __repr__(self):
        return f"Personne('{self.nom}', {self.age})"

p = Personne("Alice", 25)
print(str(p))   # Alice, 25 ans  (via __str__)
print(repr(p))  # Personne('Alice', 25)  (via __repr__)
print(p)        # Alice, 25 ans  (print utilise __str__)
```

> "`__str__` est pour l'affichage grand public. `__repr__` est pour les développeurs — il doit idéalement retourner une chaîne qui recrée l'objet."

**Règle :** "Toujours définir `__repr__`. `__str__` est optionnel — s'il manque, Python utilise `__repr__`."

---

### 3:30 — __len__, __getitem__, __setitem__ (2 min)
**Texte écran :** COMPORTEMENT DE SÉQUENCE

```python
class Panier:
    def __init__(self):
        self._articles = []

    def ajouter(self, article):
        self._articles.append(article)

    def __len__(self):
        return len(self._articles)

    def __getitem__(self, index):
        return self._articles[index]

    def __setitem__(self, index, valeur):
        self._articles[index] = valeur

    def __delitem__(self, index):
        del self._articles[index]

    def __contains__(self, article):
        return article in self._articles

panier = Panier()
panier.ajouter("Pomme")
panier.ajouter("Banane")

print(len(panier))        # 2  (__len__)
print(panier[0])          # Pomme  (__getitem__)
panier[1] = "Cerise"      # (__setitem__)
print("Pomme" in panier)  # True  (__contains__)
```

> "Avec ces méthodes, votre objet se comporte comme une liste : on peut utiliser `len()`, les crochets `[]`, `in`, et même faire une boucle `for`."

---

### 5:30 — __add__, __eq__, __lt__ (opérateurs) (2 min)
**Texte écran :** OPÉRATEURS

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, autre):
        return Point(self.x + autre.x, self.y + autre.y)

    def __eq__(self, autre):
        return self.x == autre.x and self.y == autre.y

    def __lt__(self, autre):
        return (self.x ** 2 + self.y ** 2) < (autre.x ** 2 + autre.y ** 2)

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

p1 = Point(1, 2)
p2 = Point(3, 4)
p3 = p1 + p2           # __add__
print(p3)              # Point(4, 6)
print(p1 == Point(1, 2))  # True  (__eq__)
print(p1 < p2)         # True  (__lt__, basé sur la distance)
```

| Opérateur | Méthode |
|-----------|---------|
| `+` | `__add__` |
| `-` | `__sub__` |
| `*` | `__mul__` |
| `==` | `__eq__` |
| `!=` | `__ne__` |
| `<` | `__lt__` |
| `>` | `__gt__` |

> "On peut rendre nos objets totalement intuitifs avec les opérateurs mathématiques et de comparaison."

---

### 7:30 — __call__ (objets appelables) (1 min)
**Texte écran :** OBJETS APPELABLES — __call__

```python
class Multiplicateur:
    def __init__(self, facteur):
        self.facteur = facteur

    def __call__(self, valeur):
        return valeur * self.facteur

fois2 = Multiplicateur(2)
fois3 = Multiplicateur(3)

print(fois2(5))   # 10
print(fois3(5))   # 15

# Utilisation avec map
resultats = list(map(fois2, [1, 2, 3, 4]))
print(resultats)  # [2, 4, 6, 8]
```

> "Avec `__call__`, une instance se comporte comme une fonction. On peut l'appeler avec `()` comme une fonction classique. Utile pour des factories ou des closures."

---

### 8:30 — __enter__/__exit__ (pour with) (1 min 30)
**Texte écran :** CONTEXT MANAGER — __enter__ & __exit__

```python
class Fichier:
    def __init__(self, nom, mode="r"):
        self.nom = nom
        self.mode = mode

    def __enter__(self):
        print(f"Ouverture de {self.nom}")
        self.fichier = open(self.nom, self.mode)
        return self.fichier

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Fermeture de {self.nom}")
        self.fichier.close()
        return False  # Ne pas supprimer l'exception

with Fichier("test.txt", "w") as f:
    f.write("Hello depuis un context manager !")
# Ouverture de test.txt
# Fermeture de test.txt
```

> "`__enter__` s'exécute à l'entrée du `with`. `__exit__` à la sortie — même en cas d'erreur. C'est comme ça que fonctionne le `with open(...)` de Python."

---

### 10:00 — __iter__/__next__ (itération) (1 min 30)
**Texte écran :** ITÉRATION — __iter__ & __next__

```python
class Compteur:
    def __init__(self, max):
        self.max = max
        self.valeur = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.valeur >= self.max:
            raise StopIteration
        self.valeur += 1
        return self.valeur

for nombre in Compteur(5):
    print(nombre, end=" ")  # 1 2 3 4 5
```

> "`__iter__` doit retourner un itérateur (souvent `self`). `__next__` retourne la valeur suivante et lève `StopIteration` quand il n'y en a plus. Ça permet d'utiliser `for` sur vos objets."

---

### 11:30 — Exemple concret : classe Vecteur (1 min 30)
**Texte écran :** EXEMPLE CONCRET — CLASSE VECTEUR

```python
class Vecteur:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Vecteur({self.x}, {self.y})"

    def __add__(self, autre):
        return Vecteur(self.x + autre.x, self.y + autre.y)

    def __sub__(self, autre):
        return Vecteur(self.x - autre.x, self.y - autre.y)

    def __mul__(self, scalaire):
        return Vecteur(self.x * scalaire, self.y * scalaire)

    def __eq__(self, autre):
        return self.x == autre.x and self.y == autre.y

    def __abs__(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

    def __bool__(self):
        return self.x != 0 or self.y != 0

v1 = Vecteur(3, 4)
v2 = Vecteur(1, 2)

print(v1 + v2)       # Vecteur(4, 6)
print(v1 - v2)       # Vecteur(2, 2)
print(v1 * 2)        # Vecteur(6, 8)
print(abs(v1))       # 5.0
print(v1 == Vecteur(3, 4))  # True
print(bool(Vecteur(0, 0)))  # False
```

> "Avec une poignée de méthodes magiques, la classe `Vecteur` devient totalement naturelle à utiliser. C'est ça, la puissance des méthodes spéciales."

---

### 13:00 — Conclusion
> "Module 16 : les itérateurs et générateurs — des outils puissants pour travailler avec des séquences infinies et économiser la mémoire."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 15 : Méthodes spéciales (magiques)

Au programme :
00:00 — Introduction
00:30 — Qu'est-ce qu'une méthode magique ?
01:30 — __str__ et __repr__
03:30 — __len__, __getitem__, __setitem__
05:30 — __add__, __eq__, __lt__ (opérateurs)
07:30 — __call__ (objets appelables)
08:30 — __enter__/__exit__ (context manager)
10:00 — __iter__/__next__ (itération)
11:30 — Exemple concret : classe Vecteur
13:00 — Prochain module

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

#python #formationpython #methodesmagiques #dunder #poo #pythonavance
```

## Tags YouTube
```
python, formation python, apprendre python, cours python, python débutant, programmation python, python complet, python de a à z, python 2026, tutoriel python, méthodes magiques python, dunder methods, __str__ python, __add__ python, __call__ python, context manager python
```
