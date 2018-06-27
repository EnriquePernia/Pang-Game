 function Game(ctx) {
       this.ball = new Ball(ctx, 500, 400, 140);
       this.ctx = ctx;
       this.balls = [];
       this.bullets = [];
       this.counter = 0;
       this.collision;
       this.balls.push(this.ball);
       this.player = new Player(500, 750, this.ctx, this.balls);
       this.none = new PowerUp(this.ctx, "none", this.player);
       this.power = this.none;
       this.powerUps = ["speed", "hacker", "time"];
       this.popCont = 0;
       this.startCont = false;
       this.xAux;
       this.yAux;
       this.platform = new Platform(this.ctx, 500, 500, 100, 50);
       this.platReturn;
 }
 Game.prototype.setListeners = function () {
       this.ctx.clearRect(0, 0, 1000, 800);
      var that = this;
       document.onkeydown = function (e) {
             switch (e.keyCode) {
                   case 37:
                         that.player.vx = -1;
                         break;
                   case 39:
                         that.player.vx = 1;

                         break;
                   case 32:
                         if (that.bullets.length < 3) {
                               that.player.shoot();
                               that.bullets.push(new Bullet(that.ctx, that.player));
                         }
             }
       }
       if (this.platform != 0) {
             if (this.platform.breakPlatform()) {
                   this.platform = 0;
             }
       }
       document.onkeyup = function (e) {
             if (e.keyCode == 37 || e.keyCode == 39) {
                   that.player.vx = 0;
             }
       }


       Game.prototype.bullet = function () {
             for (i = 0; i < this.bullets.length; i++) {
                   this.bullets[i].update(this.balls[0]);
                   if (this.bullets[i].seeIfLimit()) {
                         this.bullets.splice(i, 1);
                   }
             }
       }
       //player
       Game.prototype.player1 = function () {
             this.player.update(this.balls, this.bullets, this.counter);
             if (this.startCont == true) {
                   this.popCont++;
             }
       }
       //ball
       Game.prototype.ball1 = function () {
             for (j = 0; j < this.balls.length; j++) {
                   if (this.collision = this.balls[j].checkCollisions(this.bullets)) {
                         this.startCont = true;
                         this.xAux = this.balls[j].x;
                         this.yAux = this.balls[j].y;

                         if (this.balls[j].waiting == true) {
                               if (this.collision[0].type == "veryLittle") {
                                     this.balls.splice(j, 1);
                                     this.bullets.splice(this.collision[1], 1)
                               } else {
                                     this.balls.splice(j, 1);
                                     this.balls.push(this.collision[0][0])
                                     this.balls.push(this.collision[0][1])
                                     this.balls[this.balls.length - 1].stop();
                                     this.balls[this.balls.length - 2].stop();
                                     this.bullets.splice(this.collision[1], 1)
                               }
                         } else if (this.collision[0].type == "veryLittle") {
                               this.balls.splice(j, 1);
                               this.bullets.splice(this.collision[1], 1)
                         } else {
                               this.balls.splice(j, 1);
                               this.balls.push(this.collision[0][0])
                               this.balls.push(this.collision[0][1])
                               this.bullets.splice(this.collision[1], 1)
                         }
                   }
                   if (this.popCont < 50 && this.startCont == true) {
                         if (this.balls.length == 0) {
                               for (i = 0; i < 1000; i++) {
                                     this.player.drawPop(this.xAux, this.yAux);
                               }
                         } else {
                               this.player.drawPop(this.xAux, this.yAux);
                         }
                   } else {
                         this.popCont = 0;
                         this.startCont = false;
                   }
                   this.balls[j].update();
             }
       }
       Game.prototype.powerUp = function () {
             if (this.power.update()) {
                   this.player.powerUp = this.power.name;
                   this.power = this.none;
             }
             if (this.counter > 3000) {
                   this.power = new PowerUp(this.ctx, this.powerUps[Math.floor(Math.random() * 3)], this.player)
                   this.counter = 0;
             }
             this.counter++;
       }
 }
 Game.prototype.platforms = function () {
       if (this.platform != 0) {
             if (this.platform.update(this.balls, this.bullets) !== false) {
                   this.bullets.splice(this.platReturn, 1);
             }
       }
 }