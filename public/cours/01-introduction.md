# Module 1 : Introduction à Python

---

## Objectifs du module

À la fin de ce module, vous serez capable de :
- Expliquer ce qu'est Python et à quoi il sert
- Installer Python sur votre machine
- Utiliser le mode interactif (REPL) pour tester du code
- Écrire et exécuter un script Python
- Utiliser `print()` pour afficher des informations
- Utiliser `input()` pour récupérer une saisie utilisateur
- Comprendre la différence entre interpréteur et compilateur

---

## 1. Qu'est-ce que Python ?

### 1.1 Origines et philosophie

Python est un langage de programmation créé par **Guido van Rossum** aux Pays-Bas. La première version a été publiée en **1991**. Le nom "Python" ne vient pas du serpent, mais de la troupe comique britannique *Monty Python's Flying Circus*, dont Guido était fan.

> **Le saviez-vous ?** La philosophie de Python est résumée dans "The Zen of Python" (PEP 20). Tapez `import this` dans l'interpréteur Python pour la lire.

### 1.2 Caractéristiques fondamentales

Python est un langage :

- **Interprété** : le code est exécuté ligne par ligne par un programme appelé "interpréteur" (contrairement au C ou Java qui sont compilés).
- **Dynamiquement typé** : pas besoin de déclarer le type des variables, Python le déduit tout seul.
- **Orienté objet** : tout en Python est un objet (même les nombres !).
- **À usage général** : on peut tout faire avec (web, data science, jeux, automatisation...).

### 1.3 Comparaison avec d'autres langages

| Critère | Python | JavaScript | Java | C |
|---------|--------|------------|------|---|
| Typage | Dynamique | Dynamique | Statique | Statique |
| Syntaxe | Très lisible | Lisible | Verbose | Peu lisible |
| Vitesse d'exécution | Modérée | Modérée | Rapide | Très rapide |
| Facilité d'apprentissage | ★★★★★ | ★★★☆☆ | ★★☆☆☆ | ★☆☆☆☆ |
| Usage typique | Data science, backend | Web, mobile | Entreprise | Systèmes, embarqué |

**Analogogie du monde réel :** Python est comme une voiture automatique — facile à conduire, confortable, et vous pouvez aller presque partout. Le C est comme une moto de course — puissant, rapide, mais exigeant et dangereux si vous êtes débutant.

---

## 2. Installation de Python

### 2.1 Vérifier si Python est déjà installé

Avant d'installer quoi que ce soit, vérifions si Python est déjà présent sur votre système.

**Sur Windows (invité de commandes ou PowerShell) :**
```bash
python --version
```

**Sur macOS / Linux (terminal) :**
```bash
python3 --version
```

**Résultats possibles :**
```
Python 3.11.5    → Python est installé (version 3.11.5)
Python 2.7.18    → Python est installé mais c'est une ancienne version (2.x)
'python' n'est pas reconnu... → Python n'est pas installé
```

> **⚠️ Attention :** Python 2 n'est plus supporté depuis 2020. Si vous avez Python 2, installez Python 3.

### 2.2 Téléchargement et installation

1. Allez sur [python.org](https://python.org)
2. Cliquez sur **Downloads** → le site détecte automatiquement votre OS
3. Téléchargez la version **Python 3.11 ou plus récente**
4. Lancez l'installateur
5. **IMPORTANT :** Cochez la case **"Add Python to PATH"** (ajouter Python au PATH)
6. Cliquez sur "Install Now"

**Vérification après installation :**
```bash
python --version
# → Python 3.11.5 (ou similaire)
```

### 2.3 Qu'est-ce que le PATH ?

Le "PATH" est une variable d'environnement qui contient la liste des dossiers dans lesquels le système cherche les programmes exécutables. Si vous cochez "Add Python to PATH", vous pourrez taper `python` dans n'importe quel terminal. Sinon, vous devrez taper le chemin complet (ex: `C:\Python311\python.exe`).

---

## 3. Le mode interactif (REPL)

### 3.1 C'est quoi le REPL ?

REPL signifie **R**ead **E**valuate **P**rint **L**oop. C'est un mode interactif où chaque ligne de code est immédiatement exécutée.

**Pour y accéder :**
```bash
python
```

Vous verrez apparaître :
```
Python 3.11.5 (tags/v3.11.5, ...)
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

Les `>>>` sont le **prompt** : Python attend vos instructions.

### 3.2 Exemples dans le REPL

```python
>>> 2 + 3
5
>>> "Bonjour " + "le monde"
'Bonjour le monde'
>>> print("Coucou !")
Coucou !
>>> 10 * 5
50
```

**Pour quitter le REPL :**
```python
>>> exit()
```
Ou tapez Ctrl+Z (Windows) / Ctrl+D (macOS/Linux).

> **💡 Astuce :** Le REPL est idéal pour tester une petite idée rapidement. Pour du code plus long, on utilise un fichier `.py`.

---

## 4. La fonction `print()` — Afficher du texte

### 4.1 Premier exemple : le "Hello, World!"

```python
print("Hello, World!")
```

**Résultat attendu :**
```
Hello, World!
```

**Explication :** `print()` est une **fonction intégrée** (built-in) de Python. Elle prend ce qu'on lui passe entre parenthèses et l'affiche dans la console. Les guillemets `"..."` délimitent une chaîne de caractères (du texte).

### 4.2 Afficher plusieurs éléments

```python
print("Le résultat est :", 42)
```

**Résultat attendu :**
```
Le résultat est : 42
```

**Explication :** On peut passer plusieurs arguments à `print()`, séparés par des virgules. Python ajoute automatiquement un espace entre eux.

### 4.3 Personnaliser le séparateur et la fin

```python
print("a", "b", "c", sep=" - ")   # séparateur personnalisé
print("Début", end=" → ")         # pas de retour à la ligne
print("Suite")
```

**Résultat attendu :**
```
a - b - c
Début → Suite
```

**Explication :**
- `sep` : remplace l'espace par défaut entre les arguments
- `end` : remplace le retour à la ligne final par autre chose

### 4.4 Afficher des nombres et calculs

```python
print(123)
print(10 + 5)
print("10 + 5 =", 10 + 5)
```

**Résultat attendu :**
```
123
15
10 + 5 = 15
```

> **💡 Astuce :** Python calcule d'abord l'expression `10 + 5`, puis passe le résultat à `print()`.

---

## 5. La fonction `input()` — Saisir du texte

### 5.1 Premier pas avec input()

```python
prenom = input("Quel est votre prénom ? ")
print("Bonjour", prenom, "!")
```

**Déroulement :**
1. Python affiche `Quel est votre prénom ? ` (sans retour à la ligne)
2. Le programme **se met en attente** que l'utilisateur tape quelque chose
3. L'utilisateur tape son prénom et appuie sur **Entrée**
4. La valeur saisie est **stockée** dans la variable `prenom`
5. Python affiche le message de bienvenue

**Résultat attendu (exécution) :**
```
Quel est votre prénom ? Alice
Bonjour Alice !
```

### 5.2 input() renvoie toujours une chaîne

```python
age = input("Quel âge avez-vous ? ")
print("Vous avez", age, "ans.")
print("Le type de age est :", type(age))
```

**Résultat attendu (si l'utilisateur tape 25) :**
```
Quel âge avez-vous ? 25
Vous avez 25 ans.
Le type de age est : <class 'str'>
```

> **⚠️ Piège courant :** `input()` renvoie toujours une **chaîne de caractères** (`str`), même si on tape un nombre. Pour faire des calculs, il faudra convertir (on verra ça au module 2).

---

## 6. Exécuter un script Python

### 6.1 Fichiers `.py`

Un fichier Python a l'extension `.py` (ex: `mon_script.py`). Il contient du code Python qui sera exécuté du haut vers le bas.

### 6.2 Créer et exécuter un script

**Étape 1 :** Créez un fichier `hello.py` avec ce contenu :
```python
print("Quel est votre nom ?")
nom = input()
print("Enchanté,", nom, "!")
```

**Étape 2 :** Exécutez-le depuis le terminal :
```bash
python hello.py
```

**Résultat attendu :**
```
Quel est votre nom ?
Alice
Enchanté, Alice !
```

### 6.3 Scripts vs REPL : quand utiliser quoi ?

| Situation | REPL | Script `.py` |
|-----------|------|--------------|
| Tester une ligne de code | ✅ | ❌ |
| Faire un petit calcul rapide | ✅ | ❌ |
| Écrire un programme de 50 lignes | ❌ | ✅ |
| Travailler sur un projet | ❌ | ✅ |
| Apprendre et expérimenter | ✅ | ✅ |

### 6.4 Anatomie d'un script simple

```python
# Ceci est un commentaire (ignoré par Python)
print("Début du programme")       # Ligne 1
nom = input("Votre nom : ")       # Ligne 2
print("Fin du programme")         # Ligne 3
```

Les lignes sont exécutées dans l'ordre : 1 → 2 → 3. Les `#` servent à écrire des commentaires (le code après `#` est ignoré).

---

## 7. IDE et éditeurs recommandés

Un **IDE** (Environnement de Développement Intégré) est un logiciel qui facilite l'écriture de code.

| Outil | Type | Idéal pour | Gratuit |
|-------|------|-----------|---------|
| **VS Code** | Éditeur | Tout le monde — léger, extensible | ✅ |
| **PyCharm** | IDE complet | Projets sérieux | Version Community gratuite |
| **Thonny** | IDE débutant | Grands débutants | ✅ |
| **IDLE** | Environnement simple | Installé avec Python | ✅ |
| **Jupyter Notebook** | Notebook interactif | Data science, analyse | ✅ |

**Notre recommandation :** Installez **VS Code** avec l'extension Python (publiée par Microsoft).

---

## 8. À retenir — Résumé du module

| Concept | À retenir |
|---------|-----------|
| Python | Langage interprété, dynamique, lisible, polyvalent |
| `python --version` | Vérifier l'installation |
| `python` | Lancer le REPL (mode interactif) |
| `print(valeur)` | Afficher dans la console |
| `input("message")` | Récupérer la saisie utilisateur (toujours une chaîne) |
| Fichier `.py` | Extension des scripts Python |
| `python script.py` | Exécuter un script |
| `# commentaire` | Texte ignoré par Python |

---

## 9. Exercices

### Exercice 1 : Présentation personnelle
Écrivez un script qui :
1. Demande le prénom, l'âge et la ville de l'utilisateur
2. Affiche une phrase complète : "Bonjour [prénom], tu as [âge] ans et tu habites à [ville]."

### Exercice 2 : Calculatrice de surface
Écrivez un script qui :
1. Demande la longueur et la largeur d'un rectangle (en mètres)
2. Affiche la surface (longueur × largeur) sous la forme "La surface est de XX m²"

> **Indice :** Rappelez-vous que `input()` renvoie une chaîne. Utilisez `int()` ou `float()` pour convertir.

### Exercice 3 : Dialogue interactif
Écrivez un script qui mène une petite conversation :
1. Demande le nom
2. Demande l'humeur (bonne/mauvaise)
3. Répond en fonction : "Super, [nom] !" ou "Oh, j'espère que ça va aller, [nom]."
4. Termine par "Au revoir !"

### Exercice 4 : Le menu
Écrivez un script qui affiche un menu formaté :
```
=== MENU DU JOUR ===
1. Entrée : Salade
2. Plat   : Pâtes
3. Dessert: Tiramisu
====================
Que choisissez-vous ?
```

---

## Résumé visuel de la leçon

```
┌──────────────────────────────────────────────────────┐
│                  Programme Python                      │
│                                                      │
│  ┌────────────┐     ┌────────────┐     ┌──────────┐ │
│  │  input()   │ ──→ │  Traitement│ ──→ │ print()  │ │
│  │ (saisie)   │     │ (calculs)  │     │(affichage)│ │
│  └────────────┘     └────────────┘     └──────────┘ │
│                                                      │
│  Fichier .py → Interpréteur Python → Résultat console │
└──────────────────────────────────────────────────────┘
```

**Progression :** 1 module sur 6 terminé ✅
