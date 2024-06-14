class Endboss extends MovableObject {
    y = 10;
    width = 300;
    height = 450;
    IMAGE = [
        '../assets/img/4_enemie_boss_chicken/2_alert/G5.png'
    ];
    IMAGES_WALKING = [
        '../assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        '../assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        '../assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        '../assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        '../assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        '../assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        '../assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        '../assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    animationStarted = false;

    constructor() {
        super().loadImage(this.IMAGE[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.x = 2500;
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 80);


        setInterval(() => {
            this.moveLeft();
        }, 50 / 60);
    }
}