const fpsDisplay = document.getElementById("fpsCounter");

let lastTime = performance.now();
let frames = 0;
let fps = 0;

function updateFPS(time) {
    frames++;

    if (time - lastTime >= 1000) { 
        fps = frames;
        frames = 0;
        lastTime = time;
        fpsDisplay.innerText = `FPS: ${fps}`;
    }

    requestAnimationFrame(updateFPS);
}

requestAnimationFrame(updateFPS);