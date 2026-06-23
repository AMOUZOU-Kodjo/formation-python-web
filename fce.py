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
        print(f"Erreur lors du téléchargement de {url} : {e}")
    return None

def draw_rounded_rectangle(draw, xy, corner_radius, fill=None, outline=None, width=1):
    """Dessine un rectangle avec des coins arrondis si nécessaire"""
    draw.rounded_rectangle(xy, radius=corner_radius, fill=fill, outline=outline, width=width)

def generate_certificate(student_name, date_completion="24 Juin 2026", output_filename="attestation_python.png"):
    # Dimensions A4 Paysage à 300 DPI
    WIDTH, HEIGHT = 3508, 2480
    
    # Création de l'image de fond (Blanc cassé / Crème léger pour l'élégance)
    img = Image.new("RGBA", (WIDTH, HEIGHT), "#FAFAFA")
    draw = ImageDraw.Draw(img)
    
    # --- 1. DESSIN DU CADRE ET DES BORDURES ---
    # Bordure extérieure épaisse (Couleur Bleu Python)
    draw.rectangle([60, 60, WIDTH - 60, HEIGHT - 60], outline="#306998", width=15)
    # Bordure intérieure fine (Couleur Or Python)
    draw.rectangle([90, 90, WIDTH - 90, HEIGHT - 90], outline="#FFE873", width=4)
    
    # --- 2. CHARGEMENT DES POLICES ---
    font_dir = "C:\\Windows\\Fonts\\"
    
    try:
        font_title = ImageFont.truetype(font_dir + "arialbd.ttf", 140)  # arial gras pour le titre
        font_subtitle = ImageFont.truetype(font_dir + "arial.ttf", 60)
        font_body = ImageFont.truetype(font_dir + "arial.ttf", 70)
        font_name = ImageFont.truetype(font_dir + "arialbd.ttf", 110)   # nom de l'étudiant en gras
        font_details = ImageFont.truetype(font_dir + "arial.ttf", 50)
        font_signature = ImageFont.truetype(font_dir + "arial.ttf", 45)
        font_course_title = ImageFont.truetype(font_dir + "arialbi.ttf", 80) # Gras / Italique pour le cours
    except IOError:
        print("⚠️ Polices spécifiques introuvables, repli sur la police par défaut.")
        # Repli si les polices truetype ne sont pas trouvées
        font_title = font_subtitle = font_body = font_name = font_details = font_signature = font_course_title = ImageFont.load_default()

    # --- 3. CHARGEMENT ET PLACEMENT DES IMAGES DE RÉFÉRENCE ---
    # Logo Python
    logo_url = "https://raw.githubusercontent.com/AMOUZOU-Kodjo/formation-python-web/main/src/images/python-logo.png"
    logo = download_image(logo_url)
    if logo:
        # Redimensionnement du logo principal
        logo = logo.convert("RGBA")
        logo_resized = logo.resize((350, 350), Image.Resampling.LANCZOS)
        # Positionnement en haut au centre
        img.paste(logo_resized, ((WIDTH - 350) // 2, 180), logo_resized)
        
        # Filigrane de fond (Logo Python centré géant avec opacité réduite)
        bg_logo = logo.resize((1200, 1200), Image.Resampling.LANCZOS)
        bg_logo_alpha = bg_logo.copy()
        bg_logo_alpha.putalpha(15) # Très transparent (opacité ~6%)
        img.paste(bg_logo_alpha, ((WIDTH - 1200) // 2, (HEIGHT - 1200) // 2), bg_logo_alpha)

    # Photo du Formateur (utilisée pour la zone de signature en bas à droite)
    instructor_url = "https://raw.githubusercontent.com/AMOUZOU-Kodjo/formation-python-web/main/src/images/210192671.png"
    instructor = download_image(instructor_url)
    if instructor:
        instructor = instructor.convert("RGBA")
        # Format miniature ronde ou carrée pour la signature
        inst_size = 250
        instructor_resized = instructor.resize((inst_size, inst_size), Image.Resampling.LANCZOS)
        
        # Création d'un masque rond pour insérer proprement la photo
        mask = Image.new("L", (inst_size, inst_size), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.ellipse((0, 0, inst_size, inst_size), fill=255)
        
        # Positionnement de la photo en bas à droite (Zone de signature)
        sig_x, sig_y = WIDTH - 650, HEIGHT - 580
        img.paste(instructor_resized, (sig_x, sig_y), mask)
        # Cercle de bordure autour de la photo
        draw.ellipse([sig_x, sig_y, sig_x + inst_size, sig_y + inst_size], outline="#306998", width=4)

    # --- 4. ÉCRITURE DU TEXTE ---
    # En-tête / Titre principal
    text_title = "ATTESTATION DE RÉUSSITE"
    draw.text((WIDTH // 2, 600), text_title, fill="#1E1E1E", font=font_title, anchor="mm")
    
    text_subtitle = "Cette attestation professionnelle est décernée à :"
    draw.text((WIDTH // 2, 780), text_subtitle, fill="#555555", font=font_subtitle, anchor="mm")
    
    # Nom de l'étudiant (En gros et mis en valeur)
    draw.text((WIDTH // 2, 950), student_name.upper(), fill="#306998", font=font_name, anchor="mm")
    
    # Ligne de séparation sous le nom
    draw.line([(WIDTH // 2) - 400, 1040, (WIDTH // 2) + 400, 1040], fill="#FFE873", width=6)
    
    # Réintroduction des textes explicatifs manquants
    body_text_1 = "Pour avoir suivi avec succès et validé l'ensemble des modules requis de la formation :"
    course_title = "« Programmation Python : Les Bases de la Programmation »"
    body_text_2 = "Cette formation de niveau professionnel valide l'acquisition des compétences fondamentales :\n" \
                  "Variables, structures conditionnelles, boucles, fonctions et manipulation des structures de données."

    draw.text((WIDTH // 2, 1160), body_text_1, fill="#555555", font=font_body, anchor="mm")
    draw.text((WIDTH // 2, 1290), course_title, fill="#212121", font=font_course_title, anchor="mm")
    draw.text((WIDTH // 2, 1480), body_text_2, fill="#555555", font=font_body, anchor="mm", align="center")

    # --- 5. ZONE DE BAS DE PAGE (Mentions & Signatures) ---
    # Date et mentions légales à gauche
    draw.text((450, HEIGHT - 500), f"Fait le : {date_completion}", fill="#333333", font=font_details)
    draw.text((450, HEIGHT - 420), "Réf. Certification : PY-BASIC-2026", fill="#777777", font=font_details)
    draw.text((450, HEIGHT - 340), "Statut : Document Officiel", fill="#777777", font=font_details)

    # Bloc Signature à droite (sous la photo insérée précédemment)
    draw.text((WIDTH - 525, HEIGHT - 300), "Le Formateur Référent", fill="#333333", font=font_signature, anchor="mm")
    draw.text((WIDTH - 525, HEIGHT - 230), "Python Expert Academic", fill="#777777", font=font_signature, anchor="mm")
    
    # Enregistrement du fichier final
    img.save(output_filename, "PNG")
    print(f"✓ L'attestation professionnelle a été générée avec succès : {output_filename}")

# Exemple d'appel pour tester le script
if __name__ == "__main__":
    generate_certificate("Jean Dupont", date_completion="24 Juin 2026")