
var boatImg, sharkIMG;
let sharky;
let shark_alive = true

function preload() {
  boatImg = loadAnimation('sprites/manboat-1.png', 'sprites/manboat-3.png');
  sharkIMG = loadAnimation('sprites/shark-1.png','sprites/shark-2.png');
  }

  function setup() {
    createCanvas(1000, 1000);
    sharky = new Shark(width,0);
  }

  function draw() {
    background(200, 0, 0);
    if (shark_alive == true){
      sharky.drawShark();
    }
    sharky.moveShark();


    //specify the animation instance and inspects x,y position
    //animation() will update the animation frame as well
    animation(boatImg, 350, 250);




  }


  class Shark {
    constructor(x,y){
		this.x = x;
    this.y = y;

	  }
    drawShark(){
      animation(sharkIMG, this.x,this.y);
    }


  moveShark(){
    this.x = this.x-2;
    this.y = this.y+2;
     if(this.y>height){
       this.x=width
       this.y =0
     }
   }
}
