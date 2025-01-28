class Level {
    backgroundObjects;
    clouds;
    bottles;
    coins;
    enemies;
    level_end_x = 2700;

    /**
     * Creates a new level instance.
     * 
     * @param {Object[]} backgroundObjects - The background objects in the level.
     * @param {Object[]} clouds - The clouds present in the level.
     * @param {Object[]} bottles - The collectible bottles in the level.
     * @param {Object[]} coins - The collectible coins in the level.
     * @param {Object[]} enemies - The enemies in the level.
     */
    constructor(backgroundObjects, clouds, bottles, coins, enemies) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
    }
}