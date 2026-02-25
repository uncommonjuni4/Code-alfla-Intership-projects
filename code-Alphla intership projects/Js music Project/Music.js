const audio = new Audio();
const playerContainer = document.getElementById('player-container');
const playBtn = document.getElementById('play-btn'); // Updated ID
const playIcon = document.getElementById('play-icon'); // To change ▶ to ⏸
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');

// 🎶 Your Playlist Data
const songs = [
    { title: 'Electronic Drive', artist: 'Synth Wave', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', img: 'https://picsum.photos/250/250?random=1' },
    { title: 'Lofi Morning', artist: 'Chill Beats', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', img: 'https://picsum.photos/250/250?random=2' },
    { title: 'Techno Night', artist: 'Digital Echo', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', img: 'https://picsum.photos/250/250?random=3' },
    { title: 'Sunset Vibes', artist: 'Summer Soul', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', img: 'https://picsum.photos/250/250?random=4' },
    { title: 'Midnight Jazz', artist: 'The Sax Collective', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', img: 'https://picsum.photos/250/250?random=5' },
    { title: 'Deep Focus', artist: 'Ambient Mind', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', img: 'https://picsum.photos/250/250?random=6' },
    { title: 'Cyber Pulse', artist: 'Future Neon', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', img: 'https://picsum.photos/250/250?random=7' },
    { title: 'Mountain Air', artist: 'Acoustic Journey', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', img: 'https://picsum.photos/250/250?random=8' }
];

let songIndex = 0;

// Load the song details
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    cover.src = song.img;
}

// Toggle Play/Pause and update the icon
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playIcon.innerText = '⏸';
        playerContainer.classList.add('playing');
    } else {
        audio.pause();
        playIcon.innerText = '▶';
        playerContainer.classList.remove('playing');
    }
}

// ⏳ Format Time (Seconds to MM:SS)
function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// 📈 Update Progress Bar and Timer Labels
audio.addEventListener('timeupdate', () => {
    const { duration, currentTime } = audio;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        currentTimeEl.innerText = formatTime(currentTime);
        durationEl.innerText = formatTime(duration);
    }
});

// 🖱️ Click on Progress Bar to Seek
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    if (audio.duration) {
        audio.currentTime = (clickX / width) * audio.duration;
    }
});

// Change Song Logic
function changeSong(direction) {
    // 1. Calculate the new index
    songIndex = (songIndex + direction + songs.length) % songs.length;
    
    // 2. Load the new data into elements
    loadSong(songs[songIndex]);
    
    // 3. Reset the audio state ⏱️
    audio.currentTime = 0; 
    progress.style.width = '0%'; // Reset the visual bar immediately
    
    // 4. Play the new song
    audio.play();
    playIcon.innerText = '⏸';
    playerContainer.classList.add('playing');
}

// 🔊 Volume Control
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Event Listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeSong(-1));
nextBtn.addEventListener('click', () => changeSong(1));
audio.addEventListener('ended', () => changeSong(1));

// Initial Load
loadSong(songs[songIndex]);