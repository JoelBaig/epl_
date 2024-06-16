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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }


    setWorld() {
        this.character.world = this;
    }


    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.isHitted();
                    this.healthBar.setPercentage(this.character.energy);
                };
            });
        }, 150);
    }

    /**
     * Draws objects onto the world by rendering them on the canvas.
     * 
     */
    draw() {
        this.clearCanvas();
        this.moveCtxForward();
        this.drawObjects();
        this.moveCtxBackward();
        this.drawStatusBars();
        this.moveCtxForward();
        this.drawEnemies();
        this.drawCharacter();
        this.moveCtxBackward();
        this.repeatDraw();
    }


    drawObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }


    drawStatusBars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossHealthBar);
    }


    drawEnemies() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
    }


    drawCharacter() {
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
