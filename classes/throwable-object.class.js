class ThrowableObject extends MovableObject {
    height = 80;
    width = 90;
    IMAGES_ROTATING = [
        './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASHING = [
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, otherDirection) {
        super().loadImage(this.IMAGES_ROTATING[0]);
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_SPLASHING);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.setX();
        this.throw();
    }


    setX() {
        if (this.otherDirection) {
            this.x = this.x - 60;
        }
    }


    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            this.updateThrow();
        }, 20);
    }


    updateThrow() {
        if (this.otherDirection) {
            this.x -= 10;
        } else {
            this.x += 10;
        }
        this.playAnimation(this.IMAGES_ROTATING);
    }


    hit(x, y) {
        clearInterval(this.throwInterval);
        clearInterval(this.gravity);
        this.x = x;
        this.y = y;
        this.speedY = 0;
        this.speed = 0;
        this.playAnimation(this.IMAGES_SPLASHING);
    }
}