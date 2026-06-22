# Module 27 : Tests unitaires

**Objectifs pédagogiques**
- Comprendre pourquoi les tests sont essentiels au développement
- Maîtriser le cycle TDD : Red → Green → Refactor
- Écrire et exécuter des tests avec `pytest` (recommandé) et `unittest`
- Utiliser les fixtures, la paramétrisation, et `conftest.py`
- Simuler des dépendances avec `unittest.mock` (Mock, patch, side_effect, spec)
- Mesurer la couverture de code avec `coverage.py`
- Utiliser `tmp_path` et `monkeypatch` de pytest

---

## Partie 1 : Pourquoi tester ?

### 1.1 Les bénéfices des tests

Les tests ne sont pas une perte de temps : ils sont un **investissement**.

```python
# Sans tests :
def calculer_prix(prix_ht, tva=0.20):
    return prix_ht * (1 + tva)

# Comment être sûr que ça marche ?
# → On teste manuellement... puis on oublie
# → Un mois plus tard, quelqu'un modifie la fonction
# → Rien ne nous prévient si elle casse

# Avec tests :
def test_calculer_prix():
    assert calculer_prix(100) == 120.0
    assert calculer_prix(100, 0.10) == 110.0
    assert calculer_prix(0) == 0.0
```

**Trois raisons principales :**
1. **Détection des régressions :** une modification qui casse quelque chose est détectée immédiatement
2. **Documentation vivante :** les tests montrent comment le code est censé fonctionner
3. **Confiance pour refactorer :** on peut réorganiser le code sans peur de tout casser

---

## Partie 2 : TDD — Test Driven Development

Le TDD suit un cycle en 3 étapes : **Red → Green → Refactor**.

### 2.1 Le cycle

```
1. RED    → Écrire un test qui échoue (la fonctionnalité n'existe pas encore)
2. GREEN  → Écrire le minimum de code pour faire passer le test
3. REFACTOR → Améliorer le code sans casser les tests
```

### 2.2 Exemple concret

**Étape 1 — RED :** Écrire le test d'abord

```python
# test_fizzbuzz.py
def test_fizzbuzz():
    assert fizzbuzz(1) == "1"
    assert fizzbuzz(3) == "Fizz"
    assert fizzbuzz(5) == "Buzz"
    assert fizzbuzz(15) == "FizzBuzz"
```

→ `pytest test_fizzbuzz.py` échoue : `NameError: name 'fizzbuzz' is not defined`

**Étape 2 — GREEN :** Écrire le minimum pour que ça passe

```python
def fizzbuzz(n):
    if n % 15 == 0:
        return "FizzBuzz"
    if n % 3 == 0:
        return "Fizz"
    if n % 5 == 0:
        return "Buzz"
    return str(n)
```

→ `pytest test_fizzbuzz.py` passe ✓

**Étape 3 — REFACTOR :** Améliorer sans casser

```python
def fizzbuzz(n):
    resultat = ""
    if n % 3 == 0:
        resultat += "Fizz"
    if n % 5 == 0:
        resultat += "Buzz"
    return resultat or str(n)
```

→ `pytest test_fizzbuzz.py` passe toujours ✓

**À retenir :** Le TDD force à réfléchir au **comportement attendu** avant d'écrire le code. On se concentre sur le **quoi** plutôt que le **comment**.

---

## Partie 3 : pytest — Le framework de test recommandé

### 3.1 Installation et premier test

```bash
pip install pytest
```

```python
# test_calculs.py
def addition(a, b):
    return a + b

def test_addition():
    assert addition(2, 3) == 5
    assert addition(-1, 1) == 0
    assert addition(0, 0) == 0
    assert addition(2.5, 3.5) == 6.0
```

```bash
# Lancer les tests
pytest
# → 1 passed in 0.02s

# Mode verbeux
pytest -v
# → test_calculs.py::test_addition PASSED

# Un fichier spécifique
pytest test_calculs.py

# Filtrer par nom de test
pytest -k "addition"
```

**Piège :** Le nom du fichier doit commencer ou finir par `test_` (ex: `test_*.py` ou `*_test.py`). Sinon, pytest ne le trouve pas.

### 3.2 Assertions avancées

```python
def test_assertions():
    # Égalité
    assert 2 + 2 == 4

    # Approximation pour les flottants
    assert 0.1 + 0.2 == pytest.approx(0.3)

    # Collections
    assert [1, 2, 3] == [1, 2, 3]
    assert 3 in [1, 2, 3]
    assert {"a": 1}.items() <= {"a": 1, "b": 2}.items()  # sous-dictionnaire

    # Exceptions
    with pytest.raises(ZeroDivisionError):
        1 / 0

    # Message d'erreur
    with pytest.raises(ValueError, match="invalide"):
        int("abc")
```

### 3.3 Fixtures — Préparer le contexte de test

Les **fixtures** permettent de préparer des données/dépendances avant chaque test et de les nettoyer après.

```python
import pytest

# Fixture de base
@pytest.fixture
def base_de_donnees():
    """Crée une BDD en mémoire pour les tests."""
    print("\n[Setup] Création de la BDD")
    db = {"utilisateurs": []}

    # yield = donne la fixture au test, puis reprend après
    yield db

    # Nettoyage après le test
    print("[Teardown] Fermeture de la BDD")
    db.clear()


def test_ajout_utilisateur(base_de_donnees):
    base_de_donnees["utilisateurs"].append("Alice")
    assert len(base_de_donnees["utilisateurs"]) == 1

def test_suppression_utilisateur(base_de_donnees):
    base_de_donnees["utilisateurs"].append("Bob")
    base_de_donnees["utilisateurs"].remove("Bob")
    assert len(base_de_donnees["utilisateurs"]) == 0
```

**Scope des fixtures (portée) :**

```python
@pytest.fixture(scope="function")   # Par défaut : créée à chaque test
@pytest.fixture(scope="class")      # Une fois par classe
@pytest.fixture(scope="module")     # Une fois par module
@pytest.fixture(scope="session")    # Une fois pour toute la session de test
```

**Résultat attendu avec `scope="session"` :**
- La fixture est créée **une seule fois** et partagée entre tous les tests
- Utile pour des ressources coûteuses (connexion BDD, chargement de fichiers)

### 3.4 Paramétrisation — Tester plusieurs cas

```python
@pytest.mark.parametrize("a, b, attendu", [
    (2, 3, 5),
    (-1, 1, 0),
    (0, 0, 0),
    (2.5, 3.5, 6.0),
    (100, 200, 300),
])
def test_addition_multiple(a, b, attendu):
    assert addition(a, b) == attendu
```

Sans paramétrisation, on aurait dû écrire 5 tests séparés (ou 5 assertions dans un seul test, ce qui ne dit pas lequel échoue).

**Résultat :**
```
test_calculs.py::test_addition_multiple[2-3-5] PASSED
test_calculs.py::test_addition_multiple[-1-1-0] PASSED
test_calculs.py::test_addition_multiple[0-0-0] PASSED
test_calculs.py::test_addition_multiple[2.5-3.5-6.0] PASSED
test_calculs.py::test_addition_multiple[100-200-300] PASSED
```

### 3.5 conftest.py — Partage des fixtures

Le fichier `conftest.py` est automatiquement chargé par pytest. Il permet de partager des fixtures entre plusieurs fichiers de test.

```
mon_projet/
  tests/
    conftest.py          # Fixtures partagées
    test_utilisateurs.py
    test_produits.py
```

```python
# tests/conftest.py
import pytest

@pytest.fixture
def client_api():
    """Fixture partagée par tous les tests du dossier tests/."""
    print("Connexion à l'API de test")
    yield {"base_url": "https://api.test.com"}
    print("Déconnexion")

@pytest.fixture
def jeu_de_donnees():
    return [
        {"id": 1, "nom": "Alice"},
        {"id": 2, "nom": "Bob"},
        {"id": 3, "nom": "Charlie"},
    ]
```

```python
# tests/test_utilisateurs.py
def test_trouver_utilisateur(client_api, jeu_de_donnees):
    utilisateurs = [u for u in jeu_de_donnees if u["nom"] == "Alice"]
    assert len(utilisateurs) == 1
    assert utilisateurs[0]["id"] == 1
```

### 3.6 tmp_path — Fichiers temporaires

```python
def test_ecrire_fichier(tmp_path):
    # tmp_path est un Path temporaire, unique par test
    fichier = tmp_path / "donnees.txt"
    fichier.write_text("Hello, World!")

    assert fichier.exists()
    assert fichier.read_text() == "Hello, World!"

    # Le dossier est automatiquement supprimé après le test
```

### 3.7 monkeypatch — Modifier l'environnement

```python
import os

def obtenir_api_key():
    api_key = os.environ.get("API_KEY")
    if not api_key:
        raise ValueError("API_KEY non définie")
    return api_key

def test_obtenir_api_key(monkeypatch):
    # Simuler une variable d'environnement
    monkeypatch.setenv("API_KEY", "test-key-123")
    assert obtenir_api_key() == "test-key-123"

def test_obtenir_api_key_manquante(monkeypatch):
    # Supprimer la variable
    monkeypatch.delenv("API_KEY", raising=False)
    with pytest.raises(ValueError, match="non définie"):
        obtenir_api_key()
```

---

## Partie 4 : unittest — La bibliothèque standard

`unittest` est inclus dans Python. Moins concis que pytest, mais utile quand pytest n'est pas disponible ou dans des projets legacy.

```python
import unittest

def addition(a, b):
    return a + b

class TestCalculs(unittest.TestCase):

    def setUp(self):
        """Appelé AVANT chaque test."""
        self.data = [1, 2, 3]

    def tearDown(self):
        """Appelé APRÈS chaque test (nettoyage)."""
        self.data = None

    def test_addition(self):
        self.assertEqual(addition(2, 3), 5)
        self.assertNotEqual(addition(2, 2), 5)

    def test_type_error(self):
        with self.assertRaises(TypeError):
            addition("a", 1)

    def test_dans_liste(self):
        self.assertIn(2, self.data)

if __name__ == "__main__":
    unittest.main()
```

```bash
python -m unittest test_calculs.py
python -m unittest discover  # Trouve tous les tests automatiquement
```

**Différence clé :** `unittest` nécessite des classes, `setUp`/`tearDown`, et des méthodes `assert*`. pytest est plus léger (simples fonctions, `assert` natif).

---

## Partie 5 : Mocking — Simuler les dépendances

### 5.1 Pourquoi mocker ?

Quand on teste une fonction, on ne veut pas dépendre de l'extérieur (API, BDD, fichiers). On **simule** ces dépendances.

```python
# Code à tester
import requests

def obtenir_meteo(ville):
    url = f"https://api.meteo.fr/{ville}"
    reponse = requests.get(url)
    if reponse.status_code == 200:
        return reponse.json()
    return None
```

```python
# Test — on ne veut PAS appeler la vraie API météo !
from unittest.mock import Mock, patch

def test_obtenir_meteo():
    # On crée un Mock qui simule une réponse HTTP
    mock_reponse = Mock()
    mock_reponse.status_code = 200
    mock_reponse.json.return_value = {"temperature": 22, "condition": "ensoleillé"}

    with patch("requests.get", return_value=mock_reponse) as mock_get:
        resultat = obtenir_meteo("Paris")

    assert resultat["temperature"] == 22
    assert resultat["condition"] == "ensoleillé"
    mock_get.assert_called_once_with("https://api.meteo.fr/Paris")
```

### 5.2 Mock avancé : side_effect

`side_effect` permet de simuler des comportements plus complexes :

```python
from unittest.mock import Mock

# 1. Simuler des retours différents à chaque appel
mock = Mock()
mock.side_effect = [10, 20, 30]
print(mock())  # → 10
print(mock())  # → 20
print(mock())  # → 30

# 2. Simuler des exceptions
mock2 = Mock()
mock2.side_effect = ValueError("Erreur simulée")
try:
    mock2()
except ValueError as e:
    print(e)  # → Erreur simulée

# 3. Simuler une fonction personnalisée
def compute(args):
    return args * 2 if isinstance(args, int) else args.upper()

mock3 = Mock(side_effect=compute)
print(mock3(5))     # → 10
print(mock3("abc")) # → ABC
```

### 5.3 Mock avancé : spec

`spec` permet de créer un mock qui se comporte comme un vrai objet (attributs valides uniquement) :

```python
from unittest.mock import Mock

class Database:
    def connecter(self, url):
        return f"Connecté à {url}"

    def executer(self, query):
        return ["résultat"]

# Mock sans spec : on peut appeler n'importe quoi sans erreur
mock_mauvais = Mock()
mock_mauvais.connection()  # ✅ pas d'erreur (alors que la vraie classe n'a pas .connection)

# Mock avec spec : seules les méthodes réelles sont autorisées
mock_bon = Mock(spec=Database)
mock_bon.connecter("test")  # ✅ OK
mock_bon.connection()       # ❌ AttributeError: Mock object has no attribute 'connection'
```

**À retenir :** Toujours utiliser `spec` quand on mock un objet existant. Ça évite les bugs où le test passe avec une méthode qui n'existe pas.

### 5.4 Exemple concret : mock d'un service externe

```python
# service_paiement.py
class ServicePaiement:
    def debiter(self, utilisateur_id, montant):
        """Appelle une API bancaire externe."""
        # Appel HTTP réel → on ne teste PAS ça
        pass

    def rembourser(self, utilisateur_id, montant):
        pass


# test_commande.py
from unittest.mock import Mock

def test_passer_commande():
    service = Mock(spec=ServicePaiement)
    service.debiter.return_value = {"status": "succès", "transaction_id": "TXN123"}

    # Test de la fonction qui utilise le service
    resultat = passer_commande(1, 50.0, service)

    assert resultat == "Commande confirmée"
    service.debiter.assert_called_once_with(1, 50.0)
```

---

## Partie 6 : Couverture de code avec coverage.py

### 6.1 Installation et utilisation

```bash
pip install coverage

# Lancer les tests sous coverage
coverage run -m pytest

# Voir le rapport dans le terminal
coverage report

# Générer un rapport HTML (ouvrir htmlcov/index.html)
coverage html
```

### 6.2 Exemple

```python
# operations.py
def division(a, b):
    if b == 0:
        return "Erreur : division par zéro"
    return a / b

def est_pair(n):
    return n % 2 == 0
```

```python
# test_operations.py
def test_division():
    assert division(10, 2) == 5.0
```

```bash
coverage run -m pytest
coverage report
# → operations.py          4      1    75%   # Ligne 2 (b==0) non testée
```

On voit que le cas `b == 0` n'est pas testé. **Objectif :** couvrir tous les chemins possibles.

```python
def test_division_par_zero():
    assert division(10, 0) == "Erreur : division par zéro"
```

```bash
coverage report
# → operations.py          4      4   100%
```

**Piège :** 100% de couverture ne signifie PAS que le code est parfait. Ça veut juste dire que chaque ligne a été exécutée au moins une fois. On peut toujours avoir des bugs logiques.

---

## Partie 7 : Bonnes pratiques et pièges

### 7.1 Structure de projet recommandée

```
mon_projet/
  src/
    mon_package/
      __init__.py
      calculs.py
      utilisateurs.py
  tests/
    conftest.py
    test_calculs.py
    test_utilisateurs.py
```

### 7.2 Règles d'or

1. **Un test = un comportement** (pas plusieurs `assert` de concepts différents)
2. **Nommage explicite :** `test_ajouter_utilisateur_avec_email_valide()`
3. **Indépendance :** chaque test doit pouvoir s'exécuter seul
4. **Pas de logique dans les tests :** pas de `if`, `for` ou `try/except`
5. **Tester les cas limites :** valeurs nulles, vides, négatives, limites

### 7.3 Pièges courants

```python
# ❌ MAUVAIS : plusieurs concepts dans un test
def test_utilisateur():
    u = Utilisateur("Alice")
    assert u.nom == "Alice"
    assert u.sauvegarder() == True
    assert u.supprimer() == True

# ✅ BON : un test par concept
def test_creer_utilisateur():
    u = Utilisateur("Alice")
    assert u.nom == "Alice"

def test_sauvegarder_utilisateur():
    u = Utilisateur("Bob")
    assert u.sauvegarder() == True
```

---

## Résumé du module

| Concept | Utilité | Commande/Fonction clé |
|---------|---------|----------------------|
| TDD | Cycle Red-Green-Refactor | Écrire le test avant le code |
| pytest | Framework de test | `pytest`, `pytest -v` |
| Fixtures | Préparer le contexte | `@pytest.fixture` |
| Paramétrisation | Tester plusieurs cas | `@pytest.mark.parametrize` |
| conftest.py | Partager des fixtures | Fichier automatiquement chargé |
| tmp_path | Fichiers temporaires | Fourni par pytest |
| monkeypatch | Modifier l'environnement | `monkeypatch.setenv()` |
| Mock | Simuler des dépendances | `Mock()`, `patch()` |
| side_effect | Comportement dynamique | `mock.side_effect = [...]` |
| spec | Mock type-safe | `Mock(spec=MaClasse)` |
| coverage.py | Mesurer la couverture | `coverage run -m pytest` |

---

## Exercices

1. **TDD FizzBuzz classique :** Implémente `fizzbuzz(n)` en suivant le cycle Red-Green-Refactor. Ajoute un test pour `n=0` (retourne "FizzBuzz" car 0 % 3 == 0 et 0 % 5 == 0).

2. **Fixture BDD :** Crée une fixture `base_utilisateurs` qui fournit une liste d'utilisateurs. Écris 3 tests qui l'utilisent : ajout, suppression, recherche.

3. **Mock d'une API météo :** La fonction `obtenir_meteo(ville)` appelle `api.meteo.fr/{ville}`. Mocke l'appel et teste les cas : succès (200), ville inconnue (404), erreur serveur (500).

4. **Paramétrisation :** Teste une fonction `calculer_imposition(revenu, age)` avec au moins 6 cas différents en utilisant `@pytest.mark.parametrize`.

5. **Couverture à 100% :** Écris une fonction `categoriser_age(age)` qui retourne "enfant" (<12), "ado" (12-17), "adulte" (18-64), "senior" (65+). Atteins 100% de couverture.
