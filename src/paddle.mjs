export default class Paddle{ 
    constructor(gameWidth, gameHeight) { 
        this.width = 50;  
        this.height = 10; 

        this.position = {
            x: gameWidth/2 - this.width/2, 
            y: gameHeight - this.height - 5, 
        }
    } 


    draw(ctx) {
        ctx.fillStyle = '#0ff'; 
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height) 
    }

    update(deltaTime) {
        if (!deltaTime) return;

        this.position.x += 5 / deltaTime; 
    } 

} 
