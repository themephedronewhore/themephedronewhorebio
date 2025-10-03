window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  const startBtn = document.getElementById("start-btn");
  const overlay = document.getElementById("overlay");
  const container = document.querySelector(".container");
  const volumeControl = document.getElementById("volume");
  const audioRing = document.querySelector(".audio-ring");
  const status = document.getElementById("audio-status");

  let ctx, src, analyser, dataArray, bufferLength;

  startBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    container.classList.remove("blurred");

    // Создаём AudioContext прямо по клику
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    src = ctx.createMediaElementSource(audio);
    analyser = ctx.createAnalyser();
    src.connect(analyser);
    analyser.connect(ctx.destination);
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    // Немедленно запускаем аудио
    audio.volume = 0.5;
    audio.play().then(() => {
      status.textContent = "Музыка запущена ✔";
    }).catch(err => {
      console.error("Ошибка воспроизведения:", err);
      status.textContent = "Ошибка воспроизведения: " + err.message;
      overlay.style.display = "flex";
    });

    animateAudioRing();
  });

  volumeControl.addEventListener("input", e => {
    audio.volume = e.target.value;
  });

  function animateAudioRing() {
    requestAnimationFrame(animateAudioRing);
    if (!analyser) return;
    analyser.getByteFrequencyData(dataArray);
    let avg = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
    let scale = 1 + avg / 256;
    audioRing.style.transform = `scale(${scale})`;
    audioRing.style.opacity = 0.5 + avg / 512;
    audioRing.style.boxShadow = `0 0 ${10 + avg / 8}px rgba(255,255,255,0.8), 0 0 ${20 + avg / 4}px rgba(255,255,255,0.4)`;
  }

});
