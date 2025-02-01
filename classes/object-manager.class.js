class ObjectManager {
    /**
     * Manages game objects such as bottles and coins.
     * 
     * @param {Object} world - The game world instance.
     */
    constructor(world) {
        this.world = world;
        this.throwableObjects = [];
        this.canThrowBottle = true; 
        this.canBuyBottle = true; 
        this.throwCooldown = 1000;
        this.buyCooldown = 1000; 
    }

    /**
     * Starts an interval to check if a throwable object should be thrown.
     */
    checkThrowingObjectInterval() {
        setInterval(() => {
            this.checkThrowObject();
        }, 120);
    }

    /**
     * Determines the collected object type and updates the corresponding counters.
     * 
     * @param {Object} object - The collected object (Bottle or Coin).
     */
    addObjectAmount(object) {
        if (object instanceof Bottle) {
            this.collectBottle();
        } else if (object instanceof Coin) {
            this.collectCoin();
        }
    }

    /**
     * Handles the collection of bottles, increasing the bottle count and updating the UI.
     */
    collectBottle() {
        this.world.bottleBar.percentage += 20;
        this.world.bottleBar.setPercentage(this.world.bottleBar.percentage);
        audioManager.setVolume(SOUNDS.COLLECT_BOTTLE, 0.5);
        audioManager.play(SOUNDS.COLLECT_BOTTLE);
        this.world.bottleAmount++;
    }

    /**
     * Handles the collection of coins, increasing the coin count and updating the UI.
     */
    collectCoin() {
        this.world.coinBar.percentage += 20;
        this.world.coinBar.setPercentage(this.world.coinBar.percentage);
        audioManager.setVolume(SOUNDS.COLLECT_COIN, 0.5);
        audioManager.play(SOUNDS.COLLECT_COIN);
        this.world.coinAmount++;
    }

    /**
     * Checks if a bottle can be thrown (prevents spamming using cooldown).
     */
    checkThrowObject() {
        if (this.world.keyboard.D && this.canThrowBottle && this.world.bottleAmount >= 1) {
            this.throwBottle();
            this.canThrowBottle = false;

            setTimeout(() => {
                this.canThrowBottle = true;
            }, this.throwCooldown);
        }
        this.world.collisions.checkBottleIsCollidingEnemy();
    }

    /**
     * Executes the bottle throwing action.
     */
    throwBottle() {
        audioManager.setVolume(SOUNDS.THROW_BOTTLE, 0.5);
        audioManager.play(SOUNDS.THROW_BOTTLE);

        let bottle = new ThrowableObject(
            this.world.character.x + 20, 
            this.world.character.y + 150, 
            this.world.character.otherDirection
        );

        this.world.throwableObjects.push(bottle);
        this.world.bottleAmount--;
        this.world.bottleBar.percentage -= 20;
        this.world.bottleBar.setPercentage(this.world.bottleBar.percentage);
    }

    /**
     * Deletes a thrown bottle after a short delay.
     * 
     * @param {number} bottleIndex - The index of the bottle in the array.
     */
    deleteThrownObject(bottleIndex) {
        setTimeout(() => {
            this.world.throwableObjects.splice(bottleIndex, 1);
        }, 200);
    }

    /**
     * Removes an object from an array if it exists.
     * 
     * @param {Array} arr - The array containing objects.
     * @param {Object} obj - The object to remove.
     */
    deleteObjectFromArray(arr, obj) {
        const index = arr.indexOf(obj);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }

    /**
     * Checks if the player can buy a bottle (prevents spamming using cooldown).
     */
    checkBuyBottle() {
        if (this.world.keyboard.F && this.canBuyBottle && this.world.bottleAmount < 5 && this.world.coinAmount > 0) {
            this.buyBottle();
            this.canBuyBottle = false; 

            setTimeout(() => {
                this.canBuyBottle = true; 
            }, this.buyCooldown);
        }
    }

    /**
     * Executes the bottle purchasing action.
     */
    buyBottle() {
        audioManager.play(SOUNDS.BUY_BOTTLE);

        let bottle = new ThrowableObject();
        this.world.throwableObjects.push(bottle);
        this.world.bottleAmount++;
        this.world.bottleBar.percentage += 20;
        this.world.bottleBar.setPercentage(this.world.bottleBar.percentage);
        this.world.coinAmount--;
        this.world.coinBar.percentage -= 20;
        this.world.coinBar.setPercentage(this.world.coinBar.percentage);
    }
}