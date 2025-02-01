/**
 * Activates fullscreen mode for the game canvas and UI elements.
 */
function enterCanvasFullscreen() {
    fullscreen = true;
    const startscreen = document.getElementById('start-screen');
    const canvas = document.getElementById('canvas');
    const iconMainCon = document.getElementById('icon-main-con');
    const enterFullscreenIcon = document.getElementById('fullscreen-icon');
    const exitFullscreenIcon = document.getElementById('exit-fullscreen-icon');
    const startBtn = document.getElementById('start-btn');
    const infoBtns = document.getElementById('info-btns');

    manageEnterFullscreen(startscreen, canvas, iconMainCon, enterFullscreenIcon, exitFullscreenIcon, startBtn, infoBtns);
    manageEnterGameOverFullscreen();
    manageEnterGameWonFullscreen();
}

/**
 * Applies fullscreen styles to various game elements.
 */
function manageEnterFullscreen(startscreen, canvas, iconMainCon, enterFullscreenIcon, exitFullscreenIcon, startBtn, infoBtns) {
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

/**
 * Adjusts styles for the game over screen in fullscreen mode.
 */
function manageEnterGameOverFullscreen() {
    const restartBtn = document.getElementById('restart-btn');
    const gameOverBgr = document.getElementById('game-over-bgr');
    const gameOverImg = document.getElementById('game-over-img');
    const gameOverScreen = document.getElementById('game-over-screen');
    const backToStartBtn = document.getElementById('back-to-start-btn');
    toggleEnterGameOverFullscreen(restartBtn, gameOverBgr, gameOverImg, gameOverScreen, backToStartBtn);
}

/**
 * Applies fullscreen styles to the game over screen elements.
 */
function toggleEnterGameOverFullscreen(restartBtn, gameOverBgr, gameOverImg, gameOverScreen, backToStartBtn) {
    restartBtn.classList.replace('restart-btn', 'restart-btn-fullscreen-game-over');
    gameOverBgr.classList.replace('endscreen-bgr', 'endscreen-bgr-fullscreen');
    gameOverImg.classList.replace('game-over-img', 'game-over-img-fullscreen');
    gameOverScreen.classList.replace('game-over-screen', 'game-over-screen-fullscreen');
    backToStartBtn.classList.replace('back-to-start-btn', 'back-to-start-btn-fullscreen');
}

/**
 * Adjusts styles for the game won screen in fullscreen mode.
 */
function manageEnterGameWonFullscreen() {
    const gameWonBgr = document.getElementById('game-won-bgr');
    const gameWonScreen = document.getElementById('game-won-screen');
    const winHeadline = document.getElementById('win-headline');
    const backToStartBtn = document.getElementById('back-to-start-btn');
    const wreathImg = document.getElementById('wreath-img');
    toggleEnterGameWonFullscreen(gameWonBgr, gameWonScreen, winHeadline, backToStartBtn, wreathImg);
}

/**
 * Applies fullscreen styles to the game won screen elements.
 */
function toggleEnterGameWonFullscreen(gameWonBgr, gameWonScreen, winHeadline, backToStartBtn, wreathImg) {
    gameWonBgr.classList.replace('endscreen-bgr', 'endscreen-bgr-fullscreen');
    gameWonScreen.classList.replace('game-won-screen', 'game-won-screen-fullscreen');
    winHeadline.classList.replace('win-headline', 'win-headline-fullscreen');
    backToStartBtn.classList.replace('back-to-start-btn', 'back-to-start-btn-fullscreen');
    wreathImg.classList.replace('wreath-img', 'wreath-img-fullscreen');
}

/**
 * Exits fullscreen mode and restores original UI styles.
 */
function exitCanvasFullscreen() {
    fullscreen = false;
    const startscreen = document.getElementById('start-screen');
    const canvas = document.getElementById('canvas');
    const iconMainCon = document.getElementById('icon-main-con');
    const enterFullscreenIcon = document.getElementById('fullscreen-icon');
    const exitFullscreenIcon = document.getElementById('exit-fullscreen-icon');
    const startBtn = document.getElementById('start-btn');
    const infoBtns = document.getElementById('info-btns');

    manageExitFullscreen(startscreen, canvas, iconMainCon, enterFullscreenIcon, exitFullscreenIcon, startBtn, infoBtns);
    manageExitGameOverFullscreen();
    manageExitGameWonFullscreen();
}

/**
 * Restores original UI styles after exiting fullscreen mode.
 */
function manageExitFullscreen(startscreen, canvas, iconMainCon, enterFullscreenIcon, exitFullscreenIcon, startBtn, infoBtns) {
    startscreen.classList.remove('start-fullscreen');
    canvas.classList.replace('canvas-fullscreen', 'canvas');
    enterFullscreenIcon.classList.remove('d-none');
    exitFullscreenIcon.classList.add('d-none');
    iconMainCon.classList.replace('icon-main-con-fullscreen', 'icon-main-con');
    startBtn.classList.remove('startscreen-btns-fullscreen');
    infoBtns.classList.remove('info-btns-fullscreen');
}

/**
 * Restores game over screen styles after exiting fullscreen mode.
 */
function manageExitGameOverFullscreen() {
    const restartBtn = document.getElementById('restart-btn');
    const gameOverBgr = document.getElementById('game-over-bgr');
    const gameOverImg = document.getElementById('game-over-img');
    const gameOverScreen = document.getElementById('game-over-screen');
    const backToStartBtn = document.getElementById('back-to-start-btn');
    toggleExitGameOverFullscreen(restartBtn, gameOverBgr, gameOverImg, gameOverScreen, backToStartBtn);
}

/**
 * Restores original styles for the game over screen elements.
 */
function toggleExitGameOverFullscreen(restartBtn, gameOverBgr, gameOverImg, gameOverScreen, backToStartBtn) {
    restartBtn.classList.replace('restart-btn-fullscreen-game-over', 'restart-btn');
    gameOverBgr.classList.replace('endscreen-bgr-fullscreen', 'endscreen-bgr');
    gameOverImg.classList.replace('game-over-img-fullscreen', 'game-over-img');
    gameOverScreen.classList.replace('game-over-screen-fullscreen', 'game-over-screen');
    backToStartBtn.classList.replace('back-to-start-btn-fullscreen', 'back-to-start-btn');
}

/**
 * Restores game won screen styles after exiting fullscreen mode.
 */
function manageExitGameWonFullscreen() {
    const gameWonBgr = document.getElementById('game-won-bgr');
    const gameWonScreen = document.getElementById('game-won-screen');
    const winHeadline = document.getElementById('win-headline');
    const backToStartBtn = document.getElementById('back-to-start-btn');
    const wreathImg = document.getElementById('wreath-img');
    toggleExitGameWonFullscreen(gameWonBgr, gameWonScreen, winHeadline, backToStartBtn,wreathImg);
}

/**
 * Restores original styles for the game won screen elements.
 */
function toggleExitGameWonFullscreen(gameWonBgr, gameWonScreen, winHeadline, backToStartBtn,wreathImg) {
    gameWonBgr.classList.replace('endscreen-bgr-fullscreen', 'endscreen-bgr');
    gameWonScreen.classList.replace('game-won-screen-fullscreen', 'game-won-screen');
    winHeadline.classList.replace('win-headline-fullscreen', 'win-headline');
    backToStartBtn.classList.replace('back-to-start-btn-fullscreen', 'back-to-start-btn');
    wreathImg.classList.replace('wreath-img-fullscreen', 'wreath-img');
}

/**
 * Toggles between fullscreen icons based on the current fullscreen state.
 */
function toggleFullscreenIcon() {
    const enterFullscreenIcon = document.getElementById('fullscreen-icon');
    const exitFullscreenIcon = document.getElementById('exit-fullscreen-icon');
    handleDesktopMode(enterFullscreenIcon, exitFullscreenIcon);
    handleMobileMode(enterFullscreenIcon, exitFullscreenIcon);
}

/**
 * Manages the display of fullscreen icons for desktop mode.
 */
function handleDesktopMode(enterFullscreenIcon, exitFullscreenIcon) {
    if (fullscreen) {
        enterFullscreenIcon.classList.add('d-none');
        exitFullscreenIcon.classList.remove('d-none');
    } else {
        enterFullscreenIcon.classList.remove('d-none');
        exitFullscreenIcon.classList.add('d-none');
    }
}

/**
 * Handles fullscreen state changes and updates UI accordingly.
 */
function handleFullscreen() {
    fullscreenWasntActive();
    fullscreenWasActive();
}

/**
 * Handles UI updates when fullscreen was not active.
 */
function fullscreenWasntActive() {
    if (!fullscreen) {
        toggleVolumeIcon();
    }
}

/**
 * Handles UI updates when fullscreen was active.
 */
function fullscreenWasActive() {
    let wasFullscreen = fullscreen;
    if (wasFullscreen) {
        enterCanvasFullscreen();
    } else {
        toggleFullscreenIcon();
    }
}