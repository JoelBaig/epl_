class Keyboard {
    RIGHT = false;
    LEFT = false;
    SPACE = false;
    D = false;
    F = false;
    lastD = false;
    lastF = false;

    constructor() {
        window.addEventListener('keydown', (e) => {
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
        });


        window.addEventListener('keyup', (e) => {
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
        });
        this.setupTouchControls();
    }


    setupTouchControls() {
        const touchBtns = document.querySelectorAll('.touch-btn');

        if (touchBtns.length === 0) return; 

        touchBtns[0].addEventListener('pointerdown', () => (this.LEFT = true));
        touchBtns[0].addEventListener('pointerup', () => (this.LEFT = false));

        touchBtns[1].addEventListener('pointerdown', () => (this.RIGHT = true));
        touchBtns[1].addEventListener('pointerup', () => (this.RIGHT = false));

        touchBtns[2].addEventListener('pointerdown', () => (this.SPACE = true));
        touchBtns[2].addEventListener('pointerup', () => (this.SPACE = false));

        touchBtns[3].addEventListener('pointerdown', () => (this.D = true));
        touchBtns[3].addEventListener('pointerup', () => (this.D = false));

        touchBtns[4].addEventListener('pointerdown', () => (this.F = true)); 
        touchBtns[4].addEventListener('pointerup', () => (this.F = false));
    }
}