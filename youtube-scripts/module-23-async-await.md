# Vidéo #23 — Async / Await

## Informations générales
- **Titre** : Python #23 — Async / Await (Formation Complète)
- **Durée** : ~15 min
- **Miniature** : `banners/23-async-await.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 23 — ASYNC / AWAIT

> "Bienvenue dans le module 23. Dans cette vidéo, on va voir comment écrire du code qui fait plusieurs choses en même temps avec la programmation asynchrone en Python. async def, await, asyncio — c'est parti."

---

### 0:30 — Synchrone vs Asynchrone (2 min)
**Texte écran :** SYNCHRONE VS ASYNCHRONE

> "En programmation synchrone, les instructions s'exécutent une par une. Si une opération bloque — comme un appel réseau ou une lecture de fichier — tout le programme attend."

```python
# Synchrone
import time

def tache_longue():
    print("Tâche commence...")
    time.sleep(2)
    print("Tâche finie.")

tache_longue()
tache_longue()
# Total : 4 secondes
```

> "En asynchrone, on peut suspendre une tâche en attendant et faire autre chose pendant ce temps."

```python
# Asynchrone
import asyncio

async def tache_longue():
    print("Tâche commence...")
    await asyncio.sleep(2)
    print("Tâche finie.")
```

> "Le mot-clé `async` rend une fonction asynchrone. Elle retourne un coroutine object, pas une valeur directe."

---

### 2:30 — async def et await (2 min)
**Texte écran :** async def ET await

```python
import asyncio

async def dire_bonjour():
    print("Bonjour")
    await asyncio.sleep(1)
    print("Au revoir")

# Lancer une coroutine
asyncio.run(dire_bonjour())
```

> "`await` suspend l'exécution de la coroutine jusqu'à ce que l'opération soit terminée. Pendant ce temps, la boucle d'événements peut exécuter d'autres tâches."

**Point clé :**
- `async def` → définit une coroutine
- `await` → attend une coroutine sans bloquer
- `asyncio.run()` → point d'entrée de l'application asynchrone

---

### 4:30 — asyncio.sleep() et le timing (1 min 30)
**Texte écran :** GÉRER LE TEMPS

```python
import asyncio
import time

async def tache(nom, duree):
    print(f"{nom} commence à {time.strftime('%X')}")
    await asyncio.sleep(duree)
    print(f"{nom} finit à {time.strftime('%X')}")

async def main():
    await tache("A", 2)
    await tache("B", 2)

asyncio.run(main())
# Temps total : 4s (exécution séquentielle)
```

> "Même en asynchrone, si on utilise `await` séquentiellement, on n'a pas de parallélisme. Pour ça, on utilise `asyncio.gather()`."

---

### 6:00 — asyncio.gather() (2 min)
**Texte écran :** PARALLÉLISER AVEC gather()

```python
import asyncio

async def tache(nom, duree):
    print(f"{nom}: début")
    await asyncio.sleep(duree)
    print(f"{nom}: fin")
    return f"Résultat de {nom}"

async def main():
    results = await asyncio.gather(
        tache("A", 3),
        tache("B", 1),
        tache("C", 2)
    )
    print(results)
    # ["Résultat de A", "Résultat de B", "Résultat de C"]

asyncio.run(main())
# Temps total : ~3s (les 3 tâches s'exécutent en parallèle)
```

> "Les 3 tâches démarrent en même temps. Le temps total est celui de la tâche la plus longue."

---

### 8:00 — create_task() pour tâches de fond (1 min 30)
**Texte écran :** TÂCHES DE FOND

```python
import asyncio

async def tache_fond():
    while True:
        print("Patientez...")
        await asyncio.sleep(2)

async def main():
    # Créer une tâche de fond
    fond = asyncio.create_task(tache_fond())

    # Continuer notre travail
    await asyncio.sleep(5)
    print("Travail principal terminé")

    # Annuler la tâche de fond
    fond.cancel()

asyncio.run(main())
```

> "`create_task()` crée une tâche qui s'exécute en arrière-plan. Pratique pour des logs, des healthchecks, ou des notifications."

---

### 9:30 — aiohttp pour requêtes HTTP (2 min)
**Texte écran :** HTTP ASYNCHRONE AVEC AIOHTTP

```bash
pip install aiohttp
```

```python
import aiohttp
import asyncio

async def fetch_url(url: str) -> str:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def main():
    urls = [
        "https://api.github.com",
        "https://httpbin.org/get",
        "https://jsonplaceholder.typicode.com/posts/1",
    ]

    results = await asyncio.gather(
        *(fetch_url(url) for url in urls)
    )
    print(f"Récupéré {len(results)} pages")

asyncio.run(main())
```

> "Avec `async with` on gère les context managers asynchrones. `aiohttp` est la bibliothèque standard pour les requêtes HTTP asynchrones."

---

### 11:30 — async with et async for (1 min 30)
**Texte écran :** ASYNC WITH & ASYNC FOR

```python
import asyncio

# Async context manager
class AsyncFile:
    async def __aenter__(self):
        print("Ouverture du fichier...")
        await asyncio.sleep(0.5)
        return self

    async def __aexit__(self, *args):
        print("Fermeture du fichier...")
        await asyncio.sleep(0.3)

    async def lire(self):
        return "Contenu du fichier"

async def demo():
    async with AsyncFile() as f:
        contenu = await f.lire()
        print(contenu)

# Async for
async def generateur():
    for i in range(5):
        await asyncio.sleep(0.5)
        yield i

async def demo2():
    async for valeur in generateur():
        print(valeur)

asyncio.run(demo2())
```

> "`async with` pour les context managers asynchrones, `async for` pour les itérateurs asynchrones."

---

### 13:00 — Quand utiliser l'asynchrone ? (1 min 30)
**Texte écran :** I/O BOUND VS CPU BOUND

> "L'asynchrone est excellent pour les tâches I/O bound — c'est-à-dire qui passent leur temps à attendre des entrées/sorties."

**✅ I/O bound — asynchrone parfait :**
- Requêtes HTTP / API
- Lecture/écriture de fichiers
- Requêtes base de données
- Web scraping

**❌ CPU bound — asynchrone inutile :**
- Calculs mathématiques lourds
- Traitement d'images
- Machine learning

> "Si votre tâche utilise le CPU à 100%, l'asynchrone ne sert à rien. Pour ça, on utilisera le multiprocessing dans le prochain module."

---

### 14:30 — Conclusion
> "Module 24 : on continue avec le threading et le multiprocessing pour faire du vrai parallélisme."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 23 : Async / Await

Au programme :
00:00 — Introduction
00:30 — Synchrone vs Asynchrone
02:30 — async def et await
04:30 — asyncio.sleep() et le timing
06:00 — asyncio.gather() pour paralléliser
08:00 — create_task() pour tâches de fond
09:30 — aiohttp pour requêtes HTTP asynchrones
11:30 — async with et async for
13:00 — Quand utiliser l'asynchrone ?
14:30 — Prochain module

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

#python #formationpython #async #await #asyncio #programmationasynchrone
```

## Tags YouTube
```
python, formation python, async await, asyncio, programmation asynchrone, python asynchrone, aiohttp, python avancé, cours python, coroutines, python 3.11
```
