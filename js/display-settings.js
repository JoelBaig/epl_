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


function manageEnterGameOverFullscreen() {
    const restartImg = document.getElementById('restart-img');
    const gameOverBgr = document.getElementById('game-over-bgr');
    const gameOverImg = document.getElementById('game-over-img');
    const gameOverScreen = document.getElementById('game-over-screen');
    toggleEnterGameOverFullscreen(restartImg, gameOverBgr, gameOverImg, gameOverScreen);
}


function toggleEnterGameOverFullscreen(restartImg, gameOverBgr, gameOverImg, gameOverScreen) {
    restartImg.classList.remove('restart-img');
    restartImg.classList.add('restart-img-fullscreen-game-over');
    gameOverBgr.classList.remove('endscreen-bgr');
    gameOverBgr.classList.add('endscreen-bgr-fullscreen');
    gameOverImg.classList.remove('game-over-img');
    gameOverImg.classList.add('game-over-img-fullscreen');
    gameOverScreen.classList.remove('game-over-screen');
    gameOverScreen.classList.add('game-over-screen-fullscreen');
}


function manageEnterGameWonFullscreen() {
    const gameWonBgr = document.getElementById('game-won-bgr');
    const gameWonScreen = document.getElementById('game-won-screen');
    const winHeadline = document.getElementById('win-headline');
    toggleEnterGameWonFullscreen(gameWonBgr, gameWonScreen, winHeadline);
}


function toggleEnterGameWonFullscreen(gameWonBgr, gameWonScreen, winHeadline) {
    gameWonBgr.classList.remove('endscreen-bgr');
    gameWonBgr.classList.add('endscreen-bgr-fullscreen');
    gameWonScreen.classList.remove('game-won-screen');
    gameWonScreen.classList.add('game-won-screen-fullscreen');
    winHeadline.classList.remove('win-headline');
    winHeadline.classList.add('win-headline-fullscreen');
}


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


function manageExitGameOverFullscreen() {
    const restartImg = document.getElementById('restart-img');
    const gameOverBgr = document.getElementById('game-over-bgr');
    const gameOverImg = document.getElementById('game-over-img');
    const gameOverScreen = document.getElementById('game-over-screen');
    toggleExitGameOverFullscreen(restartImg, gameOverBgr, gameOverImg, gameOverScreen);
}


function toggleExitGameOverFullscreen(restartImg, gameOverBgr, gameOverImg, gameOverScreen) {
    restartImg.classList.add('restart-img');
    restartImg.classList.remove('restart-img-fullscreen-game-over');
    gameOverBgr.classList.add('endscreen-bgr');
    gameOverBgr.classList.remove('endscreen-bgr-fullscreen');
    gameOverImg.classList.add('game-over-img');
    gameOverImg.classList.remove('game-over-img-fullscreen');
    gameOverScreen.classList.add('game-over-screen');
    gameOverScreen.classList.remove('game-over-screen-fullscreen');
}


function manageExitGameWonFullscreen() {
    const gameWonBgr = document.getElementById('game-won-bgr');
    const gameWonScreen = document.getElementById('game-won-screen');
    const winHeadline = document.getElementById('win-headline');
    toggleExitGameWonFullscreen(gameWonBgr, gameWonScreen, winHeadline);
}


function toggleExitGameWonFullscreen(gameWonBgr, gameWonScreen, winHeadline) {
    gameWonBgr.classList.add('endscreen-bgr');
    gameWonBgr.classList.remove('endscreen-bgr-fullscreen');
    gameWonScreen.classList.add('game-won-screen');
    gameWonScreen.classList.remove('game-won-screen-fullscreen');
    winHeadline.classList.add('win-headline');
    winHeadline.classList.remove('win-headline-fullscreen');
}


function showGameWonScreen() {
    document.getElementById('icon-main-con').style.display = 'none';
    document.getElementById('game-won-screen').style.display = 'flex';
    document.getElementById('restart-btn').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
}


function showGameOverScreen() {
    document.getElementById('icon-main-con').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'flex';
    document.getElementById('restart-btn').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
}


function hideAllScreens() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('game-won-screen').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
}


function hideOnLoadPage() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
    document.getElementById('game-won-screen').style.display = 'none';
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


function toggleFullscreenIcon() {
    const enterFullscreenIcon = document.getElementById('fullscreen-icon');
    const exitFullscreenIcon = document.getElementById('exit-fullscreen-icon');
    handleDesktopMode(enterFullscreenIcon, exitFullscreenIcon);
    handleMobileMode(enterFullscreenIcon, exitFullscreenIcon);
}


function handleDesktopMode(enterFullscreenIcon, exitFullscreenIcon) {
    if (fullscreen) {
        enterFullscreenIcon.classList.add('d-none');
        exitFullscreenIcon.classList.remove('d-none');
    } else {
        enterFullscreenIcon.classList.remove('d-none');
        exitFullscreenIcon.classList.add('d-none');
    }
}


function handleMobileMode(enterFullscreenIcon, exitFullscreenIcon) {
    if (isMobileDevice()) {
        enterFullscreenIcon.classList.add('d-none');
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