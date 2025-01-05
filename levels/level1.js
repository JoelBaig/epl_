let level1;

function initLevel() {
    level1 = new Level(
        [
            new BackgroundObject('./assets/img/5_background/layers/air.png', -719),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', -719),
        
            new BackgroundObject('./assets/img/5_background/layers/air.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 0),
        
            new BackgroundObject('./assets/img/5_background/layers/air.png', 719),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719),
        
            new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 719 * 2),
        
            new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719 * 3),
        
            new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 719 * 4),
        ],
        [
            new Cloud('./assets/img/5_background/layers/4_clouds/1.png', 100, 0),
            new Cloud('./assets/img/5_background/layers/4_clouds/2.png', 500, 0),
            new Cloud('./assets/img/5_background/layers/4_clouds/1.png', 900, 0),
            new Cloud('./assets/img/5_background/layers/4_clouds/2.png', 1300, 0),
            new Cloud('./assets/img/5_background/layers/4_clouds/1.png', 1700, 0),
            new Cloud('./assets/img/5_background/layers/4_clouds/2.png', 2100, 0),
            new Cloud('./assets/img/5_background/layers/4_clouds/2.png', 2500, 0),
            new Cloud('./assets/img/5_background/layers/4_clouds/2.png', 2900, 0),
            new Cloud('./assets/img/5_background/layers/4_clouds/2.png', 3300, 0),
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],
        [
            new ChickenBig(),
            new ChickenBig(),
            new ChickenBig(),
            new ChickenBig(),
            new ChickenBig(),
            new ChickenBig(),

            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
        ]
    );
}