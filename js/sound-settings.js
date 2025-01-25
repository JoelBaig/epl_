function checkIfSoundsMuted() {
    if (!soundsMuted) {
        audioManager.setVolume(SOUNDS.GAME_MUSIC, 0.5);
        audioManager.getAudioInstance(SOUNDS.GAME_MUSIC, true).play();
    }
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
    manageSoundIfGameStarted();
}


function manageSoundIfGameStarted() {
    if (gameStarted) {
        audioManager.setVolume(SOUNDS.GAME_MUSIC, 0.5);
        audioManager.getAudioInstance(SOUNDS.GAME_MUSIC, true).play();
    }
}


function handleGAmeWonSounds() {
    if (soundsMuted == false) {
        audioManager.unmuteAll();
    }
    audioManager.pause(SOUNDS.GAME_MUSIC);
    audioManager.setVolume(SOUNDS.WIN_GAME, 0.5);
    audioManager.play(SOUNDS.WIN_GAME);
}


function handleGameOverSounds() {
    audioManager.pause(SOUNDS.GAME_MUSIC);
    audioManager.pause(SOUNDS.REACH_ENDBOSS);
    audioManager.setVolume(SOUNDS.LOOSE_GAME, 0.5);
    audioManager.play(SOUNDS.LOOSE_GAME);
}


function restartSounds() {
    if (soundsMuted == true) {
        audioManager.muteAll();
    }
    if (soundsMuted == false) {
        audioManager.unmuteAll();
    }
}