class ChickenBig extends MovableObject {
    y = 345;
    width = 70;
    height = 90;
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        './assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    offset = {
        top: 10,
        bottom: 5,
        left: 5,
        right: 10
    };
    energy = 10;
    dead = false;

    /**
     * Creates a new `ChickenBig` enemy at a random position with random speed.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.preloadImages();
        this.x = 500 + Math.random() * 2000;
        this.speed = 0.8 + Math.random() * 1;
        this.animate();
    }

    /**
     * Preloads all images for walking and death animations.
     */
    preloadImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
    }

    /**
     * Handles the walking animation and movement of the chicken.
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);

        setStoppableInterval(() => {
            if (!this.dead) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    /**
     * Marks the chicken as dead, plays death animation, stops movement, and schedules removal.
     */
    isDead() {
        if (!this.dead) {
            this.dead = true;
            this.playDeathAnimation();
            this.scheduleRemoval();
            audioManager.play(SOUNDS.DYING_ENEMY);
            this.speed = 0;
        }
    }

    /**
     * Plays the death animation by displaying the dead chicken sprite.
     */
    playDeathAnimation() {
        let currentFrame = 0;

        let intervalId = setInterval(() => {
            this.playAnimation([this.IMAGES_DEAD[currentFrame]]);
            currentFrame++;
            this.clearDeathInterval(intervalId, currentFrame);
        }, 200);
    }

    /**
     * Clears the death animation interval once all frames are displayed.
     * 
     * @param {number} intervalId - The interval ID of the animation.
     * @param {number} currentFrame - The current frame index in the death animation.
     */
    clearDeathInterval(intervalId, currentFrame) {
        if (currentFrame >= this.IMAGES_DEAD.length) {
            clearInterval(intervalId);
            this.image = this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1];
        }
    }

    /**
     * Schedules the removal of the chicken from the game world after a short delay.
     */
    scheduleRemoval() {
        setTimeout(() => {
            if (this.world) {
                this.world.deleteObjectFromArray(this.world.level.enemies, this);
            }
        }, 1000);
    }
}