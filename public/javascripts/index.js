var audio = new Audio();
$(document).ready(function(){
  audio.src = "../red.mp3";
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
  var map = "000000001000001010000000000110000001000000101010000101101010000011111101011011110010000001010010101100010100000001000100010000000010000001000000010100010011010001000100001000100101111100000000011000001101011101110111011110100110111100100001111110110101000011111111110000110111011111111110111101010110111111111001100101011111010010000010000000000000001110101010010001100001110111001110101111011010010100101111100101011110010101111000100000011111111101010001011101111111111110011111111111010100010000011100101100110001100100111111010010100100011010101001011111100111110011111010001111111111011011111111110111010110110111111100110010010111110001000110001110101111111010010111101111110101111101111010101101111111111111111111110011110111111110111111110111100000000000000000000000001111111101110111111111011111111110111111011011111110111111111111111110111110111111111111111101110111101011000000000000000000000"
  setMap(map);
  gameStatus = true;
  audio.play();
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