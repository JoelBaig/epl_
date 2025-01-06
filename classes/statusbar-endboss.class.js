class EndbossHealthBar extends StatusBar {
    constructor() {
        super();
        this.IMAGES = [
            './assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
            './assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
            './assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
            './assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
            './assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
            './assets/img/7_statusbars/2_statusbar_endboss/green/green100.png'
        ];
        this.y = -50;
        this.x = 510;
        this.height = 60;
        this.width = 200;
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}