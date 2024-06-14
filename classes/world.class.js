class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;
    cameraFollowEndX;
    offset = [

    ];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
    }

    /**
     * Draws objects onto the world by rendering them on the canvas.
     * 
     */
    draw() {
        this.clearCanvas();
        this.moveCtxLeft();
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addToMap(this.character);
        this.moveCtxRight();
        this.repeatDraw();
    }

    /**
     * Clears the canvas by erasing the entire area.
     * 
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    moveCtxLeft() {
        this.ctx.translate(this.camera_x, 0);
    }


    moveCtxRight() {
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
        mo.drawFrame(this.ctx);
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
