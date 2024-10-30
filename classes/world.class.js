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

    collecting_bottle_sound = new Audio('../assets/audio/collect_bottle.mp3');
    collecting_coin_sound = new Audio('../assets/audio/collect_coin.mp3');
    throwing_bottle_sound = new Audio('assets/audio/throw_bottle.mp3');
    breaking_bottle_sound = new Audio('assets/audio/breaking_bottle.mp3');
    dying_sound_enemy = new Audio('../assets/audio/chicken.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
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
        setInterval(() => {
            this.checkCollisionObjects(this.level.bottles, this.coinBar);
            this.checkCollisionObjects(this.level.coins, this.bottleBar);
        }, 50);

        setInterval(() => {
            this.endbossFirstContact();
            this.checkCollisionEnemies();
            this.checkCollisionEndboss();
            this.checkThrowObject();
            this.checkBuyBottle();
        }, 150);
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


    checkCollisionEnemies() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            let enemy = this.level.enemies[i];

            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                if (this.character.isFallingOn(enemy)) {
                    this.character.jump();
                    this.enemyIsDead(enemy, i);
                } else {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                }
            }
        }
    }


    enemyIsDead(enemy, index) {
        enemy.dead = true;
        enemy.stopInterval();
        enemy.playAnimation(enemy.IMAGES_DEAD);

        setTimeout(() => {
            this.deleteObject(this.level.enemies, index);
        }, 500);
    }


    checkCollisionEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.hurt = true;
            setTimeout(() => {
                this.hurt = false;
            }, 300);

            if (this.endbossHealthBar) {
                this.endbossHealthBar.setPercentage(this.endboss.energy);
            }
            this.healthBar.setPercentage(this.character.energy);
        }
    }


    checkCollisionObjects(arr) {
        arr.forEach((object, i) => {
            if (this.character.isColliding(object)) {
                this.addObjectAmount(object);
                this.deleteObject(arr, i);
            }
        });
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
        this.collecting_bottle_sound.play();
        this.bottleAmount++;
    }


    collectCoin() {
        this.coinBar.percentage += 20;
        this.coinBar.setPercentage(this.coinBar.percentage);
        this.collecting_coin_sound.play();
        this.coinAmount++;
    }


    deleteObject(arr, index) {
        if (Array.isArray(arr)) {
            arr.splice(index, 1);
        }
    }


    checkThrowObject() {
        let currentTime = Date.now();
        if (this.keyboard.D && !this.keyboard.lastD && this.bottleAmount >= 1 && (currentTime - this.lastThrowTime) >= this.throwCooldown) {
            this.throwBottle(currentTime);
            this.keyboard.lastD = true;
        }
        this.checkBottleIsCollidingEnemy();
    }


    throwBottle(currentTime) {
        this.throwing_bottle_sound.play();
        let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 150, this.character.otherDirection);
        this.throwableObjects.push(bottle);
        this.bottleAmount--;
        this.bottleBar.percentage -= 20;
        this.bottleBar.setPercentage(this.bottleBar.percentage);
        this.lastThrowTime = currentTime;
    }


    checkBottleIsCollidingEnemy() {
        this.throwableObjects.forEach((bottle, i) => {
            this.checkCollisionBottleEnemies(bottle, i);
        });
    }


    checkCollisionBottleEnemies(bottle, i) {
        if (this.endboss && bottle.isColliding(this.endboss)) {
            bottle.hit(bottle.x, bottle.y + 10);

            this.breaking_bottle_sound.play();

            this.hitEndbossWithBottle(this.endboss);
            this.deleteThrownObject(i);
        }

        this.level.enemies.forEach((enemy, j) => {
            if (bottle.isColliding(enemy)) {
                this.breaking_bottle_sound.play();
                bottle.hit(bottle.x, bottle.y + 10);

                if (enemy instanceof Endboss) {
                    this.hitEndbossWithBottle(enemy);
                } else {
                    this.enemyIsDead(enemy, j);
                }
                this.deleteThrownObject(i);
            }
        });
    }


    deleteThrownObject(i) {
        setTimeout(() => {
            this.deleteObject(this.throwableObjects, i);
        }, 200);
    }


    endbossIsDead(endboss) {
        this.endboss.isDead();
        setTimeout(() => {
            this.deleteObject(this.level.enemies, this.level.enemies.indexOf(endboss));
        }, 1000);
    }


    hitEndbossWithBottle(endboss) {
        this.hit = true;
        let previousEnergy = endboss.energy;
        this.updateEndbossHealth(endboss);

        if (endboss.energy < previousEnergy && this.dying_sound_enemy.paused) {
            this.dying_sound_enemy.play();
        }

        if (this.endbossHealthBar.percentage <= 0) {
            this.endbossIsDead(endboss);
        }
    }


    updateEndbossHealth(endboss) {
        endboss.hit();
        this.endbossHealthBar.setPercentage(endboss.energy);
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
        this.addToMap(this.endbossHealthBar);
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
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        mo.drawRedFrame(this.ctx);
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
}