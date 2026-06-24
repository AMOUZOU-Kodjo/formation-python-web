# Vidéo #8 — Fonctions

## Informations générales
- **Titre** : Python #8 — Fonctions (def, args, kwargs, closures) (Formation Complète)
- **Durée** : ~15 min
- **Miniature** : `banners/08-fonctions.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 8 — FONCTIONS

> "Bienvenue dans le module 8. Les fonctions sont les blocs de construction de tout programme Python. On va voir comment les définir, les paramétrer et maîtriser la portée des variables."

---

### 0:30 — Définir une fonction (2 min)
**Texte écran :** DÉFINIR UNE FONCTION

```python
# Syntaxe de base
def saluer():
    """Affiche un message de salutation."""
    print("Bonjour !")

saluer()  # Bonjour !

# Avec paramètre
def saluer_nom(nom):
    print(f"Bonjour {nom} !")

saluer_nom("Alice")  # Bonjour Alice !

# Avec retour
def carre(x):
    return x ** 2

resultat = carre(5)
print(resultat)  # 25
```

> "`def` pour définir, `return` pour renvoyer une valeur. Les docstrings expliquent ce que fait la fonction."

---

### 2:30 — Paramètres par défaut (1 min 30)
**Texte écran :** PARAMÈTRES PAR DÉFAUT

```python
def saluer(nom, message="Bonjour"):
    print(f"{message}, {nom} !")

saluer("Alice")              # Bonjour, Alice !
saluer("Bob", "Salut")       # Salut, Bob !

# Piège : mutable par défaut
def ajouter(element, liste=[]):
    liste.append(element)
    return liste

print(ajouter(1))  # [1]
print(ajouter(2))  # [1, 2] → PAS le comportement attendu !

# Solution
def ajouter(element, liste=None):
    if liste is None:
        liste = []
    liste.append(element)
    return liste
```

> "Les paramètres par défaut sont évalués une fois au moment de la définition. Attention avec les mutables."

---

### 4:00 — Paramètres nommés (1 min)
**Texte écran :** PARAMÈTRES NOMMÉS

```python
def afficher_infos(nom, age, ville):
    print(f"{nom}, {age} ans, habite à {ville}")

# Appel positionnel
afficher_infos("Alice", 25, "Paris")

# Appel nommé (ordre libre)
afficher_infos(age=25, ville="Paris", nom="Alice")

# Mélange (positionnels d'abord)
afficher_infos("Alice", ville="Paris", age=25)
```

> "Les paramètres nommés rendent le code plus lisible et permettent de changer l'ordre des arguments."

---

### 5:00 — *args (1 min)
**Texte écran :** ARGS — NOMBRE VARIABLE

```python
def somme(*nombres):
    """Reçoit un nombre variable d'arguments."""
    total = 0
    for n in nombres:
        total += n
    return total

print(somme(1, 2))            # 3
print(somme(1, 2, 3, 4, 5))  # 15

# args est un tuple
def afficher_tous(*args):
    for i, arg in enumerate(args):
        print(f"Arg {i} : {arg}")

afficher_tous("a", "b", "c")
```

> "`*args` capture tous les arguments positionnels supplémentaires dans un tuple."

---

### 6:00 — **kwargs (1 min)
**Texte écran :** KWARGS — ARGUMENTS NOMMÉS

```python
def connexion(**infos):
    """Reçoit des paramètres nommés en dictionnaire."""
    for cle, valeur in infos.items():
        print(f"{cle} = {valeur}")

connexion(host="localhost", port=8080, ssl=True)

# Mélange des trois
def fonction(a, b, *args, **kwargs):
    print(f"a={a}, b={b}")
    print(f"args={args}")
    print(f"kwargs={kwargs}")

fonction(1, 2, 3, 4, x=10, y=20)
```

> "`**kwargs` capture tous les arguments nommés supplémentaires dans un dictionnaire."

---

### 7:00 — Portée des variables (LEGB) (2 min)
**Texte écran :** PORTÉE — RÈGLE LEGB

```python
x = "globale"        # Scope : Global

def externe():
    x = "englobante"  # Scope : Enclosing
    def interne():
        x = "locale"  # Scope : Local
        print(x)
    interne()

# L.E.G.B : Local → Enclosing → Global → Built-in

# Modifier une variable globale
compteur = 0

def incrementer():
    global compteur
    compteur += 1

incrementer()
print(compteur)  # 1
```

> "LEGB : Python cherche d'abord dans le scope local, puis englobant, puis global, puis built-in."

---

### 9:00 — Fonctions imbriquées et closures (2 min)
**Texte écran :** CLOSURES

```python
def multiplier_par(facteur):
    """Retourne une fonction qui multiplie par facteur."""
    def multiplier(x):
        return x * facteur
    return multiplier

double = multiplier_par(2)
triple = multiplier_par(3)

print(double(5))   # 10
print(triple(5))   # 15

# Autre exemple : compteur
def create_compteur():
    compteur = 0
    def incrementer():
        nonlocal compteur
        compteur += 1
        return compteur
    return incrementer

c1 = create_compteur()
print(c1())  # 1
print(c1())  # 2
```

> "Une closure, c'est une fonction qui se souvient des variables de son scope englobant, même après la fin de la fonction externe."

---

### 11:00 — Lambda (aperçu) (1 min 30)
**Texte écran :** FONCTIONS LAMBDA

```python
# Syntaxe : lambda arguments: expression

carre = lambda x: x ** 2
print(carre(5))  # 25

# Utile pour trier
etudiants = [
    {"nom": "Alice", "note": 16},
    {"nom": "Bob", "note": 12},
    {"nom": "Charlie", "note": 18}
]

etudiants.sort(key=lambda e: e["note"], reverse=True)
print(etudiants)
# Charlie, Alice, Bob

# Avec filter et map
nombres = [1, 2, 3, 4, 5, 6]
pairs = list(filter(lambda x: x % 2 == 0, nombres))
carres = list(map(lambda x: x ** 2, nombres))
```

> "Les lambdas sont des fonctions anonymes d'une seule ligne, pratiques pour des fonctions simples et jetables."

---

### 12:30 — if __name__ == "__main__" (1 min 30)
**Texte écran :** SCRIPT vs MODULE

```python
# fichier: utils.py
def addition(a, b):
    return a + b

def soustraction(a, b):
    return a - b

if __name__ == "__main__":
    # Ce code ne s'exécute que si on lance ce fichier directement
    print("Test des fonctions :")
    print(f"5 + 3 = {addition(5, 3)}")
    print(f"5 - 3 = {soustraction(5, 3)}")
```

> "Ce bloc permet d'avoir du code qui s'exécute uniquement quand le fichier est lancé directement, pas quand il est importé comme module. Indispensable pour les tests et les scripts réutilisables."

---

### 14:00 — Conclusion (1 min)
**Récapitulatif :**
- `def` pour définir une fonction
- `return` pour renvoyer une valeur
- `*args` et `**kwargs` pour la flexibilité
- LEGB pour la portée
- `if __name__ == "__main__"` pour les scripts

> "Module 9 : on approfondit les compréhensions de listes, dictionnaires et ensembles."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 8 : Fonctions

Au programme :
00:00 — Introduction
00:30 — Définir une fonction (def, return, docstring)
02:30 — Paramètres par défaut et piège des mutables
04:00 — Paramètres nommés
05:00 — *args (arguments positionnels variables)
06:00 — **kwargs (arguments nommés variables)
07:00 — Portée des variables (LEGB)
09:00 — Fonctions imbriquées et closures
11:00 — Lambda (aperçu)
12:30 — if __name__ == "__main__"
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

#python #formationpython #fonctions #args #kwargs #lambda #closures
```

## Tags YouTube
```
python, formation python, fonctions python, def python, args kwargs, lambda python, closures python, apprendre python, cours python, python débutant, programmation python, portée variables python
```
