let run = false;
let isRunning = false;
let milliSecond = 0;
let second = 0;
let minute = 0;
let hour = 0;
let timer = false;
let lap = "";
let lapCount = 0;
document.getElementById("lapReset").disabled = true;

function toStart() {
    isRunning = true;
    run = true;
    timer = true;
    document.getElementById("startStopResume").textContent = "Stop";
    document.getElementById("lapReset").disabled = false;
    document.getElementById("startStopResume").classList.replace("purple", "red");
    timing();
}

function toStop() {
    timer = false;
    isRunning = false;
    document.getElementById("startStopResume").textContent = "Resume";
    document.getElementById("startStopResume").classList.replace("red", "blue");
    document.getElementById("lapReset").textContent = "Reset";
}
function toResume() {
    run = true;
    timer = true;
    isRunning = true;
    document.getElementById("startStopResume").classList.replace("blue", "red");
    document.getElementById("lapReset").textContent = "Lap";
    document.getElementById("startStopResume").textContent = "Stop";
    timing();
}

function toLap() {
    
    if (lapCount == 0) {
        document.getElementById("laps").innerHTML = "LAPS" + "<br>" + "<br>";
    }
    lapCount++;
    lap = lapCount + ") " + hour + ":" + minute + ":" + second + "." + milliSecond;
    document.getElementById("laps").innerHTML += (lap + "<br>");
}

function toReset() {
    timer = false;
    run = false;
    milliSecond = 0;
    second = 0;
    minute = 0;
    hour = 0;
    lapCount = 0;
    document.getElementById("hour").innerHTML = "00";
    document.getElementById("minute").innerHTML = "00";
    document.getElementById("second").innerHTML = "00";
    document.getElementById("millisecond").innerHTML = "00";
    document.getElementById("laps").innerHTML = "";
    document.getElementById("startStopResume").textContent = "Start";
    document.getElementById("lapReset").textContent = "Lap";
    document.getElementById("lapReset").disabled = true;
    document.getElementById("startStopResume").classList.replace("blue", "purple");
}

function startStopResume() {
    if (isRunning == false && run == false) {
        toStart();
    }
    else if (isRunning == true && run == true) {
        toStop();
    }
    else {
        toResume();
    }
}

function lapReset() {
    if (isRunning == false) {
        toReset();
    }
    else {
        toLap();
    }
}


function timing() {
    if (timer == true) {
        milliSecond++;
        if (milliSecond == 100) {
            milliSecond = 0;
            second++;
        }
        if (second == 60) {
            second = 0;
            minute++;
        }
        if (minute == 60) {
            second = 0;
            minute = 0;
            hour++;
        }
        document.getElementById("hour").innerHTML = hour;
        document.getElementById("minute").innerHTML = minute;
        document.getElementById("second").innerHTML = second;
        document.getElementById("millisecond").innerHTML = milliSecond;
        setTimeout("timing()", 10);
        window.addEventListener("keydown", checkkey);
    }
}