window.onload = function () {
     var canvas = document.getElementById("star-pang");
     var ctx = canvas.getContext('2d');
     var ball = new Ball(ctx, 500, 400, 140);
     var balls = [];
     var bullets = [];
     var counter = 0;
     var collision;
     balls.push(ball);
     var player = new Player(500, 750, ctx, balls);
     var none=new PowerUp( ctx, "none",player);
     var power = none;
     var powerUps = ["speed", "hacker", "time"];
     setInterval(function () {
          ctx.clearRect(0, 0, 1000, 800);

          document.onkeydown = function (e) {
               switch (e.keyCode) {
                    case 37:
                         player.vx = -1;
                         break;
                    case 39:
                         player.vx = 1;

                         break;
                    case 32:
                         if (bullets.length < 3) {
                              player.shoot();
                              bullets.push(new Bullet(ctx, player));
                         }
               }
          }
          document.onkeyup = function (e) {
               if (e.keyCode == 37 || e.keyCode == 39) {
                    player.vx = 0;
               }
          }
          //bullet
          for (i = 0; i < bullets.length; i++) {
               bullets[i].update(balls[0]);
               if (bullets[i].seeIfLimit()) {
                    bullets.splice(i, 1);
               }
          }
          //player
          player.update(balls);
          //ball
          for (j = 0; j < balls.length; j++) {
               if (collision = balls[j].checkCollisions(bullets)) {
                    if(balls[j].waiting==true){
                         if (collision[0].type == "veryLittle") {
                              balls.splice(j, 1);
                              bullets.splice(collision[1], 1)
                         }
                         else{
                         balls.splice(j, 1);
                         balls.push(collision[0][0])
                         balls.push(collision[0][1])
                         balls[balls.length-1].stop();
                         balls[balls.length-2].stop();
                         bullets.splice(collision[1], 1)
                         }
                    }
                    else if (collision[0].type == "veryLittle") {
                         balls.splice(j, 1);
                         bullets.splice(collision[1], 1)
                    } else {
                         balls.splice(j, 1);
                         balls.push(collision[0][0])
                         balls.push(collision[0][1])
                         bullets.splice(collision[1], 1)
                    }
               }
               balls[j].update();
          }
         if(power.update()){
          player.powerUp = power.name;
          power=none;
         }
          if (counter > 3000) {
               power = new PowerUp(ctx, powerUps[Math.floor(Math.random() * 3)], player)
               counter = 0;
          }
          counter++;
     }, 1)

}