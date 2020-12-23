class Player1 {
    constructor(ctx,x,y){
        this.ctx = ctx

        this.x = x
        this.maxX = this.ctx.canvas.width / 2
        this.y = y
        this.vx=0
        this.vy = 0

        this.sprite = new Image()
        this.sprite.src = './assets/img/player1.png'
        this.sprite.isReady = false

        this.sprite.horizontalFrames = 5
        this.sprite.verticalFrames= 1

        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0

        this.sprite.onload = () =>{
            this.sprite.isReady = true
            this.width = Math.floor(this.sprite.width/ this.sprite.horizontalFrames)
            
            
            this.height = this.sprite.height
        }


        this.sprite.drawCount = 0
       
        //Iniciamos los movements en false para posteriormente declarar la const status y cambiarlos
        this.movement = {
            up:false,
            down:false,
            left:false,
            right:false
        }

    }

    isReady(){
        return this.sprite.isReady
    }

    draw(){
        if(this.isReady()){
            this.ctx.drawImage(
                this.sprite,
                0,
                0,
                this.width,
                this.height,
                0,
                this.ctx.canvas.height/2 - (this.height/2),
                this.width *2,
                this.height * 2



            )
        }

    }
    // Pasamos el evento y si hay keydown lo convertimos en true.
    onKeyEvent(event){
        const status = event.type ==='keydown'
      
        switch(event.keyCode){
            case KEY_UP:
                this.movement.up = status
               
                break;
            case KEY_DOWN:
                this.movement.down = status
                break;
            case KEY_LEFT:
                this.movement.left = status
                break;
            case KEY_RIGHT:
                this.movement.right = status
                
                break;
                
                default:
                    break;
            
        }
    }

    move(){
        if(this.movement.right){
            this.vx = SPEED
          
        }else if(this.movement.left){
            this.vx = -SPEED
        }else{
            this.vx = 0
        }



        this.x += this.vx
        this.y += this.vy
    }
}