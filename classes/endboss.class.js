class Endboss extends MovableObject {
    x = 400;
    y = 190;
    width = 90;
    height = 200;
    IMAGES_WALKING = [
        '../assets/img/4_enemie_boss_chicken/2_alert/G5.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
    }
}