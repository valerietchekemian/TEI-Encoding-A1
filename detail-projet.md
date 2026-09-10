# TEI Encoding A1 — Project Details

## Origins

This project was inspired by the work of Erica Cau and Alice Isola discovered on GitHub: *Progetto Esame Codifica di Testi* — a TEI encoding project involving three handwritten postcards preserved at the Museo civico etnografico Giovanni Podenzana, carried out as part of a university examination (Unipi, 2018/2019).

The project demonstrated how a raw document (a handwritten postcard) could be transformed into structured and queryable data using the TEI (Text Encoding Initiative) standard, and how this work could then be presented as a mini-website (XML → XSLT transformation → HTML + CSS/JS).

## Project Objective

The aim is to apply the same structuring approach to a different type of material: **A1-level written productions (CEFR)** produced by learners of French as a Foreign Language, from a **learning design** perspective.

The objective is not to transcribe a historical document, but to:

1. **identify and classify errors** found in authentic learner productions;
2. make this analysis **queryable** (count, compare and filter errors);
3. use these data to **inform pedagogical design** by identifying recurring areas of difficulty at this level.

## Corpus

The initial corpus consists of **two authentic A1-level written productions** by Spanish-speaking learners from Venezuela. Both texts follow the same writing prompt: an invitation letter to spend a holiday in the learner's country.

The learners' real first names have been removed and replaced with anonymous identifiers (`Apprenant1`, `Apprenant2`) in the encoded file, for confidentiality purposes.

One possible research direction was explored and set aside for the time being: comparing this error profile (interference from the learners' first language) with that of learners with dyslexia, whose errors may have a different origin (written-language processing rather than linguistic competence). This line of inquiry could be revisited later, provided that authentic learner productions are available rather than constructed examples.

## Methodology

### Use of AI

Generative artificial intelligence was used as a **support and reflection tool**, rather than as a substitute for pedagogical analysis.

It contributed in particular to:

* exploring and clarifying the TEI/XML structure;
* suggesting possible approaches to error categorization;
* checking the consistency of encoding and references;
* accelerating some repetitive proofreading and structuring tasks.

Encoding decisions, the interpretation of learner productions and the final validation of error categories remain under **human control**.

This approach explores the use of AI within an **AI-augmented learning design process**, where the automation of certain tasks can free up time for pedagogical analysis and decision-making.

### Encoding

Each text is encoded in XML/TEI. The "surface" text remains normally readable; each identified error is marked using the `<choice>` element, which brings together:

* `<sic>` — what the learner actually wrote;
* `<corr type="...">` — the corrected form, with a `type` attribute indicating the error category.

```xml
<choice>
  <sic>à les boîtes</sic>
  <corr type="fusion-prepositionnelle">aux boîtes</corr>
</choice>
```

### Error Taxonomy

A closed list of categories was defined based on the analysis of the two texts, then formally declared in the TEI header (`<encodingDesc><taxonomy>`) to ensure that each error is labelled consistently across texts:

* `accord-genre`
* `accord-nombre`
* `accord-sujet-verbe`
* `fusion-prepositionnelle`
* `ordre-des-mots`
* `structure-verbale`
* `interference-orthographique`

This taxonomy is not fixed: it may evolve if new texts reveal errors that do not fit into any of the existing categories.

### TEI Modules Used

* Core
* Header
* Default Text Structure
* Names, Dates, People, and Places (for learner anonymization and profile metadata)
* Simple Analytic Mechanisms (for the `<choice>`/`<sic>`/`<corr>` system)

## What Has Already Been Done

* repository structure established (`README.md`, `tei_corpus.xml`, `stile.css`, `sources/`, `assets/`, `analysis/` directories);
* the two authentic texts transcribed and encoded in TEI using the error taxonomy;
* learners anonymized.

## What Remains to Be Done

1. Review the encoding line by line to validate or adjust the assigned error categories.
2. Write the `style.xsl` stylesheet to transform the XML into a browsable HTML page.
3. Develop the Python script for quantitative analysis (counting errors by type and by text, with a summary table).
4. Design the script so that it updates automatically whenever a new text is added to the corpus.
5. Decide how the project will be published (public GitHub repository, integration into the Notion portfolio).

