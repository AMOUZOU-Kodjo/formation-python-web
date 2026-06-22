# Module 2 : Variables, Types et Opérateurs

---

## Objectifs du module

À la fin de ce module, vous serez capable de :
- Déclarer et utiliser des variables en Python
- Connaître les types fondamentaux : `int`, `float`, `str`, `bool`, `NoneType`
- Appliquer les règles de nommage (snake_case, identifiants valides)
- Utiliser les opérateurs arithmétiques, de comparaison et logiques
- Convertir un type en un autre (casting)
- Comprendre la notion de référence et de valeur

---

## 1. Les variables : des "boîtes" pour stocker des données

### 1.1 Analogie : les boîtes étiquetées

Imaginez des **boîtes** sur une étagère. Chaque boîte a une **étiquette** (le nom de la variable) et contient une **valeur** (les données).

```python
nom     = "Alice"   # boîte "nom"   → contient "Alice"
age     = 25        # boîte "age"   → contient 25
taille  = 1.68      # boîte "taille" → contient 1.68
```

L'opérateur `=` (affectation) signifie "stocke la valeur de droite dans la variable de gauche". Ce n'est PAS un "égal" mathématique !

### 1.2 L'affectation expliquée pas à pas

```python
message = "Bonjour !"
```

Ce qui se passe en mémoire :
1. Python crée une **boîte** nommée `message`
2. Il **stocke** la chaîne `"Bonjour !"` dans cette boîte
3. Quand on écrit `print(message)`, Python va chercher le contenu de la boîte

```python
message = "Bonjour !"
print(message)         # → Bonjour !
message = "Salut !"    # On change le contenu de la boîte
print(message)         # → Salut !
```

**Résultat attendu :**
```
Bonjour !
Salut !
```

### 1.3 L'affectation n'est pas une équation

En mathématiques, écrire `x = x + 1` est absurde. En programmation, c'est parfaitement valable :

```python
x = 10
print(x)   # → 10
x = x + 5  # on prend la valeur de x (10), on ajoute 5, on stocke le résultat
print(x)   # → 15
```

**Résultat attendu :**
```
10
15
```

**Explication :** Python évalue d'abord la partie droite (`x + 5`), ce qui donne `15`, puis stocke ce résultat dans `x`. L'ancienne valeur (`10`) est remplacée.

### 1.4 Affectations multiples

Python permet des syntaxes concises pour plusieurs variables :

```python
# Style 1 : une ligne, plusieurs variables
a, b, c = 1, 2, 3
print(a, b, c)   # → 1 2 3

# Style 2 : même valeur pour plusieurs variables
x = y = z = 0
print(x, y, z)   # → 0 0 0

# Style 3 : échange de valeurs (très pratique en Python !)
a, b = 1, 2
print(f"Avant : a={a}, b={b}")
a, b = b, a      # échange sans variable temporaire !
print(f"Après : a={a}, b={b}")
```

**Résultat attendu :**
```
1 2 3
0 0 0
Avant : a=1, b=2
Après : a=2, b=1
```

> **💡 Astuce :** L'échange `a, b = b, a` est une fonctionnalité unique à Python. Dans d'autres langages (C, Java), il faudrait une variable temporaire !

---

## 2. Règles de nommage des variables

### 2.1 La convention snake_case

En Python, on utilise **snake_case** : les mots sont en minuscules séparés par des underscores `_`.

```python
# ✅ Correct (snake_case)
nom_utilisateur = "Alice"
age_personne = 30
nombre_de_tentatives = 3

# ❌ Incorrect (CamelCase — réservé aux classes)
nomUtilisateur = "Alice"      # déconseillé
NombreDeTentatives = 3        # déconseillé

# ❌ Incorrect (kebab-case — pas valide en Python)
# nom-utilisateur = "Alice"  # erreur ! le tiret est un opérateur moins
```

### 2.2 Règles impératives

Un nom de variable **DOIT** respecter ces règles :

```python
# ✅ Valide
ma_variable = 1
_variable_privee = 2      # underscore au début (usage spécial : "privé")
variable3 = 3             # chiffres autorisés (pas au début)
MA_CONSTANTE = 100        # MAJUSCULES pour les constantes (convention)

# ❌ Invalide
# 3variables = 1          # erreur : commence par un chiffre
# ma-variable = 1         # erreur : tiret interdit
# class = 1               # erreur : mot-clé réservé
# for = 1                 # erreur : mot-clé réservé
# variable! = 1           # erreur : caractère spécial interdit
```

### 2.3 Mots-clés réservés

Ces mots ont une signification spéciale en Python et **ne peuvent pas** être utilisés comme noms de variables :

```
False, None, True, and, as, assert, async, await, break, class,
continue, def, del, elif, else, except, finally, for, from, global,
if, import, in, is, lambda, nonlocal, not, or, pass, raise, return,
try, while, with, yield
```

```python
# ❌ Erreur : utiliser un mot réservé
# None = 42   # SyntaxError: cannot assign to None
# print = "afficher"  # DÉCONSEILLÉ : écrase la fonction print()
```

> **⚠️ Piège courant :** On peut techniquement écraser `print`, `input`, `len`... mais c'est une très mauvaise pratique. Ne donnez jamais à une variable le nom d'une fonction existante.

### 2.4 Casse et underscore

```python
nom = "Alice"
Nom = "Bob"
NOM = "Charlie"

print(nom, Nom, NOM)   # → Alice Bob Charlie (3 variables distinctes !)
```

Python est **sensible à la casse** (case-sensitive). `nom`, `Nom` et `NOM` sont trois variables différentes.

### 2.5 Bons réflexes à adopter

| ✅ À faire | ❌ À éviter |
|------------|-------------|
| `age_utilisateur` | `ageUtilisateur` (CamelCase) |
| `nombre_total` | `x` (trop court, pas explicite) |
| `prix_ht` | `p` (pas assez descriptif) |
| `compteur` | `cpt` (abréviation inutile) |
| `est_actif` (préfixe `est_` pour booléens) | `actif` (ambigu) |

> **💡 Règle d'or :** Un bon nom de variable s'explique tout seul. `nombre_de_tentatives` est plus clair que `nbt` ou `x3`.

---

## 3. Les types fondamentaux

### 3.1 Python est dynamiquement typé

```python
# Python déduit automatiquement le type
variable = 42
print(type(variable))   # → <class 'int'>

variable = "texte"      # on peut changer de type !
print(type(variable))   # → <class 'str'>
```

**Explication :** Le type est lié à la **valeur**, pas à la variable. Une même variable peut contenir successivement un entier, une chaîne, un flottant... (même si c'est déconseillé pour la clarté).

### 3.2 Le type `int` — nombres entiers

```python
age = 25
population = 8_000_000_000   # les underscores améliorent la lisibilité
negatif = -42
zero = 0
tres_grand = 10 ** 100       # Python gère les très grands entiers !

print(age)
print(population)
print(tres_grand)
```

**Résultat attendu :**
```
25
8000000000
10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

> **💡 Particularité de Python :** Pas de limite de taille pour les entiers ! En C, un `int` est limité à ~2 milliards. En Python, vous pouvez faire `10**1000` sans problème.

### 3.3 Le type `float` — nombres à virgule

```python
pi = 3.14159
temperature = -5.5
prix = 19.99
scientifique = 1.5e-4   # notation scientifique : 1.5 × 10^(-4) = 0.00015
infini = float('inf')   # infini

print(pi)
print(scientifique)
print(0.1 + 0.2)        # attention aux arrondis !
```

**Résultat attendu :**
```
3.14159
0.00015
0.30000000000000004
```

> **⚠️ Piège courant :** Les `float` ont des erreurs d'arrondi (comme en mathématiques avec 0.333... × 3). `0.1 + 0.2` ne donne pas exactement `0.3`. Pour des calculs précis (argent), utilisez le module `decimal`.

### 3.4 Le type `str` — chaînes de caractères

```python
message = "Bonjour !"
prenom = 'Alice'
citation = """Ceci est
une chaîne sur
plusieurs lignes"""
vide = ""

print(message)
print(prenom)
print(citation)
```

**Résultat attendu :**
```
Bonjour !
Alice
Ceci est
une chaîne sur
plusieurs lignes
```

> **💡 Astuce :** Les guillemets simples `'...'` et doubles `"..."` sont interchangeables. Choisissez l'un ou l'autre selon le contexte (voir module 3).

### 3.5 Le type `bool` — vrai ou faux

```python
est_connecte = True
est_administrateur = False

# Les booléens viennent souvent de comparaisons
age = 18
est_majeur = age >= 18
print(est_majeur)                    # → True

# True = 1, False = 0 (pour les calculs)
print(True + True + False)           # → 2
print(True * 10)                     # → 10
```

**Résultat attendu :**
```
True
2
10
```

> **⚠️ Piège courant :** `True` et `False` prennent une majuscule. `true` et `false` (minuscules) ne sont pas reconnus en Python.

### 3.6 Le type `NoneType` — l'absence de valeur

```python
resultat = None        # "rien" ou "pas encore de valeur"
print(resultat)        # → None
print(type(resultat))  # → <class 'NoneType'>
```

**Quand utiliser `None` ?**
- Une fonction qui n'a pas encore de résultat
- Une valeur optionnelle qui peut être absente
- Initialiser une variable avant de lui donner une vraie valeur

```python
reponse = None          # rien pour l'instant
reponse = input("Question ? ")  # on remplit plus tard
```

> **Ne pas confondre :** `None` ≠ `0`, `None` ≠ `""` (chaîne vide), `None` ≠ `False`. `None` est l'absence totale de valeur.

### 3.7 Tableau récapitulatif des types

```python
# Visualisons chaque type avec sa valeur et son type
exemples = [
    (42, int),
    (3.14, float),
    ("Hello", str),
    (True, bool),
    (None, type(None))
]

for valeur, type_attendu in exemples:
    print(f"Valeur: {str(valeur):8s} | type(): {str(type(valeur)):20s}")
```

**Résultat attendu :**
```
Valeur: 42       | type(): <class 'int'>
Valeur: 3.14     | type(): <class 'float'>
Valeur: Hello    | type(): <class 'str'>
Valeur: True     | type(): <class 'bool'>
Valeur: None     | type(): <class 'NoneType'>
```

---

## 4. Les opérateurs

### 4.1 Opérateurs arithmétiques

```python
a = 15
b = 4

print(f"{a} + {b}  =", a + b)     # addition
print(f"{a} - {b}  =", a - b)     # soustraction
print(f"{a} * {b}  =", a * b)     # multiplication
print(f"{a} / {b}  =", a / b)     # division → toujours un float
print(f"{a} // {b} =", a // b)    # division entière → arrondit à l'inférieur
print(f"{a} % {b}  =", a % b)     # modulo → reste de la division
print(f"{a} ** {b} =", a ** b)    # puissance
```

**Résultat attendu :**
```
15 + 4  = 19
15 - 4  = 11
15 * 4  = 60
15 / 4  = 3.75
15 // 4 = 3
15 % 4  = 3
15 ** 4 = 50625
```

**Explication des opérateurs moins courants :**

| Opérateur | Rôle | Exemple | Résultat |
|-----------|------|---------|----------|
| `//` | Division entière (troncature) | `15 // 4` | `3` (combien de fois 4 dans 15 ?) |
| `%` | Modulo (reste) | `15 % 4` | `3` (il reste 3 après avoir enlevé 4×3) |
| `**` | Puissance | `2 ** 10` | `1024` (2 puissance 10) |

**Analogie du modulo :** Pensez à une horloge. Il est 23h, dans 4 heures il est (23 + 4) % 24 = 3h. Le modulo sert à "rester dans un cycle" — très utile pour détecter les nombres pairs (`n % 2 == 0`).

### 4.2 Opérateurs de comparaison

```python
x = 10
y = 20

print(f"{x} == {y} :", x == y)    # égal à
print(f"{x} != {y} :", x != y)    # différent de
print(f"{x} <  {y} :", x < y)     # strictement inférieur
print(f"{x} >  {y} :", x > y)     # strictement supérieur
print(f"{x} <= {y} :", x <= y)    # inférieur ou égal
print(f"{x} >= {y} :", x >= y)    # supérieur ou égal
```

**Résultat attendu :**
```
10 == 20 : False
10 != 20 : True
10 <  20 : True
10 >  20 : False
10 <= 20 : True
10 >= 20 : False
```

> **⚠️ Piège courant :** `=` est l'affectation, `==` est la comparaison. C'est l'erreur la plus fréquente des débutants !

### 4.3 Opérateurs logiques : `and`, `or`, `not`

Ces opérateurs servent à **combiner** des conditions.

```python
age = 25
permis = True

# and : les DEUX conditions doivent être vraies
print(age >= 18 and permis)              # → True (25≥18 ET permis=True)
print(age >= 18 and not permis)          # → False (25≥18 OK, mais pas permis)

# or : AU MOINS UNE condition doit être vraie
print(age < 18 or permis)               # → True (même si age≥18, permis=True)
print(age > 30 or not permis)           # → False (aucune condition vraie)

# not : inverse la valeur
print(not True)                          # → False
print(not False)                         # → True
print(not (age > 30))                    # → True (car age>30 est faux)
```

**Résultat attendu :**
```
True
False
True
False
False
True
True
```

**Table de vérité `and` :**
| A | B | A and B |
|---|---|---------|
| True | True | **True** |
| True | False | **False** |
| False | True | **False** |
| False | False | **False** |

**Table de vérité `or` :**
| A | B | A or B |
|---|---|--------|
| True | True | **True** |
| True | False | **True** |
| False | True | **True** |
| False | False | **False** |

### 4.4 Précédence des opérateurs

Quand plusieurs opérateurs sont mélangés, l'ordre est :

1. `**` (puissance)
2. `*`, `/`, `//`, `%` (multiplication/division)
3. `+`, `-` (addition/soustraction)
4. `<`, `<=`, `>`, `>=`, `==`, `!=` (comparaisons)
5. `not` (négation)
6. `and` (et logique)
7. `or` (ou logique)

```python
resultat = 10 + 5 * 2           # 10 + (5 * 2) = 20
resultat2 = (10 + 5) * 2        # 30 (parenthèses changent l'ordre)
print(resultat, resultat2)      # → 20 30
```

> **💡 Règle d'or :** En cas de doute, utilisez des parenthèses ! `(a + b) * c` est plus lisible que `a + b * c`.

---

## 5. Conversion de types (casting)

### 5.1 Pourquoi convertir ?

Rappelez-vous : `input()` renvoie toujours une chaîne. Pour faire des maths, on doit convertir.

```python
age = input("Quel âge avez-vous ? ")
# age est une chaîne ("25"), pas un nombre
print(age + 1)   # ❌ Erreur ! On ne peut pas additionner str et int
```

**Erreur :** `TypeError: can only concatenate str (not "int") to str`

### 5.2 Les fonctions de conversion

```python
# int() : conversion vers un entier
print(int("42"))          # → 42
print(int(3.99))          # → 3 (troncature, pas d'arrondi !)
print(int(True))          # → 1
print(int(False))         # → 0

# float() : conversion vers un flottant
print(float("3.14"))      # → 3.14
print(float(42))          # → 42.0
print(float("1.5e-4"))    # → 0.00015

# str() : conversion vers une chaîne
print(str(42))            # → "42"
print(str(3.14))          # → "3.14"
print(str(True))          # → "True"
print(str(None))          # → "None"

# bool() : conversion vers un booléen
print(bool(1))            # → True
print(bool(0))            # → False
print(bool(42))           # → True (tout nombre non nul)
print(bool(""))           # → False (chaîne vide)
print(bool("texte"))      # → True (chaîne non vide)
print(bool(None))         # → False
```

**Résultat attendu :**
```
42
3
1
0
3.14
42.0
0.00015
42
3.14
True
None
True
False
True
False
True
False
```

### 5.3 Application pratique : une mini-calculatrice

```python
# Demander deux nombres à l'utilisateur
a = input("Premier nombre : ")
b = input("Deuxième nombre : ")

# Convertir les chaînes en nombres
a = float(a)
b = float(b)

# Effectuer les opérations
print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} × {b} = {a * b}")
print(f"{a} ÷ {b} = {a / b}")
```

**Résultat attendu (si l'utilisateur tape 15 et 4) :**
```
Premier nombre : 15
Deuxième nombre : 4
15.0 + 4.0 = 19.0
15.0 - 4.0 = 11.0
15.0 × 4.0 = 60.0
15.0 ÷ 4.0 = 3.75
```

### 5.4 Cas problématiques du casting

```python
# Ces conversions fonctionnent
print(int(" 42 "))        # → 42 (les espaces sont ignorés)

# Ces conversions échouent
# int("42.5")             # ❌ ValueError : "42.5" n'est pas un entier valide
# int("abc")              # ❌ ValueError : "abc" n'est pas un nombre
# float("1,5")            # ❌ ValueError : la virgule n'est pas acceptée
# bool("False")           # → True ! (car c'est une chaîne non vide)
```

> **⚠️ Piège courant :** `bool("False")` donne `True` car toute chaîne non vide est vraie. Seule la chaîne vide `""` donne `False`.

---

## 6. La fonction `type()` et le typage dynamique

```python
# Vérifier le type d'une valeur
print(type(42))           # → <class 'int'>
print(type("Hello"))      # → <class 'str'>
print(type(3.14))         # → <class 'float'>
print(type(True))         # → <class 'bool'>
print(type(None))         # → <class 'NoneType'>
print(type([1, 2, 3]))    # → <class 'list'>

# Le type d'une variable peut changer
valeur = 42
print(type(valeur))       # → <class 'int'>
valeur = "maintenant une chaîne"
print(type(valeur))       # → <class 'str'>
```

> **💡 Astuce :** Utilisez `type()` pour déboguer quand vous n'êtes pas sûr du type d'une valeur. C'est très utile pour les débutants !

---

## 7. À retenir — Résumé du module

| Concept | À retenir |
|---------|-----------|
| Variable | Une "boîte" étiquetée qui contient une valeur |
| `=` | Opérateur d'affectation (pas d'égalité !) |
| `snake_case` | Convention de nommage : `mon_age`, `nom_utilisateur` |
| Type | Déduit automatiquement par Python |
| `int` | Nombre entier (42, -5, 0) |
| `float` | Nombre à virgule (3.14, -0.5) |
| `str` | Chaîne de caractères ("Hello") |
| `bool` | Vrai/Faux (True, False) |
| `None` | Absence de valeur |
| `//`, `%`, `**` | Division entière, modulo, puissance |
| `==` | Comparaison d'égalité (≠ `=`) |
| `int()`, `float()`, `str()`, `bool()` | Conversion de types |

---

## 8. Exercices

### Exercice 1 : Présentation complète
Écrivez un script qui demande le nom, l'âge (nombre) et la taille (nombre à virgule), puis affiche :
```
Tu t'appelles Alice, tu as 25 ans et tu mesures 1.68 m.
```

### Exercice 2 : Calculateur d'IMC
Écrivez un programme qui calcule l'IMC : `poids / taille²` (poids en kg, taille en mètres). Demandez les deux valeurs à l'utilisateur et affichez :
```
Avec 70 kg et 1.75 m, ton IMC est de 22.86
```

### Exercice 3 : Convertisseur EUR → USD
Taux : 1 EUR = 1.10 USD. Écrivez un script qui convertit un montant saisi en euros.

### Exercice 4 : Détecteur de parité
Demandez un nombre à l'utilisateur et affichez si le nombre est pair ou impair (indice : utilisez `%`).

### Exercice 5 : Durée en secondes
Demandez un nombre d'heures et de minutes, affichez le total en secondes.

---

## Progression

```
Module 1: ✅ Introduction
Module 2: ✅ Variables et types  ← Vous êtes ici
Module 3: ⬜ Strings
Module 4: ⬜ Listes et Tuples
Module 5: ⬜ Dictionnaires et Ensembles
Module 6: ⬜ Contrôle de flux
```
