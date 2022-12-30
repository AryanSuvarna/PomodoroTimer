startButton = document.getElementById("startBtn");
stopButton = document.getElementById("stopBtn");
resetButton = document.getElementById("resetBtn");
background = document.getElementById("background");
clock = document.getElementById("clock");
numSessions = document.getElementById("sessions");
state = document.getElementById("state");

var increment;
var seconds = 0;
var minutes = 25;
var audio = new Audio('timer.mp3');
var isBreak = false;
var startButtonPressed = false;
var sessions = 0;

function studyTimer() {
    if (seconds == 0) {
        if (minutes == 0) {
            minutes = 5;
            seconds =0;
            background.style.backgroundColor = "#6BBBE1";
            isBreak = true;
            audio.play();
        }
        else {
            minutes --;
            seconds = 60;
        }
    }
    else {
        seconds --;
        clock.innerText = twoDigits(minutes)+":"+twoDigits(seconds);
    }
}

function breakTimer() {
    if (seconds == 0) {
        if (minutes == 0) {
            sessions ++;
            minutes = 25
            background.style.backgroundColor = "#5FBA7C";
            isBreak = false
            audio.play();
            numSessions.innerText = "Number of sessions: " + sessions;
        }
        else {
            minutes --;
            seconds = 60;
        }
    }
    else {
        seconds --;
        clock.innerText = twoDigits(minutes)+":"+twoDigits(seconds);
    }
}

function selectTimer() {
    if (isBreak == true) {
        state.innerText = "Break Time!";
        breakTimer();
    }
    else {
        studyTimer();
        state.innerText = "Study!"
    }
}
function twoDigits(num) {
    if (num < 10) {
        return("0"+num);
    }
    else {
        return (num);
    }
}

startButton.onclick =  function() {
    if (startButtonPressed == false && isBreak == false) {
        background.style.backgroundColor = "#5FBA7C";
        increment = setInterval(selectTimer,1000);
        startButtonPressed = true;
    }
    else if (startButtonPressed == false && isBreak == true) {
        increment = setInterval(selectTimer,1000);
        startButtonPressed = true;
    }
    else {console.log("already pressed")}
}

stopButton.onclick =  function() {
    clearInterval(increment);
    startButtonPressed = false;
}

resetButton.onclick =  function() {
    background.style.backgroundColor = "orange";
    startButtonPressed = false;
    clearInterval(increment);
    minutes = 25;
    seconds = 0;
    sessions = 0;
    numSessions.innerText = "Number of Sessions: 0"
    state.innerText = "Get ready to put in work!"
    clock.innerText = "25:00";

}