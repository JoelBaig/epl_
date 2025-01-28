class Keyboard {
    RIGHT = false;
    LEFT = false;
    SPACE = false;
    D = false;
    F = false;
    lastD = false;
    lastF = false;

    /**
     * Initializes keyboard event listeners for movement and actions.
     */
    constructor() {
        window.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
        });

        window.addEventListener('keyup', (e) => {
            this.handleKeyUp(e);
        });
    }

    /**
     * Handles `keydown` events and updates the corresponding key states.
     * 
     * @param {KeyboardEvent} e - The keyboard event.
     */
    handleKeyDown(e) {
        switch (e.code) {
            case 'ArrowRight':
                this.RIGHT = true;
                break;
            case 'ArrowLeft':
                this.LEFT = true;
                break;
            case 'Space':
                this.SPACE = true;
                break;
            case 'KeyD':
                this.D = true;
                break;
            case 'KeyF':
                this.F = true;
                break;
        }
    }

    /**
     * Handles `keyup` events and resets the corresponding key states.
     * 
     * @param {KeyboardEvent} e - The keyboard event.
     */
    handleKeyUp(e) {
        switch (e.code) {
            case 'ArrowRight':
                this.RIGHT = false;
                break;
            case 'ArrowLeft':
                this.LEFT = false;
                break;
            case 'Space':
                this.SPACE = false;
                break;
            case 'KeyD':
                this.D = false;
                this.lastD = false;
                break;
            case 'KeyF':
                this.F = false;
                this.lastF = false;
                break;
        }
    }
}