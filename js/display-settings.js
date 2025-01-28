function showGameWonScreen() {
    document.getElementById('icon-main-con').style.display = 'none';
    document.getElementById('game-won-screen').style.display = 'flex';
    document.getElementById('restart-btn').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
    document.getElementById('back-to-start-btn').style.display = 'flex';
}


function showGameOverScreen() {
    document.getElementById('icon-main-con').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'flex';
    document.getElementById('restart-btn').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
    document.getElementById('back-to-start-btn').style.display = 'flex';
}


function hideAllScreens() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('game-won-screen').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
    document.getElementById('back-to-start-btn').style.display = 'none';
}


function hideOnLoadPage() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
    document.getElementById('game-won-screen').style.display = 'none';
    document.getElementById('back-to-start-btn').style.display = 'none';
}


function hideStartscreen() {
    document.getElementById('start-img').style.display = 'none';
    document.getElementById('how-to-play-btn').style.display = 'none';
    document.getElementById('imprint-btn').style.display = 'none';
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('back-to-start-btn').style.display = 'none';
}


function showHowToPlay() {
    currentView = 'howToPlay';
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'flex';
    document.getElementById('back-to-start-btn').style.display = 'none';
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


function showEndscreen() {
    checkIfEndbossIsDead();
    checkIfEndbossIsDead();
}