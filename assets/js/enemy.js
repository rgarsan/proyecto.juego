class Enemy{
    constructor(ctx,x,y,w,h){
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h


        this.vx = -1

        this.sprite = new Image()
        this.sprite.src = './assets/img/enemy.png'
        this.sprite.isReady = false


        this.sprite.onload =()=>{
            this.sprite.isReady= true
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
            this.w,
            this.h
        )

        this.sprite.drawCount++
      
        this.move()
    }
}

move(){
    this.x += vx
}
}