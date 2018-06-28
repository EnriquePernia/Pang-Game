 function Game(ctx) {
       this.ctx = ctx;
       this.balls = [];
       this.bullets = [];
       this.counter = 0;
       this.collision;
       this.player = new Player(500, 750, this.ctx, this.balls);
       this.none = new PowerUp(this.ctx, "none", this.player);
       this.power = this.none;
       this.powerUps = ["speed", "hacker", "time"];
       this.popCont = 0;
       this.startCont = false;
       this.xAux;
       this.yAux;
       this.platformsArray = [];
       this.platReturn;
       this.level = 0;
       this.keyboard = new Keyboard();
       this.audio1 = new Audio("./sound/musicaPastillera.mp3");
       this.audio2 = new Audio("./sound/win.mp3");
       this.next = false;
       this.change = false;
 }

 Game.prototype.clear = function () {
       this.ctx.clearRect(0, 0, 1000, 800);
 }
 Game.prototype.setListeners = function () {
       document.onkeydown = function (e) {
             console.log(e.keyCode)
             switch (e.keyCode) {
                   case this.keyboard.keyLeft:
                         this.player.moveLeft();
                         break;
                   case this.keyboard.keyRight:
                         this.player.moveRight();
                         break;
                   case this.keyboard.spaceBar:
                         if (this.bullets.length < 3) {
                               this.player.shoot();
                               this.bullets.push(new Bullet(this.ctx, this.player));
                         }
                         break;
                   case this.keyboard.keyEnter:
                         if (this.player.loose == true) {
                               location.reload();
                         } else if (this.next == true) {
                               this.selectLevel();
                               this.next = false;
                               this.audio2.pause();
                         }
                         break;
             }
       
 }.bind(this)
 if (this.platformsArray.length > 0) {
       for (let i = 0; i < this.platformsArray.length; i++) {
             if (this.platformsArray[i].breakPlatform()) {
                   this.platformsArray.splice(i, 1);
             }
       }
 }
 document.onkeyup = function (e) {
       if (e.keyCode == 37 || e.keyCode == 39) {
             this.player.stop();
       }
 }.bind(this)


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
             if (this.popCont < 15 && this.startCont == true) {
                   if (this.balls.length == 0) {
                         this.player.drawPop(this.xAux, this.yAux);
                   } else {
                         this.player.drawPop(this.xAux, this.yAux);
                   }

             } else {
                   this.popCont = 0;
                   this.startCont = false;
             }
             if (this.balls[j] != undefined) {
                   this.balls[j].update();
             }
       }
 }
 Game.prototype.powerUp = function () {
       if (this.power.update()) {
             this.player.powerUp = this.power.name;
             this.power = this.none;
       }
       if (this.counter > 800) {
             this.power = new PowerUp(this.ctx, this.powerUps[Math.floor(Math.random() * 3)], this.player)
             this.counter = 0;
       }
       this.counter++;
 }
 }

 Game.prototype.platforms = function () {
       for (let i = 0; i < this.platformsArray.length; i++) {
             if (this.platformsArray.length > 0) {
                   if (this.platformsArray[i].update(this.balls, this.bullets, this.player) !== false) {
                         this.bullets.splice(this.platReturn, 1);
                   }
             }
       }
 }

 Game.prototype.makeMap = function (num) {
       this.audio1.play();
       if (num == 0) {
             this.platformsArray = [];
             this.balls = [];
             this.balls.push(new Ball(this.ctx, 500, 400, 140, "big"));
       }
       if (num == 1) {
            this.platformsArray = [];
            this.balls = [];
            this.player.x = 500;
            this.balls.push(new Ball(this.ctx, 500, 400, 140, "big"), new Ball(this.ctx, 120, 100, 115, "medium"), new Ball(this.ctx, 600, 300, 90, "little"))
            this.platformsArray.push(new Platform(this.ctx, 120, 350, 150, 40, true), new Platform(this.ctx, 700, 450, 150, 40, true));
             
       } else if (num == 2) {
            this.platformsArray = [];
            this.balls = [];
            this.player.x = 500;
            this.platformsArray.push(new Platform(this.ctx, 40, 680, 150, 40), new Platform(this.ctx, 250, 580, 150, 40), new Platform(this.ctx, 460, 480, 150, 40), new Platform(this.ctx, 680, 380, 150, 40));
            this.balls.push(new Ball(this.ctx, 500, 400, 140, "big"), new Ball(this.ctx, 120, 100, 115, "medium"))
       }
 }

 Game.prototype.selectLevel = function () {
       if (this.balls.length == 0) {
             this.level++;
             this.nextScreen()
             return this.makeMap(this.level);
       }
 }

 Game.prototype.win = function () {
       if (this.player.loose == true) {
             for (let i = 0; i < this.balls.length; i++) {
                   this.balls[i].stop();
             }
             this.player.stop();
             this.nextScreen();
       } else if (this.balls.length <= 0) {
             this.player.stop();
             this.next = true;
             this.nextScreen();
       }
 }

 Game.prototype.nextScreen = function () {
       this.ctx.clearRect(0, 0, 1000, 1000)
       this.ctx.font = "bold 30px white homestead  "
       this.ctx.fillStyle = 'white';
       console.log(this.player.loose)
       if (this.player.loose == true) {
             this.audio1.pause();
             this.ctx.fillText("TRY AGAIN ", 350, 400);
       } else if (this.next == true) {
             this.audio1.pause();
             this.audio2.play();
             this.ctx.fillText("PRESS ENTER TO PLAY NEXT LEVEL ", 250, 300);
       }
 }