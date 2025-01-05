let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let currentTime;
let stoppableIntervalIds = [];
let win = null;
let soundsMuted = false;


/**
 *  This function initializes the world
 * 
 */
function init() {
    canvas = document.getElementById('canvas');
    hideOnLoadPage();

    document.getElementById('volume-btn').classList.add('volume-buttons-startscreen');
    document.getElementById('mute-btn').classList.add('volume-buttons-startscreen');
}


function hideOnLoadPage() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    document.getElementById('imprint-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
    document.getElementById('game-won-screen').style.display = 'none';
}


function startGame() {
    if (!gameStarted) {
        currentTime = new Date().getTime();
        gameStarted = true;
        hideStartscreen();
        initializeGameWorld();
        toggleVolumeIcon();

        document.getElementById('volume-btn').classList.remove('volume-buttons-startscreen');
        document.getElementById('volume-btn').classList.add('volume-buttons-ingame');

        document.getElementById('mute-btn').classList.remove('volume-buttons-startscreen');
        document.getElementById('mute-btn').classList.add('volume-buttons-ingame');
    }
}


function hideStartscreen() {
    document.getElementById('start-img').style.display = 'none';
    document.getElementById('how-to-play-btn').style.display = 'none';
    document.getElementById('imprint-btn').style.display = 'none';
    document.getElementById('start-btn').style.display = 'none';
}


function showHowToPlay() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'flex';
}


function closeHowToPlay() {
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('how-to-play-screen').style.display = 'none';
}


function showImprint() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('imprint-screen').style.display = 'flex';
}


function closeImprint() {
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('imprint-screen').style.display = 'none';
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
    document.getElementById('imprint-screen').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'none';
}


function gameOver() {
    handleGameOverSounds();
    toggleVolumeIcon();
    stopInterval();

    setTimeout(() => {
        showGameOverScreen();
        gameStarted = false;
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
    document.getElementById('imprint-screen').style.display = 'none';
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
