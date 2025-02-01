/**
 * Sets up touch controls by adding event listeners to the touch buttons.
 */
function setupTouchControls() {
    const touchBtns = document.querySelectorAll('.touch-btn');
    
    touchBtns[0].addEventListener('pointerdown', () => (keyboard.LEFT = true));
    touchBtns[0].addEventListener('pointerup', () => (keyboard.LEFT = false));
    
    touchBtns[1].addEventListener('pointerdown', () => (keyboard.RIGHT = true));
    touchBtns[1].addEventListener('pointerup', () => (keyboard.RIGHT = false));
    
    touchBtns[2].addEventListener('pointerdown', () => (keyboard.SPACE = true));
    touchBtns[2].addEventListener('pointerup', () => (keyboard.SPACE = false));
    
    touchBtns[3].addEventListener('pointerdown', () => {
        keyboard.D = true;
        world.objectManager.checkThrowObject();
        lastDTimeout();
    });
    touchBtns[3].addEventListener('pointerup', () => (keyboard.D = false));
    
    touchBtns[4].addEventListener('pointerdown', () => {
        keyboard.F = true;
        world.objectManager.checkBuyBottle();
        lastFTimeout();
    });
    touchBtns[4].addEventListener('pointerup', () => (keyboard.F = false));
}

/**
 * Resets the 'D' key state after a short delay.
 */
function lastDTimeout() {
    setTimeout(() => {
        keyboard.lastD = false;
    }, 300);
}

/**
 * Resets the 'F' key state after a short delay.
 */
function lastFTimeout() {
    setTimeout(() => {
        keyboard.lastF = false;
    }, 300);
}

/**
 * Displays the touch controls.
 */
function addTouchControls() {
    document.getElementById('touch-controls').style.display = 'flex';
}

/**
 * Hides the touch controls.
 */
function removeTouchControls() {
    document.getElementById('touch-controls').style.display = 'none';
}

/**
 * Checks if the screen is small and adjusts touch controls accordingly.
 */
function checkIfSmallScreen() {
    if (window.matchMedia("(pointer: coarse)").matches) {
        addTouchControls();
    } else {
        removeTouchControls();
    }
}

/**
 * Determines if the screen width is considered small (<= 900px).
 * 
 * @returns {boolean} - Returns true if the screen is small.
 */
function isSmallScreen() {
    return window.innerWidth <= 1400;
}

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

document.querySelectorAll('.touch-btn').forEach(button => {
    button.addEventListener('touchstart', (event) => {
        event.preventDefault();
    });
});