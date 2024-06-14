class MovableObject {
    x = 120;
    y = 250;
    width = 150;
    height = 200;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 15;
    animationIntervals = [];


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.isFallingToGround();
            }
        }, 4000 / 60);
    }


    isAboveGround() {
        return this.y < 150;
    }


    isFallingToGround() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }

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


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof ChickenBig || this instanceof ChickenSmall || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    stopAnimation() {
        this.animationIntervals.forEach(clearInterval); // Clear all intervals
        this.animationIntervals = []; // Reset the array
    }

    /**
     * This function is used to move an object to the right side
     *
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * This function is used to move an object to the left side
     *
     */
    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 60;
    }
}