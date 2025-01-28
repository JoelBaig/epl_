class Cloud extends MovableObject {
    width = 350;
    height = 250;

    /**
     * Creates a new cloud instance.
     * 
     * @param {string} imagePath - The file path of the cloud image.
     * @param {number} x - The initial x-position of the cloud.
     * @param {number} y - The initial y-position of the cloud.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Moves the cloud to the left continuously and resets its position when needed.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
            this.resetPosition();
        }, 1000 / 60);
    }

    /**
     * Resets the cloud's position when it reaches the left boundary.
     */
    resetPosition() {
        if (this.x === -719) {
            this.x = 2900;
        }
    }
}