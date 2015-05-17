$(document).ready(function(){
  $(document).keydown(function keyDown(e){
    switch(e.which){
      case 32: 
        if(gameStatus){
          hit();
        }else{
          startGame();
        }
        break;//空格
    }
  });
});
var gameStatus = false;
var score = 0;
var map = "000";
var block_width = 50;
var speed = 5;
var tickTime = 20;
var good_num = 0;
var bad_num = 0;
var miss_num = 0;
function startGame(){
  map = '000';
  score = 0;
  good_num = 0;
  bad_num = 0;
  miss_num = 0;
  randomMap();
  setMap(map);
  gameStatus = true;
  tick();
}
function hit(){
  $("#hitZone").addClass("hit");
  setTimeout(function(){
    $("#hitZone").removeClass("hit");
  },100);
  if(margin > -block_width / 2){
    if($(".block")[0]){
      if($($(".block")[0]).hasClass("good")){
        if(!$($(".block")[0]).hasClass("hit")){
          $($(".block")[0]).addClass("hit");
          addScore();
          good();
        }
      }else{
        $($(".block")[0]).addClass("bad");
        reduceScore();
        bad();
      }
    }
  }else{
    if($(".block")[1]){
      if($($(".block")[1]).hasClass("good")){
        if(!$($(".block")[1]).hasClass("hit")){
          $($(".block")[1]).addClass("hit");
          addScore();
          good();
        }
      }else{
        $($(".block")[1]).addClass("bad");
        reduceScore();
        bad();
      }
    }
  }
}
var margin = 0;
function tick(){
  if(!gameStatus){
    return false;
  }
  if(margin <-block_width / 2){
    if($($(".block")[0]).hasClass("good") && !$($(".block")[0]).hasClass("hit") && !$($(".block")[0]).hasClass("bad")){
      $($(".block")[0]).addClass("bad");
      reduceScore();
      miss();
    }
  }
  if(margin > -block_width){
    margin -= speed;
  }else{
    margin = -speed;
    if($(".block")[0]){
      $(".block")[0].remove();
    }else{
      gameStatus = false;
    }
  }
  $("#bitmap").css("margin-left",margin + "px");
  setTimeout(tick,tickTime);
}
function setMap(map){
  var container = $("#bitmap");
  for(var i = 0; i < map.length; i++){
    if(map[i] == 1){
      var block = '<div class="block good">1</div>';
    }else{
      var block = '<div class="block">0</div>';
    }
    container.append(block);
  }
}
function addScore(){
  score += 100;
  $("#score").html(score);
  $("#score").css("color","green");
  setTimeout(function(){
    $("#score").css("color","white");
  },100);
}
function reduceScore(){
  score -= 100;
  $("#score").html(score);
  $("#score").css("color","red");
  setTimeout(function(){
    $("#score").css("color","white");
  },100);
}
function good(){
  good_num ++;
  $("#good").html("Good:" + good_num);
}
function bad(){
  bad_num ++;
  $("#bad").html("Bad:" + bad_num);
}
function miss(){
  miss_num ++;
  $("#miss").html("Miss:" + miss_num);
}
function randomMap(){
  for(var i = 0; i < 300; i ++){
    map += Math.random()<0.6?"1":"0";
  }
}