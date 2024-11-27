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
    energy;
    coinAmount = 0;
    bottleAmount = 0;
    lastHit = 0;
    dead = false;
    dyingSoundPlayed = false;
    currentAnimation = null;
    
    taking_damage_sound = new Audio('../assets/audio/taking_damage.mp3');
    dying_sound = new Audio('../assets/audio/loose.mp3');
    dying_sound_enemy = new Audio('../assets/audio/chicken.mp3');
    reach_endboss_sound = new Audio('../assets/audio/endboss.mp3');
    jumping_sound = new Audio('../assets/audio/jump.mp3');


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
        if (!mo || !mo.offset) {
            return false;
        }

        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    isFallingOn(mo) {
        return this.speedY < 0 && (this.y + this.height - this.offset.bottom) <= (mo.y + mo.offset.top);
    }


    // hit() {
    //     this.energy -= 10;

    //     if (this instanceof Character && !this.isAboveGround()) {
    //         this.taking_damage_sound.play();
    //     }

    //     if ((this instanceof ChickenBig || this instanceof ChickenSmall || this instanceof Endboss) && this.energy <= 0) {
    //         this.dying_sound_enemy.play();
    //         this.playAnimation(this.IMAGES_DEAD);
    //     }

    //     if (this.energy <= 0 && this instanceof Character) {
    //         this.dying_sound.play();
    //         this.energy = 0;
    //     } else {
    //         this.lastHit = new Date().getTime();
    //     }
    // }


    hit() {
        if (this.isDead()) {
            return;
        }

        this.energy -= 10;

        if (!this.world.endboss.isDead()) {
            // if (this instanceof Character && !this.isAboveGround()) {
            //     this.taking_damage_sound.play();
            // }

            // if (this.energy <= 0 && this instanceof ChickenBig || this instanceof ChickenSmall) {
            //     this.energy = 0;
            //     this.dead = true;
            //     this.dying_sound_enemy.play();
            //     this.playAnimation(this.IMAGES_DEAD);
            // }

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


    // die() {
    //     if (!this.dead) {
    //         this.dead = true;
    //         this.playAnimation(this.IMAGES_DEAD);
    //         this.speed = 0;
    //     } 
    // }


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
        this.jumping_sound.play();
    }
}