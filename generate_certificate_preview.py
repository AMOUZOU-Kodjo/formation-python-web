"""
Generateur d'attestation de fin de formation Python.
Genere une image A4 paysage 300 DPI (3508x2480).
Utilisation : python generate_certificate_preview.py
"""

import os
import requests
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont

def download_image(url):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return Image.open(BytesIO(response.content))
    except Exception as e:
        print(f"Erreur telechargement {url} : {e}")
    return None

def generate_certificate(student_name="Nom de l'etudiant", date_completion="24 Juin 2026",
                          modules_count="36", hours_count="90+", output_filename="attestation-preview.png"):
    WIDTH, HEIGHT = 3508, 2480
    img = Image.new("RGBA", (WIDTH, HEIGHT), "#FAFAFA")
    draw = ImageDraw.Draw(img)

    # --- Bordures ---
    draw.rectangle([60, 60, WIDTH - 60, HEIGHT - 60], outline="#306998", width=15)
    draw.rectangle([90, 90, WIDTH - 90, HEIGHT - 90], outline="#FFE873", width=4)
    draw.rectangle([120, 120, WIDTH - 120, HEIGHT - 120], outline="#D0D0D0", width=1)

    # --- Polices ---
    font_dir = "C:\\Windows\\Fonts\\"
    try:
        font_title = ImageFont.truetype(font_dir + "arialbd.ttf", 130)
        font_subtitle = ImageFont.truetype(font_dir + "arial.ttf", 55)
        font_body = ImageFont.truetype(font_dir + "arial.ttf", 65)
        font_name = ImageFont.truetype(font_dir + "arialbd.ttf", 110)
        font_stats_num = ImageFont.truetype(font_dir + "arialbd.ttf", 80)
        font_stats_label = ImageFont.truetype(font_dir + "arial.ttf", 40)
        font_details = ImageFont.truetype(font_dir + "arial.ttf", 45)
        font_signature = ImageFont.truetype(font_dir + "arial.ttf", 40)
        font_course = ImageFont.truetype(font_dir + "ariali.ttf", 70)
    except IOError:
        font_title = font_subtitle = font_body = font_name = font_details = font_signature = font_course = ImageFont.load_default()
        font_stats_num = font_stats_label = ImageFont.load_default()

    # --- Logo Python ---
    logo_url = "https://raw.githubusercontent.com/AMOUZOU-Kodjo/formation-python-web/main/src/images/python-logo.png"
    logo = download_image(logo_url)
    if logo:
        logo = logo.convert("RGBA")
        logo_resized = logo.resize((300, 300), Image.Resampling.LANCZOS)
        img.paste(logo_resized, ((WIDTH - 300) // 2, 130), logo_resized)

        bg_logo = logo.resize((1000, 1000), Image.Resampling.LANCZOS)
        bg_logo_alpha = bg_logo.copy()
        bg_logo_alpha.putalpha(12)
        img.paste(bg_logo_alpha, ((WIDTH - 1000) // 2, (HEIGHT - 1000) // 2), bg_logo_alpha)

    # --- Photo formateur (signature) ---
    instructor_url = "https://raw.githubusercontent.com/AMOUZOU-Kodjo/formation-python-web/main/src/images/210192671.png"
    instructor = download_image(instructor_url)
    if instructor:
        instructor = instructor.convert("RGBA")
        inst_size = 200
        instructor_resized = instructor.resize((inst_size, inst_size), Image.Resampling.LANCZOS)
        mask = Image.new("L", (inst_size, inst_size), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.ellipse((0, 0, inst_size, inst_size), fill=255)
        sig_x, sig_y = WIDTH - 550, HEIGHT - 550
        img.paste(instructor_resized, (sig_x, sig_y), mask)
        draw.ellipse([sig_x - 4, sig_y - 4, sig_x + inst_size + 4, sig_y + inst_size + 4],
                     outline="#306998", width=4)

    # --- Texte ---
    cx = WIDTH // 2

    # Titre
    draw.text((cx, 500), "ATTESTATION DE RÉUSSITE", fill="#1E1E1E", font=font_title, anchor="mm")
    draw.text((cx, 660), "Cette attestation professionnelle est décernée à :",
              fill="#555555", font=font_subtitle, anchor="mm")

    # Nom
    draw.text((cx, 850), student_name.upper(), fill="#306998", font=font_name, anchor="mm")
    draw.line([cx - 450, 940, cx + 450, 940], fill="#FFE873", width=6)

    # Corps
    draw.text((cx, 1060), "Pour avoir suivi avec succès et validé l'ensemble des modules requis de la formation :",
              fill="#555555", font=font_body, anchor="mm")

    course_title = "« Formation Complète Python — Du débutant à l'expert »"
    draw.text((cx, 1190), course_title, fill="#212121", font=font_course, anchor="mm")

    body_text = ("Variables, types, structures de contrôle, fonctions, POO, héritage, décorateurs,\n"
                 "async/await, bases de données, API REST, data science, visualisation et projet final.")
    draw.text((cx, 1340), body_text, fill="#555555", font=font_body, anchor="mm", align="center")

    # --- Statistiques ---
    y_stats = 1550
    stats = [
        (modules_count, "Modules complétés"),
        (f"{hours_count}h", "Heures de formation"),
        ("4", "Parties couvertes"),
    ]
    spacing = 400
    total_w = len(stats) * spacing - 100
    start_x = (WIDTH - total_w) // 2
    for i, (num, label) in enumerate(stats):
        x = start_x + i * spacing
        draw.text((x, y_stats), str(num), fill="#306998", font=font_stats_num, anchor="mt")
        draw.text((x, y_stats + 100), label, fill="#666666", font=font_stats_label, anchor="mt")
        if i < len(stats) - 1:
            draw.line([(x + spacing // 2, y_stats), (x + spacing // 2, y_stats + 140)],
                      fill="#DDDDDD", width=2)

    # --- Pied de page ---
    draw.text((450, HEIGHT - 480), f"Fait le : {date_completion}", fill="#333333", font=font_details)
    draw.text((450, HEIGHT - 400), f"Certificat n° FP-{student_name[:4].upper()}-202606", fill="#777777", font=font_details)
    draw.text((450, HEIGHT - 320), "Statut : Formation certifiante", fill="#777777", font=font_details)

    draw.text((WIDTH - 450, HEIGHT - 300), "Le Formateur", fill="#333333", font=font_signature, anchor="mm")
    draw.text((WIDTH - 450, HEIGHT - 240), "Python Expert — Formation Complète", fill="#777777", font=font_signature, anchor="mm")

    img.save(output_filename, "PNG")
    print(f"Attestation generee : {output_filename} ({WIDTH}x{HEIGHT})")

if __name__ == "__main__":
    generate_certificate("Jean Dupont", date_completion="24 Juin 2026")
