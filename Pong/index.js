// Canvas Variables 
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

// Ball Variables
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballDeltaX = 0.6;
var ballDeltaY = 0.6;
var ballRadius = 5;

// Paddle One Variables
var paddleOneX = canvas.width / 10;
var paddleOneY = canvas.height / 2;
var paddleOneWidth = 2;
var paddleOneHeight = 20;
var paddleOneScore = 0;
var moveUpOne = false;
var moveDownOne = false;

// Paddle Two Variables
var paddleTwoX = canvas.width * 0.90;
var paddleTwoY = canvas.height / 2;
var paddleTwoWidth = 2;
var paddleTwoHeight = 20;
var paddleTwoScore = 0;
var moveUpTwo = false;
var moveDownTwo = false;

// Sound Variables
var soundScore = new Audio("Sounds/score.wav");
var soundCollisionWall = new Audio("Sounds/collisionWall.wav");
var soundCollisionPaddle = new Audio("Sounds/collisionPaddle.wav");

function drawDashedLine() {
	for (var i = canvas.height / 15; i < canvas.height * (0.93); i += canvas.height / 7.5) {
		context.beginPath();
		context.strokeStyle = "white";
		context.moveTo(canvas.width / 2, i);	
		context.lineTo(canvas.width / 2, i + (canvas.height / 15));
		context.stroke();
	}
}

function drawScoreOne() {
	context.font = "100% Press Start";
	context.fillStyle = "white";
	context.textAlign = "center";
	context.fillText(paddleOneScore, canvas.width / 5, canvas.height / 7);
}
function drawScoreTwo() {
	context.font = "100% Press Start";
	context.fillStyle = "white";
	context.textAlign = "center";
	context.fillText(paddleTwoScore, canvas.width * (0.80), canvas.height / 7);
}

function drawBall() {
	context.beginPath();
	context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
	context.fillStyle = "white";
	context.closePath();
}

function drawPaddleOne() {
	context.fillRect(paddleOneX, paddleOneY, 
		paddleOneWidth, paddleOneHeight);
	context.fillStyle = "white";
	context.fill();

	document.addEventListener("keydown", function(key){
		if (key.keyCode == 87) {
			moveUpOne = true;
			moveDownOne = false;
		}

		if (key.keyCode == 83) {
			moveUpOne = false;
			moveDownOne = true;
		}
	})
}

function drawPaddleTwo() {
	context.fillRect(paddleTwoX, paddleTwoY, 
		paddleTwoWidth, paddleTwoHeight);
	context.fillStyle = "white";
	context.fill();

	document.addEventListener("keydown", function(key){
		if (key.keyCode == 38) {
			moveUpTwo = true;
			moveDownTwo = false;
		}

		if (key.keyCode == 40) {
			moveUpTwo = false;
			moveDownTwo = true;
		}
	})
}

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	drawDashedLine();
	drawScoreOne();
	drawScoreTwo();
	drawBall();
	drawPaddleOne();
	drawPaddleTwo();

	// Ball Logic

	// Collision with Ceiling or Floor
	if ((ballY + ballDeltaY > canvas.height) ||
		(ballY < ballRadius)) {
		ballDeltaY = -ballDeltaY;

		soundCollisionWall.play();
	}

	// Collision with Paddle One
	if ((ballY - ballRadius > paddleOneY) &&
		(ballY + ballRadius < paddleOneY + paddleOneHeight) &&
		(ballX - ballRadius < paddleOneX) &&
		(ballX + ballRadius > paddleOneX + paddleOneWidth)) {
		ballDeltaX = -ballDeltaX;
		ballDeltaY = -ballDeltaY;

		soundCollisionPaddle.play();
	}

	// Collision with Paddle Two
	if ((ballY - ballRadius > paddleTwoY) &&
		(ballY + ballRadius < paddleTwoY + paddleTwoHeight) &&
		(ballX + ballRadius > paddleTwoX) &&
		(ballX - ballRadius < paddleTwoX + paddleTwoWidth)) {
		ballDeltaX = -ballDeltaX;
		ballDeltaY = -ballDeltaY;

		soundCollisionPaddle.play();
	}

	// Paddle One Score
	if (ballX + ballDeltaX > canvas.width) {
		ballX = canvas.width / 2;
		ballY = canvas.height / 2;
		ballDeltaX = -0.6;
		ballDeltaY = -0.6;
		paddleOneScore++;

		soundScore.play();
	}

	// Paddle Two Score
	if (ballX < ballRadius) {
		ballX = canvas.width / 2;
		ballY = canvas.height / 2;
		ballDeltaX = 0.6;
		ballDeltaY = 0.6;
		paddleTwoScore++;

		soundScore.play();
	}

	ballX += ballDeltaX;
	ballY += ballDeltaY;

	// Paddle One Logic
	if ((moveUpOne) && 
		(paddleOneY > 0)) {
		paddleOneY -= canvas.height / 300;
	}

	if ((moveDownOne) &&
		(paddleOneY + paddleOneHeight < canvas.height)) {
		paddleOneY += canvas.height / 300;
	}

	// Paddle Two Logic
	if ((moveUpTwo) && 
		(paddleTwoY > 0)) {
		paddleTwoY -= canvas.height / 300;
	}

	if ((moveDownTwo) &&
		(paddleTwoY + paddleTwoHeight < canvas.height)) {
		paddleTwoY += canvas.height / 300;
	}

	setTimeout(draw, 0.2);
}

draw();
