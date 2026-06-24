# Vidéo #27 — Tests unitaires

## Informations générales
- **Titre** : Python #27 — Tests unitaires (Formation Complète)
- **Durée** : ~15 min
- **Miniature** : `banners/27-tests-unitaires.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 27 — TESTS UNITAIRES

> "Bienvenue dans le module 27. Aujourd'hui, on parle de tests. C'est probablement le module le plus important de cette formation. Sans tests, votre code n'est pas fiable. Avec des tests, vous pouvez refactoriser en toute confiance."

---

### 0:30 — Pourquoi tester ? (1 min 30)
**Texte écran :** POURQUOI TESTER ?

> "Trois bonnes raisons d'écrire des tests :"

1. **Non-régression** — une nouvelle fonctionnalité ne casse pas l'existant
2. **Confiance** — osez refactoriser sans peur
3. **Documentation vivante** — les tests montrent comment utiliser le code

```python
# Exemple : fonction simple à tester
def addition(a, b):
    return a + b

# Sans test, on croise les doigts
resultat = addition(2, 3)  # 5 ?

# Avec test, on est sûr
assert addition(2, 3) == 5
```

> "Mais les `assert` dans le code, ce n'est pas suffisant. On a besoin d'un vrai framework de test."

---

### 2:00 — pytest vs unittest (1 min 30)
**Texte écran :** PYTEST VS UNITTEST

> "Python a `unittest` dans sa bibliothèque standard, mais `pytest` est aujourd'hui le standard de facto."

```bash
pip install pytest
```

```python
# unittest — verbeux
import unittest
class TestAddition(unittest.TestCase):
    def test_add(self):
        self.assertEqual(addition(2, 3), 5)

# pytest — simple et puissant
def test_addition():
    assert addition(2, 3) == 5
```

**Comparaison :**
- `unittest` : Java-like, beaucoup de boilerplate
- `pytest` : assert natif, fixtures, paramétrisation

> "Dans cette vidéo, on utilise pytest. C'est plus simple, plus puissant, et c'est ce qu'utilisent tous les projets modernes."

---

### 3:30 — assert simple (1 min 30)
**Texte écran :** ASSERT AVEC PYTEST

```python
# test_calculs.py
def addition(a, b):
    return a + b

def division(a, b):
    if b == 0:
        raise ValueError("Division par zéro")
    return a / b

def test_addition():
    assert addition(2, 3) == 5
    assert addition(-1, 1) == 0
    assert addition(0, 0) == 0

def test_division():
    assert division(10, 2) == 5
    assert division(7, 2) == 3.5

def test_division_par_zero():
    import pytest
    with pytest.raises(ValueError):
        division(10, 0)
```

```bash
# Lancer les tests
pytest
# ou
pytest test_calculs.py -v
```

> "Le `assert` python standard suffit. `pytest.raises()` pour les exceptions attendues."

---

### 5:00 — Fixtures (2 min)
**Texte écran :** FIXTURES

> "Les fixtures sont des fonctions qui préparent et nettoient l'environnement de test."

```python
import pytest

@pytest.fixture
def utilisateur():
    """Crée un utilisateur pour les tests."""
    return {"nom": "Alice", "age": 25, "actif": True}

@pytest.fixture
def utilisateurs():
    """Fixture avec nettoyage."""
    print("\n[Setup] Création des utilisateurs...")
    data = [
        {"nom": "Alice", "age": 25},
        {"nom": "Bob", "age": 30},
    ]
    yield data  # Donne la valeur au test
    print("[Teardown] Nettoyage...")

# Utilisation
def test_utilisateur_actif(utilisateur):
    assert utilisateur["actif"] is True

def test_ages(utilisateurs):
    assert utilisateurs[0]["age"] == 25
    assert utilisateurs[1]["age"] == 30
```

> "Les fixtures s'injectent automatiquement par nom de paramètre. Le `yield` remplace `return` quand on a besoin d'un cleanup."

---

### 7:00 — Paramétrisation (1 min 30)
**Texte écran :** PARAMÉTRISATION

```python
import pytest

def est_pair(n):
    return n % 2 == 0

@pytest.mark.parametrize("n, attendu", [
    (2, True),
    (3, False),
    (0, True),
    (-4, True),
    (7, False),
])
def test_est_pair(n, attendu):
    assert est_pair(n) == attendu

# Version plus lisible
@pytest.mark.parametrize("n", [2, 4, 6, -10])
def test_est_pair_oui(n):
    assert est_pair(n) is True

@pytest.mark.parametrize("n", [1, 3, 5, -3])
def test_est_pair_non(n):
    assert est_pair(n) is False
```

> "Avec `parametrize`, un seul test génère plusieurs cas de test. Essayez d'éviter les cas redondants."

---

### 8:30 — Monkeypatch et mocking (2 min)
**Texte écran :** MONKEYPATCH & MOCK

```python
import pytest
import requests

def obtenir_meteo(ville):
    """Récupère la météo via une API externe."""
    url = f"https://api.meteo.fr/{ville}"
    response = requests.get(url)
    return response.json()

# Pendant les tests, on ne veut pas appeler la vraie API

def test_obtenir_meteo(monkeypatch):
    class FakeResponse:
        @staticmethod
        def json():
            return {"temperature": 22, "temps": "soleil"}

    def fake_get(url):
        return FakeResponse()

    # Remplacer requests.get
    monkeypatch.setattr(requests, "get", fake_get)

    resultat = obtenir_meteo("paris")
    assert resultat["temperature"] == 22
    assert resultat["temps"] == "soleil"
```

```python
# Avec unittest.mock (plus avancé)
from unittest.mock import Mock, patch

def test_obtenir_meteo_mock():
    mock_response = Mock()
    mock_response.json.return_value = {
        "temperature": 15, "temps": "nuageux"
    }

    with patch("requests.get", return_value=mock_response):
        resultat = obtenir_meteo("lyon")
        assert resultat["temperature"] == 15
```

> "`monkeypatch` est intégré à pytest. `unittest.mock` est plus puissant pour les mocks complexes."

---

### 10:30 — Couverture de code (1 min 30)
**Texte écran :** COUVERTURE DE CODE

```bash
pip install pytest-cov
```

```bash
# Lancer avec couverture
pytest --cov=mon_projet tests/

# Rapport HTML détaillé
pytest --cov=mon_projet --cov-report=html tests/

# Afficher les lignes non couvertes
pytest --cov=mon_projet --cov-report=term-missing tests/
```

```python
# code.py
def analyser_texte(texte):
    if len(texte) == 0:
        return "vide"
    elif len(texte) < 10:
        return "court"
    else:
        return "long"

# test_code.py
def test_analyser_texte():
    assert analyser_texte("") == "vide"
    assert analyser_texte("Bonjour") == "court"
    # Oubli du cas "long" ! La couverture le montrera
```

> "La couverture mesure le pourcentage de code exécuté par les tests. Visez 80%+ mais ne sacrifiez pas la qualité pour le nombre."

---

### 12:00 — TDD (Test Driven Development) (2 min)
**Texte écran :** TDD — TEST DRIVEN DEVELOPMENT

> "Le TDD, c'est écrire les tests avant le code. Le cycle en 3 étapes :"

1. **🔴 Rouge** — écrire un test qui échoue
2. **🟢 Vert** — écrire le minimum de code pour le faire passer
3. **🔵 Refactor** — améliorer le code sans casser le test

```python
# ÉTAPE 1 : écrire le test (il échoue)
def test_convertir_romain():
    assert convertir_romain("I") == 1

# ÉTAPE 2 : code minimal
def convertir_romain(s):
    return 1  # Juste pour passer le test

# ÉTAPE 3 : ajouter un nouveau test
def test_convertir_romain_v():
    assert convertir_romain("V") == 5

# Code amélioré
def convertir_romain(s):
    valeurs = {"I": 1, "V": 5, "X": 10}
    return valeurs[s]
```

> "Le TDD force à réfléchir à l'interface avant l'implémentation. Résultat : un code mieux conçu et 100% testé."

---

### 14:00 — Bonnes pratiques (30s)
**Texte écran :** BONNES PRATIQUES

- Un test teste **une seule chose**
- Nom explicite : `test_utilisateur_peut_se_connecter`
- Isoler les tests (pas de dépendance entre eux)
- Lancer les tests régulièrement
- Git hook pré-commit pour exécuter les tests

---

### 14:30 — Conclusion
> "Module 28 : le logging et le debugging pour traquer les bugs efficacement."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 27 : Tests unitaires

Au programme :
00:00 — Introduction
00:30 — Pourquoi tester ?
02:00 — pytest vs unittest
03:30 — assert simple avec pytest
05:00 — Fixtures (setup/teardown)
07:00 — Paramétrisation (parametrize)
08:30 — Monkeypatch et mocking
10:30 — Couverture de code (pytest-cov)
12:00 — TDD (Test Driven Development)
14:00 — Bonnes pratiques
14:30 — Prochain module

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

#python #formationpython #pytest #testsunitaires #tdd #testdrivendevelopment
```

## Tags YouTube
```
python, formation python, pytest, tests unitaires, tdd, test driven development, pytest fixtures, pytest parametrize, pytest cov, unittest python, python test, cours python
```
