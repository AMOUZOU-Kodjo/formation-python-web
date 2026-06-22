# Module 34 : Data Science avec NumPy et Pandas

## Objectifs pédagogiques

À la fin de ce module, vous serez capable de :
- Créer et manipuler des tableaux NumPy avec des opérations vectorisées
- Comprendre pourquoi les opérations vectorisées sont plus rapides que les boucles
- Créer et manipuler des DataFrames Pandas
- Utiliser l'indexation avancée (.loc, .iloc, .xs)
- Gérer les données manquantes
- Effectuer des agrégations avec groupby, merge et pivot
- Utiliser apply, map, et les fonctions vectorisées
- Importer/exporter des données (CSV, JSON, Excel)

---

## 1. NumPy — Calcul numérique performant

### Installation

```bash
pip install numpy
```

NumPy (Numerical Python) est la bibliothèque fondamentale pour le calcul scientifique en Python. Son cœur est l'objet **ndarray** (N-dimensional array), un tableau multidimensionnel homogène.

### Pourquoi NumPy est-il plus rapide ?

Les listes Python contiennent des **pointeurs** vers des objets Python éparpillés en mémoire. Les tableaux NumPy stockent les données dans un **bloc mémoire contigu**, ce qui permet :
1. Un accès plus rapide (localité mémoire)
2. Des opérations vectorisées (écrites en C)
3. Une utilisation mémoire optimisée

```python
import numpy as np
import time

# Comparaison liste Python vs NumPy
taille = 10_000_000

# Liste Python
liste = list(range(taille))
debut = time.time()
resultat = [x * 2 for x in liste]
print(f"Liste Python : {time.time() - debut:.3f}s")
# → Liste Python : ~0.8s

# Tableau NumPy
arr = np.arange(taille)
debut = time.time()
resultat = arr * 2
print(f"NumPy : {time.time() - debut:.3f}s")
# → NumPy : ~0.03s (20 à 50 fois plus rapide !)
```

> **À retenir** : La différence de performance vient du fait que NumPy exécute des boucles en C compilé, pas en Python interprété.

### Création de tableaux NumPy

```python
import numpy as np

# À partir d'une liste
arr = np.array([1, 2, 3, 4, 5])
print(arr)         # → [1 2 3 4 5]
print(type(arr))   # → <class 'numpy.ndarray'>

# Dimensions et forme
print(arr.ndim)    # → 1 (1 dimension)
print(arr.shape)   # → (5,) (5 éléments)
print(arr.dtype)   # → int64 (type des données)

# Zéros
zeros = np.zeros((3, 4))
print(zeros)
# → [[0. 0. 0. 0.]
#     [0. 0. 0. 0.]
#     [0. 0. 0. 0.]]

# Uns
ones = np.ones((2, 3), dtype=int)
print(ones)        # → [[1 1 1] [1 1 1]]

# Matrice identité
identite = np.eye(4)
print(identite)
# → [[1. 0. 0. 0.]
#     [0. 1. 0. 0.]
#     [0. 0. 1. 0.]
#     [0. 0. 0. 1.]]

# Séquences
sequence = np.arange(0, 10, 2)     # → [0 2 4 6 8]
lineaire = np.linspace(0, 1, 5)    # → [0.   0.25 0.5  0.75 1.  ]

# Aléatoire
aleatoire = np.random.randn(3, 3)  # distribution normale (moy=0, écart=1)
uniformes = np.random.rand(5)      # uniforme entre 0 et 1
entiers = np.random.randint(0, 100, size=(2, 5))  # entiers aléatoires
```

### Opérations vectorisées (sans boucle !)

```python
arr = np.array([1, 2, 3, 4, 5])

# Opérations arithmétiques
print(arr + 10)    # → [11 12 13 14 15]
print(arr * 2)     # → [2 4 6 8 10]
print(arr ** 2)    # → [1 4 9 16 25]
print(arr / 2)     # → [0.5 1.  1.5 2.  2.5]

# Opérations entre tableaux
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(a + b)       # → [5 7 9]
print(a * b)       # → [4 10 18] (élément par élément, PAS un produit matriciel)
print(np.dot(a, b))  # → 32 (produit scalaire : 1*4 + 2*5 + 3*6)

# Opérations statistiques
data = np.array([[1, 2, 3], [4, 5, 6]])
print(data.mean())     # → 3.5 (moyenne de tous les éléments)
print(data.sum())      # → 21
print(data.std())      # → 1.7078 (écart-type)
print(data.min())      # → 1
print(data.max())      # → 6

# Axe (axis) : 0 = colonnes, 1 = lignes
print(data.sum(axis=0))  # → [5 7 9] (somme par colonne)
print(data.sum(axis=1))  # → [6 15] (somme par ligne)

# Opérations mathématiques (fonctions universelles)
angles = np.array([0, np.pi/2, np.pi])
print(np.sin(angles))    # → [0. 1. 0.]
print(np.cos(angles))    # → [1. 0. -1.]
print(np.exp([0, 1, 2])) # → [1.    2.718  7.389]
print(np.log([1, 10, 100]))  # → [0.    2.302  4.605]
```

### Indexation et découpage (slicing)

```python
arr = np.array([10, 20, 30, 40, 50, 60])

# Indexation classique
print(arr[0])     # → 10
print(arr[-1])    # → 60

# Slicing (comme les listes)
print(arr[1:4])   # → [20 30 40]
print(arr[:3])    # → [10 20 30]
print(arr[::2])   # → [10 30 50]

# Indexation booléenne (très puissante)
mask = arr > 30
print(mask)          # → [False False False  True  True  True]
print(arr[mask])     # → [40 50 60]
print(arr[arr > 30]) # → [40 50 60]  (écriture simplifiée)

# Indexation par tableau d'indices (fancy indexing)
indices = np.array([0, 2, 4])
print(arr[indices])  # → [10 30 50]
```

### Tableaux 2D (matrices)

```python
matrice = np.array([[1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]])

print(matrice.shape)  # → (3, 3)

# Accès
print(matrice[0, 1])     # → 2 (ligne 0, colonne 1)
print(matrice[1])        # → [4 5 6] (ligne 1)

# Slicing 2D
print(matrice[:2, 1:3])
# → [[2 3]
#     [5 6]]

# Reshape (changement de forme)
arr = np.arange(12)
print(arr.reshape(3, 4))
# → [[ 0  1  2  3]
#     [ 4  5  6  7]
#     [ 8  9 10 11]]

# Aplatir
matrice = np.array([[1, 2], [3, 4]])
print(matrice.flatten())  # → [1 2 3 4]
print(matrice.ravel())    # → [1 2 3 4] (proche, mais vue si possible)
```

### Broadcasting

Le broadcasting permet d'effectuer des opérations entre tableaux de formes différentes :

```python
# Une constante avec un tableau (déjà vu)
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr + 100)
# → [[101 102 103]
#     [104 105 106]]

# Un vecteur ligne avec une matrice
print(arr + np.array([10, 20, 30]))
# → [[11 22 33]
#     [14 25 36]]

# Un vecteur colonne avec une matrice
print(arr + np.array([[10], [100]]))
# → [[11 12 13]
#     [104 105 106]]
```

> **Piège courant** : les formes doivent être compatibles. `(3,) + (4,)` ne marche pas.
> ```python
> np.array([1, 2, 3]) + np.array([1, 2, 3, 4])  # Erreur !
> ```

---

## 2. Pandas — Manipulation de données tabulaires

### Installation

```bash
pip install pandas
```

Pandas est construit au-dessus de NumPy. Il introduit deux structures principales :
- **Series** : tableau 1D étiqueté (comme une colonne)
- **DataFrame** : tableau 2D étiqueté (comme un tableur)

### Series

```python
import pandas as pd
import numpy as np

# Création d'une Series
s = pd.Series([10, 20, 30, 40, 50])
print(s)
# → 0    10
#    1    20
#    2    30
#    3    40
#    4    50
#    dtype: int64

# Avec index personnalisé
s = pd.Series([10, 20, 30], index=["a", "b", "c"])
print(s)
# → a    10
#    b    20
#    c    30

# Accès
print(s["b"])       # → 20
print(s.iloc[1])    # → 20 (par position)
print(s.loc["b"])   # → 20 (par label)

# Opérations vectorisées
print(s * 2)
# → a    20
#    b    40
#    c    60
```

### DataFrame

Le DataFrame est la structure centrale de Pandas. C'est un tableau 2D avec des colonnes nommées.

```python
# Création à partir d'un dictionnaire
data = {
    "nom": ["Alice", "Bob", "Charlie", "Diana"],
    "age": [25, 30, 35, 28],
    "ville": ["Paris", "Lyon", "Marseille", "Paris"],
    "salaire": [45000, 55000, 62000, 48000]
}
df = pd.DataFrame(data)
print(df)
# →        nom  age      ville  salaire
#    0    Alice   25      Paris    45000
#    1      Bob   30       Lyon    55000
#    2  Charlie   35  Marseille    62000
#    3    Diana   28      Paris    48000
```

### Exploration d'un DataFrame

```python
# Aperçu
print(df.head(2))      # premières 2 lignes
print(df.tail())       # dernières 5 lignes
print(df.sample(2))    # 2 lignes aléatoires

# Informations
print(df.shape)        # → (4, 4) — (lignes, colonnes)
print(df.columns)      # → Index(['nom', 'age', 'ville', 'salaire'], dtype='object')
print(df.dtypes)       # types de chaque colonne
print(df.info())       # résumé complet (types, non-null, mémoire)
print(df.describe())   # statistiques descriptives (que les colonnes numériques)
```

**Résultat de `describe()` :**
```
             age       salaire
count   4.00000      4.000000
mean   29.50000  52500.000000
std     4.20317   7659.380670
min    25.00000  45000.000000
25%    27.25000  47250.000000
50%    29.00000  51750.000000
75%    31.25000  56750.000000
max    35.00000  62000.000000
```

### Sélection de colonnes

```python
# Une colonne → Series
print(df["nom"])
# → 0      Alice
#    1        Bob
#    2    Charlie
#    3      Diana

# Plusieurs colonnes → DataFrame
print(df[["nom", "age"]])

# Nouvelle colonne
df["bonus"] = df["salaire"] * 0.1
print(df["bonus"])
```

### Indexation avancée : .loc et .iloc

C'est ici que beaucoup se trompent. Comprenez bien la différence :

```python
# .loc : indexation par LABEL (nom de ligne/colonne)
# .iloc : indexation par POSITION (entier)

# Notre DataFrame avec un index custom
df2 = df.set_index("nom")  # "nom" devient l'index
print(df2)
# →          age      ville  salaire   bonus
#    nom
#    Alice    25      Paris    45000  4500.0
#    Bob      30       Lyon    55000  5500.0
#    Charlie  35  Marseille    62000  6200.0
#    Diana    28      Paris    48000  4800.0

# .loc : sélection par label
print(df2.loc["Alice"])           # ligne label "Alice"
print(df2.loc["Alice", "age"])    # → 25
print(df2.loc["Alice":"Charlie"]) # lignes de Alice à Charlie INCLUS

# .iloc : sélection par position (entier)
print(df2.iloc[0])                # première ligne
print(df2.iloc[0, 1])             # → 30 (première ligne, deuxième colonne)
print(df2.iloc[0:2])              # deux premières lignes

# Sélection de lignes ET colonnes avec .loc
print(df.loc[0:2, ["nom", "ville"]])
# →        nom      ville
#    0    Alice      Paris
#    1      Bob       Lyon
#    2  Charlie  Marseille
```

### Indexation avancée : .xs (cross-section)

```python
# MultiIndex (index hiérarchique)
dates = pd.date_range("2025-01-01", periods=3)
produits = ["A", "B"]
index = pd.MultiIndex.from_product([dates, produits], names=["date", "produit"])
df_multi = pd.DataFrame({"ventes": np.random.randint(10, 100, 6)}, index=index)
print(df_multi)
# →                    ventes
#    date       produit
#    2025-01-01 A           42
#               B           67
#    2025-01-02 A           15
#               B           88

# xs = extraire à un niveau spécifique
print(df_multi.xs("A", level="produit"))
# →             ventes
#    date
#    2025-01-01     42
#    2025-01-02     15
#    2025-01-03     73
```

### Filtrage des lignes

```python
# Filtre simple
print(df[df["age"] > 28])
# →        nom  age      ville  salaire   bonus
#    1      Bob   30       Lyon    55000  5500.0
#    2  Charlie   35  Marseille    62000  6200.0

# Filtres combinés (ET = &, OU = |)
print(df[(df["age"] > 25) & (df["ville"] == "Paris")])
# →     nom  age   ville  salaire   bonus
#    3  Diana   28   Paris    48000  4800.0

# Utilisation de .query() (plus lisible)
print(df.query("age > 28 and ville == 'Paris'"))

# Filtre avec .isin()
print(df[df["ville"].isin(["Paris", "Lyon"])])

# Filtre avec .str.contains()
print(df[df["nom"].str.contains("l", case=False)])
```

### Gestion des données manquantes

```python
import numpy as np

df_na = pd.DataFrame({
    "A": [1, 2, np.nan, 4],
    "B": [np.nan, 2, 3, 4],
    "C": [1, 2, 3, 4]
})
print(df_na)
# →      A    B  C
#    0  1.0  NaN  1
#    1  2.0  2.0  2
#    2  NaN  3.0  3
#    3  4.0  4.0  4

# Détecter les valeurs manquantes
print(df_na.isna())          # masque booléen
print(df_na.isna().sum())    # count par colonne

# Supprimer les lignes avec NaN
print(df_na.dropna())                  # supprime toute ligne avec un NaN
print(df_na.dropna(thresh=2))          # supprime si moins de 2 non-NaN

# Remplacer les NaN
print(df_na.fillna(0))                 # remplace par 0
print(df_na.fillna(df_na.mean()))      # remplace par la moyenne de chaque colonne
print(df_na.fillna(method="ffill"))    # forward fill : recopie la valeur précédente
print(df_na.fillna(method="bfill"))    # backward fill : recopie la valeur suivante

# Interpolation
df_na["A"].interpolate()  # interpole linéairement
```

> **Piège courant** : `np.nan` est de type `float`. Une colonne avec des NaN sera de type `float64`, même si les autres valeurs sont des entiers.

### Opérations vectorisées vs boucle : la différence de performance

```python
import time

# Création d'un gros DataFrame
df = pd.DataFrame({"x": np.random.randn(100_000), "y": np.random.randn(100_000)})

# MÉTHODE LENTE : boucle Python
debut = time.time()
resultats = []
for i in range(len(df)):
    resultats.append(df.loc[i, "x"] * df.loc[i, "y"])
print(f"Boucle : {time.time() - debut:.3f}s")
# → Boucle : ~3.5s

# MÉTHODE RAPIDE : vectorisée
debut = time.time()
resultats = df["x"] * df["y"]
print(f"Vectorisé : {time.time() - debut:.3f}s")
# → Vectorisé : ~0.002s (1000x plus rapide)

# MÉTHODE .apply() (entre les deux)
debut = time.time()
resultats = df.apply(lambda row: row["x"] * row["y"], axis=1)
print(f"Apply : {time.time() - debut:.3f}s")
# → Apply : ~0.3s
```

> **À retenir** : Toujours privilégier les opérations vectorisées. N'écrivez JAMAIS une boucle `for` sur les lignes d'un DataFrame si une opération vectorisée existe.

### map et apply

```python
# map : transformation élément par élément sur une Series
df["ville_code"] = df["ville"].map({"Paris": "75", "Lyon": "69", "Marseille": "13"})

# apply sur une Series
df["age_categorie"] = df["age"].apply(lambda x: "jeune" if x < 30 else "adulte")

# apply sur un DataFrame (par ligne ou par colonne)
def calculer_score(row):
    return row["salaire"] / row["age"] * 1000

df["score"] = df.apply(calculer_score, axis=1)
print(df[["nom", "score"]])
# →        nom       score
#    0    Alice  1800.000000
#    1      Bob  1833.333333
#    2  Charlie  1771.428571
#    3    Diana  1714.285714
```

---

## 3. Agrégation avec groupby

`groupby` permet de regrouper les données selon une ou plusieurs colonnes, puis d'appliquer des fonctions d'agrégation.

```python
# Données
df = pd.DataFrame({
    "categorie": ["A", "B", "A", "B", "A", "C"],
    "valeur": [10, 20, 30, 40, 50, 60],
    "quantite": [1, 2, 3, 4, 5, 6]
})

# groupby simple
print(df.groupby("categorie")["valeur"].mean())
# → categorie
#    A    30.0
#    B    30.0
#    C    60.0
#    Name: valeur, dtype: float64

# Plusieurs agrégations
print(df.groupby("categorie").agg({
    "valeur": ["sum", "mean", "std"],
    "quantite": "sum"
}))

# groupby + transformation
df["valeur_normalisee"] = df.groupby("categorie")["valeur"].transform(
    lambda x: (x - x.mean()) / x.std()
)

# groupby avec filtre
print(df.groupby("categorie").filter(lambda g: g["valeur"].sum() > 50))
```

---

## 4. Fusion de DataFrames : merge, join, concat

### merge (comme SQL JOIN)

```python
employes = pd.DataFrame({
    "emp_id": [1, 2, 3, 4],
    "nom": ["Alice", "Bob", "Charlie", "Diana"],
    "dept_id": [10, 20, 10, 30]
})

departements = pd.DataFrame({
    "dept_id": [10, 20, 30],
    "nom_dept": ["IT", "RH", "Finance"]
})

# INNER JOIN (par défaut)
resultat = pd.merge(employes, departements, on="dept_id")
print(resultat)
# →    emp_id     nom  dept_id nom_dept
#    0       1   Alice      10       IT
#    1       3 Charlie      10       IT
#    2       2     Bob      20       RH
#    3       4   Diana      30  Finance

# LEFT JOIN
resultat = pd.merge(employes, departements, on="dept_id", how="left")

# RIGHT JOIN
resultat = pd.merge(employes, departements, on="dept_id", how="right")

# OUTER JOIN
resultat = pd.merge(employes, departements, on="dept_id", how="outer")

# Merge sur des clés différentes
ventes = pd.DataFrame({
    "vendeur_id": [1, 2, 3],
    "montant": [100, 200, 150]
})
resultat = pd.merge(employes, ventes, left_on="emp_id", right_on="vendeur_id")
```

### concat

```python
df1 = pd.DataFrame({"A": [1, 2], "B": [3, 4]})
df2 = pd.DataFrame({"A": [5, 6], "B": [7, 8]})

# Concaténer verticalement (ajouter des lignes)
resultat = pd.concat([df1, df2], ignore_index=True)
print(resultat)
# →    A  B
#    0  1  3
#    1  2  4
#    2  5  7
#    3  6  8

# Concaténer horizontalement (ajouter des colonnes)
df3 = pd.DataFrame({"C": [9, 10]})
resultat = pd.concat([df1, df3], axis=1)
```

---

## 5. Pivot tables (tableaux croisés dynamiques)

```python
# Données longues
ventes = pd.DataFrame({
    "mois": ["Jan", "Jan", "Fev", "Fev", "Jan", "Fev"],
    "produit": ["A", "B", "A", "B", "A", "B"],
    "ventes": [100, 200, 150, 250, 120, 180],
    "region": ["Nord", "Nord", "Nord", "Nord", "Sud", "Sud"]
})

# Pivot table simple
pivot = ventes.pivot_table(
    values="ventes",
    index="mois",
    columns="produit",
    aggfunc="sum"
)
print(pivot)
# → produit    A    B
#    mois
#    Fev      150  430
#    Jan      220  200

# Avec plusieurs index et colonnes
pivot2 = ventes.pivot_table(
    values="ventes",
    index=["mois", "region"],
    columns="produit",
    aggfunc="sum",
    fill_value=0
)

# Pivot avec plusieurs valeurs
pivot3 = ventes.pivot_table(
    values=["ventes"],
    index="mois",
    columns=["produit", "region"],
    aggfunc="sum"
)
```

---

## 6. Import et export de données

```python
# CSV
df.to_csv("donnees.csv", index=False, encoding="utf-8")
df = pd.read_csv("donnees.csv")

# CSV avec options
df = pd.read_csv("donnees.csv", sep=";", encoding="latin1", nrows=100)
df.to_csv("export.csv", sep="\t", float_format="%.2f")

# JSON
df.to_json("donnees.json", orient="records", force_ascii=False)
df = pd.read_json("donnees.json")

# Excel (nécessite openpyxl ou xlrd)
# pip install openpyxl
df.to_excel("donnees.xlsx", sheet_name="Feuille1", index=False)
df = pd.read_excel("donnees.xlsx", sheet_name="Feuille1")

# SQL
from sqlalchemy import create_engine
engine = create_engine("sqlite:///base.db")
df.to_sql("ma_table", engine, if_exists="replace", index=False)
df = pd.read_sql("SELECT * FROM ma_table", engine)

# Parquet (format binaire compressé)
# pip install pyarrow
df.to_parquet("donnees.parquet")
df = pd.read_parquet("donnees.parquet")
```

---

## Résumé du module

- **NumPy** : tableaux multidimensionnels, opérations vectorisées, broadcasting
- **Vectorisation** : toujours privilégier les opérations vectorisées aux boucles (x1000 plus rapide)
- **Pandas Series** : tableau 1D avec index, colonne unique
- **Pandas DataFrame** : tableau 2D avec colonnes, comme un tableur
- **Indexation** : `.loc` (labels), `.iloc` (positions), `.xs` (cross-section)
- **Données manquantes** : `isna()`, `dropna()`, `fillna()`, `interpolate()`
- **Agrégation** : `groupby()`, `pivot_table()`, `merge()`
- **map/apply** : transformations élément par élément ou par ligne/colonne

---

## Exercices

### Exercice 1 : Analyse de ventes
1. Créer un DataFrame avec 100 lignes de ventes aléatoires (produit, quantité, prix, date, région)
2. Calculer le chiffre d'affaires total par produit
3. Quel produit a la meilleure marge ?
4. Grouper par mois et région, afficher un pivot table
5. Ajouter 10% de données manquantes et les traiter

### Exercice 2 : Performance
1. Créer un array NumPy de 1 million d'éléments
2. Calculer `sin(x) + 2*cos(x) + x**2` avec une boucle Python → chronométrer
3. Faire la même opération avec NumPy vectorisé → chronométrer
4. Calculer le ratio de performance

### Exercice 3 : Fusion et nettoyage
1. Créer deux DataFrames : clients (id, nom, email) et commandes (id, client_id, montant, date)
2. Certains clients n'ont pas de commandes, certaines commandes n'ont pas de client
3. Faire un merge pour avoir tous les clients avec leurs commandes
4. Gérer les NaN (clients sans commande → montant à 0)
5. Calculer le montant moyen par client

### Exercice 4 : Analyse de dataset réel
1. Télécharger un dataset CSV (ex: titanic.csv depuis un miroir)
2. Charger avec pandas
3. Statistiques descriptives : `describe()`, `info()`, `value_counts()`
4. Taux de survie par classe, genre, âge
5. Créer une colonne "groupe_age" (enfant, adulte, senior) avec apply
6. Pivot table : taux de survie par classe et genre
