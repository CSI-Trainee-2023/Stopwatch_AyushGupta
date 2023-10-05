let run = false;
let isRunning = false;
let milliSecond = 0;
let second = 0;
let minute = 0;
let hour = 0;
let timer = false;
let lap="";
document.getElementById("lapReset").disabled = true;

function startStopResume() {
    if (isRunning == false && run == false) {
        isRunning = true;
        run = true;
        timer = true;
        document.getElementById("startStopResume").textContent = "Stop";
        document.getElementById("lapReset").disabled = false;
        timing();
    }
    else if (isRunning == true && run == true) {
        timer = false;
        isRunning = false;
        document.getElementById("startStopResume").textContent = "Resume";
        document.getElementById("lapReset").textContent = "Reset";
    }
    else {
        run = true;
        timer = true;
        isRunning = true;
        document.getElementById("lapReset").textContent = "Lap";
        document.getElementById("startStopResume").textContent = "Stop";
        timing();
    }
}

function lapReset() {
    if (isRunning == false) {
        timer=false;
        run=false;
        milliSecond = 0;
        second = 0;
        minute = 0;
        hour = 0;
        document.getElementById("hour").innerHTML = "00";
        document.getElementById("minute").innerHTML = "00";
        document.getElementById("second").innerHTML = "00";
        document.getElementById("millisecond").innerHTML = "00";
        document.getElementById("laps").innerHTML="";
        document.getElementById("startStopResume").textContent = "Start";
        document.getElementById("lapReset").textContent = "Lap";
    }
    else{
        lap=hour+":"+minute+":"+second+"."+milliSecond;
        document.getElementById("laps").innerHTML+=(lap+"<br>");
    }
}


function timing() {
    if (timer == true) {
        milliSecond = milliSecond + 1;
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
    }
}