class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    groundLevel = 170;
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

    taking_damage_sound = new Audio('../assets/audio/taking_damage.mp3');
    dying_sound = new Audio('../assets/audio/loose.mp3');
    dying_sound_enemy = new Audio('../assets/audio/chicken.mp3');
    reach_endboss_sound = new Audio('../assets/audio/endboss.mp3');
    jumping_sound = new Audio('../assets/audio/jump.mp3');


    applyGravity() {
        this.gravity = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.isFallingToGround();

                // if (this.y >= this.groundLevel) {
                //     this.y = this.groundLevel;
                //     this.speedY = 0;
                // }
            }
        }, 1000 / 60);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < 170;
    }


    isFallingToGround() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }


    isFallingOn(enemy) {
        return (
            this.speedY > 0 &&
            this.y + this.height - this.offset.bottom <= enemy.y + enemy.offset.top &&
            this.x + this.width - this.offset.right > enemy.x + enemy.offset.left &&
            this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right
        );
    }


    jumpOnChicken() {
        if (this.speedY <= 0) {
            this.jump(20);
        }
    }


    hit() {
        if (this.isDead()) {
            return;
        }

        this.energy -= 10;

        if (!this.world.endboss.isDead()) {
            if (this.energy <= 0 && this instanceof Character) {
                this.energy = 0;
                this.dead = true;
                this.dying_sound.play();
            } else {
                this.lastHit = new Date().getTime();
                this.taking_damage_sound.play();
            }
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
        return this.dead || this.energy == 0;
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


    jump(speedY) {
            this.speedY = speedY; // Sprunggeschwindigkeit setzen
    }
}