"""
analyze_a1.py

Analyse le corpus TEI (tei_corpus.xml) et génère un rapport Markdown
(rapport_analyse.md) avec :
  1. Un tableau récapitulatif : nombre d'erreurs par catégorie
  2. Un tableau détaillé : chaque erreur (sic) avec sa correction (corr),
     son type, et le texte (div) dont elle provient

Usage :
    python analyze_a1.py
"""

import xml.etree.ElementTree as ET
from collections import Counter

NS = {
    "tei": "http://www.tei-c.org/ns/1.0",
    "xml": "http://www.w3.org/XML/1998/namespace",
}
XML_ID = "{http://www.w3.org/XML/1998/namespace}id"
SOURCE_FILE = "../tei_corpus.xml"
OUTPUT_FILE = "rapport_analyse.md"

# Libellés lisibles pour chaque code de catégorie (tirés de la taxonomie du fichier)
CATEGORIES = {
    "accord-genre": "Erreur d'accord en genre",
    "accord-nombre": "Erreur d'accord en nombre",
    "accord-sujet-verbe": "Erreur d'accord sujet-verbe",
    "fusion-prepositionnelle": "Fusion préposition + article non réalisée",
    "ordre-des-mots": "Ordre des mots incorrect",
    "structure-verbale": "Construction verbale calquée sur la langue source",
    "interference-orthographique": "Orthographe influencée par la langue source",
}


def analyser(fichier):
    tree = ET.parse(fichier)
    root = tree.getroot()

    compteur = Counter()
    details = []  # (texte_id, apprenant, type_erreur, sic, corr)

    for div in root.findall(".//tei:div", NS):
        texte_id = div.get(XML_ID, "?")
        apprenant = div.get("who", "?").lstrip("#")

        for choice in div.findall(".//tei:choice", NS):
            sic = choice.find("tei:sic", NS)
            corr = choice.find("tei:corr", NS)
            if sic is None or corr is None:
                continue

            type_erreur = corr.get("type", "non-classé")
            compteur[type_erreur] += 1
            details.append(
                (texte_id, apprenant, type_erreur, sic.text.strip(), corr.text.strip())
            )

    return compteur, details


def generer_rapport(compteur, details, fichier_sortie):
    total = sum(compteur.values())
    lignes = []

    lignes.append("# Rapport d'analyse — Corpus A1\n")
    lignes.append(
        f"Corpus de productions écrites A1, analysé automatiquement à partir "
        f"de `{SOURCE_FILE}`. **{total} erreurs** au total, réparties dans "
        f"**{len(compteur)} catégories**.\n"
    )

    # --- Tableau 1 : résumé statistique ---
    lignes.append("## 1. Résumé par catégorie d'erreur\n")
    lignes.append("| Catégorie | Description | Occurrences |")
    lignes.append("|---|---|---|")
    for code, n in compteur.most_common():
        desc = CATEGORIES.get(code, "")
        lignes.append(f"| `{code}` | {desc} | {n} |")
    lignes.append("")

    # --- Tableau 2 : détail complet ---
    lignes.append("## 2. Détail des erreurs et corrections\n")
    lignes.append("| Texte | Apprenant | Catégorie | Erreur (sic) | Correction |")
    lignes.append("|---|---|---|---|---|")
    for texte_id, apprenant, type_erreur, sic, corr in details:
        lignes.append(f"| {texte_id} | {apprenant} | `{type_erreur}` | {sic} | {corr} |")
    lignes.append("")

    with open(fichier_sortie, "w", encoding="utf-8") as f:
        f.write("\n".join(lignes))

    print(f"Rapport généré : {fichier_sortie}")
    print(f"{total} erreurs analysées dans {len(compteur)} catégories.")


if __name__ == "__main__":
    compteur, details = analyser(SOURCE_FILE)
    generer_rapport(compteur, details, OUTPUT_FILE)
