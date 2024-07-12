class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 15;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    energy = 100;
    coinAmount = 0;
    bottleAmount = 0;
    lastHit = 0;
    dead = false;
    taking_damage_sound = new Audio('../assets/audio/taking_damage.mp3');
    dying_sound = new Audio('../assets/audio/loose.mp3');


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.isFallingToGround();
            }
        }, 4000 / 60);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < 150;
    }


    isFallingToGround() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    hit() {
        this.taking_damage_sound.play();
        this.energy -= 10;
        if (this.energy < 0) {
            this.dying_sound.play();
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    hitObject() {
        if (this instanceof Coin) {
            this.coinAmount += 20;
        } else if (this instanceof Bottle) {
            this.bottleAmount += 20;
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }


    isDead() {
        return this.energy == 0;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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