let isPaused = false; // Track if the game is paused
const pauseOverlay = document.getElementById('pauseOverlay');
const keys = {};

// Function to handle pause toggling
export function togglePause() {
    isPaused = !isPaused;
    
    if (isPaused) {
        pauseOverlay.style.visibility = 'visible';
        pauseOverlay.style.opacity = '1';
    } else {
        pauseOverlay.style.visibility = 'hidden';
        pauseOverlay.style.opacity = '0';
    }
}

// Function to clear keys (stopping player movement) when paused
export function clearKeys() {
    for (let key in keys) {
        keys[key] = false;
    }
}

// Handle window focus and blur
export function handleWindowBlur() {
    isPaused = true;
    pauseOverlay.style.visibility = 'visible';
    pauseOverlay.style.opacity = '1';
    clearKeys(); // Stop movement immediately
}

export function handleWindowFocus() {
    isPaused = false;
    pauseOverlay.style.visibility = 'hidden';
    pauseOverlay.style.opacity = '0';
}
