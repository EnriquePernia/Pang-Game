window.onload = function () {
     var canvas = document.getElementById("star-pang");
     var ctx = canvas.getContext('2d');
     var ball = new Ball(ctx,500,400,50);
     var b=[];
     b.push(ball);
     var player = new Player(500, 780, ctx,b);
     setInterval(function () {
          ctx.clearRect(0, 0, 1000, 800);
          player.update();
     }, 1)

}