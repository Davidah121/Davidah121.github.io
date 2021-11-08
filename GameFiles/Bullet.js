function Bullet(x,y,id) {

    this.x = x;
    this.y = y;
    this.id = id;
    
    this.update = function() {
        this.y-=8;
        if(this.y < 0)
        {
            Game.removeBullet(this.id);
        }

        //check collision
        for(let i=0; i<Game.rocks.length; i++)
        {
            var disX = Game.rocks[i].x - this.x;
            var disY = Game.rocks[i].y - this.y;

            if( Math.sqrt(disX*disX + disY*disY) <= 32)
            {
                Game.removeRock(Game.rocks[i].id);
                Game.score += 10;
                Game.removeBullet(this.id);
            }
        }
    }

    this.draw = function(context) {
        context.fillStyle="#00AA00";
        context.beginPath();
        context.arc(this.x,this.y,4,0,2*Math.PI,false);
        context.fill();
    }
}