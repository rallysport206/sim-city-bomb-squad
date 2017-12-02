var interval,sirenSound;
var time = 30;
var wireColors = ['blue','green','white','red','yellow'];
var wires = []
var removeEventListener = function(){
  var wireImages = document.querySelector('#box, img');
  for(var i = 0; i < wireImages.length; i++){
    wireImages[i].removeEventListener('click', wiredClicked);
  }
}
var reset = function(){
  generateWires();
  addWireEventListener();
  time = 20;
  document.getElementById('timer').textContent = time;
  document.getElementById('winText').style.display = 'none';
  document.getElementById('failText').style.display = 'none';
  document.getElementsByTagName('body')[0].classList.remove('exploded');
  document.getElementsByTagName('body')[0].classList.add('unexploded');
  document.getElementById('timer').style.color = 'chartreuse';
  for(var i = 0; i < wireImages.length; i++){
    wireImages[i].src = 'img/uncut-' + wireImages[i].id + '-wire.png';
  }
  clearInterval(interval);
  interval = setInterval(tick,1000);
  sirenSound.play();
}
var gameOver = function(){
  //change background to exploded
  document.getElementsByTagName('body')[0].classList.remove('unexploded');
  document.getElementsByTagName('body')[0].classList.add('exploded');
  //show game lose text
  document.getElementById('failText').style.display = 'block';
  //stop the siren and play explosion sound
  var explosion = document.getElementById('explode');
  explosion.play();
  sirenSound.pause();
  removeEventListener();
}
var tick = function(){
  time -= 1;
  document.getElementById('timer').textContent = time;
  if(time <=10  && time > 5){
  document.getElementById('timer').style.color = "orange";
  }
  else if (time <= 5) {
  document.getElementById('timer').style.color = 'red';
  }
  if(time <= 0 ){
    clearInterval(interval);
    gameOver();
  }
}
var wiredClicked = function () {
  //this tells you what wire is clicked
  console.log('what do you want to do next?',this.id);
  //switch wire images to uncut.
  this.src = 'img/cut-' + this.id + '-wire.png';
  // play cutting noise
  var buzz = document.getElementById('buzz');
  buzz.play();
  // remove the click events
  this.removeEventListener('click',wiredClicked);
  if(wireIsSafe(this.id)){
    if(doneCuttingWires()){
      clearInterval(interval);
      document.getElementById('winText').style.display = 'block';
      sirenSound.pause();
      var yay = document.getElementById('yay');
      var success = document.getElementById('success');
      yay.addEventListener('ended',function(){
        success.play();
      })
      yay.play();
    }
  }
  else{
    gameOver();
  }
}
var doneCuttingWires = function() {
  for(var i = 0; i < wires.length; i++){
    if(wires[i].cut){
      return false;
    }
  }
  return true;
}
var wireIsSafe = function(color){
  for(var i = 0; i < wires.length; i++){
    if(wires[i].color === color){
      if (wires[i].cut){
        wires[i].cut = false;
      return true;
      }
    }
  }
  return false;
}
//keeps track of the events of object
var generateWires = function() {
  console.log('generating wires');
  for(var i = 0; i < wireColors.length; i++){
    wires.push({color: wireColors[i],cut: Math.random() > 0.5});
  }
  console.log("wires created",wires[0],wires[1],wires[2],wires[3],wires[4]);
}
var addWireEventListener = function () {
  var wireImages = document.querySelectorAll('#box, img');
  for(var i = 0; i < wireImages.length; i++){
    wireImages[i].addEventListener('click', wiredClicked);
  }
}
document.addEventListener("DOMContentLoaded", function() {
  //Add Even Litener
  document.getElementById('reset').addEventListener('click',reset);
  addWireEventListener();
// start timer
  interval = setInterval(tick, 1000);
// Start siren sound
  sirenSound = document.getElementById('siren');
  sirenSound.play();
//setup wire
  generateWires();
});
