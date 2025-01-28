class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a new background object.
     * 
     * @param {string} imagePath - The file path of the background image.
     * @param {number} x - The initial x-position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}