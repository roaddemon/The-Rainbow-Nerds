var canvas = document.getElementById("canvas");
var cx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 700;

var img_player = new Image();
img_player.src = "hero.jpg";

var w = 50;
var h = 50;
var x = 0;
var y = 0;
var xsp = 1;
var ysp = 0;

var keys = [];
var gravity = 5;

var platforms = [];
platforms.push({x: 300, y: 100, w: 100, h: 10})
platforms.push({x: 400, y: 200, w: 100, h: 10})
platforms.push({x: 500, y: 700, w: 100, h: 10})
platforms.push({x: 200, y: 400, w: 100, h: 10})
platforms.push({x: 100, y: 500, w: 100, h: 10})
platforms.push({x: 0, y: 100, w: 100, h: 10})
platforms.push({x: 0, y: 100, w: 100, h: 10})

var img_monster = new Image();
img_monster.src = "Evil.jpg";//monster
var xm = 500;
var ym = 500;
var wm = 75;
var hm = 75;
var xmsp = -5;
var ymsp = -5; 

//Functions

document.addEventListener("keydown", function(event){
 keys[event.keyCode] = true;
 event.preventDefault();
});

document.addEventListener("keyup", function(event){
 keys[event.keyCode] = false;
});

function setDirection(){
  if (keys[38] && gravity == 0) { y = y - 100; }//up arrow
  if (keys[37] && x >= 0) {xsp = -5;}//left arrow
  else if (keys[39] && x+w <= canvas.width) {xsp = 5;}//right arrow
  else {xsp = 0; ysp = 0;}
}

function platform() {
  cx.fillStyle = "yellow";//platform is yellow
  gravity = 5;
  platforms.forEach(function(plat){
    cx.fillRect(plat.x, plat.y, plat.w, plat.h);
    if ((x >= plat.x && x <= plat.x + plat.w) && (y+h == plat.y) ){ 
      gravity = 0;
    }
  });
}

function lava() {
  cx.fillStyle = "orange";
  cx.fillRect(0, canvas.height-50, canvas.width, 50)
  //console.log(y+h);
  if (y+h == canvas.height-50) { 
    gravity = 0;
    img_player.src = "death.png"
  }
}

function monster() {
  cx.drawImage(img_monster, xm, ym, wm, hm);
  xm += xmsp;
  ym += ymsp;
  if(xm < 0 || xm+wm > canvas.width) {xmsp = -xmsp;}
  if(ym < 0 || ym+hm > canvas.height) {ymsp = -ymsp;}
}

function animate() {
 requestAnimationFrame(animate);
 cx.clearRect(0, 0, canvas.width, canvas.height);
 cx.drawImage(img_player, x, y, w, h);
 x += xsp;
 y += ysp + gravity;
 setDirection();
 platform();
 lava();
 monster();
}

animate();