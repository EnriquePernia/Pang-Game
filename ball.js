function Ball(ctx,x,y,radius) {
     this.type="big"
     this.ctx = ctx;
     this.x = x;
     this.y = y;
     this.radius=radius;
     this.sY = 0;
     this.sX = 1;
     this.gravity = 0.01;
     this.bouncePower = -3.5;
     this.principio=true;
     this.jumpy=-1.5;
}

Ball.prototype.draw = function () {
     this.ctx.save();
     this.ctx.translate(this.x, this.y);
     this.ctx.beginPath();
     this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
     this.ctx.closePath();
     this.ctx.fillStyle = this.color;
     this.ctx.fill();
     this.ctx.restore();
}
Ball.prototype.speedY = function () {
     
     if(this.principio==true){
      this.sY += this.gravity +this.jumpy ;
      }
      else{
          this.sY += this.gravity ;
      }
     
     this.y += this.sY;
}

Ball.prototype.changeX = function () {
     this.sX *= -1;
}
Ball.prototype.speedX = function () {
     this.x += this.sX;
}

Ball.prototype.bounce = function () {
     this.sY = this.bouncePower;
}

Ball.prototype.remove = function () {
     this.x = 0;
     this.y = 0
     this.sY = 0;
     this.sX = 0;
}

Ball.prototype.stop = function(){
     this.sX=0
     this.sY=0;
     this.gravity=0;
}

Ball.prototype.move = function(){
     this.sX = 1;
     this.gravity = 0.01;
}

Ball.prototype.popBig = function(){
     var pop=[]
     pop.push(new Ball(this.ctx,this.x,this.y,this.radius-15));
     pop.push(new Ball(this.ctx,this.x,this.y,this.radius-15));
     pop[0].sX=this.sX;
     pop[1].sX=-this.sX;
     pop[0].gravity=0.015;
     pop[1].gravity=0.015;
     pop[0].type="medium";
     pop[1].type="medium";
     return pop;     
}

Ball.prototype.popMedium = function(){
     var pop=[];
     pop.push(new Ball(this.ctx,this.x,this.y,this.radius-15));
     pop.push(new Ball(this.ctx,this.x,this.y,this.radius-15));
     pop[0].sX=this.sX;
     pop[1].sX=-this.sX;
     pop[0].gravity=0.02;
     pop[1].gravity=0.02;
     pop[0].type="little";
     pop[1].type="little";
     return pop
}

Ball.prototype.popLittle = function(){
     var pop=[];
     pop.push(new Ball(this.ctx,this.x,this.y,this.radius-10));
     pop.push(new Ball(this.ctx,this.x,this.y,this.radius-10));
     pop[0].sX=this.sX;
     pop[1].sX=-this.sX;
     pop[0].gravity=0.028;
     pop[1].gravity=0.028;
     pop[0].type="veryLittle";
     pop[1].type="veryLittle";
     return pop
}

Ball.prototype.checkCollisions = function(bullets){
    if (bullets!=undefined && bullets.length > 0) {
        for (i = 0; i < bullets.length; i++) {
                  if (bullets[i].x + 10 >= this.x - this.radius && bullets[i].x <= this.x + this.radius) {
                       if (this.y >= 720 + bullets[i].sY) {
                            if (this.type == "big") {
                                 var p = this.popBig();
                                return [p,i]
                            } else if (this.type == "medium") {
                                 var p = this.popMedium();
                                 return [p,i]
                            } else if (this.type == "little") {
                                 var p = this.popLittle();
                                return [p,i]
                            }
                            return [this,i];
                            
                       }
                  }
             }
        }
        return false;
   }


Ball.prototype.update = function () {
     //this.ctx.clearRect(0,0,1000,800);
     this.draw();
     if (this.y >= 730) {
          this.bounce();
     }
     if (this.x >= 950 || this.x <= 50) {
          this.changeX();
     }
     this.speedY();
     this.speedX();
      if (this.principio == true) {
             this.principio = false;
   }
}