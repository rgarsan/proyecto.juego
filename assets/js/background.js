class Background{
    constructor(ctx){
        this.ctx = ctx;

        this.x = 0;
        this.y = 0;

        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;

        this.vx = -3

        this.img = new Image()
        this.img.src= './assets/img/space.jpg'
        
        // Nos aseguramos que la img esté cargada cuando la vamos a utilizar:
        this.img.isReady = false
        this.img.onload = ()=>{
            this.img.isReady = true
        }
    }

    isReady(){
        return this.img.isReady
    }

    draw(){
        
        if(this.isReady()){
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.ctx.canvas.width,
                this.ctx.canvas.height
            )

            this.ctx.drawImage(
                this.img,
                this.x + this.width,
                this.y,
                this.ctx.canvas.width,
                this.ctx.canvas.height
            )
        }
    }

    move(){
        this.x += this.vx

        if(this.x + this.width<=0 ){
            this.x = 0

        }
    }
}