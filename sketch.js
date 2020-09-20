var dog;
var dogImg, dogImg1;
var database;
var foodS, foodStock;
var feed, addFood;
var lastFed;
var gameState,readState;
var bedroom,garden,washroom;
var foodObj;
var currentTime;
function preload(){
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
  bedroom=loadImage("virtual pet images/Bed Room.png");
  garden=loadImage("virtual pet images/Garden.png");
  washroom=loadImage("virtual pet images/Wash Room.png");
}

function setup() {
  database = firebase.database();
  createCanvas(400,500);
  foodObj=new Food();
  dog=createSprite(200,400,150,150);
  dog.addImage(dogImg);  
  dog.scale=0.15;
  feed=createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food"); 
  addFood.position(600,95); 
  addFood.mousePressed(addFoods);
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
}


function draw() {  
  background(46,140,87);
  foodObj.display(); 
  fedTime=database.ref('FeedTime'); 
  fedTime.on("value",function(data){ 
  lastFed=data.val(); 
  }); 
fill(255,255,254); 
textSize(15); 
if(lastFed>=12){
   text("Last Feed : "+ lastFed%12 + " PM", 100,30); 
  }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30); }
     else{ text("Last Feed : "+ lastFed + " AM", 100,30); } drawSprites();

     currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==lastFed+2){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime==(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){ 
  dog.addImage(dogImg1); 
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({ 
    Food:foodObj.getFoodStock(), 
    FeedTime:hour() 
  }) 
}
function addFoods(){ 
  foodS++; database.ref('/').update({
    Food:foodS 
  }) 
}
function update(state){
  database.ref('/').update({
    gameState:state
  });
}