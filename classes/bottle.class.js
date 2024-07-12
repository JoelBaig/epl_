class Bottle extends MovableObject {
    x = 100;
    y = 350;
    height = 80;
    width = 90;
    IMAGE = [
        '../assets/img/6_salsa_bottle/salsa_bottle.png'
    ]
    IMAGES_GROUND = [
        '../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
    offset = {
        top: 20,
        bottom: 5,
        left: 30,
        right: 45
    };

    constructor() {
        super().loadImage(this.IMAGE[0]);
        this.loadImages(this.IMAGES_GROUND);
        this.x = 300 + Math.random() * 1600;
        this.animate();
    }


    animate() {
        this.setStoppableIntervals(() => {
            this.playAnimation(this.IMAGES_GROUND);
        }, 5000 / 15);
    }
}