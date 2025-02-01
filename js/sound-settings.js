/**
 * Checks the stored sound preference from Local Storage and applies it.
 */
function checkSoundPreferences() {
    let storedMuteStatus = localStorage.getItem('soundsMuted');
    if (storedMuteStatus !== null) {
        soundsMuted = storedMuteStatus === 'true';
    }
    toggleVolumeIcon();
}

/**
 * Checks if the sounds are muted and plays background music if not muted.
 */
function checkIfSoundsMuted() {
    if (!soundsMuted) {
        audioManager.setVolume(SOUNDS.GAME_MUSIC, 0.5);
        audioManager.getAudioInstance(SOUNDS.GAME_MUSIC, true).play();
    }
}

/**
 * Registers all sound files by preloading their instances.
 */
function registerAllSounds() {
    Object.values(SOUNDS).forEach(src => {
        audioManager.getAudioInstance(src);
    });
}

/**
 * Mutes all game sounds and updates the UI to reflect the mute state.
 */
function muteAllSounds() {
    soundsMuted = true;
    localStorage.setItem('soundsMuted', 'true');
    audioManager.muteAll();
    document.getElementById('volume-btn').style.display = 'none';
    document.getElementById('mute-btn').style.display = 'flex';
}

/**
 * Unmutes all game sounds, updates the UI, and resumes game music if the game is started.
 */
function playAllSounds() {
    soundsMuted = false;
    localStorage.setItem('soundsMuted', 'false');
    audioManager.unmuteAll();
    document.getElementById('volume-btn').style.display = 'flex';
    document.getElementById('mute-btn').style.display = 'none';
    manageSoundIfGameStarted();
}

/**
 * Manages background music playback if the game has already started.
 */
function manageSoundIfGameStarted() {
    if (gameStarted) {
        audioManager.setVolume(SOUNDS.GAME_MUSIC, 0.5);
        audioManager.getAudioInstance(SOUNDS.GAME_MUSIC, true).play();
    }
}

/**
 * Handles sound effects when the game is won.
 * It pauses the background music and plays the victory sound.
 */
function handleGAmeWonSounds() {
    if (!soundsMuted) {
        audioManager.unmuteAll();
    }
    audioManager.pause(SOUNDS.GAME_MUSIC);
    audioManager.setVolume(SOUNDS.WIN_GAME, 0.5);
    audioManager.play(SOUNDS.WIN_GAME);
}

/**
 * Handles sound effects when the game is lost.
 * It pauses background and boss music and plays the game-over sound.
 */
function handleGameOverSounds() {
    audioManager.pause(SOUNDS.GAME_MUSIC);
    audioManager.pause(SOUNDS.REACH_ENDBOSS);
    audioManager.setVolume(SOUNDS.LOOSE_GAME, 0.5);
    audioManager.play(SOUNDS.LOOSE_GAME);
}

/**
 * Restarts the sound settings based on whether sounds are muted or not.
 */
function restartSounds() {
    if (soundsMuted) {
        audioManager.muteAll();
    } else {
        audioManager.unmuteAll();
    }
}