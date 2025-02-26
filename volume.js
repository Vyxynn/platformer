// Load the YouTube IFrame API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
// Called when the YouTube IFrame API is ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'P6Segk8cr-c',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Called when the player is ready
function onPlayerReady(event) {
    event.target.playVideo();
}

// Called when the player's state changes
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        event.target.playVideo();
    }
}

// Create a hidden div element to hold the YouTube player
var playerDiv = document.createElement('div');
playerDiv.id = 'player';
playerDiv.style.display = 'none';
document.body.appendChild(playerDiv);

// Toggle mute/unmute the player
function toggleMute() {
    const button = document.querySelector('.mute-button');
    if (button.textContent === 'Mute') {
        button.textContent = 'Unmute';
        player.mute();
    } else {
        button.textContent = 'Mute';
        player.unMute();
    }
}

const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');
const volumeValue = document.getElementById('volumeValue');
let lastVolume = volumeSlider.value;

// Update volume icon and value when the slider is moved
volumeSlider.addEventListener('input', function() {
    const volume = volumeSlider.value;
    volumeValue.textContent = volume;
    if (volume == 0) {
        volumeIcon.src = './assets/volume0.png';
    } else if (volume > 0 && volume <= 50) {
        volumeIcon.src = './assets/volume1.png';
    } else {
        volumeIcon.src = './assets/volume2.png';
    }
    lastVolume = volume;
});

// Mute/unmute the player when the volume icon is clicked
volumeIcon.addEventListener('click', function() {
    if (volumeSlider.value > 0) {
        lastVolume = volumeSlider.value;
        volumeSlider.value = 0;
        volumeValue.textContent = 0;
        volumeIcon.src = './assets/volume0.png';
        player.setVolume(0);
    } else {
        volumeSlider.value = lastVolume;
        volumeValue.textContent = lastVolume;
        if (lastVolume > 0 && lastVolume <= 50) {
            volumeIcon.src = './assets/volume1.png';
        } else {
            volumeIcon.src = './assets/volume2.png';
        }
        player.setVolume(lastVolume);
    }
});

// Update player volume when the slider is moved
volumeSlider.addEventListener('input', function() {
    const volume = volumeSlider.value;
    volumeValue.textContent = volume;
    if (volume == 0) {
        volumeIcon.src = './assets/volume0.png';
    } else if (volume > 0 && volume <= 50) {
        volumeIcon.src = './assets/volume1.png';
    } else {
        volumeIcon.src = './assets/volume2.png';
    }
    player.setVolume(volume);
    lastVolume = volume;
});