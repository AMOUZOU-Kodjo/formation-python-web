"""
Generateur de bannieres YouTube pour la Formation Python
Genere 36 images 1280x720 au format PNG avec photo du formateur et logo Python.

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

PART_COLORS = {
    1: {"start": "#1a237e", "mid": "#4CAF50", "end": "#1b5e20"},
    2: {"start": "#1a237e", "mid": "#FF9800", "end": "#bf360c"},
    3: {"start": "#1a237e", "mid": "#9C27B0", "end": "#4a148c"},
    4: {"start": "#1a237e", "mid": "#D32F2F", "end": "#b71c1c"},
}

PART_LABELS = {1: "Les Fondamentaux", 2: "Intermédiaire", 3: "Avancé", 4: "Expert"}

W, H = 1280, 720
OUTPUT = "banners"
PHOTO_PATH = "src/images/210192671.png"
LOGO_PATH = "src/images/python-logo.png"


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


def remove_white_bg(img, threshold=240):
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                pixels[x, y] = (255, 255, 255, 0)
    return img


def crop_circle(img, size):
    img = img.resize((size, size), Image.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)
    result = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    result.paste(img, (0, 0), mask)
    return result


def load_font(size):
    base = "C:/Windows/Fonts"
    candidates = [
        f"{base}/Poppins-Bold.ttf", f"{base}/poppins/Poppins-Bold.ttf",
        f"{base}/Poppins-SemiBold.ttf", f"{base}/poppins/Poppins-SemiBold.ttf",
        f"{base}/segoeuib.ttf", f"{base}/SEGOEUIB.TTF",
        f"{base}/segoeui.ttf", f"{base}/SEGOEUI.TTF",
        f"{base}/arialbd.ttf", f"{base}/ARIALBD.TTF",
        f"{base}/arial.ttf", f"{base}/ARIAL.TTF",
        f"{base}/calibrib.ttf", f"{base}/CALIBRIB.TTF",
        f"{base}/calibri.ttf", f"{base}/CALIBRI.TTF",
    ]
    seen = set()
    for p in candidates:
        if p in seen:
            continue
        seen.add(p)
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def load_emoji_font(size):
    paths = [
        "C:/Windows/Fonts/SEGUIEMJ.TTF",
        "C:/Windows/Fonts/seguiemj.ttf",
    ]
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return None


def draw_with_shadow(draw, xy, text, fill, font, shadow_color=(0, 0, 0), offset=3, anchor=None):
    x, y = xy
    draw.text((x + offset, y + offset), text, fill=shadow_color, anchor=anchor, font=font)
    draw.text(xy, text, fill=fill, anchor=anchor, font=font)


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

    # --- Python logo (top-left) ---
    if os.path.exists(LOGO_PATH):
        logo = Image.open(LOGO_PATH)
        logo = remove_white_bg(logo)
        logo_ratio = logo.width / logo.height
        logo_w = 120
        logo_h = int(logo_w / logo_ratio)
        logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
        # Pastille sombre derrière le logo
        pill = Image.new("RGBA", (logo_w + 30, logo_h + 20), (0, 0, 0, 0))
        pill_draw = ImageDraw.Draw(pill)
        pill_draw.rounded_rectangle(
            [(0, 0), (pill.width, pill.height)],
            radius=8,
            fill=(0, 0, 0, 140)
        )
        img_rgba = img.convert("RGBA")
        img_rgba.paste(pill, (20, 18), pill)
        img_rgba.paste(logo, (20 + 15, 18 + 10), logo)
        img = img_rgba.convert("RGB")
        draw = ImageDraw.Draw(img)

    # --- Badge partie (top-right) ---
    badge_text = f"Partie {part} · {PART_LABELS[part]}"
    badge_font = load_font(18)
    draw.rounded_rectangle([(W - 295, 18), (W - 15, 52)], radius=16, fill=(0, 0, 0, 160))
    draw.text((W - 155, 35), badge_text, fill="white", anchor="mm", font=badge_font)

    # --- Photo du formateur (right side, circular) ---
    if os.path.exists(PHOTO_PATH):
        photo = Image.open(PHOTO_PATH).convert("RGBA")
        photo_circle = crop_circle(photo, 180)
        photo_x = W - 220
        photo_y = H // 2 - 90
        img_rgba = img.convert("RGBA")
        # Cercle extérieur (border)
        border = Image.new("RGBA", (192, 192), (0, 0, 0, 0))
        border_draw = ImageDraw.Draw(border)
        border_draw.ellipse((0, 0, 192, 192), fill=None, outline=(255, 255, 255, 60), width=4)
        img_rgba.paste(photo_circle, (photo_x, photo_y), photo_circle)
        img_rgba.paste(border, (photo_x - 6, photo_y - 6), border)
        img = img_rgba.convert("RGB")
        draw = ImageDraw.Draw(img)

    text_center = W // 2 - 40

    # --- Module number ---
    num_color = hex_to_rgb(colors["mid"])
    num_font = load_font(48)
    shadow_dim = tuple(c // 3 for c in num_color)
    draw_with_shadow(draw, (text_center, 100), f"MODULE {module_id}",
                     fill=num_color, font=num_font, shadow_color=shadow_dim, offset=2, anchor="mt")

    # --- Icon (emoji) ---
    emoji_font = load_emoji_font(80)
    if emoji_font:
        draw.text((text_center, 185), icon, fill="white", anchor="mt", font=emoji_font)
    else:
        draw.text((text_center, 185), icon, fill="white", anchor="mt")

    # --- Title ---
    title_font = load_font(40)
    draw_with_shadow(draw, (text_center, 315), title,
                     fill="white", font=title_font, shadow_color=(0, 0, 0), offset=3, anchor="mt")

    # --- Brand ---
    brand_font = load_font(16)
    draw.text((W - 30, H - 30), "FORMATION PYTHON", fill=(255, 255, 255, 100), anchor="rb", font=brand_font)

    safe_title = title.lower().replace(' ', '-').replace('—', '').replace('/', '-').replace('\\', '-').replace(':', '-').replace('?', '-').replace('"', '-').replace('*', '-').replace('<', '-').replace('>', '-').replace('|', '-')
    filename = f"{module_id}-{safe_title[:30]}.png"
    filepath = os.path.join(OUTPUT, filename)
    img.save(filepath)
    return filepath


if __name__ == "__main__":
    print("Génération des bannières...")
    ensure_dir(OUTPUT)
    for i, (mid, title, icon, part, dur) in enumerate(MODULES, 1):
        path = create_banner(mid, title, icon, part, dur, i)
        print(f"  [{i:02d}/36] {title} -> {path}")
    print(f"\nGenerees dans le dossier '{OUTPUT}/'")
    print(f"Format : {W}x{H} px (16:9)")
    print(f"Ouvre banners.html pour un apercu dans le navigateur")
