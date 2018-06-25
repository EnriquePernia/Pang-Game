
function Bullet(ctx,player){
     this.ctx=ctx;
     this.x=player.x+40;
     this.sY=0;
     this.y=player.y-80;
     this.vY=1.5;
}

Bullet.prototype.draw= function(){
     this.sY-=this.vY;
     this.ctx.save();
     this.ctx.fillRect(this.x,this.y,10,this.sY);
     //this.ctx.drawImage(this.img, -10, 0, 10, 0);
     this.ctx.restore();
    this.seeIfLimit();
}


Bullet.prototype.seeIfLimit = function(){
     if(this.sY<=-740){
          this.stop();
          return true;
     }
}

Bullet.prototype.stop = function(){
this.vY=0
this.sY=0;
}


Bullet.prototype.update = function(){
     this.draw();
}


