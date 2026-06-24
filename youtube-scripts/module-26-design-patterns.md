# Vidéo #26 — Design Patterns

## Informations générales
- **Titre** : Python #26 — Design Patterns (Formation Complète)
- **Durée** : ~14 min
- **Miniature** : `banners/26-design-patterns.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 26 — DESIGN PATTERNS

> "Bienvenue dans le module 26. Les design patterns sont des solutions éprouvées à des problèmes récurrents en conception logicielle. On va voir les plus utiles en Python, et surtout — comment Python les simplifie par rapport à d'autres langages."

---

### 0:30 — Qu'est-ce qu'un design pattern ? (1 min 30)
**Texte écran :** C'EST QUOI UN DESIGN PATTERN ?

> "Un design pattern, c'est un patron de conception — une solution générique et réutilisable à un problème connu."

- 23 patterns du "Gang of Four" (GoF)
- 3 catégories :
  - **Création** : comment créer des objets
  - **Structure** : comment organiser les classes
  - **Comportement** : comment les objets interagissent

> "Attention : un pattern n'est pas une solution toute faite qu'on copie-colle. C'est une *stratégie* qu'on adapte à son contexte."

---

### 2:00 — Singleton : une seule instance (2 min)
**Texte écran :** SINGLETON

> "Le Singleton garantit qu'une classe n'a qu'une seule instance, et donne un point d'accès global."

```python
# Version simple
class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

# Version avec métaclasse
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Config(metaclass=SingletonMeta):
    def __init__(self):
        self.valeurs = {}

c1 = Config()
c2 = Config()
print(c1 is c2)  # True
```

> "Utile pour une configuration globale, une connexion base de données, un logger. Mais à utiliser avec modération — c'est un état global caché."

---

### 4:00 — Factory : créer sans spécifier la classe (2 min)
**Texte écran :** FACTORY

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def parler(self) -> str: ...

class Chien(Animal):
    def parler(self): return "Woof !"

class Chat(Animal):
    def parler(self): return "Miaou !"

class AnimalFactory:
    @staticmethod
    def creer(type_animal: str) -> Animal:
        animaux = {
            "chien": Chien,
            "chat": Chat,
        }
        cls = animaux.get(type_animal)
        if cls is None:
            raise ValueError(f"Type inconnu : {type_animal}")
        return cls()

# Utilisation
animal = AnimalFactory.creer("chien")
print(animal.parler())  # "Woof !"
```

> "Le Factory pattern isole la logique de création. On peut ajouter de nouveaux types sans changer le code client."

**Factory Method :**
```python
class Jeu:
    def creer_boss(self):
        raise NotImplementedError

class Facile(Jeu):
    def creer_boss(self):
        return Boss(100)  # 100 PV

class Difficile(Jeu):
    def creer_boss(self):
        return Boss(500)  # 500 PV
```

---

### 6:00 — Observer : notification de changements (2 min)
**Texte écran :** OBSERVER

> "Un objet (le sujet) notifie automatiquement ses observateurs quand son état change."

```python
class Sujet:
    def __init__(self):
        self._observateurs = []

    def attacher(self, observateur):
        self._observateurs.append(observateur)

    def detacher(self, observateur):
        self._observateurs.remove(observateur)

    def notifier(self, message):
        for obs in self._observateurs:
            obs.mettre_a_jour(message)

class EmailNotifier:
    def mettre_a_jour(self, message):
        print(f"[Email] {message}")

class SMSNotifier:
    def mettre_a_jour(self, message):
        print(f"[SMS] {message}")

# Utilisation
sujet = Sujet()
sujet.attacher(EmailNotifier())
sujet.attacher(SMSNotifier())
sujet.notifier("Nouvel article publié !")
# [Email] Nouvel article publié !
# [SMS] Nouvel article publié !
```

> "En Python, on peut aussi utiliser des simples callables ou des signaux (PyQt, blinker) pour éviter de réinventer la roue."

---

### 8:00 — Strategy : algorithme interchangeable (2 min)
**Texte écran :** STRATEGY

```python
from abc import ABC, abstractmethod

class StrategiePaiement(ABC):
    @abstractmethod
    def payer(self, montant: float) -> str: ...

class PaiementCarte(StrategiePaiement):
    def payer(self, montant: float) -> str:
        return f"Paiement de {montant:.2f}€ par carte"

class PaiementPaypal(StrategiePaiement):
    def payer(self, montant: float) -> str:
        return f"Paiement de {montant:.2f}€ via PayPal"

class PaiementCrypto(StrategiePaiement):
    def payer(self, montant: float) -> str:
        return f"Paiement de {montant:.2f}€ en crypto"

class Panier:
    def __init__(self, strategie: StrategiePaiement):
        self.strategie = strategie
        self.total = 0.0

    def ajouter(self, prix: float):
        self.total += prix

    def payer(self):
        return self.strategie.payer(self.total)

# Utilisation
panier = Panier(PaiementCarte())
panier.ajouter(29.99)
panier.ajouter(9.99)
print(panier.payer())
```

> "En Python, une strategie peut être une simple fonction : `strategie = lambda m: f'Paiement de {m}€'`. Pas besoin de classes si c'est simple."

---

### 10:00 — Adapter : rendre compatible l'incompatible (1 min 30)
**Texte écran :** ADAPTER

```python
# Interface existante
class PriseEuropeenne:
    def fournir_courant(self):
        return "220V"

# Appareil américain
class AppareilUS:
    def brancher(self, voltage):
        return f"Appareil branché en {voltage}"

# Adaptateur
class AdaptateurUS:
    def __init__(self, prise):
        self.prise = prise

    def brancher_appareil(self, appareil):
        voltage = self.prise.fournir_courant()
        return appareil.brancher(voltage)

# Utilisation
prise = PriseEuropeenne()
adaptateur = AdaptateurUS(prise)
appareil = AppareilUS()
print(adaptateur.brancher_appareil(appareil))
# "Appareil branché en 220V"
```

> "L'Adapter permet à deux interfaces incompatibles de collaborer. Très utilisé pour intégrer des bibliothèques tierces."

---

### 11:30 — Patterns en Python vs Java (1 min 30)
**Texte écran :** PYTHON VS JAVA

> "Les design patterns du Gang of Four ont été écrits pour des langages comme C++ et Java. En Python, beaucoup sont plus simples — ou même intégrés au langage."

| Pattern | Java | Python |
|---------|------|--------|
| Singleton | ~40 lignes | Une classe avec `__new__` |
| Strategy | Interface + classes | Une fonction ou lambda |
| Observer | Interface EventListener | Callable, signaux |
| Iterator | `Iterator<E>` interface | `__iter__` / `__next__` |
| Decorator | `InputStream` wrapper | `@decorateur` syntaxe |

```python
# Strategy avec une lambda — pas de classes
calculer = lambda a, b, op: op(a, b)
somme = lambda a, b: a + b
produit = lambda a, b: a * b

print(calculer(5, 3, somme))    # 8
print(calculer(5, 3, produit))  # 15
```

> "En Python, privilégiez la simplicité. Un design pattern doit résoudre un problème, pas en créer un."

---

### 13:00 — Conclusion
> "Module 27 : les tests unitaires. Comment écrire du code fiable et éviter les régressions."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 26 : Design Patterns

Au programme :
00:00 — Introduction
00:30 — Qu'est-ce qu'un design pattern ?
02:00 — Singleton : une seule instance
04:00 — Factory : créer sans spécifier la classe
06:00 — Observer : notification de changements
08:00 — Strategy : algorithme interchangeable
10:00 — Adapter : rendre compatible l'incompatible
11:30 — Patterns en Python vs Java
13:00 — Prochain module

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

#python #formationpython #designpatterns #singleton #factory #observer #strategy
```

## Tags YouTube
```
python, formation python, design patterns, singleton pattern, factory pattern, observer pattern, strategy pattern, adapter pattern, gang of four, python avancé, architecture logicielle
```
