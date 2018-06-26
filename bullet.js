
function Bullet(ctx,player){
     this.ctx=ctx;
     this.x=player.x+40;
     this.sY=0;
     this.sX=10;
     this.y=800;
     this.vY=1.5;
     this.hack=0;
}

Bullet.prototype.draw= function(){
     this.sY-=this.vY;
     this.ctx.save();
     if(this.hack!=0){
         this.ctx.translate(this.x,this.y);
        this.ctx.rotate(20*Math.PI/180);
     }
     console.log(this.x)
     this.ctx.save();
     this.ctx.fillRect(this.x,this.y,this.sX,this.sY);
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


