class World {
    character = new Character();
    enemies = [
        new ChickenBig(),
        new ChickenBig(),
        new ChickenBig(),

        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall()
    ];
    endboss = new Endboss();
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    /**
     * Draws objects onto the world by rendering them on the canvas.
     * 
     */
    draw() {
        this.clearCanvas();
        this.drawCharacter();
        this.drawEnemies();
        this.drawEndboss();
        this.repeatDraw();
    }

    /**
     * Clears the canvas by erasing the entire area.
     * 
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws the character object
     * 
     */
    drawCharacter() {
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
    }

    /**
     * Draws the enemy object
     * 
     */
    drawEnemies() {
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
    }

    /**
     * Draws the enboss object
     * 
     */
    drawEndboss() {
        this.ctx.drawImage(this.endboss.img, this.endboss.x, this.endboss.y, this.endboss.width, this.endboss.height);
    }

    /**
     * Repeats draw() over and over again
     * 
     */
    repeatDraw() {
        let self = this;

        requestAnimationFrame(function () {
            self.draw();
        });
    }
}