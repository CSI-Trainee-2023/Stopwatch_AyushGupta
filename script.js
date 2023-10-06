let isStarted = false;
let isRunning = false;
let milliSecond = 0;
let second = 0;
let minute = 0;
let hour = 0;
let timer = false;
let lap = "";
let lapCount = 0;
let record=[];

document.getElementById("lapReset").disabled = true;

if (localStorage.length != 0) {
    document.getElementById("lapHead").innerHTML = "LAPS" + "<br>";
    lapCount = localStorage.getItem("lapCount");
    restringRecord=window.localStorage.getItem("key");
    record=JSON.parse(restringRecord);
}
for (let i = 0; i < lapCount; i++) {
    document.getElementById("laps").innerHTML= (record[i] + "<br>")+document.getElementById("laps").innerHTML;
}
function toStart() {
    isRunning = true;
    isStarted = true;
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
    isStarted = true;
    timer = true;
    isRunning = true;
    document.getElementById("startStopResume").classList.replace("blue", "red");
    document.getElementById("lapReset").textContent = "Lap";
    document.getElementById("startStopResume").textContent = "Stop";
    timing();
}

function toLap() {
    if (lapCount == 0) {
        document.getElementById("lapHead").innerHTML = "LAPS" + "<br>";
    }
    lapCount++;

    lap = hour + ":" + minute + ":" + second + "." + milliSecond;
    document.getElementById("laps").innerHTML = (lap + "<br>") + document.getElementById("laps").innerHTML;
    record[lapCount-1]=lap;
    stringRecord=JSON.stringify(record);
    window.localStorage.setItem("key",stringRecord);
    window.localStorage.setItem("lapCount",lapCount);
}

function toReset() {
    timer = false;
    isStarted = false;
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
    document.getElementById("lapHead").innerHTML = "";
    document.getElementById("startStopResume").textContent = "Start";
    document.getElementById("lapReset").textContent = "Lap";
    document.getElementById("lapReset").disabled = true;
    document.getElementById("startStopResume").classList.replace("blue", "purple");
    window.localStorage.clear();
}

function startStopResume() {
    if (isRunning == false && isStarted == false) {
        toStart();
    }
    else if (isRunning == true && isStarted == true) {
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

        if (hour < 10) {
            document.getElementById("hour").innerHTML = "0" + hour;
        }
        else {
            document.getElementById("hour").innerHTML = "" + hour;
        }
        if (minute < 10) {
            document.getElementById("minute").innerHTML = "0" + minute;
        }
        else {
            document.getElementById("minute").innerHTML = "" + minute;
        }
        if (second < 10) {
            document.getElementById("second").innerHTML = "0" + second;
        }
        else {
            document.getElementById("second").innerHTML = "" + second;

        }
        if (milliSecond < 10) {
            document.getElementById("millisecond").innerHTML = "0" + milliSecond;
        }
        else {
            document.getElementById("millisecond").innerHTML = "" + milliSecond;
        }
        setTimeout("timing()", 10);
    }
}

document.addEventListener("keydown", e => { if (e.ctrlKey && e.key.toLowerCase() === "s") { toStart(); e.preventDefault(); } });
document.addEventListener("keydown", e => { if (e.ctrlKey && e.key.toLowerCase() === "x") { toStop(); e.preventDefault(); } });
document.addEventListener("keydown", e => { if (e.ctrlKey && e.key.toLowerCase() === "r") { toReset(); e.preventDefault(); } });
document.addEventListener("keydown", e => { if (e.ctrlKey && e.key.toLowerCase() === "l") { toLap(); e.preventDefault(); } });
document.addEventListener("keydown", e => { if (e.ctrlKey && e.key.toLowerCase() === "p") { toResume(); e.preventDefault(); } });