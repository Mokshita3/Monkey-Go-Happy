var PLAY
var END
var gameState 

var bananaImage, obstacleImage, obstacleGroup,
backImage, score;
var monkey;
var obstacle;
var ground,invisibleGround;

function preload(){
 backImage=loadImage("jungle.jpg");
 monkey_running=loadAnimation("Monkey_01.png", "Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  
  bananaImage=loadImage("Banana.png");
  obstacleImage=loadImage("stone.png")
  backImage=loadImage("jungle.jpg");
}


function setup() {
  createCanvas(400,400);
   PLAY = 1;
 END = 0;
 gameState = PLAY;
  bakground=createSprite(400,400);
  bakground.addAnimation("bakground", backImage);
  monkey=createSprite(40,320,20,20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale=0.075;
  monkey.setCollider("circle",0,0,30);

 ground = createSprite(200,380,400,20);
ground.shapeColor="black";
ground.x = ground.width /2;
 ground.scale=3;

 invisibleGround = createSprite(200,335,400,5);
invisibleGround.visible = false;


 ObstaclesGroup = createGroup();
bananaGroup = createGroup();

textSize(18);
textFont("Georgia");
textStyle(BOLD);


 score = 0;  
  
}


function draw(){
 background(255);
  
  
  if(gameState === PLAY){

    ground.velocityX = -2;
    
    if (ground.x < 0){
      ground.x = ground.width/2;   
    }
    
    if(keyDown("space") ){
      monkey.velocityY = -12 ;
      
    }
  
    
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(invisibleGround);

   spawnBananas();
  

    spawnObstacles();
    
    if (bananaGroup.isTouching(monkey)) {
     
     score=score+1;
     bananaGroup.destroyEach();
    }
  switch (score) {
    case 10: monkey.scale=0.25;
      break;
    case 20: monkey.scale=0.75;
    break;
    case 30: monkey.scale=0.5;
      break;
    case 40: monkey.scale=1;
     break;
     default: break;
  }
      
      
    if(ObstaclesGroup.isTouching(monkey)){
     
      score=score-1;

    }
    
  
  //else if(gameState === END) {
    
   // ground.velocityX = 0;
    //monkey.velocityY = 0;
   // ObstaclesGroup.destroyEach();
   // bananaGroup.destroyEach();
    
   // }
  
 
  drawSprites();
  text("Score: "+ score, 250, 100);
  
}



function spawnObstacles() {
  if(World.frameCount % 200  === 0) {
    var obstacle = createSprite(400,330,10,40);
    obstacle.velocityX = -2;
    obstacle.addAnimation("obstacleImage");

    

   
    obstacle.lifetime = 200;

    ObstaclesGroup.add(obstacle);
  }
}

function spawnBananas() {
 
  if (World.frameCount % 100 === 0) {
  var banana = createSprite(random(120,360),random(115,160),10);
   banana.velocityX=-2; 
   banana.addAnimation("banana", bananaImage);
    banana.scale = 0.10;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
  
}
}
