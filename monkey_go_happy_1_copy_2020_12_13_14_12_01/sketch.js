
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  var survivalTime=0;
  
  createCanvas(400,400);
  
 monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.X=ground.width/2;
  console.log(ground.x)
  
  BananasGroup=new Group();
  ObstaclesGroup=new Group();
  
  score=0;
}

function draw() {
  
   background("white");
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")) {
        monkey.velocityY = -12;
        
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
  
  monkey.collide(ground);
  
  spawnObstacles();
  spawnBananas();
  drawSprites();
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,350,50);
 
  if(ObstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        ObstaclesGroup.setVelocityXEach(0);
        BananasGroup.setVelocityXEach(0);
        ObstaclesGroup.setLifetimeEach(-1);
        BananasGroup.setLifetimeEach(-1);
    
      }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survival Time:"+ survivalTime,100,50); 
  

}
function spawnObstacles (){
  if(frameCount%300===0){
    
  var obstacle=createSprite(370,330);
    obstacle.velocityX = -6;

    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    
    obstacle.lifetime = 300;
    
    ObstaclesGroup.add(obstacle);

}

}

function spawnBananas(){
  if(frameCount%80===0){
    
    var banana=createSprite(120,200);
    banana.y=random(120,250);
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

     banana.addImage(bananaImage);
     banana.scale=0.05;
    BananasGroup.add(banana);
  }
  
}
