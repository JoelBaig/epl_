/**
 * Displays the "Game Won" screen and hides unnecessary elements.
 */
function showGameWonScreen() {
    document.getElementById('icon-main-con').style.display = 'none';
    document.getElementById('game-won-screen').style.display = 'flex';
    document.getElementById('restart-btn').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
    document.getElementById('back-to-start-btn').style.display = 'flex';
}

/**
 * Displays the "Game Over" screen and hides unnecessary elements.
 */
function showGameOverScreen() {
    document.getElementById('icon-main-con').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'flex';
    document.getElementById('restart-btn').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
    document.getElementById('back-to-start-btn').style.display = 'flex';
}

/**
 * Hides all game screens.
 */
function hideAllScreens() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('game-won-screen').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
    document.getElementById('back-to-start-btn').style.display = 'none';
}

/**
 * Hides specific elements when the page loads.
 */
function hideOnLoadPage() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
    document.getElementById('game-won-screen').style.display = 'none';
    document.getElementById('back-to-start-btn').style.display = 'none';
}

/**
 * Hides the start screen elements.
 */
function hideStartscreen() {
    document.getElementById('start-img').style.display = 'none';
    document.getElementById('how-to-play-btn').style.display = 'none';
    document.getElementById('imprint-btn').style.display = 'none';
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('back-to-start-btn').style.display = 'none';
}

/**
 * Displays the "How to Play" screen and hides the start screen.
 */
function showHowToPlay() {
    currentView = 'howToPlay';
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'flex';
    document.getElementById('back-to-start-btn').style.display = 'none';
    removeTouchControls();
}

/**
 * Closes the "How to Play" screen and returns to the start screen.
 */
function closeHowToPlay() {
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('how-to-play-screen').style.display = 'none';
}

/**
 * Hides all screens and displays the current active screen.
 */
function showCurrentView() {
    hideAllScreens();
    handleCurrentView();
}

/**
 * Determines which screen should be displayed based on the current view state.
 */
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

/**
 * Toggles the volume icon based on the mute state.
 */
function toggleVolumeIcon() {
    if (soundsMuted) {
        document.getElementById('volume-btn').style.display = 'none';
        document.getElementById('mute-btn').style.display = 'flex';
    } else {
        document.getElementById('volume-btn').style.display = 'flex';
        document.getElementById('mute-btn').style.display = 'none';
    }
}

/**
 * Hides the end screen after the game is won or lost.
 */
function hideEndscreen() {
    if (win == true) {
        document.getElementById('game-won-screen').style.display = 'none';
        document.getElementById('restart-btn').style.display = 'none';
    } else if (win == false) {
        document.getElementById('game-over-screen').style.display = 'none';
        document.getElementById('restart-btn').style.display = 'none';
    }
}

/**
 * Checks if the Endboss is dead and handles the win condition.
 */
function showEndscreen() {
    checkIfEndbossIsDead();
    checkIfEndbossIsDead();
}