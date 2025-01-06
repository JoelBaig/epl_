class CoinBar extends StatusBar {
    constructor() {
        super();
        this.IMAGES = [
            './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
            './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
            './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
            './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
            './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
            './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
        ];
        this.y = 40;
        this.x = 10;
        this.height = 60;
        this.width = 200;
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }
}