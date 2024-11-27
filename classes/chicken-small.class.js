class ChickenSmall extends MovableObject {
    y = 390;
    width = 30;
    height = 40;
    IMAGES_WALKING = [
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        '../assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    offset = {
        top: 10,
        left: 5,
        right: 5,
        bottom: 5
    };
    energy = 10;
    dead = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);

        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


    die() {
        if (!this.dead) {
            this.dead = true;
            this.playAnimation(this.IMAGES_DEAD);
            this.dying_sound_enemy.play();
            this.speed = 0;
        } 
    }
}