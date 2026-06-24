# Vidéo #7 — Boucles

## Informations générales
- **Titre** : Python #7 — Boucles for et while (Formation Complète)
- **Durée** : ~14 min
- **Miniature** : `banners/07-boucles.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 7 — BOUCLES

> "Bienvenue dans le module 7. Les boucles permettent de répéter des actions. On va voir les deux types de boucles en Python : `for` et `while`, ainsi que des outils comme `enumerate` et `zip`."

---

### 0:30 — Boucle for (2 min)
**Texte écran :** LA BOUCLE FOR

```python
# Sur une liste
fruits = ["pomme", "banane", "cerise"]
for fruit in fruits:
    print(fruit)

# Sur une chaîne
for lettre in "Python":
    print(lettre)   # P, y, t, h, o, n

# Avec range()
for i in range(5):
    print(i)        # 0, 1, 2, 3, 4

for i in range(2, 10, 2):
    print(i)        # 2, 4, 6, 8
```

> "`for` itère sur n'importe quel itérable. `range(start, stop, step)` génère une séquence de nombres."

---

### 2:30 — Boucle while (2 min)
**Texte écran :** LA BOUCLE WHILE

```python
# Compteur
compteur = 0
while compteur < 5:
    print(f"Tour {compteur}")
    compteur += 1

# Saisie utilisateur
mot_de_passe = ""
while mot_de_passe != "secret":
    mot_de_passe = input("Mot de passe : ")
print("Accès autorisé")
```

> "`while` répète tant que la condition est vraie. Attention à toujours modifier la condition pour éviter une boucle infinie."

---

### 4:30 — break et continue (1 min 30)
**Texte écran :** BREAK & CONTINUE

```python
# break : sort de la boucle
for i in range(100):
    if i == 5:
        break
    print(i)        # 0, 1, 2, 3, 4

print("Boucle terminée")

# continue : passe au tour suivant
for i in range(5):
    if i == 2:
        continue
    print(i)        # 0, 1, 3, 4

# Exemple concret : recherche
nombres = [3, 7, 1, 9, 4]
for n in nombres:
    if n == 9:
        print("Trouvé !")
        break
```

---

### 6:00 — else dans les boucles (1 min)
**Texte écran :** BLOC ELSE

```python
# else s'exécute si break n'a PAS été déclenché
for i in range(5):
    print(i)
else:
    print("Boucle terminée normalement")

# Avec break
for i in range(5):
    if i == 3:
        break
else:
    print("Ne s'affiche pas")

# Recherche avec else
for n in [2, 4, 6, 8]:
    if n % 2 != 0:
        print("Nombre impair trouvé")
        break
else:
    print("Tous les nombres sont pairs")
```

> "Le `else` d'une boucle s'exécute uniquement si aucun `break` n'a été rencontré. Idéal pour des recherches."

---

### 7:00 — enumerate() (1 min 30)
**Texte écran :** ENUMERATE

```python
fruits = ["pomme", "banane", "cerise"]

# Sans enumerate (lourd)
index = 0
for fruit in fruits:
    print(index, fruit)
    index += 1

# Avec enumerate (propre)
for index, fruit in enumerate(fruits):
    print(index, fruit)

# Avec départ personnalisé
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")
```

> "`enumerate()` donne l'index en même temps que la valeur. Plus propre que de gérer un compteur manuellement."

---

### 8:30 — zip() (1 min 30)
**Texte écran :** ZIP — ITÉRATION PARALLÈLE

```python
noms = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 22]

for nom, age in zip(noms, ages):
    print(f"{nom} a {age} ans")

# Avec trois listes
notes = [16, 14, 18]
for nom, age, note in zip(noms, ages, notes):
    print(f"{nom} : {note}/20")

# Créer un dictionnaire
etudiants = dict(zip(noms, ages))
print(etudiants)  # {"Alice": 25, "Bob": 30, "Charlie": 22}
```

> "`zip()` associe les éléments de plusieurs itérables. Très pratique pour itérer en parallèle."

---

### 10:00 — Boucles imbriquées (1 min)
**Texte écran :** BOUCLES IMBRIQUÉES

```python
# Table de multiplication
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} × {j} = {i*j}")
    print("---")

# Aplatir une matrice
matrice = [[1, 2], [3, 4], [5, 6]]
for ligne in matrice:
    for element in ligne:
        print(element, end=" ")
    print()  # retour à la ligne
```

---

### 11:00 — Boucles infinies et sécurité (1 min 30)
**Texte écran :** BOUCLES INFINIES

```python
# Boucle infinie volontaire (serveur, jeu)
while True:
    reponse = input("Continuer ? (oui/non) : ")
    if reponse == "non":
        break

# Sécurité : limite max d'itérations
tentatives = 0
max_tentatives = 3

while tentatives < max_tentatives:
    mdp = input("Mot de passe : ")
    if mdp == "secret":
        print("Connecté")
        break
    tentatives += 1
else:
    print("Compte bloqué")
```

> "Toujours prévoir une condition de sortie ou un compteur maximum pour éviter les boucles infinies."

---

### 12:30 — Nested loops et listes en pratique (1 min)
**Texte écran :** CAS PRATIQUE

```python
# Créer une grille
grille = [[0 for _ in range(3)] for _ in range(3)]
print(grille)  # [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

# Parcourir une grille
for i in range(3):
    for j in range(3):
        print(f"({i},{j})", end=" ")
    print()
```

---

### 13:30 — Conclusion (30s)
> "Module 8 : on attaque les fonctions, un chapitre fondamental."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 7 : Boucles for et while

Au programme :
00:00 — Introduction
00:30 — Boucle for
02:30 — Boucle while
04:30 — break et continue
06:00 — else dans les boucles
07:00 — enumerate()
08:30 — zip() — itération parallèle
10:00 — Boucles imbriquées
11:00 — Boucles infinies et sécurité
12:30 — Cas pratique
13:30 — Prochain module

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

#python #formationpython #boucles #for #while #enumerate #zip
```

## Tags YouTube
```
python, formation python, boucles python, for python, while python, enumerate python, zip python, break continue, apprendre python, cours python, python débutant, programmation python
```
