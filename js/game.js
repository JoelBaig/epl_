let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let currentTime;
let stoppableIntervalIds = [];
let win = null;
let soundsMuted = false;
let currentView = 'start';


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


function setupTouchControls() {
    const touchBtns = document.querySelectorAll('.touch-btn');

    touchBtns[0].addEventListener('pointerdown', () => (keyboard.LEFT = true));
    touchBtns[0].addEventListener('pointerup', () => (keyboard.LEFT = false));
    touchBtns[1].addEventListener('pointerdown', () => (keyboard.RIGHT = true));
    touchBtns[1].addEventListener('pointerup', () => (keyboard.RIGHT = false));
    touchBtns[2].addEventListener('pointerdown', () => (keyboard.SPACE = true));
    touchBtns[2].addEventListener('pointerup', () => (keyboard.SPACE = false));
    touchBtns[3].addEventListener('pointerdown', () => (keyboard.D = true));
    touchBtns[3].addEventListener('pointerup', () => (keyboard.D = false));
    touchBtns[4].addEventListener('pointerdown', () => (keyboard.F = true));
    touchBtns[4].addEventListener('pointerup', () => (keyboard.F = false));
}


function addTouchControls() {
    document.getElementById('touch-controls').style.display = 'flex';
}


function removeTouchControls() {
    document.getElementById('touch-controls').style.display = 'none';
}


function isSmallScreen() {
    return window.innerWidth <= 900;
}


function enterCanvasFullscreen() {
    const startscreen = document.getElementById('start-screen');
    const canvas = document.getElementById('canvas');
    const iconMainCon = document.getElementById('icon-main-con');
    const enterFullscreenIcon = document.getElementById('fullscreen-icon');
    const exitFullscreenIcon = document.getElementById('exit-fullscreen-icon');
    const startBtn = document.getElementById('start-btn');
    const infoBtns = document.getElementById('info-btns');
    const restartImg = document.getElementById('restart-img');
    const gameOverBgr = document.getElementById('game-over-bgr');
    const gameOverImg = document.getElementById('game-over-img');
    const gameOverScreen = document.getElementById('game-over-screen');
    manageEnterFullscreen(startscreen, canvas, iconMainCon, enterFullscreenIcon, exitFullscreenIcon, startBtn, infoBtns, restartImg, gameOverBgr, gameOverImg, gameOverScreen);
}


function manageEnterFullscreen(startscreen, canvas, iconMainCon, enterFullscreenIcon, exitFullscreenIcon, startBtn, infoBtns, restartImg, gameOverBgr, gameOverImg, gameOverScreen) {
    startscreen.classList.add('start-fullscreen');
    canvas.classList.add('canvas-fullscreen');
    canvas.classList.remove('canvas');
    enterFullscreenIcon.classList.add('d-none');
    exitFullscreenIcon.classList.remove('d-none');
    iconMainCon.classList.remove('icon-main-con');
    iconMainCon.classList.add('icon-main-con-fullscreen');
    startBtn.classList.add('startscreen-btns-fullscreen');
    infoBtns.classList.add('info-btns-fullscreen');
    restartImg.classList.remove('restart-img');
    restartImg.classList.add('restart-img-fullscreen-game-over');
    gameOverBgr.classList.remove('endscreen-bgr');
    gameOverBgr.classList.add('endscreen-bgr-fullscreen');
    gameOverImg.classList.remove('game-over-img');
    gameOverImg.classList.add('game-over-img-fullscreen');
    gameOverScreen.classList.remove('game-over-screen');
    gameOverScreen.classList.add('game-over-screen-fullscreen');
}


function exitCanvasFullscreen() {
    const startscreen = document.getElementById('start-screen');
    const canvas = document.getElementById('canvas');
    const iconMainCon = document.getElementById('icon-main-con');
    const enterFullscreenIcon = document.getElementById('fullscreen-icon');
    const exitFullscreenIcon = document.getElementById('exit-fullscreen-icon');
    const startBtn = document.getElementById('start-btn');
    const infoBtns = document.getElementById('info-btns');
    manageGameOverFullscreen();
    manageExitFullscreen(startscreen, canvas, iconMainCon, enterFullscreenIcon, exitFullscreenIcon, startBtn, infoBtns);
}


function manageExitFullscreen(startscreen, canvas, iconMainCon, enterFullscreenIcon, exitFullscreenIcon, startBtn, infoBtns) {
    startscreen.classList.remove('start-fullscreen');
    canvas.classList.remove('canvas-fullscreen');
    canvas.classList.add('canvas');
    enterFullscreenIcon.classList.remove('d-none');
    exitFullscreenIcon.classList.add('d-none');
    iconMainCon.classList.add('icon-main-con');
    iconMainCon.classList.remove('icon-main-con-fullscreen');
    startBtn.classList.remove('startscreen-btns-fullscreen');
    infoBtns.classList.remove('info-btns-fullscreen');

}


function manageGameOverFullscreen() {
    const restartImg = document.getElementById('restart-img');
    const gameOverBgr = document.getElementById('game-over-bgr');
    const gameOverImg = document.getElementById('game-over-img');
    const gameOverScreen = document.getElementById('game-over-screen');
    restartImg.classList.add('restart-img');
    restartImg.classList.remove('restart-img-fullscreen-game-over');
    gameOverBgr.classList.add('endscreen-bgr');
    gameOverBgr.classList.remove('endscreen-bgr-fullscreen');
    gameOverImg.classList.add('game-over-img');
    gameOverImg.classList.remove('game-over-img-fullscreen');
    gameOverScreen.classList.add('game-over-screen');
    gameOverScreen.classList.remove('game-over-screen-fullscreen');
}


function toggleFullscreenIcon() {
    const enterFullscreenIcon = document.getElementById('fullscreen-icon');
    const exitFullscreenIcon = document.getElementById('exit-fullscreen-icon');

    if (isMobileDevice()) {
        enterFullscreenIcon.classList.add('d-none');
        exitFullscreenIcon.classList.add('d-none');
    } else {
        enterFullscreenIcon.classList.remove('d-none');
        exitFullscreenIcon.classList.add('d-none');
    }
}


function checkOrientation() {
    const overlay = document.getElementById('rotate-device-overlay');

    if (window.innerWidth <= 900 && window.innerHeight > window.innerWidth) {
        overlay.style.display = 'flex';
        hideAllScreens();
    } else {
        overlay.style.display = 'none';
        showCurrentView();
    }
}


function hideAllScreens() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('game-won-screen').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
}


function showCurrentView() {
    hideAllScreens();
    handleCurrentView();
}


function handleCurrentView() {
    if (currentView === 'start') {
        document.getElementById('start-screen').style.display = 'flex';
    } else if (currentView === 'game') {
        document.getElementById('canvas').style.display = 'flex';
    } else if (currentView === 'howToPlay') {
        document.getElementById('how-to-play-screen').style.display = 'flex';
    } else if (currentView === 'gameOver') {
        document.getElementById('game-over-screen').style.display = 'flex';
        document.getElementById('restart-btn').style.display = 'flex';
    } else if (currentView === 'gameWon') {
        document.getElementById('game-won-screen').style.display = 'flex';
        document.getElementById('restart-btn').style.display = 'flex';
    }
}


function hideOnLoadPage() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
    document.getElementById('game-won-screen').style.display = 'none';
}


function startGame() {
    if (!gameStarted) {
        currentView = 'game';
        checkIfSmallScreen();
        currentTime = new Date().getTime();
        gameStarted = true;
        hideStartscreen();
        initializeGameWorld();
        toggleVolumeIcon();
    }
}


function checkIfSmallScreen() {
    if (isSmallScreen()) {
        addTouchControls();
    } else {
        removeTouchControls();
    }
}


function hideStartscreen() {
    document.getElementById('start-img').style.display = 'none';
    document.getElementById('how-to-play-btn').style.display = 'none';
    document.getElementById('imprint-btn').style.display = 'none';
    document.getElementById('start-btn').style.display = 'none';
}


function showHowToPlay() {
    currentView = 'howToPlay';
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'flex';
    removeTouchControls();
}


function closeHowToPlay() {
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('how-to-play-screen').style.display = 'none';
}


function initializeGameWorld() {
    initLevel();
    registerAllSounds();
    checkIfSoundsMuted();
    document.getElementById('canvas').style.display = 'flex';
    world = new World(canvas, keyboard, gameStarted, currentTime);
}


function checkIfSoundsMuted() {
    if (!soundsMuted) {
        audioManager.setVolume(SOUNDS.GAME_MUSIC, 0.5);
        audioManager.getAudioInstance(SOUNDS.GAME_MUSIC, true).play();
    }
}


function registerAllSounds() {
    Object.values(SOUNDS).forEach(src => {
        audioManager.getAudioInstance(src);
    });
}


function muteAllSounds() {
    soundsMuted = true;
    audioManager.muteAll();
    document.getElementById('volume-btn').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'flex';
}


function playAllSounds() {
    soundsMuted = false;
    audioManager.unmuteAll();
    document.getElementById('volume-btn').style.display = 'flex';
    document.getElementById('mute-btn').style.display = 'none';
    manageSoundIfGameStarted();
}


function manageSoundIfGameStarted() {
    if (gameStarted) {
        audioManager.setVolume(SOUNDS.GAME_MUSIC, 0.5);
        audioManager.getAudioInstance(SOUNDS.GAME_MUSIC, true).play();
    }
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


function handleGAmeWonSounds() {
    if (soundsMuted == false) {
        audioManager.unmuteAll();
    }
    audioManager.pause(SOUNDS.GAME_MUSIC);
    audioManager.setVolume(SOUNDS.WIN_GAME, 0.5);
    audioManager.play(SOUNDS.WIN_GAME);

}


// function showGameWonScreen() {
//     document.getElementById('icon-main-con').style.display = 'none';
//     document.getElementById('game-won-screen').style.display = 'flex';
//     document.getElementById('restart-btn').style.display = 'flex';
//     document.getElementById('canvas').style.display = 'none';
//     document.getElementById('how-to-play-screen').style.display = 'none';
//     document.getElementById('mute-btn').style.display = 'none';
// }


function showGameWonScreen() {
    document.getElementById('icon-main-con').style.display = 'none';
    const gameWonScreen = document.getElementById('game-won-screen');
    gameWonScreen.style.display = 'flex';
    gameWonScreen.classList.add('start-fullscreen'); // Vollbildmodus aktivieren

    document.getElementById('restart-btn').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
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


function handleGameOverSounds() {
    audioManager.pause(SOUNDS.GAME_MUSIC);
    audioManager.pause(SOUNDS.REACH_ENDBOSS);
    audioManager.setVolume(SOUNDS.LOOSE_GAME, 0.5);
    audioManager.play(SOUNDS.LOOSE_GAME);
}


function showGameOverScreen() {
    document.getElementById('icon-main-con').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'flex';
    document.getElementById('restart-btn').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
}



// function showGameOverScreen() {
//     const gameOverScreen = document.getElementById('game-over-screen');
//     gameOverScreen.style.display = 'flex';
//     // gameOverScreen.classList.add('start-fullscreen'); // Vollbildmodus aktivieren
//     document.getElementById('icon-main-con').style.display = 'none';
//     document.getElementById('restart-btn').style.display = 'flex';
//     document.getElementById('canvas').style.display = 'none';
//     document.getElementById('how-to-play-screen').style.display = 'none';
//     document.getElementById('mute-btn').style.display = 'none';
// }


function restartGame() {
    hideEndscreen();
    restartSounds();
    toggleVolumeIcon();
    document.getElementById('icon-main-con').style.display = 'flex';
    win = null;
    init();
    startGame();
}


function toggleVolumeIcon() {
    if (soundsMuted) {
        document.getElementById('volume-btn').style.display = 'none';
        document.getElementById('mute-btn').style.display = 'flex';
    } else {
        document.getElementById('volume-btn').style.display = 'flex';
        document.getElementById('mute-btn').style.display = 'none';
    }
}


function hideEndscreen() {
    if (win == true) {
        document.getElementById('game-won-screen').style.display = 'none';
        document.getElementById('restart-btn').style.display = 'none';

    } else if (win == false) {
        document.getElementById('game-over-screen').style.display = 'none';
        document.getElementById('restart-btn').style.display = 'none';
    }
}


function restartSounds() {
    if (soundsMuted == true) {
        audioManager.muteAll();
    }
    if (soundsMuted == false) {
        audioManager.unmuteAll();
    }
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
