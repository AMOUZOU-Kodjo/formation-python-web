"""Generate a video presentation PowerPoint for a given module."""

import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

BLUE = RGBColor(0x30, 0x69, 0x98)
GOLD = RGBColor(0xFF, 0xE8, 0x73)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
DARK = RGBColor(0x1E, 0x1E, 0x1E)
GRAY = RGBColor(0x66, 0x66, 0x66)
GREEN = RGBColor(0x4C, 0xAF, 0x50)

MODULES = {
  "02-variables-types": {
    "num": "02", "title": "Variables, types et opérateurs", "part": 1,
    "color": "#4CAF50",
    "slides": [
      ("Les variables", [
        "Une variable stocke une valeur sous un nom",
        "Python déduit le type automatiquement",
        "Snake_case : prenom, age_utilisateur, total_score",
      ], [
        ("Déclaration", "prenom = \"Alice\"\nage = 25\ntaille = 1.68\nest_etudiant = True"),
        ("Conventions", "# OK\nnom = \"Bob\"\nnom_utilisateur = \"Bob\"\n\n# PAS OK\n2nom = \"Bob\"\nnom-utilisateur = \"Bob\"\nmon.nom = \"Bob\""),
      ]),
      ("Types fondamentaux", [
        "4 types de base en Python",
        "Utilisez type() pour connaître le type",
      ], [
        ("int", "age = 25\ntype(age)  # <class 'int'>"),
        ("float", "pi = 3.14\ntype(pi)  # <class 'float'>"),
        ("str", "nom = \"Alice\"\ntype(nom)  # <class 'str'>"),
        ("bool", "actif = True\ntype(actif)  # <class 'bool'>"),
      ]),
      ("Conversion de types", [
        "input() retourne toujours une str",
        "Convertir avec int(), float(), str(), bool()",
      ], [
        ("Attention !", "age = input(\"Âge ? \")  # str\nage + 1  # ERREUR !"),
        ("Solution", "age = int(input(\"Âge ? \"))\nage + 1  # OK"),
      ]),
      ("Opérateurs arithmétiques", [
        "+, -, *, /, //, %, **",
        "// = division entière, % = modulo",
      ], [
        ("Exemples", "print(10 / 3)   # 3.333...\nprint(10 // 3)  # 3\nprint(10 % 3)   # 1\nprint(2 ** 8)   # 256"),
      ]),
      ("Opérateurs de comparaison", [
        "==, !=, >, <, >=, <=",
        "Résultat toujours booléen (True/False)",
      ], [
        ("Exemples", "print(10 > 5)    # True\nprint(10 == 5)   # False\nprint(10 != 5)   # True\nprint(10 >= 10)  # True"),
      ]),
      ("Opérateurs logiques", [
        "and, or, not",
        "Composer des conditions complexes",
      ], [
        ("Exemples", "age = 20\npermis = True\n\nprint(age >= 18 and permis)  # True\nprint(not age >= 18)        # False"),
      ]),
    ]
  },
  "03-strings": {
    "num": "03", "title": "Chaînes de caractères", "part": 1,
    "color": "#4CAF50",
    "slides": [
      ("Création de chaînes", [
        "Guillemets simples '...' ou doubles \"...\"",
        "Triples guillemets pour texte multi-lignes",
        "Caractères d'échappement : \\n, \\t, \\\\, \\\"",
      ], [
        ("Exemples", "s1 = 'Hello'\ns2 = \"World\"\ns3 = \"\"\"Texte\nmulti-lignes\"\"\""),
        ("Échappement", "print(\"Ligne 1\\nLigne 2\")\nprint(\"Colonne1\\tColonne2\")\nprint(\"Il dit \\\"Python\\\"\")"),
      ]),
      ("Concaténation et répétition", [
        "+ pour concaténer (assembler)",
        "* pour répéter",
        "str() nécessaire pour concaténer avec du texte",
      ], [
        ("Concaténation", "prenom = \"Alice\"\nmessage = \"Bonjour \" + prenom + \" !\""),
        ("Répétition", "ligne = \"=\" * 30\nprint(ligne)\n# =============================="),
      ]),
      ("f-strings avancées", [
        "Insérer des expressions dans {}",
        "Formatage numérique : :.2f, :b, :05d",
      ], [
        ("Formatage", "nom = \"Alice\"\nage = 25\nprint(f\"Nom : {nom}\")\nprint(f\"Âge : {age}\")"),
        ("Options", "pi = 3.14159\nprint(f\"{pi:.2f}\")   # 3.14\nprint(f\"{42:05d}\")  # 00042\nprint(f\"{255:b}\")    # 11111111"),
      ]),
      ("Indexation et slicing", [
        "Accès par index : texte[0], texte[-1]",
        "Slicing : texte[début:fin:pas]",
        "texte[::-1] inverse la chaîne",
      ], [
        ("Indexation", "s = \"Python\"\nprint(s[0])    # P\nprint(s[-1])   # n"),
        ("Slicing", "print(s[0:3])  # Pyt\nprint(s[:3])   # Pyt\nprint(s[3:])   # hon\nprint(s[::-1]) # nohtyP"),
      ]),
      ("Méthodes essentielles", [
        "upper(), lower(), strip()",
        "replace(), split(), join()",
        "startswith(), endswith(), isdigit()",
      ], [
        ("Nettoyage", "s = \"  Hello World  \"\nprint(s.strip())      # \"Hello World\"\nprint(s.lower())      # \"  hello world  \""),
        ("Découpage", "print(s.split())      # [\"Hello\", \"World\"]\nprint(\"-\".join([\"a\",\"b\"]))  # \"a-b\""),
        ("Vérification", "\"42\".isdigit()   # True\n\"abc\".isalpha()  # True\n\"abc123\".isalnum()  # True"),
      ]),
    ]
  }
}

def hex_to_rgb(h):
  h = h.lstrip('#')
  return RGBColor(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))

def make_presentation(mod_id):
  mod = MODULES[mod_id]
  prs = Presentation()
  prs.slide_width = Inches(13.333)
  prs.slide_height = Inches(7.5)
  color = hex_to_rgb(mod["color"])

  def add_shape(slide, l, t, w, h, c):
    shape = slide.shapes.add_shape(1, l, t, w, h)
    shape.fill.solid()
    shape.fill.fore_color.rgb = c
    shape.line.fill.background()

  def add_text(slide, l, t, w, h, text, size=18, bold=False, color=DARK, align=PP_ALIGN.LEFT):
    box = slide.shapes.add_textbox(l, t, w, h)
    box.text_frame.word_wrap = True
    p = box.text_frame.paragraphs[0]
    p.text = text
    p.font.size = Pt(size)
    p.font.bold = bold
    p.font.color.rgb = color
    p.font.name = "Calibri"
    p.alignment = align

  def add_code(slide, l, t, w, h, code, size=14):
    box = slide.shapes.add_textbox(l, t, w, h)
    box.text_frame.word_wrap = True
    p = box.text_frame.paragraphs[0]
    p.text = code
    p.font.size = Pt(size)
    p.font.name = "Consolas"
    p.font.color.rgb = DARK
    p.alignment = PP_ALIGN.LEFT

  def add_bullet_list(slide, l, t, w, h, items, size=18):
    box = slide.shapes.add_textbox(l, t, w, h)
    box.text_frame.word_wrap = True
    for i, item in enumerate(items):
      if i == 0:
        p = box.text_frame.paragraphs[0]
      else:
        p = box.text_frame.add_paragraph()
      p.text = f"  {item}"
      p.font.size = Pt(size)
      p.font.color.rgb = DARK
      p.font.name = "Calibri"
      p.space_after = Pt(6)

  # ---- Title Slide ----
  slide = prs.slides.add_slide(prs.slide_layouts[6])
  add_shape(slide, Inches(0), Inches(3.2), Inches(13.333), Inches(0.08), GOLD)
  add_text(slide, Inches(1), Inches(0.8), Inches(11), Inches(1),
           f"Module {mod['num']}", 22, False, GRAY, PP_ALIGN.CENTER)
  add_text(slide, Inches(1), Inches(1.8), Inches(11), Inches(1.5),
           mod["title"], 44, True, DARK, PP_ALIGN.CENTER)
  add_text(slide, Inches(1), Inches(4.5), Inches(11), Inches(0.8),
           "Formation Python Complète — Du débutant à l'expert", 18, False, GRAY, PP_ALIGN.CENTER)
  add_text(slide, Inches(1), Inches(5.5), Inches(11), Inches(0.6),
           "formation-python-web.vercel.app", 14, False, GRAY, PP_ALIGN.CENTER)

  # ---- Content Slides ----
  for slide_title, bullets, code_blocks in mod["slides"]:
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_shape(slide, Inches(0), Inches(0), Inches(0.25), Inches(7.5), color)
    add_shape(slide, Inches(0.25), Inches(0), Inches(13.083), Inches(0.06), GOLD)

    add_text(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.8),
             f"Module {mod['num']} — {mod['title']}", 14, False, color)

    add_shape(slide, Inches(0.8), Inches(1.1), Inches(11), Inches(0.04), GOLD)
    add_text(slide, Inches(0.8), Inches(1.3), Inches(11), Inches(0.8),
             slide_title, 32, True, DARK)

    # Left: bullets
    add_bullet_list(slide, Inches(0.8), Inches(2.3), Inches(5.5), Inches(4), bullets)

    # Right: code blocks
    if code_blocks:
      y = Inches(2.3)
      for label, code in code_blocks:
        add_text(slide, Inches(7), y, Inches(6), Inches(0.4), label, 14, True, color)
        add_code(slide, Inches(7), y + Inches(0.35), Inches(6), Inches(1.6), code)
        y += Inches(2.3)

    add_shape(slide, Inches(0.25), Inches(7.44), Inches(13.083), Inches(0.06), GOLD)

  # ---- Conclusion Slide ----
  slide = prs.slides.add_slide(prs.slide_layouts[6])
  add_shape(slide, Inches(0), Inches(0), Inches(13.333), Inches(0.08), GOLD)
  add_shape(slide, Inches(0), Inches(7.42), Inches(13.333), Inches(0.08), GOLD)
  add_text(slide, Inches(1), Inches(2), Inches(11), Inches(1),
           "Récapitulatif", 36, True, DARK, PP_ALIGN.CENTER)
  add_bullet_list(slide, Inches(2), Inches(3.2), Inches(9), Inches(3),
                  [s[0] for s in mod["slides"]], 20)
  add_text(slide, Inches(1), Inches(6), Inches(11), Inches(0.6),
           f"Module {mod['num']} terminé ! Prochain module →", 16, False, GRAY, PP_ALIGN.CENTER)

  # Save
  filename = f"Video_Module_{mod['num']}_{mod['title'].replace(' ', '_')}.pptx"
  prs.save(filename)
  print(f"Generated: {filename}")
  print(f"  Slides: {len(prs.slides)}")

if __name__ == "__main__":
  mods = sys.argv[1:] if len(sys.argv) > 1 else list(MODULES.keys())
  for m in mods:
    if m in MODULES:
      make_presentation(m)
    else:
      print(f"Unknown module: {m}")
      print(f"Available: {', '.join(MODULES.keys())}")
