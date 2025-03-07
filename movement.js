// * Global settings
const player = document.getElementById('player');
const pauseOverlay = document.getElementById('pauseOverlay');
const playerXDisplay = document.getElementById('playerXDisplay');
const playerYDisplay = document.getElementById('playerYDisplay');
const keys = {};
let isPaused = false;
let jumpCount = 0; // Track how many jumps are used
let lastTime = performance.now(); // Store the time of the last frame
let animationFrameId; // Store requestAnimationFrame ID

// * Player settings
const speed = 5; // Horizontal movement speed
const gravity = 0.3; // Gravity force
const jumpStrength = 10; // Jump force
let velocityY = 0; // Vertical velocity
const maxJumps = 2; // Allow two jumps (double jump)
const startingPlayerX = 20; // Starting X position
const startingPlayerY = window.innerHeight - player.offsetHeight; // Starting Y position

// * Keybinds (Multiple keybinds allowed for each action)
const keybinds = {
    moveLeft: ['a', 'arrowleft'], // Can move left using 'a' or 'ArrowLeft'
    moveRight: ['d', 'arrowright'], // Can move right using 'd' or 'ArrowRight'
    jump: [' ', 'w', 'arrowup'], // Can jump using 'space', 'w' or 'ArrowUp'
    pause: ['escape', 'p'] // Can pause using 'Escape' or 'p'
};

// Set the player's starting position
player.style.left = `${startingPlayerX}px`;
player.style.top = `${startingPlayerY}px`;

// * Event Listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
window.addEventListener('blur', handleWindowBlur);

// * Movement functions
function handleKeyDown(event) {
    const key = event.key.toLowerCase();
    for (let action in keybinds) {
        if (keybinds[action].includes(key)) {
            keys[action] = true;

            if (action === 'pause') {
                togglePause();
            }
        }
    }

    if (!isPaused) {
        for (let action in keybinds) {
            if (keybinds[action].includes(key)) {
                keys[action] = true;

                // Jumping logic
                if (action === 'jump' && jumpCount < maxJumps) {
                    velocityY = -jumpStrength; // Apply jump force
                    jumpCount++; // Increment jump count
                }
            }
        }
    }
}

function handleKeyUp(event) {
    const key = event.key.toLowerCase();
    for (let action in keybinds) {
        if (keybinds[action].includes(key)) {
            keys[action] = false;
        }
    }
}

// Pause movement when window loses focus (tabbing out)
function handleWindowBlur() {
    isPaused = true; // Pauses player movement
    pauseOverlay.style.visibility = 'visible';
    pauseOverlay.style.opacity = '1';
    cancelAnimationFrame(animationFrameId); // Stop movement updates
    clearKeys(); // Stop movement
}

// Function to stop all movement when focus is lost
function clearKeys() {
    for (let action in keys) {
        keys[action] = false;
    }
}

// * Pause functionality
function togglePause() {
    isPaused = !isPaused;

    if (isPaused) {
        pauseOverlay.style.visibility = 'visible';
        pauseOverlay.style.opacity = '1';
        cancelAnimationFrame(animationFrameId); // Stop movement updates
    } else {
        pauseOverlay.style.visibility = 'hidden';
        pauseOverlay.style.opacity = '0';
        lastTime = performance.now(); // Reset lastTime to prevent big jumps
        movePlayer(); // Resume movement
    }
}

// * Player movement logic
function movePlayer(timestamp = performance.now()) {
    if (isPaused) return; // Stop updating if paused

    const deltaTime = (timestamp - lastTime) / 1000; // Convert from ms to seconds
    lastTime = timestamp;

    const playerRect = player.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let newX = player.offsetLeft;

    // Normalize movement by multiplying with deltaTime
    if (keys.moveLeft && playerRect.left > 0) newX -= speed * deltaTime * 60;
    if (keys.moveRight && playerRect.right < screenWidth) newX += speed * deltaTime * 60;

    // Apply gravity with delta time scaling
    velocityY += gravity * deltaTime * 60;

    let newY = player.offsetTop + velocityY * deltaTime * 60;

    // Collision with the ground
    if (newY + playerRect.height >= screenHeight) {
        newY = screenHeight - playerRect.height; // Keep player on the ground
        velocityY = 0; // Stop falling
        jumpCount = 0; // Reset jumps when landing
    }

    player.style.left = `${newX}px`;
    player.style.top = `${newY}px`;
    playerXDisplay.textContent = `${parseInt(newX)}`;
    playerYDisplay.textContent = `${parseInt(newY)}`;

    animationFrameId = requestAnimationFrame(movePlayer); // Keep updating the player's position
}

// Start moving the player immediately
movePlayer();
