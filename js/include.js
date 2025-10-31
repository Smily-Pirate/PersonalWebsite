// async function includeHTML() {
//   // 1️⃣ Load header & footer
//   const header = await fetch("headerFooter/header.html").then(res => res.text());
//   const footer = await fetch("headerFooter/footer.html").then(res => res.text());

//   // 2️⃣ Insert them into DOM
//   document.getElementById("header").innerHTML = header;
//   document.getElementById("footer").innerHTML = footer;

//   initNavbar();

//   // 3️⃣ Now that header is inserted, highlight active link
//   const currentPage = window.location.pathname.split("/").pop();
//   document.querySelectorAll(".nav-links a").forEach(link => {
//     if (link.getAttribute("href") === currentPage) {
//       link.classList.add("active");
//     }
//   });
// }

// includeHTML();
// async function includeHTML() {
//   const header = await fetch("headerFooter/header.html").then(res => res.text());
//   const footer = await fetch("headerFooter/footer.html").then(res => res.text());

//   document.getElementById("header").innerHTML = header;
//   document.getElementById("footer").innerHTML = footer;

//   // Initialize navbar
//   initNavbar();

//   // Highlight active link
//   const currentPage = window.location.pathname.split("/").pop();
//   document.querySelectorAll(".nav-links a").forEach(link => {
//     if (link.getAttribute("href") === currentPage) {
//       link.classList.add("active");
//     }
//   });

//   // ✅ Fade in after everything loads
//   document.body.classList.add("loaded");
// }

// includeHTML();


async function includeHTML() {
  const headerContainer = document.getElementById("header");
  const footerContainer = document.getElementById("footer");

  // === Load from localStorage if available ===
  const cachedHeader = localStorage.getItem("site_header");
  const cachedFooter = localStorage.getItem("site_footer");
  const cacheTime = localStorage.getItem("site_cache_time");
  const now = Date.now();

  if (cachedHeader && cachedFooter && cacheTime && now - cacheTime < 24 * 60 * 60 * 1000) {
    headerContainer.innerHTML = cachedHeader;
    footerContainer.innerHTML = cachedFooter;
  } else {
    const [header, footer] = await Promise.all([
      fetch("headerFooter/header.html").then(res => res.text()),
      fetch("headerFooter/footer.html").then(res => res.text())
    ]);

    headerContainer.innerHTML = header;
    footerContainer.innerHTML = footer;

    localStorage.setItem("site_header", header);
    localStorage.setItem("site_footer", footer);
    localStorage.setItem("site_cache_time", now);
  }

  // === Init navbar after inserting ===
  initNavbar()

  // === Highlight active link ===
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // === Add fade-in once ready ===
  document.body.classList.add("loaded");

  // === Smooth navigation (fade-out + redirect) ===
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");

      // Prevent reload if already on same page
      if (href === currentPage) return;

      e.preventDefault();
      document.body.classList.remove("loaded");
      setTimeout(() => {
        window.location.href = href;
      }, 300); // matches CSS transition time
    });
  });
}

includeHTML();
