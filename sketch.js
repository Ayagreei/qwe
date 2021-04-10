var addFood,feed;
var fedTime, lastFed;
let food = [];
var h;
var milk,ml;
var foods, foodStock;
var dog,happyDog;
var database;
function preload(){
  //Load images here
  happyDog=loadImage("images/dogImg.png");
  sadDog=loadImage("images/dogImg1.png");
  ml=loadImage("images/Milk.png")
}
function setup(){
    database = firebase.database();

    createCanvas(1000,500);

    h = hour();

    var foodStock = database.ref('FoodS/food');
    foodStock.on("value",function(data){
      foods = data.val();
    }) 
  // foodObj = new Food(400,250)
//console.log(reedStock);
    feed = createButton("Feed the dog");
    feed.position(800,95);
    feed.mousePressed(feedDog);

    addFood = createButton("Add food for the dog");
    addFood.position(900,95);
    addFood.mousePressed(addFoods);

    dog = createSprite(500,250,10,10);
    dog.addImage(sadDog);
    dog.scale=0.1;

    milk = createSprite(400,250);
    milk.addImage(ml);
    milk.scale=0.1
    milk.visible=false;

}

function draw(){
    background("green");
    console.log(h)
    //foodObj.display()
//food.display()
fill(0,0,0);
textSize(15);
text(h,250,250);

    fedTime = database.ref('FeedTime')
    fedTime.on("value",function(data){
      lastFed = data.val();
    }) 
    fill(0,0,0)
    textSize(25)
text ("foods:"+foods,300,40);
for ( var h = 0; h <food.length; h++)
{
food[h].display();
}
    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      text("Last Feed : " + lastFed%12 + "PM",50,30)
    }
    else if(lastFed==0){
      text("Last Feed : 12 AM",50,30)
    }
    else{
      text("Last Feed :"+ lastFed +"AM",50,30)
    }
      drawSprites();
}

function feedDog (){
  if(foods>0){
    dog.addImage(happyDog)
  foods= foods-1;
  milk.visible=true;
}
  foddObj.updateFondStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  if (foods<12){
  dog.addImage(sadDog)
  foods++;
  milk.visible=false;
}
     food.push(new Food)
  database.ref('/').update({
    FoodS: foods
})
}