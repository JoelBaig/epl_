class World {
    level = level1;
    canvas;
    ctx;
    keyboard;
    character = new Character();
    endboss = new Endboss();
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossHealthBar = new EndbossHealthBar();
    throwableObjects = [new ThrowableObject()];
    lastThrowTime = 0;
    throwCooldown = 250;
    coinAmount = [];
    bottleAmount = [];
    i = 0;
    hit = false;
    hurt = false;
    firstContact = false;
    distance;
    dead = false;
    hitEnemy = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.collisions = new Collisions(this);
        this.setupKeyboardListeners();
        this.setWorld();
        this.draw();
        this.run();
    }


    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
    }


    run() {
        this.collisions.handleObjectIntervals();
        this.collisions.handleEnemyIntervals();
        this.checkThrowingObjectInterval();
    }


    checkThrowingObjectInterval() {
        console.log("checkThrowingObjectInterval gestartet");
        setInterval(() => {
            console.log("checkThrowObject() sollte aufgerufen werden");
            this.checkThrowObject();
        }, 120);
    }


    endbossFirstContact() {
        if (this.character.x > 1800) {
            if (!this.firstContact) {
                this.endboss.speed = 10;
                this.firstContact = true;
                this.endbossHealthBar.y = 0;
                this.endboss.manageEndbossActions();
            }
        }
    }


    setHitEnemy() {
        setTimeout(() => {
            this.hitEnemy = false;
        }, 500);
    }


    enemyIsDead(enemy) {
        if (!enemy.dead) {
            enemy.isDead();
            setTimeout(() => {
                this.deleteObjectFromArray(this.level.enemies, enemy);
            }, 500);
        }
    }


    jumpOnChicken(enemy) {
        if (this.isFallingOn(enemy)) {
            this.enemyIsdead(enemy);
            this.jump();
            return true;
        }
        return false;
    }


    addObjectAmount(object) {
        if (object instanceof Bottle) {
            this.collectBottle();
        } else if (object instanceof Coin) {
            this.collectCoin();
        }
    }


    collectBottle() {
        this.bottleBar.percentage += 20;
        this.bottleBar.setPercentage(this.bottleBar.percentage);
        audioManager.setVolume(SOUNDS.COLLECT_BOTTLE, 0.5);
        audioManager.play(SOUNDS.COLLECT_BOTTLE);
        this.bottleAmount++;
    }


    collectCoin() {
        this.coinBar.percentage += 20;
        this.coinBar.setPercentage(this.coinBar.percentage);
        audioManager.setVolume(SOUNDS.COLLECT_COIN, 0.5);
        audioManager.play(SOUNDS.COLLECT_COIN);
        this.coinAmount++;
    }


    checkThrowObject() {
        let currentTime = Date.now();

        if (this.keyboard.D && !this.keyboard.lastD && this.bottleAmount >= 1 && (currentTime - this.lastThrowTime) >= this.throwCooldown) {
            this.throwBottle(currentTime);
            this.keyboard.lastD = true;
        }
        this.collisions.checkBottleIsCollidingEnemy();
    }


    setupKeyboardListeners() {
        document.addEventListener('keyup', (event) => {
            if (event.key === 'd' || event.key === 'D') {
                this.keyboard.lastD = false;
            }
        });
    }


    throwBottle(currentTime) {
        audioManager.setVolume(SOUNDS.THROW_BOTTLE, 0.5);
        audioManager.play(SOUNDS.THROW_BOTTLE);
        let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 150, this.character.otherDirection);
        this.throwableObjects.push(bottle);
        this.bottleAmount--;
        this.bottleBar.percentage -= 20;
        this.bottleBar.setPercentage(this.bottleBar.percentage);
        this.lastThrowTime = currentTime;
    }


    endbossIsDead(endboss) {
        this.endboss.isDead();
        setTimeout(() => {
            this.deleteObjectFromArray(this.level.enemies, this.level.enemies.indexOf(endboss));
            this.pauseAllSounds();
        }, 1000);
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


    updateEndbossHealth(endboss) {
        endboss.hit();
        this.endbossHealthBar.setPercentage(endboss.energy);
    }


    deleteThrownObject(bottleIndex) {
        setTimeout(() => {
            this.throwableObjects.splice(bottleIndex, 1);
        }, 200);
    }


    deleteObjectFromArray(arr, obj) {
        const index = arr.indexOf(obj);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }


    characterIsInjured() {
        this.character.hit();
        this.hurt = true;
        setTimeout(() => {
            this.hurt = false;
        }, 300);
        this.level.characterBar.setPercentage(this.character.energy);
    }


    checkBuyBottle() {
        if (this.keyboard.F && !this.keyboard.lastF && this.bottleAmount < 5 && this.coinAmount > 0) {
            audioManager.play(SOUNDS.BUY_BOTTLE);
            let bottle = new ThrowableObject();
            this.throwableObjects.push(bottle);
            this.bottleAmount++;
            this.bottleBar.percentage += 20;
            this.bottleBar.setPercentage(this.bottleBar.percentage);
            this.coinAmount--;
            this.coinBar.percentage -= 20;
            this.coinBar.setPercentage(this.coinBar.percentage);
            this.keyboard.lastF = true;
        }
    }

    /**
     * Draws objects onto the world by rendering them on the canvas.
     * 
     */
    draw() {
        this.clearCanvas();
        this.moveCtxForward();
        this.drawBackgroundObjects();
        this.drawStatusBars();
        this.drawMovableObjects();
        this.moveCtxBackward();
        this.repeatDraw();
    }


    drawBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
    }


    drawStatusBars() {
        this.moveCtxBackward();
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);

        if (this.firstContact && this.endbossHealthBar.img) {
            this.addToMap(this.endbossHealthBar);
        }

        this.moveCtxForward();
    }


    drawMovableObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
    }

    /**
     * Clears the canvas by erasing the entire area.
     * 
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    moveCtxForward() {
        this.ctx.translate(this.camera_x, 0);
    }


    moveCtxBackward() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Renders an object on the canvas.
     * 
     * @param {Object} mo - The object to be rendered on the canvas.
     */
    addToMap(mo) {
        this.handleObjectDirection(mo);
        this.displayObject(mo);
        this.resetObjectDirection(mo);
    }


    handleObjectDirection(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
    }


    displayObject(mo) {
        if (mo.img) {
            mo.draw(this.ctx);
        }
    }


    resetObjectDirection(mo) {
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Adds objects to the map by rendering them on the canvas.
     * 
     * @param {Object[]} objects - An array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Repeatedly calls the draw() function to create an animation loop.
     * 
     */
    repeatDraw() {
        let self = this;

        requestAnimationFrame(function () {
            self.draw();
        });
    }


    pauseAllSounds() {
        audioManager.muteAll();
    }
}