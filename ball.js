function Ball(ctx,x,y,radius) {
     this.type="big"
     this.ctx = ctx;
     this.x = x;
     this.y = y;
     this.radius=radius;
     this.sY = 0;
     this.sX = 1;
     this.gravity = 0.01;
     this.bouncePower = -3.6;
     this.balls=[];
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

     this.sY += this.gravity;
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
Ball.prototype.pop = function () {
     this.balls.push(new Ball(this.ctx,this.x,this.y,30))
     this.balls.push(new Ball(this.ctx,this.x,this.y,30))
     this.remove();
}

// Ball.prototype.type = fuction(e){
//      switch e:
//           case "big":
//           break;
//           case "medium":
//           break;
//           case "little":
//           break;
// }

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
     if(this.balls.legth!=0){
          for(i=0;i<this.balls.length;i++){
               this.balls[i].update();
          }
     }
}