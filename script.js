// script.js — interactivité du site du corpus TEI
//
// Fonctionnalités :
// 1. Bouton "Afficher / masquer les corrections" : bascule entre voir
//    uniquement le texte original (sic) ou le texte + les corrections (corr).
// 2. Au clic sur une erreur individuelle, affiche sa catégorie dans une info-bulle.
// 3. Menu latéral rétractable pour une navigation plus claire sur mobile.

document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const toggleButton = document.getElementById("toggle-corrections");
  const sidebar = document.getElementById("sidebar");
  const sidebarToggleButton = document.getElementById("sidebar-toggle");
  const sidebarCloseButton = document.getElementById("sidebar-close");
  const sidebarOverlay = document.getElementById("sidebar-overlay");

  const setCorrectionsVisible = function (isVisible) {
    body.classList.toggle("corrections-visible", isVisible);
    if (toggleButton) {
      toggleButton.textContent = isVisible ? "Masquer les corrections" : "Afficher les corrections";
    }
  };

  if (sidebar && sidebarToggleButton) {
    const isDesktop = function () {
      return window.matchMedia("(min-width: 768px)").matches;
    };

    const applySidebarState = function (isOpen) {
      sidebar.classList.toggle("is-open", isOpen);
      body.classList.toggle("sidebar-open", isOpen);
      sidebarToggleButton.setAttribute("aria-expanded", String(isOpen));
    };

    sidebarToggleButton.addEventListener("click", function () {
      const shouldOpen = !sidebar.classList.contains("is-open");
      applySidebarState(shouldOpen);
    });

    if (sidebarCloseButton) {
      sidebarCloseButton.addEventListener("click", function () {
        applySidebarState(false);
      });
    }

    if (sidebarOverlay) {
      sidebarOverlay.addEventListener("click", function () {
        applySidebarState(false);
      });
    }

    window.addEventListener("resize", function () {
      if (isDesktop()) {
        applySidebarState(false);
      }
    });

    if (!isDesktop()) {
      applySidebarState(false);
    }
  }

  // Par défaut : corrections visibles
  setCorrectionsVisible(true);

  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      const isVisible = body.classList.contains("corrections-visible");
      setCorrectionsVisible(!isVisible);
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
