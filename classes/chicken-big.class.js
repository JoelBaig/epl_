class ChickenBig extends MovableObject {
    y = 365;
    width = 50;
    height = 70;
    IMAGES_WALKING = [
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.35;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);


        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}