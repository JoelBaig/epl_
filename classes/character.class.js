class Character extends MovableObject {
    world;
    level = level1;
    x = 100;
    y = 100;
    width = 120;
    height = 260;
    IMAGES_WALKING = [
        '../assets/img/2_character_pepe/2_walk/W-21.png',
        '../assets/img/2_character_pepe/2_walk/W-22.png',
        '../assets/img/2_character_pepe/2_walk/W-23.png',
        '../assets/img/2_character_pepe/2_walk/W-24.png',
        '../assets/img/2_character_pepe/2_walk/W-25.png',
        '../assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        '../assets/img/2_character_pepe/3_jump/J-31.png',
        '../assets/img/2_character_pepe/3_jump/J-32.png',
        '../assets/img/2_character_pepe/3_jump/J-33.png',
        '../assets/img/2_character_pepe/3_jump/J-34.png',
        '../assets/img/2_character_pepe/3_jump/J-35.png',
        '../assets/img/2_character_pepe/3_jump/J-36.png',
        '../assets/img/2_character_pepe/3_jump/J-37.png',
        '../assets/img/2_character_pepe/3_jump/J-38.png',
        '../assets/img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURTING = [
        '../assets/img/2_character_pepe/4_hurt/H-41.png',
        '../assets/img/2_character_pepe/4_hurt/H-42.png',
        '../assets/img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DYING = [
        '../assets/img/2_character_pepe/5_dead/D-51.png',
        '../assets/img/2_character_pepe/5_dead/D-52.png',
        '../assets/img/2_character_pepe/5_dead/D-53.png',
        '../assets/img/2_character_pepe/5_dead/D-54.png',
        '../assets/img/2_character_pepe/5_dead/D-55.png',
        '../assets/img/2_character_pepe/5_dead/D-56.png',
        '../assets/img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_IDLE = [
        '../assets/img/2_character_pepe/1_idle/idle/I-1.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-2.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-3.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-4.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-5.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-6.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-7.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-8.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-9.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        '../assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    speed = 20;
    offset = {
        top: 120,
        bottom: 15,
        left: 30,
        right: 60
    };
    energy = 1000000;
    hurt = false;
    currentTime;
    characterIsDead = false;
    waiting = false;
    longWaiting = false;

    walking_sound = new Audio('../assets/audio/running.mp3');

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.jump();
    }


    animate() {
        setStoppableInterval(() => {
            this.updateWalkingDirection();
            this.handleJump();
            this.updateCameraPosition();
            if (this.characterIsDead) {
                gameOver();
            }
        }, 2500 / 60);


        setStoppableInterval(() => {
            if (this.isDead()) {
                this.updateDyingAnimation();
            } else if (this.isHurt()) {
                this.updateHurtingAnimation();
            } else {
                this.updateJumpingAnimation();
                this.updateWalkingAnimation();
            }

            this.firstArrivel();
        }, 1000 / 10);
    }


    firstArrivel() {
        if (gameStarted && !this.toWorld) {
            this.toWorld = true;
            this.startIdleTimer();
        }
    }


    startIdleTimer() {
        this.currentTime = new Date().getTime();
    }


    updateWalkingDirection() {
        this.walking_sound.pause();
        this.handleWalkingRight();
        this.handleWalkingLeft();
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
        this.walking_sound.play();
    }


    isWalkingLeft() {
        this.moveLeft();
        this.walking_sound.play();
    }


    handleJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.startIdleTimer();
        }
    }


    updateDyingAnimation() {
        if (this.isDead()) {
            this.characterIsDead = true;
            this.playAnimation(this.IMAGES_DYING);
            this.isFallingToGround();
            setTimeout(() => {
                stopInterval();
                gameOver();
            }, 200);
        }
    }


    updateHurtingAnimation() {
        this.startIdleTimer();
        if (this.isHurt()) {
            this.hurt = true;
            this.playAnimation(this.IMAGES_HURTING);
        }
    }


    updateJumpingAnimation() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.startIdleTimer();
        } else if (this.world.keyboard.SPACE) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.startIdleTimer();
        } else {
            this.loadImage(this.IMAGES_WALKING[0]);
        }
    }


    updateWalkingAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.startIdleTimer();
        } else if (!this.world.keyboard.RIGHT || !this.world.keyboard.LEFT || !this.world.keyboard.SPACE || !this.isHurt()) {
            setTimeout(() => {
                this.nothingToDo();
            }, 3000);
        }
    }


    nothingToDo() {
        let timepassed = this.proofTime();
        if (timepassed > 5 && gameStarted) {
            this.longWait();
        } else if (timepassed > 3 && gameStarted) {
            this.wait();
        }
    }


    proofTime() {
        let time = new Date().getTime();
        let timepassed = time - this.currentTime;
        timepassed = timepassed / 1000;
        return timepassed;
    }


    wait() {
        if (!this.isWalkingLeft || !this.isWalkingRight || this.jump || this.isHurt()) {
            this.longWaiting = false;
            this.waiting = true;
        }
        this.playAnimation(this.IMAGES_IDLE);
    }


    longWait() {
        if (!this.isWalkingLeft || !this.isWalkingRight || this.jump || this.isHurt()) {
            this.longWaiting = true;
            this.waiting = false;
        }
        this.playAnimation(this.IMAGES_LONG_IDLE);
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