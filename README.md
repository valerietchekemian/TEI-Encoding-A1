![bannière](assets/TEI%20ENCODING%20%C2%B7FLE%20Learner%20Corpus%20%C2%B7%20Error%20Annotation%20.png)

# TEI Encoding of A1 Written Productions

TEI encoding of short A1-level written productions in French as a foreign
language (FLE), with a focus on error typology. 

## About

This project applies TEI (Text Encoding Initiative) encoding to short
written productions at A1 level (CECR), collected as part of a French as a
Foreign Language (FLE) learner corpus. The project focuses on identifying
and typifying learner errors to support corpus-based learning design.

## TEI modules used

- Core
- Header
- Default Text Structure
- Names, Dates, People, and Places
- Simple Analytic Mechanisms

## Project structure

```
.
├── sources/        original texts (scans/photos, if available)
├── assets/         images used for the site (icons, visuals)
├── analysis/        quantitative analysis script (Python)
├── tei_corpus.xml   main TEI-encoded corpus
├── tei_custom.dtd   custom DTD (optional, added later)
├── style.xsl        XSLT stylesheet (XML → HTML)
├── tei_corpus.html  generated HTML view of the corpus
├── stile.css        site styling
└── script.js        site interactivity
```

## Error encoding convention

Errors are marked using the `<choice>` element, with a `type` attribute
indicating the error category:

```xml
<choice>
  <sic>je suis allée au le marché</sic>
  <corr type="accord-genre">je suis allé au marché</corr>
</choice>
```

## Status

🚧 Work in progress — corpus texts not yet added.
