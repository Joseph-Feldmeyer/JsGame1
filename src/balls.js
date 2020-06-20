import { detectCollision } from './collisionDetection.js'; 

export default class Ball {

    constructor(game) {
        this.image = document.getElementById('img_ball'); 

        this.gameWidth = game.gameWidth
        this.gameHeight = game.gameHeight
        this.game = game 

        this.size = 16; 
        this.reset(); 
    } 

    reset() {
        this.position = { x:10, y:400 }; 
        this.speed = { x: 6, y: -6 }; 
    }

    draw(ctx) {
        ctx.drawImage(this.image, 
            this.position.x, this.position.y, 
            this.size, this.size) 
    }

    update(deltaTime) { 
        this.position.x += this.speed.x;
        this.position.y += this.speed.y; 

        // If ball hits side walls 
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x; 
        } 

        // If ball hits ceiling 
        if (this.position.y < 0) {
            this.speed.y = -this.speed.y; 
        }

        // If detect collision with paddle
        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y; 
        } 

        // Lose life if collision with wall 
        if (this.position.y + this.size > this.gameHeight) { 
            this.game.lives--; 
            this.reset(); 
        }
    }

}

