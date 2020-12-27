class Game{
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas. getContext('2d')

        this.canvas.width = 740
        this.canvas.height = 480

        this.drawInterval = undefined
        this.fps = 1000/60

        this.background = new Background(this.ctx)

        this.player1 = new Player1(this.ctx ,0,200)

        this.coins = [
            new Coins(this.ctx,200, 300),
            new Coins(this.ctx,150, 220),
            new Coins(this.ctx,270, 120)
        ]

        this.points= 0
        this.pointsCoint = new Coins(this.ctx,15,20)

        
    }
    start(){
        if(!this.drawInterval){
            this.drawInterval = setInterval(()=>{
                
                this.clear()

                this.move()
                
                this.draw()

                this.checkCollitions()
               

            
               
            },this.fps);
        }

    }

    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    }

    draw(){
        this.background.draw()
        this.player1.draw()
        this.coins.forEach(coin => coin.draw())

        this.pointsCoint.draw()

        this.ctx.save()
        this.ctx.font = '18px Arial'
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(`Score: ${this.points}`,50,40)
        this.ctx.restore()
    }

    move(){
      this.background.move()
      this.player1.move()
      
    }

    onKeyEvent(event){
       
        this.player1.onKeyEvent(event)
    }

    checkCollitions(){
        const restPoints = this.coins.filter(coin => !this.player1.colidesWith(coin))
        const newPoints = this.coins.length - restPoints.length
        this.points += newPoints*10

        this.coins = restPoints
    }

   
}