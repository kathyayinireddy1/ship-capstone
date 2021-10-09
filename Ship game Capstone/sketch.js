var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg;
var water, ship, helicopter, bomb;
var helicopterGroup, bombGroup;
var score = 0;



function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadImage("ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
}

function setup() {
  createCanvas(800,450);
  
  water= createSprite(0,400);
    water.addImage(waterbg);
    

ship= createSprite(200,300);
 ship.addImage(shipimg);
 
 ship.scale=0.5;
 
 


 
  
  //creating helicopter group
  helicopterGroup= new Group();
//creating bomb group
  bombGroup= new Group();

  
    

  ship.debug = "true";
  ship.setCollider("rectangle", 0, 10,100,100);

}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
 
  //gameState play
  if(gameState === PLAY){
    //increase score
    score = score + Math.round(frameCount/300);

    ship.x = World.mouseX;
    //Call user defined function
   
    
    if(bombGroup.isTouching(ship)){
        gameState = END;
    }
   
  
  }
  spawnHelicopter();
  spawnBomb(); 
  
  //gameState end
   if(gameState === END){
    textSize(40);
    fill(0);
    text(" You Lost! TRY AGAIN ",250,200);
    ship.addImage("ship",restartimg)
   //water velocity becomes zero
      water.velocityX=0;
   //destroy Helicopter group
      helicopterGroup.destroy();
   //destroy bomb group
      bombGroup.destroy();
      
      
  
    
  }
  
 
 //for infinite background 
 if(water.position.x < 300){
    water.position.x = 400;
    }
    

  drawSprites();
 
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);
  }
}

function spawnBomb(){
 // create bombs at random position
 //use Math.random
 if (World.frameCount % 320 == 0) {
  var bomb= createSprite(Math.round(random(50, 650),40, 10, 10));
  bomb.addImage(bombimg);
  bomb.scale=0.09;
 // ball.debug = true
  bomb.velocityY = 3;
  bomb.lifetime = 600;
  bombGroup.add(bomb);
}
}




