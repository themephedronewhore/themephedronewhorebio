window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  const startBtn = document.getElementById("start-btn");
  const overlay = document.getElementById("overlay");
  const container = document.querySelector(".container");
  const volumeControl = document.getElementById("volume");

  // --- АУДИО ---
  startBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    container.classList.remove("blurred");
    audio.volume = 0.2;
    audio.play().catch(console.error);
  });

  volumeControl.addEventListener("input", e => {
    audio.volume = e.target.value;
  });

  // --- СНЕГ ---
  const canvas = document.getElementById("snow");
  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const flakes = Array.from({ length: 150 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 4 + 1,
    d: Math.random() * 150
  }));

  let angle = 0;
  function drawSnow() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (const f of flakes) {
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    }
    ctx.fill();
    angle += 0.01;
    for (const f of flakes) {
      f.y += Math.cos(angle + f.d) + 1 + f.r / 2;
      f.x += Math.sin(angle) * 2;
      if (f.y > height) { f.y = 0; f.x = Math.random() * width; }
    }
    requestAnimationFrame(drawSnow);
  }
  drawSnow();

  // --- КОПИРОВАНИЕ ---
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const wallet = btn.dataset.wallet;
      try {
        await navigator.clipboard.writeText(wallet);
        const old = btn.innerHTML;
        btn.innerHTML = `<span style="color:lime;">Скопировано!</span>`;
        setTimeout(() => btn.innerHTML = old, 1000);
      } catch {
        alert("Не удалось скопировать адрес :(");
      }
    });
  });
});
// ---------- COPY WALLET ----------
const copyButtons = document.querySelectorAll('.copy-btn');
copyButtons.forEach(btn => {
  btn.addEventListener('click', async () => {
    const wallet = btn.getAttribute('data-wallet');
    try {
      await navigator.clipboard.writeText(wallet);
      const original = btn.innerHTML;
      btn.innerHTML = `<span style="color:lime;">Скопировано!</span>`;
      btn.style.transform = 'scale(1.05)';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.transform = 'scale(1)';
      }, 1000);
    } catch (err) {
      console.error('Ошибка копирования:', err);
      alert('Не удалось скопировать :(');
    }
  });
});
