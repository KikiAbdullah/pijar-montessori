/* Rumah Pijar Pandaan — interaksi kecil nan ceria */

document.addEventListener("DOMContentLoaded", () => {
  /* Tahun dinamis di footer */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Header: bayangan saat di-scroll */
  const header = document.getElementById("siteHeader");
  const onScrollHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* Menu mobile */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  const iconOpen = document.getElementById("navIconOpen");
  const iconClose = document.getElementById("navIconClose");

  const setMenu = (open) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    iconOpen.style.display = open ? "none" : "";
    iconClose.style.display = open ? "" : "none";
  };

  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => setMenu(false))
  );

  /* Reveal halus saat elemen masuk viewport */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

  /* Scrollspy: tandai tautan nav yang sedang aktif */
  const navLinks = [...menu.querySelectorAll('a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          navLinks.forEach((link) =>
            link.classList.toggle("active", link.getAttribute("href") === id)
          );
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((section) => spyObserver.observe(section));
});
