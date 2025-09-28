let snowflakeCount = 0;
const maxSnowflakes = 100;
function createSnowflakes() {
    if (snowflakeCount >= maxSnowflakes) return;
    
    const newSnowflakes = 15;
    for (let i = 0; i < newSnowflakes && snowflakeCount < maxSnowflakes; i++) {
        let snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.style.left = Math.random() * 100 + "vw";
        snowflake.style.animationDuration = (Math.random() * 4 + 3) + "s";
        snowflake.style.width = snowflake.style.height = (Math.random() * 2 + 2) + "px";
        document.body.appendChild(snowflake);
        snowflakeCount++;
        
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
            snowflakeCount--;
        });
    }
}
setInterval(createSnowflakes, 1000);
createSnowflakes();

const playlist = [
    'sounds/Мне надоело.mp3',
    'sounds/Снег.mp3',
    'sounds/song3.mp3',
    'sounds/song4.mp3',
    'sounds/song4.mp3',
    'sounds/song5.mp3',
    'sounds/song6.mp3',
    'sounds/song7.mp3',
    'sounds/song8.mp3',
    'sounds/song9.mp3',
    'sounds/song10.mp3',
    'sounds/song11.mp3',
    // Добавьте сюда все песни из папки sounds
];
let currentTrack = 0;
const audio = new Audio(playlist[currentTrack]);
const playPauseButton = document.getElementById('play-pause-btn');
const progress = document.getElementById('audio-progress');
const songTitle = document.getElementById('song-title');
let isPlaying = false;

function loadTrack(trackIndex) {
    audio.src = playlist[trackIndex];
    audio.load();
    songTitle.innerText = playlist[trackIndex].split('/').pop().replace('.mp3', '');
}

audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1);
    if (currentTrack >= playlist.length) {
        currentTrack = 0;
    }
    loadTrack(currentTrack);
    audio.play();
    playPauseButton.innerHTML = '❙❙';
    isPlaying = true;
});

function setVolume(value) {
    audio.volume = value / 100;
}

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.innerHTML = '▶';
    } else {
        audio.play();
        playPauseButton.innerHTML = '❙❙';
    }
    isPlaying = !isPlaying;
});

document.getElementById('prev-btn').addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    if (isPlaying) {
        audio.play();
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    if (isPlaying) {
        audio.play();
    }
});

// Загрузка первого трека при запуске
loadTrack(currentTrack);
setVolume(100); // Установка начальной громкости на максимум
