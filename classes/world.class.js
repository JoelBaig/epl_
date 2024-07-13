class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;
    cameraFollowEndX;
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
    collecting_bottle_sound = new Audio('../assets/audio/collect_bottle.mp3');
    collecting_coin_sound = new Audio('../assets/audio/collect_coin.mp3');
    dying_sound_enemy = new Audio('../assets/audio/chicken.mp3');
    throwing_bottle_sound = new Audio('assets/audio/throw_bottle.mp3');
    breaking_bottle_sound = new Audio('assets/audio/breaking_bottle.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisionObjects(this.level.bottles, this.coinBar);
            this.checkCollisionObjects(this.level.coins, this.bottleBar);
        }, 50);

        setInterval(() => {
            this.checkCollisionEnemies();
            this.checkThrowObject();
            this.checkBuyBottle();
        }, 150);
    }


    checkCollisionEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            };
        });
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


    deleteObject(arr, object) {
        arr.splice(object, 1);
    }


    checkThrowObject() {
        let currentTime = Date.now();
        if (this.keyboard.D && this.bottleAmount >= 1 && (currentTime - this.lastThrowTime) >= this.throwCooldown) {
            this.throwBottle(currentTime);
        }

        this.checkBottleIsCollidingEnemyOrEndboss();
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


    checkBottleIsCollidingEnemyOrEndboss() {
        this.throwableObjects.forEach((bottle, i) => {
            this.checkCollisionBottleEnemies(bottle, i);
            // this.checkCollisionBottleEndboss(bottle, i);
        });
    }


    checkCollisionBottleEnemies(bottle, i) {
        this.level.enemies.forEach((enemy, j) => {
            if (bottle.isColliding(enemy)) {
                this.breaking_bottle_sound.play();
                bottle.hit(bottle.x, bottle.y + 10);
                this.enemyIsDead(enemy, j);
                // this.hitEnemy = true;
                // this.updateHitEnemy();
                setTimeout(() => {
                    this.deleteObject(this.throwableObjects, i);
                }, 200);
            }
        });
    }


    enemyIsDead(enemy, i) {
        enemy.isDead();
        this.dying_sound_enemy.play();
        setTimeout(() => {
            this.deleteObject(this.level.enemies, i);
        }, 500);
    }


    // updateHitEnemy() {
    //     setTimeout(() => {
    //         this.hitEnemy = false;
    //     }, 1000);
    // }


    characterIsInjured() {
        this.character.hit();
        this.hurt = true;
        setTimeout(() => {
            this.hurt = false;
        }, 300);
        this.level.characterBar.setPercentage(this.character.energy);
    }


    checkBuyBottle() {
        if (this.keyboard.F && this.bottleAmount < 5 && this.coinAmount > 0) {
            let bottle = new ThrowableObject();
            this.throwableObjects.push(bottle);
            this.bottleAmount++;
            this.bottleBar.percentage += 20;
            this.bottleBar.setPercentage(this.bottleBar.percentage);
            this.coinAmount--;
            this.coinBar.percentage -= 20;
            this.coinBar.setPercentage(this.coinBar.percentage);
        }
    }


    // increaseObjectAmount() {

    // }


    // decreaseObjectAmount() {

    // }

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
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
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
