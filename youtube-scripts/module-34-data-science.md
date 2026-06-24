# Vidéo #34 — Introduction à la data science

## Informations générales
- **Titre** : Python #34 — Introduction à la data science (Formation Complète)
- **Durée** : ~15 min
- **Miniature** : `banners/34-data-science.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 34 — INTRODUCTION À LA DATA SCIENCE

> "Bienvenue dans le module 34. On attaque la data science avec Python. NumPy pour le calcul numérique, Pandas pour la manipulation de données, et un cas concret sur un vrai dataset. Vous allez voir pourquoi Python est le langage roi de la data."

---

### 0:30 — Qu'est-ce que la data science avec Python ? (1 min)
**Texte écran :** DATA SCIENCE AVEC PYTHON

> "La data science consiste à extraire des connaissances à partir de données. Python domine ce domaine grâce à des bibliothèques comme NumPy, Pandas, Matplotlib et Seaborn."

```python
# Les piliers de la data science en Python
import numpy as np    # calcul numérique
import pandas as pd   # manipulation de données
import matplotlib.pyplot as plt  # visualisation
import seaborn as sns # statistiques visuelles
```

> "On commence par NumPy, le cœur du calcul numérique en Python."

---

### 1:30 — NumPy : tableaux ndarray (2 min)
**Texte écran :** NUMPY — TABLEAUX NDARRAY

```python
import numpy as np

# Création de tableaux
a = np.array([1, 2, 3, 4, 5])
b = np.array([[1, 2, 3], [4, 5, 6]])

print(a)           # [1 2 3 4 5]
print(b)
# [[1 2 3]
#  [4 5 6]]

print(a.shape)     # (5,)
print(b.shape)     # (2, 3)
print(a.dtype)     # int64
```

> "`ndarray` est le type de base. `shape` donne les dimensions, `dtype` le type des éléments. On peut créer des tableaux 1D, 2D comme des matrices, ou plus."

---

### 3:30 — reshape et manipulation (1 min 30)
**Texte écran :** RESHAPE

```python
# Redimensionner un tableau
a = np.arange(12)
print(a)                # [0 1 2 ... 11]

b = a.reshape(3, 4)
print(b)
# [[0 1 2 3]
#  [4 5 6 7]
#  [8 9 10 11]]

c = a.reshape(2, 2, 3)  # 3 dimensions
print(c.shape)           # (2, 2, 3)
```

> "`reshape` change la forme sans copier les données. Les tableaux multidimensionnels sont au cœur des réseaux de neurones."

---

### 5:00 — Opérations vectorisées (2 min)
**Texte écran :** VECTORISATION — ÉVITEZ LES BOUCLES

```python
# ❌ AVEC UNE BOUCLE — lent
a = np.array([1, 2, 3, 4, 5])
b = np.zeros(5)
for i in range(len(a)):
    b[i] = a[i] * 2 + 1

# ✅ VECTORISÉ — 10 à 100× plus rapide
b = a * 2 + 1
print(b)  # [3 5 7 9 11]

# Opérations mathématiques
print(np.sum(a))       # 15
print(np.mean(a))      # 3.0
print(np.std(a))       # ~1.41
print(a ** 2)          # [1 4 9 16 25]
```

> "La vectorisation applique l'opération à tout le tableau en une fois. C'est plus rapide, plus lisible, et sans boucle. NumPy utilise du C en interne."

---

### 7:00 — Pandas : Series et DataFrame (2 min)
**Texte écran :** PANDAS — SERIES & DATAFRAME

```python
import pandas as pd

# Series : une colonne
s = pd.Series([10, 20, 30, 40], index=["a", "b", "c", "d"])
print(s["a"])  # 10

# DataFrame : tableau 2D avec colonnes nommées
data = {
    "nom": ["Alice", "Bob", "Charlie"],
    "age": [25, 30, 35],
    "ville": ["Paris", "Lyon", "Marseille"]
}
df = pd.DataFrame(data)
print(df)
#        nom  age      ville
# 0    Alice   25      Paris
# 1      Bob   30       Lyon
# 2  Charlie   35  Marseille
```

> "Une `Series` est une colonne étiquetée. Un `DataFrame` est un tableau avec des lignes et des colonnes. C'est la structure centrale de Pandas."

---

### 9:00 — Lire un CSV (1 min 30)
**Texte écran :** LIRE UN FICHIER CSV

```python
# Lire un fichier CSV
df = pd.read_csv("ventes.csv")
print(type(df))          # <class 'pandas.core.frame.DataFrame'>
```

> "`pd.read_csv()` charge un CSV en une ligne. Même un fichier de millions de lignes — Pandas gère."

---

### 10:30 — Explorer un DataFrame (2 min)
**Texte écran :** EXPLORER LES DONNÉES

```python
# Aperçu
print(df.head())        # 5 premières lignes
print(df.tail(3))       # 3 dernières lignes

# Informations générales
print(df.info())        # colonnes, types, valeurs non-nulles

# Statistiques descriptives
print(df.describe())    # count, mean, std, min, quartiles, max

# Compter par catégorie
print(df["categorie"].value_counts())

# Grouper et agréger
print(df.groupby("categorie")["prix"].mean())
```

> "`head`, `info`, `describe` sont les réflexes à avoir devant un nouveau dataset. `groupby` suit le même principe que SQL."

---

### 12:30 — Nettoyage : dropna et fillna (1 min 30)
**Texte écran :** NETTOYER LES DONNÉES

```python
# Valeurs manquantes
print(df.isna().sum())         # compter les NaN par colonne

# Supprimer les lignes avec NaN
df_clean = df.dropna()

# Remplacer les NaN par une valeur
df_filled = df.fillna(0)
df["age"].fillna(df["age"].mean(), inplace=True)

# Supprimer les doublons
df.drop_duplicates(inplace=True)
```

> "Le nettoyage est 80 % du travail en data science. `dropna` supprime, `fillna` remplace. Choisissez selon le contexte."

---

### 14:00 — Cas concret : analyse d'un dataset (1 min)
**Texte écran :** CAS CONCRET

```python
import pandas as pd
import numpy as np

# Chargement
df = pd.read_csv("titanic.csv")

# Exploration
print(df.shape)
print(df.isna().sum())

# Nettoyage
df["Age"].fillna(df["Age"].median(), inplace=True)
df.drop(columns=["Cabin"], inplace=True)

# Analyse
print(df.groupby("Sex")["Survived"].mean())
# Femmes : ~74 %, Hommes : ~19 %

# Création de colonne
df["Famille"] = df["SibSp"] + df["Parch"]
```

> "Sur le Titanic, les femmes avaient 74 % de chances de survie contre 19 % pour les hommes. Ce genre d'analyse se fait en quelques lignes avec Pandas."

---

### 15:00 — Conclusion
> "Module 35 : on visualise ces données avec Matplotlib et Seaborn. C'est là que les chiffres prennent vie."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 34 : Introduction à la data science

Au programme :
00:00 — Introduction
00:30 — Qu'est-ce que la data science avec Python ?
01:30 — NumPy : tableaux ndarray
03:30 — reshape et manipulation
05:00 — Opérations vectorisées
07:00 — Pandas : Series et DataFrame
09:00 — Lire un CSV
10:30 — Explorer un DataFrame
12:30 — Nettoyage : dropna et fillna
14:00 — Cas concret : analyse du Titanic
15:00 — Prochain module

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

#python #formationpython #datascience #numpy #pandas #dataanalysis
```

## Tags YouTube
```
python, formation python, data science python, numpy tutorial, pandas tutorial, analyse de données python, apprendre python, cours python, python pour la data science, numpy array, pandas dataframe, python data analysis, datasciences
```
