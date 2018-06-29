function Ball(ctx, x, y, radius,type) {
    this.type = type;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sY = 0;
    this.sX = 1;
    this.gravity = 0.05;
    this.bouncePower = -3.2;
    this.principio = true;
    this.jumpy = -1.7;
    this.img = new Image();
    this.img.src = "images/redBall.png"
    this.img2 = new Image();
    this.img2.src = "images/soapBubble.png"
    this.auxX;
    this.auxY;
    this.waiting = false;
    this.hack = false;
    this.pop=false;
}

Ball.prototype.draw = function () {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    if (this.hack) {
        this.ctx.drawImage(this.img2, 0, 0, this.radius, this.radius);
         } 
         else {
         this.ctx.drawImage(this.img, 0, 0, this.radius, this.radius);
    }
    this.ctx.restore();
}
Ball.prototype.speedY = function () {

    if (this.principio == true) {
        this.sY += this.gravity + this.jumpy;
    } else if (this.waiting == false) {
        this.sY += this.gravity + (800 - this.y) * 0.00007;
    }

    this.y += 4.2*this.sY;
}

Ball.prototype.changeX = function () {
    this.sX *= -1;
}
Ball.prototype.speedX = function () {
    this.x += 4.2*this.sX;
}

Ball.prototype.bounce = function () {
    this.sY = this.bouncePower;
}
Ball.prototype.bounceBack = function () {
    this.sY = -this.bouncePower+0.3;
}

Ball.prototype.remove = function () {
    this.x = 0;
    this.y = 0
    this.sY = 0;
    this.sX = 0;
}

Ball.prototype.stop = function () {
    this.waiting = true;
}

Ball.prototype.move = function () {
    this.waiting = false;
}

Ball.prototype.popBig = function () {
    var pop = []
    pop.push(new Ball(this.ctx, this.x, this.y, this.radius - 25, "medium"));
    pop.push(new Ball(this.ctx, this.x, this.y, this.radius - 25, "medium"));
    pop[0].sX = this.sX;
    pop[1].sX = -this.sX;
    pop[0].gravity = this.gravity+0.01;
    pop[1].gravity = this.gravity+0.01;
    return pop;
}

Ball.prototype.popMedium = function () {
    var pop = [];
    pop.push(new Ball(this.ctx, this.x, this.y, this.radius - 39,"little"));
    pop.push(new Ball(this.ctx, this.x, this.y, this.radius - 39,"little"));
    pop[0].sX = this.sX;
    pop[1].sX = -this.sX;
    pop[0].gravity = this.gravity+0.01;
    pop[1].gravity = this.gravity+0.01;
    return pop
}

Ball.prototype.popLittle = function () {
    var pop = [];
    pop.push(new Ball(this.ctx, this.x, this.y, this.radius - 49,"veryLittle"));
    pop.push(new Ball(this.ctx, this.x, this.y, this.radius - 49,"veryLittle"));
    pop[0].sX = this.sX;
    pop[1].sX = -this.sX;
    pop[0].gravity = this.gravity+0.016;
    pop[1].gravity = this.gravity+0.016;
    return pop
}

Ball.prototype.checkCollisions = function (bullets) {
    if (bullets != undefined && bullets.length > 0) {
        for (i = 0; i < bullets.length; i++) {
            if (bullets[i].x + 10 >= this.x && bullets[i].x <= this.x + this.radius) {
                if (this.y + this.radius >= 750 + bullets[i].sY) {
                    if (this.type == "big") {
                        var p = this.popBig();
                        return [p, i]
                    } else if (this.type == "medium") {
                        var p = this.popMedium();
                        return [p, i]
                    } else if (this.type == "little") {
                        var p = this.popLittle();
                        return [p, i]
                    } else {
                        return [this, i];
                    }

                }
            }
        }
    }
    return false;
}


Ball.prototype.update = function () {
    //this.ctx.clearRect(0,0,1000,800);
    this.draw();
    if (!this.waiting) {
        if (this.y >= 760 - this.radius) {
            this.bounce();
        }
        if (this.x >= 1000 - this.radius - 30 || this.x <= 20) {
            this.changeX();
        }
        if (this.y <= 20) {
            this.y += 3;
        }
        this.speedY();
        this.speedX();
        if (this.principio == true) {
            this.principio = false;
        }
    }
}