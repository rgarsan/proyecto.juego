class Shot{
    constructor(ctx,x,y){
        this.ctx = ctx
        this.x = x
        this.y = y


        this.vx = SPEED

        this.sprite = new Image()
        this.sprite.src = './assets/img/disparo.png'
        this.sprite.isReady= false

        this.sprite.horizontalFrames= 4
        this.sprite.verticalFrames= 1

        this.sprite.horizontalFrameIndex= 0
        this.sprite.verticalFrameIndex= 0

        this.sprite.onload = ()=>{
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.floor(this.sprite.width/this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height/this.sprite.verticallFrames)
            this.width = this.sprite.frameWidth
            this.height = this.sprite.frameHeight
        }
            this.sprite.drawCount = 0

    }
    isReady(){
        return this.sprite.isReady
    }

    draw(){
        if(this.isReady()){
            this.ctx.drawImage(
                this.sprite,
                this.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.esprite.frameHeight,
                this.x,
                this.y,
                this.width ,
                this.height 



            )
            // Contador para sprites
            this.sprite.drawCount++
            // LLamamos a la función animate declarada más abajo en cada pintado de la imagen
            this.animate()
          
        }

    }
    animate(){
        if(this.sprite.drawCount % MOVEMENTS_FRAMES ===0){
           this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex +1) % this.sprite.horizontalFrames
            this.sprite.drawCount = 0
        }
    }
    move(){
        this.x += this.vx
    }
}