
window.onload = function () {
var canvas = document.getElementById("star-pang");
var ctx = canvas.getContext('2d');
var game = new Game(ctx);

setInterval(function(){
     game.setListeners();
     game.bullet();
     game.player1();
     game.ball1();
     game.powerUp();
     game.platforms();
},1);
}