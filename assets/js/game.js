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

        this.canReceiveDamage =  true

        this.ovniSpeed = -9

      

       
        
        this.intervalCoins=setInterval(()=>{
            this.addCoins()
      
          
            
        },5000)

        this.intervalEnemies=setInterval(()=>{
            
           this.addEnemies()
          
        
        },3000)

        this.intervalEnemies=setInterval(()=>{
            
            this.addOvnis()
         
         },4000)

        this.coins = []

        this.enemies= []

        this.ovnis = []

        this.points= 0
        
        this.lives = 4
        

        const theme = new Audio('./assets/sound/theme.mp3')
        theme.volume = 0

        this.sounds = {
            theme:theme,
            coins : new Audio('./assets/sound/coin.mp3'),
            shoot : new Audio('./assets/sound/shoot.mp3'),
            explosion : new Audio('./assets/sound/explosion.mp3'),
            grito: new Audio('./assets/sound/grito.mp3'),
            explosion2 : new Audio('./assets/sound/explosion2.mp3'),
            grito_nave : new Audio ('./assets/sound/grito_nave.mp3')

           
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
      
        
        
        this.enemies.forEach(enemy=>enemy.draw())
        this.ovnis.forEach(ovni=>ovni.draw())
        this.coins.forEach(coin => coin.draw())
       

      

        this.ctx.save()
        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(0, 0, 280, 60)
        this.ctx.font = '20px Arial'
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`Score: ${this.points}`,50,40)
        this.ctx.fillText(`Lives: ${this.lives}/4`,180,40)

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

        // COLISIONES DE LAS BALAS CONTRA LOS ENEMIGOS------------------------------------------

            this.enemies.forEach(enemy => {
            const bulletToDelete = this.player1.bullets.find(bullet=> bullet.colidesWith(enemy))
                                            // Find nos devuelve true o false
            if(bulletToDelete){

                
                this.player1.bullets = this.player1.bullets.filter(bullet=> bullet !== bulletToDelete)
                this.enemies = this.enemies.filter(filterEnemy => filterEnemy !== enemy)
                this.points += 10

                
                if(this.points % 40 === 0){
                    this.ovniSpeed-= 0.5
                }


                this.sounds.explosion.currentTime = 0
                this.sounds.explosion.play()
                this.sounds.explosion.volume = 3

            
        
               

            }

        })

        this.ovnis.forEach(ovni => {
            const bulletToDelete = this.player1.bullets.find(bullet=> bullet.colidesWith(ovni))
            
            if(bulletToDelete){
                
                this.player1.bullets = this.player1.bullets.filter(bullet=> bullet !== bulletToDelete)
                this.ovnis = this.ovnis.filter(filterOvni => filterOvni !== ovni)
                this.points += 10

                if(this.points % 20 === 0){
                    this.ovniSpeed-=0.5
                }

                this.sounds.explosion2.currentTime = 0
                this.sounds.explosion2.play()
                this.sounds.explosion2.volume = 3

               

              
            }
        })
       


    //-----------------------------------------------------------------------------------------------------


     // COLISIONES DE LA NAVE CON LOS OBSTACULOS--------------------------------------------------------   
        if (this.enemies.some(enemy => this.player1.colidesWith(enemy))) {
            if(this.canReceiveDamage){

                this.lives--
                this.canReceiveDamage = false

               setTimeout(() => this.canReceiveDamage = true,2000)

                 this.sounds.grito_nave.currentTime = 0
                this.sounds.grito_nave.play()
                this.sounds.grito_nave.volume = 0.2
            
            }
            
            }

            if(this.lives === 0){
                this.stop()
            }

           
         
       

        if (this.ovnis.some(ovni => this.player1.colidesWith(ovni))) {
            if(this.canReceiveDamage){
                
                
                this.lives--
                this.canReceiveDamage = false
                setTimeout(()=>this.canReceiveDamage= true,2000)

               this.sounds.grito_nave.currentTime = 0
                this.sounds.grito_nave.play()
                this.sounds.grito_nave.volume = 0.3
            }
           

           }

           if(this.lives === 0){
            this.stop()
        }
        //----------------------------------------------------------------------
      
           
     
        const restPoints = this.coins.filter(coin => !this.player1.colidesWith(coin))
        
        const newPoints = this.coins.length - restPoints.length
        this.points += newPoints*10

      

        this.coins = restPoints

        if(newPoints) {
            this.sounds.coins.currentTime = 0
            this.sounds.coins.play()
            this.sounds.coins.volume = 0.4
        }

        
        

        

    
           
    }
 addCoins(){
        this.coins.push(
           
            new Coins(this.ctx,this.canvas.width, Math.floor(Math.random()*this.canvas.height)),
            
        )
        
        }

    addEnemies(){
        this.enemies.push(
            new Enemy(this.ctx,this.canvas.width, Math.floor(Math.random()*this.canvas.height),this.ovniSpeed)
        )
        
    }

    addOvnis(){
        console.log(this.ovniSpeed)
        this.ovnis.push(
            new Ovni(this.ctx,this.canvas.width, Math.floor(Math.random()*this.canvas.height),this.ovniSpeed)
        )
    }

    insertCoin(){
        this.ctx.save()
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

        this.ctx.font = '35px Arial'
        this.ctx.fillStyle = 'red'
        this.ctx.textAlign = 'center'
        this.ctx.fillText('STAGE 1/1',
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2 - 50)
        this.ctx.font = '24px Arial'
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(`PRESS ENTER AND ENJOY`,
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2 + 50)

        this.ctx.restore()

    }

    addLevel(){
        if(this.points > 40){
            this.enemy.vx = -12

        }
    }
    }
   
   