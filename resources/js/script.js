var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10/2;
var ballSpeedY = 4/2;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 30;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x:mouseX,
        y:mouseY
    };


}

function handleMouseClick(evt){
    if(showingWinScreen){
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }


}


window.onload = function(){

    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");
    var framesPerSecond = 30;
    setInterval(function(){
        moveEverything();
        drawEverything();

    }, 1000/framesPerSecond);

    canvas.addEventListener("mousedown", handleMouseClick);


    canvas.addEventListener("mousemove",
            function(evt){
                var mousePos = calculateMousePos(evt);
                paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
            })

}

/* function callBoth(){
    moveEverything();
    drawEverything();
} */



function ballReset(){
    if(player1Score >= WINNING_SCORE || player2Score>=WINNING_SCORE){
        showingWinScreen = true;
    }

    ballX = canvas.width/2;
    ballY = canvas.height/2;
    ballSpeedX=-ballSpeedX;

}
function computerMovement(){
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY - 35){
            paddle2Y = paddle2Y +6;

    }else if (paddle2YCenter< ballY+35){
            paddle2Y = paddle2Y - 6;
    }

}



function moveEverything(){
    if(showingWinScreen){
        return;
    }



    computerMovement();





    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if(ballX < 0){
        if(ballY > paddle1Y && 
            ballY < paddle1Y + PADDLE_HEIGHT){
                ballSpeedX = -ballSpeedX;
                // bounce based on where the ball hits the paddle
                var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
                ballSpeedY = deltaY*0.35;
            }else{

        // resets the ball to the center
            player2Score ++;  // must be before ballReset() to stop when score is MAX

            ballReset();
            }
    }
    // Right Paddle Ball Resets
    if(ballX > canvas.width){
        if(ballY > paddle2Y && 
            ballY < paddle2Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX
            // bounce based on where the ball hits the paddle
            var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY*0.35;
        }else{
            player1Score ++;
            ballReset();
        }

    }

    if(ballY < 0){
        ballSpeedY=-ballSpeedY;
    }

    if(ballY > canvas.height){
        ballSpeedY=-ballSpeedY;
    }


}

function drawNet(){
    for(var i=0; i<canvas.height; i+=40){
        colorRect(canvas.width/2-1, i, 2,20, "white");
    }
}



function drawEverything(){


    //X,Y, width, height, color
    //canvas
    colorRect(0,0,canvas.width,canvas.height,"black");

    if(showingWinScreen){
        canvasContext.fillStyle = "white";

        if(player1Score >= WINNING_SCORE) {
            canvasContext.fillText("LEFT Player Won!", canvas.width/2 - 50,canvas.height/2 - 10);

        } else if( player2Score>=WINNING_SCORE){
            canvasContext.fillText("RIGHT Player Won!", canvas.width/2 - 50,canvas.height/2 - 10);

        }


        canvasContext.fillText("Click to continue", canvas.width/2 - 50,canvas.height/2 + 200);

        return;
    }

    drawNet();
    //left player paddle
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT, "white");

    //right player paddle
    colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT, "white");


    // green ball
    colorCircle(ballX,ballY,10,"orange");
    canvasContext.fillText(player1Score, 100,100);
    canvasContext.fillText(player2Score, canvas.width-100,100);

 /*    canvasContext.fillStyle = "red";
    canvasContext.beginPath();
    //x,y, radius, begining angle, end angle, clockwise vs counterclock 
    canvasContext.arc(ballX,100,10,0,Math.PI*2,true);
    canvasContext.fill(); */


}

function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY, radius,0, Math.PI*2,true);
    canvasContext.fill();

}


function colorRect(leftX, topY, width, height,drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width,height);




}