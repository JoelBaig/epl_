class DrawableObject {
    x = 20;
    y = 250;
    width = 150;
    height = 200;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image and assigns it to the `img` variable.
     * 
     * @param {string} path - The file path of the image to load.
     */
    loadImage(path) { 
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from the provided array of paths and stores them in the image cache.
     * 
     * @param {string[]} arr - An array of image file paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the current image on the given canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
            console.warn('Image not loaded for', this);
        }
    }
}