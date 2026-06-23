"""
Générateur de bannières YouTube pour la Formation Python
Génère 36 images 1280×720 au format PNG.

Installation : pip install Pillow
Utilisation : python generate_banners.py
"""

from PIL import Image, ImageDraw, ImageFont
import os

MODULES = [
    ("01", "Introduction à Python", "🐍", 1, "2h"),
    ("02", "Variables, types et opérateurs", "🔢", 1, "2h"),
    ("03", "Chaînes de caractères", "📝", 1, "2h"),
    ("04", "Listes et tuples", "📋", 1, "2h"),
    ("05", "Dictionnaires et ensembles", "🗂️", 1, "2h"),
    ("06", "Contrôle de flux", "🔀", 1, "2h"),
    ("07", "Boucles", "🔄", 1, "2h"),
    ("08", "Fonctions", "⚙️", 1, "3h"),
    ("09", "Compréhensions", "💡", 1, "2h"),
    ("10", "Gestion des erreurs", "🛡️", 1, "2h"),
    ("11", "Modules et packages", "📦", 2, "2h"),
    ("12", "Fichiers", "📁", 2, "2h"),
    ("13", "POO — Classes", "🏛️", 2, "3h"),
    ("14", "Héritage et polymorphisme", "🧬", 2, "3h"),
    ("15", "Méthodes spéciales", "✨", 2, "2h"),
    ("16", "Itérateurs et générateurs", "⏳", 2, "2h"),
    ("17", "Décorateurs", "🎀", 2, "2h"),
    ("18", "Context managers", "📎", 2, "2h"),
    ("19", "Bibliothèque standard", "📚", 3, "3h"),
    ("20", "Expressions régulières", "🔍", 3, "3h"),
    ("21", "Programmation fonctionnelle", "λ", 3, "2h"),
    ("22", "Type hints", "🏷️", 3, "2h"),
    ("23", "Async / Await", "⚡", 3, "3h"),
    ("24", "Threading & Multiprocess", "🧵", 3, "3h"),
    ("25", "Métaclasses & Introspection", "🪞", 4, "3h"),
    ("26", "Design patterns", "🏗️", 4, "3h"),
    ("27", "Tests unitaires", "🧪", 4, "3h"),
    ("28", "Logging & Debugging", "🐛", 4, "2h"),
    ("29", "Environnements virtuels", "📦", 4, "2h"),
    ("30", "Packaging et distribution", "📤", 4, "2h"),
    ("31", "API REST avec FastAPI", "🌐", 4, "4h"),
    ("32", "Bases de données", "🗄️", 4, "3h"),
    ("33", "Web scraping", "🕸️", 4, "3h"),
    ("34", "Introduction à la data science", "📊", 4, "4h"),
    ("35", "Visualisation de données", "📈", 4, "3h"),
    ("36", "Projet final", "🏆", 4, "6h"),
]

# Couleurs par partie
PART_COLORS = {
    1: { "start": "#1a237e", "mid": "#4CAF50", "end": "#1b5e20" },
    2: { "start": "#1a237e", "mid": "#FF9800", "end": "#bf360c" },
    3: { "start": "#1a237e", "mid": "#9C27B0", "end": "#4a148c" },
    4: { "start": "#1a237e", "mid": "#D32F2F", "end": "#b71c1c" },
}

PART_LABELS = {1: "Les Fondamentaux", 2: "Intermédiaire", 3: "Avancé", 4: "Expert"}

W, H = 1280, 720
OUTPUT = "banners"

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def create_gradient(draw, w, h, c1, c2, c3):
    for y in range(h):
        t = y / h
        if t < 0.5:
            r, g, b = [int(a + (b - a) * t * 2) for a, b in zip(c1, c2)]
        else:
            r, g, b = [int(a + (b - a) * (t - 0.5) * 2) for a, b in zip(c2, c3)]
        draw.line([(0, y), (w, y)], fill=(r, g, b))

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def create_banner(module_id, title, icon, part, duration, index):
    img = Image.new("RGB", (W, H))
    draw = ImageDraw.Draw(img)
    colors = PART_COLORS[part]
    c1, c2, c3 = hex_to_rgb(colors["start"]), hex_to_rgb(colors["mid"]), hex_to_rgb(colors["end"])
    create_gradient(draw, W, H, c1, c2, c3)

    # Overlay sombre en bas
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    for y in range(H // 2, H):
        alpha = int(180 * (y - H // 2) / (H // 2))
        overlay_draw.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    # Badge partie en haut à gauche
    badge_text = f"Partie {part} · {PART_LABELS[part]}"
    draw.rounded_rectangle([(20, 20), (260, 50)], radius=15, fill=(0, 0, 0, 160))
    draw.text((40, 28), badge_text, fill="white")

    # Module number
    draw.text((W // 2, 140), f"MODULE {module_id}", fill=colors["mid"], anchor="mt")

    # Icon
    draw.text((W // 2, 190), icon, anchor="mt")

    # Title
    draw.text((W // 2, 370), title, fill="white", anchor="mt")

    # Duration
    draw.text((W // 2, 420), f"Durée : {duration}", fill=(200, 200, 200), anchor="mt")

    # Brand
    draw.text((W - 30, H - 30), "FORMATION PYTHON", fill=(255, 255, 255, 100), anchor="rb")

    filename = f"{module_id}-{title.lower().replace(' ', '-').replace('—', '')[:30]}.png"
    filepath = os.path.join(OUTPUT, filename)
    img.save(filepath)
    return filepath

if __name__ == "__main__":
    print("Génération des bannières...")
    ensure_dir(OUTPUT)
    for i, (mid, title, icon, part, dur) in enumerate(MODULES, 1):
        path = create_banner(mid, title, icon, part, dur, i)
        print(f"  [{i:02d}/36] {title} → {path}")
    print(f"\n✅ Générées dans le dossier '{OUTPUT}/'")
    print(f"📐 Format : {W}×{W} px (16:9)")
    print(f"💡 Ouvre banners.html pour un aperçu dans le navigateur")
