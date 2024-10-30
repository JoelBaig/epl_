let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let currentTime;

/**
 *  This function initializes the world
 * 
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, gameStarted, currentTime);
    hideOnLoadPage();
}


function hideOnLoadPage() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('instruction-screen').style.display = 'none';
    document.getElementById('impressum-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
}


function startGame() {
    if (!gameStarted) {
        currentTime = new Date().getTime();
        gameStarted = true;
    }
    closeStartscreen();
    showGame();
}


function showGame() {
    document.getElementById('canvas').style.display = 'flex';
}


function closeStartscreen() {
    document.getElementById('start-img').style.display = 'none';
    document.getElementById('instruction-btn').style.display = 'none';
    document.getElementById('impressum-btn').style.display = 'none';
    document.getElementById('start-btn').style.display = 'none';
}


function showInstructions() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('instruction-screen').style.display = 'flex';
}


function closeInstructions() {
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('instruction-screen').style.display = 'none';
}


function showImpressum() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('impressum-screen').style.display = 'flex';
}


function closeImpressum() {
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('impressum-screen').style.display = 'none';
}
