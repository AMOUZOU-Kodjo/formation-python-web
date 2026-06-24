# Vidéo #13 — Programmation orientée objet : classes

## Informations générales
- **Titre** : Python #13 — Programmation orientée objet : classes (Formation Complète)
- **Durée** : ~15 min
- **Miniature** : `banners/13-poo-classes.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 13 — POO : CLASSES

> "Bienvenue dans le module 13. On attaque la programmation orientée objet. C'est une façon de structurer son code autour d'objets, qui regroupent données et comportement. On commence avec les classes et les instances."

---

### 0:30 — Qu'est-ce que la POO ? (1 min 30)
**Texte écran :** CONCEPTS DE LA POO

> "La programmation orientée objet repose sur quelques concepts simples."

**Au tableau :**
- **Classe** : le plan, le moule (ex: "Humain")
- **Instance** : l'objet concret créé à partir du plan (ex: "Alice")
- **Attributs** : les données de l'objet (nom, age)
- **Méthodes** : les actions de l'objet (parler, marcher)

```python
# Une classe, c'est comme un moule à gâteaux
# Les instances, ce sont les gâteaux qu'on fabrique
```

> "L'idée : au lieu de disperser les données et les fonctions, on les regroupe dans des objets cohérents."

---

### 2:00 — Définir une classe : class, __init__, self (2 min)
**Texte écran :** PREMIÈRE CLASSE

```python
class Utilisateur:
    def __init__(self, nom, email):
        self.nom = nom
        self.email = email

    def se_presenter(self):
        return f"Je suis {self.nom}"

# Création d'instances
alice = Utilisateur("Alice", "alice@mail.com")
bob = Utilisateur("Bob", "bob@mail.com")

print(alice.nom)             # Alice
print(alice.se_presenter())  # Je suis Alice
print(bob.se_presenter())    # Je suis Bob
```

> "`__init__` est le constructeur. Il est appelé automatiquement quand on crée une instance. `self` représente l'instance elle-même. C'est toujours le premier paramètre."

**Point clé :**
- `self.nom = nom` crée un attribut d'instance
- `self` passe automatiquement ; on ne le fournit pas à l'appel

---

### 4:00 — Attributs et méthodes d'instance (2 min)
**Texte écran :** ATTRIBUTS & MÉTHODES D'INSTANCE

```python
class CompteBancaire:
    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self.solde = solde
        self._historique = []

    def deposer(self, montant):
        self.solde += montant
        self._historique.append(f"Dépôt : {montant}€")

    def retirer(self, montant):
        if montant <= self.solde:
            self.solde -= montant
            self._historique.append(f"Retrait : {montant}€")
        else:
            print("Solde insuffisant")

    def afficher_solde(self):
        print(f"Solde de {self.titulaire} : {self.solde}€")

compte = CompteBancaire("Alice", 1000)
compte.deposer(500)
compte.retirer(200)
compte.afficher_solde()  # Solde de Alice : 1300€
```

> "Les attributs comme `_historique` avec un underscore sont considérés comme privés par convention ce n'est pas un vrai private — juste une convention."

---

### 6:00 — Propriétés avec @property (2 min)
**Texte écran :** PROPRIÉTÉS (@property)

```python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, valeur):
        if valeur < -273.15:
            raise ValueError("Impossible : zéro absolu")
        self._celsius = valeur

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

t = Temperature(25)
print(t.celsius)      # 25 (lecture)
print(t.fahrenheit)   # 77.0 (calculé)
t.celsius = 30        # écriture via le setter
# t.celsius = -300    # ValueError !
```

> "Avec `@property`, on utilise une syntaxe d'attribut simple, mais avec la logique d'une méthode. Le getter lit, le setter valide."

---

### 8:00 — Attributs et méthodes de classe (2 min 30)
**Texte écran :** @classmethod & @staticmethod

```python
class Utilisateur:
    # Attribut de classe (partagé par toutes les instances)
    nb_utilisateurs = 0

    def __init__(self, nom):
        self.nom = nom
        Utilisateur.nb_utilisateurs += 1

    # Méthode de classe
    @classmethod
    def depuis_email(cls, email):
        nom = email.split("@")[0]
        return cls(nom)

    # Méthode statique
    @staticmethod
    def valider_email(email):
        return "@" in email and "." in email

u1 = Utilisateur("Alice")
u2 = Utilisateur.depuis_email("bob@mail.com")
print(Utilisateur.nb_utilisateurs)        # 2
print(Utilisateur.valider_email("test"))  # False
```

> "Les attributs de classe sont partagés entre toutes les instances. `@classmethod` reçoit `cls` (la classe). `@staticmethod` ne reçoit ni `self` ni `cls`."

---

### 10:30 — Variables de classe vs d'instance (2 min)
**Texte écran :** CLASSE ≠ INSTANCE

```python
class Pion:
    # Variable de classe
    couleur_par_defaut = "blanc"

    def __init__(self, couleur=None):
        # Variable d'instance
        if couleur:
            self.couleur = couleur

p1 = Pion()
p2 = Pion("noir")

print(p1.couleur_par_defaut)  # blanc
print(p2.couleur_par_defaut)  # blanc (hérité de la classe)

# Modifier la variable de classe
Pion.couleur_par_defaut = "rouge"
print(p1.couleur_par_defaut)  # rouge
print(p2.couleur_par_defaut)  # rouge (toujours hérité)

# p2 a son propre attribut d'instance
print(p2.couleur)             # noir
```

**Piège courant :**
```python
class Annuaire:
    contacts = []  # Variable de classe — partagée !

    def ajouter(self, nom):
        self.contacts.append(nom)

a1 = Annuaire()
a2 = Annuaire()
a1.ajouter("Alice")
print(a2.contacts)  # ["Alice"] ! Problème de partage
```

> "Les listes, dictionnaires et autres objets mutables en variables de classe sont partagés. Utilisez `self.ma_liste = []` dans `__init__` pour des données d'instance."

---

### 12:30 — POO vs fonctions (1 min 30)
**Texte écran :** POO VS FONCTIONS

```python
# Approche fonctionnelle
def creer_compte(titulaire, solde):
    return {"titulaire": titulaire, "solde": solde}

def deposer(compte, montant):
    compte["solde"] += montant

compte = creer_compte("Alice", 1000)
deposer(compte, 500)

# Approche orientée objet
class Compte:
    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self.solde = solde

    def deposer(self, montant):
        self.solde += montant

compte = Compte("Alice", 1000)
compte.deposer(500)
```

> "Les deux approches fonctionnent. La POO est plus adaptée quand les données et le comportement sont fortement liés. Les fonctions sont plus simples pour des traitements isolés. Choisissez selon le contexte."

---

### 14:00 — Conclusion
> "Module 14 : l'héritage et le polymorphisme, qui permettent de construire des hiérarchies de classes."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 13 : Programmation orientée objet : classes

Au programme :
00:00 — Introduction
00:30 — Concepts de la POO
02:00 — Définir une classe : class, __init__, self
04:00 — Attributs et méthodes d'instance
06:00 — Propriétés avec @property
08:00 — @classmethod et @staticmethod
10:30 — Variables de classe vs d'instance
12:30 — POO vs fonctions
14:00 — Prochain module

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

#python #formationpython #poo #classes #objet #programmationorienteeobjet
```

## Tags YouTube
```
python, formation python, apprendre python, cours python, python débutant, programmation python, python complet, python de a à z, python 2026, tutoriel python, classes python, poo python, orienté objet python, property python, classmethod python
```
