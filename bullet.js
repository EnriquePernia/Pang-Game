function Bullet(ctx, player) {
    this.ball
    this.ctx = ctx;
    this.x = player.x + 40;
    this.sY = 0;
    this.sX = 10;
    this.y = 800;
    this.vY = 1.5;
    this.hack = false;
    this.img=new Image();
    this.img.src="images/pang2.gif";
}

Bullet.prototype.draw = function (ball) {
    this.ball = ball;
    var tan;
    if (this.hack) {
        console.log('entra')
        var l1 = this.y - ball.y;
        var l2 = ball.x - this.x
        console.log(l1);
        console.log(l2);
         tan = Math.atan((l1 / l2));
         console.log(tan);
        if ((this.x - ball.x) > 0) {
            tan = tan;
        } else {
            tan = -tan;
        }
    }
    
    this.sY -= this.vY;
    this.ctx.save();
    this.ctx.save();
     this.ctx.translate(this.x, this.y);
     this.ctx.drawImage(this.img, 0, 0, 20,this.sY);
    this.ctx.rotate(tan);
    this.ctx.restore();
    this.seeIfLimit();
}


Bullet.prototype.seeIfLimit = function () {
    if (this.sY <= -740) {
        return true;
    }
}


Bullet.prototype.update = function (ball) {
    this.draw(ball);
}