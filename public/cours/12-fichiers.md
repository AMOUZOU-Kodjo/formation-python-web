# Module 12 : Fichiers

**Objectifs pédagogiques :**
- Ouvrir et fermer des fichiers correctement
- Utiliser le context manager `with` pour la sécurité
- Maîtriser les différents modes d'ouverture
- Lire et écrire des fichiers texte et binaires
- Travailler avec JSON, CSV et Path
- Gérer les gros fichiers efficacement

---

## 1. Ouvrir et fermer un fichier

### 1.1 La fonction `open()`

La fonction `open()` ouvre un fichier et retourne un objet fichier.

**Analogie :** Ouvrir un fichier, c'est comme prendre un livre dans une bibliothèque. Vous devez l'ouvrir pour le lire, puis le refermer quand vous avez fini pour que d'autres puissent l'utiliser.

```python
# Méthode manuelle (à éviter)
fichier = open("exemple.txt", "r", encoding="utf-8")
contenu = fichier.read()
print(contenu)
fichier.close()  # ← TRÈS IMPORTANT : fermer le fichier !
```

```python
# Méthode recommandée : context manager with
with open("exemple.txt", "r", encoding="utf-8") as fichier:
    contenu = fichier.read()
    print(contenu)
# Le fichier est automatiquement fermé ici, même en cas d'erreur
```

> **Pourquoi `with` ?** Si une exception survient entre `open()` et `close()`, le fichier pourrait rester ouvert, ce qui peut bloquer d'autres programmes. `with` garantit la fermeture quoi qu'il arrive.

### 1.2 L'encodage

**L'encodage** détermine comment les caractères sont représentés en mémoire.

- **UTF-8** : standard moderne, supporte toutes les langues (accentuées, asiatiques, emojis…)
- **Latin-1 (ISO-8859-1)** : ancien, caractères européens seulement
- **CP1252** : ancien standard Windows

```python
# Toujours spécifier l'encodage !
with open("exemple.txt", "r", encoding="utf-8") as f:
    contenu = f.read()
# Sans encoding, Python utilise celui du système (risque d'erreur)
```

> **P**iège courant :** `UnicodeDecodeError` survient quand on ouvre un fichier avec le mauvais encodage. Si vous ouvrez un fichier créé sous Windows avec `cp1252` sans spécifier `encoding="utf-8"`, vous obtiendrez une erreur pour les caractères spéciaux (é, à, œ…).

---

## 2. Modes d'ouverture

### 2.1 Tableau des modes

| Mode | Description | Position | Si le fichier existe | Si le fichier n'existe pas |
|---|---|---|---|---|
| `"r"` | Lecture (défaut) | Début | OK | Erreur |
| `"w"` | Écriture | Début | Écrase | Crée |
| `"a"` | Ajout | Fin | Ajoute à la fin | Crée |
| `"x"` | Création exclusive | Début | Erreur | Crée |
| `"r+"` | Lecture + écriture | Début | OK | Erreur |
| `"w+"` | Écriture + lecture | Début | Écrase | Crée |
| `"a+"` | Ajout + lecture | Fin | Ajoute | Crée |

Combinaison avec `"b"` (binaire) : `"rb"`, `"wb"`, `"ab"`.

### 2.2 Exemples par mode

```python
# 'w' — écriture (attentin : écrase !)
with open("sortie.txt", "w", encoding="utf-8") as f:
    f.write("Première ligne\n")
    f.write("Deuxième ligne\n")

# 'a' — ajout à la fin
with open("sortie.txt", "a", encoding="utf-8") as f:
    f.write("Troisième ligne ajoutée\n")
# Contenu maintenant : Première ligne\nDeuxième ligne\nTroisième ligne ajoutée\n

# 'x' — création exclusive (sécurité anti-écrasement)
try:
    with open("important.txt", "x", encoding="utf-8") as f:
        f.write("Données critiques")
except FileExistsError:
    print("Le fichier existe déjà, pas d'écrasement !")
```

---

## 3. Lire un fichier

### 3.1 Différentes méthodes de lecture

```python
# Créons d'abord un fichier de test
with open("poeme.txt", "w", encoding="utf-8") as f:
    f.write("Roses are red,\nViolets are blue,\nPython is awesome,\nAnd so are you.\n")
```

```python
# Lire tout le fichier d'un coup (fichiers petits)
with open("poeme.txt", "r", encoding="utf-8") as f:
    contenu = f.read()
    print(contenu)
# → Roses are red,
# → Violets are blue,
# → Python is awesome,
# → And so are you.

# Lire une seule ligne
with open("poeme.txt", "r", encoding="utf-8") as f:
    ligne = f.readline()
    print(ligne.strip())
# → Roses are red,

# Lire toutes les lignes dans une liste
with open("poeme.txt", "r", encoding="utf-8") as f:
    toutes = f.readlines()
    print(toutes)
# → ['Roses are red,\n', 'Violets are blue,\n', 'Python is awesome,\n', 'And so are you.\n']
```

### 3.2 Méthode recommandée : itérer sur le fichier

Pour les fichiers de taille inconnue, **ne jamais** utiliser `.read()` ou `.readlines()`. Préférez l'itération.

```python
# Recommandé : itération ligne par ligne (économique en mémoire)
with open("poeme.txt", "r", encoding="utf-8") as f:
    for numero, ligne in enumerate(f, start=1):
        print(f"{numero}. {ligne.strip()}")
# → 1. Roses are red,
# → 2. Violets are blue,
# → 3. Python is awesome,
# → 4. And so are you.
```

```python
# Lecture par blocs (pour fichiers binaires ou très gros)
with open("gros_fichier.bin", "rb") as f:
    while True:
        bloc = f.read(4096)  # 4 Ko par bloc
        if not bloc:
            break
        traiter(bloc)  # votre fonction de traitement
```

### 3.3 Gestion des gros fichiers

```python
# MAUVAIS : charge tout en mémoire
with open("tres_gros_fichier.log", "r", encoding="utf-8") as f:
    toutes = f.readlines()  # peut prendre des Go de RAM !
    for ligne in toutes:
        traiter(ligne)

# BON : lit ligne par ligne
with open("tres_gros_fichier.log", "r", encoding="utf-8") as f:
    for ligne in f:
        traiter(ligne)  # une ligne à la fois en mémoire
```

---

## 4. Écrire dans un fichier

### 4.1 `write()` et `writelines()`

```python
# write() — écrire une chaîne
with open("journal.txt", "w", encoding="utf-8") as f:
    f.write("Ligne 1\n")
    f.write("Ligne 2\n")

# writelines() — écrire une liste de lignes (sans ajouter de \n)
lignes = ["Alice\n", "Bob\n", "Charlie\n"]
with open("eleves.txt", "w", encoding="utf-8") as f:
    f.writelines(lignes)

# Ajout à la fin
with open("eleves.txt", "a", encoding="utf-8") as f:
    f.write("David\n")
    f.write("Eve\n")
```

### 4.2 Formatage avancé

```python
# Écrire des données structurées
donnees = [
    ("Alice", 25, "Paris"),
    ("Bob", 30, "Lyon"),
    ("Charlie", 22, "Marseille"),
]

with open("personnes.csv", "w", encoding="utf-8") as f:
    f.write("Nom,Age,Ville\n")  # en-tête
    for nom, age, ville in donnees:
        f.write(f"{nom},{age},{ville}\n")
```

---

## 5. Fichiers JSON

JSON (JavaScript Object Notation) est le format d'échange de données le plus courant.

```python
import json

# === Écrire du JSON ===
personne = {
    "nom": "Alice",
    "age": 30,
    "ville": "Paris",
    "langages": ["Python", "JavaScript"],
    "est_employe": True,
    "adresse": None,
}

with open("personne.json", "w", encoding="utf-8") as f:
    json.dump(personne, f, indent=4, ensure_ascii=False)
# → Fichier créé avec mise en forme lisible

# === Lire du JSON ===
with open("personne.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(data["nom"])           # → Alice
print(data["langages"][0])   # → Python
```

```python
# json.dumps / json.loads (travailler avec des chaînes, pas des fichiers)
chaine_json = '{"nom": "Bob", "age": 25}'
data = json.loads(chaine_json)
print(data["nom"])            # → Bob

retour = json.dumps(data, indent=2)
print(retour)
# → {
# →   "nom": "Bob",
# →   "age": 25
# → }
```

> **Piège :** Les tuples Python deviennent des listes en JSON. Les clés doivent être des chaînes.

---

## 6. Fichiers CSV

CSV (Comma-Separated Values) est un format tabulaire simple.

```python
import csv

# === Écrire un CSV ===
en_tete = ["Nom", "Age", "Ville"]
donnees = [
    ["Alice", 25, "Paris"],
    ["Bob", 30, "Lyon"],
    ["Charlie", 22, "Marseille"],
]

with open("personnes.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(en_tete)
    writer.writerows(donnees)

# === Lire un CSV ===
with open("personnes.csv", "r", newline="", encoding="utf-8") as f:
    reader = csv.reader(f)
    for ligne in reader:
        print(ligne)
# → ['Nom', 'Age', 'Ville']
# → ['Alice', '25', 'Paris']
# → ['Bob', '30', 'Lyon']
# → ['Charlie', '22', 'Marseille']
```

```python
# CSV avec DictReader / DictWriter (plus lisible)
with open("personnes.csv", "r", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for ligne in reader:
        print(f"{ligne['Nom']} ({ligne['Age']} ans) - {ligne['Ville']}")
# → Alice (25 ans) - Paris
# → Bob (30 ans) - Lyon
# → Charlie (22 ans) - Marseille
```

> **Attention :** En CSV, tout est chaîne de caractères. Pensez à convertir les nombres : `int(ligne['Age'])`.

---

## 7. `pathlib` — la gestion moderne des chemins

`pathlib` (Python 3.4+) est l'API moderne et orientée objet pour manipuler les chemins.

```python
from pathlib import Path

# Créer un chemin
dossier = Path("donnees")
chemin_fichier = dossier / "journal.txt"  # utilise / pour concaténer
print(chemin_fichier)
# → donnees\journal.txt  (ou donnees/journal.txt sur Linux)

# Vérifications
print(chemin_fichier.exists())      # False
print(chemin_fichier.is_file())     # False
print(chemin_fichier.parent)        # donnees
print(chemin_fichier.name)          # journal.txt
print(chemin_fichier.stem)          # journal
print(chemin_fichier.suffix)        # .txt
```

```python
# Créer un dossier (avec exist_ok pour éviter l'erreur)
dossier = Path("data/2024/export")
dossier.mkdir(parents=True, exist_ok=True)

# Écrire et lire avec pathlib (méthodes intégrées)
chemin = dossier / "notes.txt"
chemin.write_text("Une note\nDeuxième note\n", encoding="utf-8")
contenu = chemin.read_text(encoding="utf-8")
print(contenu)

# Lister les fichiers d'un dossier
for fichier in Path(".").glob("*.txt"):
    print(fichier)
```

```python
# Autres méthodes utiles
chemin = Path("exemple.txt")

# Chemin absolu
print(chemin.absolute())

# Renommer
chemin.rename("nouveau_nom.txt")

# Supprimer
chemin.unlink()  # pour un fichier
dossier.rmdir()  # pour un dossier (s'il est vide)

# Avec shutil pour les suppressions récursives
import shutil
shutil.rmtree("mon_dossier")  # supprime même non vide
```

---

## 8. Fichiers binaires et `tempfile`

### 8.1 Mode binaire

Les fichiers binaires (images, vidéos, exécutables, archives) ne sont pas du texte.

```python
# Copie d'image en mode binaire
with open("photo.jpg", "rb") as source:
    with open("copie_photo.jpg", "wb") as destination:
        while True:
            bloc = source.read(8192)  # 8 Ko
            if not bloc:
                break
            destination.write(bloc)

# Autre façon (plus simple)
with open("photo.jpg", "rb") as source:
    contenu = source.read()
with open("copie_photo.jpg", "wb") as dest:
    dest.write(contenu)
```

### 8.2 Fichiers temporaires

```python
from tempfile import NamedTemporaryFile, TemporaryDirectory

# Fichier temporaire (supprimé automatiquement)
with NamedTemporaryFile(mode="w", delete=True) as f:
    f.write("Données temporaires\n")
    f.flush()
    # On peut utiliser f.name pour le chemin
    print(f"Fichier temporaire : {f.name}")
# Ici, le fichier est supprimé

# Dossier temporaire
with TemporaryDirectory() as tmp_dir:
    fichier = Path(tmp_dir) / "test.txt"
    fichier.write_text("Contenu temporaire")
    print(f"Contenu : {fichier.read_text()}")
# Ici, tout le dossier est supprimé
```

---

## 9. Résumé

| Concept | Code clé |
|---|---|
| Ouvrir un fichier | `with open(chemin, mode, encoding) as f:` |
| Lire tout | `contenu = f.read()` |
| Lire ligne à ligne | `for ligne in f:` |
| Écrire | `f.write(texte)` |
| JSON écriture | `json.dump(data, f)` |
| JSON lecture | `data = json.load(f)` |
| CSV écriture | `csv.writer(f).writerows(data)` |
| CSV lecture | `csv.reader(f)` |
| Chemin moderne | `Path("dossier") / "fichier.txt"` |
| Tempfile | `with NamedTemporaryFile() as f:` |

- **Toujours utiliser `with`** pour garantir la fermeture
- **Toujours spécifier `encoding="utf-8"`** pour les fichiers texte
- **Jamais `.read()` ou `.readlines()`** sur des fichiers potentiellement volumineux
- **Préférer `pathlib`** à `os.path` pour la manipulation des chemins
- **Mode binaire `"rb"` / `"wb"`** pour tout ce qui n'est pas du texte

---

## 10. Exercices

**Exercice 1 :** Écrire un programme qui demande une phrase à l'utilisateur et la sauvegarde dans un fichier `phrases.txt` en mode ajout.

**Exercice 2 :** Lire le fichier `phrases.txt` et afficher chaque ligne numérotée.

**Exercice 3 :** Créer un fichier JSON `contacts.json` contenant une liste de contacts (nom, téléphone, email). Écrire une fonction pour ajouter un contact et une pour afficher tous les contacts.

**Exercice 4 :** Lire un fichier CSV contenant des notes d'élèves (Nom, Maths, Français, Histoire) et calculer la moyenne de chaque élève. Afficher les résultats.

**Exercice 5 :** Copier une image en la lisant par blocs de 4096 octets, avec `pathlib` pour les chemins.

**Exercice 6 (défi) :** Créer un gestionnaire de todo list en ligne de commande qui sauvegarde les tâches dans un fichier JSON. Fonctionnalités : ajouter, lister, marquer comme fait, supprimer.
