var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY =  4;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

var player1Score = 0;
var player2Score = 0;
const FINAL_SCORE = 10;

var showWinningScreen = false;

function findMouse(eve){
	
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = eve.clientX - rect.left - root.scrollLeft;
	var mouseY = eve.clientY - rect.top - root.scrollTop;
	return{
		x:mouseX,
		y:mouseY
	};
	
}

window.onload = function(){
	
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	var framesPerSecond = 30;
	setInterval(function(){
		
		moveEverything();
		drawEverything();
		
	},1000/framesPerSecond);
	
	canvas.addEventListener('mousemove', function(eve){
		var mousePos = findMouse(eve);
		paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
		
	});
	
}

function ballReset(){
	
	if(player1Score >= FINAL_SCORE || player2Score >= FINAL_SCORE){
		
		player1Score = 0;
		player2Score = 0;
		
		showWinningScreen = true;
		
	}
	
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
	
}

function runBot(){
	
	var paddle2Ycenter = paddle2Y + (PADDLE_HEIGHT/2);
	
	if(paddle2Ycenter < ballY - 35){
		paddle2Y += 6;
	}else if(paddle2Ycenter > ballY + 35){
		paddle2Y -= 6;
	}
	
}

function moveEverything(){
	
	if(showWinningScreen){
		return;
	}
	
	runBot();
	
	ballX += ballSpeedX;
	ballY += ballSpeedY;
	
	if(ballX < 10){
		
		if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY*0.35;
		}else{
			player2Score++;
			ballReset();
		}
		
	}
	
	if(ballX > canvas.width-10){
		
		if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY*0.35;
		}else{
			player1Score++;
			ballReset();
		}
		
	}
	
	if(ballY < 10){
		ballSpeedY = -ballSpeedY;
	}
	
	if(ballY > canvas.height-10){
		ballSpeedY = -ballSpeedY;
	}
	
}

function drawEverything(){
	/* Game layout - Background */
	newRect(0,0,canvas.width,canvas.height,'#F7BA36');
	
	if(showWinningScreen){
		
		canvasContext.font = "30px Verdana";
		var gradient= canvasContext.createLinearGradient(0,0,canvas.width,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		canvasContext.fillStyle=gradient;
		canvasContext.fillText("Wow ! That's Just Great !",canvas.width/5, 100);
		canvasContext.fillText("Go Home RETARD :D :D ",canvas.width/5, 150);
		return;
	}
	
	/* Paddle for left */
	newRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT,'#003300');
	/* Paddle for Right */
	newRect(canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT,'#003300');
	/* Draw - Ball */
	newCircle('#990000',ballX, ballY, 10, 0,Math.PI*2, true);
	
	canvasContext.font = "30px Verdana";
	canvasContext.fillText("Human : "+player1Score,100,100);
	canvasContext.fillText("Bot : "+player2Score,canvas.width-300,100);
	
}

function newRect(leftX, topY, width, height, fillColor){
	
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(leftX, topY, width, height);
	
}

function newCircle(color, centerX, centerY, radius, startAngle, endAngle, counterClockwise){
	
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, startAngle, endAngle, counterClockwise);
	canvasContext.fill();
	
}