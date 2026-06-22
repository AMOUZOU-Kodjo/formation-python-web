# Module 6 : Contrôle de flux

---

## Objectifs du module

À la fin de ce module, vous serez capable de :
- Prendre des décisions avec `if / elif / else`
- Utiliser l'opérateur ternaire pour des conditions courtes
- Maîtriser les conditions imbriquées sans créer de "spaghetti"
- Comprendre la "vérité des valeurs" (truthy/falsy)
- Utiliser le court-circuit avec `and` / `or`
- Employer l'opérateur walrus `:=` (Python 3.8+)
- Écrire des structures `match / case` (Python 3.10+)

---

## 1. La structure conditionnelle `if / elif / else`

### 1.1 Le `if` simple

La structure conditionnelle permet d'exécuter du code **seulement si** une condition est vraie.

```python
age = 18

if age >= 18:
    print("Vous êtes majeur.")
```

**Résultat attendu :**
```
Vous êtes majeur.
```

**Explication :** `if age >= 18` est évalué. Si la condition est `True`, le bloc indenté est exécuté. Si `False`, rien ne se passe.

> **⚠️ Règle absolue :** En Python, les blocs sont délimités par **l'indentation** (4 espaces par convention). Pas d'accolades comme en JavaScript ou Java.

### 1.2 Ajouter un `else`

```python
age = 15

if age >= 18:
    print("Vous êtes majeur.")
else:
    print("Vous êtes mineur.")
```

**Résultat attendu :**
```
Vous êtes mineur.
```

### 1.3 Enchaîner avec `elif`

```python
age = 25

if age < 12:
    print("Enfant")
elif age < 18:
    print("Adolescent")
elif age < 65:
    print("Adulte")
else:
    print("Senior")
```

**Résultat attendu :**
```
Adulte
```

**Déroulement pas à pas :**
1. `age < 12` ? 25 < 12 → **False** → on passe au `elif` suivant
2. `age < 18` ? 25 < 18 → **False** → on passe au `elif` suivant
3. `age < 65` ? 25 < 65 → **True** → on exécute `print("Adulte")`
4. On **sort** de la structure (le `else` est ignoré)

### 1.4 Flowchart visuel du `if/elif/else`

```
              ┌──────────┐
              │ Début    │
              └────┬─────┘
                   │
              ┌────▼─────┐  OUI   ┌──────────┐
              │ age < 12 ├───────→│ Enfant   │
              └────┬─────┘       └──────────┘
                   │ NON
              ┌────▼─────┐  OUI   ┌──────────────┐
              │ age < 18 ├───────→│ Adolescent   │
              └────┬─────┘       └──────────────┘
                   │ NON
              ┌────▼─────┐  OUI   ┌──────────┐
              │ age < 65 ├───────→│ Adulte   │
              └────┬─────┘       └──────────┘
                   │ NON
              ┌────▼─────┐
              │  Senior  │
              └──────────┘
```

> 💡 **Important :** Dès qu'une condition est vraie, Python exécute le bloc correspondant et **saute le reste** de la structure.

---

## 2. Conditions imbriquées

### 2.1 Pourquoi imbriquer ?

Parfois, une condition dépend du résultat d'une condition précédente.

```python
age = 25
permis = True

# ✅ Conditions imbriquées claires
if age >= 18:
    print("Âge valide pour conduire.")
    if permis:
        print("Vous pouvez conduire.")
    else:
        print("Vous devez passer le permis.")
else:
    print("Vous êtes trop jeune pour conduire.")
```

**Résultat attendu :**
```
Âge valide pour conduire.
Vous pouvez conduire.
```

**Déroulement :**
1. `age >= 18` → True → on entre dans le premier bloc
2. On affiche "Âge valide..."
3. `if permis:` → True → on affiche "Vous pouvez conduire."

### 2.2 Éviter l'imbrication excessive (pyramide)

```python
# ❌ À ÉVITER : la pyramide infernale
age = 25
permis = True
assurance = True

if age >= 18:                    # niveau 1
    if permis:                   # niveau 2
        if assurance:            # niveau 3
            print("Vous pouvez conduire.")
        else:
            print("Pas d'assurance.")
    else:
        print("Pas de permis.")
else:
    print("Trop jeune.")
```

**Solution :** Utilisez des conditions composées avec `and` :

```python
# ✅ Mieux : combiner les conditions
if age >= 18 and permis and assurance:
    print("Vous pouvez conduire.")
elif age >= 18 and not permis:
    print("Pas de permis.")
elif age >= 18 and not assurance:
    print("Pas d'assurance.")
else:
    print("Trop jeune.")
```

> **💡 Règle pratique :** Si vous dépassez 2-3 niveaux d'imbrication, c'est le signe qu'il faut réorganiser. Privilégiez les conditions composées.

---

## 3. La "vérité" des valeurs en Python (truthy / falsy)

### 3.1 Les valeurs qui sont "fausses" (falsy)

En Python, certaines valeurs sont considérées équivalentes à `False` dans un contexte booléen :

```python
# Toutes ces valeurs sont "falsy" (équivalent à False)
if not 0:
    print("0 est falsy")

if not 0.0:
    print("0.0 est falsy")

if not "":
    print("Chaîne vide est falsy")

if not []:
    print("Liste vide est falsy")

if not {}:
    print("Dictionnaire vide est falsy")

if not None:
    print("None est falsy")
```

**Résultat attendu :**
```
0 est falsy
0.0 est falsy
Chaîne vide est falsy
Liste vide est falsy
Dictionnaire vide est falsy
None est falsy
```

### 3.2 Toutes les autres valeurs sont "vraies" (truthy)

```python
# Toutes ces valeurs sont "truthy"
if 42:
    print("42 est truthy")

if -1:
    print("-1 est truthy (tout nombre non nul est truthy)")

if "False":
    print("'False' (string non vide) est truthy")

if [0]:
    print("[0] (liste non vide) est truthy")

if {"key": 0}:
    print("{'key': 0} (dictionnaire non vide) est truthy")
```

**Résultat attendu :**
```
42 est truthy
-1 est truthy (tout nombre non nul est truthy)
'False' (string non vide) est truthy
[0] (liste non vide) est truthy
{'key': 0} (dictionnaire non vide) est truthy
```

### 3.3 Applications pratiques

```python
# Vérifier si une liste est vide
fruits = []
if not fruits:                      # plus lisible que "if len(fruits) == 0"
    print("Panier vide !")

# Vérifier si une chaîne est non vide
nom = input("Votre nom : ")
if nom:                             # plus lisible que "if nom != ''"
    print(f"Bonjour {nom} !")
else:
    print("Vous n'avez pas entré de nom.")
```

> **⚠️ Piège courant :** `bool("False")` donne `True` car la chaîne n'est pas vide. Seule la chaîne vide `""` est falsy.

---

## 4. Court-circuit avec `and` et `or`

### 4.1 Comment ça marche ?

Python évalue les expressions de gauche à droite et **s'arrête dès que le résultat est déterminé**.

```python
# Avec and : si la première est False, la seconde n'est jamais évaluée
def couteux():
    print("Fonction coûteuse appelée !")
    return True

# Court-circuit : la première condition est False → on n'appelle pas couteux()
if False and couteux():
    print("Ceci ne s'affiche pas")
print("On n'a pas appelé couteux !")

# Pas de court-circuit : True → on évalue couteux()
if True and couteux():
    print("Ceci s'affiche")
```

**Résultat attendu :**
```
On n'a pas appelé couteux !
Fonction coûteuse appelée !
Ceci s'affiche
```

### 4.2 Utilisation pratique du court-circuit

```python
# Éviter une erreur : vérifier avant d'accéder
ma_liste = []
# if ma_liste[0] > 0:        # ❌ IndexError si liste vide
if ma_liste and ma_liste[0] > 0:   # ✅ safe (court-circuit si liste vide)
    print("Premier élément positif")

# Valeur par défaut avec or
nom = input("Nom : ") or "Inconnu"  # si l'utilisateur ne tape rien → "Inconnu"
print(f"Bonjour {nom} !")
```

---

## 5. L'opérateur ternaire

### 5.1 Syntaxe

L'opérateur ternaire permet d'écrire une condition simple sur **une seule ligne**.

```python
# Syntaxe : valeur_si_vrai if condition else valeur_si_faux

age = 18
statut = "majeur" if age >= 18 else "mineur"
print(statut)                    # → majeur

# Usage avec des expressions
prix = 100
reduction = 0.9 if prix > 50 else 0.95
print(f"Prix final : {prix * reduction}")  # → 90.0
```

**Résultat attendu :**
```
majeur
Prix final : 90.0
```

### 5.2 Comparaison avec if/else classique

```python
# Version classique
age = 18
if age >= 18:
    statut = "majeur"
else:
    statut = "mineur"

# Version ternaire (équivalente, plus concise)
statut = "majeur" if age >= 18 else "mineur"
```

> **⚠️ Quand éviter le ternaire :** Si l'expression devient trop longue, préférez le `if/else` classique pour la lisibilité.

---

## 6. L'opérateur Walrus `:=` (Python 3.8+)

### 6.1 Pourquoi "walrus" ?

L'opérateur `:=` ressemble aux yeux et aux défenses d'un morse (walrus en anglais). Il permet d'**affecter** une valeur à une variable **à l'intérieur** d'une expression.

### 6.2 Exemple de base

```python
# Sans walrus : deux étapes
saisie = input("Entrez un texte : ")
if len(saisie) > 5:
    print(f"Texte long ({len(saisie)} caractères)")

# Avec walrus : affectation et test en une seule ligne
if (n := len(input("Entrez un texte : "))) > 5:
    print(f"Texte long ({n} caractères)")
```

**Résultat attendu (si l'utilisateur tape "Bonjour") :**
```
Texte long (7 caractères)
```

**Explication :** `n := len(input(...))` fait deux choses :
1. Stocke la longueur dans `n`
2. `n` est utilisé comme valeur de l'expression (la condition)

### 6.3 Cas d'usage typique

```python
# Lire un fichier ligne par ligne (sans walrus)
# with open("fichier.txt") as f:
#     ligne = f.readline()
#     while ligne:
#         print(ligne.strip())
#         ligne = f.readline()

# Avec walrus : plus propre
# with open("fichier.txt") as f:
#     while (ligne := f.readline()):
#         print(ligne.strip())

# Saisies multiples
while (entree := input("> ")) != "quit":
    print(f"Vous avez dit: {entree}")
```

> **💡 L'opérateur walrus est pratique mais optionnel :** N'hésitez pas à l'ignorer au début. Beaucoup de code fonctionne très bien sans lui.

---

## 7. La structure `match / case` (Python 3.10+)

### 7.1 Syntaxe de base

`match/case` est l'équivalent du `switch` dans d'autres langages (C, Java, JavaScript).

```python
commande = "ajouter"

match commande:
    case "ajouter":
        print("Ajout en cours...")
    case "supprimer":
        print("Suppression en cours...")
    case "modifier":
        print("Modification en cours...")
    case _:              # cas par défaut (comme "default")
        print("Commande inconnue")
```

**Résultat attendu :**
```
Ajout en cours...
```

**Explication :** Python compare `commande` avec chaque `case` dans l'ordre. Le premier qui correspond est exécuté. Le `_` (underscore) est le cas par défaut.

### 7.2 Match avec des valeurs multiples

```python
statut = 200

match statut:
    case 200 | 201 | 204:          # plusieurs valeurs avec |
        print("Succès")
    case 400:
        print("Requête invalide")
    case 404:
        print("Page non trouvée")
    case 500:
        print("Erreur serveur")
    case _:
        print("Autre statut")
```

**Résultat attendu :**
```
Succès
```

### 7.3 Match avec conditions (guard)

```python
point = (5, 5)

match point:
    case (0, 0):
        print("Origine")
    case (x, 0):
        print(f"Sur l'axe X à {x}")
    case (0, y):
        print(f"Sur l'axe Y à {y}")
    case (x, y) if x == y:         # condition supplémentaire (guard)
        print(f"Diagonal à {x}")
    case (x, y):
        print(f"Position ({x}, {y})")
```

**Résultat attendu :**
```
Diagonal à 5
```

> **💡 `match/case` est idéal pour :** remplacer de longues chaînes `if/elif` quand on teste une seule variable contre plusieurs valeurs possibles.

---

## 8. Application : Jeu du nombre mystère

```python
import random

print("=== JEU DU NOMBRE MYSTÈRE ===")
print("Devinez le nombre entre 1 et 100")

nombre_secret = random.randint(1, 100)
tentatives = 0

while True:
    saisie = input("Votre proposition : ")

    if not saisie.isdigit():
        print("Veuillez entrer un nombre valide.")
        continue

    proposition = int(saisie)
    tentatives += 1

    if proposition < nombre_secret:
        print("Trop bas !")
    elif proposition > nombre_secret:
        print("Trop haut !")
    else:
        print(f"🎉 Bravo ! Vous avez trouvé en {tentatives} tentatives.")
        if tentatives <= 5:
            print("Excellent !")
        elif tentatives <= 10:
            print("Bien joué !")
        else:
            print("Vous pouvez faire mieux.")
        break
```

**Résultat attendu (exécution) :**
```
=== JEU DU NOMBRE MYSTÈRE ===
Devinez le nombre entre 1 et 100
Votre proposition : 50
Trop haut !
Votre proposition : 25
Trop bas !
Votre proposition : 37
Trop haut !
Votre proposition : 31
🎉 Bravo ! Vous avez trouvé en 4 tentatives.
Excellent !
```

---

## 9. Résumé des concepts clés

### 9.1 Tableau de la vérité (truthy/falsy)

| Valeur | Équivalent booléen |
|--------|-------------------|
| `0`, `0.0`, `0j` | `False` |
| Chaîne vide `""` | `False` |
| Liste vide `[]` | `False` |
| Dict vide `{}` | `False` |
| Set vide `set()` | `False` |
| `None` | `False` |
| **Tout le reste** | **`True`** |

### 9.2 Court-circuit : tableau récapitulatif

| Expression | Résultat | Explication |
|------------|----------|-------------|
| `False and X` | `False` | N'évalue pas X |
| `True and X` | `X` | Retourne X |
| `True or X` | `True` | N'évalue pas X |
| `False or X` | `X` | Retourne X |

### 9.3 Quand utiliser quoi ?

| Situation | Structure recommandée |
|-----------|----------------------|
| Condition simple (vrai/faux) | `if` / `if not` |
| Plusieurs cas exclusifs | `if / elif / elif / else` |
| Une seule variable, plusieurs valeurs | `match / case` |
| Condition très courte | Opérateur ternaire `x if c else y` |
| Affecter + tester en même temps | Walrus `:=` |
| 3+ niveaux d'imbrication | Repenser la logique |

---

## 10. À retenir — Résumé du module

| Concept | À retenir |
|---------|-----------|
| `if / elif / else` | Prise de décision — premier vrai gagnant |
| Indentation | 4 espaces — PAS d'accolades |
| Conditions imbriquées | Max 2-3 niveaux, sinon réorganisez |
| Truthy / Falsy | `0`, `""`, `[]`, `None` sont faux |
| Court-circuit | `and`/`or` s'arrêtent dès que possible |
| Ternaire | `"vrai" if cond else "faux"` |
| Walrus `:=` | Affectation dans une expression |
| `match / case` | Switch version Python (3.10+) |

---

## 11. Exercices

### Exercice 1 : Catégorie d'âge
Demandez l'âge et affichez :
- 0-2 → Bébé
- 3-12 → Enfant
- 13-17 → Adolescent
- 18-64 → Adulte
- 65+ → Senior

### Exercice 2 : Convertisseur de notes
Demandez une note sur 20. Affichez la mention correspondante :
- 0-9 → Insuffisant
- 10-11 → Passable
- 12-13 → Assez bien
- 14-15 → Bien
- 16-17 → Très bien
- 18-20 → Excellent

Utilisez `match/case` avec conditions (guard) si vous êtes en Python 3.10+.

### Exercice 3 : Calculatrice avec menu
Créez une calculatrice avec menu : 1. Addition 2. Soustraction 3. Multiplication 4. Division. Utilisez `match/case` pour la sélection. Gérez la division par zéro.

### Exercice 4 : Validateur de mot de passe
Demandez un mot de passe. Validez les règles suivantes (affichez tout ce qui ne va pas) :
- Au moins 8 caractères
- Au moins 1 chiffre
- Au moins 1 majuscule
- Au moins 1 minuscule

### Exercice 5 : Devinette améliorée
Reprenez le jeu du nombre mystère. Ajoutez :
- Un compteur de tentatives
- Un message après 3 échecs : "Indice : le nombre est pair/impair"
- Un message après 5 échecs : "Indice : le nombre est entre X et Y"
- Option "rejouer" à la fin

---

## Progression finale

```
Module 1: ✅ Introduction
Module 2: ✅ Variables et types
Module 3: ✅ Strings
Module 4: ✅ Listes et Tuples
Module 5: ✅ Dictionnaires et Ensembles
Module 6: ✅ Contrôle de flux  ← Vous êtes ici

🎉 Fin du tronc commun ! Prêt pour la suite (Fonctions, Fichiers, POO...)
```
