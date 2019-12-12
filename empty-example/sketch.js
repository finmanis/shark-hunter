let spear;
let spearX;
let spearY;
let dead = false;

var boatImg, sharkIMG;
let sharky;

function preload() {
  boatImg = loadAnimation('manboat-1.png', 'manboat-3.png');
  sharkIMG = loadAnimation('shark-1.png','shark-2.png');
  }

  function setup() {
    createCanvas(1000, 1000);
    sharky = new Shark(width,0);
    spear = new Spear(240,85,100,100,50,"brown", false);
  }

  function draw() {
    background(200, 255, 255);

    if (spear.x<sharky.x+100){
      if(spear.x>sharky.x-100){
        if(spear.y<sharky.y+25){
          if(spear.y>sharky.y-25){
            print("HITT")
          }
        }
      }
    }

    spear.drawSpearTrajectory(); //draw the ball called b (go look in the Ball class for the drawBall function)
    spear.drawCover1();
    spear.drawCover2();

    beginText();

    spear.hitShark();
    //specify the animation instance and its x,y position
    //animation() will update the animation frame as well
    animation(boatImg, 200, 100);
    sharky.drawShark();
    sharky.moveShark();






  }


  function mouseClicked(){
    print(mouseX, mouseY);
    spear.spearX = mouseX;
    spear.vs = mouseX;
    spear.spearY = mouseY;
    spear.moving = true;


  }

  function keyPressed(){
          spear.moving = true;

  }

  function reset(){
    spear.moving = false;
  }

  function beginText(){
    fill('red')
    text('click to throw spear      try and hit the shark     you only get one shot so make it count!', 300, 50);
  }

  function successText(){
    fill('red')
    text('Nice! You killed the shark! Reload to try again!', 400, 200);
  }

  function failText(){
    fill('red')
    text('Darn! You are not a good shark hunter! Reload to try again!', 400, 200)


  if (spear.dead == true){
    successText();
  }



}
  class Spear {

  	constructor(x,y,endX,endY,coverX,coverY,color,moving){ //every ball needs an x value and a y value
  		this.x = x;
      this.y = y;
      this.d_covered_y = this.spearY - this.y
      this.d_covered_x = this.spearX - this.x
      this.vs=0
      this.num3=0
      this.num = 0
      this.spearX = endX;
      this.endX=endX
      this.spearY = endY;
      this.num2 = 0
      this.coverX = coverX;
      this.coverY = coverY;
      this.color = "brown";
      this.moving = moving;
  	}

  	drawSpearTrajectory(){  // draw a ball on the screen at x,y
        if(spear.moving==true){
          stroke(10);
          fill(this.color);
          strokeWeight(3);
          line(this.x,this.y,this.spearX,this.spearY);
      }


      }




    	drawCover1(){

          noStroke();
          fill(200,255,255);
          print(this.coverX)
          rect(0,0,this.coverX,height);
         if(spear.moving==true){
              this.coverX += 10;
              // print(this.coverX)
        }
    	}
      drawCover2(){
        if(this.spearX-this.coverX>100){
            fill(200,255,255);
            quad(this.coverX+100,0,this.coverX+100,height,width,height,width,0 )

        }
      }

  	moveSpear(){
      		if(this.moving == true){
          	this.x1 = this.x1+50
      		 }
  	}


    hitShark(){

      this.num = this.coverX-this.endX
      this.num2 = this.num/this.vs
      print(this.num2)
      this.num3 = 50+this.vs*this.num2
      print(0)
      print(this.coverX+" , "+this.num3)

      // print(this.spearY)
      // print(sharky.y)
      // print()
      print(sharky.y)
      if(this.num3 <= sharky.y+50 && this.num3 >=sharky.y-50 && this.coverX <= sharky.x+150 && this.coverX >=sharky.x-150){
          this.dead = true
          print('the shark died');
        }
        else if (this.spearY <= sharky.y && this.coverX <= sharky.x) {
          // failText();
        }


if (this.dead == true) {
  background("green");
  successText();

}




     }

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
          if(spear.dead != true){
            this.x = this.x-2;
            this.y = this.y+2;
             if(this.y>height){
               this.x=width
               this.y =0
          }
      }
   }
}
