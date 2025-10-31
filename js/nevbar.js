// // Mobile Navigation Toggle
// const hamburger = document.querySelector('.hamburger');
// const navLinks = document.querySelector('.nav-links');

// hamburger.addEventListener('click', () => {
//   hamburger.classList.toggle('active');
//   navLinks.classList.toggle('active');
// });

// // Close menu when clicking on a link
// document.querySelectorAll('.nav-links a').forEach(link => {
//   link.addEventListener('click', () => {
//     hamburger.classList.remove('active');
//     navLinks.classList.remove('active');
//   });
// });

function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return; // <- prevent errors if not found

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}
