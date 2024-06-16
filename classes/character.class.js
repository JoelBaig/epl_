class Character extends MovableObject {
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
    world;
    speed = 20;
    walking_sound = new Audio('../assets/audio/running.mp3');
    offset = {
        top: 120,
        left: 30,
        right: 70,
        bottom: 15
    };

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DYING);
        this.applyGravity();
        this.animate();
        this.jump();
    }


    animate() {
        this.animationIntervals.push(setInterval(() => {
            this.walking_sound.pause();
            this.updateWalkingDirection();
            this.handleJump();
            this.updateCameraPosition();
        }, 2500 / 60));


        this.animationIntervals.push(setInterval(() => {
            if (this.isDead()) {
                this.updateDyingAnimation();
                // this.stopGame();
            } else if (this.isHurt()) {
                this.updateHurtingAnimation();
            } else {
                this.updateJumpingAnimation();
                this.updateWalkingAnimation();
            }
        }, 40));
    }


    updateWalkingDirection() {
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
        }
    }


    updateDyingAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DYING);
        }
    }


    updateHurtingAnimation() {
        if (this.isHurt()) {
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


    // stopGame() {
    //     this.speedY = 25;
    //     // this.stopAnimation();
    // }
}