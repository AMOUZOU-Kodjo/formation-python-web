# Module 26 : Design Patterns

**Objectifs pédagogiques**
- Comprendre ce qu'est un design pattern et pourquoi il existe
- Maîtriser les patterns les plus courants : Singleton, Factory, Observer, Strategy, Adapter, Decorator
- Savoir quand (ne pas) utiliser chaque pattern
- Découvrir les patterns pythoniques
- Voir des exemples concrets avant-après pour chaque pattern

---

## Partie 1 : Introduction aux Design Patterns

Les **design patterns** (patrons de conception) sont des **solutions éprouvées** à des **problèmes récurrents** en conception logicielle. Ce ne sont pas des bibliothèques qu'on importe, mais des **patrons d'organisation du code** qu'on adapte à son contexte.

**À retenir :** Un pattern n'est pas une recette à copier-coller, c'est un **principe** à adapter.

**Avant d'utiliser un pattern, pose-toi ces questions :**
1. Est-ce que le problème est vraiment récurrent ?
2. Est-ce que le pattern va simplifier ou complexifier le code ?
3. Existe-t-il une solution plus simple et pythonique ?

---

## Partie 2 : Singleton

**Problème :** Garantir qu'une classe n'a qu'**une seule instance** et fournir un point d'accès global.

### 2.1 Implémentation de base

```python
class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        # Note : __init__ est appelé à CHAQUE appel de Singleton()
        # même si l'instance est la même
        pass

# Test
s1 = Singleton()
s2 = Singleton()
print(s1 is s2)  # → True
```

**Piège :** `__init__` est appelé à chaque fois ! Solution :

```python
class SingletonPropre:
    _instance = None
    _initialized = False

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        if not self._initialized:
            self._initialized = True
            self.config = {}
            print("Initialisation unique")
```

### 2.2 Avant / Après Singleton

**Avant** — Deux instances différentes d'une configuration :
```python
# Problème : chaque module crée sa propre config
class Config:
    def __init__(self):
        self.valeurs = {}

config1 = Config()
config2 = Config()
config1.valeurs["url"] = "https://api.example.com"
print(config2.valeurs.get("url"))  # → None (perdu !)
```

**Après** — Une config partagée :
```python
class Config(metaclass=SingletonMeta):
    def __init__(self):
        self.valeurs = {}

config1 = Config()
config2 = Config()
config1.valeurs["url"] = "https://api.example.com"
print(config2.valeurs.get("url"))  # → https://api.example.com
```

### 2.3 Quand (ne pas) utiliser Singleton

**✅ Quand l'utiliser :**
- Gestionnaire de configuration global
- Pool de connexions à une base de données
- Logger centralisé
- Cache applicatif

**❌ Quand l'éviter :**
- Quand un simple module avec des fonctions suffit (Python gère déjà le singleton des modules)
- Quand ça rend les tests difficiles (le singleton persiste entre les tests)
- Quand l'état global crée des couplages cachés
- Alternative pythonique : utiliser une **instance de classe à usage unique** passée en paramètre

---

## Partie 3 : Factory

**Problème :** Créer des objets sans exposer la logique d'instanciation au code appelant.

### 3.1 Factory Method (simple)

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def parler(self) -> str:
        pass

class Chien(Animal):
    def parler(self):
        return "Woof!"

class Chat(Animal):
    def parler(self):
        return "Miaou"

class Vache(Animal):
    def parler(self):
        return "Meuh"

class AnimalFactory:
    @staticmethod
    def creer(type_animal: str) -> Animal:
        match type_animal:
            case "chien":   return Chien()
            case "chat":    return Chat()
            case "vache":   return Vache()
            case _:
                raise ValueError(f"Animal inconnu : {type_animal}")

# Usage
for nom in ["chien", "chat", "vache"]:
    animal = AnimalFactory.creer(nom)
    print(f"{nom} fait : {animal.parler()}")

# → chien fait : Woof!
# → chat fait : Miaou
# → vache fait : Meuh
```

### 3.2 Avant / Après Factory

**Avant** — Code dupliqué et couplé :
```python
def traiter_animal(type_animal):
    if type_animal == "chien":
        a = Chien()
    elif type_animal == "chat":
        a = Chat()
    # La logique de création est partout...
    print(a.parler())

def soigner_animal(type_animal):
    if type_animal == "chien":
        a = Chien()
    elif type_animal == "chat":
        a = Chat()
    # Duplication de la logique de création !
    a.soigner()
```

**Après** — Création centralisée :
```python
def traiter_animal(type_animal):
    a = AnimalFactory.creer(type_animal)
    print(a.parler())

def soigner_animal(type_animal):
    a = AnimalFactory.creer(type_animal)
    a.soigner()

# Ajouter un nouveau type ? Il suffit de créer la classe
# et de l'ajouter à AnimalFactory.creer()
```

### 3.3 Factory avec paramètres

```python
class DatabaseFactory:
    @staticmethod
    def creer(type_db: str, **params):
        match type_db:
            case "sqlite":
                import sqlite3
                return sqlite3.connect(params.get("path", ":memory:"))
            case "postgres":
                import psycopg2
                return psycopg2.connect(
                    host=params.get("host", "localhost"),
                    dbname=params.get("dbname"),
                    user=params.get("user"),
                    password=params.get("password")
                )
            case _:
                raise ValueError(f"Type de base inconnu : {type_db}")

# Usage
db = DatabaseFactory.creer("sqlite", path="test.db")
```

**À retenir :** Le pattern Factory est utile quand la création d'objets est complexe, conditionnelle, ou susceptible de changer.

---

## Partie 4 : Observer

**Problème :** Notifier automatiquement plusieurs objets quand un état change.

### 4.1 Implémentation

```python
from abc import ABC, abstractmethod

class Observateur(ABC):
    @abstractmethod
    def mettre_a_jour(self, message: str):
        pass

class Sujet:
    def __init__(self):
        self._observateurs = []

    def attacher(self, obs: Observateur):
        if obs not in self._observateurs:
            self._observateurs.append(obs)

    def detacher(self, obs: Observateur):
        self._observateurs.remove(obs)

    def notifier(self, message: str):
        for obs in self._observateurs:
            obs.mettre_a_jour(message)


# Implémentations concrètes
class EmailNotifier(Observateur):
    def __init__(self, email):
        self.email = email

    def mettre_a_jour(self, message):
        print(f"[EMAIL à {self.email}] {message}")

class SMSNotifier(Observateur):
    def __init__(self, telephone):
        self.telephone = telephone

    def mettre_a_jour(self, message):
        print(f"[SMS à {self.telephone}] {message}")

class LogNotifier(Observateur):
    def mettre_a_jour(self, message):
        with open("notifications.log", "a") as f:
            f.write(f"{message}\n")
        print(f"[LOG] {message}")


# Système qui notifie
class SystemeAlerte(Sujet):
    def declencher_alerte(self, message):
        print(f"ALERTE : {message}")
        self.notifier(message)


# Usage
alerte = SystemeAlerte()
alerte.attacher(EmailNotifier("admin@example.com"))
alerte.attacher(SMSNotifier("+33612345678"))
alerte.attacher(LogNotifier())

alerte.declencher_alerte("Incident critique sur le serveur !")
# → ALERTE : Incident critique sur le serveur !
# → [EMAIL à admin@example.com] Incident critique sur le serveur !
# → [SMS à +33612345678] Incident critique sur le serveur !
# → [LOG] Incident critique sur le serveur !
```

### 4.2 Observer en Python (version simplifiée)

Python permet une version plus légère avec des fonctions/callbacks :

```python
class SystemeAlerte:
    def __init__(self):
        self._callbacks = []

    def attacher(self, callback):
        self._callbacks.append(callback)

    def declencher_alerte(self, message):
        print(f"ALERTE : {message}")
        for cb in self._callbacks:
            cb(message)

# Utilisation directe avec des lambdas/fonctions
alerte = SystemeAlerte()
alerte.attacher(lambda m: print(f"[LOG] {m}"))
alerte.attacher(lambda m: print(f"[SMS] {m}"))
```

### 4.3 Quand utiliser Observer

**✅ Cas d'usage :**
- Systèmes d'événements / signaux
- Interfaces graphiques (clic → notification)
- Architecture MVC (Modèle → Vue)
- Notifications en tout genre

**❌ Quand l'éviter :**
- Quand le sujet et l'observateur sont trop couplés
- Quand les notifications génèrent des boucles infinies (A notifie B qui notifie A)
- Quand il n'y a qu'un seul observateur (une simple méthode suffit)

---

## Partie 5 : Strategy

**Problème :** Permettre de changer d'algorithme à l'exécution.

### 5.1 Implémentation

```python
from abc import ABC, abstractmethod
from typing import List

class StrategieTri(ABC):
    @abstractmethod
    def trier(self, data: List[int]) -> List[int]:
        pass

class TriCroissant(StrategieTri):
    def trier(self, data):
        return sorted(data)

class TriDecroissant(StrategieTri):
    def trier(self, data):
        return sorted(data, reverse=True)

class TriInverse(StrategieTri):
    def trier(self, data):
        return list(reversed(data))


class ContexteTri:
    def __init__(self, strategie: StrategieTri):
        self._strategie = strategie

    def changer_strategie(self, strategie: StrategieTri):
        self._strategie = strategie

    def executer_tri(self, data):
        return self._strategie.trier(data)


# Usage
donnees = [3, 1, 4, 1, 5, 9, 2, 6]

contexte = ContexteTri(TriCroissant())
print(contexte.executer_tri(donnees))
# → [1, 1, 2, 3, 4, 5, 6, 9]

contexte.changer_strategie(TriDecroissant())
print(contexte.executer_tri(donnees))
# → [9, 6, 5, 4, 3, 2, 1, 1]
```

### 5.2 Version pythonique (stratégies = fonctions)

```python
# En Python, les strategies peuvent être de simples fonctions !
strategie_croissant = lambda data: sorted(data)
strategie_decroissant = lambda data: sorted(data, reverse=True)
strategie_inverse = lambda data: list(reversed(data))

class ContexteTri:
    def __init__(self, strategie):
        self.changer_strategie(strategie)

    def changer_strategie(self, strategie):
        self._strategie = strategie

    def executer_tri(self, data):
        return self._strategie(data)

# Usage identique
ctx = ContexteTri(strategie_croissant)
print(ctx.executer_tri([3, 1, 2]))  # → [1, 2, 3]
```

### 5.3 Avant / Après Strategy

**Avant** — Code rigide avec des conditions :
```python
def compresser(fichier, format):
    if format == "zip":
        # 50 lignes de compression zip
        print("Compression zip...")
    elif format == "tar":
        # 50 lignes de compression tar
        print("Compression tar...")
    elif format == "rar":
        # 50 lignes de compression rar
        print("Compression rar...")
    else:
        raise ValueError("Format inconnu")
```

**Après** — Algorithmes interchangeables :
```python
class CompressionStrategy(ABC):
    @abstractmethod
    def compresser(self, fichier): pass

class ZipCompression(CompressionStrategy):
    def compresser(self, fichier):
        print("Compression zip...")

class TarCompression(CompressionStrategy):
    def compresser(self, fichier):
        print("Compression tar...")

# Ajouter un format = ajouter une classe, sans toucher au reste
```

**À retenir :** Le pattern Strategy transforme des `if/elif/else` en classes interchangeables.

---

## Partie 6 : Adapter

**Problème :** Faire collaborer des classes qui ont des interfaces incompatibles.

### 6.1 Implémentation

```python
# Une API externe (qu'on ne peut pas modifier)
class APIAmericaine:
    def get_temperature(self, temp_fahrenheit):
        return f"{temp_fahrenheit}°F"

# Notre application travaille en Celsius
class AffichageCelsius:
    def afficher(self, temperature_celsius):
        print(f"Température : {temperature_celsius:.1f}°C")

# Adapter : convertit l'interface américaine en interface compatible
class AdaptateurTemperature:
    def __init__(self, api_americaine):
        self._api = api_americaine

    def get_temperature_celsius(self, temp_f):
        temp_c = (temp_f - 32) * 5 / 9
        return self._api.get_temperature(temp_f) + f" ({temp_c:.1f}°C)"

# Usage
api = APIAmericaine()
adaptateur = AdaptateurTemperature(api)

print(adaptateur.get_temperature_celsius(212))
# → 212°F (100.0°C)
print(adaptateur.get_temperature_celsius(32))
# → 32°F (0.0°C)
```

### 6.2 Version pythonique (composition)

```python
class AdaptateurTemperature:
    def __init__(self, api_americaine):
        self._api = api_americaine

    def __getattr__(self, name):
        # Délègue les méthodes inconnues à l'API originale
        return getattr(self._api, name)

    def get_temperature_celsius(self, temp_f):
        temp_c = (temp_f - 32) * 5 / 9
        return f"{temp_f}°F ({temp_c:.1f}°C)"
```

**Quand utiliser Adapter ?**
- Pour intégrer du code legacy avec une API différente
- Pour utiliser une bibliothèque externe sans changer notre code
- Pour wrapper une API complexe en interface simple

---

## Partie 7 : Decorator (pattern)

**Problème :** Ajouter dynamiquement des responsabilités à un objet sans modifier sa classe.

⚠️ **Attention :** Le pattern Decorator est DIFFÉRENT des décorateurs Python (`@decorator`), même si l'idée est similaire.

### 7.1 Implémentation

```python
from abc import ABC, abstractmethod

class Boisson(ABC):
    @abstractmethod
    def cout(self) -> float:
        pass

    @abstractmethod
    def description(self) -> str:
        pass

# Composants concrets
class Cafe(Boisson):
    def cout(self):
        return 3.0

    def description(self):
        return "Café"

class The(Boisson):
    def cout(self):
        return 2.5

    def description(self):
        return "Thé"

# Décorateur de base
class DecorateurBoisson(Boisson):
    def __init__(self, boisson: Boisson):
        self._boisson = boisson

    def cout(self):
        return self._boisson.cout()

    def description(self):
        return self._boisson.description()

# Décorateurs concrets
class Lait(DecorateurBoisson):
    def cout(self):
        return self._boisson.cout() + 0.5

    def description(self):
        return self._boisson.description() + " + lait"

class Sucre(DecorateurBoisson):
    def cout(self):
        return self._boisson.cout() + 0.3

    def description(self):
        return self._boisson.description() + " + sucre"

class Chantilly(DecorateurBoisson):
    def cout(self):
        return self._boisson.cout() + 0.8

    def description(self):
        return self._boisson.description() + " + chantilly"


# Usage : on peut empiler les décorateurs
ma_boisson = Cafe()
print(f"{ma_boisson.description()} : {ma_boisson.cout()}€")
# → Café : 3.0€

ma_boisson = Lait(ma_boisson)
print(f"{ma_boisson.description()} : {ma_boisson.cout()}€")
# → Café + lait : 3.5€

ma_boisson = Sucre(ma_boisson)
print(f"{ma_boisson.description()} : {ma_boisson.cout()}€")
# → Café + lait + sucre : 3.8€

# On peut aussi tout faire en une ligne
commande = Chantilly(Sucre(Lait(The())))
print(f"{commande.description()} : {commande.cout()}€")
# → Thé + lait + sucre + chantilly : 4.1€
```

### 7.2 Lien avec les décorateurs Python

Les décorateurs Python (`@`) sont une forme simplifiée et spécifique du pattern Decorator :

```python
def with_lait(boisson_cls):
    """Décorateur qui ajoute du lait à une boisson."""
    class BoissonAvecLait(boisson_cls):
        def cout(self):
            return super().cout() + 0.5
        def description(self):
            return super().description() + " + lait"
    return BoissonAvecLait

@with_lait
class CafeSpecial:
    def cout(self):
        return 4.0
    def description(self):
        return "Café spécial"

cafe = CafeSpecial()  # En réalité : CafeSpecial = with_lait(CafeSpecial)
print(f"{cafe.description()} : {cafe.cout()}€")
# → Café spécial + lait : 4.5€
```

---

## Partie 8 : Patterns pythoniques (spécifiques à Python)

Python a des idiomes qui rendent certains patterns classiques plus simples, voire inutiles.

### 8.1 Singleton pythonique (module)

```python
# config.py — un module est naturellement un singleton !
URL_API = "https://api.example.com"
TIMEOUT = 30

def charger():
    print("Configuration chargée")

# Utilisation
# import config
# print(config.URL_API)  # Toujours la même instance
```

### 8.2 Strategy pythonique (fonctions)

```python
# Les stratégies sont juste des fonctions (first-class citizens)
strategies = {
    "croissant": sorted,
    "decroissant": lambda x: sorted(x, reverse=True),
}
```

### 8.3 Observer pythonique (events)

```python
class Observable:
    def __init__(self):
        self._observers = set()

    def register(self, callback):
        self._observers.add(callback)

    def unregister(self, callback):
        self._observers.discard(callback)

    def notify(self, *args, **kwargs):
        for cb in self._observers:
            cb(*args, **kwargs)
```

### 8.4 Duck Typing (au lieu d'interfaces)

Au lieu d'utiliser `ABC` pour Strategy/Adapter, Python permet le **duck typing** : « si ça marche, c'est bon ».

```python
def traiter(fichier, compresseur):
    # compresseur peut être n'importe quel objet avec une méthode .compresser()
    return compresseur.compresser(fichier)

class ZipComp:
    def compresser(self, f): return f"zip:{f}"

class GzComp:
    def compresser(self, f): return f"gz:{f}"

traiter("data.txt", ZipComp())  # → zip:data.txt
traiter("data.txt", GzComp())   # → gz:data.txt
```

---

## Partie 9 : Écosystème et quand (ne pas) utiliser chaque pattern

### Tableau récapitulatif

| Pattern | Problème résolu | Analogie | Alternative pythonique |
|---------|----------------|----------|----------------------|
| **Singleton** | Instance unique | Président d'un pays | Module, paramètre partagé |
| **Factory** | Création complexe | Usine de jouets | Constructeur simple, `__init_subclass__` |
| **Observer** | Notification multicast | Abonnement newsletter | Callbacks, `signal` |
| **Strategy** | Algorithmes interchangeables | GPS (plusieurs trajets) | Fonctions/passées en paramètre |
| **Adapter** | Interface incompatible | Prise électrique | Duck typing, `__getattr__` |
| **Decorator** | Ajout dynamique de fonctionnalités | Options d'une voiture | Décorateurs Python (`@`) |

### Anti-patterns courants

1. **Singleton abuse :** Utiliser un singleton pour tout ce qui est « global ». Un module ou un paramètre de fonction est souvent mieux.
2. **Factory over-engineering :** Créer une factory pour une classe qui a un constructeur simple.
3. **God object :** Un objet qui fait tout (souvent un Observer qui devient un hub central).

---

## Exercices

1. **Singleton logging :** Implémente un logger qui écrit dans un fichier et qui n'a qu'une seule instance partagée dans toute l'application.

2. **Factory pour des formes géométriques :** Crée une `ShapeFactory` qui produit des `Cercle`, `Rectangle`, `Triangle`. Chaque forme doit implémenter une méthode `aire()`.

3. **Système de notifications avec Observer :** Un `Blog` publie des articles. Des `Abonnés` sont notifiés par email. Implémente le système avec le pattern Observer.

4. **Validation par Strategy :** Crée un système de validation où chaque règle (email valide, âge > 18, mot de passe fort) est une stratégie interchangeable. Combine-les pour valider un formulaire.

5. **Adaptateur pour une API :** Une API météo retourne des données en miles, °F et mph. Crée un adaptateur qui convertit en km, °C et km/h.
