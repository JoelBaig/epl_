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

    /**
     * Creates a new instance of the game world.
     * 
     * @param {HTMLCanvasElement} canvas - The game canvas element.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
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

    /**
     * Loads all models including the character, enemies, health bars, and managers.
     */
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

    /**
     * Sets up event listeners for keyboard inputs.
     */
    setupKeyboardListeners() {
        document.addEventListener('keyup', (event) => {
            if (event.key.toLowerCase() === 'd') {
                this.keyboard.lastD = false;
            }
        });
    }

    /**
     * Assigns the game world instance to the character and enemies.
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
    }

    /**
     * Starts the game's logic including collision detection and object management.
     */
    run() {
        this.collisions.handleObjectIntervals();
        this.collisions.handleEnemyIntervals();
        this.objectManager.checkThrowingObjectInterval();
    }

    /**
     * Triggers the Endboss when the character reaches a certain position.
     */
    endbossFirstContact() {
        if (this.character.x > 1800 && !this.firstContact) {
            this.endboss.speed = 10;
            this.firstContact = true;
            this.endbossHealthBar.y = 0;
            this.endboss.manageEndbossActions();
        }
    }

    /**
     * Marks an enemy as dead and removes it from the game world.
     * 
     * @param {Object} enemy - The enemy object to remove.
     */
    enemyIsDead(enemy) {
        if (!enemy.dead) {
            enemy.isDead();
            setTimeout(() => {
                this.objectManager.deleteObjectFromArray(this.level.enemies, enemy);
            }, 500);
        }
    }

    /**
     * Checks if the character is jumping on an enemy and eliminates it.
     * 
     * @param {Object} enemy - The enemy object.
     * @returns {boolean} - Returns true if the enemy is hit.
     */
    jumpOnChicken(enemy) {
        if (this.isFallingOn(enemy)) {
            this.enemyIsDead(enemy);
            this.jump();
            return true;
        }
        return false;
    }

    /**
     * Updates the Endboss's health bar after being hit.
     * 
     * @param {Object} endboss - The Endboss object.
     */
    updateEndbossHealth(endboss) {
        endboss.hit();
        this.endbossHealthBar.setPercentage(endboss.energy);
    }

    /**
     * Draws the game world by rendering objects on the canvas.
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

    /**
     * Draws background objects such as clouds, bottles, and coins.
     */
    drawBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
    }

    /**
     * Draws the status bars including health, coins, and bottles.
     */
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

    /**
     * Draws all movable objects such as enemies, the character, and throwable objects.
     */
    drawMovableObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
    }

    /**
     * Clears the entire canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Moves the rendering context forward to create a camera effect.
     */
    moveCtxForward() {
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Moves the rendering context backward.
     */
    moveCtxBackward() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Renders an object on the canvas.
     * 
     * @param {Object} mo - The object to render.
     */
    addToMap(mo) {
        this.handleObjectDirection(mo);
        this.displayObject(mo);
        this.resetObjectDirection(mo);
    }

    /**
     * Handles the direction of an object for correct rendering.
     * 
     * @param {Object} mo - The object to check.
     */
    handleObjectDirection(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
    }

    /**
     * Displays an object on the canvas if it has an image.
     * 
     * @param {Object} mo - The object to display.
     */
    displayObject(mo) {
        if (mo.img) {
            mo.draw(this.ctx);
        }
    }

    /**
     * Resets an object's direction after rendering.
     * 
     * @param {Object} mo - The object to reset.
     */
    resetObjectDirection(mo) {
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally for rendering.
     * 
     * @param {Object} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips an image back to its original position.
     * 
     * @param {Object} mo - The object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Adds multiple objects to the map.
     * 
     * @param {Object[]} objects - An array of objects to render.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Creates an animation loop by repeatedly calling `draw()`.
     */
    repeatDraw() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Pauses all sounds in the game.
     */
    pauseAllSounds() {
        audioManager.muteAll();
    }
}