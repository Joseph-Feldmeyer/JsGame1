export function detectCollision(ball, gameObject) { 

    // Ball and object collision
    let bottomOfBall = ball.position.y + ball.size; 
    let topOfBall = ball.position.y
    
    let topOfObject = gameObject.position.y; 
    let bottomOfObject = gameObject.position.y + gameObject.height; 
    let leftSideOfObject = gameObject.position.x; 
    let rightSideOfObject = gameObject.position.x + gameObject.width; 

    // Collision logic
    // Return True if collision, false if no 
    if(
        bottomOfBall >= topOfObject &&
        topOfBall <= bottomOfObject &&
        ball.position.x + ball.size >= leftSideOfObject &&
        ball.position.x <= rightSideOfObject
    ) {
        return true; 
    } else { 
        return false; 
    } 

} 


