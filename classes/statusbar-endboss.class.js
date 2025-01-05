class EndbossHealthBar extends DrawableObject {
    IMAGES = [
        './assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        './assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        './assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        './assets/img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];
    percentage = 100;
    y = -50;
    x = 510;
    height = 60;
    width = 200;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else if (this.percentage >= 0) {
            return 0;
        }
    }
}