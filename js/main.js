
window.onload = function () {
     //debugger
var canvas = document.getElementById("star-pang");
var ctx = canvas.getContext('2d');
var game = new Game(ctx);
game.makeMap(0);
// var prevTime=0;
function main(time){
     // deltaTime=time-prevTime;
     // prevTime=time;
     game.clear();
     game.setListeners();
     game.bullet();
     game.player1();
     game.ball1();
     game.powerUp();
     game.platforms();
     game.win();
     window.requestAnimationFrame(main)
}

window.requestAnimationFrame(main)
}
