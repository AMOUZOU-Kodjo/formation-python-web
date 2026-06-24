# Vidéo #24 — Threading & Multiprocess

## Informations générales
- **Titre** : Python #24 — Threading & Multiprocess (Formation Complète)
- **Durée** : ~15 min
- **Miniature** : `banners/24-threading-multiprocess.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 24 — THREADING & MULTIPROCESS

> "Bienvenue dans le module 24. On va voir comment exécuter plusieurs tâches en parallèle avec Python. Deux approches : les threads pour l'I/O bound, et les processus pour le CPU bound."

---

### 0:30 — Threading : lancer un thread (2 min)
**Texte écran :** THREADING

```python
import threading
import time

def travail(nom, duree):
    print(f"[{nom}] Début")
    time.sleep(duree)
    print(f"[{nom}] Fin")

# Créer et lancer des threads
t1 = threading.Thread(target=travail, args=("A", 3))
t2 = threading.Thread(target=travail, args=("B", 1))

t1.start()
t2.start()

# Attendre la fin
t1.join()
t2.join()

print("Tous les threads ont fini")
```

> "Un `Thread` exécute une fonction en parallèle. `start()` lance le thread, `join()` attend qu'il se termine."

**Texte écran :** THREAD VS THREADING

> "Le module `threading` gère des threads légers qui partagent la même mémoire. Attention aux accès concurrents."

---

### 2:30 — Verrouiller avec Lock (1 min 30)
**Texte écran :** PROTÉGER LES RESSOURCES AVEC LOCK

```python
import threading

compteur = 0
verrou = threading.Lock()

def incrementer():
    global compteur
    for _ in range(100000):
        with verrou:
            compteur += 1

threads = [threading.Thread(target=incrementer) for _ in range(10)]
for t in threads: t.start()
for t in threads: t.join()

print(f"Compteur : {compteur}")  # 1 000 000
```

> "Sans `Lock`, deux threads peuvent modifier `compteur` en même temps, provoquant des incohérences. Le `with verrou:` garantit l'accès exclusif."

---

### 4:00 — Le GIL (Global Interpreter Lock) (1 min 30)
**Texte écran :** LE GIL

> "Le GIL est un verrou global dans CPython qui empêche deux threads d'exécuter du bytecode Python en même temps."

```python
# CPU bound — les threads ne servent à rien
def calcul_lourd():
    total = 0
    for i in range(10**7):
        total += i
    return total

# Avec threads : pas plus rapide qu'en séquentiel
```

> "Conséquence : pour les tâches CPU bound, les threads ne donnent aucun gain de performance. C'est là qu'intervient le multiprocessing."

---

### 5:30 — multiprocessing.Process (2 min)
**Texte écran :** MULTIPROCESSING — VRAI PARALLÉLISME

```python
import multiprocessing
import time

def travail(nom, duree):
    print(f"[{nom}] Début")
    time.sleep(duree)
    print(f"[{nom}] Fin")

if __name__ == "__main__":
    p1 = multiprocessing.Process(target=travail, args=("A", 2))
    p2 = multiprocessing.Process(target=travail, args=("B", 2))

    p1.start()
    p2.start()
    p1.join()
    p2.join()
```

> "Chaque `Process` a sa propre mémoire et son propre interpréteur Python. Pas de GIL partagé. Du vrai parallélisme."

**Important :** Protéger le lancement avec `if __name__ == "__main__"` sur Windows.

---

### 7:30 — Pool de workers (2 min)
**Texte écran :** POOL DE WORKERS

```python
from multiprocessing import Pool

def carre(n):
    return n * n

if __name__ == "__main__":
    with Pool(processes=4) as pool:
        resultats = pool.map(carre, range(100))
        # Résultat : [0, 1, 4, 9, 16, ...]

    print(resultats[:10])

    # Version asynchrone
    with Pool(processes=4) as pool:
        resultats = pool.map_async(carre, range(100))
        print(resultats.get()[:10])
```

> "`Pool` gère un groupe de workers. `map()` distribue automatiquement le travail entre les processus."

---

### 9:30 — Queue pour communiquer entre processus (1 min 30)
**Texte écran :** COMMUNICATION AVEC QUEUE

```python
from multiprocessing import Process, Queue

def producteur(q):
    for i in range(5):
        q.put(f"Message {i}")

def consommateur(q):
    while True:
        msg = q.get()
        if msg is None:
            break
        print(f"Reçu : {msg}")

if __name__ == "__main__":
    q = Queue()

    p1 = Process(target=producteur, args=(q,))
    p2 = Process(target=consommateur, args=(q,))

    p1.start()
    p2.start()

    p1.join()
    q.put(None)  # Signal de fin
    p2.join()
```

> "Les processus ne partagent pas la mémoire. `Queue` permet d'échanger des données en toute sécurité."

---

### 11:00 — Synchronisation : Lock, Semaphore, Event (1 min 30)
**Texte écran :** SYNCHRONISATION

```python
from multiprocessing import Lock, Semaphore, Event
import time

# Lock — exclusion mutuelle
verrou = Lock()
with verrou:
    print("Section critique")

# Semaphore — nb limité d'accès
s = Semaphore(3)  # 3 accès max

# Event — signaler un état
e = Event()

def attendre_signal():
    print("En attente...")
    e.wait()
    print("Signal reçu !")

def donner_signal():
    time.sleep(2)
    e.set()

if __name__ == "__main__":
    p1 = Process(target=attendre_signal)
    p2 = Process(target=donner_signal)
    p1.start()
    p2.start()
    p1.join()
    p2.join()
```

---

### 12:30 — Cas concrets (1 min 30)
**Texte écran :** CAS CONCRETS

**Threading (I/O bound) :**
```python
import threading
import requests

urls = ["https://api.github.com"] * 10

def telecharger(url):
    response = requests.get(url)
    print(f"{url}: {len(response.content)} octets")

threads = [threading.Thread(target=telecharger, args=(u,)) for u in urls]
for t in threads: t.start()
for t in threads: t.join()
```

**Multiprocessing (CPU bound) :**
```python
from multiprocessing import Pool

def fibonacci(n):
    if n <= 1: return n
    return fibonacci(n-1) + fibonacci(n-2)

if __name__ == "__main__":
    with Pool(4) as pool:
        resultats = pool.map(fibonacci, range(35))
    print(resultats)
```

---

### 14:00 — Conclusion
> "Module 25 : on va explorer les métaclasses et l'introspection. Comment Python crée les classes, et comment fouiller dans les objets."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 24 : Threading & Multiprocess

Au programme :
00:00 — Introduction
00:30 — Threading : lancer un thread
02:30 — Verrouiller avec Lock
04:00 — Le GIL (Global Interpreter Lock)
05:30 — multiprocessing.Process
07:30 — Pool de workers
09:30 — Queue pour communiquer
11:00 — Synchronisation : Lock, Semaphore, Event
12:30 — Cas concrets (téléchargements, calculs)
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

#python #formationpython #threading #multiprocessing #gil #parallelisme
```

## Tags YouTube
```
python, formation python, threading, multiprocessing, gil, threads python, parallelisme python, pool multiprocessing, lock python, queue multiprocessing, python avancé
```
