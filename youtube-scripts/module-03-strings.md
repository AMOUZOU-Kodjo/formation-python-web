# Vidéo #3 — Chaînes de caractères

## Informations générales
- **Titre** : Python #3 — Chaînes de caractères (Formation Complète)
- **Durée** : ~15 min
- **Miniature** : `banners/03-chaînes-de-caractères.png`

---

## Script détaillé

### 0:00 — Intro (30s)
**Texte écran :** 🐍 MODULE 3 — CHAÎNES DE CARACTÈRES

> "Bienvenue dans le module 3. Les chaînes de caractères sont partout en Python. Dans cette vidéo, on va voir comment les créer, les manipuler et les transformer."

---

### 0:30 — Création de chaînes (2 min)
**Texte écran :** CRÉER DES CHAÎNES

```python
# Guillemets simples ou doubles
s1 = 'Hello'
s2 = "World"
s3 = """Texte
multi-lignes"""

print(s1, s2)  # Hello World
```

> "Les triples guillemets `\"\"\"` permettent d'écrire sur plusieurs lignes."

**Caractères d'échappement :**
```python
print("Il dit \"Python c'est génial\"")
print("Ligne 1\\nLigne 2")       # \\n = retour à la ligne
print("Colonne 1\\tColonne 2")   # \\t = tabulation
```

---

### 2:30 — Concaténation et répétition (1 min 30)
**Texte écran :** CONCATÉNATION & RÉPÉTITION

```python
# Concaténation
prenom = "Alice"
message = "Bonjour " + prenom + " !"
print(message)

# Répétition
ligne = "=" * 30
print(ligne)   # ==============================

# Concaténation avec d'autres types
age = 25
print("J'ai " + str(age) + " ans")  # str() nécessaire
```

---

### 4:00 — f-strings avancées (2 min)
**Texte écran :** F-STRINGS AVANCÉES

```python
nom = "Alice"
age = 25
taille = 1.68

print(f"Nom : {nom}")
print(f"Âge : {age} ans")
print(f"Taille : {taille:.2f} m")     # 1.68 → 1.68
print(f"Âge en binaire : {age:b}")    # 25 → 11001
print(f"Score : {42:05d}")            # 00042

# Expressions dans les f-strings
print(f"Double : {age * 2}")
print(f"Majuscule : {nom.upper()}")
```

---

### 6:00 — Indexation et slicing (2 min 30)
**Texte écran :** INDEXATION & SLICING

```python
texte = "Python"
# Index :  P y t h o n
#         0 1 2 3 4 5
#        -6-5-4-3-2-1

print(texte[0])    # P
print(texte[-1])   # n
print(texte[0:3])  # Pyt
print(texte[:3])   # Pyt
print(texte[3:])   # hon
print(texte[::2])  # Pto
print(texte[::-1]) # nohtyP
```

**Visuel :** Schéma de la chaîne avec indices positifs et négatifs

---

### 8:30 — Méthodes essentielles (4 min)
**Texte écran :** MÉTHODES DE CHAÎNES

```python
s = "  Hello Python World  "

s.lower()        # "  hello python world  "
s.upper()        # "  HELLO PYTHON WORLD  "
s.strip()        # "Hello Python World"
s.replace("Python", "JavaScript")
s.split()        # ["Hello", "Python", "World"]
"-".join(["a", "b", "c"])  # "a-b-c"
s.startswith("Hello")  # False (espaces)
"42".isdigit()   # True
"abc".isalpha()  # True
```

**Démo en direct :** Montrer chaque méthode une par une

---

### 12:30 — Recherche dans une chaîne (1 min)
**Texte écran :** RECHERCHE

```python
s = "Bonjour tout le monde"

len(s)               # 22
s.count("o")         # 4
s.find("monde")      # 16
"monde" in s         # True
s.index("jour")      # 3
```

---

### 13:30 — Formatage avancé (1 min)
**Texte écran :** FORMATAGE

```python
# Méthode .format()
print("{} × {} = {}".format(3, 4, 12))

# Alignement
print(f"|{'gauche':<10}|")
print(f"|{'droite':>10}|")
print(f"|{'centre':^10}|")
```

---

### 14:30 — Conclusion
> "Module 4 : on attaque les listes et les tuples."

---

## Description YouTube

```
🐍 FORMATION PYTHON COMPLÈTE — Module 3 : Chaînes de caractères

Au programme :
00:00 — Introduction
00:30 — Création de chaînes
02:30 — Concaténation et répétition
04:00 — f-strings avancées
06:00 — Indexation et slicing
08:30 — Méthodes essentielles
12:30 — Recherche dans une chaîne
13:30 — Formatage avancé
14:30 — Prochain module

📚 Formation complète (36 modules) : https://formation-python-web.vercel.app
📄 Cours PDF : https://savoirbox.vercel.app/cours-python

#python #formationpython #strings #slicing #fstrings
```
