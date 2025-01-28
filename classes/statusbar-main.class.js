class StatusBar extends DrawableObject {
    IMAGES = [];
    percentage = 0;

    /**
     * Creates a new status bar instance.
     */
    constructor() {
        super();
    }

    /**
     * Sets the percentage value and updates the corresponding status bar image.
     * 
     * @param {number} percentage - The percentage value to set (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the correct image index based on the current percentage value.
     * 
     * @returns {number} - The index of the corresponding image in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else if (this.percentage >= 0) {
            return 0;
        }
    }
}