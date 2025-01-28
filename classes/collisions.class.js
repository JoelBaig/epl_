class Collisions {
    lastThrowTime = 0;
    throwCooldown = 250;

    /**
     * Creates a new Collisions manager.
     * 
     * @param {Object} world - The game world instance.
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Starts collision detection for enemies.
     */
    handleEnemyIntervals() {
        this.startEndbossContactCheck();
        this.startSideCollisionCheck();
        this.startEndbossCollisionCheck();
    }

    /**
     * Checks when the character first makes contact with the Endboss.
     */
    startEndbossContactCheck() {
        setInterval(() => {
            this.world.endbossFirstContact();
            this.checkTopCollisionEnemies();
        }, 1);
    }

    /**
     * Checks for side collisions with enemies at set intervals.
     */
    startSideCollisionCheck() {
        setInterval(() => {
            this.checkSideCollisionEnemies();
        }, 200);
    }

    /**
     * Checks for collisions between the character and the Endboss.
     */
    startEndbossCollisionCheck() {
        setInterval(() => {
            this.checkCollisionEndboss();
        }, 150);
    }

    /**
     * Starts collision detection for objects.
     */
    handleObjectIntervals() {
        this.checkCollidingObjectInterval();
    }

    /**
     * Checks if objects like bottles and coins collide with the character.
     */
    checkCollidingObjectInterval() {
        setInterval(() => {
            this.checkCollisionObjects(this.world.level.bottles, this.world.coinBar);
            this.checkCollisionObjects(this.world.level.coins, this.world.bottleBar);
            this.world.objectManager.checkBuyBottle();
        }, 50);
    }

    /**
     * Checks if the character jumps on an enemy.
     */
    checkTopCollisionEnemies() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy)) {
                if (this.world.character.isAboveGround() && this.world.character.speedY <= 0) {
                    this.world.enemyIsDead(enemy);
                    this.world.character.jumpOnChicken();
                    this.world.hitEnemy = true;
                    this.world.hitManager.setHitEnemy();
                }
            }
        });
    }

    /**
     * Checks for side collisions between the character and enemies.
     */
    checkSideCollisionEnemies() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy) && !this.world.character.isAboveGround() && !this.world.hitEnemy) {
                this.world.character.hurt = true;
                this.world.character.hit();
                audioManager.setVolume(SOUNDS.TAKING_DAMAGE, 0.5);
                audioManager.play(SOUNDS.TAKING_DAMAGE);
                this.world.healthBar.setPercentage(this.world.character.energy);
                this.world.hitManager.setHitEnemy();
            }
        });
    }

    /**
     * Checks if the character collides with the Endboss.
     */
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

    /**
     * Checks if the character collides with a collectible object (coin or bottle).
     * 
     * @param {Array} arr - The array of collectible objects.
     * @param {Object} bar - The status bar related to the collected object.
     */
    checkCollisionObjects(arr, bar) {
        arr.forEach((object) => {
            if (this.world.character.isColliding(object)) {
                if (object instanceof Bottle && this.world.bottleBar.percentage >= 100) {
                    return;
                }
                this.world.objectManager.addObjectAmount(object);
                this.world.objectManager.deleteObjectFromArray(arr, object);
            }
        });
    }

    /**
     * Checks if a thrown bottle collides with an enemy.
     */
    checkBottleIsCollidingEnemy() {
        this.world.throwableObjects.forEach((bottle, i) => {
            this.checkCollisionBottleEnemies(bottle, i);
        });
    }

    /**
     * Checks for collisions between thrown bottles and enemies.
     * 
     * @param {Object} bottle - The thrown bottle object.
     * @param {number} bottleIndex - The index of the bottle in the array.
     */
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

    /**
     * Checks if a thrown bottle collides with the Endboss.
     * 
     * @param {Object} bottle - The thrown bottle object.
     * @param {number} bottleIndex - The index of the bottle in the array.
     * @returns {boolean} - Returns true if a collision occurs.
     */
    checkEndbossCollision(bottle, bottleIndex) {
        if (this.world.endboss && bottle.isColliding(this.world.endboss)) {
            this.handleEndbossCollision(bottle, bottleIndex);
            return true;
        }
        return false;
    }

    /**
     * Handles a collision between a thrown bottle and the Endboss.
     * 
     * @param {Object} bottle - The thrown bottle object.
     * @param {number} bottleIndex - The index of the bottle in the array.
     */
    handleEndbossCollision(bottle, bottleIndex) {
        bottle.hit(bottle.x, bottle.y + 10);
        audioManager.setVolume(SOUNDS.BREAK_BOTTLE, 0.5);
        audioManager.play(SOUNDS.BREAK_BOTTLE);
        this.hitEndbossWithBottle(this.world.endboss);
        this.world.objectManager.deleteThrownObject(bottleIndex);
    }

    /**
     * Handles a collision between a thrown bottle and an enemy.
     * 
     * @param {Object} bottle - The thrown bottle object.
     * @param {Object} enemy - The enemy that was hit.
     * @param {number} bottleIndex - The index of the bottle in the array.
     */
    handleEnemyCollision(bottle, enemy, bottleIndex) {
        bottle.hit(bottle.x, bottle.y + 10);
        audioManager.setVolume(SOUNDS.BREAK_BOTTLE, 0.5);
        audioManager.play(SOUNDS.BREAK_BOTTLE);

        if (enemy instanceof Endboss) {
            this.hitEndbossWithBottle(enemy);
        } else {
            this.world.enemyIsDead(enemy);
            setTimeout(() => {
                this.world.objectManager.deleteObjectFromArray(this.world.level.enemies, enemy);
            }, 1000);
        }
        this.world.objectManager.deleteThrownObject(bottleIndex);
    }

    /**
     * Reduces the Endboss's health when hit by a bottle.
     * 
     * @param {Object} endboss - The Endboss instance.
     */
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

    /**
     * Updates the Endboss's health bar after being hit.
     * 
     * @param {Object} endboss - The Endboss instance.
     */
    updateEndbossHealth(endboss) {
        endboss.hit();
        this.world.endbossHealthBar.setPercentage(endboss.energy);
    }

    /**
     * Marks the Endboss as dead and removes it from the game world.
     * 
     * @param {Object} endboss - The Endboss instance.
     */
    endbossIsDead(endboss) {
        endboss.isDead();
        setTimeout(() => {
            this.world.objectManager.deleteObjectFromArray(this.world.level.enemies, endboss);
            this.world.pauseAllSounds();
        }, 1000);
    }
}