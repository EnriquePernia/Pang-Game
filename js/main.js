
window.onload = function () {
var canvas = document.getElementById("star-pang");
var ctx = canvas.getContext('2d');
var game = new Game(ctx);

// var prevTime=0;
function main(time){
     // deltaTime=time-prevTime;
     // prevTime=time;
     game.setListeners();
     game.bullet();
     game.player1();
     game.ball1();
     game.powerUp();
     game.platforms();
     window.requestAnimationFrame(main)
}

window.requestAnimationFrame(main)
}
