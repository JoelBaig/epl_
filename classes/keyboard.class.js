class Keyboard {
    RIGHT = false;
    LEFT = false;
    SPACE = false;
    D = false;
    F = false;
    lastD = false;

    constructor() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 39) {
                keyboard.RIGHT = true;
            }

            if (e.keyCode == 37) {
                keyboard.LEFT = true;
            }

            if (e.keyCode == 32) {
                keyboard.SPACE = true;
            }

            if (e.keyCode == 68) {
                keyboard.D = true;
            }

            if (e.keyCode == 70) {
                keyboard.F = true;
            }
        });


        window.addEventListener('keyup', (e) => {
            if (e.keyCode == 39) {
                keyboard.RIGHT = false;
            }

            if (e.keyCode == 37) {
                keyboard.LEFT = false;
            }

            if (e.keyCode == 32) {
                keyboard.SPACE = false;
            }

            if (e.keyCode == 68) {
                keyboard.D = false;
            }

            if (e.keyCode == 70) {
                keyboard.F = false;
            }
        });
    }
}