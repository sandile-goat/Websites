const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  menuToggle.textContent = navLinks.classList.contains("show") ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuToggle.textContent = "☰";
  });
});

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".slider-dot");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
  currentSlide = index;
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

setInterval(() => {
  showSlide((currentSlide + 1) % slides.length);
}, 7000);

document.querySelectorAll(".faq-item button").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    const isActive = item.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach(faq => {
      faq.classList.remove("active");
      faq.querySelector("span").textContent = "+";
    });

    if (!isActive) {
      item.classList.add("active");
      button.querySelector("span").textContent = "−";
    }
  });
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    form.innerHTML = `
      <div style="text-align:center;padding:50px 20px">
        <h3>Request Received</h3>
        <p>Thank you. Your discovery workshop request has been recorded.</p>
        <p>A Statik Consultants representative will contact you soon.</p>
      </div>
    `;
  });
}

const canvas = document.getElementById("dataCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({ length: 85 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    }));
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,229,255,0.85)";
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(123,97,255,${1 - distance / 120})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  drawParticles();
}
