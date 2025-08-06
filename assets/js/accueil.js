// ==========================================================
// 🔹 Supprime l'overlay d'intro après un court délai
// ==========================================================
function supprimerOverlayIntro() {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const intro = document.querySelector(".intro-overlay");
      if (intro) intro.remove();
    }, 2700);
  });
}

// Si une ancre est présente dans l'URL mais n'existe pas dans la page, on évite le scroll
window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (hash && !document.querySelector(hash)) {
    // scroll en haut
    window.scrollTo({ top: 0, behavior: "auto" });
    history.replaceState(
      "",
      document.title,
      window.location.pathname + window.location.search
    ); // supprime le # de l'URL
  }
});

// ==========================================================
// 🔹 Ajoute une classe .scrolled à la navigation quand on scroll vers le bas
// ==========================================================
function gererEffetScrollSurHeader() {
  const header = document.querySelector(".site-header");
  const isHome = document.body.classList.contains("home");

  if (!header || !isHome) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// ==========================================================
// 🔹 Met à jour la visibilité du slogan selon la slide active
// ==========================================================
function mettreAJourSlogan(swiper) {
  const slogan = document.querySelector(".slogan-diapo");
  const slideActive = swiper.slides[swiper.activeIndex];

  if (slideActive.classList.contains("slide-presentation")) {
    slogan.classList.add("fade-out");
    slogan.classList.remove("fade-in");
  } else {
    slogan.classList.add("fade-in");
    slogan.classList.remove("fade-out");
  }
}

// ==========================================================
// 🔹 Initialise le carrousel Swiper
// ==========================================================
function initialiserDiaporama() {
  new Swiper(".diaporama", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    effect: "fade",
    speed: 800,
    on: {
      init: function () {
        mettreAJourSlogan(this);
      },
      slideChange: function () {
        mettreAJourSlogan(this);
      },
    },
  });
}

// ==========================================================
// 🔹 Applique dynamiquement les images dans les blocs flex (2 images)
// ==========================================================
function initialiserBlocsImagesFlex() {
  document.querySelectorAll(".bloc-images").forEach((bloc) => {
    const imgGauche = bloc.getAttribute("data-img-gauche");
    const imgDroite = bloc.getAttribute("data-img-droite");

    bloc.querySelector(
      ".image-gauche"
    ).style.backgroundImage = `url(${imgGauche})`;
    bloc.querySelector(
      ".image-droite"
    ).style.backgroundImage = `url(${imgDroite})`;
  });
}

// ==========================================================
// 🔹 Gère l'effet de survol sur les encarts (image fond + overlay sombre)
// ==========================================================
function initialiserEffetsSurEncarts() {
  // Si on est en mobile : on ne fait rien
  if (window.matchMedia("(hover: none)").matches) return;

  const colonnes = document.querySelectorAll(".encart-colonne");
  const imagesFond = document.querySelectorAll(".image-fond");
  const overlayGlobal = document.querySelector(".overlay-global");

  // --- Desktop ---
  colonnes.forEach((colonne) => {
    colonne.addEventListener("mouseover", () => {
      const id = colonne.dataset.slide;
      imagesFond.forEach((img) => img.classList.remove("active"));
      const cible = document.querySelector(`.image-fond[data-slide="${id}"]`);
      if (cible) cible.classList.add("active");
      if (overlayGlobal) overlayGlobal.style.opacity = "0";
    });

    colonne.addEventListener("mouseleave", () => {
      if (overlayGlobal) overlayGlobal.style.opacity = "1";
    });
  });
}

// ==========================================================
// 🔹 Active l’animation des traits verticaux quand ils entrent dans le viewport
// ==========================================================
function activerAnimationTraitsVerticaux() {
  const tousLesTraits = document.querySelectorAll(".trait-vertical");
  const traitsAnimes = new Set();

  if (!tousLesTraits.length) return;

  const observateur = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting && !traitsAnimes.has(el)) {
          el.classList.add("visible");
          traitsAnimes.add(el);
          obs.unobserve(el);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  tousLesTraits.forEach((trait) => {
    observateur.observe(trait);
  });
}

// ==========================================================
// 🔹 Fonction globale d'initialisation de la page d'accueil
// ==========================================================
function initialiserAccueil() {
  // Empêche le scroll vers le haut sur les liens href="#" ou ancrés sans cible
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      // Si le href est juste "#" ou qu'aucun élément avec l'ID n'existe
      if (href === "#" || !document.querySelector(href)) {
        e.preventDefault();
      }
    });
  });

  const burger = document.getElementById("burger-menu");
  const menu = document.getElementById("menu-mobile");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      menu.classList.toggle("d-none");
      burger.classList.toggle("open");
    });
  }

  supprimerOverlayIntro();
  gererEffetScrollSurHeader();
  initialiserDiaporama();
  initialiserBlocsImagesFlex();
  initialiserEffetsSurEncarts();
  // ❌ Désactive les effets JS sur encarts si mobile (tactile sans hover)
  if (!window.matchMedia("(hover: none)").matches) {
    initialiserEffetsSurEncarts();
  }
  activerAnimationTraitsVerticaux();
}

// ==========================================================
// 🔹 Appel principal
// ==========================================================
initialiserAccueil();
