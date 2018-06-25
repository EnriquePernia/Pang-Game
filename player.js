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
     if (this.ball.x == this.x && this.ball.y + 40 == this.y - 80) {
          this.vx = 0;
     }
     for (i = 0; i < this.bullets.length; i++) {
          if (this.bullets[i].x + 10 >= this.ball.x - 50 && this.bullets[i].x <= this.ball.x + 50) {
               if (this.ball.y >= 720 + this.bullets[i].sY) {
                    this.ball.pop();
                    this.bullets[i].stop();
               }
          }
     }
     if (this.x + 70 >= this.ball.x - 50 && this.x <= this.ball.x + 50) {
          if (this.ball.y+50>= 700) {
               this.ball.stop();
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
     this.checkCollisions();
}