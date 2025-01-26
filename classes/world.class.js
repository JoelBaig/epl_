class World {
    level = level1;
    canvas;
    ctx;
    keyboard;
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
        this.loadModels();
        this.setupKeyboardListeners();
        this.setWorld();
        this.draw();
        this.run();
    }


    loadModels() {
        this.character = new Character(this);
        this.endboss = new Endboss(this);
        this.healthBar = new HealthBar(this);
        this.coinBar = new CoinBar(this);
        this.bottleBar = new BottleBar(this);
        this.endbossHealthBar = new EndbossHealthBar(this);
        this.throwableObjects = [new ThrowableObject(this)];
        this.objectManager = new ObjectManager(this);
        this.hitManager = new HitManager(this);
        this.collisions = new Collisions(this);
    }


    setupKeyboardListeners() {
        document.addEventListener('keyup', (event) => {
            if (event.key.toLowerCase() === 'd') {
                this.keyboard.lastD = false;
            }
        });
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
        this.objectManager.checkThrowingObjectInterval();
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


    enemyIsDead(enemy) {
        if (!enemy.dead) {
            enemy.isDead();
            setTimeout(() => {
                this.objectManager.deleteObjectFromArray(this.level.enemies, enemy);
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


    updateEndbossHealth(endboss) {
        endboss.hit();
        this.endbossHealthBar.setPercentage(endboss.energy);
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