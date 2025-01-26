class ObjectManager {
    constructor(world) {
        this.world = world;
        this.throwableObjects = [];
    }


    checkThrowingObjectInterval() {
        setInterval(() => {
            this.checkThrowObject();
        }, 120);
    }


    addObjectAmount(object) {
        if (object instanceof Bottle) {
            this.collectBottle();
        } else if (object instanceof Coin) {
            this.collectCoin();
        }
    }


    collectBottle() {
        this.world.bottleBar.percentage += 20;
        this.world.bottleBar.setPercentage(this.world.bottleBar.percentage);
        audioManager.setVolume(SOUNDS.COLLECT_BOTTLE, 0.5);
        audioManager.play(SOUNDS.COLLECT_BOTTLE);
        this.world.bottleAmount++;
    }


    collectCoin() {
        this.world.coinBar.percentage += 20;
        this.world.coinBar.setPercentage(this.world.coinBar.percentage);
        audioManager.setVolume(SOUNDS.COLLECT_COIN, 0.5);
        audioManager.play(SOUNDS.COLLECT_COIN);
        this.world.coinAmount++;
    }


    checkThrowObject() {
        let currentTime = Date.now();

        if (this.world.keyboard.D && !this.world.keyboard.lastD && this.world.bottleAmount >= 1 && (currentTime - this.world.lastThrowTime) >= this.world.throwCooldown) {
            this.throwBottle(currentTime);
            this.world.keyboard.lastD = true;
        }
        this.world.collisions.checkBottleIsCollidingEnemy();
    }


    throwBottle(currentTime) {
        audioManager.setVolume(SOUNDS.THROW_BOTTLE, 0.5);
        audioManager.play(SOUNDS.THROW_BOTTLE);
        let bottle = new ThrowableObject(this.world.character.x + 20, this.world.character.y + 150, this.world.character.otherDirection);
        this.world.throwableObjects.push(bottle);
        this.world.bottleAmount--;
        this.world.bottleBar.percentage -= 20;
        this.world.bottleBar.setPercentage(this.world.bottleBar.percentage);
        this.world.lastThrowTime = currentTime;
    }


    deleteThrownObject(bottleIndex) {
        setTimeout(() => {
            this.world.throwableObjects.splice(bottleIndex, 1);
        }, 200);
    }


    deleteObjectFromArray(arr, obj) {
        const index = arr.indexOf(obj);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }


    checkBuyBottle() {
        if (this.world.keyboard.F && !this.world.keyboard.lastF && this.world.bottleAmount < 5 && this.world.coinAmount > 0) {
            audioManager.play(SOUNDS.BUY_BOTTLE);
            let bottle = new ThrowableObject();
            this.world.throwableObjects.push(bottle);
            this.world.bottleAmount++;
            this.world.bottleBar.percentage += 20;
            this.world.bottleBar.setPercentage(this.world.bottleBar.percentage);
            this.world.coinAmount--;
            this.world.coinBar.percentage -= 20;
            this.world.coinBar.setPercentage(this.world.coinBar.percentage);
            this.world.keyboard.lastF = true;
        }
    }

}