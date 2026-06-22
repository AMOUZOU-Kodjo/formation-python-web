# Module 23 : Programmation asynchrone (async / await)

La programmation asynchrone permet à un programme d'**attendre** une opération (réseau, fichier, base de données) **sans bloquer** le reste du code. C'est un changement de paradigme majeur, introduit en Python 3.5 avec `asyncio`.

> **Objectif** : Comprendre la différence entre concurrence et parallélisme, maîtriser `async`/`await`, `asyncio.run`, `gather`, `create_task`, et savoir quand l'utiliser.

---

## 1. Concurrence vs Parallélisme — une distinction fondamentale

```python
import time
import asyncio

# --- PARALLÉLISME (multiprocessing) ---
# Plusieurs tâches VRAIMENT en même temps (plusieurs cœurs CPU)
# → 4 tâches sur 4 cœurs : 1 minute → 1 minute
# Utile pour : calculs intensifs

# --- CONCURRENCE (asyncio / threading) ---
# Plusieurs tâches ENTRELACÉES sur un seul cœur
# → 4 tâches d'attente réseau : 4 minutes → 1 minute
# Utile pour : I/O (réseau, fichiers, APIs)
```

**Métaphore :**
- **Parallélisme** = 4 caisses au supermarché, 4 files, 4 caissiers
- **Concurrence** = 1 caisse, 1 caissier, mais qui passe rapidement d'un client à l'autre pendant que le premier cherche sa monnaie

```python
# Simulation : attente non-bloquante
async def tache(nom: str, duree: float):
    print(f"  → Début {nom}")
    await asyncio.sleep(duree)  # "Je rends la main, fais autre chose"
    print(f"  ← Fin {nom}")
    return f"Résultat de {nom}"

async def main():
    # Sans concurrence : 2 + 2 = 4 secondes
    debut = time.time()
    r1 = await tache("A", 2)
    r2 = await tache("B", 2)
    print(f"Temps séquentiel: {time.time() - debut:.1f}s")  # → ~4s

    # Avec concurrence : max(2, 2) = 2 secondes
    debut = time.time()
    t1 = asyncio.create_task(tache("A", 2))
    t2 = asyncio.create_task(tache("B", 2))
    r1, r2 = await asyncio.gather(t1, t2)
    print(f"Temps concurrent: {time.time() - debut:.1f}s")   # → ~2s

asyncio.run(main())
```

---

## 2. La boucle d'événements (event loop)

L'**event loop** est le cœur de `asyncio`. C'est lui qui :
1. **Orchestre** l'exécution des coroutines
2. **Reprend** une coroutine quand son `await` est terminé
3. **Distribue** le temps entre les tâches

```python
import asyncio

# Visualisation du déroulement
async def dire_apres(delai: float, msg: str):
    await asyncio.sleep(delai)
    print(msg)

async def main():
    print("1. On crée les tâches")
    t1 = asyncio.create_task(dire_apres(2, "3. Tâche 1 finie après 2s"))
    t2 = asyncio.create_task(dire_apres(1, "2. Tâche 2 finie après 1s"))

    print("1.5. Les tâches sont planifiées")
    await asyncio.gather(t1, t2)
    print("4. Tout est terminé")

asyncio.run(main())
# → 1. On crée les tâches
# → 1.5. Les tâches sont planifiées
# → 2. Tâche 2 finie après 1s    (la plus courte se finit en premier)
# → 3. Tâche 1 finie après 2s
# → 4. Tout est terminé
```

> **À retenir** : `asyncio.run(main())` crée une event loop, exécute `main()`, et la ferme proprement.

---

## 3. Syntaxe de base : `async def` et `await`

### 3.1 Définir et appeler une coroutine

```python
import asyncio

# async def → définit une coroutine
async def saluer(nom: str) -> str:
    return f"Bonjour {nom}"

async def main():
    # Appeler une coroutine crée un objet coroutine
    coro = saluer("Alice")
    print(type(coro))  # → <class 'coroutine'>

    # Pour l'exécuter, il faut await
    resultat = await coro
    print(resultat)  # → Bonjour Alice

asyncio.run(main())
```

### 3.2 Erreur classique : oublier `await`

```python
async def main():
    resultat = saluer("Bob")  # ← pas de await !
    print(resultat)           # → <coroutine object saluer at 0x...>
    # Ce n'est pas le résultat mais l'objet coroutine !

    resultat = await saluer("Bob")
    print(resultat)           # → Bonjour Bob
```

> **Piège** : Oublier `await` ne déclenche pas d'erreur — ça retourne juste un objet coroutine inerte.

---

## 4. Exécution concurrente avec `create_task` et `gather`

### 4.1 `asyncio.create_task` — planifier l'exécution

```python
import asyncio

async def telecharger(url: str, duree: float) -> str:
    print(f"Téléchargement de {url}...")
    await asyncio.sleep(duree)  # simule un téléchargement
    print(f"{url} terminé")
    return f"Contenu de {url}"

async def main():
    # Planifier 3 téléchargements concurrents
    t1 = asyncio.create_task(telecharger("url1", 3))
    t2 = asyncio.create_task(telecharger("url2", 2))
    t3 = asyncio.create_task(telecharger("url3", 1))

    # Les 3 tournent en parallèle maintenant

    # Récupérer les résultats (attend la fin de chacun)
    r1 = await t1
    r2 = await t2
    r3 = await t3
    print(f"Résultats: {r1}, {r2}, {r3}")
    # Temps total : ~3s (le plus long), pas 3+2+1=6s

asyncio.run(main())
```

### 4.2 `asyncio.gather` — plus élégant

```python
import asyncio

async def main():
    urls = [("url1", 3), ("url2", 2), ("url3", 1)]

    # Créer et lancer toutes les tâches
    taches = [telecharger(url, duree) for url, duree in urls]

    # gather les exécute en parallèle et attend toutes
    resultats = await asyncio.gather(*taches)
    print(resultats)
    # → ['Contenu de url1', 'Contenu de url2', 'Contenu de url3']

asyncio.run(main())
```

### 4.3 `gather` avec gestion d'erreurs

```python
import asyncio

async def tache_risquee(n: int) -> str:
    await asyncio.sleep(0.5)
    if n == 2:
        raise ValueError(f"Erreur sur la tâche {n}")
    return f"Tâche {n} OK"

async def main():
    # return_exceptions=True → les erreurs sont retournées, pas levées
    resultats = await asyncio.gather(
        tache_risquee(1),
        tache_risquee(2),
        tache_risquee(3),
        return_exceptions=True
    )
    for r in resultats:
        if isinstance(r, Exception):
            print(f"Échec: {r}")
        else:
            print(f"Succès: {r}")

asyncio.run(main())
# → Succès: Tâche 1 OK
# → Échec: Erreur sur la tâche 2
# → Succès: Tâche 3 OK
```

---

## 5. Timeouts et annulation

### 5.1 `asyncio.wait_for` — timeout

```python
import asyncio

async def operation_lente():
    print("Opération longue...")
    await asyncio.sleep(10)
    return "Terminé"

async def main():
    try:
        resultat = await asyncio.wait_for(
            operation_lente(),
            timeout=3.0  # 3 secondes max
        )
        print(resultat)
    except asyncio.TimeoutError:
        print("⏱ L'opération a pris trop de temps !")

asyncio.run(main())
# → Opération longue...
# → ⏱ L'opération a pris trop de temps !
```

### 5.2 `asyncio.shield` — protéger de l'annulation

```python
import asyncio

async def critique():
    await asyncio.sleep(2)
    return "Données critiques sauvegardées"

async def main():
    try:
        resultat = await asyncio.wait_for(
            asyncio.shield(critique()),
            timeout=1
        )
    except asyncio.TimeoutError:
        print("Timeout atteint, mais critique() continue en arrière-plan")

asyncio.run(main())
```

---

## 6. `asyncio.Queue` — files de tâches

`asyncio.Queue` est l'équivalent asynchrone de `queue.Queue`, parfait pour les **producteurs/consommateurs**.

```python
import asyncio
import random

async def producteur(queue: asyncio.Queue, n: int):
    for i in range(n):
        element = f"Item-{i}"
        await queue.put(element)
        print(f"Produit: {element}")
        await asyncio.sleep(random.random())
    await queue.put(None)  # signal de fin

async def consommateur(queue: asyncio.Queue, nom: str):
    while True:
        element = await queue.get()
        if element is None:
            queue.task_done()
            break
        print(f"  {nom} consomme: {element}")
        await asyncio.sleep(random.random())
        queue.task_done()

async def main():
    queue: asyncio.Queue = asyncio.Queue(maxsize=3)
    # Lancer producteur et 2 consommateurs en parallèle
    await asyncio.gather(
        producteur(queue, 5),
        consommateur(queue, "A"),
        consommateur(queue, "B"),
    )

asyncio.run(main())
# → Produit: Item-0
# →   A consomme: Item-0
# →   B consomme: Item-0  ...
```

---

## 7. `asyncio.Lock` — synchronisation

Les verrous asynchrones évitent qu'une ressource soit accédée simultanément par plusieurs coroutines.

```python
import asyncio

async def tache(nom: str, verrou: asyncio.Lock):
    async with verrou:  # attend si le verrou est pris
        print(f"{nom} a le verrou")
        await asyncio.sleep(1)
    print(f"{nom} a libéré le verrou")

async def main():
    verrou = asyncio.Lock()
    await asyncio.gather(
        tache("A", verrou),
        tache("B", verrou),
        tache("C", verrou),
    )

asyncio.run(main())
# → A a le verrou  (exécution séquentielle de la section critique)
# → A a libéré le verrou
# → B a le verrou
# → B a libéré le verrou
# → C a le verrou
# → C a libéré le verrou
```

---

## 8. asyncio vs threading — quand utiliser quoi ?

| Critère | asyncio | threading |
|---------|---------|-----------|
| **Modèle** | Tâches collaboratives | Preemption OS |
| **GIL** | Pas bloqué (pas de threads) | Contourné partiellement |
| **Nombre de tâches** | Très grand (100 000+) | Modéré (quelques centaines) |
| **Paradigme** | async/await | callbacks ou threads |
| **Accès aux données** | Pas de race condition (1 thread) | Verrous nécessaires |
| **I/O-bound** | Excellent | Bon |
| **CPU-bound** | À éviter | À éviter (multiprocessing) |

```python
import asyncio
import threading
import time

# Threading : préemptif (le système peut interrompre à tout moment)
def travail_thread():
    time.sleep(1)
    print("Thread fini")

# asyncio : coopératif (la tâche décide quand céder la main)
async def travail_async():
    await asyncio.sleep(1)
    print("Async fini")
```

> **À retenir** : `asyncio` est idéal pour les serveurs web, les crawlers, les APIs — tout ce qui fait beaucoup d'I/O avec des temps d'attente.

---

## 9. Exemple concret : téléchargement web avec `aiohttp`

```python
import asyncio
import aiohttp  # pip install aiohttp

async def telecharger_url(session: aiohttp.ClientSession, url: str) -> dict:
    try:
        async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as response:
            return {
                "url": url,
                "status": response.status,
                "taille": len(await response.text())
            }
    except Exception as e:
        return {"url": url, "erreur": str(e)}

async def main():
    urls = [
        "https://httpbin.org/delay/1",
        "https://httpbin.org/delay/2",
        "https://httpbin.org/delay/3",
    ]

    async with aiohttp.ClientSession() as session:
        taches = [telecharger_url(session, url) for url in urls]
        resultats = await asyncio.gather(*taches)

    for r in resultats:
        if "erreur" in r:
            print(f"Échec: {r['url']} → {r['erreur']}")
        else:
            print(f"{r['url']}: status {r['status']}, {r['taille']} bytes")
    # Temps total : ~3s (le plus long des 3 délais)

asyncio.run(main())
```

---

## 10. Pièges courants

### 10.1 Bloquer l'event loop

```python
import asyncio
import time

async def mauvais():
    # Bloque TOUTE l'event loop pendant 5 secondes
    time.sleep(5)  # ← NE JAMAIS FAIRE ÇA
    # Utilisez await asyncio.sleep(5) à la place

async def ok():
    await asyncio.sleep(5)  # ← Correct
```

### 10.2 Oublier `await`

```python
async def test():
    await asyncio.sleep(1)
    return 42

async def main():
    resultat = test()  # ← sans await, c'est un objet coroutine
    print(type(resultat))  # → <class 'coroutine'>
    # Rien n'est exécuté
```

### 10.3 Mélanger synchrone et asynchrone

```python
async def travail():
    await asyncio.sleep(1)

def fonction_synchrone():
    asyncio.run(travail())  # Fonctionne mais attention

async def main():
    await travail()
    # asyncio.run() ne peut pas être appelé depuis une coroutine active
```

---

## Résumé

| Concept | Fonction | Rôle |
|---------|----------|------|
| `async def` | Définit une coroutine | Fonction asynchrone |
| `await` | Attend une coroutine | Cède la main |
| `asyncio.run(main())` | Lance l'event loop | Point d'entrée |
| `create_task(coro)` | Planifie une tâche | Exécution en arrière-plan |
| `gather(*coros)` | Exécute en parallèle | Attends toutes |
| `wait_for(coro, t)` | Timeout | Annule si trop long |
| `asyncio.Queue` | File asynchrone | Producteur/consommateur |
| `asyncio.Lock` | Verrou asynchrone | Section critique |

---

## Exercices

1. **Simulateur de téléchargement** : Créez 5 tâches avec des durées aléatoires (1-5s) et affichez les résultats dans l'ordre de fin (pas l'ordre de lancement).
2. **Timeouts** : Lancez 3 URLs avec un timeout de 2s. Les plus longues doivent être annulées proprement.
3. **Producteur-Consommateur** : Un producteur génère 10 nombres, 2 consommateurs les traitent en parallèle. Utilisez `asyncio.Queue`.
4. **Web scraper** : Téléchargez 5 pages web avec `aiohttp` et mesurez le gain de temps par rapport à une version synchrone.
5. **Crawler avec limite** : Un crawler qui ne traite pas plus de 3 URLs simultanément (utilisez un `Semaphore`).
