class HitManager {
    constructor(world, collisions) {
        this.world = world;
        this.collisions = collisions;
    }


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


    endbossIsDead(endboss) {
        endboss.isDead();
        setTimeout(() => {
            this.world.deleteObjectFromArray(this.world.level.enemies, endboss);
            this.world.pauseAllSounds();
        }, 1000);
    }


    setHitEnemy() {
        setTimeout(() => {
            this.world.hitEnemy = false;
        }, 500);
    }


    characterIsInjured() {
        this.character.hit();
        this.hurt = true;
        setTimeout(() => {
            this.hurt = false;
        }, 300);
        this.level.characterBar.setPercentage(this.character.energy);
    }
}