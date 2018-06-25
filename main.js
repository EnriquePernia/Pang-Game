window.onload = function () {
     var canvas = document.getElementById("star-pang");
     var ctx = canvas.getContext('2d');
     var ball = new Ball(ctx,500,400,50);
     var b=[];
     var counter=0;
     b.push(ball);
     var player = new Player(500, 780, ctx,b);
     var none= new powerUp(ctx,"none",player);
     var power= none;
     var powerUps = [new powerUp(ctx,"speed",player), new powerUp(ctx,"hacker",player), new powerUp(ctx,"time",player)];
          setInterval(function () {
          ctx.clearRect(0, 0, 1000, 800);
          player.update();
           if(counter>5500){
               power=powerUps[Math.floor(Math.random()*3)]
               counter=0;
           }
           if(power.update()){
                player.powerUp=power.name;
                power=none;
           }
          counter++;
           }, 1)

}