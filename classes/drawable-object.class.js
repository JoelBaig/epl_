class DrawableObject {
    x = 120;
    y = 250;
    width = 150;
    height = 200;
    img;
    imageCache = {};
    currentImage = 0;
    intervalIds = [];

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
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawRedFrame(ctx) {
        if (this instanceof Character || this instanceof ChickenBig || this instanceof ChickenSmall || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top - this.offset.bottom, this.width - this.offset.right, this.height - this.offset.top);
            ctx.stroke();
        }
    }


    setStoppableIntervals(fn, time) {
        let id = setInterval(fn, time);
        this.intervalIds.push(id);
    }


    stopIntervals() {
            this.intervalIds.forEach(clearInterval);
    }
}