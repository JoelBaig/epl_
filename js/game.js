let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let currentTime;
let winning_sound = new Audio('../assets/audio/win.mp3');
let game_sound = new Audio('../assets/audio/music.mp3');
game_sound.loop = true;
let allSounds = [game_sound]
let soundsMuted = false;
let stoppableIntervalIds = [];

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
        gameStarted = true;
        currentTime = new Date().getTime();
        hideStartscreen();
        initializeGameWorld();

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
    game_sound.play();
    document.getElementById('canvas').style.display = 'flex';
    world = new World(canvas, keyboard, gameStarted, currentTime);
    handleSounds();
}


function handleSounds() {
    addSoundsToArray();
    addEndbossSoundsToArray();
    allSounds.forEach(sound => sound.muted = soundsMuted);
}


function addSoundsToArray() {
    allSounds.push(world.character.walking_sound);
    allSounds.push(world.character.taking_damage_sound);
    allSounds.push(world.character.dying_sound);
    allSounds.push(world.character.dying_sound_enemy);
    allSounds.push(world.character.jumping_sound);
    allSounds.push(world.collecting_bottle_sound);
    allSounds.push(world.collecting_coin_sound);
    allSounds.push(world.throwing_bottle_sound);
    allSounds.push(world.breaking_bottle_sound);
    allSounds.push(world.endboss.reach_endboss_sound);
    allSounds.push(world.dying_sound_enemy);
    addAllEnemySounds();
}


function addAllEnemySounds() {
    world.level.enemies.forEach(enemy => {
        if (enemy instanceof MovableObject) {
            allSounds.push(enemy.dying_sound_enemy);
        }
    });
}


function addEndbossSoundsToArray() {
    if (world.endboss) {
        allSounds.push(world.endboss.dying_sound);
        allSounds.push(world.endboss.taking_damage_sound);
    }
}


function muteAllSounds() {
    soundsMuted = true;
    allSounds.forEach(sound => sound.muted = true);
    winning_sound.muted = true;
    document.getElementById('volume-btn').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'flex';
}


function playAllSounds() {
    soundsMuted = false;
    allSounds.forEach(sound => sound.muted = false);
    winning_sound.muted = false;
    document.getElementById('volume-btn').style.display = 'flex';
    document.getElementById('mute-btn').style.display = 'none';
}


function showEndscreen() {
    if (world.endboss.endbossIsDead) {
        gameWon();
    }
    if (world.character.characterIsDead) {
        gameOver();
    }
}


function gameWon() {
    showGameWonScreen();
    winning_sound.play();
    game_sound.pause();
    gameStarted = false;
    stopInterval();

    if (soundsMuted) {
        document.getElementById('volume-btn').style.display = 'none';
        document.getElementById('mute-btn').style.display = 'flex';
    } else {
        document.getElementById('volume-btn').style.display = 'flex';
        document.getElementById('mute-btn').style.display = 'none';
    }

    setTimeout(() => {
        allSounds.forEach(sound => sound.pause());
    }, 500);
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
    showGameOverScreen();
    game_sound.pause();
    gameStarted = false;
    stopInterval();

    setTimeout(() => {
        allSounds.forEach(sound => sound.pause());
    }, 1200);
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
    startGame();
    document.getElementById('game-won-screen').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';

    if (soundsMuted) {
        document.getElementById('volume-btn').style.display = 'none';
        document.getElementById('mute-btn').style.display = 'flex';
    } else {
        document.getElementById('volume-btn').style.display = 'flex';
        document.getElementById('mute-btn').style.display = 'none';
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