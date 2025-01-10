class Character extends MovableObject {
    world;
    level = level1;
    x = 100;
    y = 170;
    width = 120;
    height = 260;
    IMAGES_WALKING = [
        './assets/img/2_character_pepe/2_walk/W-21.png',
        './assets/img/2_character_pepe/2_walk/W-22.png',
        './assets/img/2_character_pepe/2_walk/W-23.png',
        './assets/img/2_character_pepe/2_walk/W-24.png',
        './assets/img/2_character_pepe/2_walk/W-25.png',
        './assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './assets/img/2_character_pepe/3_jump/J-31.png',
        './assets/img/2_character_pepe/3_jump/J-32.png',
        './assets/img/2_character_pepe/3_jump/J-33.png',
        './assets/img/2_character_pepe/3_jump/J-34.png',
        './assets/img/2_character_pepe/3_jump/J-35.png',
        './assets/img/2_character_pepe/3_jump/J-36.png',
        './assets/img/2_character_pepe/3_jump/J-37.png',
        './assets/img/2_character_pepe/3_jump/J-38.png',
        './assets/img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURTING = [
        './assets/img/2_character_pepe/4_hurt/H-41.png',
        './assets/img/2_character_pepe/4_hurt/H-42.png',
        './assets/img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DYING = [
        './assets/img/2_character_pepe/5_dead/D-51.png',
        './assets/img/2_character_pepe/5_dead/D-52.png',
        './assets/img/2_character_pepe/5_dead/D-53.png',
        './assets/img/2_character_pepe/5_dead/D-54.png',
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-56.png',
        './assets/img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_IDLE = [
        './assets/img/2_character_pepe/1_idle/idle/I-1.png',
        './assets/img/2_character_pepe/1_idle/idle/I-2.png',
        './assets/img/2_character_pepe/1_idle/idle/I-3.png',
        './assets/img/2_character_pepe/1_idle/idle/I-4.png',
        './assets/img/2_character_pepe/1_idle/idle/I-5.png',
        './assets/img/2_character_pepe/1_idle/idle/I-6.png',
        './assets/img/2_character_pepe/1_idle/idle/I-7.png',
        './assets/img/2_character_pepe/1_idle/idle/I-8.png',
        './assets/img/2_character_pepe/1_idle/idle/I-9.png',
        './assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        './assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    speed = 20;
    speedY = 15;
    offset = {
        top: 120,
        bottom: 15,
        left: 15,
        right: 20
    };
    energy = 1000000;
    hurt = false;
    characterIsDead = false;
    currentTime;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.preloadImages();
        this.applyGravity();
        this.animate();
        this.jump();
    }


    preloadImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
    }


    animate() {
        this.handleMovement();
        this.handleAnimation();
        this.firstArrivel();
    }
    
    handleMovement() {
        setStoppableInterval(() => {
            this.updateWalkingDirection();
            this.handleJump();
            this.updateCameraPosition();
        }, 2500 / 60);
    }
    
    handleAnimation() {
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.updateDyingAnimation();
            } else if (this.isHurt()) {
                this.updateHurtingAnimation();
            } else {
                this.updateJumpingAnimation();
                this.updateWalkingAnimation();
            }
        }, 1000 / 10); 
    }


    firstArrivel() {
        if (gameStarted) {
            this.startIdleTimer();
        }
    }


    startIdleTimer() {
        this.currentTime = new Date().getTime();
    }


    updateWalkingDirection() {
        audioManager.setVolume(SOUNDS.WALKING, 1.0);
        audioManager.pause(SOUNDS.WALKING);
        this.handleWalkingRight();
        this.handleWalkingLeft();
        this.resetIdleTimerIfMoving();
    }


    handleWalkingRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.isWalkingRight();
            this.otherDirection = false;
        }
    }


    handleWalkingLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.isWalkingLeft();
            this.otherDirection = true;
        }
    }


    isWalkingRight() {
        this.moveRight();
        audioManager.setVolume(SOUNDS.WALKING, 1);
        audioManager.play(SOUNDS.WALKING);
    }


    isWalkingLeft() {
        this.moveLeft();
        audioManager.setVolume(SOUNDS.WALKING, 1);
        audioManager.play(SOUNDS.WALKING);
    }


    handleJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.isJumping();
            this.startIdleTimer();
        }
    }


    isJumping() {
        this.jump(20);
        audioManager.setVolume(SOUNDS.JUMPING, 0.5);
        audioManager.play(SOUNDS.JUMPING);
        this.startIdleTimer();
    }


    updateDyingAnimation() {
        if (this.isDead()) {
            this.characterIsDead = true;
            this.playAnimation(this.IMAGES_DYING);
            this.isFallingToGround();
            this.gameOverTimeout();
        }
    }


    gameOverTimeout() {
        setTimeout(() => {
            audioManager.pause(SOUNDS.GAME_MUSIC);
            audioManager.pause(SOUNDS.WALKING);
            audioManager.pause(SOUNDS.REACH_ENDBOSS);
            stopInterval();
            gameOver();
        }, 200);
    }


    updateHurtingAnimation() {
        if (this.isHurt()) {
            this.startIdleTimer();
            this.hurt = true;
            this.playAnimation(this.IMAGES_HURTING);
        }
    }


    updateJumpingAnimation() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.SPACE) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.loadImage(this.IMAGES_WALKING[0]);
        }
    }


    updateWalkingAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.isHurt()) {
            this.isDoingNothing();
        }
    }


    isDoingNothing() {
        let timepassed = this.proofTime();

        if (timepassed > 3 && timepassed <= 5) {
            this.wait();
        } else if (timepassed > 5) {
            this.longWait();
        }
    }


    proofTime() {
        if (!this.currentTime) return 0;
        let time = new Date().getTime();
        return (time - this.currentTime) / 1000;
    }


    wait() {
        this.playAnimation(this.IMAGES_IDLE);
    }


    longWait() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        audioManager.play(SOUNDS.SNORING);
    }


    resetIdleTimerIfMoving() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE || this.world.keyboard.D) {
            this.startIdleTimer();
            audioManager.pause(SOUNDS.SNORING);
        }
    }


    updateCameraPosition() {
        if (this.x < 2200) {
            this.trackCamera();
        } else if (this.x >= 2200 && this.x <= 3000) {
            this.fixCameraPosition();
        }
    }


    trackCamera() {
        this.world.camera_x = -this.x + 100;
        this.cameraFollowEndX = null;
    }


    fixCameraPosition() {
        if (this.cameraFollowEndX === null) {
            this.cameraFollowEndX = -this.x + 100;
        }
        this.world.camera_x = this.cameraFollowEndX;
    }
}