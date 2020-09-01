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
  createCanvas(1000,1000);
  dog=createSprite(500,500,10,10);
  dog.addImage(dogImg);  
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(0,0,0);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }
  drawSprites();
  text("Press UP_ARROW to feed the dog!",100,20);
  text("Food remaining:20",100,30);
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
