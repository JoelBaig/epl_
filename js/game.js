let canvas;
let world;

/**
 *  This function initializes the world
 * 
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log('My character is', world.character);
}