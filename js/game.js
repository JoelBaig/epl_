let canvas;
let world;
let keyboard = new Keyboard();

/**
 *  This function initializes the world
 * 
 */
function startGame() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}