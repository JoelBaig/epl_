class DrawableObject {
    x = 20;
    y = 250;
    width = 150;
    height = 200;
    img;
    imageCache = {};
    currentImage = 0;

    /**
    * This function assigns a picture to the img variable
    *
    * @param {picture path} path 
    */
    loadImage(path) { // loadImage('../assets/img/example.png');
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads images from the provided array of paths and stores them in the image cache.
     * 
     * @param {string[]} arr - An array of paths to the images to be loaded.
     */

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
            console.warn('Image not loaded for', this);
        }
    }
}