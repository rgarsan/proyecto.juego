class Game{
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas. getContext('2d')

        this.canvas.width = 740
        this.canvas.height = 480

        this.drawInterval = undefined
        this.fps = 1000/60

        this.background = new Background(this.ctx)

        this.player1 = new Player1(this.ctx)
        
    }
    start(){
        if(!this.drawInterval){
            this.drawInterval = setInterval(()=>{
                
                this.clear()

                this.move()
                
                this.draw()

                
               
            },this.fps);
        }

    }

    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    }

    draw(){
        this.background.draw()
        this.player1.draw()
    }

    move(){
      this.background.move()
      this.player1.move()
    }

    onKeyEvent(event){
       
        this.player1.onKeyEvent(event)
    }

   
}