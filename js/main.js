// ПРЕЛОАДЕР
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader')?.classList.add('hidden'), 900);
  });
  
  // NAV при скролле
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = document.getElementById('progressBar');
    if (p) p.style.width = (window.scrollY / h * 100) + '%';
  });
  
  // Burger
  const burger = document.querySelector('.burger');
  const links = document.querySelector('.nav-links');
  burger?.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger?.classList.remove('open');
    links.classList.remove('open');
  }));
  
  // Активная ссылка
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
  
  // Курсор
  const glow = document.getElementById('cursorGlow');
  document.addEventListener('mousemove', e => {
    if (glow) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }
  });
  
  // Reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }});
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  
  // Particles
  const cv = document.getElementById('particles');
  if (cv) {
    const ctx = cv.getContext('2d');
    let dots = [];
    const resize = () => { cv.width = innerWidth; cv.height = innerHeight; };
    resize(); addEventListener('resize', resize);
    for (let i = 0; i < 50; i++) {
      dots.push({
        x: Math.random() * cv.width, y: Math.random() * cv.height,
        vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
        r: Math.random() * 1.8 + .4
      });
    }
    (function loop() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > cv.width) d.vx *= -1;
        if (d.y < 0 || d.y > cv.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(217,164,65,.5)';
        ctx.fill();
      });
      for (let i = 0; i < dots.length; i++)
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(217,164,65,${.16 * (1 - dist / 130)})`;
            ctx.stroke();
          }
        }
      requestAnimationFrame(loop);
    })();
  }
  
  // Toast
  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('show'), 50);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 500); }, 3200);
  }