# Module 14 : Héritage et Polymorphisme

---

## Objectifs pédagogiques

À la fin de ce module, vous serez capable de :
- Comprendre et appliquer l'**héritage** entre classes
- Utiliser `super()` pour appeler les méthodes de la classe parente
- Expliquer et implémenter le **polymorphisme**
- Appliquer le **principe de substitution de Liskov** (LSP)
- Créer des **classes abstraites** avec `ABC` et `@abstractmethod`
- Gérer l'**héritage multiple** et comprendre le **MRO** (*Method Resolution Order*)
- Utiliser les **mixins** pour une composition propre

---

## 1. Héritage simple : le concept

### Pourquoi hériter ?

L'héritage permet à une **classe fille** de **réutiliser** le code d'une **classe mère** (ou parente). C'est une relation "est-un" :

- Un `Chien` **est un** `Animal`
- Une `Voiture` **est un** `Vehicule`
- Un `Professeur` **est une** `Personne`

```python
# Classe parente (ou classe de base)
class Animal:
    def __init__(self, nom):
        self.nom = nom

    def manger(self):
        return f"{self.nom} mange."

    def dormir(self):
        return f"{self.nom} dort."

# Classe fille (ou sous-classe) : Chien hérite de Animal
class Chien(Animal):
    def aboyer(self):
        return f"{self.nom} dit Woof !"

# Création d'un chien
rex = Chien("Rex")

# Méthodes héritées
print(rex.manger())  # → Rex mange.
print(rex.dormir())  # → Rex dort.

# Méthode propre à Chien
print(rex.aboyer())  # → Rex dit Woof !
```

> **À retenir** : La classe `Chien` a **toutes** les méthodes de `Animal` sans avoir à les redéfinir. On dit que `Chien` **hérite** de `Animal`.

### Surcharge (override)

La classe fille peut **redéfinir** (surcharger, *override*) une méthode héritée pour changer son comportement :

```python
class Animal:
    def __init__(self, nom):
        self.nom = nom

    def parler(self):
        return "..."

class Chien(Animal):
    def parler(self):          # surcharge de parler()
        return "Woof !"

class Chat(Animal):
    def parler(self):          # surcharge de parler()
        return "Miaou !"

class Vache(Animal):
    def parler(self):          # surcharge de parler()
        return "Meuh !"

print(Chien("Rex").parler())    # → Woof !
print(Chat("Minou").parler())   # → Miaou !
print(Vache("Marguerite").parler())  # → Meuh !
```

---

## 2. `super()` : appeler le parent

Quand on surcharge une méthode, on veut parfois **étendre** le comportement du parent plutôt que le **remplacer**.

```python
class Animal:
    def __init__(self, nom):
        self.nom = nom
        print(f"Animal.__init__ : {nom}")

class Chien(Animal):
    def __init__(self, nom, race):
        super().__init__(nom)  # appel au constructeur du parent
        self.race = race
        print(f"Chien.__init__ : {nom} est un {race}")

rex = Chien("Rex", "Bergers Allemand")
# Animal.__init__ : Rex        ← appelé via super()
# Chien.__init__ : Rex est un Bergers Allemand
```

### Sans `super()` vs avec `super()`

```python
# SANS super() — on doit répéter le code du parent
class Animal:
    def __init__(self, nom):
        self.nom = nom

class Chien(Animal):
    def __init__(self, nom, race):
        self.nom = nom          # ⚠️ dupliqué !
        self.race = race

# AVEC super() — on délègue au parent
class Animal:
    def __init__(self, nom):
        self.nom = nom

class Chien(Animal):
    def __init__(self, nom, race):
        super().__init__(nom)   # ✅ le parent s'occupe de nom
        self.race = race
```

> **Pourquoi `super()` plutôt que `Animal.__init__(self, nom)` ?**
> - `super()` gère **l'héritage multiple** correctement
> - `super()` utilise le **MRO** (on y revient)
> - `super()` est plus maintenable (si le parent change, pas besoin de modifier)

### `super()` avec les méthodes normales

```python
class Animal:
    def description(self):
        return f"Animal: {self.nom}"

class Chien(Animal):
    def description(self):
        base = super().description()  # appel de la version parente
        return f"{base} (Chien de race {self.race})"

rex = Chien("Rex", "Berger")
print(rex.description())  # → Animal: Rex (Chien de race Berger)
```

---

## 3. Polymorphisme

### Le même nom, des comportements différents

Le **polymorphisme** signifie "plusieurs formes". En POO, c'est la capacité d'objets de classes différentes à répondre à la **même méthode** de manière **spécifique**.

```python
class Chien(Animal):
    def parler(self):
        return "Woof !"

class Chat(Animal):
    def parler(self):
        return "Miaou !"

# Polymorphisme : on traite tous les objets comme des Animal
animaux = [Chien("Rex"), Chat("Minou"), Chien("Médor"), Chat("Sushi")]

for animal in animaux:
    # On appelle la même méthode parler()
    # Mais chaque objet répond différemment
    print(f"{animal.nom}: {animal.parler()}")

# Rex: Woof !
# Minou: Miaou !
# Médor: Woof !
# Sushi: Miaou !
```

### Polymorphisme sans héritage (duck typing)

En Python, pas besoin d'héritage pour le polymorphisme. Si un objet a la méthode, ça marche. C'est le **duck typing** ("si ça marche comme un canard et que ça cancane comme un canard, alors c'est un canard").

```python
class Chien:
    def parler(self):
        return "Woof !"

class Robot:
    def parler(self):
        return "Bip boop !"

class Humain:
    def parler(self):
        return "Bonjour !"

def faire_parler(objet):
    # On se moque du type, on veut juste .parler()
    print(objet.parler())

faire_parler(Chien())    # → Woof !
faire_parler(Robot())    # → Bip boop !
faire_parler(Humain())   # → Bonjour !
```

> **À retenir** : Python privilégie le **comportement** sur le **type**. Si ça a `.parler()`, on peut appeler `.parler()`.

---

## 4. Principe de substitution de Liskov (LSP)

### Énoncé

> "Si `S` est un sous-type de `T`, alors un objet de type `T` peut être remplacé par un objet de type `S` sans altérer le programme."

Dit simplement : **toute sous-classe doit pouvoir remplacer sa classe parente sans rien casser**.

### Exemple qui viole LSP

```python
class Rectangle:
    def __init__(self, largeur, hauteur):
        self.largeur = largeur
        self.hauteur = hauteur

    def set_largeur(self, valeur):
        self.largeur = valeur

    def set_hauteur(self, valeur):
        self.hauteur = valeur

    def aire(self):
        return self.largeur * self.hauteur

class Carre(Rectangle):
    """Un carré est un rectangle particulier, non ?"""
    def set_largeur(self, valeur):
        self.largeur = valeur
        self.hauteur = valeur  # ⚠️ pour garder un carré

    def set_hauteur(self, valeur):
        self.hauteur = valeur
        self.largeur = valeur  # ⚠️

# Problème !
def afficher_aire(rect: Rectangle):
    rect.set_largeur(4)
    rect.set_hauteur(5)
    # On s'attend à ce que largeur=4, hauteur=5
    print(f"Aire = {rect.aire()}")  # 4*5 = 20 attendu

afficher_aire(Rectangle(0, 0))  # → Aire = 20 ✅
afficher_aire(Carre(0, 0))      # → Aire = 25 ⚠️ Car 5*5 = 25 !
```

> **Leçon** : L'héritage `Carre extends Rectangle` viole LSP car le `Carre` ne se comporte pas comme un `Rectangle`. Ici, la **composition** serait préférable.

### Version correcte : composition plutôt qu'héritage

```python
class Carre:
    def __init__(self, cote):
        self.cote = cote

    def aire(self):
        return self.cote ** 2
```

---

## 5. Classes abstraites (ABC)

### Pourquoi des classes abstraites ?

Une **classe abstraite** est une classe qui ne peut **pas** être instanciée directement. Elle sert de **contrat** : elle définit des méthodes que les sous-classes **doivent** implémenter.

```python
from abc import ABC, abstractmethod

class Forme(ABC):
    """Classe abstraite — ne peut pas être instanciée directement."""

    @abstractmethod
    def aire(self):
        """Méthode abstraite — doit être implémentée par les sous-classes."""
        pass

    def description(self):
        """Méthode concrète — héritée telle quelle."""
        return f"Forme avec aire = {self.aire()}"

# f = Forme()  # ⚠️ TypeError: Can't instantiate abstract class Forme

class Carre(Forme):
    def __init__(self, cote):
        self.cote = cote

    def aire(self):         # implémentation OBLIGATOIRE
        return self.cote ** 2

class Cercle(Forme):
    def __init__(self, rayon):
        self.rayon = rayon

    def aire(self):         # implémentation OBLIGATOIRE
        return 3.14159 * self.rayon ** 2

carre = Carre(5)
cercle = Cercle(3)

print(carre.description())   # → Forme avec aire = 25
print(cercle.description())  # → Forme avec aire = 28.274...

# Polymorphisme garanti par le contrat
formes = [Carre(4), Cercle(2), Carre(10)]
for forme in formes:
    print(f"Aire = {forme.aire()}")  # 16, 12.56, 100
```

### Pourquoi utiliser ABC plutôt qu'une exception ?

```python
# Version sans ABC (mauvaise pratique)
class Forme:
    def aire(self):
        raise NotImplementedError("Implémentez aire() !")

class Carre(Forme):
    pass  # oubli d'implémenter aire()

c = Carre(5)
print(c.aire())  # ⚠️ erreur seulement à l'exécution !

# Version avec ABC (bonne pratique)
from abc import ABC, abstractmethod

class Forme(ABC):
    @abstractmethod
    def aire(self):
        pass

class Carre(Forme):
    pass  # oubli d'implémenter aire()

# c = Carre(5)  # ⚠️ TypeError immédiat à la création !
```

> **À retenir** : ABC donne une erreur **dès la création** de l'objet, pas au moment de l'appel de la méthode.

---

## 6. Héritage multiple

### Principe

En Python, une classe peut hériter de **plusieurs** classes parentes :

```python
class Volant:
    def voler(self):
        return "Je vole dans les airs !"

class Aquatic:
    def nager(self):
        return "Je nage dans l'eau !"

class Canard(Volant, Aquatic):
    def decrire(self):
        return f"{self.voler()} et {self.nager()}"

canard = Canard()
print(canard.voler())     # → Je vole dans les airs !
print(canard.nager())     # → Je nage dans l'eau !
print(canard.decrire())   # → Je vole dans les airs ! et Je nage dans l'eau !
```

### Problème : le diamant

```python
class A:
    def methode(self):
        return "A"

class B(A):
    def methode(self):
        return "B"

class C(A):
    def methode(self):
        return "C"

class D(B, C):
    pass

d = D()
print(d.methode())  # → B (mais pourquoi ?)
```

> **Question** : D hérite de B et C, qui héritent tous deux de A. Quelle méthode est appelée ? C'est le **MRO** qui décide.

---

## 7. MRO — Method Resolution Order

### C'est quoi ?

Le **MRO** est l'ordre dans lequel Python cherche les méthodes. Il utilise l'**algorithme C3 linéarisation** (ou **C3 Linearization**).

### Visualiser le MRO

```python
class A:
    pass

class B(A):
    pass

class C(A):
    pass

class D(B, C):
    pass

print(D.__mro__)
# → (<class '__main__.D'>, <class '__main__.B'>,
#    <class '__main__.C'>, <class '__main__.A'>,
#    <class 'object'>)

# Version plus lisible :
for cls in D.__mro__:
    print(cls.__name__)
# D
# B
# C
# A
# object
```

### Diagramme textuel du MRO

```
        object
          ↑
          A
         ↙ ↘
        B   C   ← D.__mro__ = [D, B, C, A, object]
         ↘ ↙     Python suit cette flèche :
          D        D → B → C → A → object
```

### L'algorithme C3 en résumé

1. La classe elle-même d'abord
2. Les parents dans l'ordre de déclaration
3. Les grands-parents, etc.
4. `object` en dernier (toujours)

```python
class X: pass
class Y: pass
class Z: pass
class P(X, Y): pass
class Q(Y, Z): pass
class R(P, Q): pass

for cls in R.__mro__:
    print(cls.__name__, end=" → ")
# R → P → X → Q → Y → Z → object →
```

> **Règle d'or** : Le MRO est cohérent. Si une classe parente apparaît après une autre, elle doit être cohérente avec l'ordre des parents.

### Pourquoi c'est important ?

```python
class A:
    def methode(self):
        return "A"

class B(A):
    def methode(self):
        return f"B → {super().methode()}"

class C(A):
    def methode(self):
        return f"C → {super().methode()}"

class D(B, C):
    def methode(self):
        return f"D → {super().methode()}"

d = D()
print(d.methode())
# D → B → C → A
# Grâce à super() et MRO, la chaîne est cohérente
```

---

## 8. Mixins : héritage multiple bien utilisé

Un **mixin** est une classe conçue uniquement pour être **héritée** et **ajouter des fonctionnalités**, jamais instanciée seule.

### Exemple : mixins pour des logs

```python
class LogMixin:
    """Mixin qui ajoute des capacités de logging."""
    def log(self, message):
        print(f"[LOG - {self.__class__.__name__}] {message}")

class TimestampMixin:
    """Mixin qui ajoute un timestamp."""
    import time
    def timestamp(self):
        return time.strftime("%H:%M:%S")

class SauvegardeMixin:
    """Mixin qui permet la sauvegarde."""
    def sauvegarder(self, fichier):
        print(f"Sauvegarde de {self} dans {fichier}")

# Utilisation concrète
class Utilisateur(LogMixin, TimestampMixin):
    def __init__(self, nom):
        self.nom = nom
        self.log(f"Création de l'utilisateur {nom} à {self.timestamp()}")

    def __str__(self):
        return f"Utilisateur({self.nom})"

class Article(LogMixin, SauvegardeMixin):
    def __init__(self, titre):
        self.titre = titre
        self.log(f"Création de l'article {titre}")

    def __str__(self):
        return f"Article({self.titre})"

# Test
u = Utilisateur("Alice")
# → [LOG - Utilisateur] Création de l'utilisateur Alice à 14:30:22

a = Article("POO en Python")
# → [LOG - Article] Création de l'article POO en Python

a.sauvegarder("article.txt")
# → Sauvegarde de Article(POO en Python) dans article.txt
```

### Règles pour un bon mixin

1. **Nom se terminant par `Mixin`** (convention)
2. **Pas de constructeur** (ou appeler `super().__init__()`)
3. **Responsabilité unique** (un mixin = une fonctionnalité)
4. **Peut être combiné** avec d'autres mixins librement

---

## 9. Bonnes pratiques héritage

### Quand utiliser l'héritage ?

✅ **Oui** : Relation "est-un" claire
- `Chien` **est un** `Animal` ✓
- `Carre` **est une** `Forme` ✓
- `Professeur` **est une** `Personne` ✓

❌ **Non** : Relation "a-un" (préférer la composition)
- `Voiture` **a un** `Moteur` → composition
- `Ecole` **a des** `Etudiants` → composition
- `Commande` **a une** `Adresse` → composition

### Composition vs Héritage

```python
# Héritage (est-un)
class Moteur:
    def demarrer(self):
        return "Vroom !"

class Voiture(Moteur):  # Une voiture est un moteur ? Bizarre...
    pass

# Composition (a-un) — PRÉFÉRABLE
class Voiture:
    def __init__(self):
        self.moteur = Moteur()  # La voiture A un moteur

    def demarrer(self):
        return self.moteur.demarrer()
```

---

## Résumé du module

| Concept | À retenir |
|---------|-----------|
| **Héritage** | `class Fille(Parent):` — réutilisation de code |
| **`super()`** | Appel aux méthodes du parent (nécessaire dans `__init__`) |
| **Override** | Redéfinition d'une méthode dans la sous-classe |
| **Polymorphisme** | Même méthode, comportement différent selon la classe |
| **Duck typing** | "Si ça parle comme un canard..." — pas besoin d'héritage |
| **LSP** | Une sous-classe doit pouvoir remplacer son parent |
| **ABC** | `from abc import ABC, abstractmethod` — contrat obligatoire |
| **Héritage multiple** | `class Fille(P1, P2):` — attention au MRO |
| **MRO** | Ordre de résolution des méthodes (C3 linearization) |
| **Mixin** | Classe légère pour ajouter une fonctionnalité |

---

## Exercices

### Exercice 1 : Hiérarchie de formes
Créez :
1. Une classe abstraite `Forme` avec `@abstractmethod aire()` et `perimetre()`
2. `Rectangle(largeur, hauteur)` implémente `aire()` et `perimetre()`
3. `Cercle(rayon)` implémente `aire()` et `perimetre()`
4. Créez une liste de formes et calculez l'aire totale

### Exercice 2 : Système d'employés
Créez la hiérarchie :
- `Employe` : nom, salaire_base, méthode `salaire()` (renvoie salaire_base)
- `Commercial(Employe)` : + `prime`, `salaire()` = salaire_base + prime
- `Manager(Employe)` : + `bonus`, `salaire()` = salaire_base * 1.1 + bonus
- Utilisez `super().__init__()` et `super().salaire()`

### Exercice 3 : Mixins pour des médias
Créez des mixins :
- `LikableMixin` : `likes` (liste), `liker(utilisateur)`, `nb_likes()`
- `CommentableMixin` : `commentaires`, `commenter(utilisateur, texte)`
- `PartageableMixin` : `nb_partages`, `partager()`
- Puis créez `Publication(CommentableMixin, LikableMixin)` et `Video(CommentableMixin, LikableMixin, PartageableMixin)`

### Exercice 4 : Vérification LSP
Trouvez une situation où l'héritage viole LSP, corrigez-la avec la composition.
