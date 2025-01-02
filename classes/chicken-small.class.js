class ChickenSmall extends MovableObject {
    y = 365;
    width = 40;
    height = 60;
    IMAGES_WALKING = [
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        '../assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png',

    ];
    offset = {
        top: 10,
        bottom: 5,
        left: 5,
        right: 5
    };
    energy = 10;
    dead = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 2000;
        this.speed = 0.5 + Math.random() * 0.5;
        this.animate();
    }


    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);

        setStoppableInterval(() => {
            if (!this.dead) {
                this.moveLeft();
            }
        }, 1000 / 30);
    }


    isDead() {
        if (!this.dead) {
            this.dead = true;
            setStoppableInterval(() => {
                this.playAnimation(this.IMAGES_DEAD);
            }, 100 / 60);
            audioManager.play(SOUNDS.DYING_ENEMY);
            this.speed = 0;
            setTimeout(() => {
                if (this.world) {
                    this.world.deleteObjectFromArray(this.world.level.enemies, this);
                }
            }, 1000);
        }
    }
}