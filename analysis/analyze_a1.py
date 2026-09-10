import xml.etree.ElementTree as ET

# Charger le fichier TEI
tree = ET.parse("../tei_corpus.xml")
root = tree.getroot()

# Namespace TEI
ns = {"tei": "http://www.tei-c.org/ns/1.0"}

# Trouver toutes les productions écrites
productions = root.findall(".//tei:div[@type='production-ecrite']", ns)

print("Nombre de productions :", len(productions))
