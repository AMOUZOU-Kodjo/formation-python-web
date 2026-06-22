# Module 35 : Visualisation avec Matplotlib et Seaborn

## Objectifs pédagogiques

À la fin de ce module, vous serez capable de :
- Créer des graphiques avec matplotlib (lignes, barres, scatter, histogrammes)
- Comprendre et maîtriser la structure Figure + Axes + Subplots
- Personnaliser l'apparence (couleurs, styles, légendes, annotations)
- Utiliser seaborn pour des graphiques statistiques élégants
- Créer des heatmaps de corrélation, boxplots, pairplots
- Intégrer seaborn avec pandas
- Sauvegarder des graphiques en haute qualité (PNG, PDF, SVG)
- Créer des animations et des graphiques 3D

---

## 1. Matplotlib — Les fondamentaux

### Installation

```bash
pip install matplotlib
```

### Philosophie de matplotlib

Matplotlib fonctionne avec deux objets principaux :

1. **Figure** : la fenêtre ou le canevas global qui contient tout
2. **Axes** : le sous-graphique individuel (confusément appelé "subplot")

```
Figure
├── Axes (1 graphique)
├── Axes (2e graphique, si subplots)
└── Titre, légende, etc.
```

### Premier graphique : approche pyplot (rapide)

```python
import matplotlib.pyplot as plt
import numpy as np

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)          # crée la courbe
plt.xlabel("Axe X")     # étiquette X
plt.ylabel("Axe Y")     # étiquette Y
plt.title("Mon premier graphique")
plt.grid(True)          # grille
plt.show()              # affiche (bloque jusqu'à fermeture)
```

**Résultat :** Une fenêtre s'ouvre montrant une ligne droite (y = 2x).

### Approche orientée objet (recommandée pour le contrôle)

```python
# 1. Créer la figure et les axes
fig, ax = plt.subplots(figsize=(8, 5))  # figsize = (largeur, hauteur) en pouces

# 2. Dessiner sur les axes
ax.plot(x, y, label="y = 2x", color="blue", linewidth=2, linestyle="--")
ax.scatter(x, y, color="red", s=100, zorder=5)  # points

# 3. Personnaliser
ax.set_xlabel("Valeurs de X", fontsize=12)
ax.set_ylabel("Valeurs de Y", fontsize=12)
ax.set_title("Graphique orienté objet", fontsize=14, fontweight="bold")
ax.legend()
ax.grid(True, alpha=0.3)

# 4. Sauvegarder et afficher
plt.savefig("graphique.png", dpi=150)  # sauvegarde
plt.show()
```

> **À retenir** : l'approche orientée objet (`fig, ax = plt.subplots()`) est plus flexible. Utilisez-la dès que vous faites plus qu'un simple graphique.

### Types de graphiques fondamentaux

```python
# Données communes
x = np.arange(1, 11)
y = np.random.randn(10).cumsum()  # marche aléatoire
categories = ["A", "B", "C", "D", "E"]
valeurs = np.random.randint(10, 50, 5)

fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# 1. Ligne (axes[0, 0])
axes[0, 0].plot(x, y, "o-", color="steelblue", linewidth=2, markersize=6)
axes[0, 0].set_title("Graphique en lignes")

# 2. Barres (axes[0, 1])
axes[0, 1].bar(categories, valeurs, color="coral", edgecolor="black")
axes[0, 1].set_title("Diagramme en barres")
# Ajouter les valeurs sur les barres
for i, v in enumerate(valeurs):
    axes[0, 1].text(i, v + 1, str(v), ha="center", fontsize=10)

# 3. Nuage de points (axes[1, 0])
np.random.seed(42)
x_scatter = np.random.randn(100)
y_scatter = np.random.randn(100)
couleurs = np.random.randn(100)
axes[1, 0].scatter(x_scatter, y_scatter, c=couleurs, cmap="viridis",
                    s=50, alpha=0.7, edgecolors="black")
axes[1, 0].set_title("Nuage de points")
plt.colorbar(axes[1, 0].collections[0], ax=axes[1, 0])

# 4. Histogramme (axes[1, 1])
data = np.random.randn(1000)
axes[1, 1].hist(data, bins=30, edgecolor="black", color="lightgreen", alpha=0.7)
axes[1, 1].axvline(data.mean(), color="red", linestyle="--", label=f"Moyenne={data.mean():.2f}")
axes[1, 1].legend()
axes[1, 1].set_title("Histogramme")

plt.tight_layout()
plt.show()
```

### Personnalisation avancée

```python
fig, ax = plt.subplots(figsize=(10, 6))

x = np.linspace(0, 2*np.pi, 100)
ax.plot(x, np.sin(x), label="sin(x)", color="#FF6B6B", linewidth=2.5, alpha=0.8)
ax.plot(x, np.cos(x), label="cos(x)", color="#4ECDC4", linewidth=2.5, linestyle="--")

# Personnalisation des axes
ax.set_xlim(0, 2*np.pi)
ax.set_ylim(-1.5, 1.5)
ax.set_xticks(np.arange(0, 2*np.pi + 0.1, np.pi/2))
ax.set_xticklabels(["0", "π/2", "π", "3π/2", "2π"])
ax.set_xlabel("Angle", fontsize=12)
ax.set_ylabel("Valeur", fontsize=12)
ax.set_title("Fonctions trigonométriques", fontsize=16, fontweight="bold")

# Légende personnalisée
ax.legend(loc="upper right", fontsize=11, framealpha=0.9, shadow=True)

# Grille
ax.grid(True, linestyle=":", alpha=0.5)

# Annotation d'un point
ax.annotate("Maximum", xy=(np.pi/2, 1), xytext=(np.pi/2 + 0.5, 1.2),
            arrowprops=dict(arrowstyle="->", color="black"),
            fontsize=11)

# Ligne horizontale et verticale de référence
ax.axhline(y=0, color="gray", linewidth=1)
ax.axvline(x=np.pi, color="gray", linestyle=":", alpha=0.5)

plt.tight_layout()
plt.show()
```

---

## 2. Styles et thèmes

### Styles prédéfinis

```python
# Lister les styles disponibles
print(plt.style.available)
# → ['Solarize_Light2', '_classic_test_patch', '_mpl-gallery',
#    '_mpl-gallery-nogrid', 'bmh', 'classic', 'dark_background',
#    'fast', 'fivethirtyeight', 'ggplot', 'grayscale', 'seaborn-v0_8',
#    'seaborn-v0_8-bright', 'seaborn-v0_8-colorblind', ...]

# Appliquer un style
plt.style.use("ggplot")

# Contexte temporaire
with plt.style.context("dark_background"):
    fig, ax = plt.subplots()
    ax.plot(x, y)
    plt.savefig("style_sombre.png")

# Style seaborn (le plus utilisé en data science)
plt.style.use("seaborn-v0_8")
```

### Couleurs et palettes

```python
# Couleurs nommées
colors = ["tab:blue", "tab:orange", "tab:green", "tab:red", "tab:purple"]

# Colormaps (pour scatter, heatmap, etc.)
# Divergentes : "coolwarm", "RdBu"
# Séquentielles : "viridis", "plasma", "magma"
# Qualitatives : "Set1", "Set2", "Paired"

# Exemple avec colormap
x = np.random.randn(500)
y = np.random.randn(500)
c = np.sqrt(x**2 + y**2)  # distance à l'origine

plt.scatter(x, y, c=c, cmap="plasma", s=30, alpha=0.6)
plt.colorbar(label="Distance")
plt.title("Nuage avec colormap")
plt.show()
```

---

## 3. Sauvegarde haute qualité

```python
fig, ax = plt.subplots()
ax.plot(x, y)

# PNG haute résolution
plt.savefig("output.png", dpi=300, bbox_inches="tight")
# dpi=300 : pour impression, 150 suffit pour écran
# bbox_inches="tight" : coupe les bords blancs

# PDF vectoriel (poids léger, redimensionnable)
plt.savefig("output.pdf", bbox_inches="tight")

# SVG (éditable dans Illustrator/Inkscape)
plt.savefig("output.svg", bbox_inches="tight")

# Transparence
plt.savefig("output.png", transparent=True)

plt.close()  # libère la mémoire ! Important dans des scripts/boucles
```

> **Piège courant** : Ne pas fermer les figures avec `plt.close()` peut causer des fuites mémoire, surtout dans des scripts longs ou des notebooks.

---

## 4. Graphiques 3D

```python
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection="3d")

# Surface 3D
x = np.linspace(-5, 5, 50)
y = np.linspace(-5, 5, 50)
X, Y = np.meshgrid(x, y)
Z = np.sin(np.sqrt(X**2 + Y**2))

# Surface
surf = ax.plot_surface(X, Y, Z, cmap="coolwarm", edgecolor="none", alpha=0.8)
fig.colorbar(surf, ax=ax, shrink=0.5, aspect=5)

# Scatter 3D
n = 100
xs = np.random.randn(n)
ys = np.random.randn(n)
zs = np.random.randn(n)
ax.scatter(xs, ys, zs, c="red", s=50, alpha=0.6)

ax.set_xlabel("X")
ax.set_ylabel("Y")
ax.set_zlabel("Z")
ax.set_title("Graphique 3D")

plt.show()
```

---

## 5. Animation avec matplotlib

```python
from matplotlib.animation import FuncAnimation
import numpy as np

fig, ax = plt.subplots(figsize=(8, 5))
x = np.linspace(0, 2*np.pi, 100)
line, = ax.plot(x, np.sin(x), color="blue", linewidth=2)

def update(frame):
    """Met à jour le graphique à chaque frame."""
    line.set_ydata(np.sin(x + frame * 0.1))
    ax.set_title(f"Onde sinusoïdale - Frame {frame}")
    return line,

ani = FuncAnimation(
    fig, update, frames=100,
    interval=50,  # ms entre chaque frame
    blit=True     # optimise en ne redessinant que les parties modifiées
)

# Sauvegarder l'animation (nécessite ffmpeg)
# ani.save("animation.gif", writer="pillow", fps=20)
# ani.save("animation.mp4", writer="ffmpeg", fps=20)

plt.show()
```

---

## 6. Seaborn — Graphiques statistiques élégants

### Installation

```bash
pip install seaborn
```

Seaborn est conçu pour fonctionner avec des DataFrames pandas. Il produit des graphiques plus beaux avec moins de code.

### Configuration globale

```python
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Configuration du style Seaborn
sns.set_theme(style="whitegrid")  # thème : darkgrid, whitegrid, dark, white, ticks
sns.set_palette("husl")           # palette de couleurs

# Charger un dataset d'exemple
df = sns.load_dataset("penguins")
print(df.head())
# →   species     island  bill_length_mm  bill_depth_mm  flipper_length_mm  body_mass_g     sex
#    0  Adelie  Torgersen            39.1           18.7              181.0       3750.0    Male
```

### Distribution des données

```python
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 1. Histogramme avec KDE (Kernel Density Estimation)
sns.histplot(data=df, x="bill_length_mm", kde=True, bins=30, ax=axes[0, 0])
axes[0, 0].set_title("Histogramme + KDE")

# 2. KDE seule
sns.kdeplot(data=df, x="bill_length_mm", hue="species", fill=True, alpha=0.3, ax=axes[0, 1])
axes[0, 1].set_title("Distribution par espèce")

# 3. Boxplot
sns.boxplot(data=df, x="species", y="bill_length_mm", ax=axes[1, 0])
axes[1, 0].set_title("Boxplot par espèce")

# 4. Violinplot (combinaison boxplot + KDE)
sns.violinplot(data=df, x="species", y="bill_length_mm", inner="quartile", ax=axes[1, 1])
axes[1, 1].set_title("Violin plot")

plt.tight_layout()
plt.show()
```

### Relations entre variables

```python
fig, axes = plt.subplots(1, 3, figsize=(18, 5))

# 1. Scatter plot avec couleur par catégorie
sns.scatterplot(data=df, x="bill_length_mm", y="bill_depth_mm",
                hue="species", style="species", s=100, ax=axes[0])
axes[0].set_title("Relation longueur/profondeur bec")

# 2. Lineplot (tendance)
sns.lineplot(data=df, x="bill_length_mm", y="body_mass_g",
             hue="species", marker="o", ax=axes[1])
axes[1].set_title("Tendance masse/longueur bec")

# 3. Regplot (scatter + régression linéaire)
sns.regplot(data=df, x="bill_length_mm", y="bill_depth_mm",
            scatter_kws={"alpha": 0.5}, line_kws={"color": "red"}, ax=axes[2])
axes[2].set_title("Régression linéaire")

plt.tight_layout()
plt.show()
```

### Graphiques catégoriels

```python
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 1. Barplot (moyenne avec intervalle de confiance)
sns.barplot(data=df, x="species", y="body_mass_g", hue="sex", ax=axes[0, 0])
axes[0, 0].set_title("Masse corporelle moyenne")

# 2. Countplot (effectifs)
sns.countplot(data=df, x="species", hue="sex", ax=axes[0, 1])
axes[0, 1].set_title("Effectifs par espèce et sexe")

# 3. Pointplot (évolution)
sns.pointplot(data=df, x="species", y="bill_length_mm", hue="sex",
              markers=["o", "s"], linestyles=["-", "--"], ax=axes[1, 0])
axes[1, 0].set_title("Longueur bec par espèce/sexe")

# 4. Catplot (grille de graphiques catégoriels)
# Alternative : sns.catplot(data=df, kind="box", x="species", y="bill_length_mm", col="sex")

plt.tight_layout()
plt.show()
```

### Pairplot : matrice de corrélation visuelle

```python
# Pairplot : tous les graphiques 2D possibles
sns.pairplot(
    df, 
    hue="species",
    diag_kind="kde",      # diagonale : distribution
    corner=True,           # seulement la moitié inférieure
    markers=["o", "s", "D"],
    palette="husl"
)
plt.suptitle("Pairplot : relations entre toutes les variables", y=1.02)
plt.show()
```

### Heatmap de corrélation

```python
# Matrice de corrélation
corr = df.select_dtypes(include=[np.number]).corr()
print(corr)
# →                   bill_length_mm  bill_depth_mm  flipper_length_mm  body_mass_g
#    bill_length_mm         1.000000      -0.235053           0.656181     0.595110
#    bill_depth_mm         -0.235053       1.000000          -0.583851    -0.471916
#    flipper_length_mm      0.656181      -0.583851           1.000000     0.871202
#    body_mass_g            0.595110      -0.471916           0.871202     1.000000

# Heatmap
plt.figure(figsize=(8, 6))
sns.heatmap(
    corr,
    annot=True,            # affiche les valeurs
    fmt=".2f",             # format des valeurs
    cmap="RdBu_r",         # colormap divergente
    center=0,              # centre le blanc à 0
    vmin=-1, vmax=1,       # bornes
    square=True,           # cellules carrées
    linewidths=0.5,        # lignes entre cellules
    cbar_kws={"shrink": 0.8}
)
plt.title("Matrice de corrélation")
plt.tight_layout()
plt.show()
```

### Seaborn + pandas : utilisation avancée

```python
# Données longues (tidy data) : une variable par colonne, une observation par ligne
resultats = pd.DataFrame({
    "methode": np.repeat(["A", "B", "C"], 50),
    "temps": np.concatenate([
        np.random.normal(10, 2, 50),
        np.random.normal(12, 1.5, 50),
        np.random.normal(9, 3, 50)
    ]),
    "succes": np.random.binomial(1, 0.8, 150)
})

# Graphique groupé simple
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

sns.boxplot(data=resultats, x="methode", y="temps", ax=axes[0])
sns.violinplot(data=resultats, x="methode", y="temps", ax=axes[1])
sns.barplot(data=resultats, x="methode", y="succes", ax=axes[2])

axes[0].set_title("Distribution des temps par méthode")
axes[1].set_title("Violin plot des temps")
axes[2].set_title("Taux de succès par méthode")

plt.tight_layout()
plt.show()

# catplot : facilite les grilles de graphiques
# Crée automatiquement des facettes selon hue, col, row
g = sns.catplot(
    data=resultats, kind="bar",
    x="methode", y="temps",
    col="succes",  # un graphique par valeur de succes
    palette="Set2",
    height=4, aspect=0.8
)
g.fig.suptitle("Temps par méthode selon succès/échec", y=1.05)
plt.show()
```

---

## 7. Graphiques combinés Matplotlib + Seaborn

```python
# On peut mélanger les deux
fig, ax = plt.subplots(figsize=(10, 6))

# Seaborn pour le style statistique
sns.scatterplot(data=df, x="bill_length_mm", y="bill_depth_mm",
                hue="species", s=80, alpha=0.7, ax=ax)

# Matplotlib pour la personnalisation fine
ax.set_xlabel("Longueur du bec (mm)", fontsize=12, fontweight="bold")
ax.set_ylabel("Profondeur du bec (mm)", fontsize=12, fontweight="bold")
ax.set_title("Relation longueur/profondeur du bec par espèce", fontsize=14)
ax.axhline(y=df["bill_depth_mm"].mean(), color="gray", linestyle="--",
           alpha=0.5, label=f"Moyenne : {df['bill_depth_mm'].mean():.1f}")
ax.legend()

# Ajouter des annotations
for i, row in df.iterrows():
    if row["bill_length_mm"] > 55:  # cas extrêmes
        ax.annotate(row["species"], (row["bill_length_mm"], row["bill_depth_mm"]),
                   fontsize=8, alpha=0.7)

plt.tight_layout()
plt.show()
```

---

## Résumé du module

- **Matplotlib** : figure + axes, contrôle fin de tous les éléments
- **Approche orientée objet** : `fig, ax = plt.subplots()` pour les graphiques complexes
- **Subplots** : organisez plusieurs graphiques dans une figure
- **Styles** : `plt.style.use("ggplot")`, thèmes seaborn
- **Seaborn** : wrapper statistique pour pandas, graphiques élégants en 1 ligne
- **Heatmap** : visualisation de matrices de corrélation
- **Pairplot** : exploration rapide des relations entre variables
- **Sauvegarde** : `plt.savefig("file.png", dpi=300, bbox_inches="tight")`
- **Animation/3D** : `FuncAnimation`, `projection="3d"`

---

## Exercices

### Exercice 1 : Analyse exploratoire d'un dataset
1. Charger le dataset `tips` de seaborn (`sns.load_dataset("tips")`)
2. Créer une figure avec 4 subplots (2x2) :
   - Distribution du montant total (`total_bill`)
   - Boxplot du montant par jour
   - Scatter plot montant vs pourboire (`tip`), coloré par sexe
   - Countplot des effectifs par jour et repas (lunch/dinner)

### Exercice 2 : Dashboard financier
1. Générer un DataFrame simulateur de prix d'action sur 200 jours
2. Créer un dashboard :
   - Courbe du prix avec moyenne mobile 10 et 50 jours
   - Histogramme des rendements journaliers
   - Boxplot des rendements par mois
   - Heatmap de corrélation avec 3 autres actions simulées

### Exercice 3 : Style et personnalisation
1. Créer 4 graphiques identiques avec 4 styles différents (`ggplot`, `dark_background`, `fivethirtyeight`, `seaborn-v0_8-whitegrid`)
2. Sauvegarder en PNG (300 dpi) et PDF
3. Comparer la taille des fichiers

### Exercice 4 : Exploration avancée
1. Sur le dataset `penguins` :
   - Pairplot avec `hue="species"` et `corner=True`
   - Heatmap de corrélation avec annotations
   - Violin plot de `body_mass_g` par `species` et `sex`
   - Scatter avec régression (regplot) de `flipper_length_mm` vs `body_mass_g`
2. Exporter le tout dans un rapport (image unique avec subplots)
