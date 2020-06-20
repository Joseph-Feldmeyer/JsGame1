export default class Paddle{ 
    constructor(gameWidth, gameHeight) { 
        this.gameWidth = gameWidth;
        this.width = 50;  
        this.height = 10; 

        this.maxSpeed = 3; 
        this.speed = 0; 

        this.position = {
            x: gameWidth/2 - this.width/2, 
            y: gameHeight - this.height - 5, 
        }
    } 


    moveLeft() {
        this.speed = -this.maxSpeed; 
    } 

    moveRight() {
        this.speed = this.maxSpeed; 
    } 

    stop() {
        this.speed = 0; 
    }



    draw(ctx) {
        ctx.fillStyle = '#0ff'; 
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height) 
    }

    update(deltaTime) {
        if (!deltaTime) return;

        // move the paddle 
        this.position.x += this.speed; 

        // stop the paddle at the edges of the screen 
        if(this.position.x < 0) this.position.x = 0; 
        if(this.position.x + this.width > this.gameWidth) 
            this.position.x = this.gameWidth - this.width;
    } 

} 
