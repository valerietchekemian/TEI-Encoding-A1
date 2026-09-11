// script.js — interactivité du site du corpus TEI
//
// Fonctionnalités :
// 1. Bouton "Afficher / masquer les corrections" : bascule entre voir
//    uniquement le texte original (sic) ou le texte + les corrections (corr).
// 2. Au clic sur une erreur individuelle, affiche sa catégorie dans une info-bulle.

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-corrections");
  const body = document.body;

  // Par défaut : corrections visibles
  body.classList.add("corrections-visible");

  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      body.classList.toggle("corrections-visible");
      const visible = body.classList.contains("corrections-visible");
      toggleButton.textContent = visible
        ? "Masquer les corrections"
        : "Afficher les corrections";
    });
  }

  // Au clic sur une correction, afficher sa catégorie d'erreur
  const corrections = document.querySelectorAll(".correction");
  corrections.forEach(function (el) {
    el.addEventListener("click", function () {
      const type = el.getAttribute("data-type");
      if (type) {
        el.setAttribute("title", "Catégorie : " + type);
      }
    });
  });
});
