function Bullet(ctx, player) {
    this.ball
    this.ctx = ctx;
    this.x = player.x + 40;
    this.sY = 0;
    this.sX = 10;
    this.y = 750;
    this.vY = 6.5;
    this.yAux=0;
    this.xAux=0;
    this.img = new Image();
    this.img.src = "images/pang2.gif";
}

Bullet.prototype.draw = function (ball) {
    this.ball = ball;
    
        this.img.src = "images/pang2.gif";
        this.sY -= this.vY;
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.drawImage(this.img, 0, 0, 20, this.sY);
        this.ctx.restore();
        this.seeIfLimit();
    
}

Bullet.prototype.seeIfLimit = function () {
    if (this.sY <= -700) {
        return true;
    }
}


Bullet.prototype.update = function (ball) {
    this.draw(ball);
}