# Module 8 : Fonctions

**Objectifs pédagogiques :**
- Définir et appeler des fonctions
- Maîtriser les différents types de paramètres
- Comprendre la portée des variables (LEGB)
- Écrire des docstrings professionnelles
- Utiliser les fonctions comme objets
- Découvrir les fonctions imbriquées et closures

---

## 1. Définition et appel de base

### 1.1 Structure d'une fonction

Une fonction est un bloc de code réutilisable qui prend des entrées, produit une sortie, et évite la répétition.

**Analogie :** Une fonction est comme une machine à café : vous mettez des grains et de l'eau (paramètres), elle réalise des opérations, et produit un café (résultat).

```python
# Syntaxe de base
def saluer():
    """Affiche un message de bienvenue."""
    print("Bonjour et bienvenue !")

# Appel
saluer()
# → Bonjour et bienvenue !
```

### 1.2 Paramètres et arguments

Les paramètres sont les variables définies dans la fonction ; les arguments sont les valeurs passées à l'appel.

```python
# Fonction avec paramètre
def saluer_utilisateur(nom):
    print(f"Bonjour {nom} !")

saluer_utilisateur("Alice")  # "Alice" est l'argument
# → Bonjour Alice !
```

### 1.3 `return` — la valeur de retour

Sans `return`, une fonction renvoie `None` implicitement.

```python
# Fonction qui retourne une valeur
def carre(x):
    return x * x

resultat = carre(5)
print(resultat)
# → 25

# Retour multiple (tuple dépaqueté)
def division(a, b):
    quotient = a // b
    reste = a % b
    return quotient, reste  # retourne un tuple (q, r)

q, r = division(17, 5)
print(f"Quotient : {q}, Reste : {r}")
# → Quotient : 3, Reste : 2
```

```python
# Retour conditionnel
def note_mention(note):
    if note >= 18:
        return "Excellent"
    elif note >= 14:
        return "Très bien"
    elif note >= 10:
        return "Passable"
    else:
        return "Échec"

print(note_mention(15))
# → Très bien
```

> **Piège :** Un `return` sans valeur ou une fonction sans `return` retourne `None`. Vérifiez toujours ce que votre fonction retourne (ou affiche) !

---

## 2. Les différents types de paramètres

### 2.1 Paramètres par défaut

```python
def saluer(nom, message="Bonjour"):
    print(f"{message}, {nom} !")

saluer("Alice")
# → Bonjour, Alice !
saluer("Alice", "Salut")
# → Salut, Alice !
```

> **Piège important :** Les valeurs par défaut sont évaluées UNE SEULE fois au moment de la définition, pas à chaque appel !

```python
# MAUVAIS : valeur par défaut mutable
def ajouter_element(element, liste=[]):
    liste.append(element)
    return liste

print(ajouter_element(1))  # → [1]
print(ajouter_element(2))  # → [1, 2]  ← SURPRISE ! la liste persiste

# BON : utiliser None et créer la liste à l'intérieur
def ajouter_element(element, liste=None):
    if liste is None:
        liste = []
    liste.append(element)
    return liste

print(ajouter_element(1))  # → [1]
print(ajouter_element(2))  # → [2]  ← correct
```

### 2.2 Arguments positionnels et nommés

```python
def profil(nom, age, ville):
    print(f"{nom}, {age} ans, {ville}")

# Appel positionnel (l'ordre compte)
profil("Alice", 25, "Paris")

# Appel nommé (l'ordre ne compte plus)
profil(age=25, ville="Paris", nom="Alice")

# Mélange (positionnels d'abord, nommés ensuite)
profil("Alice", ville="Paris", age=25)
```

### 2.3 `*args` — nombre variable d'arguments positionnels

`*args` capte tous les arguments positionnels supplémentaires dans un tuple.

```python
def somme(*nombres):
    print(f"Type : {type(nombres)}")  # <class 'tuple'>
    return sum(nombres)

print(somme(1, 2, 3))       # → 6
print(somme(1, 2, 3, 4, 5))  # → 15

# Autre exemple
def afficher_eleves(classe, *eleves):
    print(f"Classe {classe} :")
    for eleve in eleves:
        print(f"  - {eleve}")

afficher_eleves("1A", "Alice", "Bob", "Charlie")
# → Classe 1A :
# →   - Alice
# →   - Bob
# →   - Charlie
```

### 2.4 `**kwargs` — nombre variable d'arguments nommés

`**kwargs` capte tous les arguments nommés supplémentaires dans un dictionnaire.

```python
def afficher_profil(**infos):
    print(f"Type : {type(infos)}")  # <class 'dict'>
    for cle, valeur in infos.items():
        print(f"{cle}: {valeur}")

afficher_profil(nom="Alice", age=25, ville="Paris", metier="Dev")
# → nom: Alice
# → age: 25
# → ville: Paris
# → metier: Dev
```

### 2.5 Combinaison de tous les types

```python
def fonction_complexe(a, b, c="defaut", *args, **kwargs):
    print(f"a={a}, b={b}, c={c}")
    print(f"args={args}")
    print(f"kwargs={kwargs}")

fonction_complexe(1, 2, 3, 4, 5, x=10, y=20)
# → a=1, b=2, c=3
# → args=(4, 5)
# → kwargs={'x': 10, 'y': 20}
```

**Ordre obligatoire :** `paramètres`, `*args`, `paramètres_nommés`, `**kwargs`

---

## 3. Annotations de type (type hints)

Les annotations documentent le type attendu et sont vérifiables avec `mypy`.

```python
def calculer_imc(poids: float, taille: float) -> float:
    """Calcule l'IMC."""
    return poids / (taille ** 2)

print(calculer_imc(70, 1.75))
# → 22.86

# Annotations sur des types complexes
from typing import List, Dict, Optional, Union

def traiter_donnees(valeurs: List[int]) -> Dict[str, Union[int, float]]:
    return {
        "somme": sum(valeurs),
        "moyenne": sum(valeurs) / len(valeurs),
    }

# Optional : paramètre pouvant être None
def trouver_eleve(nom: str, notes: Optional[List[int]] = None) -> str:
    if notes is None:
        return f"{nom} : pas de notes"
    return f"{nom} : {sum(notes)/len(notes):.1f}"
```

> **À retenir :** Les annotations sont optionnelles et non vérifiées par Python lui-même (contrairement à Java ou TypeScript). Utilisez `mypy` pour la vérification statique.

---

## 4. Portée des variables — Règle LEGB

### 4.1 Les 4 niveaux de portée

Quand Python cherche une variable, il suit l'ordre **LEGB** :

| Niveau | Sigle | Signification |
|---|---|---|
| **L**ocal | `L` | Dans la fonction courante |
| **E**nclosing | `E` | Dans les fonctions englobantes |
| **G**lobal | `G` | Dans le module |
| **B**uilt-in | `B` | Fonctions natives (`print`, `len`…) |

```python
x = "globale"          # Global (G)

def externe():
    x = "enclosing"    # Enclosing (E)

    def interne():
        x = "locale"   # Local (L)
        print(x)

    interne()
    print(x)

externe()
print(x)
# → locale
# → enclosing
# → globale
```

### 4.2 Modifier les variables des portées supérieures

```python
x = 10  # globale

def modifier():
    global x  # déclare qu'on utilise la variable globale
    x = 20

modifier()
print(x)
# → 20  (la variable globale a été modifiée)
```

```python
# Avec fonctions imbriquées (nonlocal)
def compteur():
    n = 0

    def incrementer():
        nonlocal n  # variable de la portée englobante
        n += 1
        return n

    return incrementer

c = compteur()
print(c())  # → 1
print(c())  # → 2
print(c())  # → 3
```

> **Piège courant :** Si vous assignez une variable dans une fonction, elle est **locale** par défaut. `global` ou `nonlocal` sont nécessaires pour modifier une variable des portées supérieures.

```python
# Erreur fréquente
x = 10
def fonction():
    print(x)   # erreur ! x est considéré local
    x = 5      # car on l'assigne ici

# UnboundLocalError: local variable 'x' referenced before assignment
```

---

## 5. Fonctions comme objets

### 5.1 Les fonctions sont des citoyens de première classe

En Python, les fonctions sont des **objets** : on peut les stocker, les passer en argument, les retourner.

```python
# Affecter une fonction à une variable
def dire_bonjour():
    return "Bonjour !"

saluer = dire_bonjour  # pas de parenthèses → on ne l'appelle pas
print(saluer())        # on appelle via la variable
# → Bonjour !

# Passer une fonction en argument
def appliquer(fonction, valeur):
    return fonction(valeur)

def double(x):
    return x * 2

print(appliquer(double, 5))
# → 10
```

### 5.2 Fonctions imbriquées

```python
def fabriquer_multiplicateur(facteur):
    """Retourne une fonction qui multiplie par facteur."""
    def multiplier(x):
        return x * facteur
    return multiplier

double = fabriquer_multiplicateur(2)
triple = fabriquer_multiplicateur(3)

print(double(10))  # → 20
print(triple(10))  # → 30
```

### 5.3 Closures

Une **closure** est une fonction imbriquée qui mémorise l'état de son environnement même après la fin de la fonction externe.

```python
def creer_compteur(initial=0):
    compteur = [initial]  # mutable → on peut le modifier

    def incrementer(pas=1):
        compteur[0] += pas
        return compteur[0]

    return incrementer

compteur1 = creer_compteur(10)
compteur2 = creer_compteur(0)

print(compteur1())     # → 11
print(compteur1(5))    # → 16
print(compteur2())     # → 1  (compteur indépendant)
print(compteur2(10))   # → 11
```

### 5.4 Lambda (fonctions anonymes)

Les **lambda** sont des fonctions sans nom, utiles pour des opérations simples.

```python
# Lambda en une ligne : lambda paramètres: expression
carre = lambda x: x * x
print(carre(5))
# → 25

# Usage typique : avec sorted, filter, map
etudiants = [
    ("Alice", 15),
    ("Bob", 12),
    ("Charlie", 18),
]
tries = sorted(etudiants, key=lambda e: e[1], reverse=True)
print(tries)
# → [('Charlie', 18), ('Alice', 15), ('Bob', 12)]
```

> **À retenir :** Préférez une fonction `def` nommée dès que le code devient complexe. Les lambda sont réservées aux cas simples et courts.

---

## 6. Docstrings — documenter vos fonctions

Une **docstring** (chaîne de documentation) explique ce que fait la fonction.

```python
def calculer_moyenne(notes: list) -> float:
    """
    Calcule la moyenne d'une liste de notes.

    Args:
        notes: Liste de nombres (int ou float)

    Returns:
        La moyenne des notes

    Raises:
        ValueError: Si la liste est vide

    Example:
        >>> calculer_moyenne([12, 15, 18])
        15.0
    """
    if not notes:
        raise ValueError("La liste de notes est vide")
    return sum(notes) / len(notes)
```

```python
# Accéder à la docstring
print(calculer_moyenne.__doc__)
# help(calculer_moyenne)  # interface interactive
```

> **Convention :** Utilisez le format **Google** (exemple ci-dessus), **NumPy/SciPy**, ou **Sphinx (reStructuredText)** selon votre projet.

---

## 7. Résumé

- Une fonction se définit avec `def nom(parametres):`
- Paramètres par défaut : `def f(x=5):` — attention aux mutables !
- `*args` capture les arguments positionnels supplémentaires (tuple)
- `**kwargs` capture les arguments nommés supplémentaires (dict)
- Portée LEGB : Local → Enclosing → Global → Built-in
- `global` et `nonlocal` pour modifier les portées supérieures
- Les fonctions sont des objets : on peut les passer, les retourner, les stocker
- Une closure est une fonction qui mémorise son environnement
- Toujours documenter avec des docstrings

---

## 8. Exercices

**Exercice 1 :** Écrire une fonction `est_pair(n)` qui retourne `True` si `n` est pair, `False` sinon.

**Exercice 2 :** Écrire une fonction `factorielle(n)` qui calcule la factorielle de n (sans utiliser `math.factorial`).

**Exercice 3 :** Écrire une fonction `appliquer_operation(operation, a, b)` qui prend une fonction en paramètre et deux nombres. Tester avec addition, multiplication, puissance.

**Exercice 4 :** Une fonction `compteur_mots(texte, *mots_a_compter)` qui retourne un dictionnaire du nombre d'occurrences de chaque mot recherché.

**Exercice 5 :** Créer une closure `fabriquer_puissance(exp)` qui retourne une fonction `puissance(n)` calculant `n^exp`.

**Exercice 6 (défi) :** Écrire une fonction `chronometre(fonction)` qui mesure et affiche le temps d'exécution d'une fonction passée en argument. Tester avec une fonction de calcul lent.
