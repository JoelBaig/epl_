class ThrowableObject extends MovableObject {
    height = 80;
    width = 90;
    IMAGES_ROTATING = [
        '../assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    constructor(x, y) {
        super().loadImage(this.IMAGES_ROTATING[0]);
        this.loadImages(this.IMAGES_ROTATING);
        this.x = x;
        this.y = y;
        this.throw();
    }


    throw() {
        this.speedY = 60;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}