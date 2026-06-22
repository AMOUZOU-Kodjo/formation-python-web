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
}

export const EXERCISES = {
  "01-introduction": {
    instruction: "Écris un programme qui demande le prénom et l'âge de l'utilisateur, puis affiche un message personnalisé.",
    starterCode: "# Saisis ton code ici\nprenom = input(\"Quel est ton prénom ? \")\nage = input(\"Quel est ton âge ? \")\n\n# Affiche le message\nprint(...)",
    solution: 'prenom = input("Quel est ton prénom ? ")\nage = input("Quel est ton âge ? ")\nprint(f"Bonjour {prenom}, tu as {age} ans !")',
  },
  "02-variables-types": {
    instruction: "Demande deux nombres à l'utilisateur et affiche leur somme, différence, produit et quotient.",
    starterCode: "a = float(input(\"Premier nombre : \"))\nb = float(input(\"Deuxième nombre : \"))\n\n# Calcule et affiche les opérations",
    solution: "a = float(input(\"Premier nombre : \"))\nb = float(input(\"Deuxième nombre : \"))\nprint(f\"Somme: {a+b}\")\nprint(f\"Différence: {a-b}\")\nprint(f\"Produit: {a*b}\")\nif b != 0:\n    print(f\"Quotient: {a/b}\")",
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
