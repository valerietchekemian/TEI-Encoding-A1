# TEI Encoding A1 — détail du projet

## Origine

Ce projet est né en découvrant sur GitHub le travail d'Erica Cau et Alice
Isola : *Progetto Esame Codifica di Testi* — l'encodage TEI de trois cartes
postales manuscrites conservées au Museo civico etnografico Giovanni
Podenzana, réalisé dans le cadre d'un examen universitaire (Unipi,
2018/2019).

Ce projet montrait comment transformer un document brut (une carte
postale manuscrite) en données structurées et interrogeables, via le
standard TEI (Text Encoding Initiative), puis comment présenter ce
travail sous forme d'un mini-site (XML → transformation XSLT → HTML +
CSS/JS).

## Objectif du projet

Appliquer la même logique de structuration à un objet différent : des
productions écrites de niveau A1 (CECR), rédigées par des apprenants de
français langue étrangère, dans une perspective de **learning design**.

L'objectif n'est pas de transcrire un document ancien, mais de :

1. **repérer et typer les erreurs** présentes dans des productions
   authentiques d'apprenants,
2. rendre ce repérage **interrogeable** (compter, comparer, filtrer),
3. utiliser ces données pour **informer la conception pédagogique**
   (identifier les points de difficulté récurrents à ce niveau).

## Corpus

Le corpus de départ est constitué de **deux productions écrites
authentiques**, niveau A1, rédigées par des apprenants hispanophones
(Venezuela). Les deux textes suivent la même consigne : une lettre
d'invitation à passer des vacances dans son pays.

Les prénoms réels des apprenants ont été retirés et remplacés par des
identifiants anonymes (`Apprenant1`, `Apprenant2`) dans le fichier
encodé, par souci de confidentialité.

Une piste explorée puis mise de côté pour l'instant : comparer ce profil
d'erreurs (interférence avec la langue maternelle) à celui d'apprenants
porteurs de dyslexie, dont les erreurs relèvent d'une autre origine
(traitement du langage écrit plutôt que compétence linguistique). Cet
axe pourra être repris plus tard, à condition de disposer de vraies
productions plutôt que d'exemples construits.

## Méthodologie

### Utilisation de l'IA

L'intelligence artificielle générative a été utilisée comme outil d'assistance et de réflexion, et non comme substitut à l'analyse pédagogique.

Elle a notamment contribué à :

explorer et clarifier la structure TEI/XML ;
proposer des pistes de catégorisation des erreurs ;
vérifier la cohérence du balisage et des références ;
accélérer certaines tâches répétitives de relecture et de structuration.

Les choix d'encodage, l'interprétation des productions d'apprenants et la validation finale des catégories restent sous contrôle humain.

Cette démarche permet d'explorer une utilisation de l'IA dans un processus de learning design augmenté, où l'automatisation de certaines tâches libère du temps pour l'analyse pédagogique et la prise de décision.

### Encodage

Chaque texte est encodé en XML/TEI. Le texte "de surface" reste lisible
normalement ; chaque erreur repérée est marquée avec l'élément
`<choice>`, qui met en regard :

- `<sic>` — ce que l'apprenant a réellement écrit,
- `<corr type="...">` — la forme correcte, avec un attribut `type`
  indiquant la catégorie d'erreur.

```xml
<choice>
  <sic>à les boîtes</sic>
  <corr type="fusion-prepositionnelle">aux boîtes</corr>
</choice>
```

### Typologie d'erreurs

Une liste fermée de catégories a été définie à partir de la lecture des
deux textes, puis déclarée formellement dans l'en-tête TEI
(`<encodingDesc><taxonomy>`) pour garantir que chaque erreur soit
étiquetée de façon cohérente d'un texte à l'autre :

- `accord-genre`
- `accord-nombre`
- `accord-sujet-verbe`
- `fusion-prepositionnelle`
- `ordre-des-mots`
- `structure-verbale`
- `interference-orthographique`

Cette typologie n'est pas figée : elle pourra évoluer si de nouveaux
textes font apparaître des erreurs qui ne rentrent dans aucune catégorie
existante.

### Modules TEI mobilisés

- Core
- Header
- Default Text Structure
- Names, Dates, People, and Places (pour l'anonymisation des
  apprenants et les métadonnées de profil)
- Simple Analytic Mechanisms (pour le système `<choice>`/`<sic>`/`<corr>`)

## Ce qui a déjà été fait

- structure du dépôt mise en place (`README.md`, `tei_corpus.xml`,
  `stile.css`, dossiers `sources/`, `assets/`, `analysis/`)
- les deux textes authentiques transcrits et encodés en TEI avec la
  typologie d'erreurs
- anonymisation des apprenants

## Ce qu'il reste à faire

1. relecture ligne par ligne du balisage pour valider ou ajuster les
   catégories d'erreurs attribuées
2. rédaction de la feuille `style.xsl` pour transformer le XML en page
   HTML consultable
3. écriture du script Python d'analyse quantitative (comptage des
   erreurs par type, par texte, tableau récapitulatif)
4. conception du script pour qu'il se mette à jour automatiquement à
   chaque nouveau texte ajouté au corpus
5. décision sur la publication (dépôt public sur GitHub, intégration au
   portfolio Notion)
