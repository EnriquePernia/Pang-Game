window.onload = function () {
     var canvas = document.getElementById("star-pang");
     var ctx = canvas.getContext('2d');
     var ball = new Ball(ctx, 500, 400, 50);
     var balls = [];
     var bullets = [];
     var counter = 0; 
     balls.push(ball);
     var player = new Player(500, 780, ctx, balls);
     var none = new PowerUp(ctx, "none", player);
     var power = none;
     var powerUps = [ "speed","hacker", "time"];
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
                              player.shoot();
                              bullets.push(new Bullet(ctx, player));
                    }
               }
               document.onkeyup = function (e) {
                    if (e.keyCode == 37 || e.keyCode == 39) {
                         player.vx = 0;
                    }
               }
               //bullet
               for(i=0;i<bullets.length;i++){
                    bullets[i].update(balls[0]);
                    if (bullets[i].seeIfLimit() ) {
                         bullets.splice(i, 1);
                    }
               }
               //player
               player.update(balls,bullets);
               //ball
               for(ill=0;ill<balls.length;ill++){
                     var coll = balls[ill].checkCollisions(bullets)
                    if(coll!=false){
                         console.log(coll[0][0].principio)
                         balls.splice(ill,1);
                         balls.push(coll[0][0])
                         balls.push(coll[0][1])
                         bullets.splice(coll[1],1)
                         balls[ill].update();
                        
                    }    
                    else{
                         balls[ill].update();
                    }
               }
               if(counter==10000){
                    balls[0].generateNewBall(balls);
               }
               if (counter > 2000) {
                    //power = new PowerUp( ctx,powerUps[Math.floor(Math.random() * 3)] ,player)
                    power=new PowerUp( ctx,"hacker",player)
                    counter = 0;
               }
               if(power.update()){
                    player.powerUp=power.name;
                    power=none;
               }
          
          counter++;
     }, 1)

}