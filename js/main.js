/* ============================================
   Ember & Oak — Professional Site JS
   ============================================ */

// Mobile menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    })
  );
}

// Reveal on scroll (progressive enhancement, no-op if missing)
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Menu tabs ----------
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    const panel = document.getElementById(`tab-${tab.dataset.tab}`);
    if (panel) panel.classList.add("active");
  });
});

// ---------- Gallery filter + lightbox ----------
const filterBtns = document.querySelectorAll(".filter-btn");
const items = document.querySelectorAll(".g-item");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    items.forEach((item) => {
      const show = f === "all" || item.dataset.cat === f;
      item.classList.toggle("hidden", !show);
    });
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
if (lightbox) {
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      lightboxImg.src = img.src;
      lightbox.classList.add("open");
    });
  });
  lightboxClose.addEventListener("click", () => lightbox.classList.remove("open"));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("open");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") lightbox.classList.remove("open");
  });
}

// ---------- Contact form (front-end demo) ----------
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("c-name").value.trim();
    const phone = document.getElementById("c-phone").value.trim();
    const date = document.getElementById("c-date").value;
    const time = document.getElementById("c-time").value;
    const type = document.getElementById("c-type").value;
    const note = document.getElementById("formNote");
    note.style.color = "#f0a55a";
    note.textContent = `✅ Request received, ${name.split(" ")[0]}! We'll confirm your ${type.toLowerCase()} for ${date} at ${time} on ${phone}.`;
    contactForm.reset();
  });
}
