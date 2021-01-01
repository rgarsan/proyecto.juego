class Enemy{
    constructor(ctx,x,y){
        this.ctx = ctx
        this.x = x
        this.y = y
        


        this.vx = -1

        this.sprite = new Image()
        this.sprite.src = './assets/img/enemy.png'
        this.sprite.isReady = false


        this.sprite.onload =()=>{
            this.sprite.isReady= true

            this.width = 50
            this.height = 50
        }
    }

    isReady(){
        return this.sprite.isReady
}

draw(){
    if(this.isReady()){
        this.ctx.drawImage(
            this.sprite,
            
            this.x,
            this.y,
            this.width,
            this.height
        )

        this.sprite.drawCount++
      
        this.move()
    }
}

move(){
    this.x += vx
}
}