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

       
        
        this.intervalCoins=setInterval(()=>{
            this.addCoins()
            
        },5000)

       /* this.intervalEnemies=setInterval(()=>{
            
           this.addEnemies()
        },5000)*/

        this.coins = []

        //this.enemies= []

        this.points= 0
        this.lifes = 4
        

        const theme = new Audio('./assets/sound/theme.mp3')
        theme.volume = 0.3

        this.sounds = {
            theme:theme,
            coins : new Audio('./assets/sound/coin.mp3'),
            shoot : new Audio('./assets/sound/shoot.mp3')
           
        }

        

        
    }
    start(){
        if(!this.drawInterval){
            this.sounds.theme.play()
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
       // this.enemys.forEach(enemy=>enemy.draw() )

      

        this.ctx.save()
        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(0, 0, 280, 60)
        this.ctx.font = '20px Arial'
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`Score: ${this.points}`,50,40)
        this.ctx.fillText('Life: 4/4',180,40)

        this.ctx.restore()
    }

    move(){
      this.background.move()
      this.player1.move()
     
    
      
    }

    onKeyEvent(event){
       
        this.player1.onKeyEvent(event)
    }

    stop() {
        clearInterval(this.drawInterval)
       

        this.ctx.save()
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

        this.ctx.font = '35px Arial'
        this.ctx.fillStyle = 'red'
        this.ctx.textAlign = 'center'
        this.ctx.fillText('Game Over!',
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2 - 50)
        this.ctx.font = '24px Arial'
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(`Your final score: ${this.points} points`,
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2 + 50)

        this.ctx.restore()
    }

    checkCollitions(){

        /*if (this.enemies.some(enemy => this.player1.colidesWith(enemy))) {
            this.stop()
        }*/
        const restPoints = this.coins.filter(coin => !this.player1.colidesWith(coin))
        const newPoints = this.coins.length - restPoints.length
        this.points += newPoints*10

        this.coins = restPoints

        if(newPoints) {
            this.sounds.coins.currentTime = 0
            this.sounds.coins.play()
            this.sounds.coins.volume = 0.3
        }

    
        
    }
 addCoins(){
        this.coins.push(
           
            new Coins(this.ctx,this.canvas.width, Math.floor(Math.random()*this.canvas.height)),
            
        )
        
        }

    /*addEnemies(){
        this.enemys.push(
            new Enemy(this.ctx,this.canvas.width, Math.floor(Math.random()*this.canvas.height),50,50)
        )
    }*/
    }
   
   