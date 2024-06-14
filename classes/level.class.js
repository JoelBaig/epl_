class Level {
    backgroundObjects;
    clouds;
    enemies;
    endboss;
    level_end_x = 2700;

    constructor(backgroundObjects, clouds, enemies, endboss) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
    }
}