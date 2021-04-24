var bar,pin,highlight,invisibleWall1,invisibleWall2,highlightGrp,score;
var gameState = 0; 


function preload()
{
  logImg = loadImage("log.png");
  bckgroundImg = loadImage("Backgroud.jpg");
  basketImg = loadImage("Basket.png");
  appleImg = loadImage("Apple.png");
}
function setup() 
{
  createCanvas(800,800);
 bar =  createSprite(400, 400, 700, 20);
 bar.shapeColor = "blue";

 pin = createSprite(200,400,10,50);
 pin.shapeColor = "black";

 invisibleWall1 = createSprite(50,400,10,100);
 invisibleWall2 = createSprite(750,400,10,100);

 invisibleWall1.visible = false;
 invisibleWall2.visible = false;

  highlightGrp = new Group();

  score = 0;

  bar.addImage(logImg);
  bar.scale = 2;

  pin.addImage(basketImg);
  pin.scale = 0.1


}

function draw() 
{
  background(bckgroundImg);  

  pin.bounceOff(invisibleWall1);
  pin.bounceOff(invisibleWall2);

  pin.velocity.x = 0;

  fill("black");
  textSize(30);
  

  if (gameState == 0 )
  {
    text("PRESS 'SPACE' TO START", 200,400)
    pin.visible = false;
    bar.visible = false;
    highlightGrp.setVisibleEach(false);
  }

  if (gameState == 0 && keyWentDown("space"))
  {
    gameState = 1;
    pin.visible = true;
    bar.visible = true;
  }

  if (gameState == 1)
  {
    text("SCORE - "+score,500,200);
  }

  if (score == 1000)
  {
    gameState = 2;
    pin.visible = false;
    bar.visible = false;
    highlightGrp.destroyEach();
  }

  if (gameState == 2)
  {
    text("YOU WON!", 350,400);
    highlightGrp.destroyEach();
  }

  console.log(gameState)

  if(keyDown(LEFT_ARROW))
  {
    pin.velocity.x = -5;
  }

  if(keyDown(RIGHT_ARROW))
  {
    pin.velocity.x = 5;
  }
  
  if (highlightGrp.isTouching(pin) && keyWentDown("space"))
  {
    highlightGrp.destroyEach();
    score = score+100;
  }

  spawnHighlights();

  drawSprites();
}

function spawnHighlights()
{ 
  if (frameCount%150 == 0)
  {
    randomX = random(80,720);
    highlight = createSprite(randomX,400,20,50);
    highlight.shapeColor = "green";
    highlight.addImage(appleImg);
    highlight.scale = 0.15;
    highlight.lifetime = 500;
    highlight.depth = 1;
    pin.depth = highlight.depth+1;
    highlightGrp.add(highlight);
    
  }
  
}