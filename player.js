function Player(x, y, ctx) {
     this.x = x;
     this.y = y;
     this.sX = 0;
     this.vx = 0;
     this.ctx = ctx;
     this.img = new Image();
     this.img.src = "images/Estrella.png";
     this.powerUp;
}

Player.prototype.draw = function () {
     this.ctx.save();
     this.ctx.translate(this.x, this.y);
     this.ctx.drawImage(this.img, 0, 0, 80, -80);
     this.ctx.restore();
}


Player.prototype.move = function (speed) {
     if (this.x >= 920) {
          this.x -= 0.1;
     } else if (this.x <= 0) {
          this.x += 0.1;
     } else {
          if (speed != undefined) {
               this.x += this.vx * speed;
          } else {
               this.x += this.vx
          }
     }
}


// Player.prototype.dead = function(){
//      this.
// }
Player.prototype.shoot = function () {
     this.vx = 0;
}

Player.prototype.delete = function (ballPos, bulletPos) {
     this.ball.splice(ballPos, 1);
     this.bullets.splice(bulletPos, 1);
}

Player.prototype.checkCollisions = function (ball) {
     for (i = 0; i < ball.length; i++) {
          if (this.x + 70 >= ball[i].x - ball[i].radius && this.x <= ball[i].x + ball[i].radius) {
               if (ball[i].y + ball[i].radius >= 700) {
                    this.loose();
                    this.vx = 0;
               }
          }
     }
}

Player.prototype.checkPowerUp = function (ball, bullet) {
     console.log(this.powerUp)
     var that = this;
     switch (this.powerUp) {
          case "speed":
               this.move();
               setTimeout(function () {
                    that.powerUp = 0;
               }, 5000)
               break;
          case "hacker":
               var min = 10000;
               var index;
               var l1;
               var l2;
               var tan;
               for (i = 0; i < ball.length; i++) {
                    if (ball[i].x - that.x + ball[i].y - this.y < min) {
                         min = ball[i].x - that.x + ball[i].y - this.y;
                         index = i;
                    }
               }
               for (i = 0; i < bullet.length; i++) {
                    l1 = bullet[i].y - ball[index];
                    l2 = ball[index].x - bullet[i].x
                    tan = Math.atan(l1 / l2);

                    if ((bullet.x - ball[index].x) > 0) {
                         bullet[i].hack = tan;
                    }
                    else{
                         bullet[i].hack = -tan;
                    }
               }

               break;
          case "time":
               for (i = 0; i < ball.length; i++) {
                    ball[i].stop();
               }
               setTimeout(function () {
                    for (i = 0; i < ball.length; i++) {
                         ball[i].move();
                    }
                    that.powerUp = 0;
               }, 2000)

               break;
     }
}

Player.prototype.loose = function () {
     location.reload();
}

Player.prototype.update = function (ball, bullet) {
     this.draw();
     this.move();
     this.checkPowerUp(ball, bullet);
     this.checkCollisions(ball);
}