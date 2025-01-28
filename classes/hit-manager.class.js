class HitManager {
    /**
     * Manages hit detection and damage calculations in the game.
     * 
     * @param {Object} world - The game world instance.
     * @param {Object} collisions - The collisions manager.
     */
    constructor(world, collisions) {
        this.world = world;
        this.collisions = collisions;
    }

    /**
     * Handles when the Endboss is hit by a bottle, reducing its health and playing sounds.
     * 
     * @param {Object} endboss - The Endboss instance.
     */
    hitEndbossWithBottle(endboss) {
        this.hit = true;
        let previousEnergy = endboss.energy;
        this.updateEndbossHealth(endboss);

        if (endboss.energy < previousEnergy && endboss.energy > 20) {
            audioManager.setVolume(SOUNDS.DYING_ENEMY, 0.5);
            audioManager.play(SOUNDS.DYING_ENEMY);
        }

        if (this.endbossHealthBar.percentage <= 0) {
            this.endbossIsDead(endboss);
        }
    }

    /**
     * Marks the Endboss as dead, removes it from the game world, and stops all sounds.
     * 
     * @param {Object} endboss - The Endboss instance.
     */
    endbossIsDead(endboss) {
        endboss.isDead();
        setTimeout(() => {
            this.world.deleteObjectFromArray(this.world.level.enemies, endboss);
            this.world.pauseAllSounds();
        }, 1000);
    }

    /**
     * Resets the `hitEnemy` flag after a short delay.
     */
    setHitEnemy() {
        setTimeout(() => {
            this.world.hitEnemy = false;
        }, 500);
    }

    /**
     * Handles when the character is injured, reducing health and updating the health bar.
     */
    characterIsInjured() {
        this.character.hit();
        this.hurt = true;
        setTimeout(() => {
            this.hurt = false;
        }, 300);
        this.level.characterBar.setPercentage(this.character.energy);
    }
}