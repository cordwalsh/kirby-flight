$(document).ready(function () {
  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
  var cvs = document.getElementById('flappyBird');
  var ctx = cvs.getContext('2d');


  var kirby = new Image();
  var bg = new Image();
  var pipeNorth = new Image();
  var pipeSouth = new Image();
  kirby.src = "./img/kirby.gif";
  bg.src = "./img/bg.png";
  pipeNorth.src = "./img/pipeNorth.png";
  pipeSouth.src = "./img/pipeSouth.png";


  var gap = 85;
  var constant;

  var kX = 50;
  var kY = 150;

  var gravity = 1.75;

  var score = 0;

  var fly = new Audio();
  var scor = new Audio();

  fly.src = "./audio/jump.wav"
  scor.src = "./audio/score.wav"

  document.addEventListener("keydown",moveUp);
  function moveUp() {
    kY -=25;
    fly.play();
  }

  var pipe = [];
  pipe[0] = {
    x : cvs.width,
    y : 0
  };


function draw() {
  ctx.drawImage(bg,0,0);

  for(var i = 0; i < pipe.length; i++){
    constant = pipeNorth.height+gap;
    ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
    ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

    pipe[i].x --;

    if(pipe[i].x == 350 ){
      pipe.push({
        x : cvs.width,
        y : Math.floor(Math.random()*pipeNorth.height)-
        pipeNorth.height
      });
    }

    if( kX + kirby.width >= pipe[i].x && kX <= pipe[i].x + pipeNorth.width && (kY <= pipe[i].y + pipeNorth.height || kY+kirby.height >= pipe[i].y+constant )){
        location.reload();
    }

    if(pipe[i].x == 5) {
      score ++;
      scor.play();
    }


  }
  ctx.drawImage(kirby,kX,kY);

  kY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : "+score,10,cvs.height-20);

  requestAnimationFrame(draw);

}

draw();


});
