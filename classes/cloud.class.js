class Cloud extends MovableObject {
    width = 350;
    height = 250;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
            this.resetPosition();
        }, 1000 / 60);
    }


    resetPosition() {
        if (this.x == - 719) {
            this.x = 2900;
        }
    }
}
