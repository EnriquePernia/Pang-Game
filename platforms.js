
function Platform(ctx,x1,y1,x2){
     this.ctx=ctx;
     this.x=x;
     this.y=y;
     this.x2=x2
}

Platform.prototype.draw = function(){
     this.ctx.save();
     this.ctx.fillRect(this.x,this.y,this.x,10);
     //this.ctx.drawImage(this.img, -10, 0, 10, 0);
     this.ctx.restore();
}