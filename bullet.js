
function Bullet(ctx,player){
     this.ctx=ctx;
     this.x=player.x+40;
     this.sY=0;
     this.sX=10;
     this.y=player.y-80;
     this.vY=1.5;
}

Bullet.prototype.draw= function(){
     this.sY-=this.vY;
     this.ctx.save();
     this.ctx.fillRect(this.x,this.y,this.sX,this.sY);
     //this.ctx.drawImage(this.img, -10, 0, 10, 0);
     this.ctx.restore();
    this.seeIfLimit();
}


Bullet.prototype.seeIfLimit = function(){
     if(this.sY<=-740){
          return true;
     }
}


Bullet.prototype.update = function(){
     this.draw();
}


