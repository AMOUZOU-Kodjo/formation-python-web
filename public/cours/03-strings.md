# Module 3 : Chaînes de caractères (Strings)

---

## Objectifs du module

À la fin de ce module, vous serez capable de :
- Créer et manipuler des chaînes de caractères
- Utiliser les guillemets simples, doubles et triples
- Échapper des caractères spéciaux
- Concaténer et répéter des chaînes
- Utiliser les f-strings pour le formatage moderne
- Appliquer les principales méthodes de chaînes (split, join, replace, etc.)
- Utiliser l'indexation et le slicing pour extraire des sous-chaînes
- Comprendre l'immutabilité des chaînes

---

## 1. Création de chaînes de caractères

### 1.1 Guillemets simples vs doubles

```python
simple = 'Hello'
double = "Hello"
identique = simple == double  # → True (pas de différence)
```

Les deux sont **strictement identiques** en Python. Le choix est subjectif :

```python
# Utilisez les doubles si la chaîne contient une apostrophe
message = "C'est génial !"
# Utilisez les simples si la chaîne contient des guillemets
dialogue = 'Il a dit : "Bonjour"'
```

**Résultat attendu :**
```python
print(message)   # → C'est génial !
print(dialogue)  # → Il a dit : "Bonjour"
```

### 1.2 Chaînes multilignes avec `""" """

```python
poeme = """Les feuilles mortes
se ramassent à la pelle
Les souvenirs et les regrets aussi"""

print(poeme)
```

**Résultat attendu :**
```
Les feuilles mortes
se ramassent à la pelle
Les souvenirs et les regrets aussi
```

> **💡 Astuce :** Les chaînes multilignes sont aussi utilisées comme **docstrings** (documentation des fonctions). On en reparlera au module 7.

### 1.3 La chaîne vide

```python
vide = ""
print(len(vide))  # → 0
print(bool(vide)) # → False (une chaîne vide est "fausse")
```

---

## 2. Caractères d'échappement

### 2.1 Le backslash `\`

Le backslash permet d'insérer des caractères spéciaux dans une chaîne.

```python
# Apostrophe dans une chaîne délimitée par des simples
texte1 = 'l\'apostrophe'      # le \' empêche de fermer la chaîne
print(texte1)                 # → l'apostrophe

# Guillemet dans une chaîne délimitée par des doubles
texte2 = "Il a dit \"Bonjour\""
print(texte2)                 # → Il a dit "Bonjour"

# Saut de ligne
print("Ligne 1\nLigne 2")    # → Ligne 1 (retour à la ligne) Ligne 2

# Tabulation
print("Colonne1\tColonne2")  # → Colonne1  Colonne2
```

**Résultat attendu :**
```
l'apostrophe
Il a dit "Bonjour"
Ligne 1
Ligne 2
Colonne1  Colonne2
```

### 2.2 Tableau des séquences d'échappement

| Séquence | Signification |
|----------|---------------|
| `\\` | Backslash littéral |
| `\'` | Apostrophe |
| `\"` | Guillemet double |
| `\n` | Nouvelle ligne |
| `\t` | Tabulation |
| `\r` | Retour chariot |
| `\b` | Backspace |

### 2.3 Chaînes brutes (raw strings)

```python
# Sans le 'r', les \ sont interprétés
chemin = "C:\\Users\\Nom"     # besoin de doubler les \
print(chemin)                 # → C:\Users\Nom

# Avec le 'r', tout est littéral
chemin_brut = r"C:\Users\Nom"
print(chemin_brut)            # → C:\Users\Nom (identique)

# Utile pour les expressions régulières
pattern = r"\d{3}-\d{4}"     # pas besoin de doubler les \
```

> **💡 Astuce :** Utilisez les **raw strings** (`r"..."`) dès que vous manipulez des chemins Windows ou des expressions régulières. Votre code sera plus lisible.

### 2.4 Chaînes avec `repr()` et `print()`

```python
texte = "Bonjour\nPython"
print(texte)
print(repr(texte))   # montre les caractères d'échappement
```

**Résultat attendu :**
```
Bonjour
Python
'Bonjour\nPython'
```

`print()` affiche la version "interprétée" (avec sauts de ligne), tandis que `repr()` montre la version "code source" (avec les `\n` visibles). Utile pour le débogage.

---

## 3. Opérations de base

### 3.1 Concaténation avec `+`

```python
# Concaténer deux chaînes
prenom = "Alice"
nom = "Dupont"
nom_complet = prenom + " " + nom
print(nom_complet)            # → Alice Dupont

# Concaténation en plusieurs étapes
message = "Bonjour"
message = message + ", "
message = message + prenom
message = message + " !"
print(message)                # → Bonjour, Alice !
```

**Résultat attendu :**
```
Alice Dupont
Bonjour, Alice !
```

### 3.2 Concaténation automatique (juxtaposition)

Python concatène automatiquement les chaînes littérales placées côte à côte :

```python
texte = "Bonjour" " le " "monde"
print(texte)                  # → Bonjour le monde

# Utile pour couper une longue chaîne sur plusieurs lignes
long_texte = ("Ceci est un très long message "
              "que j'écris sur plusieurs lignes "
              "pour améliorer la lisibilité.")
```

### 3.3 Répétition avec `*`

```python
# Répéter une chaîne
separateur = "-" * 20
print(separateur)             # → --------------------

# Créer un motif
motif = "Ha" * 3
print(motif)                  # → HaHaHa

# Usage pratique : alignement
print("=" * 30)
print("     TITRE DU MENU")
print("=" * 30)
```

**Résultat attendu :**
```
--------------------
HaHaHa
==============================
     TITRE DU MENU
==============================
```

### 3.4 Longueur avec `len()`

```python
texte = "Bonjour"
print(len(texte))             # → 7

# len() compte les caractères, pas les octets
emoji = "😊"
print(len(emoji))             # → 2 (sur certains systèmes)
```

> **⚠️ Attention :** `len()` compte le nombre de caractères. Les emojis et certains caractères Unicode peuvent compter pour 2 chez Python.

### 3.5 Test d'appartenance avec `in`

```python
phrase = "Le Python est génial"
print("Python" in phrase)     # → True
print("Java" in phrase)       # → False

# Version négative
print("Java" not in phrase)   # → True
```

Utile pour vérifier si un mot/clé est présent dans un texte.

---

## 4. Indexation et slicing (tranches)

### 4.1 L'indexation : accéder à un seul caractère

Chaque caractère a une **position** (index) : le premier est à l'index `0`, le dernier à l'index `-1`.

```python
s = "PYTHON"
# Index:    012345   (index positifs)
# Index:   -6-5-4-3-2-1   (index négatifs)

print(s[0])    # → P  (premier caractère)
print(s[3])    # → H  (quatrième caractère)
print(s[-1])   # → N  (dernier caractère)
print(s[-3])   # → H  (troisième en partant de la fin)
```

**Résultat attendu :**
```
P
H
N
H
```

**Schéma visuel :**
```
┌───┬───┬───┬───┬───┬───┐
│ P │ Y │ T │ H │ O │ N │
├───┼───┼───┼───┼───┼───┤
│ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │  ← index positifs
│-6 │-5 │-4 │-3 │-2 │-1 │  ← index négatifs
└───┴───┴───┴───┴───┴───┘
```

> **⚠️ Piège courant :** L'index `len(s)` est toujours **en dehors** de la chaîne. `s[len(s)]` donne une erreur `IndexError`.

```python
s = "ABC"
# print(s[3])  # ❌ IndexError: string index out of range
```

### 4.2 Le slicing : extraire une sous-chaîne

Syntaxe : `s[début:fin:pas]`

```python
s = "PYTHON"

# s[début:fin] → de début inclus à fin EXCLUE
print(s[0:3])     # → PYT  (indices 0,1,2 — le 3 est exclu)
print(s[2:5])     # → THO  (indices 2,3,4)

# Omettre début ou fin
print(s[:3])      # → PYT  (début = 0 par défaut)
print(s[3:])      # → HON  (fin = len(s) par défaut)
print(s[:])       # → PYTHON (copie de la chaîne)
```

**Résultat attendu :**
```
PYT
THO
PYT
HON
PYTHON
```

**Le piège de l'exclusion :** Pourquoi l'index de fin est exclu ? Parce que `s[:n]` donne exactement le **n premiers caractères**. C'est pratique :

```python
s = "PYTHON"
print(s[:3])   # → PYT  (3 premiers caractères)
print(s[:4])   # → PYTH (4 premiers caractères)
```

### 4.3 Le pas (step) dans le slicing

```python
s = "PYTHON"

# Avec un pas
print(s[::2])     # → PTO  (un caractère sur deux)
print(s[1::2])    # → YHN  (un caractère sur deux, à partir de l'index 1)

# Inverser une chaîne
print(s[::-1])    # → NOHTYP  (inversion totale)

# Pas négatif (parcourir à l'envers)
print(s[4:1:-1])  # → OHT  (de l'index 4 à 1 exclus, en reculant)
```

**Résultat attendu :**
```
PTO
YHN
NOHTYP
OHT
```

**Résumé visuel du slicing :**
```
PYTHON[::-1] → NOHTYP  (inversion)
PYTHON[::2]  → P T O   (pair)
PYTHON[1::2] → Y H N   (impair)
```

---

## 5. Les f-strings (formatage moderne) — Python 3.6+

### 5.1 Syntaxe de base

Les **f-strings** (f"…") permettent d'insérer des variables directement dans une chaîne :

```python
nom = "Alice"
age = 25
print(f"Je m'appelle {nom} et j'ai {age} ans.")
```

**Résultat attendu :**
```
Je m'appelle Alice et j'ai 25 ans.
```

**Explication :** Le `f` avant les guillemets indique une "chaîne formatée". Les accolades `{...}` sont remplacées par la valeur de la variable.

### 5.2 Expressions dans les f-strings

On peut mettre n'importe quelle **expression Python** entre les `{}` :

```python
a = 10
b = 3
print(f"{a} + {b} = {a + b}")
print(f"{a} / {b} = {a / b:.2f}")   # formatage avec 2 décimales
print(f"Le produit de {a} par {b} vaut {a * b}")
```

**Résultat attendu :**
```
10 + 3 = 13
10 / 3 = 3.33
Le produit de 10 par 3 vaut 30
```

### 5.3 Formatage avancé

```python
# Alignement à gauche/droite/centre
print(f"|{'gauche':<10}|")     # aligné à gauche  (10 caractères)
print(f"|{'droite':>10}|")     # aligné à droite
print(f"|{'centre':^10}|")     # centré

# Nombres avec séparateur de milliers
population = 8_000_000_000
print(f"Population : {population:,}")     # → 8,000,000,000

# Pourcentages
taux = 0.2567
print(f"Taux : {taux:.1%}")               # → 25.7%

# Zéro-padding
print(f"{42:05d}")                         # → 00042
```

**Résultat attendu :**
```
|gauche    |
|     droite|
|  centre   |
Population : 8,000,000,000
Taux : 25.7%
00042
```

### 5.4 Formatage avec l'ancien style `%` et `.format()`

À connaître pour lire du code existant :

```python
# Ancien style % (comme en C)
nom = "Alice"
age = 25
print("Je m'appelle %s et j'ai %d ans." % (nom, age))

# Style .format()
print("Je m'appelle {} et j'ai {} ans.".format(nom, age))
```

**Résultat attendu (identique) :**
```
Je m'appelle Alice et j'ai 25 ans.
```

> **💡 Recommandation :** Utilisez **toujours** les f-strings pour du nouveau code. Plus lisibles, plus rapides, plus puissantes.

---

## 6. Méthodes principales des chaînes

### 6.1 Changement de casse

```python
s = "Bonjour tout le Monde"

print(s.upper())              # → BONJOUR TOUT LE MONDE
print(s.lower())              # → bonjour tout le monde
print(s.capitalize())         # → Bonjour tout le monde (1ère lettre maj.)
print(s.title())              # → Bonjour Tout Le Monde (chaque mot)
print(s.swapcase())           # → bONJOUR TOUT LE mONDE (inverse la casse)
```

**Résultat attendu :**
```
BONJOUR TOUT LE MONDE
bonjour tout le monde
Bonjour tout le monde
Bonjour Tout Le Monde
bONJOUR TOUT LE mONDE
```

### 6.2 Suppression d'espaces (trim)

```python
s = "   texte avec espaces   "

print(f"|{s}|")               # → |   texte avec espaces   |
print(f"|{s.strip()}|")       # → |texte avec espaces| (les deux côtés)
print(f"|{s.lstrip()}|")      # → |texte avec espaces   | (gauche)
print(f"|{s.rstrip()}|")      # → |   texte avec espaces| (droite)
```

**Résultat attendu :**
```
|   texte avec espaces   |
|texte avec espaces|
|texte avec espaces   |
|   texte avec espaces|
```

> **💡 Astuce :** `strip()` sans argument enlève tous les espaces (espaces, tabulations, retours à la ligne). On peut aussi passer un argument : `strip(".,!")` pour enlever des caractères spécifiques.

### 6.3 Recherche et test

```python
s = "Bonjour le monde Python"

print(s.startswith("Bon"))     # → True
print(s.endswith("hon"))       # → False
print(s.startswith("Python"))  # → False

print("monde" in s)            # → True (opérateur in)

# find() : trouve l'index de la première occurrence (-1 si absent)
print(s.find("monde"))         # → 12
print(s.find("Java"))          # → -1

# index() : comme find() mais lève une exception si absent
print(s.index("monde"))        # → 12
# print(s.index("Java"))       # ❌ ValueError: substring not found

# count() : nombre d'occurrences
print(s.count("o"))            # → 4
print(s.count("on"))           # → 2
```

**Résultat attendu :**
```
True
False
False
True
12
-1
12
4
2
```

### 6.4 Remplacement

```python
s = "J'aime le Python et le Java"

# Remplacer une sous-chaîne
print(s.replace("Java", "JavaScript"))    # → J'aime le Python et le JavaScript
print(s.replace("le", "mon"))             # → J'aime mon Python et mon Java

# Limiter le nombre de remplacements
print(s.replace("le", "mon", 1))          # → J'aime mon Python et le Java
```

**Résultat attendu :**
```
J'aime le Python et le JavaScript
J'aime mon Python et mon Java
J'aime mon Python et le Java
```

### 6.5 Découpage (split) et jointure (join)

```python
# split() : chaîne → liste
s = "pomme,banane,cerise,datte"
fruits = s.split(",")
print(fruits)                    # → ['pomme', 'banane', 'cerise', 'datte']

# split() sans argument : découpe sur tous les espaces
phrase = "le chat est noir"
mots = phrase.split()
print(mots)                      # → ['le', 'chat', 'est', 'noir']

# join() : liste → chaîne
resultat = " - ".join(mots)
print(resultat)                  # → le - chat - est - noir

# join() avec une chaîne vide : concatène sans séparateur
print("".join(mots))             # → lechatestnoir
```

**Résultat attendu :**
```
['pomme', 'banane', 'cerise', 'datte']
['le', 'chat', 'est', 'noir']
le - chat - est - noir
lechatestnoir
```

> **💡 Astuce :** `split()` suivi de `join()` est très utile pour transformer des listes de mots. Et c'est plus rapide que la concaténation avec `+`.

### 6.6 Vérification du contenu

```python
print("abc123".isalnum())        # → True (lettres + chiffres)
print("abc".isalpha())           # → True (que des lettres)
print("123".isdigit())           # → True (que des chiffres)
print("   ".isspace())           # → True (que des espaces)
print("Hello".islower())         # → False
print("hello".islower())         # → True
print("HELLO".isupper())         # → True
print("Hello World".istitle())   # → True (chaque mot commence par une maj.)
```

Utile pour valider la saisie utilisateur.

---

## 7. L'immutabilité des chaînes

### 7.1 Concept : une chaîne ne peut pas être modifiée

```python
s = "Bonjour"
# s[0] = "b"   # ❌ TypeError: 'str' object does not support item assignment
```

**Explication :** Les chaînes sont **immutables** (non modifiables). Quand on "modifie" une chaîne, Python crée en réalité une **nouvelle** chaîne.

```python
s = "Bonjour"
s2 = s.upper()    # crée une NOUVELLE chaîne, ne modifie pas s
print(s)          # → Bonjour (inchangé !)
print(s2)         # → BONJOUR (nouvelle chaîne)
```

**Résultat attendu :**
```
Bonjour
BONJOUR
```

### 7.2 Implications pratiques

Puisque les chaînes sont immutables, chaque "modification" crée un nouvel objet :

```python
# Chaque "modification" crée une nouvelle chaîne
texte = "abc"
print(id(texte))           # adresse mémoire 1
texte = texte.upper()
print(id(texte))           # adresse mémoire 2 (différente !)

# Les opérations en chaîne créent plusieurs objets intermédiaires
s = "  Hello World  "
s = s.strip()              # nouvelle chaîne
s = s.replace("World", "Python")  # encore une nouvelle
s = s.upper()              # et une autre
print(s)                   # → HELLO PYTHON
```

**Résultat attendu (les adresses seront différentes à chaque exécution) :**
```
3345678901234
3345789012345
HELLO PYTHON
```

> **💡 Astuce :** Pour construire une longue chaîne à partir de parties, préférez `"".join(parties)` à la concaténation répétée avec `+`. C'est plus rapide car cela évite de créer plusieurs chaînes intermédiaires.

---

## 8. Cas pratique : Analyseur de texte

```python
# Programme qui analyse une phrase saisie par l'utilisateur
phrase = input("Entrez une phrase : ")

# Statistiques de base
print(f"\n--- Analyse de la phrase ---")
print(f"Longueur : {len(phrase)} caractères")

# Compter les mots
mots = phrase.split()
print(f"Nombre de mots : {len(mots)}")

# Compter les voyelles
voyelles = "aeiouyAEIOUY"
nb_voyelles = sum(1 for lettre in phrase if lettre in voyelles)
print(f"Nombre de voyelles : {nb_voyelles}")

# Vérifier le début et la fin
print(f"Commence par une majuscule : {phrase[0].isupper()}")
print(f"Se termine par un point : {phrase.endswith('.')}")

# Version inversée
print(f"Phrase inversée : {phrase[::-1]}")

# Nombre d'occurrences d'une lettre
lettre = input("Quelle lettre voulez-vous compter ? ")
print(f"La lettre '{lettre}' apparaît {phrase.lower().count(lettre.lower())} fois")
```

**Résultat attendu (exemple) :**
```
Entrez une phrase : Bonjour tout le monde

--- Analyse de la phrase ---
Longueur : 22 caractères
Nombre de mots : 4
Nombre de voyelles : 8
Commence par une majuscule : True
Se termine par un point : False
Phrase inversée : ednom el tuot ruojnoB
Quelle lettre voulez-vous compter ? o
La lettre 'o' apparaît 4 fois
```

---

## 9. À retenir — Résumé du module

| Concept | À retenir |
|---------|-----------|
| Création | `'...'`, `"..."`, `"""..."""` |
| Échappement | `\\`, `\'`, `\"`, `\n`, `\t`, `\r` |
| Raw strings | `r"C:\dossier\fichier"` |
| Concaténation | `"a" + "b"` ou juxtaposition |
| Répétition | `"Ha" * 3` |
| Indexation | `s[0]` (premier), `s[-1]` (dernier) |
| Slicing | `s[debut:fin:pas]` — fin exclue |
| f-strings | `f"Valeur : {variable}"` |
| Méthodes clés | `upper()`, `lower()`, `strip()`, `split()`, `join()`, `replace()`, `find()`, `count()` |
| Immutabilité | Les chaînes ne peuvent pas être modifiées sur place |
| `len()` | Longueur d'une chaîne |
| `in` | Test d'appartenance |

---

## 10. Exercices

### Exercice 1 : Compteur de lettres
Demandez une phrase à l'utilisateur, puis une lettre. Affichez combien de fois cette lettre apparaît (insensible à la casse).

### Exercice 2 : Césure d'un prénom
Demandez un prénom. Affichez-le :
- En majuscules
- En minuscules
- Avec la première lettre en majuscule
- En version "inversée" (`[::-1]`)

### Exercice 3 : Générateur de mot de passe
Demandez un mot de passe. S'il fait moins de 8 caractères, affichez un message d'erreur. Sinon, affichez le nombre de chiffres, de lettres et de caractères spéciaux.

### Exercice 4 : Formateur de nom
Demandez le prénom et le nom. Affichez `NOM, Prénom` ex: `DUPONT, Alice`.

### Exercice 5 : Palindrome
Demandez un mot. Dites s'il se lit dans les deux sens (ex: "radar", "kayak"). Indice : comparez le mot avec `mot[::-1]`.

---

## Progression

```
Module 1: ✅ Introduction
Module 2: ✅ Variables et types
Module 3: ✅ Strings  ← Vous êtes ici
Module 4: ⬜ Listes et Tuples
Module 5: ⬜ Dictionnaires et Ensembles
Module 6: ⬜ Contrôle de flux
```
