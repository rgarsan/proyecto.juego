class Player1 {
    constructor(ctx,x,y){
        this.ctx = ctx

        this.x = x
        this.maxX = this.ctx.canvas.width
        this.maxY = this.ctx.canvas.height
        this.y = y
        this.vx = 0
        this.vy = 0

        this.sprite = new Image()
        this.sprite.src = './assets/img/player1.png'
        this.sprite.isReady = false

        this.sprite.horizontalFrames = 5
        this.sprite.verticalFrames= 1

        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0

        this.sprite.drawCount = 0

        this.sprite.onload = () =>{
            this.sprite.isReady = true
            this.width = Math.floor(this.sprite.width/ this.sprite.horizontalFrames)
            this.height = this.sprite.height
        }


       
       
        //Iniciamos los movements en false para posteriormente declarar la const status y cambiarlos
        this.movement = {
            up:false,
            down:false,
            left:false,
            right:false
        }

        this.bullets = []

        
    }

    isReady(){
        return this.sprite.isReady
    }

    draw(){
        if(this.isReady()){
            this.ctx.drawImage(
                
                this.sprite,
                this.sprite.horizontalFrameIndex * this.width,
                0,
                this.width,
                this.height,
                this.x,
                this.y,
                this.width *2,
                this.height * 2



            )
            

            this.bullets.forEach(bullet => bullet.draw())
        
            // Contador para sprites
            this.sprite.drawCount++
            // LLamamos a la función animate declarada más abajo en cada pintado de la imagen
            this.animate()
          
        }

    }
    // Pasamos el evento y si hay keydown lo convertimos en true.
    onKeyEvent(event){
        const status = event.type ==='keydown'
      
        switch(event.keyCode){
            case KEY_UP:
                this.movement.up = status
                this.vy = -SPEED
               
                break;
            case KEY_DOWN:
                this.movement.down = status
                this.vy = SPEED
                break;
            case KEY_LEFT:
                this.movement.left = status
                this.vx = -SPEED
                break;
            case KEY_RIGHT:
                this.movement.right = status
                this.vx = SPEED
                
                break;
            case KEY_FIRE:
             
                this.bullets.push(
                    new Shot(this.ctx,this.x + this.width ,this.y + this.height),
                    
                )

                
               

                
                break;
                
                default:
                    break;
            
        }
    }

    move(){


        this.bullets.forEach(bullet => bullet.move())
        
        this.x += this.vx
        this.y += this.vy

       

        if(this.x >= this.maxX){
            this.x = this.maxX -this.width
        }else if(this.x <= 0){
            this.x = 0
        }
        else if(this.y < 0 ){
            this.y = 0
        
        }else if(this.y >= this.maxY){
            this.y = this.maxY+ this.height
        }


        if(!this.movement.right && !this.movement.left && !this.movement.down && !this.movement.up){
           
            this.vy = 0
            this.vx = 0

            
       

        
        }
    }
    animate(){
        // LLamamos a la función animateSprite declarada abajo cada vez que haya movimiento, y si no, reseteo
        if(this.movement.left || this.movement.right || this.movement.up || this.movement.down){
           this.animateSprite()

        } else{
                this.resetAnimation()
        }
    }
// Volvemos a la imagen 0 de las 5 que tiene el sprite
    resetAnimation(){
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
    }

    animateSprite(){
        //con esto tendremos 10 fps
        if(this.sprite.drawCount % MOVEMENTS_FRAMES===0){
            //Cuando el index llegue a 5 volverá a empezar, y si no, le seguimos sumando 1
            if(this.sprite.horizontalFrameIndex+1 === this.sprite.horizontalFrames){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
           
        }

      
        
    }

    colidesWith(element){
        return this.x < element.x + element.width &&
        this.x + this.width > element.x &&
        this.y < element.y +  element.height &&
        this.y + this.height >element.y

    }
    

}