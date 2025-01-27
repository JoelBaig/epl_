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
    init();
    setupTouchControls();
});


/**
 * Prüft, ob es sich um ein mobiles Gerät oder Tablet handelt
 */
function isMobileDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}


function init() {
    canvas = document.getElementById('canvas');
    hideOnLoadPage();
    setupTouchControls();
    toggleFullscreenIcon();
}


function startGame() {
    if (!gameStarted) {
        currentView = 'game';
        checkIfSmallScreen();
        currentTime = new Date().getTime();
        gameStarted = true;
        hideStartscreen();
        initializeGameWorld();
        if (soundsMuted) {
            audioManager.muteAll();
        }
        toggleVolumeIcon();
    }
}


function initializeGameWorld() {
    initLevel();
    registerAllSounds();
    checkIfSoundsMuted();
    document.getElementById('canvas').style.display = 'flex';
    world = new World(canvas, keyboard, gameStarted, currentTime);
}


function showEndscreen() {
    checkIfEndbossIsDead();
    checkIfEndbossIsDead();
}


function checkIfEndbossIsDead() {
    if (world.endboss.endbossIsDead) {
        win = true;
        setTimeout(() => {
            gameWon();
        }, 2000);
    }
}


function checkIfCharacterIsDead() {
    if (world.character.characterIsDead) {
        win = false;
        setTimeout(() => {
            gameOver();
        }, 2000);
    }
}


function gameWon() {
    currentView = 'gameWon';
    removeTouchControls();
    handleGAmeWonSounds();
    showGameWonScreen();
    stopInterval();
    toggleVolumeIcon();
    gameStarted = false;
}


function gameOver() {
    currentView = 'gameOver';
    removeTouchControls();
    handleGameOverSounds();
    toggleVolumeIcon();
    stopInterval();
    gameOverScreenTimeout();
}


function gameOverScreenTimeout() {
    setTimeout(() => {
        showGameOverScreen();
        gameStarted = false;
        audioManager.muteAll();
    }, 1000);
}


function restartGame() {
    win = null;
    document.getElementById('icon-main-con').style.display = 'flex';
    hideEndscreen();
    restartSounds();
    handleFullscreen();
    init();
    startGame();
}


function handleFullscreen() {
    fullscreenWasntActive();
    fullscreenWasActive();
}


function fullscreenWasntActive() {
    if (!fullscreen) {
        toggleVolumeIcon();
    }
}


function fullscreenWasActive() {
    let wasFullscreen = fullscreen;
    if (wasFullscreen) {
        enterCanvasFullscreen();
    } else {
        toggleFullscreenIcon();
    }
}


function backToStartscreen() {
    location.reload();
}


function setStoppableInterval(fn, time) {
    let intervalId = setInterval(fn, time);
    stoppableIntervalIds.push(intervalId);
}


function stopInterval() {
    stoppableIntervalIds.forEach(clearInterval);
    stoppableIntervalIds = [];
}


function clearSpecificInterval(intervalId) {
    if (intervalId) {
        clearInterval(intervalId);
    }
}
