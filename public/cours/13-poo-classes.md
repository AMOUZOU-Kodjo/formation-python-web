# Module 13 : Programmation Orientée Objet — Classes

---

## Objectifs pédagogiques

À la fin de ce module, vous serez capable de :
- Comprendre la différence entre une **classe** et un **objet**
- Définir des classes avec des attributs et des méthodes
- Maîtriser `__init__`, `self`, et les différents types de méthodes
- Distinguer attributs de classe et attributs d'instance
- Appliquer l'**encapsulation** (attributs privés, propriétés)
- Utiliser `@property` pour des getters/setters intelligents
- Connaître les alternatives modernes : `dataclasses` et `namedtuple`
- Modéliser des problèmes réels avec des diagrammes de classe texte

---

## 1. Classe et objet : le plan et la maison

### Concept fondamental

Imaginez un **plan d'architecte** pour une maison. Ce plan décrit :
- les pièces (nombre, taille)
- la structure
- ce qu'on peut y faire (cuisiner, dormir)

Ce plan n'est **pas** une maison — c'est un **modèle**. Une fois le plan prêt, on peut construire autant de **maisons réelles** (objets) qu'on veut, toutes basées sur le même plan.

En Python :
- La **classe** = le plan
- L'**objet** (ou **instance**) = la maison construite à partir du plan

```python
# Définition de la classe (le plan)
class Chien:
    """Modèle de chien."""
    pass

# Création d'objets (les maisons)
medor = Chien()
rex = Chien()

print(type(medor))  # → <class '__main__.Chien'>
print(medor)        # → <__main__.Chien object at 0x...>
print(medor is rex) # → False (ce sont deux objets distincts)
```

> **À retenir** : `medor` et `rex` sont deux objets **distincts** de la même classe `Chien`. Changer l'un n'affecte pas l'autre (sauf pour les attributs de classe, on y reviendra).

---

## 2. `__init__` et `self` : le constructeur

### À quoi sert `__init__` ?

`__init__` est une **méthode spéciale** (on dit aussi "dunder method" pour *double underscore*) appelée **automatiquement** à la création d'un objet. Elle sert à **initialiser** l'objet avec des valeurs de départ.

```python
class Chien:
    def __init__(self, nom, age):
        """Appelé automatiquement quand on crée un Chien."""
        self.nom = nom   # attribut d'instance
        self.age = age   # attribut d'instance

# Ceci :
medor = Chien("Médor", 3)

# Est équivalent (en simplifié) à :
# 1. Python crée un objet vide : medor = Chien.__new__(Chien)
# 2. Python appelle : Chien.__init__(medor, "Médor", 3)
```

### Le mystère de `self`

`self` représente **l'instance en cours de manipulation**. Quand on écrit `medor = Chien("Médor", 3)`, Python passe automatiquement `medor` comme premier argument de `__init__` :

```python
# En interne, Python fait ceci :
Chien.__init__(medor, "Médor", 3)
#            ↑ self     ↑ nom  ↑ age
```

**Le nom `self` est une convention** — vous pourriez l'appeler `this` ou `moi`, mais **ne le faites pas**. Tout le monde utilise `self`.

```python
class Chien:
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age

    def aboyer(self):
        return f"{self.nom} dit Woof !"

    def anniversaire(self):
        self.age += 1  # modifie l'attribut de l'instance courante
        return f"{self.nom} a maintenant {self.age} ans"

# Test
medor = Chien("Médor", 3)
rex = Chien("Rex", 5)

print(medor.nom)         # → Médor
print(medor.aboyer())    # → Médor dit Woof !
print(rex.aboyer())      # → Rex dit Woof !
print(medor.anniversaire())  # → Médor a maintenant 4 ans
print(rex.age)           # → 5 (rex n'a pas changé !)
```

> **Piège courant** : Oublier `self` en paramètre ou oublier `self.` devant un attribut.
> ```python
> class Erreur:
>     def __init__(self, nom):
>         nom = nom  # ⚠️ erreur ! On modifie le paramètre, pas l'attribut
>
> class Correct:
>     def __init__(self, nom):
>         self.nom = nom  # ✅ on crée un attribut dans l'instance
> ```

---

## 3. Attributs de classe vs attributs d'instance

C'est l'une des distinctions les plus importantes en POO Python.

```python
class Compteur:
    total = 0          # attribut de CLASSE (partagé par toutes les instances)

    def __init__(self, nom):
        self.nom = nom       # attribut d'INSTANCE (propre à chaque objet)
        self.valeur = 0      # attribut d'INSTANCE
        Compteur.total += 1  # on accède à l'attribut de classe via la classe

    def incrementer(self):
        self.valeur += 1

# Créons deux instances
a = Compteur("A")
b = Compteur("B")

print(a.nom)           # → A (propre à a)
print(b.nom)           # → B (propre à b)
print(a.total)         # → 2 (partagé !)
print(b.total)         # → 2 (partagé !)
print(Compteur.total)  # → 2 (on peut y accéder via la classe)

a.incrementer()
a.incrementer()
b.incrementer()

print(a.valeur)  # → 2
print(b.valeur)  # → 1
print(a.total)   # → 2 (toujours 2, total est de classe)
```

### Comment Python cherche un attribut

Quand on écrit `objet.attribut`, Python cherche dans cet ordre :
1. L'**instance** (`objet.__dict__`)
2. La **classe** (`type(objet).__dict__`)
3. Les **classes parentes** (héritage)

```python
class Test:
    valeur = "de classe"

obj = Test()
print(obj.valeur)  # → "de classe" (cherché dans la classe)

obj.valeur = "d'instance"
print(obj.valeur)  # → "d'instance" (trouvé dans l'instance d'abord)

del obj.valeur
print(obj.valeur)  # → "de classe" (retour à l'attribut de classe)
```

### À quoi servent les attributs de classe ?

- **Constantes** partagées par toutes les instances
- **Compteurs** (nombre total d'instances créées)
- **Configuration par défaut**

```python
class Article:
    tva = 0.20  # attribut de classe (taux de TVA par défaut)

    def __init__(self, nom, prix_ht):
        self.nom = nom
        self.prix_ht = prix_ht

    def prix_ttc(self):
        return self.prix_ht * (1 + self.tva)

# Prix TTC avec TVA par défaut
pain = Article("Pain", 1.00)
print(f"{pain.nom}: {pain.prix_ttc():.2f}€")  # → Pain: 1.20€

# On peut changer le taux pour une instance spécifique
livre = Article("Livre", 10.00)
livre.tva = 0.055  # TVA réduite (uniquement pour ce livre)
print(f"{livre.nom}: {livre.prix_ttc():.2f}€")  # → Livre: 10.55€
```

---

## 4. Méthodes d'instance, de classe et statiques

### Méthode d'instance

La plus courante. Son premier paramètre est `self` (l'instance).

```python
class Cercle:
    def __init__(self, rayon):
        self.rayon = rayon

    def aire(self):  # méthode d'instance
        return 3.14159 * self.rayon ** 2

    def perimetre(self):  # méthode d'instance
        return 2 * 3.14159 * self.rayon
```

### Méthode de classe (`@classmethod`)

Reçoit la **classe** (`cls`) comme premier argument, pas l'instance. Utile pour :
- Créer des objets de différentes manières (factory)
- Accéder/modifier des attributs de classe

```python
class Cercle:
    def __init__(self, rayon):
        self.rayon = rayon

    @classmethod
    def depuis_diametre(cls, diametre):
        """Crée un Cercle à partir du diamètre (méthode factory)."""
        return cls(diametre / 2)

    @classmethod
    def depuis_aire(cls, aire):
        """Crée un Cercle à partir de l'aire."""
        rayon = (aire / 3.14159) ** 0.5
        return cls(rayon)

c1 = Cercle(5)
c2 = Cercle.depuis_diametre(10)
c3 = Cercle.depuis_aire(78.54)

print(c1.rayon)  # → 5
print(c2.rayon)  # → 5.0 (diamètre 10 / 2)
print(c3.rayon)  # → ~5.0

# Note : depuis_diametre appelle cls(...), pas Cercle(...)
# Si on sous-classe Cercle, cls sera la sous-classe automatiquement
```

> **Avantage** : Si on crée `class CercleParfait(Cercle): pass`, alors `CercleParfait.depuis_diametre(10)` crée un `CercleParfait`, pas un `Cercle`. Avec une méthode statique, il faudrait le faire manuellement.

### Méthode statique (`@staticmethod`)

Ne reçoit **ni** `self` **ni** `cls`. C'est juste une fonction rangée dans une classe pour des raisons d'organisation.

```python
class Cercle:
    def __init__(self, rayon):
        self.rayon = rayon

    @staticmethod
    def description():
        return "Un cercle est l'ensemble des points à égale distance d'un centre."

    @staticmethod
    def pi():
        return 3.14159

print(Cercle.description())  # → Un cercle est...
print(Cercle.pi())           # → 3.14159
```

### Tableau comparatif

| Type | Premier paramètre | Accès à l'instance | Accès à la classe | Usage typique |
|------|-------------------|-------------------|-------------------|---------------|
| Instance | `self` | ✅ Oui | Oui (via `self.__class__`) | Méthodes normales |
| Classe | `cls` | Non | ✅ Oui | Factory, attributs classe |
| Statique | Rien | Non | Non | Fonctions utilitaires |

---

## 5. Encapsulation et attributs privés

### Convention : attribut "protégé" avec `_`

Un **seul** underscore devant un nom = "**protégé**" (convention : ne pas y toucher de l'extérieur).

```python
class CompteBancaire:
    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self._solde = solde  # protégé (convention)

    def deposer(self, montant):
        if montant > 0:
            self._solde += montant

    def retirer(self, montant):
        if 0 < montant <= self._solde:
            self._solde -= montant
            return montant
        return 0

    def afficher_solde(self):
        return f"Solde de {self.titulaire}: {self._solde}€"

compte = CompteBancaire("Alice", 1000)
print(compte.afficher_solde())  # → Solde de Alice: 1000€

# Techniquement possible, mais PAS RECOMMANDÉ :
print(compte._solde)  # → 1000 (Python n'empêche rien, c'est une convention)
```

### Name mangling : attribut "privé" avec `__`

Deux underscores devant = **name mangling**. Python **masque** le nom :

```python
class Banque:
    def __init__(self):
        self.__secret = "code-1234"

    def get_secret(self):
        return self.__secret

b = Banque()
# print(b.__secret)     # ⚠️ AttributeError !
print(b.get_secret())   # → code-1234

# Name mangling : le nom devient _Banque__secret
print(b._Banque__secret)  # → code-1234 (accessible mais déconseillé)
```

> **Pourquoi `__` ?** Évite les collisions dans l'héritage. Une sous-classe peut définir `__secret` sans écraser celui de la classe parente.

### Propriétés avec `@property`

La façon Pythonique de faire des getters/setters :

```python
class Compte:
    def __init__(self, solde=0):
        self._solde = solde  # stockage privé

    @property
    def solde(self):
        """Getter : accès en lecture seule si pas de setter."""
        return self._solde

    @solde.setter
    def solde(self, valeur):
        """Setter : validation avant modification."""
        if valeur < 0:
            raise ValueError("Le solde ne peut pas être négatif")
        self._solde = valeur

    @solde.deleter
    def solde(self):
        """Deleter : que faire en cas de del objet.solde."""
        raise PermissionError("Vous ne pouvez pas supprimer le solde !")

# Utilisation
compte = Compte(1000)
print(compte.solde)      # → 1000 (appelle le getter)
compte.solde = 1500      # → appelle le setter
print(compte.solde)      # → 1500
# compte.solde = -500    # ⚠️ ValueError !
# del compte.solde       # ⚠️ PermissionError !
```

> **Piège courant** : Créer une boucle infinie dans le getter :
> ```python
> class Boucle:
>     @property
>     def x(self):
>         return self.x  # ⚠️ RECURSION ! self.x appelle le getter
>
> class Correct:
>     def __init__(self):
>         self._x = 0
>
>     @property
>     def x(self):
>         return self._x  # ✅ attribut privé différent
> ```

### Pourquoi encapsuler ?

1. **Validation** : empêcher des valeurs invalides
2. **Calcul** : un getter peut calculer une valeur à la volée
3. **Évolution** : changer l'implémentation interne sans casser le code externe

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
            raise ValueError("Impossible, zéro absolu !")
        self._celsius = valeur

    @property
    def fahrenheit(self):
        # Propriété calculée (pas de setter = lecture seule)
        return self._celsius * 9/5 + 32

t = Temperature(25)
print(t.celsius)     # → 25
print(t.fahrenheit)  # → 77.0
t.celsius = 30
print(t.fahrenheit)  # → 86.0
```

---

## 6. Diagrammes de classe en texte

Pour concevoir vos classes avant de coder, un diagramme texte simple suffit :

```
┌─────────────────────┐
│       Chien         │  ← Nom de la classe
├─────────────────────┤
│ - nom: str          │  ← Attributs (- = privé, + = public)
│ - age: int          │
│ + total: int        │  ← Attribut de classe (souligné)
├─────────────────────┤
│ + __init__(nom,age) │  ← Méthodes
│ + aboyer(): str     │
│ + anniversaire()    │
└─────────────────────┘
```

Exemple pour un système de bibliothèque :

```
┌─────────────────┐       ┌─────────────────┐
│    Livre        │       │   Bibliotheque  │
├─────────────────┤       ├─────────────────┤
│ - _titre: str   │       │ - _livres: list │
│ - _auteur: str  │       ├─────────────────┤
│ - _dispo: bool  │       │ + ajouter(livre)│
├─────────────────┤       │ + chercher(titre)│
│ + titre: prop   │       │ + emprunter(titre)│
│ + emprunter()   │       │ + retourner(titre)│
│ + retourner()   │       └─────────────────┘
└─────────────────┘
```

---

## 7. `namedtuple` : classes légères immuables

Un `namedtuple` crée une classe avec des attributs nommés, sans écriture de code :

```python
from collections import namedtuple

# Définition d'un namedtuple comme on définit une classe
Point = namedtuple("Point", ["x", "y"])
#           ↑ nom de la classe   ↑ noms des champs

p = Point(3, 4)
print(p.x)        # → 3
print(p.y)        # → 4
print(p)          # → Point(x=3, y=4)

# Immutabilité
# p.x = 5         # ⚠️ AttributeError: can't set attribute

# Méthodes utiles
print(p._asdict())  # → {'x': 3, 'y': 4}
p2 = p._replace(x=10)
print(p2)           # → Point(x=10, y=4)

# Déballage (unpacking)
x, y = p
print(x, y)      # → 3 4
```

> **Quand l'utiliser ?** Pour des données simples qui ne changent pas : coordonnées, couleurs RGB, enregistrements de base de données, etc.

---

## 8. `dataclasses` : le moderne

Depuis Python 3.7, `@dataclass` génère automatiquement `__init__`, `__repr__`, `__eq__` et plus :

```python
from dataclasses import dataclass

@dataclass
class Personne:
    nom: str
    age: int = 0  # valeur par défaut
    actif: bool = True

# Le __init__ est généré automatiquement !
p1 = Personne("Alice", 30)
p2 = Personne("Bob", 25)
p3 = Personne("Alice", 30)

print(p1)            # → Personne(nom='Alice', age=30, actif=True)
print(p1 == p3)      # → True (__eq__ généré automatiquement)
print(p1 == p2)      # → False

# On peut toujours ajouter des méthodes
@dataclass
class Rectangle:
    largeur: float
    hauteur: float

    def aire(self) -> float:
        return self.largeur * self.hauteur

    @property
    def perimetre(self) -> float:
        return 2 * (self.largeur + self.hauteur)

r = Rectangle(3, 4)
print(r.aire)        # → 12
print(r.perimetre)   # → 14.0
```

### Options avancées de `dataclass`

```python
from dataclasses import dataclass, field

@dataclass(order=True)  # génère __lt__, __le__, __gt__, __ge__
class Produit:
    nom: str
    prix: float
    categorie: str = "Divers"
    tags: list = field(default_factory=list)  # éviter la liste mutable partagée
    id: int = field(compare=False)  # exclu de __eq__ et du tri

p1 = Produit("Pain", 1.20, "Boulangerie", id=1)
p2 = Produit("Lait", 0.90, "Crémerie", id=2)

print(p1 > p2)  # → True (ordre=True permet ça, compare par nom puis prix...)
```

> **Piège courant avec dataclass** : Ne pas utiliser `field(default_factory=list)` pour les listes :
> ```python
> @dataclass
> class Erreur:
>     items: list = []  # ⚠️ Toutes les instances partagent la MÊME liste !
>
> @dataclass
> class Correct:
>     items: list = field(default_factory=list)  # ✅ chaque instance a SA liste
> ```

---

## 9. Bonnes pratiques POO

### Principes à suivre

1. **Une classe = une responsabilité**
   ```python
   # ❌ Mauvais : une classe qui fait tout
   class Gestionnaire:
       def lire_fichier(self): ...
       def valider_donnees(self): ...
       def envoyer_email(self): ...
       def generer_pdf(self): ...

   # ✅ Bon : on sépare les responsabilités
   class LecteurFichier: ...
   class Validateur: ...
   class ServiceEmail: ...
   class GenerateurPDF: ...
   ```

2. **Préférer les attributs privés + propriétés** pour contrôler l'accès

3. **Nommer les classes en PascalCase** (`MaClasse`, pas `ma_classe`)

4. **Docstring obligatoire** pour la classe et les méthodes publiques

5. **Préférer `dataclass`** pour les classes-stockage de données

6. **Éviter les attributs de classe mutables** partagés (listes, dicts)

### Checklist de conception

- [ ] Mon objet a-t-il un état clair ? (attributs)
- [ ] Mon objet a-t-il un comportement ? (méthodes)
- [ ] Chaque méthode fait-elle **une seule chose** ?
- [ ] Les noms sont-ils explicites ?
- [ ] L'encapsulation est-elle respectée ?

---

## Résumé du module

| Concept | À retenir |
|---------|-----------|
| **Classe** | Modèle (plan), définit attributs + méthodes |
| **Objet** | Instance de la classe (réalisation du plan) |
| **`__init__`** | Constructeur, appelé automatiquement |
| **`self`** | Référence à l'instance courante |
| **Attribut de classe** | Partagé par toutes les instances |
| **Attribut d'instance** | Propre à chaque objet |
| **`@classmethod`** | Reçoit `cls`, accès à la classe |
| **`@staticmethod`** | Ni self ni cls, fonction utilitaire |
| **`@property`** | Getter/setter Pythonique |
| **`_x`** | Protégé (convention) |
| **`__x`** | Privé (name mangling) |
| **`dataclass`** | Génération automatique d'`__init__`, `__repr__`, `__eq__` |
| **`namedtuple`** | Classe légère immuable |

---

## Exercices

### Exercice 1 : Compte bancaire
Créez une classe `CompteBancaire` avec :
- Attributs privés : `_titulaire`, `_solde`
- Méthodes : `deposer(montant)`, `retirer(montant)` (vérifie le solde)
- Propriété `solde` en lecture seule
- Propriété `titulaire` avec setter qui valide (non vide)
- `__str__` : `"Compte de X : Y€"`

### Exercice 2 : Livre avec dataclass
Utilisez `@dataclass` pour créer une classe `Livre` avec :
- `titre`, `auteur`, `annee`, `note` (float, défaut 0.0)
- `isbn` (optionnel, str, défaut "")
- Méthode `description()` -> f-string
- `__str__` -> `"Titre (Auteur, Année)"`

### Exercice 3 : Système de gestion d'école
Modélisez avec des classes :
- `Etudiant` : nom, age, notes (liste)
- `Matiere` : nom, coefficient
- `Classe` : liste d'étudiants, liste de matières
- Méthodes : `ajouter_note(etudiant, valeur)`, `moyenne(etudiant)`, `meilleur_etudiant()`
