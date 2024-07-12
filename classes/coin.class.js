class Coin extends MovableObject {
    x = 100;
    y = 150;
    height = 100;
    width = 100;
    IMAGE = [
        '../assets/img/8_coin/coin_1.png'
    ];
    IMAGES_COIN = [
        '../assets/img/8_coin/coin_1.png',
        '../assets/img/8_coin/coin_2.png'
    ];
    offset = {
        top:  60,
        bottom: 30,
        left: 30,
        right: 60
    };

    constructor() {
        super().loadImage(this.IMAGE[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = 300 + Math.random() * 1600;
        this.y = 200 + Math.random() * 150;
        this.animate();
    }


    animate() {
        this.setStoppableIntervals(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 5000 / 15);
    }
}