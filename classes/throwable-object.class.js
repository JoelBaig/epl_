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

    /**
     * Creates a new throwable object (bottle) at a given position.
     * 
     * @param {number} x - The initial x-coordinate of the object.
     * @param {number} y - The initial y-coordinate of the object.
     * @param {boolean} otherDirection - Whether the object is thrown to the left.
     */
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

    /**
     * Adjusts the initial x-position if the object is thrown to the left.
     */
    setX() {
        if (this.otherDirection) {
            this.x = this.x - 60;
        }
    }

    /**
     * Initiates the throwing motion, applying gravity to the object.
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            this.updateThrow();
        }, 20);
    }

    /**
     * Updates the object's position during the throw.
     */
    updateThrow() {
        if (this.otherDirection) {
            this.x -= 10;
        } else {
            this.x += 10;
        }
        this.playAnimation(this.IMAGES_ROTATING);
    }

    /**
     * Handles the impact of the object upon collision, stopping movement and triggering the splash animation.
     * 
     * @param {number} x - The x-coordinate where the object hits.
     * @param {number} y - The y-coordinate where the object hits.
     */
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