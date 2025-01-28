class Endboss extends MovableObject {
    world;
    level = level1;
    y = 10;
    width = 300;
    height = 450;
    IMAGES_WALKING = [
        './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACKING = [
        './assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURTING = [
        './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        './assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    offset = {
        top: 110,
        left: 50,
        right: 90,
        bottom: 20
    };
    speed = 0;
    energy = 100;
    distance;
    isMovingRight = false;
    isMovingLeft = false;
    endbossAlert = false;
    firstContact = false;
    endbossIsHurt = false;
    dyingSoundPlayed = false;
    moveLeftInterval = null;
    moveRightInterval = null;
    endbossIsDead = false;

    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.preloadImages();
        this.animate();
        this.x = 2500;
    }

    /**
     * Preloads all images for different Endboss animations.
     */
    preloadImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
    }

    /**
     * Manages the Endboss animations and actions.
     */
    animate() {
        this.handleEndbossDefeat();
        this.manageEndbossState();
        this.checkHealthStatus();
    }

    /**
     * Triggers the game won screen when the Endboss is defeated.
     */
    handleEndbossDefeat() {
        setTimeout(() => {
            if (this.endbossIsDead) {
                gameWon();
            }
        }, 1000);
    }

    /**
     * Starts a loop to manage the Endboss's actions.
     */
    manageEndbossState() {
        setStoppableInterval(() => {
            this.manageEndbossActions();
        }, 150);
    }

    /**
     * Continuously checks the Endboss's health and updates its state.
     */
    checkHealthStatus() {
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.updateDyingAnimation();
            } else if (this.isHurt()) {
                this.updateHurtingAnimation();
            }
        }, 5000 / 60);
    }

    /**
     * Manages the Endboss's reactions and movements.
     */
    manageEndbossActions() {
        this.manageEndbossIsHurt();
        this.manageEndbossReactions();
        this.trackCharacter();
    }

    /**
     * Prevents actions if the Endboss is currently hurt.
     */
    manageEndbossIsHurt() {
        if (this.endbossIsHurt) {
            return;
        }
    }

    /**
     * Determines the Endboss's reaction based on the player's position.
     */
    manageEndbossReactions() {
        if (this.world && this.world.character) {
            this.distance = Math.abs(this.world.character.x - this.x);
            this.handleReactions();
        }
    }

    /**
     * Handles different states of the Endboss based on distance.
     */
    handleReactions() {
        if (this.isFirstContact()) {
            this.handleAlert();
        } else if (this.firstContact && this.distance < 400) {
            this.triggerEndbossAttack();
        } else if (this.firstContact) {
            this.triggerEndbossWalking();
        }
    }

    /**
     * Checks if the player is close enough for first contact.
     * 
     * @returns {boolean} - Whether first contact has occurred.
     */
    isFirstContact() {
        return this.distance < 400 && !this.firstContact;
    }

    /**
     * Triggers the alert animation when first contact occurs.
     */
    handleAlert() {
        this.firstContact = true;
        audioManager.setVolume(SOUNDS.REACH_ENDBOSS, 0.5);
        audioManager.play(SOUNDS.REACH_ENDBOSS);
        this.triggerEndbossAlert();
    }

    /**
     * Triggers the Endboss's walking animation.
     */
    triggerEndbossWalking() {
        if (!this.endbossIsHurt) {
            this.stopCurrentAnimation();
            this.playAnimation(this.IMAGES_WALKING);
            this.trackCharacter();
        }
    }

    /**
     * Moves the Endboss based on the player's position.
     */
    trackCharacter() {
        if (!this.firstContact) {
            return;
        }

        const characterX = this.world.character.x;
        const endbossX = this.x;

        if (characterX < endbossX) {
            this.moveInDirection("left");
        } else {
            this.moveInDirection("right");
        }
    }

    /**
     * Moves the Endboss left or right based on the player's position.
     * 
     * @param {string} direction - The direction to move ("left" or "right").
     */
    moveInDirection(direction) {
        if (!this.firstContact) {
            return;
        }
        this.clearMoveIntervals();
        this.setMovementDirection(direction);
        this.setSpeed();
        this.traceCharacter();
    }

    /**
     * Starts movement in the determined direction.
     */
    traceCharacter() {
        if (this.isMovingLeft) {
            this.startMovingLeft();
        } else if (this.isMovingRight) {
            this.startMovingRight();
        }
    }

    /**
     * Clears movement intervals to prevent conflicts.
     */
    clearMoveIntervals() {
        clearInterval(this.moveLeftInterval);
        clearInterval(this.moveRightInterval);
    }

    /**
     * Sets the movement direction.
     * 
     * @param {string} direction - The movement direction.
     */
    setMovementDirection(direction) {
        this.isMovingLeft = direction === "left";
        this.isMovingRight = direction === "right";
        this.otherDirection = direction === "right";
    }

    /**
     * Sets the Endboss's speed.
     */
    setSpeed() {
        this.speed = 15;
    }

    /**
     * Starts moving the Endboss to the left.
     */
    startMovingLeft() {
        this.moveLeftInterval = setInterval(() => {
            if (this.firstContact && !this.endbossIsHurt && !this.isDead()) {
                this.moveLeft();
            }
        }, 75);
    }

    /**
     * Starts moving the Endboss to the right.
     */
    startMovingRight() {
        this.moveRightInterval = setInterval(() => {
            if (this.firstContact && !this.endbossIsHurt && !this.isDead()) {
                this.moveRight();
            }
        }, 75);
    }

    /**
     * Triggers the Endboss attack animation.
     */
    triggerEndbossAttack() {
        if (!this.endbossIsHurt) {
            this.stopCurrentAnimation();
            this.playAnimation(this.IMAGES_ATTACKING);
        }
    }

    /**
     * Triggers the alert animation when the Endboss first notices the player.
     */
    triggerEndbossAlert() {
        if (!this.endbossIsHurt) {
            this.stopCurrentAnimation();
            this.currentAnimation = setInterval(() => {
                this.playAnimation(this.IMAGES_ALERT);
            }, 500);
            this.clearAlertAnimationTimeout();
        }
    }

    /**
     * Stops the alert animation after a delay.
     */
    clearAlertAnimationTimeout() {
        setTimeout(() => {
            clearInterval(this.currentAnimation);
            this.currentAnimation = null;
        }, 2000);
    }

    /**
     * Updates the Endboss's hurting animation.
     */
    updateHurtingAnimation() {
        this.playHurtingAnimation();
    }

    /**
     * Plays the Endboss's hurting animation.
     */
    playHurtingAnimation() {
        this.endbossIsHurt = true;
        this.stopCurrentAnimation();
        this.playAnimation(this.IMAGES_HURTING);
        this.hurtingAnimationTimeout();
    }

    /**
     * Stops the hurting animation after a delay.
     */
    hurtingAnimationTimeout() {
        setTimeout(() => {
            this.endbossIsHurt = false;
        }, 200);
    }

    /**
     * Updates the Endboss's dying animation.
     */
    updateDyingAnimation() {
        if (this.isDead()) {
            this.endbossIsDead = true;
            this.stopCurrentAnimation();
            this.playAnimation(this.IMAGES_DEAD);
            this.isFallingToGround();
            this.playEndbossDyingSound();
            this.dyingAnimationTimeout();
        }
    }

    /**
     * Stops the game after the Endboss dies.
     */
    dyingAnimationTimeout() {
        setTimeout(() => {
            stopInterval();
            audioManager.pause(SOUNDS.GAME_MUSIC);
            audioManager.pause(SOUNDS.WALKING);
            gameWon();
        }, 500);
    }

    /**
     * Plays the Endboss's dying sound.
     */
    playEndbossDyingSound() {
        if (!this.dyingSoundPlayed) {
            this.dyingSoundPlayed = true;
            audioManager.setVolume(SOUNDS.DYING_ENDBOSS, 0.5);
            audioManager.play(SOUNDS.DYING_ENDBOSS);
        }
    }

    /**
     * Stops the current animation.
     */
    stopCurrentAnimation() {
        clearInterval(this.currentAnimation);
        this.currentAnimation = null;
    }
}