//flappy boat-like
//mouse click or x to flap

var GRAVITY = 0.3;
var FLAP = -7;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var boat, ground;
var pipes;
var gameOver;
var boatImg, pipeImg, groundImg, bgImg;


function setup() {
  createCanvas(400, 600);
push();
scale(.25);
  boatImg = loadImage('sprites/manboat-1.png', 'manboat-2.png', 'manboat-3.png');
pop();
  pipeImg = loadImage('sprites/flappy_pipe.png');
  groundImg = loadImage('sprites/flappy_ground.png');
  bgImg = loadImage('sprites/flappy_bg.png');

  boat = createSprite(width/6, height/6, 10, 10);
  boat.rotateToDirection = true;
  boat.velocity.x = 4;
  boat.setCollider('circle', 0, 0, 20);
  boat.addImage(boatImg);

  ground = createSprite(800/2, GROUND_Y+100); //image 800x200
  ground.addImage(groundImg);

  pipes = new Group();
  gameOver = true;
  updateSprites(false);

  camera.position.y = height/2;
}

function draw() {

  if(gameOver && keyWentDown('x'))
    newGame();

  if(!gameOver) {

    if(keyWentDown('x'))
      boat.velocity.y = FLAP;

    boat.velocity.y += GRAVITY;

    if(boat.position.y<0)
      boat.position.y = 0;

    if(boat.position.y+boat.height/2 > GROUND_Y)
      die();

    if(boat.overlap(pipes))
      die();

    //spawn pipes
    if(frameCount%60 == 0) {
      var pipeH = random(50, 300);
      var pipe = createSprite(boat.position.x + width, GROUND_Y-pipeH/2+1+100, 80, pipeH);
      pipe.addImage(pipeImg);
      pipes.add(pipe);

      //top pipe
      if(pipeH<200) {
        pipeH = height - (height-GROUND_Y)-(pipeH+MIN_OPENING);
        pipe = createSprite(boat.position.x + width, pipeH/2-100, 80, pipeH);
        pipe.mirrorY(-1);
        pipe.addImage(pipeImg);
        pipes.add(pipe);
      }
    }

    //get rid of passed pipes
    for(var i = 0; i<pipes.length; i++)
      if(pipes[i].position.x < boat.position.x-width/2)
        pipes[i].remove();
  }

  camera.position.x = boat.position.x + width/4;

  //wrap ground
  if(camera.position.x > ground.position.x-ground.width+width/2)
    ground.position.x+=ground.width;

  background(247, 134, 131);
  camera.off();
  image(bgImg, 0, GROUND_Y-190);
  camera.on();

  drawSprites(pipes);
  drawSprite(ground);
  drawSprite(boat);
}

function die() {
  updateSprites(false);
  gameOver = true;
}

function newGame() {
  pipes.removeSprites();
  gameOver = false;
  updateSprites(true);
  boat.position.x = width/2;
  boat.position.y = height/2;
  boat.velocity.y = 0;
  ground.position.x = 800/2;
  ground.position.y = GROUND_Y+100;
}

function mousePressed() {
  if(gameOver)
    newGame();
  boat.velocity.y = FLAP;
}
