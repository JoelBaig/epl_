/**
 * Manages audio playback, volume, and mute settings.
 */
class AudioManager {
    constructor() {
        /**
         * Stores audio instances with their source paths as keys.
         * @type {Object.<string, HTMLAudioElement>}
         */
        this.audioInstances = {};

        /**
         * Indicates whether all sounds are muted.
         * @type {boolean}
         */
        this.muted = false;
    }

    /**
     * Retrieves an existing audio instance or creates a new one.
     * 
     * @param {string} src - The source URL of the audio file.
     * @param {boolean} [loop=false] - Whether the audio should loop.
     * @returns {HTMLAudioElement} - The audio instance associated with the source.
     */
    getAudioInstance(src, loop = false) {
        if (!this.audioInstances[src]) {
            this.audioInstances[src] = new Audio(src);
        }
        this.audioInstances[src].loop = loop;
        this.audioInstances[src].muted = this.muted;
        return this.audioInstances[src];
    }

    /**
     * Plays an audio file if it is not muted and currently paused.
     * 
     * @param {string} src - The source URL of the audio file.
     */
    play(src) {
        const audio = this.getAudioInstance(src);
        if (!this.muted && audio.paused) {
            audio.play().catch((error) => {
                console.warn(`Failed to play audio: ${src}`, error);
            });
        }
    }

    /**
     * Pauses the playback of a specific audio file.
     * 
     * @param {string} src - The source URL of the audio file.
     */
    pause(src) {
        const audio = this.getAudioInstance(src);
        if (!audio.paused) {
            audio.pause();
        }
    }

    /**
     * Sets the volume for a specific audio instance.
     * 
     * @param {string} src - The source URL of the audio file.
     * @param {number} volume - The volume level (between 0 and 1).
     */
    setVolume(src, volume) {
        const audio = this.getAudioInstance(src);
        if (audio) {
            audio.volume = Math.min(Math.max(volume, 0), 1);
        }
    }

    /**
     * Mutes all audio instances.
     */
    muteAll() {
        this.muted = true;
        Object.values(this.audioInstances).forEach(audio => {
            audio.muted = true;
        });
    }

    /**
     * Unmutes all audio instances.
     */
    unmuteAll() {
        this.muted = false;
        Object.values(this.audioInstances).forEach(audio => {
            audio.muted = false;
        });
    }
}

/** 
 * Global instance of the AudioManager.
 * @type {AudioManager} 
 */
const audioManager = new AudioManager();