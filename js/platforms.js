function Platform(ctx, x, y, x2, y2, crazy) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.x2 = x2
    this.y2 = y2
    this.sX = 0.9;
    this.img = new Image();
    this.img.src = "images/fragilePlatform.png"
    this.counter = 0;
    this.info = [];
    this.crazy = crazy;
    // this.img2 = new Image();
    // this. img2.src="images/fragilePlatform.png"
}

Platform.prototype.draw = function () {
    this.ctx.save();
    this.ctx.drawImage(this.img, this.x, this.y, this.x2, this.y2);
    this.ctx.restore();
}

Platform.prototype.checkCollision = function (ball, bullet, player) {
    for (i = 0; i < ball.length; i++) {
        if (ball[i].type == "medium" || ball[i].type == "little" || ball[i].type == "big") {
            if (ball[i].x + ball[i].radius <= this.x && ball[i].x + ball[i].radius > this.x + this.x2 && ball[i].y + ball[i].radius > this.y + this.y2 - 20 && ball[i].y > this.y - 10) { //izq
                ball[i].changeX();
            } else if (ball[i].x <= this.x + this.x2 && ball[i].x + ball[i].radius >= this.x && ball[i].y + ball[i].radius > this.y + this.y2 && ball[i].y < this.y) { //dcha
                ball[i].changeX();
            }
        } else {
            if (ball[i].x <= this.x && ball[i].x + ball[i].radius >= this.x + this.x2 && ball[i].y + ball[i].radius < this.y + this.y2 && ball[i].y > this.y) {
                ball[i].changeX();
            } else if (ball[i].x < this.x && ball[i].x + ball[i].radius >= this.x && ball[i].y + ball[i].radius < this.y + this.y2 && ball[i].y > this.y) {
                ball[i].changeX();
            }
        }
        if (ball[i].type == "medium" || ball[i].type == "little" || ball[i].type == "veryLittle") {
            if (this.x + this.x2 >= ball[i].x + 20 && this.x <= ball[i].x + ball[i].radius) {
                if (ball[i].y + ball[i].radius - 20 >= this.y && ball[i].y < this.y) {
                    ball[i].bounce();
                } else if (ball[i].y <= this.y + this.y2 && ball[i].y + ball[i].radius > this.y + this.y2) {
                    ball[i].bounceBack();
                }
            }
        } else {
            if (this.x + this.x2 >= ball[i].x && this.x <= ball[i].x + ball[i].radius - 25) {
                if (ball[i].y + ball[i].radius - 20 >= this.y && ball[i].y < this.y) {
                    ball[i].bounce();
                } else if (ball[i].y <= this.y + this.y2 && ball[i].y + ball[i].radius > this.y + this.y2) {
                    ball[i].bounceBack();
                }
            }
        }
    }
    if (this.y > 660) {
        if (this.x >= player.x + 40) { //Player
            player.stop();
            player.x -= 0.5;
        } else if (this.x + this.x2 >= player.x) {
            player.stop();
            player.x += 0.5;
        } //Bullets
    }
    if (bullet != undefined && bullet.length > 0) {
        for (i = 0; i < bullet.length; i++) {
            if (bullet[i].x + 10 >= this.x && bullet[i].x <= this.x + this.x2) {
                if (this.y + this.y2 >= 750 + bullet[i].sY) {
                    this.counter++;
                    return i;
                }
            }
        }
    }
    return false;
}

Platform.prototype.getCrazy = function () {
    this.changeX();
}

Platform.prototype.changeX = function () {
    this.sX*=-1;
}

Platform.prototype.move = function () {
    this.x += this.sX;
}


Platform.prototype.breakPlatform = function () {
    if (this.counter == 3) {
        return true
    }
    return false;
}



Platform.prototype.update = function (ball, bullet, player) {
    this.draw();
    if (this.crazy = true) {
        this.move();
        if (this.x < 100 || this.x + this.x2 >700) {
        this.getCrazy();
    }
}
    return this.checkCollision(ball, bullet, player);
}