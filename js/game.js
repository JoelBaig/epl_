let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let currentTime;
let stoppableIntervalIds = [];
let win = null;
let soundsMuted = false;
let currentView = 'start';
let fullscreen = false;


window.addEventListener('load', checkOrientation);


window.addEventListener('resize', checkOrientation);


window.addEventListener('load', () => {
    localStorage.clear(); 
    checkSoundPreferences();
    init();
    setupTouchControls();
});

/**
 * Checks if the device is a mobile or tablet.
 * 
 * @returns {boolean} True if the device is mobile or tablet, otherwise false.
 */
function isMobileDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Initializes the game by setting up the canvas, hiding unnecessary elements, and configuring controls.
 */
function init() {
    canvas = document.getElementById('canvas');
    hideOnLoadPage();
    setupTouchControls();
    toggleFullscreenIcon();
}

/**
 * Starts the game, initializes the game world, and handles UI changes.
 */
function startGame() {
    if (!gameStarted) {
        currentView = 'game';
        checkIfSmallScreen();
        currentTime = new Date().getTime();
        gameStarted = true;
        hideStartscreen();
        initializeGameWorld();

        if (window.matchMedia("(pointer: coarse)").matches) {
            addTouchControls(); // Zeigt Touch-Steuerung erst jetzt an
        }

        if (soundsMuted) {
            audioManager.muteAll();
        }
        toggleVolumeIcon();
    }
}

/**
 * Restarts the game by resetting necessary values and reinitializing the game world.
 */
function restartGame() {
    win = null;
    document.getElementById('icon-main-con').style.display = 'flex';
    hideEndscreen();
    restartSounds();
    handleFullscreen();
    init();
    startGame();
}

/**
 * Resets the game state and reloads the page to start fresh.
 */
function backToStartscreen() {
    location.reload();
}

/**
 * Initializes the game world, sets up levels, registers sounds, and displays the canvas.
 */
function initializeGameWorld() {
    initLevel();
    registerAllSounds();
    checkIfSoundsMuted();
    document.getElementById('canvas').style.display = 'flex';
    world = new World(canvas, keyboard, gameStarted, currentTime);
}

/**
 * Checks if the Endboss is defeated and triggers the win screen.
 */
function checkIfEndbossIsDead() {
    if (world.endboss.endbossIsDead) {
        win = true;
        setTimeout(() => {
            gameWon();
        }, 2000);
    }
}

/**
 * Checks if the character is dead and triggers the game over screen.
 */
function checkIfCharacterIsDead() {
    if (world.character.characterIsDead) {
        win = false;
        setTimeout(() => {
            gameOver();
        }, 2000);
    }
}

/**
 * Handles the game-winning scenario, updating the UI and stopping the game loop.
 */
function gameWon() {
    currentView = 'gameWon';
    removeTouchControls();
    handleGAmeWonSounds();
    showGameWonScreen();
    stopInterval();
    toggleVolumeIcon();
    gameStarted = false;
}

/**
 * Handles the game-over scenario, updating the UI and stopping the game loop.
 */
function gameOver() {
    currentView = 'gameOver';
    removeTouchControls();
    handleGameOverSounds();
    toggleVolumeIcon();
    stopInterval();
    gameOverScreenTimeout();
}

/**
 * Delays the display of the game-over screen and stops all sounds.
 */
function gameOverScreenTimeout() {
    setTimeout(() => {
        showGameOverScreen();
        gameStarted = false;
        audioManager.muteAll();
    }, 1000);
}

/**
 * Creates a stoppable interval and stores its ID for later clearing.
 * 
 * @param {Function} fn - The function to execute at intervals.
 * @param {number} time - The interval duration in milliseconds.
 */
function setStoppableInterval(fn, time) {
    let intervalId = setInterval(fn, time);
    stoppableIntervalIds.push(intervalId);
}

/**
 * Clears all active stoppable intervals.
 */
function stopInterval() {
    stoppableIntervalIds.forEach(clearInterval);
    stoppableIntervalIds = [];
}

/**
 * Clears a specific interval if it exists.
 * 
 * @param {number} intervalId - The ID of the interval to clear.
 */
function clearSpecificInterval(intervalId) {
    if (intervalId) {
        clearInterval(intervalId);
    }
}