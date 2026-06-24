# Vidéo #35 — Visualisation de données

## Informations générales
- **Titre** : Python #35 — Visualisation de données (Formation Complète)
- **Durée** : ~14 min
- **Miniature** : `banners/35-visualisation-de-données.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 35 — VISUALISATION DE DONNÉES

> "Bienvenue dans le module 35. Les chiffres c'est bien, les graphiques c'est mieux. On va voir Matplotlib pour tout construire de zéro, et Seaborn pour des statistiques élégantes en deux lignes."

---

### 0:30 — Pourquoi visualiser les données ? (1 min)
**Texte écran :** POURQUOI VISUALISER ?

> "Un tableau de 1000 lignes ne parle pas à tout le monde. Un graphique bien conçu transmet une information en un regard. Visualiser permet de repérer des tendances, des outliers et des corrélations invisibles dans les chiffres bruts."

```python
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
```

---

### 1:30 — Matplotlib : premier graphique (2 min)
**Texte écran :** MATPLOTLIB — PLOT

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)
plt.show()
```

> "`plt.plot` trace des lignes. C'est la fonction la plus basique. `plt.show()` affiche la fenêtre."

**Personnalisation :**

```python
plt.plot(x, y, color="red", marker="o", linestyle="--", linewidth=2)
plt.title("Titre du graphique")
plt.xlabel("Axe X")
plt.ylabel("Axe Y")
plt.legend(["Série 1"])
plt.grid(True)
plt.show()
```

> "On personnalise avec `title`, `xlabel`, `ylabel`, `legend`. Les couleurs, marqueurs et styles de ligne rendent le graphique lisible."

---

### 3:30 — Nuage de points et barres (2 min)
**Texte écran :** SCATTER & BAR

```python
# Nuage de points
x = np.random.randn(100)
y = np.random.randn(100)
plt.scatter(x, y, alpha=0.5, color="purple")
plt.title("Nuage de points")
plt.show()

# Diagramme en barres
categories = ["A", "B", "C", "D"]
valeurs = [23, 45, 12, 67]
plt.bar(categories, valeurs, color=["red", "blue", "green", "orange"])
plt.title("Diagramme en barres")
plt.show()
```

> "`scatter` pour les nuages de points, `bar` pour les barres. Le paramètre `alpha` gère la transparence — utile quand les points se superposent."

---

### 5:30 — Histogrammes (1 min)
**Texte écran :** HISTOGRAMMES

```python
# Distribution d'une variable
donnees = np.random.randn(1000)
plt.hist(donnees, bins=30, color="skyblue", edgecolor="black")
plt.title("Distribution")
plt.xlabel("Valeur")
plt.ylabel("Fréquence")
plt.show()
```

> "Un histogramme montre comment les valeurs se répartissent. `bins` contrôle le nombre de barres. Avec 30 barres on voit bien la forme de la distribution."

---

### 6:30 — Sous-graphiques (subplots) (1 min 30)
**Texte écran :** SUBPLOTS

```python
# Plusieurs graphiques dans une figure
fig, axes = plt.subplots(2, 2, figsize=(10, 8))

axes[0, 0].plot(x, y)
axes[0, 0].set_title("Line")
axes[0, 1].scatter(x, y)
axes[0, 1].set_title("Scatter")
axes[1, 0].bar(categories, valeurs)
axes[1, 0].set_title("Bar")
axes[1, 1].hist(donnees, bins=30)
axes[1, 1].set_title("Histogram")

plt.tight_layout()
plt.show()
```

> "`subplots` crée une grille de graphiques. On accède à chaque sous-graphique par son index. `tight_layout` évite les chevauchements."

---

### 8:00 — Sauvegarder les figures (30s)
**Texte écran :** SAUVEGARDER

```python
plt.plot(x, y)
plt.savefig("mon_graphique.png", dpi=300, bbox_inches="tight")
```

> "`savefig` exporte en PNG, PDF, SVG. `dpi=300` pour la qualité impression, `bbox_inches='tight'` pour couper les marges inutiles."

---

### 8:30 — Seaborn : style amélioré (2 min)
**Texte écran :** SEABORN — UN STYLE PROPRE

```python
import seaborn as sns

# Thème par défaut de Seaborn
sns.set_theme(style="darkgrid")

# Charger un dataset intégré
df = sns.load_dataset("tips")
print(df.head())
```

> "Seaborn améliore Matplotlib. Un simple `sns.set_theme()` rend les graphiques plus modernes. Il embarque aussi des datasets d'exemple comme `tips`."

```python
# Barplot avec intervalle de confiance
sns.barplot(x="day", y="total_bill", data=df)
plt.title("Addition moyenne par jour")
plt.show()
```

> "`sns.barplot` affiche automatiquement la moyenne et l'intervalle de confiance. C'est propre et prêt à l'emploi."

---

### 10:30 — Boxplot et heatmap (2 min)
**Texte écran :** BOXPLOT & HEATMAP

```python
# Boxplot : distribution par catégorie
sns.boxplot(x="day", y="total_bill", data=df)
plt.title("Distribution des additions par jour")
plt.show()

# Heatmap : matrice de corrélation
df_numeric = df.select_dtypes(include=[np.number])
corr = df_numeric.corr()
sns.heatmap(corr, annot=True, cmap="coolwarm")
plt.title("Corrélations")
plt.show()
```

> "Le `boxplot` montre la médiane, les quartiles et les outliers. La `heatmap` avec `annot=True` affiche les valeurs de corrélation directement sur les cases."

---

### 12:30 — Pairplot : explorer les relations (1 min)
**Texte écran :** PAIRPLOT

```python
sns.pairplot(df, hue="sex", diag_kind="kde")
plt.show()
```

> "`pairplot` affiche toutes les relations deux à deux entre les colonnes numériques. `hue` colore par catégorie. En une ligne, vous avez une vue d'ensemble complète de votre dataset."

---

### 13:30 — Conclusion
> "Module 36 : le projet final ! Vous allez mettre en pratique tout ce que vous avez appris. Rendez-vous dans la dernière vidéo."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 35 : Visualisation de données

Au programme :
00:00 — Introduction
00:30 — Pourquoi visualiser les données ?
01:30 — Matplotlib : premier graphique
03:30 — Nuage de points et barres
05:30 — Histogrammes
06:30 — Sous-graphiques (subplots)
08:00 — Sauvegarder les figures
08:30 — Seaborn : style amélioré
10:30 — Boxplot et heatmap
12:30 — Pairplot : explorer les relations
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

#python #formationpython #visualisation #matplotlib #seaborn #dataviz
```

## Tags YouTube
```
python, formation python, visualisation de données python, matplotlib tutoriel, seaborn tutoriel, apprendre python, cours python, python data visualization, matplotlib subplots, seaborn pairplot, heatmap python, boxplot python
```
