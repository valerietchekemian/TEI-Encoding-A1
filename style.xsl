<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="tei">

<xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

<!-- ============================================================ -->
<!-- Page racine                                                   -->
<!-- ============================================================ -->
<xsl:template match="/tei:TEI">
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <title><xsl:value-of select="tei:teiHeader/tei:fileDesc/tei:titleStmt/tei:title"/></title>
  <link rel="stylesheet" href="stile.css"/>
</head>
<body>

  <header class="site-header">
    <h1><xsl:value-of select="tei:teiHeader/tei:fileDesc/tei:titleStmt/tei:title"/></h1>
    <p class="credit">
      Encodage : <xsl:value-of select="tei:teiHeader/tei:fileDesc/tei:titleStmt/tei:respStmt/tei:name"/>
    </p>
  </header>

  <section class="corpus-info">
    <xsl:for-each select="tei:teiHeader/tei:fileDesc/tei:sourceDesc/tei:p">
      <p><xsl:value-of select="."/></p>
    </xsl:for-each>
  </section>

  <div class="toolbar">
    <button id="toggle-corrections" type="button">Afficher / masquer les corrections</button>
  </div>

  <main class="corpus">
    <xsl:apply-templates select="tei:text/tei:body/tei:div"/>
  </main>

  <script src="script.js"></script>
</body>
</html>
</xsl:template>

<!-- ============================================================ -->
<!-- Un texte d'apprenant (<div>)                                  -->
<!-- ============================================================ -->
<xsl:template match="tei:div">
<article class="learner-text">
  <h2>Texte <xsl:value-of select="substring-after(@xml:id, 'texte')"/></h2>
  <p class="meta">
    Apprenant : <xsl:value-of select="substring-after(@who, '#')"/> —
    <xsl:value-of select="tei:measure/@quantity"/> mots
  </p>

  <xsl:if test="tei:note[@type='conformite-consigne']">
    <details class="conformite">
      <summary>Conformité à la consigne</summary>
      <ul>
        <xsl:for-each select="tei:note[@type='conformite-consigne']/tei:list/tei:item">
          <li><xsl:value-of select="."/></li>
        </xsl:for-each>
      </ul>
    </details>
  </xsl:if>

  <div class="text-body">
    <xsl:apply-templates select="tei:p"/>
  </div>

  <xsl:if test="tei:signed">
    <p class="signature">— <xsl:value-of select="tei:signed"/></p>
  </xsl:if>
</article>
</xsl:template>

<!-- ============================================================ -->
<!-- Paragraphes et erreurs                                        -->
<!-- ============================================================ -->
<xsl:template match="tei:p">
  <p><xsl:apply-templates/></p>
</xsl:template>

<xsl:template match="tei:choice">
  <span class="choice">
    <span class="sic"><xsl:value-of select="tei:sic"/></span>
    <span class="corr">
      <xsl:attribute name="data-type"><xsl:value-of select="tei:corr/@type"/></xsl:attribute>
      <xsl:value-of select="tei:corr"/>
    </span>
  </span>
</xsl:template>

<xsl:template match="tei:postscript">
  <p class="postscript"><xsl:value-of select="."/></p>
</xsl:template>

<!-- texte brut (hors balises connues) -->
<xsl:template match="text()">
  <xsl:value-of select="."/>
</xsl:template>

</xsl:stylesheet>
