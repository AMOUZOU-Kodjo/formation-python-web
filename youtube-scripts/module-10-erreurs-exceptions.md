# Vidéo #10 — Gestion des erreurs et exceptions

## Informations générales
- **Titre** : Python #10 — Gestion des erreurs et exceptions (Formation Complète)
- **Durée** : ~13 min
- **Miniature** : `banners/10-erreurs-exceptions.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 10 — GESTION DES ERREURS & EXCEPTIONS

> "Bienvenue dans le module 10. Dans une application, les erreurs arrivent. Un fichier qui n'existe pas, un utilisateur qui entre du texte au lieu d'un nombre. Sans gestion d'erreurs, votre programme plante. Avec les exceptions Python, vous contrôlez ce qui se passe."

---

### 0:30 — Les erreurs en Python (1 min)
**Texte écran :** ERREURS VS EXCEPTIONS

> "Il y a deux grandes catégories en Python. Les erreurs de syntaxe, où le code ne peut même pas s'exécuter. Et les exceptions, qui surviennent pendant l'exécution."

```python
# Erreur de syntaxe — le code ne s'exécute PAS
# print("Bonjour"   # SyntaxError: missing parenthesis

# Exception — le code plante à l'exécution
print(10 / 0)       # ZeroDivisionError
```

> "Les exceptions, on peut les capturer. Les erreurs de syntaxe, non — il faut corriger le code."

---

### 1:30 — try/except : syntaxe de base (2 min)
**Texte écran :** TRY / EXCEPT

```python
try:
    age = int(input("Âge : "))
    print(f"Tu as {age} ans")
except:
    print("Erreur ! Ce n'est pas un nombre valide.")
```

> "Le bloc `try` contient le code risqué. Si une erreur se produit, Python saute dans le `except` au lieu de planter."

**Version avec type d'exception précis :**

```python
try:
    age = int(input("Âge : "))
    resultat = 10 / age
except ValueError:
    print("Ce n'est pas un nombre.")
except ZeroDivisionError:
    print("L'âge ne peut pas être zéro.")
```

> "On précise le type d'exception pour réagir différemment selon l'erreur."

---

### 3:30 — Types d'exceptions (2 min)
**Texte écran :** LES TYPES D'EXCEPTIONS

| Exception | Quand ? |
|-----------|---------|
| `ValueError` | Valeur inappropriée (ex: `int("abc")`) |
| `TypeError` | Type incompatible (ex: `"2" + 2`) |
| `ZeroDivisionError` | Division par zéro |
| `IndexError` | Index hors liste |
| `KeyError` | Clé absente d'un dictionnaire |
| `FileNotFoundError` | Fichier introuvable |
| `AttributeError` | Attribut inexistant |

```python
try:
    liste = [1, 2, 3]
    print(liste[10])
except IndexError:
    print("Index hors limite !")
```

> "Connaître ces types vous permet d'écrire des `except` précis."

---

### 5:30 — else et finally (1 min 30)
**Texte écran :** ELSE & FINALLY

```python
try:
    fichier = open("data.txt")
    contenu = fichier.read()
except FileNotFoundError:
    print("Fichier introuvable.")
else:
    print("Lecture réussie !")
    print(contenu)
finally:
    print("Fermeture du fichier.")
    fichier.close()
```

> "`else` s'exécute si aucune erreur. `finally` s'exécute **toujours**, qu'il y ait une erreur ou non. Idéal pour le nettoyage."

---

### 7:00 — Lever des exceptions avec raise (1 min 30)
**Texte écran :** LEVER UNE EXCEPTION AVEC RAISE

```python
def valider_age(age):
    if age < 0:
        raise ValueError("L'âge ne peut pas être négatif.")
    if age > 150:
        raise ValueError("Cet âge semble irréaliste.")
    return f"Âge valide : {age}"

try:
    print(valider_age(-5))
except ValueError as e:
    print(f"Erreur : {e}")
```

> "Avec `raise`, vous décidez quand votre code doit échouer. Utile pour signaler des données invalides."

**Analogie :** "Quand vous créez une fonction, c'est vous qui définissez les règles. Si quelqu'un les enfreint, vous levez une exception."

---

### 8:30 — Créer ses propres exceptions (2 min)
**Texte écran :** EXCEPTIONS PERSONNALISÉES

```python
class ErreurSoldeInsuffisant(Exception):
    pass

class CompteBancaire:
    def __init__(self, solde):
        self.solde = solde

    def retirer(self, montant):
        if montant > self.solde:
            raise ErreurSoldeInsuffisant(
                f"Solde insuffisant : {self.solde}€"
            )
        self.solde -= montant

compte = CompteBancaire(100)
try:
    compte.retirer(200)
except ErreurSoldeInsuffisant as e:
    print(e)
```

> "On crée une classe qui hérite de `Exception`. Ça rend le code plus clair et les erreurs plus explicites."

---

### 10:30 — Bonnes pratiques (2 min)
**Texte écran :** BONNES PRATIQUES

```python
# ❌ À ÉVITER — trop large
try:
    # code risqué
    pass
except:
    pass  # On ignore TOUTES les erreurs

# ✅ Capturer des exceptions spécifiques
try:
    age = int(input("Âge : "))
except ValueError:
    print("Nombre invalide.")

# ❌ Ne pas capturer et ne rien faire
try:
    fonction_risquee()
except:
    pass  # L'erreur est silencieuse — mauvais !

# ✅ Capturer l'exception pour la logguer
import logging

try:
    fonction_risquee()
except Exception as e:
    logging.error(f"Erreur inattendue : {e}")
    raise  # On relance si on ne peut pas gérer
```

> "Règle d'or : soyez spécifiques, ne capturez pas `Exception` trop largement, et ne masquez jamais les erreurs en silence."

---

### 12:30 — Conclusion
> "Module 11 : on découvre les modules et packages pour mieux organiser votre code."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 10 : Gestion des erreurs et exceptions

Au programme :
00:00 — Introduction
00:30 — Erreurs vs exceptions
01:30 — try/except : syntaxe de base
03:30 — Types d'exceptions
05:30 — else et finally
07:00 — Lever des exceptions avec raise
08:30 — Créer ses propres exceptions
10:30 — Bonnes pratiques
12:30 — Prochain module

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

#python #formationpython #exceptions #tryexcept #gestionderreurs
```

## Tags YouTube
```
python, formation python, apprendre python, cours python, python débutant, programmation python, python complet, python de a à z, python 2026, tutoriel python, exceptions python, try except python, gestion d'erreurs python, raise python
```
