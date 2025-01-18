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

    startscreen.classList.add('start-fullscreen');
    canvas.classList.add('canvas-fullscreen');
    canvas.classList.remove('canvas');
    enterFullscreenIcon.classList.add('d-none');
    exitFullscreenIcon.classList.remove('d-none');
    iconMainCon.classList.remove('icon-main-con');
    iconMainCon.classList.add('icon-main-con-fullscreen');
    startBtn.classList.add('startscreen-btns-fullscreen');
    infoBtns.classList.add('info-btns-fullscreen');
}


function exitCanvasFullscreen() {
    const startscreen = document.getElementById('start-screen');
    const canvas = document.getElementById('canvas');
    const iconMainCon = document.getElementById('icon-main-con');
    const enterFullscreenIcon = document.getElementById('fullscreen-icon');
    const exitFullscreenIcon = document.getElementById('exit-fullscreen-icon');
    const startBtn = document.getElementById('start-btn');
    const infoBtns = document.getElementById('info-btns');

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

        if (isSmallScreen()) {
            addTouchControls();
        } else {
            removeTouchControls();
        }

        currentTime = new Date().getTime();
        gameStarted = true;
        hideStartscreen();
        initializeGameWorld();
        toggleVolumeIcon();
        // changeIconPositionIngame();
    }
}


// function changeIconPositionIngame() {
//     document.getElementById('volume-btn').classList.remove('volume-buttons-startscreen');
//     document.getElementById('volume-btn').classList.add('volume-buttons-ingame');
//     document.getElementById('mute-btn').classList.remove('volume-buttons-startscreen');
//     document.getElementById('mute-btn').classList.add('volume-buttons-ingame');
//     document.getElementById('fullscreen-icon').classList.remove('fullscreen-btn');
//     document.getElementById('fullscreen-icon').classList.add('fullscreen-btn-ingame');
//     document.getElementById('exit-fullscreen-icon').classList.remove('fullscreen-btn');
//     document.getElementById('exit-fullscreen-icon').classList.add('fullscreen-btn-ingame');
// }


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
    audioManager.setVolume(SOUNDS.GAME_MUSIC, 0.5);
    audioManager.getAudioInstance(SOUNDS.GAME_MUSIC, true).play();
    document.getElementById('canvas').style.display = 'flex';
    world = new World(canvas, keyboard, gameStarted, currentTime);
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
}


function showEndscreen() {
    if (world.endboss.endbossIsDead) {
        win = true;
        setTimeout(() => {
            gameWon();
        }, 2000);
    }

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


function showGameWonScreen() {
    document.getElementById('game-won-screen').style.display = 'flex';
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
    document.getElementById('game-over-screen').style.display = 'flex';
    document.getElementById('restart-btn').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
}


function restartGame() {
    hideEndscreen();
    restartSounds();
    toggleVolumeIcon();
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
