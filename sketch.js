var dog;
var dogImg, dogImg1;
var database;
var foodS, foodStock;

function preload(){
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  dog=createSprite(250,300,100,100);
  dog.addImage(dogImg);  
  dog.scale=0.15;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,140,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
    
  }
  drawSprites();
  textSize(20);
  stroke("black");
  text("Press UP_ARROW to feed the dog!",100,20);
  text("Food remaining:"+foodS,100,40);
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
