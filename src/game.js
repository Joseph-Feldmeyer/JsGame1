import Paddle from '/src/paddle.mjs'; 
import InputHandler from '/src/input.mjs'; 
import Ball from '/src/balls.js'; 
import Brick from '/src/brick.js'; 

import { buildLevel, level1, level2, level3, level4, level5 } from '/src/levels.js'; 


const GAMESTATE = {
    PAUSED: 0, 
    RUNNING: 1, 
    MENU: 2, 
    GAMEOVER: 3 
}; 

export default class Game {
    constructor(gameWidth, gameHeight) { 
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.gamestate = GAMESTATE.MENU; 

        this.paddle = new Paddle(this); 
        this.ball = new Ball(this); 
        this.gameObjects = []; 
        this.bricks = []; 
        this.lives = 3;  

        this.levels = [level1, level2, level3, level4, level5]; 
        this.currentLevel = 0; 

        new InputHandler(this.paddle, this); 
    } 

    start() {
        this.gamestate = GAMESTATE.RUNNING; 

        // Create brick level
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);  
        this.ball.reset(); 

        this.gameObjects = [
            this.ball, 
            this.paddle
        ]; 

    } 

    update(deltaTime) {
        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER; 
        
        // If paused, do nothing 
        if(
            this.gamestate === GAMESTATE.PAUSED || 
            this.gamestate === GAMESTATE.MENU || 
            this.gamestate === GAMESTATE.GAMEOVER
    ) 
        return; 
        
        if (this.bricks.length === 0) {
            this.currentLevel++; 
            this.start();
        } 

        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime)); 
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion); 
    } 

    draw(ctx){ 
        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx)); 

        if(this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0,0,this.gameWidth, this.gameHeight); 
            ctx.fillStyle = "rgba(0,0,0, 1)"; 
            ctx.fill(); 

            ctx.font = "30px Arial"; 
            ctx.fillStyle = "white"; 
            ctx.textAlign = "center"; 
            ctx.fillText("Press SPACEBAR To Start", this.gameWidth/2, this.gameHeight/2); 
        } 

        if(this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0,0,this.gameWidth, this.gameHeight); 
            ctx.fillStyle = "rgba(0,0,0, 0.5)"; 
            ctx.fill(); 

            ctx.font = "30px Arial"; 
            ctx.fillStyle = "white"; 
            ctx.textAlign = "center"; 
            ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2); 
        } 

        if(this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0,0,this.gameWidth, this.gameHeight); 
            ctx.fillStyle = "rgba(200,0,0, 1)"; 
            ctx.fill(); 

            ctx.font = "30px Arial"; 
            ctx.fillStyle = "white"; 
            ctx.textAlign = "center"; 
            ctx.fillText("GAME OVER", this.gameWidth/2, this.gameHeight/2); 
        } 
    } 
    
    togglePause() {
        if(this.gamestate === GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING; 
        } else { 
            this.gamestate = GAMESTATE.PAUSED;
        } 
    } 

} 
