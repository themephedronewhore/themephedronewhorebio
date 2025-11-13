window.addEventListener("DOMContentLoaded", () => {
  const volumeControl = document.getElementById("volume");

  // ---------- SNOW ----------
  const canvas = document.getElementById("snow");
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const numFlakes = 150;
  const flakes = [];
  for (let i = 0; i < numFlakes; i++) {
    flakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 4 + 1,
      d: Math.random() * numFlakes,
    });
  }

  function drawSnow() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let f of flakes) {
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    }
    ctx.fill();
    moveSnow();
    requestAnimationFrame(drawSnow);
  }

  let angle = 0;
  function moveSnow() {
    angle += 0.01;
    for (let f of flakes) {
      f.y += Math.cos(angle + f.d) + 1 + f.r / 2;
      f.x += Math.sin(angle) * 2;
      if (f.y > height) {
        f.y = 0;
        f.x = Math.random() * width;
      }
    }
  }

  drawSnow();
});
