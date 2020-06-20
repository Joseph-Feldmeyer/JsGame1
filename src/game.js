import Paddle from '/src/paddle.mjs'; 
import InputHandler from '/src/input.mjs'; 
import Ball from '/src/balls.js'; 
import Brick from '/src/brick.js'; 

import { buildLevel, level1 } from '/src/levels.js'; 



export default class Game {
    constructor(gameWidth, gameHeight) { 
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

    } 

    start() {
        this.paddle = new Paddle(this); 
        this.ball = new Ball(this); 

        // Create brick level
        let bricks = buildLevel(this, level1);  

        this.gameObjects = [
            this.ball, 
            this.paddle, 
            ...bricks
        ]; 

        new InputHandler(this.paddle); 

    } 

    update(deltaTime) {
        this.gameObjects.forEach((object) => object.update(deltaTime)); 
    } 

    draw(ctx){ 
        this.gameObjects.forEach((object) => object.draw(ctx)); 
    } 
    

} 
