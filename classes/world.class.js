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
                } else if (!this.character.isHurt()) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                }
            }
        }
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
        this.playSound(this.collecting_bottle_sound);
        this.bottleAmount++;
    }


    collectCoin() {
        this.coinBar.percentage += 20;
        this.coinBar.setPercentage(this.coinBar.percentage);
        this.playSound(this.collecting_coin_sound);
        this.coinAmount++;
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
        this.playSound(this.throwing_bottle_sound);
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


    checkCollisionBottleEnemies(bottle, bottleIndex) {
        if (this.endboss && bottle.isColliding(this.endboss)) {
            bottle.hit(bottle.x, bottle.y + 10);
            this.playSound(this.breaking_bottle_sound);
            this.hitEndbossWithBottle(this.endboss);
            this.deleteThrownObject(bottleIndex);
        }

        this.level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy) && !enemy.isDead()) {
                bottle.hit(bottle.x, bottle.y + 10);
                this.playSound(this.breaking_bottle_sound);

                if (enemy instanceof Endboss) {
                    this.hitEndbossWithBottle(enemy);
                } else {
                    this.enemyIsDead(enemy);
                }
                this.deleteThrownObject(bottleIndex);
            }
        });
    }


    deleteThrownObject(bottleIndex) {
        setTimeout(() => {
            this.throwableObjects.splice(bottleIndex, 1);
        }, 200);
    }


    enemyIsDead(enemy) {
        if (!enemy.dead) {
            enemy.die();
            setTimeout(() => {
                this.deleteObjectFromArray(this.level.enemies, enemy);
            }, 300);
        }
    }


    checkCollisionObjects(arr) {
        arr.forEach((object) => {
            if (this.character.isColliding(object)) {
                this.addObjectAmount(object);
                this.deleteObjectFromArray(arr, object);
            }
        });
    }


    deleteObjectFromArray(arr, obj) {
        const index = arr.indexOf(obj);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }


    endbossIsDead(endboss) {
        this.pauseAllSounds();


        this.endboss.isDead();
        setTimeout(() => {
            this.deleteObjectFromArray(this.level.enemies, this.level.enemies.indexOf(endboss));
        }, 1000);
    }


    hitEndbossWithBottle(endboss) {
        this.hit = true;
        let previousEnergy = endboss.energy;
        this.updateEndbossHealth(endboss);

        if (endboss.energy < previousEnergy && this.dying_sound_enemy.paused) {
            this.playSound(this.dying_sound_enemy);
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


    // drawStatusBars() {
    //     this.moveCtxBackward();
    //     this.addToMap(this.healthBar);
    //     this.addToMap(this.coinBar);
    //     this.addToMap(this.bottleBar);
    //     this.addToMap(this.endbossHealthBar);
    //     this.moveCtxForward();
    // }


    drawStatusBars() {
        this.moveCtxBackward();
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
    
        // Endboss-HealthBar nur zeichnen, wenn der Endboss nicht tot ist
        if (!this.endboss.energy == 0) {
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


    // displayObject(mo) {
    //     mo.draw(this.ctx);
    //     // mo.drawFrame(this.ctx);
    //     mo.drawRedFrame(this.ctx);
    // }


    displayObject(mo) {
        if (mo.img) {  // Prüft, ob das Bild geladen ist
            mo.draw(this.ctx);
            mo.drawRedFrame(this.ctx);
        } 
        // else {
        //     console.warn("Bild nicht geladen für", mo);
        // }
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


    playSound(sound) {
        if (sound && sound.paused) {
            sound.play().catch(error => console.warn("Error playing sound:", error));
        }
    }


    pauseSound(sound) {
        if (sound && !sound.paused) {
            sound.pause();
        }
    }


    pauseAllSounds() {
        [this.collecting_bottle_sound, this.collecting_coin_sound, this.throwing_bottle_sound,
        this.breaking_bottle_sound, this.dying_sound_enemy].forEach(sound => this.pauseSound(sound));
    }
}