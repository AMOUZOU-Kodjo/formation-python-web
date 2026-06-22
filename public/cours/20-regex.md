# Module 20 : Expressions régulières (Regex) — la puissance du filtrage textuel

Les expressions régulières (ou **regex**) sont un langage de description de motifs textuels. Elles permettent de **chercher**, **extraire**, **remplacer** ou **valider** du texte de façon extrêmement puissante.

> **Objectif** : Savoir lire, écrire et utiliser des expressions régulières en Python avec le module `re`.

---

## 1. Premier contact : pourquoi les regex ?

```python
# Sans regex : vérifier si un texte contient un email
texte = "Contactez-nous à contact@example.com ou support@site.fr"

mots = texte.split()
for mot in mots:
    if "@" in mot and "." in mot:
        print(mot)  # → contact@example.com  (mais rate "support@site.fr"?)
```

Avec une regex :

```python
import re

texte = "Contactez-nous à contact@example.com ou support@site.fr"
emails = re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", texte)
print(emails)  # → ['contact@example.com', 'support@site.fr']
```

---

## 2. Les raw strings (chaînes brutes) — pourquoi `r"..."` ?

```python
# En Python, \n dans une chaîne normale = retour à la ligne
print("ligne1\nligne2")
# → ligne1
# → ligne2

# En raw string : r"\n" = les deux caractères \ et n
print(r"ligne1\nligne2")
# → ligne1\nligne2
```

**Pourquoi c'est crucial pour les regex ?**

```python
# Pour chercher un \n dans du texte, il faut écrire \\n dans une chaîne normale
# Mais on doit échapper le \ pour que Python le prenne comme un caractère \

# Sans raw string :
pattern = "\\d{2}/\\d{2}/\\d{4}"
# Avec raw string (recommandé) :
pattern = r"\d{2}/\d{2}/\d{4}"

# La version raw est BEAUCOUP plus lisible !
```

**Règle d'or** : Toujours utiliser `r"..."` pour les motifs regex.

---

## 3. Métacaractères — l'alphabet des regex

```
.         N'importe quel caractère (sauf \n, sauf si flag DOTALL)
\d        Un chiffre (0-9)
\D        Tout sauf un chiffre
\w        Un caractère de "mot" : lettre, chiffre, underscore
\W        Tout sauf un caractère de mot
\s        Un espace : espace, tabulation (\t), retour chariot (\n, \r)
\S        Tout sauf un espace
^         Début de chaîne (ou début de ligne avec MULTILINE)
$         Fin de chaîne (ou fin de ligne avec MULTILINE)
\b        Frontière de mot
\B        Pas une frontière de mot
```

### 3.1 Le point `.` — n'importe quel caractère

```python
import re

pattern = r"c.t"  # c, n'importe quel caractère, t
print(re.findall(pattern, "cat cot cut c t chat"))  
# → ['cat', 'cot', 'cut', 'c t']   (le dernier est "c t" avec un espace)
```

### 3.2 Classes de caractères `[...]`

```python
import re

# Un ensemble de caractères
pattern = r"[cgt]a[tbr]"  # commence par c, g ou t, puis a, puis t, b ou r
print(re.findall(pattern, "cat car cab gat gar tab tar"))
# → ['cat', 'car', 'cab', 'gat', 'gar', 'tar']

# Intervalle
pattern = r"[a-z]"  # n'importe quelle lettre minuscule
print(re.findall(pattern, "Hello123"))
# → ['e', 'l', 'l', 'o']

# Négation
pattern = r"[^0-9]"  # tout sauf les chiffres
print(re.findall(pattern, "ABC123DEF"))
# → ['A', 'B', 'C', 'D', 'E', 'F']
```

---

## 4. Quantifieurs — combien de fois ?

```
*         0 ou plus
+         1 ou plus
?         0 ou 1
{n}       exactement n
{n,}      n ou plus
{n,m}     entre n et m (inclus)
*? / +?   versions "paresseuses" (lazy) — s'arrêtent au plus tôt
```

### 4.1 Quantifieurs gourmands (greedy) vs paresseux (lazy)

```python
import re

texte = "<div>Hello</div><span>World</span>"

# Quantifieur gourmand : *. prend le MAXIMUM possible
pattern_greedy = r"<.*>"
print(re.findall(pattern_greedy, texte))
# → ['<div>Hello</div><span>World</span>']  (tout !)

# Quantifieur paresseux : *? prend le MINIMUM possible
pattern_lazy = r"<.*?>"
print(re.findall(pattern_lazy, texte))
# → ['<div>', '</div>', '<span>', '</span>']

# Même principe avec +?
texte2 = "a123b456c"
print(re.findall(r"a.+b", texte2))    # → ['a123b456b']  (gourmand)
print(re.findall(r"a.+?b", texte2))   # → ['a123b']      (paresseux)
```

**Règle mnémotechnique** : Python est gourmand par défaut. Ajoutez `?` pour le rendre paresseux.

### 4.2 Exemples concrets

```python
import re

# Code postal français : exactement 5 chiffres
pattern = r"\b\d{5}\b"
print(re.findall(pattern, "Paris 75001, Lyon 69002, court 123"))
# → ['75001', '69002']   (123 seul n'est pas 5 chiffres)

# Numéro de téléphone : 0X XX XX XX XX
pattern = r"\b0[1-9]\d{8}\b"
print(re.findall(pattern, "Appelez le 0612345678 ou le 0123456789"))
# → ['0612345678', '0123456789']

# Prix : € ou $ avec chiffres
pattern = r"\$\d+(?:\.\d{2})?"
print(re.findall(pattern, "Coût: $49.99, promo: $5, gratuit"))
# → ['$49.99', '$5']
```

---

## 5. Les fonctions du module `re`

### 5.1 `re.search()` — trouver la première occurrence

```python
import re

texte = "Mon email est alice@example.com et aussi bob@test.org"

match = re.search(r"\w+@\w+\.\w+", texte)
if match:
    print("Trouvé :", match.group())          # → alice@example.com
    print("Position :", match.start(), "-", match.end())  # → 13 30
```

### 5.2 `re.findall()` — toutes les occurrences

```python
import re

texte = "alice@example.com, bob@test.org, charlie@site.fr"
emails = re.findall(r"[\w.%-]+@[\w.-]+\.[a-zA-Z]{2,}", texte)
print(emails)
# → ['alice@example.com', 'bob@test.org', 'charlie@site.fr']
```

### 5.3 `re.match()` — depuis le début de la chaîne

```python
import re

# match() ne cherche qu'AU DÉBUT de la chaîne
print(re.match(r"Bonjour", "Bonjour tout le monde"))  # → match
print(re.match(r"Bonjour", "Dit Bonjour"))            # → None (pas au début)
# Équivalent à re.search(r"^Bonjour", ...)
```

### 5.4 `re.sub()` — substitution

```python
import re

texte = "Mon tel est 0612345678"

# Remplacer par masqué
cache = re.sub(r"\d{4}(\d{4})", "****\\1", texte)
print(cache)  # → Mon tel est ****5678

# Avec fonction de remplacement
def censurer(match):
    return match.group()[:2] + "*" * (len(match.group()) - 2)

texte2 = "Carte: 1234567890123456"
resultat = re.sub(r"\d{16}", censurer, texte2)
print(resultat)  # → Carte: 12**************56
```

### 5.5 `re.split()` — découpage intelligent

```python
import re

# Découper sur plusieurs séparateurs
phrase = "Pomme;Banane,Orange  Fraise|Kiwi"
mots = re.split(r"[;,\s|]+", phrase)
print(mots)  # → ['Pomme', 'Banane', 'Orange', 'Fraise', 'Kiwi']
```

---

## 6. Les groupes — capturer des parties du motif

### 6.1 Groupes capturants

```python
import re

texte = "alice@example.com"

# Les parenthèses créent des groupes
pattern = r"(\w+)@(\w+)\.(\w+)"
match = re.search(pattern, texte)

print(match.group(0))    # → alice@example.com  (tout le match)
print(match.group(1))    # → alice              (1er groupe)
print(match.group(2))    # → example            (2e groupe)
print(match.group(3))    # → com                (3e groupe)
print(match.groups())    # → ('alice', 'example', 'com')
```

### 6.2 Groupes nommés `(?P<nom>...)`

```python
import re

pattern = r"(?P<utilisateur>\w+)@(?P<domaine>\w+)\.(?P<tld>\w+)"
match = re.search(pattern, "bob@site.fr")

print(match.group("utilisateur"))  # → bob
print(match.group("domaine"))      # → site
print(match.group("tld"))          # → fr
```

### 6.3 Groupes non-capturants `(?:...)`

```python
import re

# Sans groupe non-capturant : les parenthèses créent un groupe
pattern = r"(?:Mr|Mme|Mlle)\. (\w+)"
match = re.search(pattern, "Mme. Dupont")
print(match.group(0))    # → Mme. Dupont
print(match.group(1))    # → Dupont (le (?:...) n'a pas capturé)

# Utile pour les alternatives sans vouloir capturer
```

---

## 7. Les flags (drapeaux)

```python
import re

texte = """Ligne 1: Hello
Ligne 2: hello
Ligne 3: WORLD"""

# re.IGNORECASE (ou re.I) : ignore la casse
print(re.findall(r"hello", texte, re.IGNORECASE))
# → ['Hello', 'hello']

# re.MULTILINE (ou re.M) : ^ et $ deviennent début/fin de ligne
print(re.findall(r"^Ligne", texte))
# → ['Ligne']  (seulement la 1ère ligne)
print(re.findall(r"^Ligne", texte, re.MULTILINE))
# → ['Ligne', 'Ligne', 'Ligne']

# re.DOTALL (ou re.S) : le point . inclut \n
print(re.findall(r"Ligne.*", texte))
# → ['Ligne 1: Hello']  (s'arrête au \n)
print(re.findall(r"Ligne.*", texte, re.DOTALL))
# → ['Ligne 1: Hello\nLigne 2: hello\nLigne 3: WORLD']

# Combiner plusieurs flags avec |
print(re.findall(r"^ligne.*(?:hello|world)", texte, re.I | re.M))
# → ['Ligne 1: Hello', 'Ligne 2: hello', 'Ligne 3: WORLD']
```

---

## 8. Lookahead et Lookbehind — des assertions sans consommer

Les **lookarounds** vérifient une condition sans inclure le caractère dans le résultat.

```
(?=...)   Lookahead positif   : suivi de ...
(?!...)   Lookahead négatif    : PAS suivi de ...
(?<=...)  Lookbehind positif   : précédé de ...
(?<!...)  Lookbehind négatif   : PAS précédé de ...
```

```python
import re

# Lookahead positif : un chiffre suivi de "€"
prix = re.findall(r"\d+(?=€)", "Pomme: 3€, Banane: 2€, Pain: 1.5€")
print(prix)  # → ['3', '2', '1']   (on ne récupère que les chiffres)

# Lookahead négatif : "Java" pas suivi de "Script"
mots = re.findall(r"\b\w+(?=Script\b)", "Java JavaScript TypeScript")
print(mots)  # → ['Java', 'Type']   (JavaScript a été sauté)

# Lookbehind positif : prix précédé de "€"
euros = re.findall(r"(?<=€)\d+", "Produit €50, autre €30")
print(euros)  # → ['50', '30']

# Lookbehind négatif : mot précédé d'un point final
mots = re.findall(r"(?<!\.)\b\w+\b", "Fin. Ceci est un test.")
print(mots)  # → ['Ceci', 'est', 'un', 'test']  ("Fin" exclu car après .)
```

**Cas pratique** : extraire les mots d'un tweet sans les hashtags

```python
import re

tweet = "Super journée ! #Vacances à #Plage avec @Alice"
mots = re.findall(r"\b\w+(?<![#@])\b", tweet)
# Note : pour les cas réels, préférez : \b\w+\b(?![\w#@])
```

> **Piège** : Les lookbehinds doivent être de taille fixe. `(?<=\d+)` est invalide ; utilisez `(?<=\d)` ou un pattern sans quantifieur.

---

## 9. Construction pas à pas : validation d'email

Construisons une regex de validation d'email progressive :

```python
import re

# Étape 1 : motif ultra-simple (rate beaucoup de cas)
email = r"\w+@\w+\.\w+"
tests = ["a@b.co", "user@domain.com", "user.name+tag@domain.co.uk", "bad@"]
print([t for t in tests if re.fullmatch(email, t)])
# → ['a@b.co', 'user@domain.com']  (rate les emails avec +, . et .uk)

# Étape 2 : meilleure partie locale
email = r"[a-zA-Z0-9._%+-]+@\w+\.\w+"
tests = ["user.name+tag@domain.com"]
print(re.fullmatch(email, tests[0]))  # → match

# Étape 3 : domaine avec sous-domaines
email = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
tests = ["user@sub.domain.co.uk", "user@domain.com"]
for t in tests:
    print(t, "→", bool(re.fullmatch(email, t)))
# → user@sub.domain.co.uk → True
# → user@domain.com → True

# Étape 4 : version fullmatch (doit correspondre à l'ENTIÈRE chaîne)
def valider_email(email_str):
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return bool(re.match(pattern, email_str))

exemples = [
    "alice@example.com",    # valide
    "bob@site.fr",          # valide
    "user@sub.domain.co.uk", # valide
    "user+tag@domain.org",  # valide
    "@example.com",         # invalide
    "alice@.com",           # invalide
    "alice@com",            # invalide
    "alice@exa mple.com",   # invalide (espace)
]
for e in exemples:
    print(f"  {e:30s} → {'✓' if valider_email(e) else '✗'}")

# → alice@example.com              → ✓
# → bob@site.fr                    → ✓
# → user@sub.domain.co.uk          → ✓
# → user+tag@domain.org            → ✓
# → @example.com                   → ✗
# → alice@.com                     → ✗
# → alice@com                      → ✗
# → alice@exa mple.com             → ✗
```

---

## 10. Pièges courants et bonnes pratiques

### 10.1 `re.match` vs `re.search`

```python
import re

texte = "Contact : email@example.com"

# re.match : commence au début
print(re.match(r"\w+@\w+\.\w+", texte))  # → None  (car commence par "Contact")

# re.search : cherche partout
print(re.search(r"\w+@\w+\.\w+", texte))  # → match sur email@example.com

# re.fullmatch : la chaîne ENTIÈRE doit correspondre
print(re.fullmatch(r"email@example\.com", "email@example.com"))  # → match
print(re.fullmatch(r"\w+@\w+\.\w+", "email@example.com extra"))  # → None
```

### 10.2 Oublier d'échapper le point `.`

```python
import re

# SANS échappement : . = n'importe quel caractère
print(re.findall(r"exemple.com", "exempleXcom"))  # → ['exempleXcom']
print(re.findall(r"exemple.com", "exemple.com"))  # → ['exemple.com']

# AVEC échappement : \. = point littéral
print(re.findall(r"exemple\.com", "exempleXcom"))  # → []
print(re.findall(r"exemple\.com", "exemple.com"))  # → ['exemple.com']
```

### 10.3 Les regex gourmandes

```python
import re

# Problème classique : extraire des balises HTML
html = "<b>Important</b> et <i>italique</i>"

# Gourmand (incorrect)
print(re.findall(r"<b>.*</b>", html))
# → ['<b>Important</b> et <i>italique</i>']  (trop de texte)

# Paresseux (correct)
print(re.findall(r"<b>.*?</b>", html))
# → ['<b>Important</b>']  (juste ce qu'il faut)
```

### 10.4 Utiliser `fullmatch` pour la validation

Pour valider qu'une chaîne entière correspond (pas seulement une partie), utilisez `re.fullmatch()` ou ancrez avec `^...$`.

---

## Résumé des fonctions `re`

| Fonction | Description | Retour |
|----------|-------------|--------|
| `search(p, texte)` | Première occurrence | Match ou None |
| `findall(p, texte)` | Toutes les occurrences | Liste de chaînes |
| `match(p, texte)` | Depuis le début | Match ou None |
| `fullmatch(p, texte)` | Chaîne entière | Match ou None |
| `sub(p, repl, texte)` | Remplacement | Chaîne modifiée |
| `split(p, texte)` | Découpage | Liste |
| `finditer(p, texte)` | Itérateur de Match | Match objects |

```python
# Aide-mémoire visuel
pattern = re.compile(r"\d{2}/\d{2}/\d{4}")
m = pattern.search("Date: 15/01/2024")
if m:
    print(m.group(), m.start(), m.end())  # → 15/01/2024 6 16
```

---

## Exercices

1. **Valider un numéro de téléphone français** : `0X XX XX XX XX` (10 chiffres, soit avec espaces soit sans).
2. **Extraire toutes les URLs** d'un texte (`https://...` ou `http://...`).
3. **Masquer les emails** : Remplacer `alice@example.com` par `a***@example.com`.
4. **Analyseur de logs** : Depuis une ligne de log comme `2026-06-22 14:30:45 ERROR: Échec de connexion`, extraire date, niveau et message avec des groupes nommés.
5. **Valider un mot de passe fort** : 8+ caractères, au moins 1 chiffre, 1 minuscule, 1 majuscule, 1 caractère spécial.
