# Module 10 : Gestion des erreurs (Exceptions)

**Objectifs pédagogiques :**
- Comprendre ce qu'est une exception et la hiérarchie des erreurs
- Maîtriser `try / except / else / finally`
- Lever des exceptions avec `raise`
- Créer des exceptions personnalisées
- Appliquer les bonnes pratiques de gestion d'erreurs
- Utiliser les assertions et le context manager `with`

---

## 1. Qu'est-ce qu'une exception ?

### 1.1 Définition

Une **exception** est une erreur qui survient pendant l'exécution du programme. Quand une exception est levée et non gérée, le programme s'arrête brutalement.

**Analogie :** C'est comme un feu d'alarme dans un bâtiment. L'alarme (exception) se déclenche quand il y a un problème. Soit quelqu'un (le gestionnaire) traite le problème et le bâtiment continue de fonctionner, soit personne n'intervient et tout le monde évacue (le programme plante).

```python
# Exemples d'exceptions courantes
# print(1 / 0)       # ZeroDivisionError: division by zero
# int("abc")         # ValueError: invalid literal for int()
# [1, 2][5]          # IndexError: list index out of range
# {}["clé"]          # KeyError: 'clé'
# print(x)           # NameError: name 'x' is not defined
```

### 1.2 La hiérarchie des exceptions

Toutes les exceptions héritent de `BaseException`.

```
BaseException
 ├── SystemExit          # sys.exit()
 ├── KeyboardInterrupt   # Ctrl+C
 └── Exception           # ← La plupart des erreurs
      ├── AttributeError
      ├── ImportError
      │    └── ModuleNotFoundError
      ├── LookupError
      │    ├── IndexError
      │    └── KeyError
      ├── NameError
      │    └── UnboundLocalError
      ├── OSError
      │    └── FileNotFoundError
      ├── ValueError
      ├── TypeError
      ├── ZeroDivisionError
      └── RuntimeError
           └── RecursionError
```

> **Règle fondamentale :** Attrapez toujours l'exception la plus **spécifique** possible. Ne jamais faire `except:` ou `except Exception:` sans raison.

---

## 2. `try / except` — capturer les exceptions

### 2.1 Structure de base

```python
try:
    nombre = int(input("Entrez un nombre : "))
    resultat = 10 / nombre
    print(f"10 / {nombre} = {resultat}")
except ValueError:
    print("Erreur : ce n'est pas un nombre entier valide.")
except ZeroDivisionError:
    print("Erreur : division par zéro impossible.")
```

### 2.2 Capturer plusieurs exceptions sur une ligne

```python
try:
    valeur = input("Entrez un nombre : ")
    nombre = int(valeur)
    print(100 / nombre)
except (ValueError, ZeroDivisionError) as e:
    print(f"Erreur de saisie : {e}")
```

### 2.3 Accéder au message d'erreur avec `as`

Le mot-clé `as` permet de récupérer l'objet exception et son message.

```python
try:
    fichier = open("donnees_inexistant.txt", "r")
except FileNotFoundError as e:
    print(f"Type : {type(e).__name__}")
    print(f"Message : {e}")
    print(f"Numéro d'erreur : {e.errno}")
```

---

## 3. `else` et `finally` — affiner la gestion

### 3.1 `else` — exécuté si aucune exception

Le bloc `else` s'exécute **uniquement** si `try` n'a levé aucune exception.

```python
try:
    fichier = open("data.txt", "r")
except FileNotFoundError:
    print("Fichier introuvable.")
else:
    print("Fichier ouvert avec succès.")
    contenu = fichier.read()
    print(contenu[:50])  # affiche les 50 premiers caractères
```

### 3.2 `finally` — toujours exécuté

Le bloc `finally` s'exécute **dans tous les cas** : que `try` réussisse, qu'une exception soit capturée ou non, même si un `return` ou `break` est présent.

```python
fichier = None
try:
    fichier = open("data.txt", "r")
    contenu = fichier.read()
except FileNotFoundError:
    print("Fichier introuvable.")
finally:
    if fichier:
        fichier.close()  # fermeture garantie
        print("Fichier fermé.")
```

### 3.3 Ordre complet

```python
try:
    # Code risqué
    print(10 / 2)
except ZeroDivisionError:
    # Gère l'erreur spécifique
    print("Division par zéro")
else:
    # Exécuté si PAS d'erreur
    print("Tout s'est bien passé")
finally:
    # Toujours exécuté
    print("Nettoyage final")
# → 5.0
# → Tout s'est bien passé
# → Nettoyage final
```

---

## 4. `raise` — lever des exceptions volontairement

### 4.1 Principe

On utilise `raise` pour signaler qu'une erreur s'est produite.

```python
def diviser(a, b):
    if b == 0:
        raise ValueError("Le diviseur ne peut pas être zéro.")
    return a / b

# Utilisation
try:
    print(diviser(10, 0))
except ValueError as e:
    print(f"Erreur : {e}")
```

### 4.2 Propager une exception (re-raise)

```python
def lire_fichier_securise(chemin):
    try:
        with open(chemin, "r") as f:
            return f.read()
    except FileNotFoundError:
        print(f"Le fichier {chemin} n'existe pas.")
        raise  # propage l'exception inchangée

# Ou relancer avec plus de contexte (chaînage)
def traiter_donnees(chemin):
    try:
        data = lire_fichier_securise(chemin)
        return int(data)
    except FileNotFoundError as e:
        raise RuntimeError("Impossible de traiter le fichier") from e
```

### 4.3 Chaînage d'exceptions (`raise ... from`)

Le mot-clé `from` permet de chaîner deux exceptions, en conservant la trace de l'originale.

```python
try:
    result = int("abc")
except ValueError as e:
    raise RuntimeError("Échec de conversion") from e
# → RuntimeError: Échec de conversion
# → Caused by: ValueError: invalid literal for int() with base 10: 'abc'
```

> **Bonnes pratiques :** Utilisez `raise ... from e` quand vous transformez une exception en une autre tout en préservant la cause initiale pour le débogage.

---

## 5. Exceptions personnalisées

### 5.1 Créer sa propre classe d'exception

```python
class CompteError(Exception):
    """Exception de base pour les erreurs de compte bancaire."""
    pass

class SoldeInsuffisantError(CompteError):
    """Levée quand le solde est insuffisant."""
    pass

class MontantInvalideError(CompteError):
    """Levée quand le montant est négatif ou nul."""
    pass
```

### 5.2 Utilisation

```python
class CompteBancaire:
    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self.solde = solde

    def retrait(self, montant):
        if montant <= 0:
            raise MontantInvalideError("Le montant doit être positif.")
        if montant > self.solde:
            raise SoldeInsuffisantError(
                f"Solde insuffisant : {self.solde}€ demandé : {montant}€"
            )
        self.solde -= montant
        return self.solde

# Test
compte = CompteBancaire("Alice", 100)
try:
    compte.retrait(150)
except SoldeInsuffisantError as e:
    print(e)
except MontantInvalideError as e:
    print(e)
except CompteError as e:
    print(f"Erreur de compte : {e}")
```

### 5.3 Ajouter des attributs à une exception personnalisée

```python
class NoteError(Exception):
    def __init__(self, note, message="Note invalide"):
        self.note = note
        self.message = f"{message} : {note}"
        super().__init__(self.message)

def verifier_note(note):
    if not (0 <= note <= 20):
        raise NoteError(note)
    return note

try:
    verifier_note(25)
except NoteError as e:
    print(f"Erreur : {e} (note reçue : {e.note})")
```

---

## 6. Assertions — `assert`

`assert` est un outil de débogage qui lève `AssertionError` si la condition est fausse.

```python
def calculer_moyenne(notes):
    assert len(notes) > 0, "La liste de notes ne peut pas être vide"
    assert all(0 <= n <= 20 for n in notes), "Notes hors limites"
    return sum(notes) / len(notes)

# En production, les assertions peuvent être désactivées avec `python -O`
# Ne JAMAIS utiliser assert pour la validation de données utilisateur !
# Utilisez plutôt if + raise ValueError(...)
```

> **Piège :** Les assertions sont désactivées en mode optimisé (`-O`). Ne les utilisez jamais pour la validation de sécurité ou de données utilisateur.

---

## 7. Bonnes pratiques de gestion d'erreurs

### 7.1 À faire ✅

1. **Capturer les exceptions spécifiques** — évitez les `except:` nus
2. **Utiliser `with` pour les ressources** — fermeture automatique
3. **Limiter la portée du `try`** — ne mettez que le code risqué dedans
4. **Propagez quand vous ne pouvez pas gérer** — `raise` sans argument
5. **Documenter les exceptions** dans les docstrings
6. **Logger les erreurs** plutôt que `print()` en production

### 7.2 À éviter ❌

```python
# MAUVAIS : except nu (attrape tout, même KeyboardInterrupt)
try:
    risque()
except:
    print("Erreur")

# MAUVAIS : except Exception trop large
try:
    conversion = int(entree)
except Exception:
    print("Ça n'a pas marché")

# MAUVAIS : except sans action (pass)
try:
    operation_risquee()
except ValueError:
    pass  # ← l'erreur est ignorée silencieusement !

# MAUVAIS : trop de code dans le try
try:
    fichier = open("data.txt")
    contenu = fichier.read()
    resultat = int(contenu)
    traitement(resultat)
except FileNotFoundError:
    print("Fichier manquant")
# Si int() échoue, on obtient ValueError, pas FileNotFoundError
# Divisez les opérations en plusieurs try/except
```

### 7.3 Le contexte `with` (context manager)

`with` garantit le nettoyage des ressources, même en cas d'erreur.

```python
# Sans with (fermeture manuelle)
f = open("fichier.txt", "w")
try:
    f.write("Données importantes")
finally:
    f.close()

# Avec with (automatique, recommandé)
with open("fichier.txt", "w") as f:
    f.write("Données importantes")
# Fermeture garantie quoi qu'il arrive
```

```python
# Contexte multiple
with open("source.txt", "r") as src, open("dest.txt", "w") as dst:
    for ligne in src:
        dst.write(ligne.upper())
```

---

## 8. Résumé

| Outil | Rôle |
|---|---|
| `try` | Bloc de code à surveiller |
| `except` | Gestion des erreurs spécifiques |
| `else` | Exécuté si aucune erreur |
| `finally` | Toujours exécuté (nettoyage) |
| `raise` | Lever une exception |
| `raise ... from` | Chaîner des exceptions |
| `assert` | Vérification de débogage |
| `with` | Context manager (fermeture automatique) |

- **Spécificité** : Capturer les exceptions les plus précises possibles
- **Propagez** quand vous ne pouvez pas gérer l'erreur
- **Soyez explicite** : ne masquez pas les erreurs silencieusement
- **Utilisez `with`** pour les fichiers, connexions, verrous

---

## 9. Exercices

**Exercice 1 :** Écrire une fonction `saisie_entier(message)` qui demande à l'utilisateur un entier et le retourne. En cas d'erreur, elle redemande jusqu'à obtenir une valeur valide.

**Exercice 2 :** Créer une classe `AgeError` (exception personnalisée) et une fonction `verifier_age(age)` qui lève cette exception si l'âge n'est pas entre 0 et 150. Tester.

**Exercice 3 :** Écrire une fonction `division_securisee(a, b)` qui retourne le résultat de `a / b` ou `None` en cas d'erreur, en affichant la cause.

**Exercice 4 :** Implémenter une fonction `ouvrir_fichier(chemin)` qui utilise `try/except/finally` pour garantir la fermeture, avec gestion de `FileNotFoundError` et `PermissionError`.

**Exercice 5 (défi) :** Créer une mini-calculatrice en ligne de commande qui gère : les entrées non numériques (ValueError), la division par zéro, et un calcul infini jusqu'à ce que l'utilisateur tape "quit".
