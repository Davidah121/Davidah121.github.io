function Rock(x,y,id) {

    this.x = x;
    this.y = y;
    this.id = id;

    this.nX = [];
    this.nY = [];
    
    for(let i=0; i<8; i++)
    {
        this.nX.push(Math.cos( 2*Math.PI/8 * i) * (24 + 16*Math.random()));
        this.nY.push(Math.sin( 2*Math.PI/8 * i) * (24 + 16*Math.random()));
    }

    this.update = function() {

        this.y+=2;
        if(y > Game.canvas.height)
        {
            Game.removeRock(id);
        }
    }

    this.draw = function(context) {
        context.fillStyle="lightgray";
        context.beginPath();

        for(let i=0; i<8; i++)
        {
            if(i===0)
            {
                context.moveTo(this.x+this.nX[i], this.y+this.nY[i]);
            }
            else
            {
                context.lineTo(this.x+this.nX[i], this.y+this.nY[i]);
            }
        }
        context.fill();
    }
}