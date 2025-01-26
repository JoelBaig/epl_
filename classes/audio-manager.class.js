class AudioManager {
    constructor() {
        this.audioInstances = {};
        this.muted = false;
    }


    getAudioInstance(src, loop = false) {
        if (!this.audioInstances[src]) {
            this.audioInstances[src] = new Audio(src);
        }
        this.audioInstances[src].loop = loop; 
        this.audioInstances[src].muted = this.muted; 
        return this.audioInstances[src];
    }


    play(src) {
        const audio = this.getAudioInstance(src);
        if (!this.muted && audio.paused) {
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
        this.muted = true;
        Object.values(this.audioInstances).forEach(audio => {
            audio.muted = true;
        });
    }


    unmuteAll() {
        this.muted = false;
        Object.values(this.audioInstances).forEach(audio => {
            audio.muted = false;
        });
    }
}


const audioManager = new AudioManager();