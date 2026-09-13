---
title: TEI Encoding of A1 Written Productions — Portfolio
---

# Portfolio — TEI Encoding of A1 Written Productions

Valérie Tchekemian

## The Project

This project applies TEI (Text Encoding Initiative) markup to two short written productions at A1 level (CEFR), collected as part of a French as a Foreign Language (FFL) learner corpus. The aim is to identify and categorize learner errors — gender agreement, prepositional contraction, word order — turning raw writing samples into structured, comparable data. This approach sits within a corpus-based learning design perspective: surfacing recurring difficulties at a given proficiency level to inform concrete pedagogical decisions, such as which structures to prioritize in exercise design.

## Genesis

I came across this project somewhat by chance, while exploring GitHub — a platform I hadn't used before. The work of Erica Cau and Alice Isola, who had encoded three handwritten postcards from the Museo civico etnografico Giovanni Podenzana collection in TEI, immediately made me want to try it myself. Watching a raw document turn, step by step, into structured, queryable data was a way of thinking about text I had never encountered before.

I wondered what this logic could produce if applied to a different kind of material: written productions from French as a Foreign Language learners, rather than a heritage document. That question is what led to this project.

## Considerations on this Form of Assessment Support

### What it brings

It makes visible and quantifiable what a teacher often notices intuitively while marking a piece of writing. An error stops being a simple note in the margin: it becomes a classified data point, comparable across texts, aggregable into a table. This makes it possible to see, for instance, whether a given error type recurs systematically at a certain level — information that's hard to obtain "by eye" across a large number of texts.

### What it doesn't replace

The teacher's pedagogical judgment: the error taxonomy was built from reading only two texts, and is deliberately provisional — it will need refining with a larger corpus. The tool flags patterns; it doesn't explain their causes. The origin of an error (interference from the learner's first language, a writing-processing difficulty, etc.) still requires human interpretation.

### What it changes in practice

It shifts part of the correction work upstream: instead of treating each text in isolation, one can query a set of encoded texts to inform lesson planning — targeting a session on the most frequent errors rather than addressing them case by case.

## Confidentialité et éthique des données

This corpus consists of authentic written productions from real learners — not examples constructed for the exercise. Working with this kind of material calls for particular care, different from what would apply to a literary text or an already-public archival document.

In this project, learners' real names were removed and replaced with anonymous identifiers (`Apprenant1`, `Apprenant2`) directly within the encoded file. No other identifying information (institution, precise date, detailed geographic origin) is retained in the corpus.

This anonymization, however, was designed for a small-scale, exploratory, educational use. Scaling this up — more texts, use within a company or a formal examination context — would require going further: explicit consent from learners or their legal guardians, a clear legal basis for data processing (GDPR, if the corpus is compiled in Europe), a defined retention period, and likely third-party-validated anonymization rather than self-assessed. Handling human writing, even for linguistic analysis purposes, is never neutral — it is personal data before it is research data.

## Explore the Corpus

- [Annotated Corpus (interactive view)](https://valerietchekemian.github.io/TEI-Encoding-A1/tei_corpus.html)
- [Quantitative Analysis Report](https://valerietchekemian.github.io/TEI-Encoding-A1/analysis/rapport_analyse.html)
- [Source Code on GitHub](https://github.com/valerietchekemian/TEI-Encoding-A1)

*Also available in French / Italian on request.*

Project in progress — last updated: 2026
