//Player.prototype.setListeners = function () {
     //      var that = this;
     //      document.onkeydown = function (e) {
     //           switch (e.keyCode) {
     //                case 37:
     //                     that.vx = -1;
     
     //                     break;
     //                case 39:
     //                     that.vx = 1;
     
     //                     break;
     //                case 32:
     //                     that.shoot();
     //           }
     //      }
     //      document.onkeyup = function (e) {
     //           if (e.keyCode == 37 || e.keyCode == 39) {
     //                that.vx = 0;
     //           }
     //      }
     // }

//Player.Update
     // for (i = 0; i < this.bullets.length; i++) {
     //      this.bullets[i].update();
     //      if (this.bullets[i].seeIfLimit() == true) {
     //           this.bullets.splice(i, 1);
     //      }

     // }

     // for (i = 0; i < this.ball.length; i++) {
     //      if (this.ball[i].principio == true) {
     //           this.ball[i].update();
     //           this.ball[i].principio = false;
     //      } else {
     //           this.ball[i].update();
     //      }
     // }