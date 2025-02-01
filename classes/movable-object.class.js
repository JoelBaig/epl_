class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    energy;
    coinAmount = 0;
    bottleAmount = 0;
    lastHit = 0;
    dead = false;
    dyingSoundPlayed = false;
    currentAnimation = null;
    hurt = false;
    gravity;

    /**
     * Applies gravity to the object, making it fall to the ground.
     */
    applyGravity() {
        this.gravity = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.isFallingToGround();
            } else {
                this.landOnGround(); // Ensure exact landing position
            }
        }, 1000 / 60);
    }

    /**
     * Ensures the object lands exactly on the ground.
     */
    landOnGround() {
        this.y = 170; // Set to fixed ground level
    }

    /**
     * Checks if the object is above the ground.
     * 
     * @returns {boolean} - Returns true if the object is above the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        if (this.isDead()) {
            return true;
        }
        return this.y < 170;
    }

    /**
     * Handles falling mechanics for the character and the Endboss.
     */
    isFallingToGround() {
        if (this instanceof Endboss) {
            this.endbossIsFalling();
        } else {
            this.characterIsFalling();
        }
    }

    /**
     * Handles the Endboss's falling behavior.
     */
    endbossIsFalling() {
        this.y -= this.speedY * 4;
        this.speedY -= this.acceleration * 4;
    }

    /**
     * Handles the character's falling behavior.
     */
    characterIsFalling() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;

        // Ensure the character does not fall below the ground level
        if (this.y > 170 && this instanceof Character) {
            this.landOnGround();
        }
    }

    /**
     * Checks if this object is colliding with another movable object.
     * 
     * @param {MovableObject} mo - The object to check collision with.
     * @returns {boolean} - Returns true if a collision is detected.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Checks if the object is falling on top of an enemy.
     * 
     * @param {MovableObject} enemy - The enemy object to check against.
     * @returns {boolean} - Returns true if the object is falling on the enemy.
     */
    isFallingOn(enemy) {
        return (
            this.speedY > 0 &&
            this.y + this.height - this.offset.bottom <= enemy.y + enemy.offset.top &&
            this.x + this.width - this.offset.right > enemy.x + enemy.offset.left &&
            this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right
        );
    }

    /**
     * Makes the character jump on a chicken and play a sound.
     */
    jumpOnChicken() {
        if (this.speedY <= 0) {
            this.jump(20);
            audioManager.setVolume(SOUNDS.JUMPING, 0.5);
            audioManager.play(SOUNDS.JUMPING);
        }
    }

    /**
     * Handles when the object is hit, reducing its energy.
     */
    hit() {
        if (this.isDead()) {
            return;
        }
        this.energy -= 10;

        if (!this.world.endboss.isDead()) {
            this.checkCharacterDeathOrHit();
        }
    }

    /**
     * Checks if the character has died or just taken a hit.
     */
    checkCharacterDeathOrHit() {
        if (!this.world.endboss.isDead()) {
            if (this.energy <= 0 && this instanceof Character) {
                this.energy = 0;
                this.dead = true;
                audioManager.setVolume(SOUNDS.LOOSE_GAME, 0.5);
                audioManager.play(SOUNDS.LOOSE_GAME);
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
     * Handles collecting objects such as coins and bottles.
     */
    hitObject() {
        if (this instanceof Coin) {
            this.coinAmount += 20;
        } else if (this instanceof Bottle) {
            this.bottleAmount += 20;
        }
    }

    /**
     * Checks if the object is currently hurt.
     * 
     * @returns {boolean} - Returns true if the object is still in the hurt animation.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    /**
     * Checks if the object is dead.
     * 
     * @returns {boolean} - Returns true if the object is dead.
     */
    isDead() {
        return this.dead || this.energy == 0;
    }

    /**
     * Plays an animation by cycling through an array of images.
     * 
     * @param {string[]} images - The array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump with a specified speed.
     * 
     * @param {number} speedY - The upward speed of the jump.
     */
    jump(speedY) {
        this.speedY = speedY;
    }
}