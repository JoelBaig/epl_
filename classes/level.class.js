class Level {
    backgroundObjects;
    clouds;
    bottles;
    coins;
    enemies;
    level_end_x = 2700;

    constructor(backgroundObjects, clouds, bottles, coins, enemies) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
    }
}