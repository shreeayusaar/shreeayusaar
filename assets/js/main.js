/* ==========================================================================
   Shree Ayusaar Ayurveda - Interactive & Ambient Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Current Year Update
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Email Subscription Form Handling
  const subscribeForm = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('email-input');
  const formMessage = document.getElementById('form-message');

  if (subscribeForm && emailInput && formMessage) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.className = 'form-message error';
        return;
      }

      // Simulate successful subscription
      formMessage.textContent = 'Thank you for connecting! We will notify you upon launch.';
      formMessage.className = 'form-message success';
      emailInput.value = '';

      setTimeout(() => {
        formMessage.style.opacity = '0';
        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.style.opacity = '1';
          formMessage.className = 'form-message';
        }, 300);
      }, 5000);
    });
  }

  // 3. Background Ambient Canvas Particles (Herbal & Gold Sparkles)
  initAmbientCanvas();
});

function initAmbientCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.floor(Math.min(width, height) / 25);
  const particles = [];

  const colors = [
    'rgba(229, 193, 88, ',  // Gold
    'rgba(163, 194, 178, ', // Herbal Green
    'rgba(247, 230, 161, '  // Light Gold
  ];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.5,
      colorPrefix: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      pulse: Math.random() * 0.02 + 0.005
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += Math.sin(Date.now() * p.pulse) * 0.005;

      // Wrap around screen
      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const currentAlpha = Math.max(0.1, Math.min(0.7, p.alpha));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.colorPrefix + currentAlpha + ')';
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(229, 193, 88, 0.4)';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
