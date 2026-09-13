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
    toggleButton.textContent = "Masquer les corrections";
  }

  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      const isVisible = body.classList.contains("corrections-visible");
      
      if (isVisible) {
        // Masquer les corrections, afficher les erreurs
        body.classList.remove("corrections-visible");
        toggleButton.textContent = "Afficher les corrections";
        
        // Masquer tous les .correction et afficher tous les .erreur
        document.querySelectorAll(".correction").forEach(el => {
          el.style.display = "none";
        });
        document.querySelectorAll(".erreur").forEach(el => {
          el.style.display = "inline";
        });
      } else {
        // Afficher les corrections, masquer les erreurs
        body.classList.add("corrections-visible");
        toggleButton.textContent = "Masquer les corrections";
        
        // Afficher tous les .correction et masquer tous les .erreur
        document.querySelectorAll(".correction").forEach(el => {
          el.style.display = "inline";
        });
        document.querySelectorAll(".erreur").forEach(el => {
          el.style.display = "none";
        });
      }
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
