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
    IMAGES_DEAD = [
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
    endbossIsDead = false;

    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.x = 2500;
    }


    animate() {
        setStoppableInterval(() => {
            this.manageEndbossActions();
            if (this.endbossIsDead) {
                gameWon();
            }
        }, 150);

        setStoppableInterval(() => {
            if (this.isDead()) {
                this.updateDyingAnimation();
            } else if (this.isHurt()) {
                this.updateHurtingAnimation();
            }
        }, 3000 / 60);
    }


    manageEndbossActions() {
        if (this.endbossIsHurt) {
            return;
        }

        if (this.world && this.world.character) {
            this.distance = Math.abs(this.world.character.x - this.x);

            if (this.distance < 400 && !this.firstContact) {
                this.firstContact = true;
                this.reach_endboss_sound.play();
                this.triggerEndbossAlert();
            } else if (this.distance < 200) {
                this.triggerEndbossAttack();
            } else {
                this.triggerEndbossWalking();
            }
        }
    }


    triggerEndbossWalking() {
        if (!this.endbossIsHurt) {
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
                if (this.isMovingLeft && !this.endbossIsHurt) {
                    this.moveLeft();
                }
            }, 75);
        }
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
                this.stopCurrentAnimation();
            }, 500);

            this.firstContact = true;
            this.isMovingLeft = true;
            this.endbossMoveLeft();
        }
    }


    updateHurtingAnimation() {
        this.playHurtingAnimation();
    }


    playHurtingAnimation() {
        this.endbossIsHurt = true;
        this.stopCurrentAnimation();
        this.playAnimation(this.IMAGES_HURTING);

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

            setTimeout(() => {
                stopInterval();
                gameWon(); 
            }, 1000);
        }
    }


    playEndbossDyingSound() {
        if (!this.dyingSoundPlayed && this.dying_sound_enemy.paused) {
            this.dying_sound_enemy.play();
            this.dyingSoundPlayed = true;
        }
    }


    stopCurrentAnimation() {
        clearInterval(this.currentAnimation);
        this.currentAnimation = null;
    }
}
