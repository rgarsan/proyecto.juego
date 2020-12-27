class Coins{
    constructor(ctx,x,y){
        this.ctx = ctx
        
        
        this.x = x
        this.y = y

        this.sprite = new Image()
        this.sprite.src = './assets/img/skull-coin.png'
        this.sprite.isReady = false

        this.sprite.horizontalFrames = 7
        this.sprite.verticalFrames = 1

        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0

        this.sprite.onload = ()=>{
            this.sprite.isReady= true

            // Conseguir ancho y alto de la imagen
            this.sprite.frameWidth = Math.floor(this.sprite.width /this.sprite.horizontalFrames )
            this.sprite.frameHeight = Math.floor(this.sprite.height/this.sprite.verticalFrames)
            //Si queremos hacer la moneda más grande o más pequeña lo cambiamos aqui:
            this.width = this.sprite.frameWidth * 0.2
            this.height = this.sprite.frameHeight * 0.2

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
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth ,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth ,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            )

            this.sprite.drawCount++
            this.animate()
        }
    }

    animate(){
        if(this.sprite.drawCount % MOVEMENTS_FRAMES === 0){
            if(this.sprite.horizontalFrameIndex +1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
            this.sprite.drawCount = 0
        }
    }
}