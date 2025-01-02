class AudioManager {
    constructor() {
        this.audioInstances = {}; // Speicher für alle Audio-Objekte
    }

    // Holt ein Audio-Objekt oder erstellt es, falls es noch nicht existiert
    getAudioInstance(src, loop = false) {
        if (!this.audioInstances[src]) {
            this.audioInstances[src] = new Audio(src);
        }
        this.audioInstances[src].loop = loop; // Loop immer setzen
        return this.audioInstances[src];
    }

    // Audio abspielen
    play(src) {
        const audio = this.getAudioInstance(src);
        if (audio.paused) {
            audio.play().catch((error) => {
                console.warn(`Failed to play audio: ${src}`, error);
            });
        }
    }

    // Audio pausieren
    pause(src) {
        const audio = this.getAudioInstance(src);
        if (!audio.paused) {
            audio.pause();
        }
    }

    // Alle Audios stummschalten
    muteAll() {
        Object.values(this.audioInstances).forEach(audio => {
            audio.muted = true;
        });
    }

    // Stummschaltung für alle Audios aufheben
    unmuteAll() {
        Object.values(this.audioInstances).forEach(audio => {
            audio.muted = false;
        });
    }
}

// Singleton-Instanz des AudioManagers
const audioManager = new AudioManager();