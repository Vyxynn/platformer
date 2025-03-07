// * Global settings
const player = document.getElementById('player');
const pauseOverlay = document.getElementById('pauseOverlay');
const keys = {};
let isPaused = false;
let jumpCount = 0; // Track how many jumps are used

// * Player settings
const speed = 2; // Horizontal movement speed
const gravity = 0.1; // Gravity force
const jumpStrength = 7; // Jump force
let velocityY = 0; // Vertical velocity
const maxJumps = 2; // Allow two jumps (double jump)
const startingPlayerX = 20; // Starting X position
const startingPlayerY = window.innerHeight - player.offsetHeight; // Starting Y position

// * Keybinds (Multiple keybinds allowed for each action)
const keybinds = {
    moveLeft: ['a', 'ArrowLeft'], // Can move left using 'a' or 'ArrowLeft'
    moveRight: ['d', 'ArrowRight'], // Can move right using 'd' or 'ArrowRight'
    jump: [' ', 'w', 'ArrowUp'], // Can jump using 'space', 'w' or 'ArrowUp'
    pause: ['Escape', 'p'] // Can pause using 'Escape'
};

// Set the player's starting position
player.style.left = `${startingPlayerX}px`;
player.style.top = `${startingPlayerY}px`;

// * Event Listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
window.addEventListener('blur', handleWindowBlur);

// * Movement functions
function handleKeyDown(event){
    for(let action in keybinds){
        if(keybinds[action].includes(event.key)){
            keys[action] = true;

            if(action === 'pause'){
                togglePause();
            }
        } 
    }

    // if (event.key === 'Escape') {
    //     togglePause(); // Pause/unpause when Escape is pressed
    // }

    if (!isPaused) {
        for (let action in keybinds) {
            if (keybinds[action].includes(event.key)) {
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
    for (let action in keybinds) {
        if (keybinds[action].includes(event.key)) {
            keys[action] = false;
        }
    }
}

// Pause movement when window loses focus (tabbing out)
function handleWindowBlur() {
    isPaused = true; // Pauses player movement
    pauseOverlay.style.visibility = 'visible';
    pauseOverlay.style.opacity = '1';
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
    } else {
        pauseOverlay.style.visibility = 'hidden';
        pauseOverlay.style.opacity = '0';
        movePlayer(); // Resume game when unpaused
    }
}

// * Player movement logic
function movePlayer() {
    if (isPaused) return; // Stop updating if paused

    const playerRect = player.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let newX = player.offsetLeft;

    // Left and right movement
    if (keys.moveLeft && playerRect.left > 0) newX -= speed;
    if (keys.moveRight && playerRect.right < screenWidth) newX += speed;

    // Apply gravity
    velocityY += gravity;

    let newY = player.offsetTop + velocityY;

    // Collision with the ground
    if (newY + playerRect.height >= screenHeight) {
        newY = screenHeight - playerRect.height; // Keep player on the ground
        velocityY = 0; // Stop falling
        jumpCount = 0; // Reset jumps when landing
    }

    player.style.left = `${newX}px`;
    player.style.top = `${newY}px`;

    if (!isPaused) {
        requestAnimationFrame(movePlayer); // Keep updating the player's position only if not paused
    }
}

// Start moving the player immediately
movePlayer();
