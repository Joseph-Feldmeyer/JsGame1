export default class Ball {

    constructor(game) {
        this.image = document.getElementById('img_ball'); 

        this.gameWidth = game.gameWidth
        this.gameHeight = game.gameHeight
        this.game = game 

        this.position = { x:10, y:10 }; 
        this.speed = { x: 2, y: 2 }; 
        this.size = 16; 
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
        if (this.position.y + this.size > this.gameHeight || this.position.y < 0) {
            this.speed.y = -this.speed.y; 
        }

        // Ball and paddle collision
        let bottomOfBall = this.position.y + this.size; 
        let topOfPaddle = this.game.paddle.position.y; 
        let leftSideOfPaddle = this.game.paddle.position.x; 
        let rightSideOfPaddle = this.game.paddle.position.x + this.game.paddle.width; 

        // Collision logic
        if(bottomOfBall >= topOfPaddle 
            && this.position.x + this.size >= leftSideOfPaddle
            && this.position.x <= rightSideOfPaddle
        ) {
            this.speed.y =- this.speed.y
            // this.position.y = topOfPaddle - this.size; 
        } 
    }

}

