# Vidéo #20 — Expressions régulières

## Informations générales
- **Titre** : Python #20 — Expressions régulières (Formation Complète)
- **Durée** : ~15 min
- **Miniature** : `banners/20-expressions-régulières.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 20 — EXPRESSIONS RÉGULIÈRES

> "Les expressions régulières sont un langage de recherche de motifs dans le texte. Validation d'email, extraction de numéros, remplacement de patterns — c'est un outil indispensable pour tout développeur."

---

### 0:30 — Module `re` : search, match, findall, sub, split (3 min)
**Texte écran :** LE MODULE RE

```python
import re

texte = "Contact : alice@email.com ou bob@email.com"

# search : trouve le premier match
match = re.search(r"\w+@\w+\.\w+", texte)
print(match.group())  # alice@email.com

# match : vérifie depuis le début
m = re.match(r"Contact", texte)
print(m.group() if m else "Pas de match")  # Contact

# findall : tous les matchs
emails = re.findall(r"\w+@\w+\.\w+", texte)
print(emails)  # ['alice@email.com', 'bob@email.com']

# sub : remplacement
nettoye = re.sub(r"\w+@\w+\.\w+", "[EMAIL]", texte)
print(nettoye)  # Contact : [EMAIL] ou [EMAIL]

# split : découpage
mots = re.split(r"\s+", texte)
print(mots)  # ['Contact', ':', 'alice@email.com', 'ou', 'bob@email.com']
```

> "`re.search` cherche dans toute la chaîne, `re.match` depuis le début, `re.findall` retourne tous les résultats."

---

### 3:30 — Syntaxe : `.`, `^`, `$`, `*`, `+`, `?`, `{n}`, `[]`, `\d`, `\w`, `\s` (3 min)
**Texte écran :** SYNTAXE DE BASE

**Caractères spéciaux :**

| Symbole | Signification | Exemple |
|---------|--------------|---------|
| `.` | N'importe quel caractère | `c.t` → "cat", "cot" |
| `^` | Début de chaîne | `^Hello` |
| `$` | Fin de chaîne | `world$` |
| `*` | 0 ou plus | `ab*c` → "ac", "abc", "abbc" |
| `+` | 1 ou plus | `ab+c` → "abc", "abbc" |
| `?` | 0 ou 1 | `colou?r` → "color", "colour" |
| `{n}` | Exactement n | `\d{5}` → code postal |
| `{n,m}` | De n à m | `\d{2,4}` |

**Classes prédéfinies :**

| Classe | Équivalent | Match |
|--------|-----------|-------|
| `\d` | `[0-9]` | Chiffre |
| `\w` | `[a-zA-Z0-9_]` | Mot |
| `\s` | `[ \t\n\r]` | Espace |
| `\D` | `[^0-9]` | Pas chiffre |

```python
import re

# Exemples
print(re.findall(r"\d+", "Il y a 42 pommes et 7 oranges"))
# ['42', '7']

print(re.findall(r"\w{4,}", "Python est génial"))
# ['Python', 'génial']

print(re.findall(r"^[A-Z]\w+", "Alice et Bob"))
# ['Alice']
```

---

### 6:30 — Groupes : `()`, groupes nommés `(?P<nom>...)` (2 min)
**Texte écran :** GROUPES

```python
import re

# Groupes non nommés
telephone = "06 12 34 56 78"
pattern = r"(\d{2}) (\d{2}) (\d{2}) (\d{2}) (\d{2})"
match = re.search(pattern, telephone)
print(match.groups())     # ('06', '12', '34', '56', '78')
print(match.group(1))     # 06

# Groupes nommés
email = "alice@email.com"
pattern = r"(?P<nom>\w+)@(?P<domaine>\w+\.\w+)"
match = re.search(pattern, email)
print(match.group("nom"))      # alice
print(match.group("domaine"))  # email.com
```

> "Les groupes avec `()` permettent d'extraire des sous-parties du match. Les groupes nommés avec `(?P<>)` rendent le code plus lisible."

---

### 8:30 — Flags : `re.IGNORECASE`, `re.VERBOSE` (1 min 30)
**Texte écran :** FLAGS

```python
import re

texte = "Python PYTHON python"

# Ignorer la casse
print(re.findall(r"python", texte, re.IGNORECASE))
# ['Python', 'PYTHON', 'python']

# VERBOSE : regex multilignes avec commentaires
pattern = re.compile(r"""
    \b          # début de mot
    [A-Z][a-z]+ # majuscule + minuscules
    \b          # fin de mot
""", re.VERBOSE)

print(pattern.findall("Alice et Bob vont à Paris"))
# ['Alice', 'Bob', 'Paris']
```

> "`re.IGNORECASE` insensible à la casse. `re.VERBOSE` permet d'écrire des regex lisibles avec espaces et commentaires."

---

### 10:00 — Cas pratiques : validation email, extraction, remplacement (2 min 30)
**Texte écran :** CAS PRATIQUES

```python
import re

# 1. Validation d'email (basique)
def email_valide(email):
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w{2,}$"
    return bool(re.match(pattern, email))

print(email_valide("alice@email.com"))    # True
print(email_valide("pas-email"))          # False

# 2. Extraction de numéros de téléphone
texte = "Joignable au 01 23 45 67 89 ou 06 98 76 54 32"
nums = re.findall(r"\d{2} \d{2} \d{2} \d{2} \d{2}", texte)
print(nums)  # ['01 23 45 67 89', '06 98 76 54 32']

# 3. Remplacement de dates
texte = "Rendez-vous le 15/04/2026"
converti = re.sub(r"(\d{2})/(\d{2})/(\d{4})", r"\3-\2-\1", texte)
print(converti)  # Rendez-vous le 2026-04-15
```

> "Trois cas concrets : validation, extraction, et transformation de texte."

---

### 12:30 — Pièges : greedy vs lazy (1 min 30)
**Texte écran :** GREEDY VS LAZY

> "Par défaut, les quantificateurs (`*`, `+`) sont gourmands : ils prennent le maximum possible."

```python
import re

texte = "<p>Paragraphe 1</p><p>Paragraphe 2</p>"

# Greedy (par défaut)
greedy = re.search(r"<p>.*</p>", texte)
print(greedy.group())
# <p>Paragraphe 1</p><p>Paragraphe 2</p>

# Lazy (avec ?)
lazy = re.search(r"<p>.*?</p>", texte)
print(lazy.group())
# <p>Paragraphe 1</p>
```

> "Ajoutez `?` après `*`, `+`, ou `{n,}` pour passer en mode paresseux. `*?` capture le minimum."

**Astuce :** utilisez toujours le mode lazy pour le HTML — `.*?` plutôt que `.*`

---

### 14:00 — Conclusion
> "Module 21 : la programmation fonctionnelle avec `map`, `filter`, `reduce` et `lambda`."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 20 : Expressions régulières

Au programme :
00:00 — Introduction
00:30 — Module re : search, match, findall, sub, split
03:30 — Syntaxe : ., ^, $, *, +, ?, {n}, [], \d, \w, \s
06:30 — Groupes : (), groupes nommés (?P<nom>...)
08:30 — Flags : re.IGNORECASE, re.VERBOSE
10:00 — Cas pratiques : validation email, extraction, remplacement
12:30 — Pièges : greedy vs lazy (*? vs *)
14:00 — Prochain module

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

#python #formationpython #regex #expressionsregulieres #re #pythonregex
```

## Tags YouTube
```
python, formation python, regex python, expressions regulieres python, re python, search match findall, groupes regex, validation email python, greedy lazy regex, apprendre python, cours python
```
