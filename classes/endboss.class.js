class Endboss extends MovableObject {
    world;
    level = level1;
    y = 10;
    width = 300;
    height = 450;
    IMAGES_WALKING = [
        '../assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        '../assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        '../assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        '../assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        '../assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACKING = [
        '../assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        '../assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        '../assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        '../assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        '../assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        '../assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        '../assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        '../assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURTING = [
        '../assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DYING = [
        '../assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        '../assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        '../assets/img/4_enemie_boss_chicken/5_dead/G26.png'
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
    isMovingLeft = false;
    endbossAlert = false;
    firstContact = false;
    endbossIsHurt = false;
    dyingSoundPlayed = false;
    moveLeftInterval = null;
    currentAnimation = null;

    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DYING);
        this.animate();
        this.x = 2500;
    }


    animate() {
        this.setStoppableIntervals(() => {
            this.manageEndbossActions();
        }, 150);

        // this.setStoppableIntervals(() => {
        //     this.playAnimation(this.IMAGES_ALERT);
        // }, 200);

        this.setStoppableIntervals(() => {
            if (this.isDead()) {
                this.updateDyingAnimation();
            } else if (this.isHurt()) {
                this.updateHurtingAnimation();
            }
        }, 1000 / 60);
    }


    stopCurrentAnimation() {
        clearInterval(this.currentAnimation);
        this.currentAnimation = null;
    }


    manageEndbossActions() {
        if (this.endbossIsHurt) {
            return;
        }

        if (this.world && this.world.character) {
            this.distance = Math.abs(this.world.character.x - this.x);

            if (this.distance < 200) {
                this.triggerEndbossAttack();
            } else if (this.distance < 400 && !this.firstContact) {
                this.triggerEndbossAlert();
            } else if (this.distance >= 200) {
                this.triggerEndbossWalking();
            }
        }
    }


    triggerEndbossWalking() {
        if (!this.endbossIsHurt) {  // Prevent walking animation while hurt
            this.stopCurrentAnimation();
            this.playAnimation(this.IMAGES_WALKING);
            if (!this.isMovingLeft) {
                this.isMovingLeft = true;
                this.endbossMoveLeft();
            }
        }
    }


    endbossMoveLeft() {
        if (!this.moveLeftInterval) {
            this.speed = 0.15;
            this.moveLeftInterval = setInterval(() => {
                if (this.isMovingLeft && !this.endbossIsHurt) {  // Prevent moving while hurt
                    this.moveLeft();
                }
            }, 75);
        }
    }


    triggerEndbossAttack() {
        if (!this.endbossIsHurt) {  // Prevent attack animation while hurt
            this.stopCurrentAnimation();
            this.playAnimation(this.IMAGES_ATTACKING);
        }
    }


    triggerEndbossAlert() {
        if (!this.endbossIsHurt) {  // Prevent alert animation while hurt
            this.stopCurrentAnimation();
            this.currentAnimation = setInterval(() => {
                this.playAnimation(this.IMAGES_ALERT);
                this.stopCurrentAnimation();
            }, 200);

            this.firstContact = true;
            this.isMovingLeft = true;
            this.endbossMoveLeft();
        }
    }


    // isHitted() {
    //     // Ensure the hurting animation plays when hit
    //     this.playHurtingAnimation();
    // }


    // updateHurtingAnimation() {
    //     if (this.endbossIsHurt) {
    //         this.playHurtingAnimation();
    //     }
    // }


    updateHurtingAnimation() {
        this.playHurtingAnimation();
    }


    playHurtingAnimation() {
        this.endbossIsHurt = true;
        this.stopCurrentAnimation();
        this.playAnimation(this.IMAGES_HURTING);

        setTimeout(() => {
            this.endbossIsHurt = false;
        }, 500);
    }


    // updateDyingAnimation() {
    //     if (this.isDead()) {
    //         this.stopCurrentAnimation();
    //         this.playAnimation(this.IMAGES_DYING);
    //         this.isFallingToGround();
    //     }
    // }


    updateDyingAnimation() {
        if (this.isDead()) {
            this.stopCurrentAnimation();
            this.playAnimation(this.IMAGES_DYING);

            if (!this.dyingSoundPlayed && this.dying_sound_enemy.paused) {
                this.dying_sound_enemy.play();
                this.dyingSoundPlayed = true;
            }

            this.isFallingToGround();

            setTimeout(() => {
                this.stopInterval();
            }, 150);
        }
    }
}
