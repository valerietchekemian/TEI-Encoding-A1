// script.js — interactivité du site du corpus TEI
//
// Fonctionnalités :
// 1. Bouton "Afficher / masquer les corrections" : bascule entre voir
//    uniquement le texte original (sic) ou le texte + les corrections (corr).
// 2. Au clic sur une erreur individuelle, affiche sa catégorie dans une info-bulle.
// 3. Menu latéral rétractable pour une navigation plus claire sur mobile.

const DESKTOP_BREAKPOINT = 768;

function getPageTitleMap() {
  return {
    "accueil.html": "Encodage TEI A1",
    "tei_corpus.html": "Corpus TEI A1",
    "analysis/rapport_analyse.html": "Rapport d'analyse",
  };
}

function initializeNavigation() {
  const pageFrame = document.getElementById("page-frame");
  const pageTitle = document.getElementById("page-title");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!pageFrame || !pageTitle || navLinks.length === 0) {
    return;
  }

  const pageTitles = getPageTitleMap();

  const loadPage = (page) => {
    const nextPage = page || "accueil.html";
    pageFrame.src = nextPage;
    pageTitle.textContent = pageTitles[nextPage] || "Encodage TEI A1";
    document.title = `Portfolio TEI A1 — ${pageTitles[nextPage] || "Accueil"}`;

    navLinks.forEach((link) => {
      const isActive = link.dataset.page === nextPage;
      link.classList.toggle("active", isActive);
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const page = link.dataset.page;
      if (page) {
        loadPage(page);
      }
    });
  });

  loadPage("accueil.html");
}

function initializeCorrectionsToggle() {
  const body = document.body;
  const toggleButton = document.getElementById("toggle-corrections");

  const setCorrectionsVisible = (isVisible) => {
    body.classList.toggle("corrections-visible", isVisible);

    if (toggleButton) {
      toggleButton.textContent = isVisible ? "Masquer les corrections" : "Afficher les corrections";
    }
  };

  setCorrectionsVisible(true);

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const isVisible = body.classList.contains("corrections-visible");
      setCorrectionsVisible(!isVisible);
    });
  }

  const corrections = document.querySelectorAll(".correction");
  corrections.forEach((element) => {
    element.addEventListener("click", () => {
      const type = element.getAttribute("data-type");
      if (type) {
        element.setAttribute("title", `Catégorie : ${type}`);
      }
    });
  });
}

function initializeSidebar() {
  const body = document.body;
  const sidebar = document.getElementById("sidebar");
  const sidebarToggleButton = document.getElementById("sidebar-toggle");
  const sidebarCloseButton = document.getElementById("sidebar-close");
  const sidebarOverlay = document.getElementById("sidebar-overlay");

  if (!sidebar || !sidebarToggleButton) {
    return;
  }

  const isDesktop = () => window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`).matches;

  const applyMobileSidebarState = (isOpen) => {
    sidebar.classList.toggle("is-open", isOpen);
    body.classList.toggle("sidebar-open", isOpen);
    sidebarToggleButton.setAttribute("aria-expanded", String(isOpen));
  };

  const applyDesktopSidebarState = (isCollapsed) => {
    sidebar.classList.toggle("is-collapsed", isCollapsed);
    sidebarToggleButton.setAttribute("aria-expanded", String(!isCollapsed));
  };

  const syncSidebarState = () => {
    if (isDesktop()) {
      sidebar.classList.remove("is-open");
      body.classList.remove("sidebar-open");
      sidebarToggleButton.setAttribute("aria-expanded", String(!sidebar.classList.contains("is-collapsed")));
      return;
    }

    sidebar.classList.remove("is-collapsed");
    body.classList.toggle("sidebar-open", sidebar.classList.contains("is-open"));
    sidebarToggleButton.setAttribute("aria-expanded", String(sidebar.classList.contains("is-open")));
  };

  sidebarToggleButton.addEventListener("click", () => {
    if (isDesktop()) {
      const isCollapsed = sidebar.classList.contains("is-collapsed");
      applyDesktopSidebarState(!isCollapsed);
      return;
    }

    applyMobileSidebarState(!sidebar.classList.contains("is-open"));
  });

  if (sidebarCloseButton) {
    sidebarCloseButton.addEventListener("click", () => {
      if (isDesktop()) {
        applyDesktopSidebarState(true);
        return;
      }

      applyMobileSidebarState(false);
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", () => {
      applyMobileSidebarState(false);
    });
  }

  window.addEventListener("resize", syncSidebarState);

  if (isDesktop()) {
    applyDesktopSidebarState(false);
  } else {
    applyMobileSidebarState(false);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeSidebar();
  initializeCorrectionsToggle();
});
