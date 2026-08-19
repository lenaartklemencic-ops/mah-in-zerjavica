(() => {
  const overlay = document.getElementById('visualDemo');
  const openBtn = document.getElementById('visualDemoBtn');
  const closeBtn = document.getElementById('closeVisualDemo');
  const canvas = document.getElementById('weatherCanvas');
  if (!overlay || !openBtn || !closeBtn || !canvas) return;

  const ctx = canvas.getContext('2d');
  const drops = Array.from({ length: 54 }, (_, i) => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: .25 + Math.random() * .75,
    speed: 520 + Math.random() * 720,
    seed: i * 7.31
  }));
  const ripples = [];
  const leaves = Array.from({ length: 5 }, () => ({
    x: Math.random() * canvas.width,
    y: 80 + Math.random() * 700,
    size: 3 + Math.random() * 7,
    phase: Math.random() * Math.PI * 2,
    speed: 18 + Math.random() * 36
  }));
  let running = false;
  let last = 0;
  let elapsed = 0;

  function resetDrop(d) {
    d.x = Math.random() * canvas.width + 120;
    d.y = -30 - Math.random() * 250;
  }

  function frame(now) {
    if (!running) return;
    const dt = Math.max(0, Math.min(.034, (now - last) / 1000 || 0));
    last = now;
    elapsed += dt;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const easingRain = Math.max(.16, .48 - elapsed / 90);
    ctx.lineCap = 'round';
    for (const d of drops) {
      d.y += d.speed * d.z * dt * easingRain;
      d.x -= d.speed * .13 * d.z * dt;
      if (d.y > 910 + Math.sin(d.seed) * 80 || d.x < -30) {
        if (d.z > .55 && Math.random() < .14) ripples.push({ x: d.x, y: Math.min(d.y, 900), life: 1, z: d.z });
        resetDrop(d);
      }
      ctx.strokeStyle = `rgba(210,226,222,${.08 + d.z * .3})`;
      ctx.lineWidth = .7 + d.z * 1.25;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 7 * d.z, d.y + 22 * d.z);
      ctx.stroke();
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.life -= dt * 1.9;
      if (r.life <= 0) { ripples.splice(i, 1); continue; }
      ctx.strokeStyle = `rgba(211,229,224,${r.life * .35})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(r.x, r.y, (1 - r.life) * 18 * r.z, (1 - r.life) * 5 * r.z, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (const leaf of leaves) {
      leaf.x += leaf.speed * dt;
      leaf.y += Math.sin(elapsed * 1.8 + leaf.phase) * 14 * dt;
      if (leaf.x > canvas.width + 25) leaf.x = -25;
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(elapsed * 1.5 + leaf.phase);
      ctx.fillStyle = 'rgba(111,137,67,.62)';
      ctx.beginPath();
      ctx.ellipse(0, 0, leaf.size, leaf.size * .4, .4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(frame);
  }

  function open() {
    overlay.classList.remove('hidden');
    running = true;
    elapsed = 0;
    last = performance.now();
    requestAnimationFrame(frame);
  }
  function close() {
    running = false;
    overlay.classList.add('hidden');
  }
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  addEventListener('keydown', event => {
    if (event.key === 'Escape' && !overlay.classList.contains('hidden')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      close();
    }
  }, true);
})();
