Game = {};
Game.player = {};
Game.bullets = [];
Game.rocks = [];
Game.canvas = "";
Game.ctx = "";
Game.end = false;
Game.score = 0;
Game.totalBID = 0;
Game.totalRID = 0;
Game.framesPassed = 0;
Game.timestamp = 0;
Game.oldTimestamp = 0;
Game.fps = 0;
Game.fpsCounter = 0;
Game.totalTimePassed = 0;

Game.addBullet = function(x, y) {
	this.bullets.push( new Bullet(x,y,this.totalBID) );
	this.totalBID+=1;
}

Game.removeBullet = function(id) {

	var index = -1;
	for(var i=0; i<this.bullets.length; i++)
	{
		if(this.bullets[i].id === id)
		{
			index = i;
			break;
		}
	}

	if(index>=0)
		this.bullets.splice(index, 1);
}

Game.addRock = function(x, y) {
	this.rocks.push( new Rock(x,y,this.totalRID) );
	this.totalRID+=1;
}

Game.removeRock = function(id) {

	var index = -1;
	for(var i=0; i<this.rocks.length; i++)
	{
		if(this.rocks[i].id === id)
		{
			index = i;
			break;
		}
	}

	if(index>=0)
		this.rocks.splice(index, 1);
}

Game.reset = function() {
	Game.player = new Player(this.canvas.width/2, this.canvas.height/2);
	Game.rocks = [];
	Game.bullets = [];
	Game.totalRID=0;
	Game.totalBID=0;
	Game.end = false;
}

Game.init = function() {
	this.canvas = document.getElementById("miniGameCanvas");
	this.ctx = this.canvas.getContext("2d");
	Input.init();
	this.player = new Player(this.canvas.width/2, this.canvas.height/2);
	// Game.addRock(320,0);
}


Game.draw = function() {
	this.ctx.fillStyle="#000000";
	this.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);

	for(let i=0; i<Game.bullets.length; i++)
	{
		Game.bullets[i].draw(Game.ctx);
	}

	for(let i=0; i<Game.rocks.length; i++)
	{
		Game.rocks[i].draw(Game.ctx);
	}

	this.player.draw(Game.ctx);

	//draw score
	this.ctx.fillStyle="#FFFFFF";
	this.ctx.font = "24px Verdana";
	if(Game.end == false)
	{
		this.ctx.fillText("Score: "+this.score, 16, 24);
	}

	this.ctx.font = "12px Verdana";
	this.ctx.fillText("FPS: "+Game.fps, 8, 512-8);
}

Game.drawEnd = function() {

	//draw score
	this.ctx.fillStyle="#FFFFFF";
	this.ctx.font = "24px Verdana";
	this.ctx.fillText("GAME OVER", 240-48, 240-32);
	this.ctx.fillText("Score: "+this.score, 240-48, 240+32);
	this.ctx.fillText("Press Space to begin a new game ", 64, 480);

	this.ctx.font = "12px Verdana";
	this.ctx.fillText("FPS: "+Game.fps, 8, 512-8);
}


Game.update = function() {
	if(Game.end == true)
	{
		Game.drawEnd();

		if(Input.getKeyPressed(" "))
		{
			Game.reset();
		}
	}
	else
	{
		if(Game.framesPassed >= 60)
		{
			Game.addRock(Math.random()*Game.canvas.width, 0);
			Game.framesPassed = 0;
		}

		Game.player.update();
		for(let i=0; i<Game.bullets.length; i++)
		{
			Game.bullets[i].update();
		}
		for(let i=0; i<Game.rocks.length; i++)
		{
			Game.rocks[i].update();
		}

		Game.draw();
		Input.resetKeys();

		Game.framesPassed++;
	}
}

Game.run = function(timestamp) {
	var timePassed = (timestamp - Game.oldTimestamp) / 1000;

	//Can't force 60FPS with this type of loop
	//FPS is dependent on monitor refresh rate.
	if(timePassed >= 0.012)
	{
		Game.fpsCounter += 1;
		Game.oldTimestamp = timestamp;
		if(!isNaN(timePassed))
		{
			Game.totalTimePassed += timePassed;
		}

		if(Game.totalTimePassed >= 1.0)
		{
			Game.fps = Game.fpsCounter;
			Game.fpsCounter = 0;
			Game.totalTimePassed = 0;
		}
		Game.update();
	}
	
	window.requestAnimationFrame(Game.run);
}

window.addEventListener("load", function(){
	Game.init();
	Game.run();
});