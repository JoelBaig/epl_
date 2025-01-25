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


function checkIfSmallScreen() {
    if (isSmallScreen()) {
        addTouchControls();
    } else {
        removeTouchControls();
    }
}


function isSmallScreen() {
    return window.innerWidth <= 900;
}