// menu.js
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  const sections = document.querySelectorAll(".fade-in-section");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-visible");
        observer.unobserve(entry.target); // on arrête d'observer une fois visible
      }
    });
  }, { threshold: 0.2 }); // la section est visible à 20% dans le viewport

  sections.forEach(section => observer.observe(section));

  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }

  // ===== Formspree (no redirect) =====
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = "Sending...";
  status.className = "text-gray-400";

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      status.textContent = "Message sent successfully!";
      status.className = "text-green-400 mt-2";
      form.reset();
    } else {
      status.textContent = "There was an error. Please try again.";
      status.className = "text-red-400 mt-2";
    }
  } catch (error) {
    status.textContent = "Network error. Please try again.";
    status.className = "text-red-400 mt-2";
  }
});
});
