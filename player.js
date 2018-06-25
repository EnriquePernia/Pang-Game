function Player(x, y, ctx, ball) {
     this.ball = ball;
     this.x = x;
     this.y = y;
     this.sX = 0;
     this.vx = 0;
     this.ctx = ctx;
     this.img = new Image();
     this.img.src = "images/Estrella.png";
     this.setListeners();
     this.bullets = [];
}

Player.prototype.draw = function () {
     this.ctx.save();
     this.ctx.translate(this.x, this.y);
     this.ctx.drawImage(this.img, 0, 0, 80, -80);
     this.ctx.restore();
}


Player.prototype.move = function () {
     if (this.x >= 920) {
          this.x -= 0.1;
     } else if (this.x <= 0) {
          this.x += 0.1;
     } else {
          this.x += this.vx;
     }
}

Player.prototype.setListeners = function () {
     var that = this;
     document.onkeydown = function (e) {
          switch (e.keyCode) {
               case 37:
                    that.vx = -1;
                    break;
               case 39:
                    that.vx = 1;
                    break;
               case 32:
                    that.shoot();
          }
     }
     document.onkeyup = function (e) {
          if (e.keyCode == 37 || e.keyCode == 39) {
               that.vx = 0;
          }
     }
}

// Player.prototype.dead = function(){
//      this.
// }
Player.prototype.shoot = function () {
     this.vx = 0;
     var bullet = new Bullet(this.ctx, this);
     this.bullets.push(bullet);
}

Player.prototype.checkCollisions = function () {
     // for (i = 0; i < this.ball.length; i++) {
     //      if (this.ball[i].x == this.x && this.ball[i].y + 40 == this.y - 80) {
     //           this.vx = 0;
     //      }
     // }
     for (i = 0; i < this.bullets.length; i++) {
          for (j = 0; j < this.ball.length; j++) {
               if (this.bullets[i].x + 10 >= this.ball[j].x - 50 && this.bullets[i].x <= this.ball[j].x + 50) {
                    if (this.ball[j].y >= 720 + this.bullets[i].sY) {
                         this.ball.splice(j, 1);
                         this.bullets.splice(i,1);
                         this.ball.push(new Ball(this.ctx, this.x, this.y, this.radius - 20));
                         this.ball.push(new Ball(this.ctx, this.x, this.y, this.radius - 20))
                         console.log(this.ball)
                    }
               }
          }
     }
     for (i = 0; i < this.ball.length; i++) {
          if (this.x + 70 >= this.ball[i].x - 50 && this.x <= this.ball[i].x + 50) {
               if (this.ball[i].y + 50 >= 700) {
                    this.ball[i].stop();
                    this.vx=0;
               }
          }
     }
}

Player.prototype.update = function () {
     this.draw();
     this.move();
     for (i = 0; i < this.bullets.length; i++) {
          this.bullets[i].update();
          if (this.bullets[i].seeIfLimit() == true) {
               this.bullets.slice(1, i);
          }

     }
     for (i = 0; i < this.ball.length; i++) {
          this.ball[i].update();
     }
     this.checkCollisions();
}