class MovableObject {
    x = 100;
    y = 50;
    width = 60;
    height = 100;
    img;

    /**
     * This function assigns a picture to the img variable
     *
     * @param {picture path} path 
     */
    loadImage(path) { // loadImage('../assets/img/example.png');
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function is used to move an object to the right side
     *
     */
    moveRight() {
        console.log('Moving right');
    }

    /**
     * This function is used to move an object to the left side
     *
     */
    moveLeft() {
        console.log('Moving left');
    }
}