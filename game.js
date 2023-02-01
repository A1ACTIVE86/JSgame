var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;







function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;







	if (downPressed) {
		var newTop = positionTop+1;

		var element = document.elementFromPoint(player.offsetLeft, newTop+32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop-1;

		var element = document.elementFromPoint(player.offsetTop, newTop+3);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}
		
		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft-1;

		var element = document.elementFromPoint(newLeft, player.offsetTop+3);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
			
					player.className = 'character walk left';
		}

	}
	if (rightPressed) {
		var newLeft = positionLeft+1;
		
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';		
		}

		player.className = 'character walk right';
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}






function startX() 
{
    var start = document.getElementsByClassName('start')[0];
	start.style.display = 'none';
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	var alien = document.getElementsByClassName('alien');
	for (var i = 0; i < alien.length; i++) {
		var x = Math.ceil(Math.random() * 6);
		alien[i].style.left = x + '0vw';
		alien[i].style.top = 0;
	}

	
	moveSpaceship = setInterval(positionalien,2000);



}

function positionalien()
{
	var alien = document.getElementsByClassName('alien');
	for(var i = 0; i < alien.length; i++)
	{
		var x = Math.ceil(Math.random() * 10);
		alien[i].style.left = x + '0vw';
		alien[i].style.top = 0;
		
		
		
		
		
		var bomb = document.createElement('div');
		var body = document.getElementsByTagName('body')[0];
		bomb.classList = 'bomb';
		bomb.style.left = x + '0vw';
		bomb.style.top = 0;
		body.appendChild(bomb);	
		movedown(bomb);
	}
		

}

function dropBombs() {
	var bombs = document.getElementsByClassName('bomb');
	for (var i = 0; i < bombs.length; i++) {
	  var bomb = bombs[i];
	  var currentTop = bomb.offsetTop;
	  var currentLeft = bomb.offsetLeft;
	  var angle = Math.random() * Math.PI; // Random angle between 0 and 180 degrees
  
	  bomb.style.top = currentTop + 5 * Math.sin(angle) + "px";
	  bomb.style.left = currentLeft + 5 * Math.cos(angle) + "px";
	}
  }
  

function clearlives()
{
	
	var li = document.getElementsByTagName('li');
	for(var i = 0; i < li.length; i++)
	{
		li[i].parentNode.removeChild(li[i]);
	}

}

function reset() 
{
	var player = document.getElementById('player');
	player.style.top = '88vh';
	player.style.left = '200px';
	player.classList = 'character stand down';
	
	clearbomb();
	lives = lives -1;
	clearlives();
	setlives(lives);

	if(lives < 1)
	{
		clearbomb();
		var start = document.getElementsByClassName('start')[0];
		 start.style.display = 'block';
		 start.firstChild.nodeValue = 'start again'
		document.removeEventListener('keydown', keydown);
		document.removeEventListener('keyup', keyup);
		player.classList = 'character stand dead';
		setlives();
		clearInterval(timeout);
		
		
		
		
	}
	

	
}


var lives = 3;

function setlives(lives)
{
	var ul = document.getElementsByTagName('ul')[0];
	var li = ul.getElementsByTagName('li');

	for(var i = 0; i < lives; i++)
	{
		var li = document.createElement('li');
		ul.appendChild(li);
	}

}


function clearlives()
{
	var ul = document.getElementsByTagName('ul')[0];
	var li = ul.getElementsByTagName('li');
	var size = li.length;

	for(var i = 0; i < size; i++)
	{
		ul.removeChild(li[0]);
	}
}








function clearbomb()
{
	var bombs = document.getElementsByClassName('bomb');
	var size = bombs.length;
	for(var i = 0; i < size; i++)
	{
		bombs[0].parentNode.removeChild(bombs[0]);
	}
	var explosion = document.getElementsByClassName('explosion');
	for(var i = 0; i < explosion.length; i++)
	{
		explosion[i].parentNode.removeChild(explosion[i]);
	}
}







function movedown(bomb){
var speed = Math.ceil(Math.random()*7);
var postop = bomb.offsetTop;
var sky = document.getElementsByClassName('sky')[0];
var grass = window.innerHeight - sky.offsetHeight;
var rand = Math.ceil(Math.random()*grass);
var sky = document.getElementsByClassName('sky')[0];
var player = document.getElementById('player');




var move = setInterval(function(){
	var position = document.elementFromPoint(player.offsetLeft, player.offsetTop);
	if(position.classList.contains('explosion')){
		reset();

	}

	if(postop == sky.offsetHeight+rand){
		bomb.classList = 'explosion';
		setTimeout(function(){
			if(	bomb.parentNode != null){
			bomb.parentNode.removeChild(bomb);
			}
	},1000);
	clearInterval(move);
	} else{
		postop++;
		bomb.style.top = postop + 'px';
	
	}},speed);

}
var timeout = 0;
var moveSpaceship = 0;




function myLoadFunction() {
	var start = document.getElementsByClassName('start')[0];
	start.style.background = 'red';
	start.addEventListener('click', startX);
	setlives(lives);

	
}
function restartGame() {
	window.location.reload();
  }



document.addEventListener('DOMContentLoaded', myLoadFunction);