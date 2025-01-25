class Collisions {
    lastThrowTime = 0;
    throwCooldown = 250;


    constructor(world) {
        this.world = world;
    }
    

    handleEnemyIntervals() {
        this.startEndbossContactCheck();
        this.startSideCollisionCheck();
        this.startEndbossCollisionCheck();
    }


    startEndbossContactCheck() {
        setInterval(() => {
            this.world.endbossFirstContact();
            this.checkTopCollisionEnemies();
        }, 1);
    }


    startSideCollisionCheck() {
        setInterval(() => {
            this.checkSideCollisionEnemies();
        }, 200);
    }


    startEndbossCollisionCheck() {
        setInterval(() => {
            this.checkCollisionEndboss();
        }, 150);
    }


    handleObjectIntervals() {
        this.checkCollidingObjectInterval();
    }


    checkCollidingObjectInterval() {
        setInterval(() => {
            this.checkCollisionObjects(this.world.level.bottles, this.world.coinBar);
            this.checkCollisionObjects(this.world.level.coins, this.world.bottleBar);
            this.world.checkBuyBottle();
        }, 50);
    }


    checkTopCollisionEnemies() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy)) {
                if (this.world.character.isAboveGround() && this.world.character.speedY <= 0) {
                    this.world.enemyIsDead(enemy);
                    this.world.character.jumpOnChicken();
                    this.world.hitEnemy = true;
                    this.world.setHitEnemy();
                }
            }
        });
    }


    checkSideCollisionEnemies() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy) && !this.world.character.isAboveGround() && !this.world.hitEnemy) {
                this.world.character.hurt = true;
                this.world.character.hit();
                audioManager.setVolume(SOUNDS.TAKING_DAMAGE, 0.5);
                audioManager.play(SOUNDS.TAKING_DAMAGE);
                this.world.healthBar.setPercentage(this.world.character.energy);
                this.world.setHitEnemy();
            }
        });
    }


    checkCollisionEndboss() {
        if (this.world.character.isColliding(this.world.endboss)) {
            this.world.character.hit();
            audioManager.setVolume(SOUNDS.TAKING_DAMAGE, 0.5);
            audioManager.play(SOUNDS.TAKING_DAMAGE);
            this.world.hurt = true;
            setTimeout(() => {
                this.world.hurt = false;
            }, 300);
            this.world.healthBar.setPercentage(this.world.character.energy);
        }
    }


    checkCollisionObjects(arr, bar) {
        arr.forEach((object) => {
            if (this.world.character.isColliding(object)) {
                if (object instanceof Bottle && this.world.bottleBar.percentage >= 100) {
                    return;
                }
                this.world.addObjectAmount(object);
                this.world.deleteObjectFromArray(arr, object);
            }
        });
    }


    checkBottleIsCollidingEnemy() {
        this.world.throwableObjects.forEach((bottle, i) => {
            this.checkCollisionBottleEnemies(bottle, i);
        });
    }


    checkCollisionBottleEnemies(bottle, bottleIndex) {
        if (this.checkEndbossCollision(bottle, bottleIndex)) {
            return;
        }

        this.world.level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy) && !enemy.isDead()) {
                this.handleEnemyCollision(bottle, enemy, bottleIndex);
            }
        });
    }


    checkEndbossCollision(bottle, bottleIndex) {
        if (this.world.endboss && bottle.isColliding(this.world.endboss)) {
            this.handleEndbossCollision(bottle, bottleIndex);
            return true;
        }
        return false;
    }


    handleEndbossCollision(bottle, bottleIndex) {
        bottle.hit(bottle.x, bottle.y + 10);
        audioManager.setVolume(SOUNDS.BREAK_BOTTLE, 0.5);
        audioManager.play(SOUNDS.BREAK_BOTTLE);
        this.hitEndbossWithBottle(this.world.endboss);
        this.deleteThrownObject(bottleIndex);
    }


    handleEnemyCollision(bottle, enemy, bottleIndex) {
        bottle.hit(bottle.x, bottle.y + 10);
        audioManager.setVolume(SOUNDS.BREAK_BOTTLE, 0.5);
        audioManager.play(SOUNDS.BREAK_BOTTLE);

        if (enemy instanceof Endboss) {
            this.hitEndbossWithBottle(enemy);
        } else {
            this.world.enemyIsDead(enemy);
            setTimeout(() => {
                this.world.deleteObjectFromArray(this.world.level.enemies, enemy);
            }, 1000);
        }
        this.deleteThrownObject(bottleIndex);
    }


    hitEndbossWithBottle(endboss) {
        this.world.hit = true;
        let previousEnergy = endboss.energy;
        this.updateEndbossHealth(endboss);

        if (endboss.energy < previousEnergy && endboss.energy > 20) {
            audioManager.setVolume(SOUNDS.DYING_ENEMY, 0.5);
            audioManager.play(SOUNDS.DYING_ENEMY);
        }

        if (this.world.endbossHealthBar.percentage <= 0) {
            this.endbossIsDead(endboss);
        }
    }


    updateEndbossHealth(endboss) {
        endboss.hit();
        this.world.endbossHealthBar.setPercentage(endboss.energy);
    }


    deleteThrownObject(bottleIndex) {
        setTimeout(() => {
            this.world.throwableObjects.splice(bottleIndex, 1);
        }, 200);
    }
    

    endbossIsDead(endboss) {
        endboss.isDead();
        setTimeout(() => {
            this.world.deleteObjectFromArray(this.world.level.enemies, endboss);
            this.world.pauseAllSounds();
        }, 1000);
    }
}