function PowerUp(ctx, name, player) {
     this.y = 200;
     this.player = player;
     this.width = 50;
     this.height = 50;
     this.vy = 4;
     this.ctx = ctx;
     this.name = name

     this.x = this.width + Math.floor(Math.random() * 900 - this.width);
     this.img = new Image();

     if (this.name == "speed") {
          this.img.src = ("images/speed.png")
     } else if (this.name == "hacker") {
          this.img.src = ("images/hackerman.png");

     } else if (this.name == "time") {
          this.img.src = ("images/time.png");
     } else {
          this.img = 0;
          this.x=0
          this.y=0
     }
}

PowerUp.prototype.checkCollisions = function () {
     if (this.x < this.player.x + 70 && this.x + this.width > this.player.x && this.y>690) {
          return true;
     }
}

PowerUp.prototype.draw = function () {
     if (this.img == 0) {
          this.ctx.lineTo(0, 0, 0, 0);
          return false;
     }
     this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

PowerUp.prototype.move = function () {
     if (this.y >= 700) {
          this.vy = 0;
     }
     this.y += this.vy;
}

PowerUp.prototype.update = function () {
     this.draw();
     this.move();
     return this.checkCollisions();
}