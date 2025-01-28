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
    const restartBtn = document.getElementById('restart-btn');
    const gameOverBgr = document.getElementById('game-over-bgr');
    const gameOverImg = document.getElementById('game-over-img');
    const gameOverScreen = document.getElementById('game-over-screen');
    const backToStartBtn = document.getElementById('back-to-start-btn');
    toggleEnterGameOverFullscreen(restartBtn, gameOverBgr, gameOverImg, gameOverScreen, backToStartBtn);
}


function toggleEnterGameOverFullscreen(restartBtn, gameOverBgr, gameOverImg, gameOverScreen, backToStartBtn) {
    restartBtn.classList.remove('restart-btn');
    restartBtn.classList.add('restart-btn-fullscreen-game-over');
    gameOverBgr.classList.remove('endscreen-bgr');
    gameOverBgr.classList.add('endscreen-bgr-fullscreen');
    gameOverImg.classList.remove('game-over-img');
    gameOverImg.classList.add('game-over-img-fullscreen');
    gameOverScreen.classList.remove('game-over-screen');
    gameOverScreen.classList.add('game-over-screen-fullscreen');
    backToStartBtn.classList.remove('back-to-start-btn');
    backToStartBtn.classList.add('back-to-start-btn-fullscreen');
}


function manageEnterGameWonFullscreen() {
    const gameWonBgr = document.getElementById('game-won-bgr');
    const gameWonScreen = document.getElementById('game-won-screen');
    const winHeadline = document.getElementById('win-headline');
    const backToStartBtn = document.getElementById('back-to-start-btn');
    toggleEnterGameWonFullscreen(gameWonBgr, gameWonScreen, winHeadline, backToStartBtn);
}


function toggleEnterGameWonFullscreen(gameWonBgr, gameWonScreen, winHeadline, backToStartBtn) {
    gameWonBgr.classList.remove('endscreen-bgr');
    gameWonBgr.classList.add('endscreen-bgr-fullscreen');
    gameWonScreen.classList.remove('game-won-screen');
    gameWonScreen.classList.add('game-won-screen-fullscreen');
    winHeadline.classList.remove('win-headline');
    winHeadline.classList.add('win-headline-fullscreen');
    backToStartBtn.classList.remove('back-to-start-btn');
    backToStartBtn.classList.add('back-to-start-btn-fullscreen');
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
    const restartBtn = document.getElementById('restart-btn');
    const gameOverBgr = document.getElementById('game-over-bgr');
    const gameOverImg = document.getElementById('game-over-img');
    const gameOverScreen = document.getElementById('game-over-screen');
    const backToStartBtn = document.getElementById('back-to-start-btn');
    toggleExitGameOverFullscreen(restartBtn, gameOverBgr, gameOverImg, gameOverScreen, backToStartBtn);
}


function toggleExitGameOverFullscreen(restartBtn, gameOverBgr, gameOverImg, gameOverScreen, backToStartBtn) {
    restartBtn.classList.add('restart-btn');
    restartBtn.classList.remove('restart-btn-fullscreen-game-over');
    gameOverBgr.classList.add('endscreen-bgr');
    gameOverBgr.classList.remove('endscreen-bgr-fullscreen');
    gameOverImg.classList.add('game-over-img');
    gameOverImg.classList.remove('game-over-img-fullscreen');
    gameOverScreen.classList.add('game-over-screen');
    gameOverScreen.classList.remove('game-over-screen-fullscreen');
    backToStartBtn.classList.add('back-to-start-btn');
    backToStartBtn.classList.remove('back-to-start-btn-fullscreen');
}


function manageExitGameWonFullscreen() {
    const gameWonBgr = document.getElementById('game-won-bgr');
    const gameWonScreen = document.getElementById('game-won-screen');
    const winHeadline = document.getElementById('win-headline');
    const backToStartBtn = document.getElementById('back-to-start-btn');
    toggleExitGameWonFullscreen(gameWonBgr, gameWonScreen, winHeadline, backToStartBtn);
}


function toggleExitGameWonFullscreen(gameWonBgr, gameWonScreen, winHeadline, backToStartBtn) {
    gameWonBgr.classList.add('endscreen-bgr');
    gameWonBgr.classList.remove('endscreen-bgr-fullscreen');
    gameWonScreen.classList.add('game-won-screen');
    gameWonScreen.classList.remove('game-won-screen-fullscreen');
    winHeadline.classList.add('win-headline');
    winHeadline.classList.remove('win-headline-fullscreen');
    backToStartBtn.classList.add('back-to-start-btn');
    backToStartBtn.classList.remove('back-to-start-btn-fullscreen');
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