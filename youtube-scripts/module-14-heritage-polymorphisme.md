# Vidéo #14 — Héritage et polymorphisme

## Informations générales
- **Titre** : Python #14 — Héritage et polymorphisme (Formation Complète)
- **Durée** : ~14 min
- **Miniature** : `banners/14-heritage-polymorphisme.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 14 — HÉRITAGE & POLYMORPHISME

> "Bienvenue dans le module 14. L'héritage permet à une classe d'hériter des attributs et méthodes d'une autre classe. Le polymorphisme permet à différentes classes de répondre à la même méthode de façon différente. Deux piliers de la POO."

---

### 0:30 — Héritage simple (2 min)
**Texte écran :** HÉRITAGE SIMPLE

```python
class Animal:
    def __init__(self, nom):
        self.nom = nom

    def parler(self):
        return "..."

class Chien(Animal):
    def parler(self):
        return "Woof !"

class Chat(Animal):
    def parler(self):
        return "Miaou !"

chien = Chien("Rex")
chat = Chat("Minou")
print(chien.nom, chien.parler())  # Rex Woof !
print(chat.nom, chat.parler())    # Minou Miaou !
```

> "`Chien(Animal)` signifie que Chien hérite de Animal. Elle hérite du constructeur et de tous les attributs, mais peut redéfinir (override) les méthodes."

---

### 2:30 — super() pour appeler le parent (2 min)
**Texte écran :** super() — APPELER LE PARENT

```python
class Vehicule:
    def __init__(self, marque, modele):
        self.marque = marque
        self.modele = modele

    def description(self):
        return f"{self.marque} {self.modele}"

class Voiture(Vehicule):
    def __init__(self, marque, modele, portes):
        super().__init__(marque, modele)
        self.portes = portes

    def description(self):
        base = super().description()
        return f"{base} — {self.portes} portes"

v = Voiture("Toyota", "Corolla", 4)
print(v.description())  # Toyota Corolla — 4 portes
```

> "`super()` appelle la méthode de la classe parente. On évite de dupliquer le code du parent."

---

### 4:30 — Polymorphisme (2 min)
**Texte écran :** POLYMORPHISME

```python
class Oiseau:
    def deplacer(self):
        return "Je vole"

class Poisson:
    def deplacer(self):
        return "Je nage"

class Serpent:
    def deplacer(self):
        return "Je rampe"

# Interface commune
animaux = [Oiseau(), Poisson(), Serpent()]
for animal in animaux:
    print(animal.deplacer())
# Je vole
# Je nage
# Je rampe
```

> "Même méthode `deplacer()`, comportement différent. Le polymorphisme permet d'écrire du code qui fonctionne avec n'importe quel objet, du moment qu'il a la bonne méthode."

**Exemple plus concret :**

```python
def afficher_presentation(animal):
    print(f"Cet animal dit : {animal.parler()}")

afficher_presentation(Chien("Rex"))  # Woof !
afficher_presentation(Chat("Minou")) # Miaou !
# On peut passer n'importe quel objet qui a .parler()
```

---

### 6:30 — Classes abstraites (ABC) (2 min)
**Texte écran :** CLASSES ABSTRAITES (ABC)

```python
from abc import ABC, abstractmethod

class Forme(ABC):
    @abstractmethod
    def aire(self):
        pass

    @abstractmethod
    def perimetre(self):
        pass

class Rectangle(Forme):
    def __init__(self, largeur, hauteur):
        self.largeur = largeur
        self.hauteur = hauteur

    def aire(self):
        return self.largeur * self.hauteur

    def perimetre(self):
        return 2 * (self.largeur + self.hauteur)

# f = Forme()  # TypeError ! On ne peut pas instancier une classe abstraite
r = Rectangle(5, 3)
print(r.aire())        # 15
print(r.perimetre())   # 16
```

> "Les classes abstraites imposent un contrat. Toute classe qui en hérite **doit** implémenter les méthodes marquées `@abstractmethod`. Impossible d'instancier une classe abstraite directement."

---

### 8:30 — Héritage multiple et MRO (2 min)
**Texte écran :** HÉRITAGE MULTIPLE & MRO

```python
class Volant:
    def voler(self):
        return "Je vole"

class Nageur:
    def nager(self):
        return "Je nage"

class Canard(Volant, Nageur):
    def parler(self):
        return "Coin coin"

canard = Canard()
print(canard.voler())   # Je vole
print(canard.nager())   # Je nage
```

> "Python permet l'héritage multiple. Mais attention au diamant."

```python
class A:
    def method(self):
        return "A"

class B(A):
    def method(self):
        return "B"

class C(A):
    def method(self):
        return "C"

class D(B, C):
    pass

d = D()
print(d.method())     # B (MRO: D → B → C → A)

# Ordre de résolution
print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)
```

> "Le MRO (Method Resolution Order) définit l'ordre de recherche des méthodes. Python utilise l'algorithme C3 linéarisation : profondeur d'abord, puis从左 à droite."

---

### 10:30 — Composition vs héritage (1 min 30)
**Texte écran :** COMPOSITION VS HÉRITAGE

```python
# Héritage — "est un"
class Voiture(Vehicule):
    pass

# Composition — "a un"
class Moteur:
    def demarrer(self):
        return "Vroom !"

class Voiture:
    def __init__(self):
        self.moteur = Moteur()  # Composition

    def demarrer(self):
        return self.moteur.demarrer()
```

> "L'héritage modélise une relation 'est un'. La composition modélise 'a un'. La composition est souvent plus flexible et moins rigide."

**Règle empirique :** "Préférez la composition à l'héritage. N'utilisez l'héritage que quand la relation 'est un' est vraiment naturelle."

---

### 12:00 — isinstance() et issubclass() (1 min)
**Texte écran :** isinstance() & issubclass()

```python
class Animal:
    pass

class Chien(Animal):
    pass

class Chat(Animal):
    pass

rex = Chien()

# Vérifier le type d'une instance
print(isinstance(rex, Chien))    # True
print(isinstance(rex, Animal))   # True
print(isinstance(rex, Chat))     # False

# Vérifier une relation de classe
print(issubclass(Chien, Animal)) # True
print(issubclass(Chat, Animal))  # True
print(issubclass(Animal, Chien)) # False
```

> "`isinstance()` vérifie si un objet est une instance d'une classe (ou d'une classe parente). `issubclass()` vérifie une relation entre classes."

---

### 13:00 — Conclusion
> "Module 15 : les méthodes spéciales, ces méthodes magiques qui rendent Python si élégant."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 14 : Héritage et polymorphisme

Au programme :
00:00 — Introduction
00:30 — Héritage simple
02:30 — super() pour appeler le parent
04:30 — Polymorphisme
06:30 — Classes abstraites (ABC)
08:30 — Héritage multiple et MRO
10:30 — Composition vs héritage
12:00 — isinstance() et issubclass()
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

#python #formationpython #heritage #polymorphisme #poo #classesabstraites
```

## Tags YouTube
```
python, formation python, apprendre python, cours python, python débutant, programmation python, python complet, python de a à z, python 2026, tutoriel python, héritage python, polymorphisme python, super python, abc python, mro python, composition python
```
