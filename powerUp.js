function powerUp(ctx, name,player) {
     this.y = 720;
     this.player=player;
     this.width = 40;
     this.height = 40;
     this.vy = 4;
     this.ctx = ctx;
     this.name = name

     this.x = this.width + Math.floor(Math.random() * 1000 - this.width);
     this.img = new Image();

     if (this.name == "speed") {
          this.img.src = ("images/speed.png")
     } else if (this.name == "hacker") {
          this.img.src = ("images/hackerman.png");
     
     } else if (this.name == "time") {
          this.img.src = ("images/time.png");
       }
       else{
            this.img=0;
       }
}

powerUp.prototype.checkCollisions = function(){
     if(this.x<this.player.x+80 && this.x+this.width>this.player.x){
          return true;
     }
}

powerUp.prototype.draw = function () {
     if(this.img==0){
          this.ctx.lineTo(0,0,0,0);
          return false;
     }
     this.ctx.drawImage(this.img, this.x, this.y,this.width,this.height);
}

powerUp.prototype.update = function(){
     this.draw();
     return this.checkCollisions();
}