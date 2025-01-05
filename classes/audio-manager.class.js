class AudioManager {
    constructor() {
        this.audioInstances = {};
    }


    getAudioInstance(src, loop = false) {
        if (!this.audioInstances[src]) {
            this.audioInstances[src] = new Audio(src);
        }
        this.audioInstances[src].loop = loop; 
        return this.audioInstances[src];
    }


    play(src) {
        const audio = this.getAudioInstance(src);
        if (audio.paused) {
            audio.play().catch((error) => {
                console.warn(`Failed to play audio: ${src}`, error);
            });
        }
    }


    pause(src) {
        const audio = this.getAudioInstance(src);
        if (!audio.paused) {
            audio.pause();
        }
    }


    setVolume(src, volume) {
        const audio = this.getAudioInstance(src);
        if (audio) {
            audio.volume = Math.min(Math.max(volume, 0), 1);
        }
    }


    muteAll() {
        Object.values(this.audioInstances).forEach(audio => {
            audio.muted = true;
        });
    }


    unmuteAll() {
        Object.values(this.audioInstances).forEach(audio => {
            audio.muted = false;
        });
    }
}


const audioManager = new AudioManager();