# Module 33 : Web Scraping

## Objectifs pédagogiques

À la fin de ce module, vous serez capable de :
- Comprendre les bases légales et éthiques du web scraping
- Utiliser `requests` pour récupérer le contenu de pages web
- Extraire des données avec BeautifulSoup et les sélecteurs CSS
- Gérer la pagination pour récupérer plusieurs pages
- Utiliser Selenium pour les sites dynamiques (JavaScript)
- Mettre en place des stratégies anti-blocage (headers, proxies, rotation)
- Effectuer du scraping asynchrone pour des performances accrues

---

## 1. Légalité et éthique

### Avant de commencer, posez-vous ces questions :

1. **Le site autorise-t-il le scraping ?** Consultez `robots.txt` : `https://example.com/robots.txt`
2. **Les CGU l'interdisent-elles ?** Certains sites interdisent explicitement le scraping.
3. **Respectez-vous le serveur ?** Trop de requêtes = déni de service involontaire.
4. **Utilisez-vous les données légalement ?** Données personnelles → RGPD.

### Lire un fichier robots.txt

Le fichier `robots.txt` indique ce qui est autorisé ou non aux robots :

```
User-agent: *
Disallow: /admin/
Disallow: /api/
Allow: /public/

User-agent: Googlebot
Disallow: /private/
```

- `User-agent: *` : concerne tous les robots
- `Disallow: /admin/` : interdit l'accès à `/admin/`
- `Allow: /public/` : autorise l'accès à `/public/`

> **À retenir** : `robots.txt` est une convention, pas une loi. Mais son non-respect peut être utilisé contre vous devant un tribunal.

### Règles d'or du scraping éthique

1. **Politesse** : au moins 1 seconde entre chaque requête
2. **Identification** : utiliser un User-Agent qui vous identifie
3. **Limitation** : ne pas scraper plus vite qu'un humain
4. **Respect** : si le site demande de stopper, arrêtez-vous
5. **Utilité** : ne scrapez que ce dont vous avez besoin

---

## 2. Installation et premier scraping avec requests + BeautifulSoup

### Installation

```bash
pip install requests beautifulsoup4 lxml
```

- **requests** : bibliothèque HTTP simple pour récupérer des pages
- **beautifulsoup4** : parseur HTML/XML
- **lxml** : parseur plus rapide que "html.parser" (optionnel mais recommandé)

### Premier exemple : récupérer le titre d'une page

```python
import requests
from bs4 import BeautifulSoup

# 1. Récupérer la page HTML
url = "https://example.com"
response = requests.get(url)

# Vérifier que la requête a réussi
print(f"Statut : {response.status_code}")  # → 200

# 2. Parser le HTML
soup = BeautifulSoup(response.text, "html.parser")

# 3. Extraire des informations
print(soup.title)         # → <title>Example Domain</title>
print(soup.title.text)    # → Example Domain
```

**Explication :**
- `requests.get(url)` : envoie une requête HTTP GET et retourne un objet `Response`
- `response.status_code` : code HTTP (200 = OK, 404 = introuvable, 403 = interdit)
- `response.text` : le contenu HTML de la page (sous forme de chaîne)
- `BeautifulSoup(html, "html.parser")` : crée un arbre HTML navigable
- `soup.title` : accède à la balise `<title>`

### Méthodes de recherche de base

Supposons cette page HTML :

```html
<html>
  <body>
    <h1 id="main-title" class="title">Bienvenue</h1>
    <div class="article">
      <h2>Article 1</h2>
      <p class="content">Contenu du premier article</p>
      <a href="/article/1">Lire</a>
    </div>
    <div class="article">
      <h2>Article 2</h2>
      <p class="content">Contenu du second article</p>
      <a href="/article/2">Lire</a>
    </div>
  </body>
</html>
```

```python
# Par balise
soup.find("h1")               # → <h1>Bienvenue</h1>
soup.find_all("div")           # → tous les <div>

# Par attribut
soup.find(id="main-title")    # → <h1 id="main-title">Bienvenue</h1>
soup.find(class_="article")   # → premier div class="article"

# Par texte
soup.find("h2", string="Article 1")  # → <h2>Article 1</h2>
```

### Sélecteurs CSS (méthode .select())

Les sélecteurs CSS sont plus puissants et lisibles :

```python
# Sélecteurs CSS de base
soup.select("div")                  # tous les <div>
soup.select(".article")             # class="article"
soup.select("#main-title")          # id="main-title"
soup.select("div.article")          # <div class="article">
soup.select("h2, h1")              # h2 ou h1
soup.select("div p")               # <p> à l'intérieur d'un <div>

# Sélecteurs CSS avancés
soup.select("div.article:first-child")      # premier élément
soup.select("div:not(.article)")            # tous les div sauf .article
soup.select("a[href]")                      # liens avec attribut href
soup.select("[data-id]")                    # éléments avec data-id
soup.select('a[href*="/article/"]')         # lien contenant "/article/"
soup.select('a[href^="https://"]')          # lien commençant par https://
soup.select('a[href$=".pdf"]')              # lien se terminant par .pdf
```

**Différence entre `find`/`find_all` et `select` :**

| Méthode | Syntaxe | Usage |
|---------|---------|-------|
| `find("div")` | Simple | Un seul élément |
| `find_all("div")` | Simple | Tous les éléments |
| `select("div.article p")` | CSS | Navigation hiérarchique complexe |

### Extraire le texte et les attributs

```python
for article in soup.select("div.article"):
    # Texte à l'intérieur d'une balise
    titre = article.find("h2").text        # "Article 1"
    
    # Attribut d'une balise
    lien = article.find("a")["href"]       # "/article/1"
    
    # .text vs .get_text()
    contenu = article.find("p").get_text(strip=True)  # "Contenu du premier article"
    # strip=True enlève les espaces inutiles
    
    # get() pour attribut optionnel (évite KeyError)
    data_id = article.get("data-id", "pas d'ID")
    
    print(f"{titre} → {lien}")
```

> **Piège courant** : `.text` sur un élément qui n'existe pas donne une erreur `AttributeError`. Vérifiez toujours :
> ```python
> titre_tag = article.find("h2")
> if titre_tag:
>     print(titre_tag.text)
> ```

---

## 3. Extraction de tableaux HTML

Les tableaux sont très courants dans les pages web. Voici comment les extraire proprement :

```python
# Supposons un tableau HTML comme celui-ci :
# <table id="prices">
#   <thead><tr><th>Produit</th><th>Prix</th><th>Stock</th></tr></thead>
#   <tbody>
#     <tr><td>Ordinateur</td><td>999€</td><td>Oui</td></tr>
#     <tr><td>Clavier</td><td>49€</td><td>Oui</td></tr>
#   </tbody>
# </table>

def extraire_tableau(soup, table_id):
    """Extrait un tableau HTML en liste de dictionnaires."""
    table = soup.find("table", id=table_id)
    if not table:
        return []
    
    # En-têtes
    en_tetes = []
    for th in table.select("thead th"):
        en_tetes.append(th.text.strip())
    
    # Données
    resultats = []
    for tr in table.select("tbody tr"):
        row = {}
        for i, td in enumerate(tr.find_all("td")):
            if i < len(en_tetes):
                row[en_tetes[i]] = td.text.strip()
        resultats.append(row)
    
    return resultats

# Utilisation
donnees = extraire_tableau(soup, "prices")
print(donnees)
# → [
#     {"Produit": "Ordinateur", "Prix": "999€", "Stock": "Oui"},
#     {"Produit": "Clavier", "Prix": "49€", "Stock": "Oui"}
#   ]
```

### Version avec pandas (pour export facile)

```python
import pandas as pd

def tableau_to_dataframe(soup, table_id):
    """Extrait un tableau HTML directement en DataFrame pandas."""
    table = soup.find("table", id=table_id)
    if not table:
        return pd.DataFrame()
    
    # pandas peut aussi le faire directement via read_html
    # mais nous utilisons notre logique pour la flexibilité
    
    headers = [th.text.strip() for th in table.select("thead th")]
    
    rows = []
    for tr in table.select("tbody tr"):
        rows.append([td.text.strip() for td in tr.find_all("td")])
    
    return pd.DataFrame(rows, columns=headers)

df = tableau_to_dataframe(soup, "prices")
print(df)
print(df.to_csv("produits.csv", index=False))
```

---

## 4. Gestion de la pagination

La plupart des sites listent les données sur plusieurs pages. Il faut naviguer de page en page.

### Pagination par paramètre d'URL

```python
import time

def scraper_pages_parametre(url_base, page_debut=1, page_fin=5):
    """Scrape plusieurs pages où le numéro est dans l'URL : /?page=N"""
    toutes_les_donnees = []
    
    for page in range(page_debut, page_fin + 1):
        url = f"{url_base}?page={page}"
        print(f"Scraping page {page}...")
        
        response = requests.get(url)
        if response.status_code != 200:
            print(f"Page {page} inaccessible, arrêt.")
            break
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Extraire les données de la page courante
        for element in soup.select("div.item"):
            toutes_les_donnees.append({
                "titre": element.find("h2").text.strip(),
                "lien": element.find("a")["href"],
            })
        
        # Politesse : attendre entre les requêtes
        time.sleep(1)
    
    return toutes_les_donnees

donnees = scraper_pages_parametre("https://site.com/produits", 1, 10)
print(f"Total : {len(donnees)} éléments récupérés")
```

### Pagination par bouton "Suivant"

```python
def scraper_pages_suivant(url_depart):
    """Scrape toutes les pages en suivant le lien 'Suivant'."""
    donnees = []
    url_courante = url_depart
    
    while url_courante:
        print(f"Scraping : {url_courante}")
        
        response = requests.get(url_courante)
        if response.status_code != 200:
            break
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Extraire les données
        for el in soup.select("div.item"):
            donnees.append(el.text.strip())
        
        # Trouver le lien "Suivant"
        suivant = soup.select_one("a.next, a.suivant, a:contains('Suivant')")
        if suivant and suivant.get("href"):
            url_courante = suivant["href"]
            # Gérer les URLs relatives
            if url_courante.startswith("/"):
                from urllib.parse import urljoin
                url_courante = urljoin(url_depart, url_courante)
            time.sleep(1)
        else:
            url_courante = None  # Fin de la pagination
    
    return donnees
```

### Pagination infinie (scroll)

Pour les sites à chargement infini, on utilise Selenium (voir section 6) ou on intercepte les appels AJAX.

---

## 5. Stratégies anti-blocage

### 1. User-Agent réaliste

```python
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.6,en;q=0.4",
}
response = requests.get(url, headers=headers)
```

### 2. Délais aléatoires

```python
import random
import time

# Attendre entre 1 et 3 secondes (comportement humain)
time.sleep(random.uniform(1, 3))
```

### 3. Rotation de User-Agents

```python
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ... Chrome/120.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ... Safari/605.1",
    "Mozilla/5.0 (X11; Linux x86_64) ... Firefox/121.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ... Edge/120.0",
]

def get_random_headers():
    return {"User-Agent": random.choice(USER_AGENTS)}
```

### 4. Proxies

```python
proxies = {
    "http": "http://user:pass@proxy.example.com:8080",
    "https": "http://user:pass@proxy.example.com:8080",
}
response = requests.get(url, proxies=proxies, headers=headers)
```

### 5. Sessions (cookies, connexion)

```python
session = requests.Session()

# Connexion si nécessaire
session.post("https://site.com/login", data={"user": "moi", "pass": "mdp"})

# Les cookies sont automatiquement conservés
response = session.get("https://site.com/page_protegee")
```

### 6. Gérer les erreurs avec retry

```python
from time import sleep

def requete_avec_retry(url, max_essais=3, timeout=10):
    """Tente une requête avec réessai en cas d'échec."""
    for essai in range(max_essais):
        try:
            response = requests.get(url, timeout=timeout, headers=get_random_headers())
            if response.status_code == 200:
                return response
            elif response.status_code == 429:  # Too Many Requests
                wait = int(response.headers.get("Retry-After", 5))
                print(f"Rate limité, attente {wait}s...")
                sleep(wait)
            else:
                print(f"Erreur {response.status_code}, essai {essai + 1}")
                sleep(2 ** essai)  # backoff exponentiel
        except requests.Timeout:
            print(f"Timeout, essai {essai + 1}/{max_essais}")
            sleep(2 ** essai)
        except requests.RequestException as e:
            print(f"Erreur réseau : {e}")
            sleep(2 ** essai)
    
    return None
```

---

## 6. Selenium pour les sites dynamiques (JavaScript)

Certains sites chargent leur contenu via JavaScript après le chargement initial. `requests` ne peut pas exécuter JavaScript ; Selenium utilise un vrai navigateur.

### Installation

```bash
pip install selenium
```

Téléchargez aussi [ChromeDriver](https://chromedriver.chromium.org/) (ou utilisez `webdriver-manager`) :

```bash
pip install webdriver-manager
```

### Premier exemple Selenium

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Configuration
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # mode invisible (pas de fenêtre)
options.add_argument("--no-sandbox")

# Lancer le navigateur
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)

driver.get("https://example.com")

# Attendre que la page soit chargée
driver.implicitly_wait(5)  # attend jusqu'à 5s pour chaque élément

# Trouver des éléments
titre = driver.find_element(By.TAG_NAME, "h1")
print(titre.text)

# Attendre explicitement un élément
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CLASS_NAME, "dynamic-content"))
)
print(element.text)

driver.quit()
```

### Sélecteurs Selenium

```python
# Les différentes méthodes de localisation
driver.find_element(By.ID, "mon-id")
driver.find_element(By.CLASS_NAME, "ma-classe")
driver.find_element(By.TAG_NAME, "h1")
driver.find_element(By.NAME, "email")
driver.find_element(By.CSS_SELECTOR, "div.article a")
driver.find_element(By.XPATH, "//div[@class='article']//h2")

# Plusieurs éléments
elements = driver.find_elements(By.CLASS_NAME, "item")
for el in elements:
    print(el.text)
```

### Interactions clavier et clics

```python
# Saisir du texte
input_email = driver.find_element(By.NAME, "email")
input_email.send_keys("mon@email.com")

# Cliquer sur un bouton
bouton = driver.find_element(By.ID, "submit")
bouton.click()

# Récupérer le texte après une action JS
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

resultat = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.ID, "result"))
)
print(resultat.text)
```

### Gérer le scroll infini

```python
def scraper_scroll_infini(driver, max_scrolls=20):
    """Scrolle jusqu'en bas pour charger tout le contenu."""
    for i in range(max_scrolls):
        # Scroller en bas de page
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(random.uniform(1, 3))
        
        # Vérifier si plus de contenu se charge
        nouveau_contenu = driver.find_elements(By.CLASS_NAME, "item")
        print(f"Scroll {i + 1}: {len(nouveau_contenu)} éléments")
        
        # ... extraction des données
```

---

## 7. Scraping asynchrone avec aiohttp et asyncio

Pour scraper plusieurs pages simultanément (attention : être encore plus poli).

```bash
pip install aiohttp asyncio beautifulsoup4
```

```python
import asyncio
import aiohttp
from bs4 import BeautifulSoup

async def scraper_url(session, url):
    """Scrape une seule URL de manière asynchrone."""
    try:
        async with session.get(url) as response:
            if response.status != 200:
                return None
            html = await response.text()
            soup = BeautifulSoup(html, "html.parser")
            
            # Traitement...
            titre = soup.title.text if soup.title else "Pas de titre"
            return {"url": url, "titre": titre}
    except Exception as e:
        print(f"Erreur sur {url}: {e}")
        return None

async def scraper_multiples(urls):
    """Scrape plusieurs URLs en parallèle avec un délai entre chaque."""
    conn = aiohttp.TCPConnector(limit_per_host=3)  # max 3 connexions simultanées par hôte
    async with aiohttp.ClientSession(connector=conn) as session:
        taches = []
        for url in urls:
            taches.append(scraper_url(session, url))
            await asyncio.sleep(0.5)  # délai entre l'envoi de chaque requête
        
        resultats = await asyncio.gather(*taches)
        return [r for r in resultats if r is not None]

# Utilisation
urls = [f"https://site.com/page/{i}" for i in range(1, 21)]
resultats = asyncio.run(scraper_multiples(urls))
print(f"{len(resultats)} pages scrapées en parallèle")
```

---

## 8. Projet complet : scraper d'articles d'actualités

Mettons tout ensemble dans un projet structuré :

```python
# scraper_actualites.py
import time
import json
import random
from pathlib import Path
import requests
from bs4 import BeautifulSoup
from dataclasses import dataclass, asdict

@dataclass
class Article:
    titre: str
    url: str
    date: str
    resume: str
    source: str

class ScraperActualites:
    def __init__(self, source_url, headers=None, delai_min=1, delai_max=3):
        self.source_url = source_url
        self.headers = headers or {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ..."
        }
        self.delai_min = delai_min
        self.delai_max = delai_max
        self.articles = []
    
    def get_soup(self, url):
        """Récupère et parse une page."""
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            return BeautifulSoup(response.text, "html.parser")
        except requests.RequestException as e:
            print(f"Erreur sur {url}: {e}")
            return None
    
    def extraire_articles_page(self, url):
        """Extrait les articles d'une page."""
        soup = self.get_soup(url)
        if not soup:
            return []
        
        articles_page = []
        for article_tag in soup.select("article"):
            titre_tag = article_tag.select_one("h2 a, h3 a")
            if not titre_tag:
                continue
            
            article = Article(
                titre=titre_tag.text.strip(),
                url=titre_tag["href"],
                date=article_tag.select_one("time")["datetime"] if article_tag.select_one("time") else "",
                resume=article_tag.select_one("p.resume, p.description").text.strip()
                    if article_tag.select_one("p.resume, p.description") else "",
                source=self.source_url
            )
            articles_page.append(article)
        
        return articles_page
    
    def scraper(self, pages=5):
        """Scrape plusieurs pages."""
        for page in range(1, pages + 1):
            url = f"{self.source_url}?page={page}"
            print(f"Scraping page {page}...")
            
            articles = self.extraire_articles_page(url)
            self.articles.extend(articles)
            
            delai = random.uniform(self.delai_min, self.delai_max)
            time.sleep(delai)
        
        return self.articles
    
    def exporter_json(self, fichier="articles.json"):
        """Exporte les articles en JSON."""
        with open(fichier, "w", encoding="utf-8") as f:
            json.dump([asdict(a) for a in self.articles], f, ensure_ascii=False, indent=2)
        print(f"Exporté {len(self.articles)} articles vers {fichier}")

# Utilisation
scraper = ScraperActualites(
    source_url="https://example.com/actualites",
    delai_min=1,
    delai_max=3
)
articles = scraper.scraper(pages=3)
scraper.exporter_json()
```

---

## Résumé du module

- **Légalité** : toujours vérifier `robots.txt` et les CGU
- **Requests** : récupère le HTML brut (pas de JS)
- **BeautifulSoup** : parse et navigue dans le HTML
- **Sélecteurs CSS** : `select()` pour des sélections complexes
- **Pagination** : boucle sur les pages ou suit le lien "Suivant"
- **Anti-blocage** : User-Agent, délais aléatoires, proxies, rotation
- **Selenium** : nécessaire pour les sites JavaScript
- **Async** : `aiohttp` pour des performances accrues (avec prudence)

---

## Exercices

### Exercice 1 : Scraper une liste de livres
- Scraper https://books.toscrape.com (site d'entraînement)
- Extraire : titre, prix, disponibilité, note
- Gérer la pagination (50 livres par page, plusieurs pages)
- Exporter en CSV

### Exercice 2 : Scraper avec protection
- Ajouter :
  - User-Agent aléatoire
  - Délai aléatoire entre 0.5 et 2 secondes
  - Gestion des timeouts
  - Retry si 429 ou 503
- Logger chaque requête (timestamp, URL, statut)

### Exercice 3 : Selenium — connexion et données
- Créer un compte sur un site de démo
- Se connecter avec Selenium
- Aller sur une page "Mon compte"
- Extraire les informations
- Déconnecter

### Exercice 4 : Scraper asynchrone
- Scraper 10 pages simultanément avec `aiohttp`
- Limiter à 3 connexions simultanées par hôte
- Comparer le temps d'exécution avec la version synchrone
- Documenter la différence de performance
