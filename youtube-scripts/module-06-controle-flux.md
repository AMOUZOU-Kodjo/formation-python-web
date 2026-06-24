# Vidéo #6 — Contrôle de flux

## Informations générales
- **Titre** : Python #6 — Contrôle de flux (if/else, match, walrus) (Formation Complète)
- **Durée** : ~13 min
- **Miniature** : `banners/06-contrôle-de-flux.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 6 — CONTRÔLE DE FLUX

> "Bienvenue dans le module 6. On va voir comment prendre des décisions dans notre code avec if, elif, else, l'opérateur ternaire, et les nouveautés comme match/case de Python 3.10."

---

### 0:30 — if / elif / else (2 min 30)
**Texte écran :** CONDITIONS DE BASE

```python
age = 18

if age < 12:
    print("Enfant")
elif age < 18:
    print("Adolescent")
elif age < 65:
    print("Adulte")
else:
    print("Senior")
```

> "L'indentation est cruciale — le bloc sous `if` doit être indenté de 4 espaces."

**Comparaisons multiples :**
```python
if 18 <= age < 65:
    print("Adulte actif")
```

---

### 3:00 — Conditions composées (1 min 30)
**Texte écran :** AND / OR / NOT

```python
age = 20
permis = True

if age >= 18 and permis:
    print("Tu peux conduire")

if age < 12 or age > 80:
    print("Tarif réduit")

if not permis:
    print("Pas de permis")
```

> "`and` : les deux conditions sont vraies. `or` : au moins une est vraie. `not` : inverse la valeur booléenne."

---

### 4:30 — Opérateur ternaire (1 min)
**Texte écran :** OPÉRATEUR TERNAIRE

```python
# Syntaxe : valeur_si_vrai if condition else valeur_si_faux

age = 20
statut = "majeur" if age >= 18 else "mineur"
print(statut)  # majeur

# Versus if classique
if age >= 18:
    statut = "majeur"
else:
    statut = "mineur"
```

> "Le ternaire est parfait pour des conditions simples. Pas de parenthèses comme en JavaScript."

---

### 5:30 — Vérité et fausseté des valeurs (1 min 30)
**Texte écran :** VALEURS FAUSSES

```python
# Considérées comme False :
bool(0)          # False
bool(0.0)        # False
bool("")         # False (chaîne vide)
bool([])         # False (liste vide)
bool({})         # False (dict vide)
bool(None)       # False

# Tout le reste est True
bool(1)          # True
bool("Hello")    # True
bool([0])        # True (liste non vide)

# Utilisation pratique
nom = input("Nom : ")
if nom:          # True si non vide
    print(f"Bonjour {nom}")
else:
    print("Nom vide")
```

> "En Python, `0`, `""`, `[]`, `{}`, `None` sont considérés comme `False`. Tout le reste est `True`. C'est très utile pour des tests rapides."

---

### 7:00 — match/case (Python 3.10+) (2 min 30)
**Texte écran :** MATCH / CASE

```python
# Alternative moderne à if/elif
commande = "stop"

match commande:
    case "start":
        print("Démarrage...")
    case "stop":
        print("Arrêt...")
    case "pause":
        print("Pause")
    case _:
        print("Commande inconnue")
```

**Pattern matching avancé :**
```python
point = (3, 4)

match point:
    case (0, 0):
        print("Origine")
    case (x, 0):
        print(f"Sur l'axe X en {x}")
    case (0, y):
        print(f"Sur l'axe Y en {y}")
    case (x, y):
        print(f"Point en ({x}, {y})")
```

> "Le `match/case` déstructure et compare. Très puissant pour les structures complexes."

---

### 9:30 — Walrus operator := (1 min 30)
**Texte écran :** L'OPÉRATEUR WALRUS

```python
# Sans walrus
donnee = input("Entrez une valeur : ")
if donnee:
    print(f"Vous avez saisi : {donnee}")

# Avec walrus
if (donnee := input("Entrez une valeur : ")):
    print(f"Vous avez saisi : {donnee}")

# Dans une boucle
while (ligne := input("> ")) != "quit":
    print(f"Vous avez dit : {ligne}")
```

> "Introduit en Python 3.8, l'opérateur `:=` permet d'assigner une variable dans une expression. La variable est disponible après."

---

### 11:00 — Bonnes pratiques (1 min 30)
**Texte écran :** BONNES PRATIQUES

```python
# ❌ À éviter : if imbriqués profonds
if a:
    if b:
        if c:
            faire()

# ✅ Mieux : early return
if not a:
    return
if not b:
    return
if not c:
    return
faire()

# ✅ Utiliser 'in' au lieu de conditions longues
# ❌ if lettre == "a" or lettre == "e" or lettre == "i":
# ✅
if lettre in "aeiouy":
    print("Voyelle")

# ✅ Chaîner les comparaisons
if 0 < x < 10:       # au lieu de x > 0 and x < 10
    print("OK")
```

---

### 12:30 — Conclusion (30s)
> "Module 7 : on passe aux boucles for et while."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 6 : Contrôle de flux

Au programme :
00:00 — Introduction
00:30 — if / elif / else
03:00 — Conditions composées (and, or, not)
04:30 — Opérateur ternaire
05:30 — Vérité et fausseté des valeurs
07:00 — match/case (Python 3.10+)
09:30 — Walrus operator (:=)
11:00 — Bonnes pratiques
12:30 — Prochain module

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

#python #formationpython #ifelse #controlflow #matchcase #walrus
```

## Tags YouTube
```
python, formation python, if else python, contrôle de flux, match case python, walrus operator, apprendre python, cours python, python débutant, programmation python, python 3.10, ternaire python
```
