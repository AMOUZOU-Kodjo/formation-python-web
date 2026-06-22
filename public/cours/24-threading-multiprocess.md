# Module 24 : Threading et Multiprocessing — la parallélisation en Python

Quand un programme doit faire plusieurs choses à la fois, Python propose deux approches complémentaires :
- **Threading** : plusieurs fils d'exécution dans le même processus
- **Multiprocessing** : plusieurs processus séparés

Le choix dépend d'un facteur crucial : le **GIL (Global Interpreter Lock)**.

> **Objectif** : Comprendre le GIL, savoir quand utiliser threading vs multiprocessing, maîtriser les pools d'exécution et la synchronisation.

---

## 1. Le GIL — le grand méchant verrou ?

### Qu'est-ce que le GIL ?

Le **GIL (Global Interpreter Lock)** est un verrou dans l'interpréteur CPython (l'implémentation standard) qui empêche **deux threads Python d'exécuter du bytecode en même temps**.

```python
# Illustration du GIL : un seul thread à la fois peut exécuter du code Python
import threading
import time

def compter():
    n = 0
    for _ in range(50_000_000):
        n += 1

# Sans threading (séquentiel)
debut = time.time()
compter()
compter()
print(f"Séquentiel: {time.time() - debut:.2f}s")

# Avec threading (2 threads "en parallèle")
debut = time.time()
t1 = threading.Thread(target=compter)
t2 = threading.Thread(target=compter)
t1.start(); t2.start()
t1.join(); t2.join()
print(f"Threads: {time.time() - debut:.2f}s")
# → À peine plus rapide, voire plus lent (contention GIL)
```

**Conséquence** : Le threading ne rend pas le calcul CPU plus rapide. Pour le calcul, il faut `multiprocessing`. **MAIS** les opérations I/O (réseau, fichiers, BDD) libèrent le GIL, donc le threading est efficace pour ça.

### Quand le GIL est-il libéré ?

- `time.sleep()` — toujours
- Opérations I/O (`read()`, `write()`, `accept()`, `connect()`) — toujours
- Extensions C (NumPy, Pandas) — souvent
- `threading.Lock.acquire()` — pendant l'attente

---

## 2. Quand utiliser threading vs multiprocessing vs asyncio ?

| Critère | Threading | Multiprocessing | asyncio |
|---------|-----------|-----------------|---------|
| **Type de tâche** | I/O-bound | CPU-bound | I/O-bound |
| **Utilise tous les cœurs** | Non (GIL) | Oui | Non (1 thread) |
| **Mémoire** | Partagée | Séparée | Partagée |
| **Poids** | Léger (Mo) | Lourd (Go) | Très léger |
| **Nombre max** | ~1000 | ~cœurs×2 | 100 000+ |
| **Race conditions** | Oui (verrous) | Moins (Queue/Pipe) | Oui (asyncio.Lock) |
| **Complexité** | Moyenne | Élevée | Faible |

**Règle empirique :**
- **I/O-bound** (API, fichiers, BDD) → `asyncio` d'abord, `threading` si bibliothèque synchrone
- **CPU-bound** (calcul, image, ML) → `multiprocessing`
- **Les deux** → combinaison des deux

---

## 3. Threading — fils d'exécution légers

### 3.1 Créer et lancer des threads

```python
import threading
import time

def travailler(nom: str, duree: float):
    print(f"Thread {nom} commence")
    time.sleep(duree)  # I/O simulée (libère le GIL)
    print(f"Thread {nom} terminé")

# Création et lancement
threads = []
for i in range(5):
    t = threading.Thread(target=travailer, args=(i, 2))
    threads.append(t)
    t.start()  # démarre le thread

# Attendre que tous finissent
for t in threads:
    t.join()  # bloque jusqu'à la fin du thread

print("Tous les threads ont fini")
# Temps total : ~2s (les 5 threads dorment en parallèle)
```

### 3.2 Thread avec héritage

```python
import threading

class MonThread(threading.Thread):
    def __init__(self, nom: str, iterations: int):
        super().__init__()
        self.nom = nom
        self.iterations = iterations
        self.resultat = None

    def run(self):  # c'est cette méthode qui est exécutée
        total = 0
        for i in range(self.iterations):
            total += i
        self.resultat = total
        print(f"{self.nom}: résultat = {self.resultat}")

t = MonThread("Calcul", 1_000_000)
t.start()
t.join()
print(f"Résultat final: {t.resultat}")  # on peut lire l'attribut
```

### 3.3 Thread local (données propres à chaque thread)

```python
import threading

local_data = threading.local()

def configurer_thread(valeur):
    local_data.valeur = valeur
    print(f"Thread {threading.current_thread().name}: {local_data.valeur}")
    # Chaque thread a sa propre copie de local_data.valeur

threads = [
    threading.Thread(target=configurer_thread, args=("A",)),
    threading.Thread(target=configurer_thread, args=("B",)),
]
for t in threads: t.start()
for t in threads: t.join()
```

> **À retenir** : `threading.local()` permet d'avoir des variables qui existent indépendamment dans chaque thread.

---

## 4. Synchronisation — éviter les race conditions

### 4.1 `Lock` — section critique

```python
import threading

compteur = 0
verrou = threading.Lock()

def incrementer_sans_verrou():
    global compteur
    for _ in range(100000):
        compteur += 1  # ← pas atomique ! risque de race condition

def incrementer_avec_verrou():
    global compteur
    for _ in range(100000):
        with verrou:  # un seul thread à la fois
            compteur += 1

# Test sans verrou
compteur = 0
threads = [threading.Thread(target=incrementer_sans_verrou) for _ in range(5)]
for t in threads: t.start()
for t in threads: t.join()
print(f"Sans verrou: {compteur}")  # → 383412 (presque jamais 500000 !)

# Test avec verrou
compteur = 0
threads = [threading.Thread(target=incrementer_avec_verrou) for _ in range(5)]
for t in threads: t.start()
for t in threads: t.join()
print(f"Avec verrou: {compteur}")  # → 500000 (toujours correct)
```

**Pourquoi `compteur += 1` n'est pas atomique ?**
```
1. Lire compteur (load)              ← interrompu possible ici
2. Ajouter 1 (add)
3. Écrire compteur (store)           ← ou ici
```

### 4.2 `Semaphore` — limiter le nombre d'accès

```python
import threading
import time

# Sémaphore avec 2 accès max simultanés
sema = threading.Semaphore(2)

def acceder_ressource(nom: str):
    print(f"{nom} attend...")
    with sema:  # bloque si 2 threads sont déjà dans le bloc
        print(f"{nom} ACCÈS AUTORISÉ")
        time.sleep(2)
    print(f"{nom} libère")

threads = [threading.Thread(target=acceder_ressource, args=(f"T{i}",)) for i in range(6)]
for t in threads: t.start()
for t in threads: t.join()
# → Les threads entrent 2 par 2
```

### 4.3 `Event` — signaler entre threads

```python
import threading
import time

event = threading.Event()

def attente_signal(nom: str):
    print(f"{nom} attend le signal...")
    event.wait()  # bloque jusqu'à event.set()
    print(f"{nom} reçu le signal !")

def emetteur():
    print("Émetteur prépare...")
    time.sleep(2)
    print("Émetteur envoie le signal !")
    event.set()  # libère tous les threads en attente

t1 = threading.Thread(target=attente_signal, args=("A",))
t2 = threading.Thread(target=attente_signal, args=("B",))
t3 = threading.Thread(target=emetteur)

for t in (t1, t2, t3): t.start()
for t in (t1, t2, t3): t.join()
```

> **À retenir** : `Event` pour "un thread signale à d'autres", `Semaphore` pour "limiter N accès", `Lock` pour "exclusion mutuelle".

---

## 5. `concurrent.futures` — la façon moderne

Le module `concurrent.futures` offre une API plus simple que `threading`/`multiprocessing` en direct.

### 5.1 `ThreadPoolExecutor`

```python
from concurrent.futures import ThreadPoolExecutor, as_completed
import time

def telecharger(url: str) -> str:
    time.sleep(2)  # simulation I/O
    return f"Contenu de {url}"

urls = ["url1", "url2", "url3", "url4", "url5"]

# Avec ThreadPoolExecutor (max 3 threads simultanés)
with ThreadPoolExecutor(max_workers=3) as executor:
    # Soumettre toutes les tâches
    futures = {executor.submit(telecharger, url): url for url in urls}

    # Récupérer les résultats dès qu'ils sont prêts
    for future in as_completed(futures):
        url = futures[future]
        try:
            resultat = future.result()
            print(f"{url}: {resultat}")
        except Exception as e:
            print(f"{url}: erreur {e}")

# Variante plus simple : executor.map()
with ThreadPoolExecutor(max_workers=3) as executor:
    resultats = executor.map(telecharger, urls)
    for url, resultat in zip(urls, resultats):
        print(f"{url}: {resultat}")
```

### 5.2 `ProcessPoolExecutor`

```python
from concurrent.futures import ProcessPoolExecutor
import time

def calcul_carre(n: int) -> int:
    """Tâche CPU-bound : chaque processus a son propre CPU."""
    total = 0
    for i in range(n):
        total += i ** 2
    return total

if __name__ == "__main__":  # essentiel pour Windows
    with ProcessPoolExecutor(max_workers=4) as executor:
        # map() distribue le travail entre les processus
        resultats = executor.map(calcul_carre, [10_000_000] * 8)
        # 8 tâches sur 4 workers = 2 vagues
        for i, r in enumerate(resultats):
            print(f"Tâche {i}: {r}")

# ThreadPoolExecutor vs ProcessPoolExecutor pour une tâche CPU :
def tache_lourde(n):
    return sum(i * i for i in range(n))

# ThreadPoolExecutor : pas plus rapide (GIL)
# ProcessPoolExecutor : utilise tous les cœurs
```

> **À retenir** : `concurrent.futures` offre la même API pour threading et multiprocessing. Changez `ThreadPoolExecutor` → `ProcessPoolExecutor` et le paradigme change.

---

## 6. Multiprocessing — processus séparés

### 6.1 Pool de workers

```python
import multiprocessing as mp

def carre(n: int) -> int:
    return n ** 2

if __name__ == "__main__":
    # Créer un pool de 4 processus
    with mp.Pool(processes=4) as pool:
        # map : distribue et collecte
        resultats = pool.map(carre, range(10))
        print(resultats)  # → [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

        # map_async : non-bloquant
        resultat_async = pool.map_async(carre, range(10))
        print(resultat_async.get())  # → [0, 1, 4, ...]

        # apply : un seul appel
        print(pool.apply(carre, (5,)))  # → 25

        # starmap : avec plusieurs arguments
        def additionner(a, b): return a + b
        print(pool.starmap(additionner, [(1, 2), (3, 4), (5, 6)]))
        # → [3, 7, 11]
```

### 6.2 Partage de mémoire : `Value` et `Array`

Les processus ont leur propre mémoire. Pour partager des données, utilisez `Value` ou `Array`.

```python
import multiprocessing as mp

def incrementer(valeur: mp.Value, verrou: mp.Lock):
    for _ in range(1000):
        with verrou:
            valeur.value += 1

if __name__ == "__main__":
    # Partager un entier entre processus
    compteur = mp.Value("i", 0)  # "i" = signed int
    verrou = mp.Lock()

    processus = [
        mp.Process(target=incrementer, args=(compteur, verrou))
        for _ in range(4)
    ]
    for p in processus: p.start()
    for p in processus: p.join()

    print(f"Compteur final: {compteur.value}")  # → 4000
```

**Types pour `Value` et `Array` :**
| Code | Type C | Taille |
|------|--------|--------|
| `'i'` | signed int | 4 octets |
| `'f'` | float | 4 octets |
| `'d'` | double | 8 octets |
| `'b'` | signed char | 1 octet |
| `'c'` | char | 1 octet |

### 6.3 `Queue` vs `Pipe` — communication

```python
import multiprocessing as mp
import time

# Queue : file thread-safe, multiple producteurs/consommateurs
def producteur(queue: mp.Queue):
    for i in range(5):
        queue.put(f"Message-{i}")
        time.sleep(0.1)
    queue.put(None)  # signal de fin

def consommateur(queue: mp.Queue, nom: str):
    while True:
        msg = queue.get()
        if msg is None:
            queue.put(None)  # laisser le signal pour d'autres
            break
        print(f"{nom} reçoit: {msg}")

if __name__ == "__main__":
    queue = mp.Queue()
    procs = [
        mp.Process(target=producteur, args=(queue,)),
        mp.Process(target=consommateur, args=(queue, "A")),
        mp.Process(target=consommateur, args=(queue, "B")),
    ]
    for p in procs: p.start()
    for p in procs: p.join()
```

```python
# Pipe : canal bidirectionnel entre 2 processus
def envoyeur(conn: mp.Connection):
    for i in range(3):
        conn.send(f"Donnée-{i}")
    conn.close()

def receveur(conn: mp.Connection):
    while True:
        try:
            data = conn.recv()
            print(f"Reçu: {data}")
        except EOFError:
            break

if __name__ == "__main__":
    parent_conn, child_conn = mp.Pipe()
    p1 = mp.Process(target=envoyeur, args=(parent_conn,))
    p2 = mp.Process(target=receveur, args=(child_conn,))
    p1.start(); p2.start()
    p1.join(); p2.join()
```

| Queue | Pipe |
|-------|------|
| Thread-safe | Pas thread-safe |
| Plusieurs producteurs/consommateurs | 2 processus max |
| Plus lent (synchronisation) | Plus rapide |
| Taille illimitée (disque si trop grand) | Limité à ~64 Ko sur certains OS |

---

## 7. Erreurs et pièges courants

### 7.1 Oublier `if __name__ == "__main__"` sur Windows

```python
import multiprocessing as mp

def travail():
    print("Travail...")

# Sans ce guard, Windows va planter ou boucler infiniment
if __name__ == "__main__":
    p = mp.Process(target=travail)
    p.start()
    p.join()
```

### 7.2 Partager une variable simple sans protection

```python
import threading

compteur = 0  # global

def incremente():
    global compteur
    compteur += 1  # ← 3 opérations : load, add, store (non atomique)

# Solution : utiliser threading.Lock ou multiprocessing.Value
```

### 7.3 Créer trop de threads/processus

```python
# 10 000 threads → probablement un crash (mémoire)
# Contrainte : threading ≈ 8 Mo par thread stack
# 10 000 threads = 80 Go de RAM !

# Solution : ThreadPoolExecutor(max_workers=4) limite le nombre
```

### 7.4 `multiprocessing` avec des objets non sérialisables

Les arguments passés aux processus doivent être **picklables** (sérialisables). Les lambdas, les méthodes liées, certaines classes custom échouent.

```python
# Ne marchera pas :
pool = mp.Pool()
pool.map(lambda x: x**2, range(10))  # lambda n'est pas picklable

# Solution : définir une vraie fonction
def carre(x): return x**2
pool.map(carre, range(10))
```

> **Piège** : Sous Windows, `multiprocessing` doit importer le module. Assurez-vous que tout le code "à la racine" est protégé par `if __name__ == "__main__"`.

---

## Résumé

| Outil | Usage | Limitation |
|-------|-------|------------|
| `threading.Thread` | I/O-bound simple | GIL, race conditions |
| `ThreadPoolExecutor` | I/O-bound moderne | API simplifiée |
| `multiprocessing.Process` | CPU-bound | Plus lourd, mémoire séparée |
| `ProcessPoolExecutor` | CPU-bound moderne | Objets sérialisables |
| `Lock` | Exclusion mutuelle | Deadlock possible |
| `Semaphore` | Limiter N accès | Thread-safe |
| `Event` | Signaler | Ponctuel |
| `Queue` | Communication | Thread-safe |
| `Pipe` | Communication rapide | 2 processus |

```python
# Aide-mémoire : quel outil pour quel besoin ?
import asyncio
import threading
import multiprocessing as mp
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

# Tâche I/O-bound (réseau, fichiers)
# asyncio.run(main_async())          # Meilleur
# threading.Thread(target=f)         # Alternative
# ThreadPoolExecutor().submit(f)     # Moderne

# Tâche CPU-bound (calcul, traitement)
# mp.Process(target=f)               # Manuel
# ProcessPoolExecutor().submit(f)    # Moderne
# mp.Pool().map(f, data)             # Classique
```

---

## Exercices

1. **Comparaison Thread vs Process** : Écrivez une fonction qui calcule la somme des carrés jusqu'à 10⁷. Testez la durée avec : séquentiel, 4 threads, 4 processus.
2. **Web scraper avec threads** : Téléchargez 10 URLs avec `urllib` (ou `requests`) en utilisant `ThreadPoolExecutor(4)`. Affichez la durée totale.
3. **Producteur-Consommateur avec Process** : Un processus produit 100 nombres aléatoires, un autre les trie et écrit les résultats dans un fichier. Utilisez `Queue`.
4. **Simulation de compteur** : Créez une situation de race condition avec 10 threads, puis corrigez-la avec un `Lock`.
5. **Pool de calcul d'images** : Générez 100 images de 100×100 pixels (aléatoires), appliquez un filtre (moyenneur) en parallèle avec `ProcessPoolExecutor`.
