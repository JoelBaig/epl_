class HealthBar extends StatusBar {
    IMAGES = [
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    y = -10;
    x = 10;
    height = 60;
    width = 200;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}