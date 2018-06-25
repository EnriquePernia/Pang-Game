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
     this.powerUp;
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

Player.prototype.delete = function (ballPos, bulletPos) {
     this.ball.splice(ballPos, 1);
     this.bullets.splice(bulletPos, 1);
}

Player.prototype.checkCollisions = function () {
     if (this.bullets.length > 0) {
          for (i = 0; i < this.bullets.length; i++) {
               for (j = 0; j < this.ball.length; j++) {
                    if (this.bullets[i].x + 10 >= this.ball[j].x - this.ball[j].radius && this.bullets[i].x <= this.ball[j].x + this.ball[j].radius) {
                         if (this.ball[j].y >= 720 + this.bullets[i].sY) {
                              if (this.ball[j].type == "big") {
                                   var p = this.ball[j].popBig();
                                   this.ball.push(p[0]);
                                   this.ball.push(p[1]);
                              } else if (this.ball[j].type == "medium") {
                                   var p = this.ball[j].popMedium();
                                   this.ball.push(p[0]);
                                   this.ball.push(p[1]);
                              } else if (this.ball[j].type == "little") {
                                   var p = this.ball[j].popLittle();
                                   this.ball.push(p[0]);
                                   this.ball.push(p[1]);
                              }
                              this.delete(j, i);
                         }
                    }
               }
          }
     }

     for (i = 0; i < this.ball.length; i++) {
          if (this.x + 70 >= this.ball[i].x - this.ball[i].radius && this.x <= this.ball[i].x + this.ball[i].radius) {
               if (this.ball[i].y + this.ball[i].radius >= 700) {
                    this.loose();
                    this.ball.splice(i,1);
                    this.vx = 0;
               }
          }
     }
}

Player.prototype.checkPowerUp = function(){
     
}

Player.prototype.loose = function(){
     alert("Perdiste")
     location.reload();
}

Player.prototype.update = function () {
     this.draw();
     this.move();
     for (i = 0; i < this.bullets.length; i++) {
          this.bullets[i].update();
          if (this.bullets[i].seeIfLimit() == true) {
               this.bullets.splice(i, 1);
          }

     }

     for (i = 0; i < this.ball.length; i++) {
          if(this.ball[i].principio==true){
               this.ball[i].update();
               this.ball[i].principio=false;
          }
          else{
               this.ball[i].update();
          }
     }
     this.checkCollisions();
}