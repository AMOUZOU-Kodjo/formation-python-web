# Vidéo #2 — Variables, types et opérateurs

## Informations générales
- **Titre** : Python #2 — Variables, types et opérateurs (Formation Complète)
- **Durée** : ~14 min
- **Miniature** : `banners/02-variables-types-et-opérateurs.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 2 — VARIABLES, TYPES & OPÉRATEURS

> "Bienvenue dans le module 2. Maintenant que Python est installé, on va voir comment stocker et manipuler des données avec les variables, les types fondamentaux et les opérateurs."

---

### 0:30 — Les variables (2 min)
**Texte écran :** LES VARIABLES

> "Une variable, c'est une boîte qui porte un nom et qui contient une valeur."

```python
# Déclaration de variables
prenom = "Alice"
age = 25
taille = 1.68
est_etudiant = True
```

> "Pas de mot-clé comme `let` ou `var`. En Python, on écrit juste `nom = valeur`."

**Point clé :**
- Python déduit le type automatiquement
- Les noms sont sensibles à la casse : `age` ≠ `Age`
- Conventions : `snake_case` pour les variables

---

### 2:30 — Les types fondamentaux (3 min)
**Texte écran :** LES TYPES DE BASE

> "Python a 4 types de base :"

| Type | Exemple | Description |
|------|---------|-------------|
| `int` | `42` | Nombre entier |
| `float` | `3.14` | Nombre décimal |
| `str` | `"Bonjour"` | Texte (chaîne) |
| `bool` | `True` | Vrai/Faux |

```python
type(42)       # <class 'int'>
type(3.14)     # <class 'float'>
type("Hello")  # <class 'str'>
type(True)     # <class 'bool'>
```

> "La fonction `type()` permet de connaître le type d'une valeur."

---

### 5:30 — Conversion de types (2 min)
**Texte écran :** CONVERSION DE TYPES

```python
# Conversion
str(42)         # "42"
int("100")      # 100
float("3.14")   # 3.14
bool(1)         # True
bool(0)         # False
```

> "On utilise `int()`, `float()`, `str()`, `bool()` pour convertir."

**Piège courant :**
```python
age = input("Âge ? ")  # input() retourne une str
age + 1                # ERREUR ! Type mismatch
int(age) + 1           # OK
```

---

### 7:30 — Opérateurs arithmétiques (2 min)
**Texte écran :** OPÉRATEURS ARITHMÉTIQUES

| Opérateur | Nom | Exemple |
|-----------|-----|---------|
| `+` | Addition | `5 + 3 = 8` |
| `-` | Soustraction | `5 - 3 = 2` |
| `*` | Multiplication | `5 * 3 = 15` |
| `/` | Division | `5 / 3 = 1.666` |
| `//` | Division entière | `5 // 3 = 1` |
| `%` | Modulo (reste) | `5 % 3 = 2` |
| `**` | Puissance | `5 ** 3 = 125` |

```python
print(10 / 3)   # 3.333...
print(10 // 3)  # 3
print(10 % 3)   # 1
print(2 ** 8)   # 256
```

---

### 9:30 — Opérateurs de comparaison (1 min 30)
**Texte écran :** OPÉRATEURS DE COMPARAISON

| Opérateur | Signification |
|-----------|---------------|
| `==` | Égal à |
| `!=` | Différent de |
| `>` | Plus grand que |
| `<` | Plus petit que |
| `>=` | Plus grand ou égal |
| `<=` | Plus petit ou égal |

```python
print(10 > 5)    # True
print(10 == 5)   # False
print(10 != 5)   # True
```

---

### 11:00 — Opérateurs logiques (1 min 30)
**Texte écran :** OPÉRATEURS LOGIQUES

```python
print(True and True)   # True
print(True and False)  # False
print(True or False)   # True
print(not True)        # False
```

**Exemple concret :**
```python
age = 20
permis = True
print(age >= 18 and permis)  # True
```

---

### 12:30 — f-strings (1 min)
**Texte écran :** AFFICHAGE AVEC F-STRINGS

```python
nom = "Alice"
age = 25
print(f"Je m'appelle {nom} et j'ai {age} ans")
# → Je m'appelle Alice et j'ai 25 ans
```

> "Les f-strings sont la façon moderne d'afficher des variables en Python."

---

### 13:30 — Conclusion + Prochain module
> "Module 3 : on plonge dans les chaînes de caractères."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 2 : Variables, types et opérateurs

Au programme :
00:00 — Introduction
00:30 — Les variables
02:30 — Les types fondamentaux (int, float, str, bool)
05:30 — Conversion de types
07:30 — Opérateurs arithmétiques
09:30 — Opérateurs de comparaison
11:00 — Opérateurs logiques
12:30 — f-strings
13:30 — Prochain module

📚 Formation complète (36 modules) : https://formation-python-web.vercel.app
📄 Cours PDF : https://savoirbox.vercel.app/cours-python

#python #formationpython #variables #apprendreaprogrammer
```
