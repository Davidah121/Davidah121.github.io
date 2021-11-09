function clamp(v1, v2, v3) {
    if(v1 < v2)
        return v2;
    if(v1 > v3)
        return v3;
    return v1;
}

function Player(x,y) {

    this.x = x;
    this.y = y;
    this.accel = 0;
    this.move = false;
    this.fireValue = 0;
    this.fireDir = true;
    this.health = 2;
    this.invicibleFrames = 0;



    this.update = function() {
    
        this.move = false;
        if (Input.getKeyDown("A") || Input.getKeyDown(37)) {
            if (this.x-this.accel > 0) {
                this.x-=this.accel;
                this.move=true;
            }
            else {
                this.x=0;
            }
        }
        else if (Input.getKeyDown("D") || Input.getKeyDown(39)) {
            if (this.x+this.accel < Game.canvas.width) {
                this.x+=this.accel;
                this.move=true;
            }
            else {
                this.x=Game.canvas.width;
            }
        }

        if (Input.getKeyDown("W") || Input.getKeyDown(38)) {
            if (this.y-this.accel > 0) {
                this.y-=this.accel;
                this.move=true;
            }
            else {
                this.y=0;
            }
        }
        else if (Input.getKeyDown("S") || Input.getKeyDown(40)) {
            if (this.y+this.accel < Game.canvas.height) {
                this.y+=this.accel;
                this.move=true;
            }
            else {
                this.y=Game.canvas.height;
            }
        }
        
    
        if (this.move===true) {
            this.accel+=0.5;
            if (this.accel >=4) {
                this.accel=4;
            }
        }
        else
        {
            this.accel = 0;
        }

        if(Input.getKeyPressed(" "))
        {
            Game.addBullet(this.x,this.y-32);
        }

        if(this.fireDir)
        {
            this.fireValue += 2;
        }
        else
        {
            this.fireValue -= 1;
        }
        if(this.fireValue <= 0 || this.fireValue >= 8)
        {
            this.fireDir = !this.fireDir;
        }

        if(this.invicibleFrames <= 0)
        {
            //check collision
            //assume bounding box to circle collision

            //check bottom box
            var collision = false;
            var removeID = 0;

            for(let i=0; i<Game.rocks.length; i++)
            {
                var curX = clamp(Game.rocks[i].x, this.x-32, this.x+32) - Game.rocks[i].x;
                var curY = clamp(Game.rocks[i].y, this.y+16, this.y+32) - Game.rocks[i].y;
                
                var length = Math.sqrt(curX*curX + curY*curY);
                
                if (length <= 32)
                {
                    collision = true;
                    removeID = Game.rocks[i].id;
                    break;
                }
            }

            //check middle box
            for(let i=0; i<Game.rocks.length; i++)
            {
                var curX = clamp(Game.rocks[i].x, this.x-16, this.x+16) - Game.rocks[i].x;
                var curY = clamp(Game.rocks[i].y, this.y-32, this.y+32) - Game.rocks[i].y;
                
                var length = Math.sqrt(curX*curX + curY*curY);
                
                if (length <= 32)
                {
                    collision = true;
                    removeID = Game.rocks[i].id;
                    break;
                }
            }

            if(collision)
            {
                this.health-=1;
                this.invicibleFrames = 60;
                Game.removeRock(removeID);
            }
        }
        else
        {
            this.invicibleFrames-=1;
        }

        if(this.health <= 0)
        {
            Game.end = true;
        }
    }
    
    this.draw = function(context) {
        //draw player
        if(this.invicibleFrames > 0)
        {
            context.globalAlpha = 0.75;
        }

        context.fillStyle="#FF0000";
        context.beginPath();
        context.moveTo(this.x-32,this.y+32);
        context.lineTo(this.x-16,this.y+16);
        context.lineTo(this.x,this.y+32);
        context.fill();

        context.fillStyle="#0000FF";
        context.beginPath();
        context.moveTo(this.x+32,this.y+32);
        context.lineTo(this.x+16,this.y+16);
        context.lineTo(this.x,this.y+32);
        context.fill();

        context.fillStyle="#444444";
        context.beginPath();
        context.moveTo(this.x,this.y+32);
        context.lineTo(this.x-16,this.y+16);
        context.lineTo(this.x,this.y-32);
        context.lineTo(this.x+16,this.y+16);
        context.fill();

        //fire behind what should be engines
        if(this.health>=2)
        {
            var gVal = 136;
            gVal += Number(this.fireValue)*8;
            context.fillStyle="rgb(255,"+gVal+",0)";
            context.beginPath();
            context.moveTo(this.x-28,this.y+32);
            context.lineTo(this.x-24,this.y+48+this.fireValue);
            context.lineTo(this.x-16,this.y+40+this.fireValue);
            context.lineTo(this.x-8,this.y+48+this.fireValue);
            context.lineTo(this.x-4,this.y+32);
            context.fill();
        }

        if(this.health>=1)
        {
            var gVal = 136;
            gVal += Number(this.fireValue)*8;
            context.fillStyle="rgb(255,"+gVal+",0)";
            context.beginPath();
            context.moveTo(this.x+28,this.y+32);
            context.lineTo(this.x+24,this.y+48+this.fireValue);
            context.lineTo(this.x+16,this.y+40+this.fireValue);
            context.lineTo(this.x+8,this.y+48+this.fireValue);
            context.lineTo(this.x+4,this.y+32);
            context.fill();
        }
        
        context.globalAlpha = 1.0;
    }
}