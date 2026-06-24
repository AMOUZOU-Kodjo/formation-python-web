# Vidéo #33 — Web scraping

## Informations générales
- **Titre** : Python #33 — Web scraping (Formation Complète)
- **Durée** : ~14 min
- **Miniature** : `banners/33-web-scraping.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 33 — WEB SCRAPING

> "Extraire des données depuis des sites web, c'est ce qu'on appelle le web scraping. Dans ce module, on va utiliser `requests`, `BeautifulSoup`, et `Selenium` pour récupérer et parser du contenu HTML."

---

### 0:30 — Qu'est-ce que le web scraping ? (1 min)
**Texte écran :** C'EST QUOI LE WEB SCRAPING ?

> "Le web scraping consiste à télécharger une page web et en extraire les données utiles : titres, prix, descriptions, liens..."

**Usages :**
- Veille concurrentielle (prix, catalogues)
- Agrégation de contenu (actualités, offres d'emploi)
- Datasets pour la data science
- Archivage de sites

> "Rappel : scraper un site doit respecter ses conditions d'utilisation et le fichier `robots.txt`."

---

### 1:30 — requests : télécharger une page (2 min)
**Texte écran :** REQUESTS

```bash
pip install requests beautifulsoup4
```

```python
import requests

# GET simple
reponse = requests.get("https://example.com")
print(reponse.status_code)   # 200
print(reponse.text)          # Contenu HTML

# Avec headers (User-Agent)
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}
reponse = requests.get("https://httpbin.org/headers", headers=headers)

# Timeout (obligatoire pour ne pas bloquer)
reponse = requests.get("https://example.com", timeout=10)

# POST avec des données
donnees = {"username": "admin", "password": "1234"}
reponse = requests.post("https://httpbin.org/post", data=donnees)
```

> "Imposter un `User-Agent` de navigateur est essentiel : beaucoup de sites bloquent les scripts non identifiés. Ne lancez jamais une requête sans `timeout`."

---

### 3:30 — BeautifulSoup : parser le HTML (2 min)
**Texte écran :** BEAUTIFULSOUP

```python
from bs4 import BeautifulSoup

html = """
<html><body>
    <h1>Titre principal</h1>
    <p class="description">Ceci est un paragraphe.</p>
    <a href="https://example.com/lien1">Lien 1</a>
    <a href="https://example.com/lien2">Lien 2</a>
</body></html>
"""

soup = BeautifulSoup(html, "html.parser")

# Extraire le titre
print(soup.h1.text)                  # Titre principal

# find() — premier élément
p = soup.find("p", class_="description")
print(p.text)                        # Ceci est un paragraphe.

# find_all() — tous les éléments
liens = soup.find_all("a")
for lien in liens:
    print(lien.text, lien.get("href"))
```

---

### 5:30 — Sélecteurs CSS avec select (1 min 30)
**Texte écran :** SÉLECTEURS CSS

```python
# select() utilise les sélecteurs CSS
soup.select("h1")                    # Tous les h1
soup.select(".description")          # Classe "description"
soup.select("#main")                 # ID "main"
soup.select("div > p")               # p enfants directs de div
soup.select("a[href*=example]")      # href contenant "example"
soup.select("ul li:first-child")     # Premier li de chaque ul
```

> "Les sélecteurs CSS sont souvent plus puissants et plus concis que `find()` et `find_all()`, surtout pour des structures complexes."

**Exemple concret :**
```python
# Sur un vrai site d'annonces
annonces = soup.select(".annonce-card h2 a")
for a in annonces:
    print(a.text, a.get("href"))
```

---

### 7:00 — .text, .get(), .attrs (1 min 30)
**Texte écran :** EXTRAIRE LES DONNÉES

```python
from bs4 import BeautifulSoup

html = """
<div class="produit" data-id="42">
    <h2>MacBook Pro</h2>
    <span class="prix">1299€</span>
    <a href="/produit/42">Voir plus</a>
</div>
"""

soup = BeautifulSoup(html, "html.parser")
div = soup.find("div", class_="produit")

print(div.text)                  # "MacBook Pro 1299€ Voir plus"
print(div.get_text(strip=True))  # "MacBook Pro 1299€ Voir plus"
print(div.get("data-id"))        # "42"
print(div.attrs)                 # {'class': ['produit'], 'data-id': '42'}

h2 = div.find("h2")
print(h2.text)                   # "MacBook Pro"

lien = div.find("a")
print(lien.get("href"))          # "/produit/42"
```

> "`.text` donne tout le texte contenu dans l'élément. `.get("attr")` récupère un attribut. `.attrs` retourne tous les attributs sous forme de dictionnaire."

---

### 8:30 — Cas pratique : scraper un site d'annonces (3 min)
**Texte écran :** CAS PRATIQUE

```python
import requests
from bs4 import BeautifulSoup

URL = "https://books.toscrape.com/"  # Site d'exercice
headers = {"User-Agent": "Mozilla/5.0"}

reponse = requests.get(URL, headers=headers, timeout=10)
soup = BeautifulSoup(reponse.text, "html.parser")

livres = soup.select("article.product_pod")

for livre in livres:
    titre = livre.h3.a.get("title")
    prix = livre.select_one(".price_color").text
    note = livre.select_one("p.star-rating")["class"][1]
    lien = livre.h3.a.get("href")

    print(f"{titre} | {prix} | {note} étoiles")
    print(f"  → {URL}{lien}")
```

> "On utilise `select` pour les articles, `select_one` pour le prix. On extrait le titre depuis l'attribut `title` du lien."

---

### 11:30 — Gérer le JavaScript avec Selenium (2 min)
**Texte écran :** SELENIUM

> "Quand le contenu est chargé par JavaScript, `requests` ne suffit pas. Il faut un vrai navigateur."

```bash
pip install selenium
```

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

# Lancer le navigateur
driver = webdriver.Chrome()

# Charger la page
driver.get("https://example.com")

# Attendre que le JavaScript s'exécute
driver.implicitly_wait(10)

# Extraire avec les sélecteurs habituels
titre = driver.find_element(By.TAG_NAME, "h1").text
elements = driver.find_elements(By.CLASS_NAME, "item")

# Fermer
driver.quit()
```

> "Selenium pilote un vrai navigateur (Chrome, Firefox). C'est plus lent mais indispensable pour les sites en Single Page Application (React, Vue...)."

---

### 13:00 — Bonnes pratiques (1 min)
**Texte écran :** BONNES PRATIQUES

**1. Respecter robots.txt :**
```python
# Vérifier https://example.com/robots.txt
# User-agent: *
# Disallow: /api/
```

**2. Rate limiting :**
```python
import time

for url in urls:
    reponse = requests.get(url, timeout=10)
    time.sleep(2)   # Attendre 2 secondes entre chaque requête
```

**3. User-Agent :**
```python
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
```

> "Soyez respectueux : ne surchargez pas les serveurs, respectez `robots.txt`, identifiez-vous avec un User-Agent, et ne scrapper que ce qui est légalement autorisé."

---

### 14:00 — Conclusion
> "Module 34 : on découvre la data science avec Pandas et NumPy."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 33 : Web scraping

Au programme :
00:00 — Introduction
00:30 — Qu'est-ce que le web scraping ?
01:30 — requests : télécharger une page
03:30 — BeautifulSoup : parser le HTML
05:30 — Sélecteurs CSS avec select()
07:00 — Extraire : .text, .get(), .attrs
08:30 — Cas pratique : scraper un site de livres
11:30 — Gérer le JavaScript avec Selenium
13:00 — Bonnes pratiques (robots.txt, rate limiting)
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

#python #formationpython #webscraping #beautifulsoup #selenium #requests #datascraping
```

## Tags YouTube
```
python, formation python, web scraping python, beautifulsoup, selenium python, requests python, scraper site web, apprendre python, cours python, programmation python, python avancé, extraction données
```
