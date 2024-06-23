class Level {
    backgroundObjects;
    clouds;
    bottles;
    coins;
    enemies;
    endboss;
    level_end_x = 2700;

    constructor(backgroundObjects, clouds, bottles, coins, enemies, endboss) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
        this.endboss = endboss;
    }
}