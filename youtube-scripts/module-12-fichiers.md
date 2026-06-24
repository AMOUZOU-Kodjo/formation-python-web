# Vidéo #12 — Fichiers (lecture et écriture)

## Informations générales
- **Titre** : Python #12 — Fichiers : lecture, écriture, CSV, JSON (Formation Complète)
- **Durée** : ~14 min
- **Miniature** : `banners/12-fichiers-csv-json.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 12 — FICHIERS

> "Bienvenue dans le module 12. Lire et écrire des fichiers, c'est indispensable pour sauvegarder des données, charger des configurations ou traiter des exports. On va voir l'approche classique avec `open()` et l'approche moderne avec `pathlib`."

---

### 0:30 — open() et les modes (2 min)
**Texte écran :** LA FONCTION open()

> "La fonction `open()` ouvre un fichier et retourne un objet fichier."

| Mode | Signification |
|------|---------------|
| `"r"` | Lecture (défaut) |
| `"w"` | Écriture (écrase) |
| `"a"` | Ajout (append) |
| `"rb"` | Lecture binaire |
| `"wb"` | Écriture binaire |
| `"r+"` | Lecture + écriture |

```python
fichier = open("data.txt", "r")
contenu = fichier.read()
fichier.close()
```

> "Mais attention : si vous oubliez `close()`, le fichier reste ouvert. On va voir comment éviter ça."

---

### 2:30 — Lire un fichier (2 min)
**Texte écran :** LECTURE DE FICHIER

```python
# read() — tout le fichier
with open("data.txt", "r") as f:
    contenu = f.read()
    print(contenu)

# readline() — ligne par ligne
with open("data.txt", "r") as f:
    ligne = f.readline()
    while ligne:
        print(ligne.strip())
        ligne = f.readline()

# readlines() — liste de lignes
with open("data.txt", "r") as f:
    lignes = f.readlines()
    print(lignes)  # ["ligne1\n", "ligne2\n", ...]

# Itération directe (recommandé)
with open("data.txt", "r") as f:
    for ligne in f:
        print(ligne.strip())
```

> "La boucle `for ligne in f` est la méthode la plus efficace pour les gros fichiers : elle ne charge qu'une ligne à la fois en mémoire."

---

### 4:30 — Écrire un fichier (1 min 30)
**Texte écran :** ÉCRITURE DE FICHIER

```python
# write() — écrit une chaîne
with open("sortie.txt", "w") as f:
    f.write("Première ligne\n")
    f.write("Deuxième ligne\n")
    f.write("Troisième ligne\n")

# writelines() — écrit une liste
lignes = ["Pomme\n", "Banane\n", "Cerise\n"]
with open("fruit.txt", "w") as f:
    f.writelines(lignes)

# Mode "a" — ajout sans écraser
with open("journal.txt", "a") as f:
    f.write("Nouvelle entrée\n")
```

> "Attention : le mode `"w"` efface tout le contenu existant. Utilisez `"a"` pour ajouter."

---

### 6:00 — Context manager with (1 min 30)
**Texte écran :** LE MOT-CLÉ with

```python
# Sans with — risque d'oubli
f = open("data.txt", "r")
contenu = f.read()
# Oups, j'ai oublié f.close() !

# Avec with — fermeture automatique
with open("data.txt", "r") as f:
    contenu = f.read()
# Le fichier est automatiquement fermé ici
```

> "Le `with` est un context manager. Il garantit que le fichier sera fermé même si une exception survient. C'est la méthode recommandée dans 100 % des cas."

```python
# Même avec une erreur, le fichier est fermé
try:
    with open("data.txt", "r") as f:
        contenu = f.read()
        resultat = 10 / 0  # Erreur !
except ZeroDivisionError:
    print("Erreur, mais le fichier est fermé")
```

---

### 7:30 — pathlib moderne (2 min)
**Texte écran :** pathlib — L'ALTERNATIVE MODERNE

```python
from pathlib import Path

# Créer un chemin
chemin = Path("data.txt")

# Lire un fichier
contenu = chemin.read_text(encoding="utf-8")
print(contenu)

# Écrire un fichier
chemin.write_text("Nouveau contenu", encoding="utf-8")

# Lire/écrire en binaire
chemin.read_bytes()
chemin.write_bytes(b"donnees binaires")

# Manipulation de chemins
dossier = Path("documents")
fichier = dossier / "sous-dossier" / "data.txt"
print(fichier.exists())       # True/False
print(fichier.suffix)         # .txt
print(fichier.stem)           # data
print(fichier.parent)         # documents/sous-dossier
```

> "`pathlib` est plus élégant, plus intuitif et fait partie de la bibliothèque standard depuis Python 3.4. Plus besoin de `os.path.join()` avec des chaînes."

---

### 9:30 — Fichiers CSV (2 min)
**Texte écran :** FICHIERS CSV

```python
import csv

# Lecture d'un CSV
with open("utilisateurs.csv", "r", newline="") as f:
    lecteur = csv.reader(f)
    for ligne in lecteur:
        print(ligne)  # ["Alice", "25", "Paris"]

# Lecture avec en-têtes (DictReader)
with open("utilisateurs.csv", "r", newline="") as f:
    lecteur = csv.DictReader(f)
    for ligne in lecteur:
        print(ligne["nom"], ligne["age"])

# Écriture d'un CSV
with open("sortie.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["nom", "age", "ville"])
    writer.writerow(["Alice", 25, "Paris"])
    writer.writerow(["Bob", 30, "Lyon"])
```

> "Le paramètre `newline=""` évite les problèmes de sauts de ligne sur Windows."

---

### 11:30 — Fichiers JSON (2 min)
**Texte écran :** FICHIERS JSON

```python
import json

# Données Python
donnees = {
    "nom": "Alice",
    "age": 25,
    "ville": "Paris",
    "langages": ["Python", "JavaScript"]
}

# Écriture JSON
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(donnees, f, indent=4, ensure_ascii=False)

# Lecture JSON
with open("data.json", "r", encoding="utf-8") as f:
    chargees = json.load(f)
print(chargees["nom"])  # Alice

# json.dumps / json.loads (chaînes, pas fichiers)
chaine_json = json.dumps(donnees, indent=4)
print(chaine_json)

dict_depuis_json = json.loads(chaine_json)
print(dict_depuis_json)
```

> "`json.dump()` écrit dans un fichier, `json.dumps()` produit une chaîne. `indent=4` rend le fichier lisible. `ensure_ascii=False` préserve les accents."

---

### 13:30 — Conclusion
> "Module 13 : on entre dans la programmation orientée objet avec les classes."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 12 : Fichiers (lecture, écriture, CSV, JSON)

Au programme :
00:00 — Introduction
00:30 — open() et les modes
02:30 — Lire un fichier
04:30 — Écrire un fichier
06:00 — Context manager with
07:30 — pathlib moderne
09:30 — Fichiers CSV
11:30 — Fichiers JSON
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

#python #formationpython #fichiers #csv #json #pathlib #fileio
```

## Tags YouTube
```
python, formation python, apprendre python, cours python, python débutant, programmation python, python complet, python de a à z, python 2026, tutoriel python, fichiers python, open python, csv python, json python, pathlib python, with python
```
