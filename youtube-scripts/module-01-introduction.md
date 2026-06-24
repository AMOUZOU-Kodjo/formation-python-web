# Vidéo #1 — Introduction à Python

## Informations générales
- **Titre** : Python #1 — Introduction, installation et premier script (Formation Complète)
- **Durée** : ~12 min
- **Miniature** : `banners/01-introduction-à-python.png`
- **Playlist** : Formation Python Complète

---

## Script détaillé

### 0:00 — Intro (30 sec)
**Texte à l'écran :** 🐍 FORMATION PYTHON — MODULE 1

> "Bienvenue dans cette formation complète Python. 36 modules, du débutant absolu jusqu'à l'expert. Dans cette première vidéo, on va voir ce qu'est Python, comment l'installer, et écrire notre tout premier script."

**Visuel :** Montage rapide de code Python qui défile + logo Python animé

---

### 0:30 — Qu'est-ce que Python ? (2 min)
**Texte à l'écran :** QU'EST-CE QUE PYTHON ?

> "Python, c'est un langage de programmation créé en 1991 par Guido van Rossum. C'est aujourd'hui l'un des langages les plus populaires au monde. Pourquoi ? Parce qu'il est simple à lire, simple à écrire, et incroyablement polyvalent."

**Point clé à l'écran :**
- ✅ Simple & lisible
- ✅ Polyvalent (web, data, IA, jeux...)
- ✅ Grande communauté
- ✅ Gratuit & open-source

> "Avec Python, tu peux faire du développement web avec Django ou FastAPI, de la data science avec Pandas, de l'intelligence artificielle, de l'automatisation de tâches, et même des jeux vidéo."

---

### 2:30 — Installation (2 min)
**Texte à l'écran :** INSTALLATION

> "Rendez-vous sur python.org, cliquez sur Download, et téléchargez la dernière version. Sur Windows, cochez impérativement 'Add Python to PATH' avant d'installer."

**Visuel :** Montrer les étapes à l'écran (capture d'écran)
1. python.org → Download
2. Cocher "Add Python to PATH"
3. Install Now

> "Pour vérifier que tout est bon, ouvrez un terminal et tapez :"

**Texte à l'écran :**
```bash
python --version
```

> "Si vous voyez le numéro de version, c'est bon. Vous avez Python installé."

---

### 4:30 — REPL (1 min 30)
**Texte à l'écran :** LE MODE INTERACTIF (REPL)

> "Python peut s'utiliser de manière interactive. Tapez `python` dans le terminal pour lancer le REPL — Read, Evaluate, Print, Loop."

**Démonstration en direct :**
```python
>>> print("Bonjour Python")
Bonjour Python
>>> 2 + 3
5
>>> "Hello " * 3
'Hello Hello Hello'
```

> "C'est pratique pour tester des petites choses rapidement. Mais pour du vrai code, on utilise des fichiers."

---

### 6:00 — Premier script (2 min)
**Texte à l'écran :** NOTRE PREMIER SCRIPT

> "Créez un fichier `premier_script.py` avec un éditeur de texte — VS Code, PyCharm, ou même Notepad."

```python
# Mon premier programme Python
nom = "Monde"
print("Bonjour", nom)
print("Bienvenue dans la formation Python !")

# Un petit calcul
a = 10
b = 5
print(f"{a} + {b} = {a + b}")
```

> "Pour l'exécuter :"

**Texte à l'écran :**
```bash
python premier_script.py
```

> "Et voilà. Vous venez d'écrire et d'exécuter votre premier programme Python."

---

### 8:00 — Notions clés (3 min)
**Texte à l'écran :** NOTIONS CLÉS

> "Quelques concepts essentiels qu'on va approfondir dans les prochains modules :"

**Au tableau :**
1. **Variables** — des boîtes pour stocker des données
2. **Types** — texte, nombre, liste...
3. **Fonctions** — des blocs de code réutilisables
4. **Indentation** — en Python, l'indentation compte

```python
# Variable
prenom = "Alice"
age = 25

# Afficher
print(f"Je m'appelle {prenom} et j'ai {age} ans")

# Condition (aperçu)
if age >= 18:
    print("Je suis majeur")
```

> "L'indentation en Python, ce sont les espaces au début des lignes. Pas de accolades comme en JavaScript — ici, c'est l'indentation qui définit les blocs de code."

---

### 11:00 — Conclusion (30 sec)
**Texte à l'écran :** PROCHAIN MODULE

> "Voilà pour cette introduction. Dans le module 2, on va plonger dans les variables, les types, et les opérateurs."

**Appel à l'action :**
- 🔗 Formation complète : https://formation-python-web.vercel.app
- 📄 Cours PDF : https://savoirbox.vercel.app/cours-python
- 👍 Like si utile
- 🔔 Abonne-toi pour la suite

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 1 : Introduction

Dans cette vidéo, on commence par les bases : qu'est-ce que Python, comment l'installer, et comment écrire son premier script.

AU PROGRAMME :
00:00 — Introduction
00:30 — Qu'est-ce que Python ?
02:30 — Installation
04:30 — Le mode interactif (REPL)
06:00 — Premier script
08:00 — Notions clés (variables, types, indentation)
11:00 — Prochain module

📚 FORMATION COMPLÈTE (36 modules) :
👉 https://formation-python-web.vercel.app

📄 COURS PDF :
👉 https://savoirbox.vercel.app/cours-python

📂 CODE SOURCE DE LA FORMATION :
👉 https://github.com/AMOUZOU-Kodjo/formation-python-web

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

#python #formationpython #apprendreaprogrammer #developpement #programmation
```

## Tags YouTube
```
python, formation python, apprendre python, cours python, python débutant, programmation python, python complet, python de a à z, python 2026, tutoriel python
```
