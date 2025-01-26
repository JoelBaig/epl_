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


    preloadImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
    }


    animate() {
        this.handleEndbossDefeat();
        this.manageEndbossState();
        this.checkHealthStatus();
    }


    handleEndbossDefeat() {
        setTimeout(() => {
            if (this.endbossIsDead) {
                gameWon();
            }
        }, 1000);
    }


    manageEndbossState() {
        setStoppableInterval(() => {
            this.manageEndbossActions();
        }, 150);
    }


    checkHealthStatus() {
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.updateDyingAnimation();
            } else if (this.isHurt()) {
                this.updateHurtingAnimation();
            }
        }, 5000 / 60);
    }


    manageEndbossActions() {
        this.manageEndbossIsHurt();
        this.manageEndbossReactions();
        this.trackCharacter();
    }


    manageEndbossIsHurt() {
        if (this.endbossIsHurt) {
            return;
        }
    }


    manageEndbossReactions() {
        if (this.world && this.world.character) {
            this.distance = Math.abs(this.world.character.x - this.x);
            this.handleReactions();
        }
    }


    handleReactions() {
        if (this.isFirstContact()) {
            this.handleAlert();
        } else if (this.firstContact && this.distance < 400) {
            this.triggerEndbossAttack();
        } else if (this.firstContact) {
            this.triggerEndbossWalking();
        }
    }


    isFirstContact() {
        return this.distance < 400 && !this.firstContact;
    }


    handleAlert() {
        this.firstContact = true;
        audioManager.setVolume(SOUNDS.REACH_ENDBOSS, 0.5);
        audioManager.play(SOUNDS.REACH_ENDBOSS);
        this.triggerEndbossAlert();
    }


    triggerEndbossWalking() {
        if (!this.endbossIsHurt) {
            this.stopCurrentAnimation();
            this.playAnimation(this.IMAGES_WALKING);
            this.trackCharacter();
        }
    }


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


    moveInDirection(direction) {
        if (!this.firstContact) {
            return;
        }
        this.clearMoveIntervals();
        this.setMovementDirection(direction);
        this.setSpeed();
        this.traceCharacter();
    }


    traceCharacter() {
        if (this.isMovingLeft) {
            this.startMovingLeft();
        } else if (this.isMovingRight) {
            this.startMovingRight();
        }
    }


    clearMoveIntervals() {
        clearInterval(this.moveLeftInterval);
        clearInterval(this.moveRightInterval);
    }

    setMovementDirection(direction) {
        this.isMovingLeft = direction === "left";
        this.isMovingRight = direction === "right";
        this.otherDirection = direction === "right";
    }

    setSpeed() {
        this.speed = 15;
    }

    startMovingLeft() {
        this.moveLeftInterval = setInterval(() => {
            if (this.firstContact && !this.endbossIsHurt && !this.isDead()) {
                this.moveLeft();
            }
        }, 75);
    }

    startMovingRight() {
        this.moveRightInterval = setInterval(() => {
            if (this.firstContact && !this.endbossIsHurt && !this.isDead()) {
                this.moveRight();
            }
        }, 75);
    }


    triggerEndbossAttack() {
        if (!this.endbossIsHurt) {
            this.stopCurrentAnimation();
            this.playAnimation(this.IMAGES_ATTACKING);
        }
    }


    triggerEndbossAlert() {
        if (!this.endbossIsHurt) {
            this.stopCurrentAnimation();
            this.currentAnimation = setInterval(() => {
                this.playAnimation(this.IMAGES_ALERT);
            }, 500);
            this.clearAlertAnimationTimeout();
        }
    }


    clearAlertAnimationTimeout() {
        setTimeout(() => {
            clearInterval(this.currentAnimation);
            this.currentAnimation = null;
        }, 2000);
    }


    updateHurtingAnimation() {
        this.playHurtingAnimation();
    }


    playHurtingAnimation() {
        this.endbossIsHurt = true;
        this.stopCurrentAnimation();
        this.playAnimation(this.IMAGES_HURTING);
        this.hurtingAnimationTimeout();
    }


    hurtingAnimationTimeout() {
        setTimeout(() => {
            this.endbossIsHurt = false;
        }, 200);
    }


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


    dyingAnimationTimeout() {
        setTimeout(() => {
            stopInterval();
            audioManager.pause(SOUNDS.GAME_MUSIC);
            audioManager.pause(SOUNDS.WALKING);
            gameWon();
        }, 500);
    }


    playEndbossDyingSound() {
        if (!this.dyingSoundPlayed) {
            this.dyingSoundPlayed = true;
            audioManager.setVolume(SOUNDS.DYING_ENDBOSS, 0.5);
            audioManager.play(SOUNDS.DYING_ENDBOSS);
        }
    }


    stopCurrentAnimation() {
        clearInterval(this.currentAnimation);
        this.currentAnimation = null;
    }
}
