export const MODULES = [
  { id: "01-introduction", title: "Introduction à Python", short: "Introduction", part: 1, duration: "2h", desc: "Installez Python et écrivez vos premiers scripts. Découvrez l'histoire, l'écosystème et les outils essentiels.", icon: "🐍", color: "#4CAF50" },
  { id: "02-variables-types", title: "Variables, types et opérateurs", short: "Variables & Types", part: 1, duration: "2h", desc: "Maîtrisez les types fondamentaux (int, float, str, bool), les variables et tous les opérateurs Python.", icon: "🔢", color: "#66BB6A" },
  { id: "03-strings", title: "Chaînes de caractères", short: "Strings", part: 1, duration: "2h", desc: "Manipulez le texte comme un pro : méthodes, slicing, f-strings, formatage avancé.", icon: "📝", color: "#81C784" },
  { id: "04-listes-tuples", title: "Listes et tuples", short: "Listes & Tuples", part: 1, duration: "2h", desc: "Les collections ordonnées : création, méthodes, slicing, compréhensions simples.", icon: "📋", color: "#A5D6A7" },
  { id: "05-dictionnaires-ensembles", title: "Dictionnaires et ensembles", short: "Dicts & Sets", part: 1, duration: "2h", desc: "Associations clé-valeur et collections d'éléments uniques avec leurs cas d'usage.", icon: "🗂️", color: "#C8E6C9" },
  { id: "06-controle-flux", title: "Contrôle de flux", short: "Contrôle de flux", part: 1, duration: "2h", desc: "Maîtrisez if/elif/else, match/case, l'opérateur ternaire et le walrus operator.", icon: "🔀", color: "#2E7D32" },
  { id: "07-boucles", title: "Boucles", short: "Boucles", part: 1, duration: "2h", desc: "Itérez efficacement avec for et while, contrôlez le flux avec break/continue/else.", icon: "🔄", color: "#388E3C" },
  { id: "08-fonctions", title: "Fonctions", short: "Fonctions", part: 1, duration: "3h", desc: "Créez des fonctions réutilisables, maîtrisez les paramètres, la portée et les closures.", icon: "⚙️", color: "#43A047" },
  { id: "09-comprehensions", title: "Compréhensions", short: "Compréhensions", part: 1, duration: "2h", desc: "Écrivez du code concis et performant avec les list/dict/set comprehensions.", icon: "💡", color: "#4CAF50" },
  { id: "10-erreurs-exceptions", title: "Gestion des erreurs", short: "Exceptions", part: 1, duration: "2h", desc: "Anticipez et gérez les erreurs avec try/except, créez vos propres exceptions.", icon: "🛡️", color: "#66BB6A" },
  { id: "11-modules-packages", title: "Modules et packages", short: "Modules", part: 2, duration: "2h", desc: "Organisez votre code en modules et packages réutilisables.", icon: "📦", color: "#FF9800" },
  { id: "12-fichiers", title: "Fichiers", short: "Fichiers", part: 2, duration: "2h", desc: "Lisez et écrivez des fichiers texte, CSV, JSON. Maîtrisez pathlib et les context managers.", icon: "📁", color: "#FFA726" },
  { id: "13-poo-classes", title: "POO — Classes", short: "Classes", part: 2, duration: "3h", desc: "Plongez dans la programmation orientée objet : classes, attributs, méthodes, propriétés.", icon: "🏛️", color: "#FFB74D" },
  { id: "14-heritage-polymorphisme", title: "Héritage et polymorphisme", short: "Héritage", part: 2, duration: "3h", desc: "Héritage, polymorphisme, classes abstraites, héritage multiple et MRO.", icon: "🧬", color: "#FFCC80" },
  { id: "15-methodes-speciales", title: "Méthodes spéciales", short: "Dunder methods", part: 2, duration: "2h", desc: "Personnalisez vos objets avec __str__, __add__, __call__ et 50+ autres méthodes.", icon: "✨", color: "#FFE0B2" },
  { id: "16-iterateurs-generateurs", title: "Itérateurs et générateurs", short: "Itérateurs", part: 2, duration: "2h", desc: "Créez des séquences à la demande avec yield et économisez la mémoire.", icon: "⏳", color: "#F57C00" },
  { id: "17-decorateurs", title: "Décorateurs", short: "Décorateurs", part: 2, duration: "2h", desc: "Étendez le comportement des fonctions sans les modifier avec les décorateurs.", icon: "🎀", color: "#E65100" },
  { id: "18-context-managers", title: "Context managers", short: "Context managers", part: 2, duration: "2h", desc: "Gérez automatiquement les ressources avec with, __enter__/__exit__ et contextlib.", icon: "📎", color: "#BF360C" },
  { id: "19-bibliotheque-standard", title: "Bibliothèque standard", short: "Biblio standard", part: 3, duration: "3h", desc: "Explorez math, random, datetime, os, sys, json, collections et plus.", icon: "📚", color: "#9C27B0" },
  { id: "20-regex", title: "Expressions régulières", short: "Regex", part: 3, duration: "3h", desc: "Maîtrisez les regex pour valider, rechercher et transformer du texte.", icon: "🔍", color: "#AB47BC" },
  { id: "21-fonctionnelle", title: "Programmation fonctionnelle", short: "Fonctionnelle", part: 3, duration: "2h", desc: "Map, filter, reduce, lambda, itertools et functools pour un code élégant.", icon: "λ", color: "#BA68C8" },
  { id: "22-type-hints", title: "Type hints", short: "Typage", part: 3, duration: "2h", desc: "Ajoutez des types à votre code avec typing, TypeVar, Protocol et validez avec mypy.", icon: "🏷️", color: "#CE93D8" },
  { id: "23-async-await", title: "Async / Await", short: "Async", part: 3, duration: "3h", desc: "Programmation asynchrone : asyncio, gather, create_task et aiohttp.", icon: "⚡", color: "#E1BEE7" },
  { id: "24-threading-multiprocess", title: "Threading & Multiprocess", short: "Threading", part: 3, duration: "3h", desc: "Parallélisme avec threading et multiprocessing, GIL, synchronisation.", icon: "🧵", color: "#4A148C" },
  { id: "25-metaclasses-introspection", title: "Métaclasses & Introspection", short: "Métaclasses", part: 4, duration: "3h", desc: "Introspection avancée, métaclasses, __init_subclass__, cas concrets (ORM, DSL).", icon: "🪞", color: "#D32F2F" },
  { id: "26-design-patterns", title: "Design patterns", short: "Patterns", part: 4, duration: "3h", desc: "Singleton, Factory, Observer, Strategy et autres patterns en Python.", icon: "🏗️", color: "#E53935" },
  { id: "27-tests-unitaires", title: "Tests unitaires", short: "Tests", part: 4, duration: "3h", desc: "Testez votre code avec pytest, unittest, mocking et TDD.", icon: "🧪", color: "#EF5350" },
  { id: "28-logging-debugging", title: "Logging & Debugging", short: "Logging", part: 4, duration: "2h", desc: "Journalisation avancée, debugging avec pdb, profiling avec cProfile.", icon: "🐛", color: "#F44336" },
  { id: "29-environnements-virtuels", title: "Environnements virtuels", short: "Venv", part: 4, duration: "2h", desc: "venv, pip, pipenv, poetry, conda et bonnes pratiques de gestion de projet.", icon: "📦", color: "#EF9A9A" },
  { id: "30-packaging-distribution", title: "Packaging & Distribution", short: "Packaging", part: 4, duration: "2h", desc: "Créez et distribuez vos packages Python sur PyPI avec pyproject.toml.", icon: "📤", color: "#FFCDD2" },
  { id: "31-api-rest", title: "API REST avec FastAPI", short: "API REST", part: 4, duration: "4h", desc: "Créez des APIs REST modernes avec FastAPI, Pydantic et Uvicorn.", icon: "🌐", color: "#1565C0" },
  { id: "32-bases-de-donnees", title: "Bases de données", short: "BDD", part: 4, duration: "4h", desc: "SQLite, SQLAlchemy ORM, relations, sessions, migrations Alembic.", icon: "🗄️", color: "#1976D2" },
  { id: "33-web-scraping", title: "Web scraping", short: "Scraping", part: 4, duration: "3h", desc: "Extrayez des données du web avec requests, BeautifulSoup et Selenium.", icon: "🕸️", color: "#1E88E5" },
  { id: "34-data-science", title: "Data Science", short: "Data Science", part: 4, duration: "4h", desc: "Analysez des données avec NumPy et Pandas : vectorisation, DataFrames, agrégation.", icon: "📊", color: "#42A5F5" },
  { id: "35-visualisation", title: "Visualisation", short: "Visualisation", part: 4, duration: "3h", desc: "Créez des graphiques percutants avec Matplotlib et Seaborn.", icon: "📈", color: "#64B5F6" },
  { id: "36-projet-final", title: "Projet final", short: "Projet final", part: 4, duration: "8h", desc: "Appliquez toutes vos compétences sur un projet complet au choix.", icon: "🏆", color: "#0D47A1" },
]

export const PARTS = [
  { id: 1, title: "Les Fondamentaux", color: "#4CAF50", desc: "Les bases essentielles de Python" },
  { id: 2, title: "Intermédiaire", color: "#FF9800", desc: "Approfondissez vos connaissances" },
  { id: 3, title: "Avancé", color: "#9C27B0", desc: "Concepts avancés du langage" },
  { id: 4, title: "Expert / Spécialisation", color: "#D32F2F", desc: "Maîtrisez l'écosystème Python" },
]

export const QUIZZES = {
  "01-introduction": [
    { q: "Quel mot-clé permet d'afficher un message en Python ?", choices: ["console.log", "print", "echo", "write"], correct: 1 },
    { q: "Quel est le symbole de commentaire en Python ?", choices: ["//", "#", "/*", "--"], correct: 1 },
    { q: "Quelle fonction permet de lire une saisie utilisateur ?", choices: ["read()", "scan()", "input()", "get()"], correct: 2 },
  ],
  "02-variables-types": [
    { q: "Quel est le type de 3.14 en Python ?", choices: ["int", "float", "double", "decimal"], correct: 1 },
    { q: "Quel opérateur donne le reste d'une division ?", choices: ["/", "//", "%", "**"], correct: 2 },
    { q: "Que retourne bool(0) ?", choices: ["True", "False", "None", "0"], correct: 1 },
  ],
  "03-strings": [
    { q: "Quelle methode met une chaine en majuscules ?", choices: ["upper()", "capitalize()", "uppercase()", "toUpper()"], correct: 0 },
    { q: "Que retourne 'Python'[::-1] ?", choices: ["nohtyP", "Python", "P", "Erreur"], correct: 0 },
    { q: "Quelle syntaxe permet d'inserer une variable dans une chaine ?", choices: ["f'{var}", "'%s' % var", "var.toString()", "${var}"], correct: 0 },
  ],
  "04-listes-tuples": [
    { q: "Quelle methode ajoute un element a la fin d'une liste ?", choices: ["add()", "append()", "push()", "insert()"], correct: 1 },
    { q: "Quelle difference entre une liste et un tuple ?", choices: ["Le tuple est immuable", "La liste est plus rapide", "Le tuple peut contenir des nombres", "Aucune"], correct: 0 },
    { q: "Que retourne len([1, 2, 3]) ?", choices: ["2", "3", "4", "TypeError"], correct: 1 },
  ],
  "05-dictionnaires-ensembles": [
    { q: "Quelle methode accede a une cle sans lever d'erreur ?", choices: ["get()", "fetch()", "access()", "retrieve()"], correct: 0 },
    { q: "Quelle operation combine deux ensembles sans doublons ?", choices: ["union (|)", "intersection (&)", "difference (-)", "produit"], correct: 0 },
    { q: "Que retourne {1, 2, 3} & {2, 3, 4} ?", choices: ["{1, 2, 3, 4}", "{2, 3}", "{1, 4}", "set()"], correct: 1 },
  ],
  "06-controle-flux": [
    { q: "Quel mot-clé commence un bloc conditionnel ?", choices: ["if", "for", "while", "switch"], correct: 0 },
    { q: "Quel operateur permet d'ecrire une condition en une ligne ?", choices: ["ternaire (x if c else y)", "et/ou logique", "match/case", "lambda"], correct: 0 },
    { q: "Quelle structure remplace le switch d'autres langages en Python 3.10+ ?", choices: ["match/case", "switch/case", "select/case", "when/case"], correct: 0 },
  ],
  "07-boucles": [
    { q: "Quelle fonction genère une sequence de nombres ?", choices: ["range()", "count()", "number()", "seq()"], correct: 0 },
    { q: "Quel mot-clé sort immediatement d'une boucle ?", choices: ["break", "continue", "exit", "return"], correct: 0 },
    { q: "Quelle fonction donne l'index pendant une boucle for ?", choices: ["enumerate()", "index()", "position()", "count()"], correct: 0 },
  ],
  "08-fonctions": [
    { q: "Quel mot-clé definit une fonction ?", choices: ["def", "function", "func", "define"], correct: 0 },
    { q: "Que renvoie une fonction sans return ?", choices: ["None", "0", "False", "Erreur"], correct: 0 },
    { q: "Comment ecrire un nombre variable d'arguments ?", choices: ["*args", "&args", "args...", "varargs"], correct: 0 },
  ],
  "09-comprehensions": [
    { q: "Quelle est la syntaxe d'une liste en comprehension ?", choices: ["[x for x in iter]", "{x for x in iter}", "(x for x in iter)", "for x in iter => x"], correct: 0 },
    { q: "Quel avantage principal des comprehensions ?", choices: ["Plus rapide qu'une boucle", "Plus lisible", "Utilise moins de memoire", "Les deux A et B"], correct: 3 },
    { q: "Comment filtrer dans une comprehension ?", choices: ["if condition apres le for", "where condition", "filter: condition", "with condition"], correct: 0 },
  ],
  "10-erreurs-exceptions": [
    { q: "Quel bloc contient le code a surveiller ?", choices: ["try", "except", "finally", "catch"], correct: 0 },
    { q: "Quel mot-clé declenche une exception ?", choices: ["raise", "throw", "error", "exception"], correct: 0 },
    { q: "Quel bloc s'execute toujours, meme en cas d'erreur ?", choices: ["finally", "always", "end", "done"], correct: 0 },
  ],
  "11-modules-packages": [
    { q: "Comment importer un module en lui donnant un alias ?", choices: ["import X as Y", "import X alias Y", "from X import Y", "using X as Y"], correct: 0 },
    { q: "Quel fichier rend un dossier importable comme package ?", choices: ["__init__.py", "index.py", "package.py", "main.py"], correct: 0 },
    { q: "Quel bloc execute du code seulement si le fichier est lancé directement ?", choices: ["if __name__ == '__main__'", "if __main__", "if __file__ == '__main__'", "if direct_execution"], correct: 0 },
  ],
  "12-fichiers": [
    { q: "Quel mode ouvre un fichier en lecture ?", choices: ["'r'", "'w'", "'a'", "'x'"], correct: 0 },
    { q: "Quel mot-clé garantit la fermeture automatique d'un fichier ?", choices: ["with", "open", "close", "auto"], correct: 0 },
    { q: "Quel module moderne gere les chemins de fichiers ?", choices: ["pathlib", "os.path", "filepath", "shutil"], correct: 0 },
  ],
  "13-poo-classes": [
    { q: "Quel mot-clé definit une classe ?", choices: ["class", "struct", "object", "type"], correct: 0 },
    { q: "Quel parametre fait reference a l'instance dans une methode ?", choices: ["self", "this", "me", "instance"], correct: 0 },
    { q: "Quelle methode initialise une instance ?", choices: ["__init__", "__new__", "__start__", "__create__"], correct: 0 },
  ],
  "14-heritage-polymorphisme": [
    { q: "Quel mot-clé appelle la methode du parent ?", choices: ["super()", "parent()", "base()", "this()"], correct: 0 },
    { q: "Que signifie MRO ?", choices: ["Method Resolution Order", "Main Runtime Object", "Module Reference Output", "Memory Read Operation"], correct: 0 },
    { q: "Quel module permet de creer des classes abstraites ?", choices: ["ABC (abc module)", "abstract", "interface", "protocol"], correct: 0 },
  ],
  "15-methodes-speciales": [
    { q: "Quelle m\u00e9thode sp\u00e9ciale est appel\u00e9e par str() ?", choices: ["__str__", "__repr__", "__format__", "__bytes__"], correct: 0 },
    { q: "Quel op\u00e9rateur est surcharg\u00e9 par __add__ ?", choices: ["+", "-", "*", "/"], correct: 0 },
    { q: "Que permet __call__ sur un objet ?", choices: ["Le convertir en cha\u00eene", "Le rendre appelable", "Le comparer", "L'it\u00e9rer"], correct: 1 },
  ],
  "16-iterateurs-generateurs": [
    { q: "Quel mot-cl\u00e9 transforme une fonction en g\u00e9n\u00e9rateur ?", choices: ["return", "yield", "await", "pass"], correct: 1 },
    { q: "Quelle m\u00e9thode une classe doit-elle impl\u00e9menter pour \u00eatre un it\u00e9rateur ?", choices: ["__iter__()", "__next__()", "__getitem__()", "__len__()"], correct: 1 },
    { q: "Quel avantage principal offrent les g\u00e9n\u00e9rateurs ?", choices: ["Vitesse d'ex\u00e9cution", "M\u00e9moire r\u00e9duite", "Syntaxe plus courte", "D\u00e9bogage facilit\u00e9"], correct: 1 },
  ],
  "17-decorateurs": [
    { q: "Quel symbole pr\u00e9c\u00e8de un d\u00e9corateur en Python ?", choices: ["@", "#", "$", "%"], correct: 0 },
    { q: "Que re\u00e7oit un d\u00e9corateur en param\u00e8tre ?", choices: ["Une classe", "Une fonction", "Un module", "Une cha\u00eene"], correct: 1 },
    { q: "\u00c0 quoi sert functools.wraps dans un d\u00e9corateur ?", choices: ["Acc\u00e9l\u00e9rer l'ex\u00e9cution", "Pr\u00e9server les m\u00e9tadonn\u00e9es", "Ajouter des logs", "Valider les types"], correct: 1 },
  ],
  "18-context-managers": [
    { q: "Quelles m\u00e9thodes d\u00e9finit un context manager ?", choices: ["__enter__ / __exit__", "__open__ / __close__", "__start__ / __stop__", "__init__ / __del__"], correct: 0 },
    { q: "Quel mot-cl\u00e9 utilise-t-on avec un context manager ?", choices: ["using", "with", "open", "context"], correct: 1 },
    { q: "Quel module fournit le d\u00e9corateur contextmanager ?", choices: ["functools", "contextlib", "itertools", "collections"], correct: 1 },
  ],
  "19-bibliotheque-standard": [
    { q: "Quel module donne acc\u00e8s aux fonctions math\u00e9matiques avanc\u00e9es ?", choices: ["math", "calc", "numbers", "decimal"], correct: 0 },
    { q: "Quelle classe de collections compte les \u00e9l\u00e9ments d'un it\u00e9rable ?", choices: ["Counter", "defaultdict", "deque", "OrderedDict"], correct: 0 },
    { q: "Quel module permet de manipuler les chemins de fichiers de mani\u00e8re orient\u00e9e objet ?", choices: ["os.path", "pathlib", "shutil", "filepath"], correct: 1 },
  ],
  "20-regex": [
    { q: "Quel module Python g\u00e8re les expressions r\u00e9guli\u00e8res ?", choices: ["regex", "re", "regexp", "pyre"], correct: 1 },
    { q: "Que retourne re.match() si la correspondance \u00e9choue ?", choices: ["False", "None", "\"\"", "[]"], correct: 1 },
    { q: "Quel m\u00e9tacaract\u00e8re signifie d\u00e9but de cha\u00eene ?", choices: ["$", "^", ".", "*"], correct: 1 },
  ],
  "21-fonctionnelle": [
    { q: "Quelle fonction applique une op\u00e9ration \u00e0 tous les \u00e9l\u00e9ments d'un it\u00e9rable ?", choices: ["map", "filter", "reduce", "apply"], correct: 0 },
    { q: "Quel mot-cl\u00e9 cr\u00e9e une fonction anonyme ?", choices: ["def", "lambda", "fn", "function"], correct: 1 },
    { q: "Que g\u00e9n\u00e8re itertools.chain ?", choices: ["Des nombres infinis", "Des it\u00e9rables concat\u00e9n\u00e9s", "Des permutations", "Des cycles"], correct: 1 },
  ],
  "22-type-hints": [
    { q: "Comment indiquer qu'une variable est de type int ?", choices: ["x: int", "int x", "x :: int", "typeof x = int"], correct: 0 },
    { q: "Quel module fournit les types g\u00e9n\u00e9riques ?", choices: ["types", "typing", "generics", "typehints"], correct: 1 },
    { q: "Que signifie Optional[int] ?", choices: ["int ou None", "int ou float", "int optionnel (non requis)", "int mutable"], correct: 0 },
  ],
  "23-async-await": [
    { q: "Quel mot-cl\u00e9 d\u00e9clare une fonction asynchrone ?", choices: ["async", "await", "def async", "coroutine"], correct: 0 },
    { q: "Quel module est la biblioth\u00e8que standard pour l'asynchrone ?", choices: ["aiohttp", "asyncio", "asyncore", "threading"], correct: 1 },
    { q: "Que fait asyncio.gather() ?", choices: ["Lance plusieurs coroutines en parall\u00e8le", "Attend une seule coroutine", "Cr\u00e9e une boucle", "Ferme une boucle"], correct: 0 },
  ],
  "24-threading-multiprocess": [
    { q: "Quel module permet de cr\u00e9er des processus parall\u00e8les ?", choices: ["threading", "multiprocessing", "subprocess", "parallel"], correct: 1 },
    { q: "Qu'est-ce que le GIL en Python ?", choices: ["Une biblioth\u00e8que syst\u00e8me", "Un verrou global d'interpr\u00e9teur", "Un type de donn\u00e9es", "Un d\u00e9corateur"], correct: 1 },
    { q: "Quelle classe de threading permet la synchronisation ?", choices: ["Lock", "Barrier", "Semaphore", "Toutes ces r\u00e9ponses"], correct: 3 },
  ],
  "25-metaclasses-introspection": [
    { q: "Quelle fonction retourne le type d'un objet ?", choices: ["type()", "class()", "dir()", "isinstance()"], correct: 0 },
    { q: "Quelle m\u00e9thode de m\u00e9taclasse est appel\u00e9e lors de la d\u00e9finition d'une classe ?", choices: ["__new__", "__init__", "__call__", "__init_subclass__"], correct: 0 },
    { q: "Quelle est la m\u00e9taclasse par d\u00e9faut en Python ?", choices: ["object", "type", "class", "Meta"], correct: 1 },
  ],
  "26-design-patterns": [
    { q: "Quel pattern garantit une instance unique d'une classe ?", choices: ["Singleton", "Factory", "Observer", "Strategy"], correct: 0 },
    { q: "Quel pattern permet de modifier le comportement d'un objet à l'exécution ?", choices: ["Decorator", "Adapter", "Proxy", "Composite"], correct: 0 },
    { q: "Quel pattern définit une famille d'algorithmes interchangeables ?", choices: ["Strategy", "Observer", "Factory", "Command"], correct: 0 },
  ],
  "27-tests-unitaires": [
    { q: "Quelle bibliothèque est recommandée pour les tests en Python ?", choices: ["pytest", "unittest", "nosetests", "doctest"], correct: 0 },
    { q: "Quelle fonction de pytest vérifie qu'une valeur est vraie ?", choices: ["assert", "verify", "check", "expect"], correct: 0 },
    { q: "Qu'est-ce qu'un mock ?", choices: ["Un objet qui simule un vrai objet", "Un test lent", "Une classe de test", "Un decorateur"], correct: 0 },
  ],
  "28-logging-debugging": [
    { q: "Quel niveau de logging est le plus severe ?", choices: ["CRITICAL", "ERROR", "WARNING", "INFO"], correct: 0 },
    { q: "Quelle fonction lance le debugger en Python 3.7+ ?", choices: ["breakpoint()", "debug()", "pdb.set_trace()", "inspect()"], correct: 0 },
    { q: "Quel module permet de mesurer le temps d'execution ?", choices: ["timeit", "cProfile", "datetime", "Les deux A et B"], correct: 3 },
  ],
  "29-environnements-virtuels": [
    { q: "Quelle commande cree un environnement virtuel ?", choices: ["python -m venv .venv", "python venv create", "virtualenv init", "pip venv"], correct: 0 },
    { q: "Quel fichier liste les dependances d'un projet ?", choices: ["requirements.txt", "packages.txt", "deps.txt", "modules.txt"], correct: 0 },
    { q: "Quel outil moderne remplace pip + venv + poetry ?", choices: ["uv", "conda", "pipenv", "Tous sont des alternatives"], correct: 3 },
  ],
  "30-packaging-distribution": [
    { q: "Quel fichier contient la configuration moderne d'un package Python ?", choices: ["pyproject.toml", "setup.py", "setup.cfg", "package.json"], correct: 0 },
    { q: "Quelle commande installe un package en mode developpement ?", choices: ["pip install -e .", "pip install .", "pip develop", "pip install -d"], correct: 0 },
    { q: "Quelle plateforme heberge les packages Python ?", choices: ["PyPI", "npm", "crates.io", "Maven Central"], correct: 0 },
  ],
  "31-api-rest": [
    { q: "Quel framework est recommande pour creer des APIs REST en Python ?", choices: ["FastAPI", "Flask", "Django REST", "Tous sont valables"], correct: 3 },
    { q: "Quelle bibliothèque Pydantic utilise-t-elle pour la validation ?", choices: ["BaseModel", "Validator", "Schema", "TypeModel"], correct: 0 },
    { q: "Quelle methode HTTP lit des donnees ?", choices: ["GET", "POST", "DELETE", "PATCH"], correct: 0 },
  ],
  "32-bases-de-donnees": [
    { q: "Quel ORM est le plus populaire en Python ?", choices: ["SQLAlchemy", "Django ORM", "Peewee", "Tortoise ORM"], correct: 0 },
    { q: "Qu'est-ce qu'une migration ?", choices: ["Un changement controle du schema", "Un backup", "Un index", "Une requete SQL"], correct: 0 },
    { q: "Quel probleme evite-t-on en utilisant des parametres ?", choices: ["Injection SQL", "Lenteur", "Doublons", "Erreurs de type"], correct: 0 },
  ],
  "33-web-scraping": [
    { q: "Quelle bibliothèque extrait des donnees HTML ?", choices: ["BeautifulSoup", "requests", "Selenium", "lxml"], correct: 0 },
    { q: "Quel fichier indique ce qu'un site autorise a scraper ?", choices: ["robots.txt", "scraping-policy.txt", ".htaccess", "sitemap.xml"], correct: 0 },
    { q: "Quel outil est necessaire pour scraper du JavaScript rendu ?", choices: ["Selenium", "BeautifulSoup", "requests", "urllib"], correct: 0 },
  ],
  "34-data-science": [
    { q: "Quelle bibliothèque introduit les tableaux N-dimensionnels ?", choices: ["NumPy", "Pandas", "SciPy", "Matplotlib"], correct: 0 },
    { q: "Quelle est la structure principale de Pandas ?", choices: ["DataFrame", "Array", "Matrix", "Series"], correct: 0 },
    { q: "Que fait df.head() ?", choices: ["Affiche les premieres lignes", "Supprime les lignes", "Calcule la moyenne", "Trie les donnees"], correct: 0 },
  ],
  "35-visualisation": [
    { q: "Quelle bibliothèque est la base de la visualisation en Python ?", choices: ["Matplotlib", "Seaborn", "Plotly", "Bokeh"], correct: 0 },
    { q: "Quelle fonction cree un histogramme avec Matplotlib ?", choices: ["plt.hist()", "plt.plot()", "plt.bar()", "plt.scatter()"], correct: 0 },
    { q: "Quelle bibliothèque offre des graphiques statistiques esthetiques ?", choices: ["Seaborn", "Matplotlib", "Plotly", "Altair"], correct: 0 },
  ],
  "36-projet-final": [
    { q: "Quel outil est essentiel pour versionner un projet ?", choices: ["Git", "Docker", "VS Code", "pip"], correct: 0 },
    { q: "Quelle etape vient en premier dans un projet ?", choices: ["Planifier l'architecture", "Ecrire le code", "Tester", "Deployer"], correct: 0 },
    { q: "Quel type de projet combine toutes les competences apprises ?", choices: ["Un projet complet (API + BDD + front)", "Un script simple", "Un notebook", "Un module"], correct: 0 },
  ],
}

export const EXERCISES = {
  "01-introduction": {
    instruction: "Écris un programme qui demande le prénom et l'âge de l'utilisateur, puis affiche un message personnalisé.",
    starterCode: "# Saisis ton code ici\nprenom = input(\"Quel est ton prénom ? \")\nage = input(\"Quel est ton âge ? \")\n\n# Affiche le message\nprint(...)",
    solution: 'prenom = input("Quel est ton prénom ? ")\nage = input("Quel est ton âge ? ")\nprint(f"Bonjour {prenom}, tu as {age} ans !")',
  },
  "02-variables-types": {
    instruction: "Demande deux nombres \u00e0 l'utilisateur et affiche leur somme, diff\u00e9rence, produit et quotient.",
    starterCode: "a = float(input(\"Premier nombre : \"))\nb = float(input(\"Deuxi\u00e8me nombre : \"))\n\n# Calcule et affiche les op\u00e9rations",
    solution: "a = float(input(\"Premier nombre : \"))\nb = float(input(\"Deuxi\u00e8me nombre : \"))\nprint(f\"Somme: {a+b}\")\nprint(f\"Diff\u00e9rence: {a-b}\")\nprint(f\"Produit: {a*b}\")\nif b != 0:\n    print(f\"Quotient: {a/b}\")",
  },
  "03-strings": {
    instruction: "\u00c9cris un programme qui demande un mot \u00e0 l'utilisateur, puis affiche le nombre de lettres, le mot en majuscules, et le mot invers\u00e9.",
    starterCode: "mot = input(\"Entre un mot : \")\n\n# Affiche la longueur du mot\n# Affiche le mot en majuscules\n# Affiche le mot invers\u00e9",
    solution: 'mot = input("Entre un mot : ")\nprint(f"Longueur : {len(mot)}")\nprint(f"Majuscules : {mot.upper()}")\nprint(f"Invers\u00e9 : {mot[::-1]}")',
  },
  "04-listes-tuples": {
    instruction: "\u00c9cris une fonction qui prend une liste de nombres et retourne la somme, la moyenne, le minimum et le maximum.",
    starterCode: "def analyser_liste(nombres):\n    # Calcule et retourne (somme, moyenne, min, max)\n    pass\n\n# Test\nprint(analyser_liste([10, 25, 3, 18, 42]))",
    solution: "def analyser_liste(nombres):\n    somme = sum(nombres)\n    moyenne = somme / len(nombres)\n    minimum = min(nombres)\n    maximum = max(nombres)\n    return somme, moyenne, minimum, maximum\n\nprint(analyser_liste([10, 25, 3, 18, 42]))",
  },
  "05-dictionnaires-ensembles": {
    instruction: "Cr\u00e9e un dictionnaire \u00e9tudiant avec nom, notes (liste), et ajoute une m\u00e9thode pour calculer la moyenne.",
    starterCode: "class Etudiant:\n    def __init__(self, nom, notes):\n        self.nom = nom\n        self.notes = notes\n    \n    def moyenne(self):\n        # Calcule et retourne la moyenne des notes\n        pass\n\netudiant = Etudiant(\"Alice\", [15, 18, 12, 10])\nprint(f\"{etudiant.nom} : {etudiant.moyenne()}/20\")",
    solution: "class Etudiant:\n    def __init__(self, nom, notes):\n        self.nom = nom\n        self.notes = notes\n    \n    def moyenne(self):\n        return sum(self.notes) / len(self.notes)\n\netudiant = Etudiant(\"Alice\", [15, 18, 12, 10])\nprint(f\"{etudiant.nom} : {etudiant.moyenne()}/20\")",
  },
  "06-controle-flux": {
    instruction: "\u00c9cris une fonction qui prend une note (0-20) et retourne la mention correspondante avec if/elif/else.",
    starterCode: "def mention(note):\n    # < 10: \"Insuffisant\"\n    # 10-12: \"Passable\"\n    # 12-14: \"Assez bien\"\n    # 14-16: \"Bien\"\n    # 16-18: \"Tr\u00e8s bien\"\n    # 18-20: \"Excellent\"\n    pass\n\n# Tests\nfor n in [8, 12, 15, 19]:\n    print(f\"{n}/20 : {mention(n)}\")",
    solution: "def mention(note):\n    if note < 10:\n        return \"Insuffisant\"\n    elif note < 12:\n        return \"Passable\"\n    elif note < 14:\n        return \"Assez bien\"\n    elif note < 16:\n        return \"Bien\"\n    elif note < 18:\n        return \"Tr\u00e8s bien\"\n    else:\n        return \"Excellent\"\n\nfor n in [8, 12, 15, 19]:\n    print(f\"{n}/20 : {mention(n)}\")",
  },
  "07-boucles": {
    instruction: "Utilise une boucle pour afficher la table de multiplication d'un nombre demand\u00e9 \u00e0 l'utilisateur (de 1 \u00e0 10).",
    starterCode: "n = int(input(\"Quelle table de multiplication ? \"))\n\n# Affiche la table de n (de 1 \u00e0 10)",
    solution: 'n = int(input("Quelle table de multiplication ? "))\nfor i in range(1, 11):\n    print(f"{n} x {i} = {n * i}")',
  },
  "08-fonctions": {
    instruction: "\u00c9cris une fonction qui prend un nombre variable de nombres et retourne la somme des carr\u00e9s.",
    starterCode: "def somme_carres(*args):\n    # Calcule la somme des carr\u00e9s de tous les arguments\n    pass\n\nprint(somme_carres(1, 2, 3))  # 1+4+9 = 14\nprint(somme_carres(2, 4))     # 4+16 = 20",
    solution: "def somme_carres(*args):\n    total = 0\n    for n in args:\n        total += n ** 2\n    return total\n\nprint(somme_carres(1, 2, 3))\nprint(somme_carres(2, 4))",
  },
  "09-comprehensions": {
    instruction: "Utilise une liste en compr\u00e9hension pour cr\u00e9er la liste des carr\u00e9s des nombres pairs de 0 \u00e0 20.",
    starterCode: "# Avec une boucle for classique\ncarres_pairs = []\nfor i in range(21):\n    if i % 2 == 0:\n        carres_pairs.append(i ** 2)\nprint(carres_pairs)\n\n# Maintenant avec une liste en compr\u00e9hension (une seule ligne)\ncarres_pairs_comp = ...  # \u00c0 compl\u00e9ter\nprint(carres_pairs_comp)",
    solution: "carres_pairs = []\nfor i in range(21):\n    if i % 2 == 0:\n        carres_pairs.append(i ** 2)\nprint(carres_pairs)\n\ncarres_pairs_comp = [i ** 2 for i in range(21) if i % 2 == 0]\nprint(carres_pairs_comp)",
  },
  "10-erreurs-exceptions": {
    instruction: "\u00c9cris une fonction qui demande un nombre \u00e0 l'utilisateur et g\u00e8re les erreurs de saisie (ValueError, ZeroDivisionError).",
    starterCode: "def calculer_inverse():\n    try:\n        n = float(input(\"Entre un nombre : \"))\n        # Calcule et affiche l'inverse\n        pass\n    except ValueError:\n        # G\u00e8re le cas o\u00f9 ce n'est pas un nombre\n        pass\n    except ZeroDivisionError:\n        # G\u00e8re le cas o\u00f9 le nombre est 0\n        pass\n\ncalculer_inverse()",
    solution: "def calculer_inverse():\n    try:\n        n = float(input(\"Entre un nombre : \"))\n        print(f\"L'inverse de {n} est {1/n}\")\n    except ValueError:\n        print(\"Erreur : ce n'est pas un nombre valide\")\n    except ZeroDivisionError:\n        print(\"Erreur : division par z\u00e9ro impossible\")\n\ncalculer_inverse()",
  },
  "11-modules-packages": {
    instruction: "Cr\u00e9e un module utilitaire avec deux fonctions, et importe-le depuis un autre fichier (simul\u00e9 ici).",
    starterCode: "# ===== utilitaire.py (simul\u00e9) =====\ndef dire_bonjour(nom):\n    return f\"Bonjour {nom} !\"\n\ndef additionner(a, b):\n    return a + b\n\n# ===== main.py (simul\u00e9) =====\n# Importe les fonctions et teste-les ici\nfrom utilitaire import dire_bonjour, additionner\n\nprint(dire_bonjour(\"Alice\"))\nprint(additionner(10, 5))\n\nif __name__ == \"__main__\":\n    print(\"Module lanc\u00e9 directement\")",
    solution: "# ===== utilitaire.py =====\ndef dire_bonjour(nom):\n    return f\"Bonjour {nom} !\"\n\ndef additionner(a, b):\n    return a + b\n\n# ===== main.py =====\nfrom utilitaire import dire_bonjour, additionner\n\nprint(dire_bonjour(\"Alice\"))\nprint(additionner(10, 5))\n\nif __name__ == \"__main__\":\n    print(\"Module lanc\u00e9 directement\")",
  },
  "12-fichiers": {
    instruction: "\u00c9cris un programme qui lit un fichier texte, compte le nombre de mots et sauvegarde le r\u00e9sultat dans un nouveau fichier.",
    starterCode: "# Cr\u00e9e d'abord un fichier d'exemple\nwith open(\"exemple.txt\", \"w\") as f:\n    f.write(\"Python est un langage de programmation\\n\")\n    f.write(\"Il est utilise dans la data science\\n\")\n    f.write(\"et le developpement web.\")\n\n# \u00c0 compl\u00e9ter : lire le fichier, compter les mots, sauvegarder le r\u00e9sultat\nwith open(\"exemple.txt\", \"r\") as f:\n    contenu = f.read()\n    # Compte les mots\n    \n# Sauvegarde le r\u00e9sultat dans un nouveau fichier\nwith open(\"resultat.txt\", \"w\") as f:\n    pass",
    solution: 'with open("exemple.txt", "w") as f:\n    f.write("Python est un langage de programmation\\n")\n    f.write("Il est utilis\u00e9 dans la data science\\n")\n    f.write("et le d\u00e9veloppement web.")\n\nwith open("exemple.txt", "r") as f:\n    contenu = f.read()\n    nb_mots = len(contenu.split())\n\nwith open("resultat.txt", "w") as f:\n    f.write(f"Le fichier contient {nb_mots} mots.")\n\nprint(f"Termin\u00e9 : {nb_mots} mots compt\u00e9s")',
  },
  "13-poo-classes": {
    instruction: "Cr\u00e9e une classe CompteBancaire avec titulaire, solde et m\u00e9thodes deposer(), retirer() et afficher().",
    starterCode: "class CompteBancaire:\n    def __init__(self, titulaire, solde=0):\n        # Initialise le titulaire et le solde\n        pass\n    \n    def deposer(self, montant):\n        # Ajoute le montant au solde\n        pass\n    \n    def retirer(self, montant):\n        # Retire le montant si le solde est suffisant\n        pass\n    \n    def afficher(self):\n        # Affiche les informations du compte\n        pass\n\n# Tests\ncompte = CompteBancaire(\"Alice\", 1000)\ncompte.deposer(500)\ncompte.retirer(200)\ncompte.afficher()",
    solution: "class CompteBancaire:\n    def __init__(self, titulaire, solde=0):\n        self.titulaire = titulaire\n        self.solde = solde\n    \n    def deposer(self, montant):\n        self.solde += montant\n        print(f\"{montant} \u20ac d\u00e9pos\u00e9s\")\n    \n    def retirer(self, montant):\n        if montant <= self.solde:\n            self.solde -= montant\n            print(f\"{montant} \u20ac retir\u00e9s\")\n        else:\n            print(\"Solde insuffisant\")\n    \n    def afficher(self):\n        print(f\"Compte de {self.titulaire} : {self.solde} \u20ac\")\n\ncompte = CompteBancaire(\"Alice\", 1000)\ncompte.deposer(500)\ncompte.retirer(200)\ncompte.afficher()",
  },
  "14-heritage-polymorphisme": {
    instruction: "Cr\u00e9e une classe Vehicule avec une methode deplace() et deux sous-classes Voiture et Bicyclette qui la specialisent.",
    starterCode: "class Vehicule:\n    def __init__(self, nom):\n        self.nom = nom\n    \n    def deplace(self):\n        # Methode generique\n        pass\n\nclass Voiture(Vehicule):\n    def __init__(self, nom, carburant):\n        # Appelle le constructeur parent + stocke carburant\n        pass\n    \n    def deplace(self):\n        # Specialisation pour la voiture\n        pass\n\nclass Bicyclette(Vehicule):\n    def deplace(self):\n        # Specialisation pour la bicyclette\n        pass\n\n# Tests (polymorphisme)\nvehicules = [Voiture(\"Tesla\", \"electrique\"), Bicyclette(\"VTT\")]\nfor v in vehicules:\n    print(f\"{v.nom} : \", end=\"\")\n    v.deplace()",
    solution: "class Vehicule:\n    def __init__(self, nom):\n        self.nom = nom\n    \n    def deplace(self):\n        print(\"Le v\u00e9hicule se d\u00e9place\")\n\nclass Voiture(Vehicule):\n    def __init__(self, nom, carburant):\n        super().__init__(nom)\n        self.carburant = carburant\n    \n    def deplace(self):\n        print(f\"La voiture {self.nom} roule au {self.carburant}\")\n\nclass Bicyclette(Vehicule):\n    def deplace(self):\n        print(f\"Le v\u00e9lo {self.nom} p\u00e9dale sans carburant\")\n\nvehicules = [Voiture(\"Tesla\", \"electrique\"), Bicyclette(\"VTT\")]\nfor v in vehicules:\n    print(f\"{v.nom} : \", end=\"\")\n    v.deplace()",
  },
  "15-methodes-speciales": {
    instruction: "Cr\u00e9e une classe Vector2D avec les m\u00e9thodes sp\u00e9ciales __init__, __repr__, __add__, __mul__ (produit scalaire) et __abs__.",
    starterCode: "class Vector2D:\n    def __init__(self, x, y):\n        # Initialise les coordonn\u00e9es x et y\n        pass\n\n    def __repr__(self):\n        # Retourne \"Vector2D(x, y)\"\n        pass\n\n    def __add__(self, other):\n        # Retourne un nouveau Vector2D somme des deux\n        pass\n\n    def __mul__(self, other):\n        # Retourne le produit scalaire (x1*x2 + y1*y2)\n        pass\n\n    def __abs__(self):\n        # Retourne la norme du vecteur\n        pass\n\n# Tests\nv1 = Vector2D(3, 4)\nv2 = Vector2D(1, 2)\nprint(v1)            # Vector2D(3, 4)\nprint(v1 + v2)       # Vector2D(4, 6)\nprint(v1 * v2)       # 11\nprint(abs(v1))       # 5.0",
    solution: "class Vector2D:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __repr__(self):\n        return f\"Vector2D({self.x}, {self.y})\"\n\n    def __add__(self, other):\n        return Vector2D(self.x + other.x, self.y + other.y)\n\n    def __mul__(self, other):\n        return self.x * other.x + self.y * other.y\n\n    def __abs__(self):\n        return (self.x ** 2 + self.y ** 2) ** 0.5\n\nv1 = Vector2D(3, 4)\nv2 = Vector2D(1, 2)\nprint(v1)\nprint(v1 + v2)\nprint(v1 * v2)\nprint(abs(v1))",
  },
  "16-iterateurs-generateurs": {
    instruction: "\u00c9cris un g\u00e9n\u00e9rateur fibonacci() qui produit les n premiers nombres de la suite de Fibonacci.",
    starterCode: "def fibonacci(n):\n    # G\u00e9n\u00e8re les n premiers nombres de Fibonacci\n    a, b = 0, 1\n    # \u00c0 compl\u00e9ter\n    pass\n\n# Affiche les 10 premiers\nfor f in fibonacci(10):\n    print(f, end=\" \")",
    solution: "def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nfor f in fibonacci(10):\n    print(f, end=\" \")",
  },
  "17-decorateurs": {
    instruction: "\u00c9cris un d\u00e9corateur timer qui mesure et affiche le temps d'ex\u00e9cution d'une fonction.",
    starterCode: "import time\n\ndef timer(func):\n    # D\u00e9corateur qui affiche le temps d'ex\u00e9cution\n    def wrapper(*args, **kwargs):\n        # \u00c0 compl\u00e9ter\n        pass\n    return wrapper\n\n@timer\ndef calcul_long(n):\n    total = 0\n    for i in range(n):\n        total += i ** 2\n    return total\n\nresultat = calcul_long(100000)\nprint(f\"R\u00e9sultat: {resultat}\")",
    solution: "import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        debut = time.time()\n        resultat = func(*args, **kwargs)\n        fin = time.time()\n        print(f\"{func.__name__} a pris {fin - debut:.4f} secondes\")\n        return resultat\n    return wrapper\n\n@timer\ndef calcul_long(n):\n    total = 0\n    for i in range(n):\n        total += i ** 2\n    return total\n\nresultat = calcul_long(100000)\nprint(f\"R\u00e9sultat: {resultat}\")",
  },
  "18-context-managers": {
    instruction: "\u00c9cris un context manager Timer qui mesure le temps pass\u00e9 dans un bloc with, en utilisant la classe avec __enter__ et __exit__.",
    starterCode: "import time\n\nclass Timer:\n    def __enter__(self):\n        # D\u00e9marre le chronom\u00e8tre\n        pass\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        # Affiche le temps \u00e9coul\u00e9\n        pass\n\n# Test\nwith Timer():\n    total = sum(i ** 2 for i in range(1000000))\n    print(f\"Total: {total}\")",
    solution: "import time\n\nclass Timer:\n    def __enter__(self):\n        self.debut = time.time()\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.fin = time.time()\n        print(f\"Temps \u00e9coul\u00e9: {self.fin - self.debut:.4f} secondes\")\n        return False\n\nwith Timer():\n    total = sum(i ** 2 for i in range(1000000))\n    print(f\"Total: {total}\")",
  },
  "19-bibliotheque-standard": {
    instruction: "Utilise pathlib, json et datetime pour cr\u00e9er un gestionnaire de notes qui sauvegarde et charge des notes dans un fichier JSON.",
    starterCode: "import json\nfrom pathlib import Path\nfrom datetime import datetime\n\nclass CarnetNotes:\n    def __init__(self, fichier=\"notes.json\"):\n        self.fichier = Path(fichier)\n        self.notes = self._charger()\n\n    def _charger(self):\n        # Charge les notes depuis le fichier JSON s'il existe\n        pass\n\n    def ajouter(self, titre, contenu):\n        # Ajoute une note avec un timestamp\n        pass\n\n    def lister(self):\n        # Affiche toutes les notes\n        pass\n\n    def sauvegarder(self):\n        # Sauvegarde les notes dans le fichier JSON\n        pass\n\n# Test\ncarnet = CarnetNotes()\ncarnet.ajouter(\"Liste de courses\", \"Acheter du lait\")\ncarnet.ajouter(\"Id\u00e9e projet\", \"Cr\u00e9er une API\")\ncarnet.lister()\ncarnet.sauvegarder()",
    solution: "import json\nfrom pathlib import Path\nfrom datetime import datetime\n\nclass CarnetNotes:\n    def __init__(self, fichier=\"notes.json\"):\n        self.fichier = Path(fichier)\n        self.notes = self._charger()\n\n    def _charger(self):\n        if self.fichier.exists():\n            with open(self.fichier, \"r\", encoding=\"utf-8\") as f:\n                return json.load(f)\n        return []\n\n    def ajouter(self, titre, contenu):\n        note = {\n            \"titre\": titre,\n            \"contenu\": contenu,\n            \"date\": datetime.now().isoformat()\n        }\n        self.notes.append(note)\n\n    def lister(self):\n        for note in self.notes:\n            print(f\"[{note['date']}] {note['titre']}: {note['contenu']}\")\n\n    def sauvegarder(self):\n        with open(self.fichier, \"w\", encoding=\"utf-8\") as f:\n            json.dump(self.notes, f, indent=2, ensure_ascii=False)\n\ncarnet = CarnetNotes()\ncarnet.ajouter(\"Liste de courses\", \"Acheter du lait\")\ncarnet.ajouter(\"Id\u00e9e projet\", \"Cr\u00e9er une API\")\ncarnet.lister()\ncarnet.sauvegarder()",
  },
  "20-regex": {
    instruction: "\u00c9cris une fonction valider_email(email) qui utilise une expression r\u00e9guli\u00e8re pour valider une adresse email.",
    starterCode: "import re\n\ndef valider_email(email):\n    # \u00c9cris le pattern regex pour valider un email\n    # R\u00e8gle: local@domaine.extension (ex: user@example.com)\n    pattern = r\"\"  # \u00c0 compl\u00e9ter\n    if re.match(pattern, email):\n        return True\n    return False\n\n# Tests\nemails = [\"user@example.com\", \"invalid-email\", \"test@.com\", \"a@b.co\", \"@domaine.fr\"]\nfor e in emails:\n    print(f\"{e}: {valider_email(e)}\")",
    solution: "import re\n\ndef valider_email(email):\n    pattern = r\"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\"\n    if re.match(pattern, email):\n        return True\n    return False\n\nemails = [\"user@example.com\", \"invalid-email\", \"test@.com\", \"a@b.co\", \"@domaine.fr\"]\nfor e in emails:\n    print(f\"{e}: {valider_email(e)}\")",
  },
  "21-fonctionnelle": {
    instruction: "Utilise map, filter et reduce (de functools) pour traiter une liste de commandes : filtrer les montants positifs, appliquer une taxe, puis calculer le total.",
    starterCode: "from functools import reduce\n\nmontants = [150, -30, 200, 0, 75, -10, 320]\n# 1. Filtre les montants strictement positifs\npositifs = list(filter(lambda x: ..., montants))\n# 2. Applique une taxe de 20% sur chaque montant\navec_taxe = list(map(lambda x: ..., positifs))\n# 3. Calcule la somme totale\ntotal = reduce(lambda acc, x: ..., avec_taxe, 0)\n\nprint(f\"Montants positifs: {positifs}\")\nprint(f\"Avec taxe: {avec_taxe}\")\nprint(f\"Total: {total:.2f}\")",
    solution: "from functools import reduce\n\nmontants = [150, -30, 200, 0, 75, -10, 320]\npositifs = list(filter(lambda x: x > 0, montants))\navec_taxe = list(map(lambda x: x * 1.20, positifs))\ntotal = reduce(lambda acc, x: acc + x, avec_taxe, 0)\n\nprint(f\"Montants positifs: {positifs}\")\nprint(f\"Avec taxe: {avec_taxe}\")\nprint(f\"Total: {total:.2f}\")",
  },
  "22-type-hints": {
    instruction: "Ajoute des type hints complets \u00e0 cette fonction de traitement de donn\u00e9es qui calcule la moyenne d'une liste de nombres.",
    starterCode: "from typing import List, Union\n\ndef calculer_moyenne(valeurs):  # Ajoute les types\n    if not valeurs:\n        return None\n    return sum(valeurs) / len(valeurs)\n\ndef filtrer_et_moyenner(donnees, seuil):  # Ajoute les types\n    filtrees = [v for v in donnees if v > seuil]\n    return calculer_moyenne(filtrees)\n\n# Tests\nprint(calculer_moyenne([10, 20, 30]))\nprint(filtrer_et_moyenner([5, 15, 25, 35], 10))",
    solution: "from typing import List, Union, Optional\n\ndef calculer_moyenne(valeurs: List[Union[int, float]]) -> Optional[float]:\n    if not valeurs:\n        return None\n    return sum(valeurs) / len(valeurs)\n\ndef filtrer_et_moyenner(donnees: List[Union[int, float]], seuil: Union[int, float]) -> Optional[float]:\n    filtrees: List[Union[int, float]] = [v for v in donnees if v > seuil]\n    return calculer_moyenne(filtrees)\n\nprint(calculer_moyenne([10, 20, 30]))\nprint(filtrer_et_moyenner([5, 15, 25, 35], 10))",
  },
  "23-async-await": {
    instruction: "\u00c9cris un programme asynchrone qui t\u00e9l\u00e9charge plusieurs URLs en parall\u00e8le avec asyncio et aiohttp.",
    starterCode: "import asyncio\nimport aiohttp\n\nurls = [\n    \"https://httpbin.org/delay/1\",\n    \"https://httpbin.org/delay/2\",\n    \"https://httpbin.org/delay/3\",\n]\n\nasync def telecharger(url):\n    # T\u00e9l\u00e9charge une URL et retourne la taille de la r\u00e9ponse\n    pass\n\nasync def main():\n    # Lance tous les t\u00e9l\u00e9chargements en parall\u00e8le\n    pass\n\nasyncio.run(main())",
    solution: "import asyncio\nimport aiohttp\n\nurls = [\n    \"https://httpbin.org/delay/1\",\n    \"https://httpbin.org/delay/2\",\n    \"https://httpbin.org/delay/3\",\n]\n\nasync def telecharger(session, url):\n    async with session.get(url) as response:\n        contenu = await response.read()\n        print(f\"{url}: {len(contenu)} octets\")\n        return len(contenu)\n\nasync def main():\n    async with aiohttp.ClientSession() as session:\n        taches = [telecharger(session, url) for url in urls]\n        resultats = await asyncio.gather(*taches)\n        print(f\"Total t\u00e9l\u00e9charg\u00e9: {sum(resultats)} octets\")\n\nasyncio.run(main())",
  },
  "24-threading-multiprocess": {
    instruction: "\u00c9cris un programme qui calcule les factorielles de plusieurs nombres en parall\u00e8le avec multiprocessing.Pool.",
    starterCode: "from multiprocessing import Pool\nimport math\n\nnombres = [100000, 150000, 200000, 250000]\n\ndef factorielle(n):\n    # Calcule la factorielle de n\n    pass\n\nif __name__ == \"__main__\":\n    # Cr\u00e9e un Pool et distribue les calculs\n    pass",
    solution: "from multiprocessing import Pool\nimport math\n\nnombres = [100000, 150000, 200000, 250000]\n\ndef factorielle(n):\n    return math.factorial(n)\n\nif __name__ == \"__main__\":\n    with Pool(processes=4) as pool:\n        resultats = pool.map(factorielle, nombres)\n    for n, res in zip(nombres, resultats):\n        print(f\"{n}! a {len(str(res))} chiffres\")",
  },
  "25-metaclasses-introspection": {
    instruction: "Cr\u00e9e une m\u00e9taclasse CompteurMeta qui ajoute automatiquement un compteur d'instances \u00e0 chaque classe l'utilisant.",
    starterCode: "class CompteurMeta(type):\n    # M\u00e9taclasse qui ajoute un attribut compteur d'instances\n    def __new__(cls, name, bases, namespace):\n        # Ajoute un compteur initialis\u00e9 \u00e0 0\n        pass\n\n    def __call__(cls, *args, **kwargs):\n        # Incr\u00e9mente le compteur \u00e0 chaque cr\u00e9ation d'instance\n        pass\n\nclass Personne(metaclass=CompteurMeta):\n    def __init__(self, nom):\n        self.nom = nom\n\n# Tests\np1 = Personne(\"Alice\")\np2 = Personne(\"Bob\")\np3 = Personne(\"Charlie\")\nprint(f\"Nombre de personnes cr\u00e9\u00e9es: {Personne.compteur}\")  # 3",
    solution: "class CompteurMeta(type):\n    def __new__(cls, name, bases, namespace):\n        namespace[\"compteur\"] = 0\n        return super().__new__(cls, name, bases, namespace)\n\n    def __call__(cls, *args, **kwargs):\n        instance = super().__call__(*args, **kwargs)\n        cls.compteur += 1\n        return instance\n\nclass Personne(metaclass=CompteurMeta):\n    def __init__(self, nom):\n        self.nom = nom\n\np1 = Personne(\"Alice\")\np2 = Personne(\"Bob\")\np3 = Personne(\"Charlie\")\nprint(f\"Nombre de personnes cr\u00e9\u00e9es: {Personne.compteur}\")",
  },
  "26-design-patterns": {
    instruction: "Impl\u00e9mente le pattern Observer pour un syst\u00e8me de notifications : un Sujet tient \u00e0 jour une liste d'Observateurs et les notifie en cas de changement.",
    starterCode: "class Observateur:\n    def mettre_a_jour(self, message):\n        pass\n\nclass Sujet:\n    def __init__(self):\n        self._observateurs = []\n\n    def attacher(self, observateur):\n        # Ajoute un observateur\n        pass\n\n    def detacher(self, observateur):\n        # Retire un observateur\n        pass\n\n    def notifier(self, message):\n        # Notifie tous les observateurs\n        pass\n\n# Tests\nclass EmailNotif(Observateur):\n    def __init__(self, email):\n        self.email = email\n    def mettre_a_jour(self, message):\n        print(f\"Email \u00e0 {self.email}: {message}\")\n\nclass SMSNotif(Observateur):\n    def __init__(self, telephone):\n        self.telephone = telephone\n    def mettre_a_jour(self, message):\n        print(f\"SMS \u00e0 {self.telephone}: {message}\")\n\nsujet = Sujet()\nsujet.attacher(EmailNotif(\"alice@example.com\"))\nsujet.attacher(SMSNotif(\"0612345678\"))\nsujet.notifier(\"Nouvelle mise \u00e0 jour disponible !\")",
    solution: "class Observateur:\n    def mettre_a_jour(self, message):\n        raise NotImplementedError\n\nclass Sujet:\n    def __init__(self):\n        self._observateurs = []\n\n    def attacher(self, observateur):\n        self._observateurs.append(observateur)\n\n    def detacher(self, observateur):\n        self._observateurs.remove(observateur)\n\n    def notifier(self, message):\n        for obs in self._observateurs:\n            obs.mettre_a_jour(message)\n\nclass EmailNotif(Observateur):\n    def __init__(self, email):\n        self.email = email\n    def mettre_a_jour(self, message):\n        print(f\"Email \u00e0 {self.email}: {message}\")\n\nclass SMSNotif(Observateur):\n    def __init__(self, telephone):\n        self.telephone = telephone\n    def mettre_a_jour(self, message):\n        print(f\"SMS \u00e0 {self.telephone}: {message}\")\n\nsujet = Sujet()\nsujet.attacher(EmailNotif(\"alice@example.com\"))\nsujet.attacher(SMSNotif(\"0612345678\"))\nsujet.notifier(\"Nouvelle mise \u00e0 jour disponible !\")",
  },
  "27-tests-unitaires": {
    instruction: "\u00c9cris des tests unitaires avec pytest pour une fonction qui calcule le factoriel d'un nombre.",
    starterCode: "# Fonction \u00e0 tester\ndef factoriel(n):\n    if n < 0:\n        raise ValueError(\"Pas de factorielle pour les nombres negatifs\")\n    if n == 0:\n        return 1\n    resultat = 1\n    for i in range(1, n + 1):\n        resultat *= i\n    return resultat\n\n# \u00c9cris les tests pytest ci-dessous\n# Test 1: factoriel(0) == 1\n# Test 2: factoriel(5) == 120\n# Test 3: factoriel(3) == 6\n# Test 4: factoriel(-1) leve ValueError",
    solution: "def factoriel(n):\n    if n < 0:\n        raise ValueError(\"Pas de factorielle pour les nombres negatifs\")\n    if n == 0:\n        return 1\n    resultat = 1\n    for i in range(1, n + 1):\n        resultat *= i\n    return resultat\n\ndef test_factoriel_zero():\n    assert factoriel(0) == 1\n\ndef test_factoriel_cinq():\n    assert factoriel(5) == 120\n\ndef test_factoriel_trois():\n    assert factoriel(3) == 6\n\ndef test_factoriel_negatif():\n    try:\n        factoriel(-1)\n        assert False\n    except ValueError:\n        pass",
  },
  "28-logging-debugging": {
    instruction: "Ajoute des logs (INFO, WARNING, ERROR) \u00e0 une fonction de calcul de racine carr\u00e9e, avec gestion des cas limites.",
    starterCode: "import logging\nimport math\n\n# Configure le logging\nlogging.basicConfig(\n    level=logging.DEBUG,\n    format='%(levelname)s: %(message)s'\n)\n\ndef racine_carree(x):\n    # Ajoute des logs:\n    # - DEBUG quand la fonction est appelee\n    # - WARNING si x est negatif (retourne None)\n    # - INFO si le calcul reussit\n    # - ERROR si x n'est pas un nombre\n    pass\n\n# Tests\nprint(racine_carree(16))\nprint(racine_carree(-4))\nprint(racine_carree(\"abc\"))",
    solution: "import logging\nimport math\n\nlogging.basicConfig(\n    level=logging.DEBUG,\n    format='%(levelname)s: %(message)s'\n)\n\ndef racine_carree(x):\n    logging.debug(f\"Appel de racine_carree({x})\")\n    try:\n        x = float(x)\n    except (ValueError, TypeError):\n        logging.error(f\"{x} n'est pas un nombre\")\n        return None\n    if x < 0:\n        logging.warning(f\"Racine carree d'un nombre negatif: {x}\")\n        return None\n    resultat = math.sqrt(x)\n    logging.info(f\"Racine carree de {x} = {resultat}\")\n    return resultat\n\nprint(racine_carree(16))\nprint(racine_carree(-4))\nprint(racine_carree(\"abc\"))",
  },
  "29-environnements-virtuels": {
    instruction: "Cr\u00e9e un script qui affiche la liste des packages install\u00e9s et leur version, simulant ce que ferait pip list.",
    starterCode: "import subprocess\nimport sys\n\n# Simule l'affichage de pip list\ndef lister_packages():\n    # Methode 1: utiliser importlib.metadata (Python 3.8+)\n    from importlib.metadata import distributions\n    \n    print(f\"Packages installes dans {sys.prefix}\\n\")\n    for dist in distributions():\n        # Affiche le nom et la version de chaque package\n        pass\n\nlister_packages()",
    solution: "import sys\n\ndef lister_packages():\n    from importlib.metadata import distributions\n    \n    print(f\"Packages installes dans {sys.prefix}\\n\")\n    packages = list(distributions())\n    packages.sort(key=lambda d: d.metadata['Name'].lower())\n    for dist in packages:\n        nom = dist.metadata['Name']\n        version = dist.version\n        print(f\"  {nom} == {version}\")\n    print(f\"\\nTotal: {len(packages)} packages\")\n\nlister_packages()",
  },
  "30-packaging-distribution": {
    instruction: "Cr\u00e9e la structure minimale d'un package Python avec pyproject.toml et un module simple.",
    starterCode: "# ===== pyproject.toml =====\n# [build-system]\n# requires = [\"hatchling\"]\n# build-backend = \"hatchling.build\"\n#\n# [project]\n# name = \"mon_package\"\n# version = \"0.1.0\"\n# ... (a completer)\n\n# ===== src/mon_package/__init__.py =====\n# ... (a completer)\n\n# ===== src/mon_package/calculs.py =====\n# ... (a completer)\n\n# Test d'import apres installation\n# pip install -e .",
    solution: "# ===== pyproject.toml =====\n\"\"\"\n[build-system]\nrequires = [\"hatchling\"]\nbuild-backend = \"hatchling.build\"\n\n[project]\nname = \"mon_package\"\nversion = \"0.1.0\"\ndescription = \"Un package exemple\"\nauthors = [{name = \"Moi\"}]\nlicense = {text = \"MIT\"}\nreadme = \"README.md\"\nrequires-python = \">=3.8\"\n\"\"\"\n\n# ===== src/mon_package/calculs.py =====\ndef additionner(a, b):\n    return a + b\n\ndef multiplier(a, b):\n    return a * b\n\n# ===== Test =====\nfrom mon_package.calculs import additionner, multiplier\nprint(additionner(5, 3))\nprint(multiplier(4, 7))",
  },
  "31-api-rest": {
    instruction: "Cr\u00e9e une API FastAPI minimale avec des endpoints GET et POST pour gerer une liste de taches (todos).",
    starterCode: "from fastapi import FastAPI\nfrom pydantic import BaseModel\nfrom typing import List\n\napp = FastAPI(title=\"API Todos\")\n\n# Modele Pydantic pour une tache\nclass Todo(BaseModel):\n    # Ajoute les champs: id, titre, termine\n    pass\n\n# Base de donnees temporaire\ntodos = []\n\n@app.get(\"/todos\")\ndef lister_todos():\n    # Retourne la liste des todos\n    pass\n\n@app.post(\"/todos\")\ndef creer_todo(todo: Todo):\n    # Ajoute un todo et le retourne\n    pass\n\n# Pour lancer: uvicorn main:app --reload",
    solution: "from fastapi import FastAPI\nfrom pydantic import BaseModel\nfrom typing import List\n\napp = FastAPI(title=\"API Todos\")\n\nclass Todo(BaseModel):\n    id: int\n    titre: str\n    termine: bool = False\n\ntodos = [\n    Todo(id=1, titre=\"Apprendre Python\", termine=False),\n    Todo(id=2, titre=\"Creer une API\", termine=True),\n]\n\n@app.get(\"/todos\")\ndef lister_todos():\n    return todos\n\n@app.post(\"/todos\")\ndef creer_todo(todo: Todo):\n    todos.append(todo)\n    return todo",
  },
  "32-bases-de-donnees": {
    instruction: "\u00c9cris un programme SQLite qui cree une table 'utilisateurs', insere des donnees et affiche les resultats.",
    starterCode: "import sqlite3\n\n# Connexion a la base de donnees (fichier test.db)\nconn = sqlite3.connect(\"test.db\")\ncursor = conn.cursor()\n\n# Cree la table utilisateurs (id INTEGER, nom TEXT, age INTEGER)\n\n# Insere 3 utilisateurs\n\n# Recupere et affiche tous les utilisateurs ayant plus de 25 ans\n\n# Ferme la connexion\nconn.close()",
    solution: "import sqlite3\n\nconn = sqlite3.connect(\"test.db\")\ncursor = conn.cursor()\n\ncursor.execute(\"\"\"\n    CREATE TABLE IF NOT EXISTS utilisateurs (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nom TEXT NOT NULL,\n        age INTEGER\n    )\n\"\"\")\n\nutilisateurs = [\n    (\"Alice\", 30),\n    (\"Bob\", 22),\n    (\"Charlie\", 35),\n]\ncursor.executemany(\"INSERT INTO utilisateurs (nom, age) VALUES (?, ?)\", utilisateurs)\nconn.commit()\n\ncursor.execute(\"SELECT * FROM utilisateurs WHERE age > 25\")\nfor row in cursor.fetchall():\n    print(f\"ID: {row[0]}, Nom: {row[1]}, Age: {row[2]}\")\n\nconn.close()",
  },
  "33-web-scraping": {
    instruction: "Utilise requests et BeautifulSoup pour extraire les titres et liens d'une page web (simul\u00e9e avec un texte HTML).",
    starterCode: "from bs4 import BeautifulSoup\nimport requests\n\n# Page HTML simulee\nhtml = \"\"\"\n<html>\n<body>\n    <h1>Actualites Python</h1>\n    <div class=\"article\">\n        <h2><a href=\"/python-3-13\">Python 3.13 sorti</a></h2>\n        <p>Nouvelles fonctionnalites...</p>\n    </div>\n    <div class=\"article\">\n        <h2><a href=\"/fastapi-guide\">Guide FastAPI</a></h2>\n        <p>Apprenez a creer des APIs</p>\n    </div>\n</body>\n</html>\n\"\"\"\n\n# Parse le HTML avec BeautifulSoup\nsoup = BeautifulSoup(html, \"html.parser\")\n\n# Extrais tous les titres (h2) et liens (a) des articles\n# Affiche le texte et le lien de chaque article",
    solution: "from bs4 import BeautifulSoup\n\nhtml = \"\"\"\n<html>\n<body>\n    <h1>Actualites Python</h1>\n    <div class=\"article\">\n        <h2><a href=\"/python-3-13\">Python 3.13 sorti</a></h2>\n        <p>Nouvelles fonctionnalites...</p>\n    </div>\n    <div class=\"article\">\n        <h2><a href=\"/fastapi-guide\">Guide FastAPI</a></h2>\n        <p>Apprenez a creer des APIs</p>\n    </div>\n</body>\n</html>\n\"\"\"\n\nsoup = BeautifulSoup(html, \"html.parser\")\narticles = soup.find_all(\"div\", class_=\"article\")\nfor article in articles:\n    lien = article.find(\"a\")\n    titre = lien.get_text()\n    url = lien.get(\"href\")\n    print(f\"Titre: {titre}\")\n    print(f\"Lien: {url}\\n\")",
  },
  "34-data-science": {
    instruction: "Utilise Pandas pour charger un petit jeu de donnees (simule), afficher les stats de base et filtrer les donnees.",
    starterCode: "import pandas as pd\nimport numpy as np\n\n# DataFrame simule de ventes\ndata = {\n    \"produit\": [\"Chaise\", \"Table\", \"Lampe\", \"Chaise\", \"Table\"],\n    \"prix\": [50, 200, 30, 55, 220],\n    \"quantite\": [10, 5, 15, 8, 3],\n    \"ville\": [\"Paris\", \"Lyon\", \"Paris\", \"Lyon\", \"Marseille\"]\n}\n\ndf = pd.DataFrame(data)\n\n# 1. Affiche les premieres lignes\n# 2. Calcule le chiffre d'affaires (prix * quantite) comme nouvelle colonne\n# 3. Affiche la moyenne des prix par ville\n# 4. Filtre les produits avec un CA > 200",
    solution: "import pandas as pd\nimport numpy as np\n\ndata = {\n    \"produit\": [\"Chaise\", \"Table\", \"Lampe\", \"Chaise\", \"Table\"],\n    \"prix\": [50, 200, 30, 55, 220],\n    \"quantite\": [10, 5, 15, 8, 3],\n    \"ville\": [\"Paris\", \"Lyon\", \"Paris\", \"Lyon\", \"Marseille\"]\n}\n\ndf = pd.DataFrame(data)\n\nprint(\"=== Premieres lignes ===\")\nprint(df.head())\n\ndf[\"ca\"] = df[\"prix\"] * df[\"quantite\"]\n\nprint(\"\\n=== Moyenne des prix par ville ===\")\nprint(df.groupby(\"ville\")[\"prix\"].mean())\n\nprint(\"\\n=== Produits avec CA > 200 ===\")\nprint(df[df[\"ca\"] > 200])",
  },
  "35-visualisation": {
    instruction: "Utilise Matplotlib pour creer un graphique en barres montrant les ventes par mois et une courbe de tendance.",
    starterCode: "import matplotlib.pyplot as plt\n\n# Donnees de ventes mensuelles\nmois = [\"Jan\", \"Fev\", \"Mar\", \"Avr\", \"Mai\", \"Jun\"]\nventes = [120, 150, 90, 200, 180, 250]\n\n# 1. Cree un graphique en barres\nplt.bar(mois, ventes, color=\"skyblue\", edgecolor=\"navy\")\n\n# 2. Ajoute un titre et des labels\n# 3. Ajoute une courbe de tendance (plt.plot dessus)\n\nplt.show() # Affiche le graphique",
    solution: "import matplotlib.pyplot as plt\n\nmois = [\"Jan\", \"Fev\", \"Mar\", \"Avr\", \"Mai\", \"Jun\"]\nventes = [120, 150, 90, 200, 180, 250]\n\nplt.figure(figsize=(10, 6))\nbars = plt.bar(mois, ventes, color=\"skyblue\", edgecolor=\"navy\", alpha=0.7)\nplt.plot(mois, ventes, color=\"red\", marker=\"o\", linewidth=2, label=\"Tendance\")\nplt.title(\"Ventes mensuelles\", fontsize=16, fontweight=\"bold\")\nplt.xlabel(\"Mois\", fontsize=12)\nplt.ylabel(\"Ventes (\u20ac)\", fontsize=12)\nplt.legend()\nplt.grid(axis=\"y\", alpha=0.3)\n\nfor bar, vente in zip(bars, ventes):\n    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 5, str(vente),\n             ha=\"center\", va=\"bottom\", fontweight=\"bold\")\n\nplt.tight_layout()\nplt.show()",
  },
  "36-projet-final": {
    instruction: "Planifie et commence l'implementation d'un projet complet : une API de gestion de bibliotheque avec FastAPI et SQLite.",
    starterCode: "# PROJET : API de gestion de bibliotheque\n# Objectif : Creer une API REST pour gerer des livres, auteurs et emprunts\n\n# Etape 1 : Planification\n\"\"\"\n- Entites : Livre, Auteur, Emprunt\n- Endpoints : CRUD livres, CRUD auteurs, emprunter/retourner\n- Base de donnees : SQLite avec SQLAlchemy\n\"\"\"\n\n# Etape 2 : Modele\nfrom pydantic import BaseModel\nfrom typing import List, Optional\n\nclass Livre(BaseModel):\n    id: int\n    titre: str\n    auteur_id: int\n    disponible: bool = True\n\n# Etape 3 : Commence l'implementation\n# ... (a completer)\n\nprint(\"Projet bibliotheque API\")\nprint(\"A implementer :\")\nprint(\"- Endpoints CRUD pour livres\")\nprint(\"- Endpoints CRUD pour auteurs\")\nprint(\"- Systeme d'emprunt/retour\")\nprint(\"- Tests unitaires avec pytest\")",
    solution: "# Etape 1 : Structure du projet\n\"\"\"\nbibliotheque_api/\n\u251c\u2500\u2500 main.py\n\u251c\u2500\u2500 models.py\n\u251c\u2500\u2500 database.py\n\u251c\u2500\u2500 requirements.txt\n\u2514\u2500\u2500 tests/\n    \u2514\u2500\u2500 test_api.py\n\"\"\"\n\n# Etape 2 : Models\nfrom pydantic import BaseModel\nfrom typing import Optional\n\nclass Livre(BaseModel):\n    id: int\n    titre: str\n    auteur_id: int\n    disponible: bool = True\n\nclass Auteur(BaseModel):\n    id: int\n    nom: str\n    biographie: Optional[str] = None\n\n# Etape 3 : Base de donnees simulee\nlivres = [\n    Livre(id=1, titre=\"Python pour les nuls\", auteur_id=1),\n    Livre(id=2, titre=\"Data Science avec Python\", auteur_id=2),\n]\nauteurs = [\n    Auteur(id=1, nom=\"John Doe\"),\n    Auteur(id=2, nom=\"Jane Smith\"),\n]\n\n# Etape 4 : Tests\nprint(\"=== Tests ===\")\nprint(f\"Livres: {len(livres)}\")\nprint(f\"Auteurs: {len(auteurs)}\")\ndispos = [l for l in livres if l.disponible]\nprint(f\"Livres disponibles: {len(dispos)}\")\n\nprint(\"\\nProjet pret a etre developpe avec FastAPI + SQLite !\")",
  },
}

export const TOTAL_MODULES = MODULES.length
export const TOTAL_PARTS = PARTS.length

export function getModulesByPart(partId) {
  return MODULES.filter(m => m.part === partId)
}

export function getModule(id) {
  return MODULES.find(m => m.id === id)
}
