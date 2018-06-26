function Player(x, y, ctx) {
     this.x = x;
     this.y = y;
     this.sX = 0;
     this.vx = 0;
     this.ctx = ctx;
     this.img = new Image();
     this.img.src = "images/espera.png";
     this.img.frames = 2;
     this.img.frameIndex = 0;
     this.powerUp;
     this.framesCounter = 0;
     this.speed = false;
}

Player.prototype.draw = function () {
     this.framesCounter++;
     this.ctx.drawImage(
          this.img,
          this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
          0,
          Math.floor(this.img.width / this.img.frames),
          40,
          this.x,
          this.y,
          70, -70
     );
     this.animateImg();
}

Player.prototype.animateImg = function () {
     if (this.framesCounter % 40 === 0) {
          this.img.frameIndex += 1;

          if (this.img.frameIndex > 1) this.img.frameIndex = 0;
     }
};


Player.prototype.move = function () {
     if (this.x >= 905) {
          this.x -= 0.1;
     } else if (this.x <= 15) {
          this.x += 0.1;
     } else {
          if (this.powerUp == "speed") {
               this.x += this.vx * 2;
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
     return true;
}

Player.prototype.delete = function (ballPos, bulletPos) {
     this.ball.splice(ballPos, 1);
     this.bullets.splice(bulletPos, 1);
}

Player.prototype.checkCollisions = function (ball) {
     for (i = 0; i < ball.length; i++) {
          if (ball[i].hack == false) {
               if (this.x + 70 >= ball[i].x + 20 && this.x <= ball[i].x + ball[i].radius) {
                    if (ball[i].y + ball[i].radius - 20 >= 700) {
                         this.loose();
                         this.vx = 0;
                    }
               }
          }
     }
}

Player.prototype.spriteMove = function () {
     if (this.vx == -1) {
          this.img.src = "images/left.png"
          this.img.frames = 4;
     } else if (this.vx == 1) {
          this.img.src = "images/rigth.png"
          this.img.frames = 4;
     } else if (this.shoot()) {
          this.img.src = "images/espera.png"
          this.img.frames = 2;
     }
}

Player.prototype.checkPowerUp = function (ball) {
     var that = this;
     switch (this.powerUp) {
          case "speed":
               setTimeout(function () {
                    that.powerUp = 0
               }, 7000);
               break;
          case "hacker":
               if (ball.length > 0) {
                    for (i = 0; i < ball.length; i++) {
                         ball[i].hack = true;
                    }
               }
               setTimeout(function () {
                    console.log("idhfkjghasdghjf")
                    for (i = 0; i < ball.length; i++) {
                         ball[i].hack = false;
                    }
                    that.powerUp = 0
               }, 4000);
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
               }, 4000)

               break;
     }
}

Player.prototype.loose = function () {
     location.reload();
}

Player.prototype.update = function (ball) {
     this.draw();
     this.move();
     this.spriteMove();
     this.checkPowerUp(ball);
     this.checkCollisions(ball);
     console.log(this.powerUp);
}