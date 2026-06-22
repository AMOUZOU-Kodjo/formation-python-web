# Module 25 : Métaclasses et Introspection

**Objectifs pédagogiques**
- Comprendre l'introspection et savoir examiner tout objet Python à l'exécution
- Maîtriser le module `inspect` pour analyser signatures, arbre d'héritage et code source
- Comprendre le modèle d'objets Python : tout est un objet, les classes aussi
- Savoir créer et utiliser une métaclasse
- Connaître les cas d'usage concrets des métaclasses (ORM, validation, singleton)
- Découvrir `__init_subclass__` comme alternative plus simple aux métaclasses

---

## Partie 1 : Introspection — Examiner les objets à l'exécution

L'introspection est la capacité d'un programme à examiner ses propres objets **à l'exécution**. Python rend cela très facile grâce à des fonctions natives et des attributs spéciaux.

### 1.1 Connaître le type d'un objet

```python
# type() retourne le type (la classe) d'un objet
type(42)              # <class 'int'>
type(3.14)            # <class 'float'>
type("hello")         # <class 'str'>
type([1, 2, 3])       # <class 'list'>

# isinstance() vérifie si un objet EST une instance d'une classe (ou sous-classe)
isinstance(42, int)           # True
isinstance(42, float)         # False
isinstance(42, (int, float))  # True (tuple = au moins un match)

# issubclass() vérifie si une classe est une sous-classe d'une autre
issubclass(bool, int)   # True (bool hérite de int)
issubclass(int, object) # True (toute classe hérite de object)
```

**Résultat attendu :**
```python
# → <class 'int'>
# → <class 'float'>
# → <class 'str'>
# → True
# → False
# → True
```

### 1.2 Parcourir les attributs et méthodes

```python
# dir() liste TOUS les attributs et méthodes d'un objet (y compris les méthodes spéciales)
print(dir("hello"))
# → ['__add__', '__class__', '__contains__', '__getitem__', 'capitalize', 'upper', ...]

# hasattr() vérifie si un attribut existe
hasattr("hello", "upper")   # True
hasattr("hello", "foobar")  # False

# getattr() récupère un attribut (avec valeur par défaut)
getattr("hello", "upper")       # <built-in method upper of str object>
getattr("hello", "upper")()     # 'HELLO'
getattr("hello", "foobar", "N/A")  # 'N/A'

# setattr() modifie ou crée un attribut
class Personne:
    pass

p = Personne()
setattr(p, "nom", "Alice")
setattr(p, "age", 30)
print(p.nom)   # → Alice
print(p.age)   # → 30
```

**À retenir :** `hasattr`, `getattr` et `setattr` sont puissants car ils permettent de manipuler des attributs **dont le nom est déterminé dynamiquement** (par ex. stocké dans une variable ou lu depuis un fichier de config).

### 1.3 Les attributs spéciaux d'information

```python
class Exemple:
    """Documentation de la classe Exemple."""
    x = 10

    def methode(self):
        pass

obj = Exemple()

# __class__ : la classe de l'objet
obj.__class__           # <class '__main__.Exemple'>
obj.__class__.__name__  # 'Exemple'

# __dict__ : dictionnaire des attributs de l'instance
obj.y = 20
print(obj.__dict__)     # → {'y': 20}

# __module__ : le nom du module où la classe/fonction a été définie
print(Exemple.__module__)  # → '__main__'

# Avec une fonction :
def ma_fonction(a, b):
    return a + b

print(ma_fonction.__name__)  # → 'ma_fonction'
print(ma_fonction.__code__)  # → <code object ma_fonction...>
print(ma_fonction.__code__.co_varnames)  # → ('a', 'b')
print(ma_fonction.__code__.co_argcount)  # → 2
```

**Piège courant :** `obj.__dict__` ne contient PAS les attributs de classe, seulement les attributs d'instance. Les attributs de classe sont dans `Exemple.__dict__`.

---

## Partie 2 : Le module `inspect` — Introspection avancée

Le module `inspect` de la bibliothèque standard offre des fonctions d'introspection bien plus puissantes que les outils de base.

### 2.1 Inspecter la signature d'une fonction

```python
import inspect

def connecter(host: str, port: int = 8080, timeout: float = 30.0) -> bool:
    """Connecte un client au serveur."""
    return True

# Obtenir la signature
sig = inspect.signature(connecter)
print(sig)  # → (host: str, port: int = 8080, timeout: float = 30.0) -> bool

# Parcourir les paramètres
for nom, param in sig.parameters.items():
    print(f"{nom} : type={param.annotation}, défaut={param.default}")
# → host : type=<class 'str'>, défaut=<class 'inspect._empty'>
# → port : type=<class 'int'>, défaut=8080
# → timeout : type=<class 'float'>, défaut=30.0

# Vérifier le type de retour
print(sig.return_annotation)  # → <class 'bool'>
```

### 2.2 Analyser l'arbre d'héritage

```python
class A: pass
class B(A): pass
class C(B): pass
class D(C, A): pass

# inspect.getmro() = Method Resolution Order
mro = inspect.getmro(D)
for cls in mro:
    print(cls.__name__)
# → D
# → C
# → B
# → A
# → object
```

**Attention :** L'ordre de résolution des méthodes (MRO) détermine dans quel ordre Python cherche les méthodes quand il y a héritage multiple. `D.__mro__` donne le même résultat.

### 2.3 Autres fonctions utiles

```python
# Vérifier la nature d'un objet
inspect.isfunction(connecter)        # True
inspect.ismethod(obj.methode)        # True
inspect.isclass(Exemple)             # True
inspect.ismodule(inspect)            # True

# Obtenir le code source d'une fonction
print(inspect.getsource(connecter))
# → def connecter(host: str, port: int = 8080, ...)

# Obtenir le fichier et la ligne où une fonction/classe est définie
print(inspect.getfile(connecter))  # → chemin/vers/ce/fichier.py
print(inspect.getsourcelines(connecter))  # tuple (lignes, numéro_ligne_debut)
```

**À retenir :** `inspect` est indispensable pour écrire des décorateurs génériques, des frameworks, ou des outils qui doivent analyser dynamiquement le code utilisateur.

---

## Partie 3 : Métaclasses — Les classes qui créent les classes

### 3.1 « Tout est un objet »

En Python, tout est un objet : les entiers, les chaînes, les listes, mais aussi **les fonctions et les classes**.

```python
class MaClasse:
    pass

# Une classe est un objet (instance d'une autre classe)
print(type(MaClasse))          # → <class 'type'>
print(isinstance(MaClasse, type))  # → True

# type est la métaclasse par défaut : c'est elle qui construit les classes
# On peut créer une classe dynamiquement avec type()
MaClasse2 = type('MaClasse2', (), {'x': 10})
obj = MaClasse2()
print(obj.x)  # → 10
```

**Créer une classe avec `type()` :** `type(nom, bases, dict_ns)` équivaut à écrire `class Nom(Bases): ...`

```python
# Équivalence :
# class Animal:
#     def parler(self):
#         return "?"
Animal = type('Animal', (), {'parler': lambda self: "?"})
a = Animal()
print(a.parler())  # → ?

# Avec héritage :
class Mammifere:
    def allaiter(self):
        return "lait"

Chat = type('Chat', (Mammifere,), {'parler': lambda self: "Miaou"})
chat = Chat()
print(chat.parler())   # → Miaou
print(chat.allaiter()) # → lait
```

### 3.2 Créer sa propre métaclasse

Une métaclasse hérite de `type` et redéfinit généralement `__new__` (parfois `__init__`).

```python
class Meta(type):
    """Métaclasse qui ajoute un préfixe 'meta_' aux méthodes."""

    def __new__(mcs, name, bases, namespace):
        # mcs = la métaclasse elle-même (Meta)
        # name = le nom de la future classe
        # bases = les classes parentes
        # namespace = le dictionnaire des attributs de la classe

        print(f"[Meta] Création de la classe {name}")
        print(f"[Meta] Bases : {bases}")

        # On modifie le namespace AVANT la création de la classe
        nouveau_ns = {}
        for attr_name, attr_value in namespace.items():
            if callable(attr_value) and not attr_name.startswith("__"):
                nouveau_ns[f"meta_{attr_name}"] = attr_value
            else:
                nouveau_ns[attr_name] = attr_value

        # On appelle type.__new__ pour créer LA classe
        return super().__new__(mcs, name, bases, nouveau_ns)


class MaClasse(metaclass=Meta):
    def test(self):
        return "original"

    def helper(self):
        return "aide"

obj = MaClasse()
print(obj.test())       # → original
print(obj.meta_test())  # → original (dupliquée avec préfixe)
print(obj.meta_helper()) # → aide
```

**Que se passe-t-il étape par étape ?**

1. Python voit `class MaClasse(metaclass=Meta)`
2. Il appelle `Meta.__new__(Meta, 'MaClasse', (), {...})`
3. Notre `__new__` modifie le namespace (ajoute `meta_test`, `meta_helper`)
4. Il appelle `type.__new__(...)` pour créer l'objet-classe
5. La classe `MaClasse` est créée avec les attributs modifiés

### 3.3 Validation automatique avec une métaclasse

```python
class ValidationMeta(type):
    """Métaclasse qui valide que les classes ont bien une méthode 'executer'."""

    def __new__(mcs, name, bases, namespace):
        # On ignore les classes de base (comme object)
        if name != "BaseAction":
            if "executer" not in namespace:
                raise TypeError(
                    f"La classe {name} doit définir la méthode 'executer'"
                )
        return super().__new__(mcs, name, bases, namespace)


class BaseAction(metaclass=ValidationMeta):
    """Toute action DOIT avoir une méthode executer()."""
    pass

# ✅ OK
class ActionValide(BaseAction):
    def executer(self):
        return "Action exécutée"

# ❌ TypeError : ActionInvalide n'a pas 'executer'
# class ActionInvalide(BaseAction):
#     pass
```

**Résultat attendu :** Si on décommente la classe `ActionInvalide`, on obtient :
```
TypeError: La classe ActionInvalide doit définir la méthode 'executer'
```

### 3.4 Pattern Singleton avec une métaclasse

```python
class SingletonMeta(type):
    """Métaclasse qui garantit une seule instance par classe."""

    _instances = {}

    def __call__(cls, *args, **kwargs):
        # __call__ est appelé quand on fait MaClasse()
        # On vérifie si une instance existe déjà
        if cls not in cls._instances:
            # Créer et stocker l'instance
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]


class Config(metaclass=SingletonMeta):
    def __init__(self):
        self.parametres = {}

    def definir(self, cle, valeur):
        self.parametres[cle] = valeur

    def obtenir(self, cle):
        return self.parametres.get(cle)


c1 = Config()
c2 = Config()
c1.definir("url", "https://api.example.com")

print(c1 is c2)             # → True (même instance)
print(c2.obtenir("url"))    # → https://api.example.com
```

**Comment ça marche ?** Normalement, `type.__call__` fait deux choses : appeler `__new__` puis `__init__`. Notre métaclasse intercepte `__call__` pour retourner l'instance existante au lieu d'en créer une nouvelle.

---

## Partie 4 : `__init_subclass__` — L'alternative simple aux métaclasses

Depuis Python 3.6, `__init_subclass__` permet de réagir à la création d'une sous-classe **sans métaclasse**. C'est plus simple et souvent suffisant.

```python
class PluginBase:
    """Classe de base qui enregistre automatiquement ses sous-classes."""
    plugins = {}

    def __init_subclass__(cls, **kwargs):
        # Appelé AUTOMATIQUEMENT à chaque création d'une sous-classe
        super().__init_subclass__(**kwargs)
        nom = cls.__name__.lower()
        PluginBase.plugins[nom] = cls
        print(f"Plugin enregistré : {nom}")

class PluginAudio(PluginBase):
    def jouer(self):
        return "Son joué"

class PluginVideo(PluginBase):
    def jouer(self):
        return "Vidéo jouée"

print(PluginBase.plugins)
# → {'pluginaudio': <class 'PluginAudio'>, 'pluginvideo': <class 'PluginVideo'>}

# Utilisation :
type_plugin = "pluginaudio"
classe = PluginBase.plugins[type_plugin]
instance = classe()
print(instance.jouer())  # → Son joué
```

**Quand utiliser `__init_subclass__` plutôt qu'une métaclasse ?**
- Si vous voulez seulement réagir à la création de **sous-classes** (pas de n'importe quelle classe)
- Si vous n'avez pas besoin de modifier le comportement de la classe avant sa création
- Si la simplicité est prioritaire

---

## Partie 5 : Cas d'usage concrets des métaclasses

### 5.1 ORM (Object-Relational Mapping)

Les ORM comme SQLAlchemy ou Django utilisent les métaclasses pour mapper des classes Python à des tables SQL.

```python
class ModelMeta(type):
    """Métaclasse qui transforme une classe en modèle SQL."""

    def __new__(mcs, name, bases, namespace):
        if name == "Model":
            return super().__new__(mcs, name, bases, namespace)

        # Collecter les colonnes définies comme attributs de classe
        colonnes = []
        for attr_name, attr_value in list(namespace.items()):
            if isinstance(attr_value, Column):
                colonnes.append((attr_name, attr_value))
                # Supprimer de namespace (ne pas en faire un attribut normal)
                del namespace[attr_name]

        # Ajouter les métadonnées à la classe
        namespace["_table"] = name.lower()
        namespace["_colonnes"] = colonnes
        namespace["_pk"] = colonnes[0][0] if colonnes else None

        return super().__new__(mcs, name, bases, namespace)


class Column:
    def __init__(self, type_sql, pk=False):
        self.type_sql = type_sql
        self.pk = pk


class Model(metaclass=ModelMeta):
    def save(self):
        table = self._table
        valeurs = {}
        for nom, col in self._colonnes:
            valeurs[nom] = getattr(self, nom)
        print(f"INSERT INTO {table} ({', '.join(valeurs.keys())})")
        print(f"VALUES ({tuple(valeurs.values())})")

    @classmethod
    def find(cls, id_val):
        return f"SELECT * FROM {cls._table} WHERE {cls._pk} = {id_val}"


class User(Model):
    id = Column("INTEGER", pk=True)
    name = Column("TEXT")
    email = Column("TEXT")


u = User()
u.id = 1
u.name = "Alice"
u.email = "alice@example.com"
u.save()
# → INSERT INTO user (id, name, email)
# → VALUES ((1, 'Alice', 'alice@example.com'))

print(User.find(1))
# → SELECT * FROM user WHERE id = 1
```

### 5.2 API DSL (Domain Specific Language)

Les métaclasses permettent de créer des API déclaratives élégantes.

```python
class RouterMeta(type):
    def __new__(mcs, name, bases, namespace):
        routes = {}
        for attr_name, attr_value in list(namespace.items()):
            if hasattr(attr_value, '_route'):
                routes[attr_value._route] = attr_value
        namespace['_routes'] = routes
        return super().__new__(mcs, name, bases, namespace)

def route(path):
    def decorator(func):
        func._route = path
        return func
    return decorator

class API(metaclass=RouterMeta):
    def handle(self, path):
        handler = self._routes.get(path)
        if handler:
            return handler(self)
        return "404 Not Found"

class MonAPI(API):
    @route("/hello")
    def hello(self):
        return "Hello World!"

    @route("/status")
    def status(self):
        return "OK"

app = MonAPI()
print(app.handle("/hello"))   # → Hello World!
print(app.handle("/status"))  # → OK
print(app.handle("/other"))   # → 404 Not Found
```

---

## Résumé du module

| Concept | Rôle | Exemple clé |
|---------|------|-------------|
| `type()` | Retourne la classe d'un objet | `type(42) → int` |
| `isinstance()` | Vérifie le type | `isinstance(x, int)` |
| `dir()` | Liste les attributs | `dir(obj)` |
| `getattr()` | Accès dynamique | `getattr(obj, "nom")` |
| `inspect` | Introspection avancée | `inspect.signature(f)` |
| Métaclasse | Classe d'une classe | `class Meta(type):` |
| `type(name, bases, dict)` | Création dynamique de classe | `type('C', (), {})` |
| `__init_subclass__` | Réaction à sous-classe | Plus simple que métaclasse |

**Quand utiliser une métaclasse ?**
- Quand vous voulez modifier ou valider la création de **toutes** les classes d'une hiérarchie
- Pour implémenter des ORM, des systèmes de plugins, des validateurs
- Pour créer des API déclaratives

**Quand éviter une métaclasse ?**
- Quand un décorateur, une classe de base, ou `__init_subclass__` suffit
- Dans du code simple qui n'en a pas besoin (la métaclasse complexifie inutilement)

---

## Exercices

1. **Introspection simple :** Écris une fonction `info_objet(obj)` qui affiche : le type, tous les attributs (sauf les méthodes spéciales), et la signature des méthodes publiques.

2. **Validation automatique :** Crée une métaclasse `AutoSetterMeta` qui, pour chaque attribut de classe défini avec `Field(required=True)`, ajoute automatiquement une validation dans `__init__` qui lève une `ValueError` si la valeur est manquante.

3. **Registre de plugins :** Utilise `__init_subclass__` pour créer un système où chaque sous-classe de `Shape` est automatiquement enregistrée avec son nom, et où une méthode `create(nom)` permet d'instancier la forme correspondante.

4. **Inspecteur de code :** Écris une fonction `analyser_module(path)` qui utilise `inspect` pour lister toutes les classes et fonctions d'un module, avec leurs signatures et leur documentation.
