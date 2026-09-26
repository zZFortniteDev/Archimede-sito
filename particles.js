/**
 * Technical Blueprint & CAD Precision Guides - Workshop/Laboratory Style
 * Replaces cosmic gaming particles with architectural engineering crosshairs
 */

(function () {
  const canvas = document.getElementById('tech-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;

  const mouse = {
    x: null,
    y: null,
    isActive: false
  };

  function resizeCanvas() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);
  }

  // Punti di intersezione CAD fissi
  const GRID_SIZE = 120;

  function drawTechnicalGuides() {
    ctx.clearRect(0, 0, width, height);

    // Disegna sottili crocette (+) ai nodi della griglia
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    for (let x = GRID_SIZE; x < width; x += GRID_SIZE) {
      for (let y = GRID_SIZE; y < height; y += GRID_SIZE) {
        // Piccola crocetta di 6px
        ctx.beginPath();
        ctx.moveTo(x - 3, y);
        ctx.lineTo(x + 3, y);
        ctx.moveTo(x, y - 3);
        ctx.lineTo(x, y + 3);
        ctx.stroke();
      }
    }
    ctx.restore();

    // Linee guida laser interattive che seguono il cursore (Precisione Officina/CAD)
    if (mouse.isActive && mouse.x !== null) {
      ctx.save();
      
      // Linea orizzontale laser sottile
      ctx.beginPath();
      ctx.moveTo(0, mouse.y);
      ctx.lineTo(width, mouse.y);
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.22)';
      ctx.setLineDash([4, 8]);
      ctx.lineWidth = 1;
      ctx.stroke();

      // Linea verticale laser sottile
      ctx.beginPath();
      ctx.moveTo(mouse.x, 0);
      ctx.lineTo(mouse.x, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Mirino centrale di precisione sul cursore
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#7c3aed';
      ctx.fill();

      ctx.restore();
    }
  }

  let rafId;
  function loop() {
    drawTechnicalGuides();
    rafId = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(rafId);
    resizeCanvas();
    loop();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isActive = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.isActive = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.isActive = true;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.isActive = false;
  });

  resizeCanvas();
  loop();
})();
